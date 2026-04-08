#!/usr/bin/env node

const VercelClient = require('./vercel-client');
const GitUtils = require('./git-utils');
const Logger = require('./logger');
const Config = require('./config');
const AIFixEngine = require('./ai-fix-engine');
const { execSync } = require('child_process');

class AutoDeployAgent {
  constructor() {
    this.config = new Config();
    this.logger = new Logger({
      logDir: this.config.get('logDir'),
      verbose: this.config.get('verbose')
    });
    
    this.vercelClient = new VercelClient(this.config.getVercelConfig());
    this.gitUtils = new GitUtils(this.config.getBranchSettings());
    this.aiFixEngine = new AIFixEngine({
      ...this.config.getAll(),
      logger: this.logger,
      getAIConfig: () => this.config.getAIConfig(),
      getPathConfig: () => this.config.getPathConfig()
    });
    
    this.isRunning = false;
    this.currentCommitHash = '';
    this.retryCount = 0;
    this.totalAttempts = 0;
    this.lastProcessedHash = '';
    
    // Initialize
    this.initialize();
  }

  async initialize() {
    this.logger.info('Auto Deploy Agent initializing...');
    this.config.printSummary();
    
    // Load last processed commit
    const recentHistory = this.logger.getRecentDeployments(1);
    if (recentHistory.length > 0) {
      this.lastProcessedHash = recentHistory[0].commitHash;
    }
    
    this.logger.info('Initialization complete', { 
      lastProcessedHash: this.lastProcessedHash,
      dryRun: this.config.isDryRun()
    });
  }

  async start() {
    if (this.isRunning) {
      this.logger.warn('Agent is already running');
      return;
    }

    this.isRunning = true;
    this.logger.info('Starting Auto Deploy Agent monitoring...');
    
    try {
      await this.monitoringLoop();
    } catch (error) {
      this.logger.error('Monitoring loop failed', { error: error.message });
    } finally {
      this.isRunning = false;
      this.logger.info('Auto Deploy Agent stopped');
    }
  }

  async monitoringLoop() {
    const { maxTotalAttempts, checkInterval } = this.config.getTimingSettings();
    
    while (this.isRunning && this.totalAttempts < maxTotalAttempts) {
      try {
        await this.checkAndProcessDeployment();
        await this.sleep(checkInterval);
      } catch (error) {
        this.logger.error('Monitoring iteration failed', { error: error.message });
        await this.sleep(checkInterval);
      }
    }
    
    if (this.totalAttempts >= maxTotalAttempts) {
      this.logger.warn('Maximum total attempts reached, stopping monitoring');
    }
  }

  async checkAndProcessDeployment() {
    // Get current commit hash
    this.currentCommitHash = this.gitUtils.getCurrentCommitHash();
    
    // Skip if same commit was already processed
    if (this.currentCommitHash === this.lastProcessedHash) {
      this.logger.debug('No new commits detected');
      return;
    }

    this.logger.info('New commit detected', { 
      commitHash: this.currentCommitHash,
      previousHash: this.lastProcessedHash 
    });

    // Wait a bit for deployment to start
    await this.sleep(5000);
    
    // Process deployment
    const deploymentResult = await this.processDeployment();
    
    if (deploymentResult.success) {
      this.lastProcessedHash = this.currentCommitHash;
      this.retryCount = 0;
      this.logger.info('Deployment processed successfully');
    } else {
      this.retryCount++;
      this.totalAttempts++;
      
      const retryLimits = this.config.getRetryLimits();
      if (this.retryCount >= retryLimits.maxPerDeployment) {
        this.logger.warn('Max retry per deployment reached, moving to next commit');
        this.lastProcessedHash = this.currentCommitHash;
        this.retryCount = 0;
      }
    }
  }

  async processDeployment() {
    const startTime = Date.now();
    
    try {
      // Get latest deployment
      const deployment = await this.vercelClient.getLatestDeployment();
      
      if (!deployment) {
        this.logger.warn('No deployment found');
        return { success: false, reason: 'No deployment found' };
      }

      this.logger.info('Deployment found', { 
        deploymentId: deployment.id,
        status: deployment.status,
        url: deployment.url 
      });

      // Wait for deployment completion or timeout
      const finalStatus = await this.vercelClient.waitForDeploymentCompletion(
        deployment.id,
        this.config.get('deploymentTimeout'),
        this.config.get('checkInterval')
      );

      const duration = Date.now() - startTime;
      
      if (finalStatus.status === 'READY') {
        this.logger.info('Deployment successful', { 
          deploymentId: deployment.id,
          duration,
          url: finalStatus.url 
        });

        // Record successful deployment
        this.logger.recordDeployment({
          commitHash: this.currentCommitHash,
          deploymentId: deployment.id,
          deploymentUrl: finalStatus.url,
          status: 'READY',
          fixApplied: false,
          buildResult: 'SUCCESS',
          attemptNumber: this.retryCount + 1,
          duration
        });

        return { success: true, deployment: finalStatus };
      }

      // Deployment failed - handle error
      return await this.handleDeploymentFailure(deployment, finalStatus, duration);

    } catch (error) {
      this.logger.error('Deployment processing failed', { error: error.message });
      return { success: false, error: error.message };
    }
  }

  async handleDeploymentFailure(deployment, status, duration) {
    this.logger.error('Deployment failed', { 
      deploymentId: deployment.id,
      status: status.status,
      buildError: status.build?.error 
    });

    // Get deployment logs
    const logs = await this.vercelClient.getDeploymentLogs(deployment.id);
    this.logger.saveDeploymentLogs(deployment.id, logs.logs);

    // Analyze error and attempt fix
    const fixResult = await this.analyzeAndFix(deployment, status, logs);

    // Record failed deployment
    this.logger.recordDeployment({
      commitHash: this.currentCommitHash,
      deploymentId: deployment.id,
      deploymentUrl: status.url,
      status: 'ERROR',
      errorType: fixResult.errorType,
      errorSummary: status.build?.error || 'Unknown error',
      fixApplied: fixResult.applied,
      filesChanged: fixResult.filesChanged || [],
      branchCreated: fixResult.branchName,
      buildResult: 'FAILED',
      attemptNumber: this.retryCount + 1,
      duration,
      retryCount: this.retryCount
    });

    return { 
      success: false, 
      deployment: status,
      fixResult 
    };
  }

  async analyzeAndFix(deployment, status, logs) {
    if (!this.config.isAutoFixEnabled()) {
      this.logger.info('Auto-fix disabled, skipping fix attempt');
      return { applied: false, reason: 'Auto-fix disabled' };
    }

    // Check if we've seen this error recently
    const errorType = this.detectErrorType(status.build?.error, logs.logs);
    if (this.config.get('skipSameError') && this.logger.hasRecentError(errorType, 30)) {
      this.logger.info('Same error detected recently, skipping fix');
      return { applied: false, reason: 'Recent duplicate error', errorType };
    }

    // Check bot commit limits
    if (!this.gitUtils.canCreateBotCommit()) {
      this.logger.warn('Bot commit limit reached for today');
      return { applied: false, reason: 'Commit limit reached', errorType };
    }

    this.logger.info('Attempting auto-fix', { errorType });

    try {
      // Analyze error with AI
      const analysis = await this.aiFixEngine.analyzeError({
        buildLogs: logs.logs.join('\n'),
        errorSummary: status.build?.error || 'Unknown error',
        deploymentId: deployment.id
      });

      this.logger.info('Error analysis completed', { 
        errorType: analysis.errorType,
        confidence: analysis.confidence,
        filesToChange: analysis.fixPlan.filesToChange?.length || 0 
      });

      // Apply fixes if confidence is high enough
      if (analysis.confidence > 0.5 && !this.config.isDryRun()) {
        const fixResult = await this.applyFixesAndCommit(analysis, errorType);
        return fixResult;
      } else if (this.config.isDryRun()) {
        this.logger.info('Dry run mode - would apply fixes', { 
          errorType,
          fixPlan: analysis.fixPlan 
        });
        return { 
          applied: false, 
          reason: 'Dry run mode',
          errorType,
          fixPlan: analysis.fixPlan 
        };
      } else {
        this.logger.warn('Low confidence, skipping fix', { confidence: analysis.confidence });
        return { 
          applied: false, 
          reason: 'Low confidence',
          errorType,
          confidence: analysis.confidence 
        };
      }

    } catch (error) {
      this.logger.error('Auto-fix failed', { error: error.message });
      return { applied: false, reason: error.message, errorType };
    }
  }

  async applyFixesAndCommit(analysis, errorType) {
    const dryRun = this.config.isDryRun();
    
    // Create fix branch
    let branchName = null;
    if (!dryRun) {
      try {
        branchName = this.gitUtils.createFixBranch(errorType, this.currentCommitHash);
      } catch (error) {
        this.logger.error('Failed to create fix branch', { error: error.message });
        return { applied: false, reason: 'Failed to create branch', errorType };
      }
    }

    // Apply fixes
    const fixResult = await this.aiFixEngine.applyFixes(analysis.fixPlan, dryRun);
    
    if (!fixResult.applied) {
      this.logger.warn('No fixes were applied');
      return { applied: false, reason: 'No fixes applied', errorType };
    }

    // Validate build locally
    if (!dryRun && fixResult.successful > 0) {
      const buildValid = await this.validateLocalBuild();
      if (!buildValid) {
        this.logger.error('Local build validation failed');
        return { applied: false, reason: 'Build validation failed', errorType };
      }
    }

    // Commit and push changes
    if (!dryRun && branchName) {
      try {
        const commitMessage = `bot-fix: fix vercel deploy error - ${errorType}`;
        await this.gitUtils.commitAndPush(commitMessage, branchName);
        
        this.logger.info('Fixes committed and pushed', { 
          branchName,
          filesChanged: fixResult.successful 
        });

        return { 
          applied: true, 
          branchName,
          filesChanged: fixResult.successful,
          errorType 
        };

      } catch (error) {
        this.logger.error('Failed to commit and push fixes', { error: error.message });
        return { applied: false, reason: 'Commit/push failed', errorType };
      }
    }

    return { 
      applied: dryRun ? false : fixResult.successful > 0,
      branchName,
      filesChanged: fixResult.successful,
      errorType,
      dryRun 
    };
  }

  async validateLocalBuild() {
    this.logger.info('Running local build validation...');
    
    try {
      // Install dependencies
      const installCmd = this.config.get('installCommand');
      execSync(installCmd, { stdio: 'pipe', cwd: this.config.get('projectRoot') });
      
      // Run build
      const buildCmd = this.config.get('buildCommand');
      execSync(buildCmd, { stdio: 'pipe', cwd: this.config.get('projectRoot') });
      
      this.logger.info('Local build validation passed');
      return true;
      
    } catch (error) {
      this.logger.error('Local build validation failed', { error: error.message });
      return false;
    }
  }

  detectErrorType(buildError, logs) {
    if (!buildError && !logs) return 'unknown';
    
    const fullError = `${buildError || ''}\n${logs || ''}`.toLowerCase();
    
    const errorPatterns = {
      'missing_module': /cannot find module|module not found/i,
      'import_error': /import.*does not exist|export.*not found/i,
      'ssr_issue': /window is not defined|document is not defined|localStorage is not defined/i,
      'async_client_component': /async.*client|client.*async/i,
      'type_error': /typeerror|referenceerror/i,
      'hydration_mismatch': /hydration failed|text content does not match/i,
      'duplicate_definition': /duplicate|already defined/i,
      'build_config': /failed to compile|build failed|configuration error/i
    };
    
    for (const [type, pattern] of Object.entries(errorPatterns)) {
      if (pattern.test(fullError)) {
        return type;
      }
    }
    
    return 'unknown';
  }

  async stop() {
    this.logger.info('Stopping Auto Deploy Agent...');
    this.isRunning = false;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      currentCommitHash: this.currentCommitHash,
      lastProcessedHash: this.lastProcessedHash,
      retryCount: this.retryCount,
      totalAttempts: this.totalAttempts,
      config: this.config.getAll()
    };
  }

  generateReport() {
    const report = this.logger.generateReport();
    report.agentStatus = this.getStatus();
    return report;
  }
}

// CLI Interface
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: false,
    verbose: false,
    maxRetry: null,
    interval: null,
    branchPrefix: null
  };

  args.forEach(arg => {
    if (arg === '--dry-run') options.dryRun = true;
    if (arg === '--verbose') options.verbose = true;
    if (arg.startsWith('--max-retry')) {
      const value = arg.split('=')[1];
      options.maxRetry = parseInt(value);
    }
    if (arg.startsWith('--interval')) {
      const value = arg.split('=')[1];
      options.interval = parseInt(value);
    }
    if (arg.startsWith('--branch-prefix')) {
      const value = arg.split('=')[1];
      options.branchPrefix = value;
    }
  });

  return options;
}

// Main execution
if (require.main === module) {
  const cliOptions = parseArgs();
  
  // Override config with CLI options
  if (cliOptions.dryRun) process.env.DRY_RUN = 'true';
  if (cliOptions.verbose) process.env.VERBOSE = 'true';
  if (cliOptions.maxRetry) process.env.MAX_RETRY_PER_DEPLOYMENT = cliOptions.maxRetry.toString();
  if (cliOptions.interval) process.env.CHECK_INTERVAL = cliOptions.interval.toString();
  if (cliOptions.branchPrefix) process.env.BRANCH_PREFIX = cliOptions.branchPrefix;

  const agent = new AutoDeployAgent();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nShutting down Auto Deploy Agent...');
    await agent.stop();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\nShutting down Auto Deploy Agent...');
    await agent.stop();
    process.exit(0);
  });

  // Start monitoring
  agent.start().catch(error => {
    console.error('Failed to start agent:', error);
    process.exit(1);
  });
}

module.exports = AutoDeployAgent;
