#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

class Config {
  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    // Default configuration
    this.defaultConfig = {
      // Retry and monitoring settings
      maxRetryPerDeployment: parseInt(process.env.MAX_RETRY_PER_DEPLOYMENT) || 3,
      maxTotalAttempts: parseInt(process.env.MAX_TOTAL_ATTEMPTS) || 10,
      maxCommitsPerDay: parseInt(process.env.MAX_COMMITS_PER_DAY) || 10,
      
      // Timing settings
      checkInterval: parseInt(process.env.CHECK_INTERVAL) || 30000, // 30 seconds
      deploymentTimeout: parseInt(process.env.DEPLOYMENT_TIMEOUT) || 600000, // 10 minutes
      buildTimeout: parseInt(process.env.BUILD_TIMEOUT) || 300000, // 5 minutes
      
      // Branch settings
      branchPrefix: process.env.BRANCH_PREFIX || 'bot-fix',
      mainBranch: process.env.MAIN_BRANCH || 'main',
      
      // Path settings
      logDir: process.env.LOG_DIR || path.join(__dirname, 'logs'),
      projectRoot: process.env.PROJECT_ROOT || path.join(__dirname, '..'),
      
      // Vercel settings
      vercelToken: process.env.VERCEL_TOKEN || null,
      vercelProjectId: process.env.VERCEL_PROJECT_ID || null,
      vercelTeamId: process.env.VERCEL_TEAM_ID || null,
      
      // AI/LLM settings
      aiProvider: process.env.AI_PROVIDER || 'openai',
      aiApiKey: process.env.AI_API_KEY || null,
      aiModel: process.env.AI_MODEL || 'gpt-4',
      
      // Build settings
      buildCommand: process.env.BUILD_COMMAND || 'npm run build',
      installCommand: process.env.INSTALL_COMMAND || 'npm install',
      testCommand: process.env.TEST_COMMAND || 'npm test',
      
      // Monitoring settings
      enableAutoFix: process.env.ENABLE_AUTO_FIX !== 'false',
      dryRun: process.env.DRY_RUN === 'true',
      verbose: process.env.VERBOSE === 'true',
      
      // Error handling
      stopOnFatalError: process.env.STOP_ON_FATAL_ERROR !== 'false',
      skipSameError: process.env.SKIP_SAME_ERROR !== 'false',
      
      // File watching
      watchFiles: process.env.WATCH_FILES === 'true',
      filesToWatch: [
        'src/app/**/*.{tsx,ts,js,jsx}',
        'src/components/**/*.{tsx,ts,js,jsx}',
        'package.json',
        'next.config.js',
        'tailwind.config.ts',
        'tsconfig.json'
      ],
      
      // Notification settings
      enableNotifications: process.env.ENABLE_NOTIFICATIONS === 'true',
      notificationWebhook: process.env.NOTIFICATION_WEBHOOK || null,
      
      // Logging settings
      logLevel: process.env.LOG_LEVEL || 'info',
      logRetentionDays: parseInt(process.env.LOG_RETENTION_DAYS) || 7,
      
      // Performance settings
      maxConcurrentFixes: parseInt(process.env.MAX_CONCURRENT_FIXES) || 1,
      enableCache: process.env.ENABLE_CACHE !== 'false',
      
      // Safety settings
      requireApproval: process.env.REQUIRE_APPROVAL === 'true',
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 1024 * 1024, // 1MB
      allowedFileExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'],
      
      // Feature flags
      enableAIFix: process.env.ENABLE_AI_FIX !== 'false',
      enableAutoRollback: process.env.ENABLE_AUTO_ROLLBACK === 'true',
      enableHealthCheck: process.env.ENABLE_HEALTH_CHECK !== 'false'
    };

    // Load custom config file if exists
    this.customConfig = this.loadCustomConfig();
    
    // Merge configurations
    this.config = { ...this.defaultConfig, ...this.customConfig };
    
    // Validate configuration
    this.validateConfig();
  }

  loadCustomConfig() {
    const configPaths = [
      path.join(__dirname, 'config.json'),
      path.join(__dirname, '..', '.deploy-config.json'),
      path.join(process.cwd(), '.deploy-config.json')
    ];

    for (const configPath of configPaths) {
      try {
        if (fs.existsSync(configPath)) {
          const configData = fs.readFileSync(configPath, 'utf8');
          return JSON.parse(configData);
        }
      } catch (error) {
        console.warn(`Failed to load config from ${configPath}:`, error.message);
      }
    }

    return {};
  }

  validateConfig() {
    const errors = [];

    // Validate numeric values
    if (this.config.maxRetryPerDeployment < 1 || this.config.maxRetryPerDeployment > 10) {
      errors.push('maxRetryPerDeployment must be between 1 and 10');
    }

    if (this.config.maxTotalAttempts < 1 || this.config.maxTotalAttempts > 50) {
      errors.push('maxTotalAttempts must be between 1 and 50');
    }

    if (this.config.checkInterval < 5000 || this.config.checkInterval > 300000) {
      errors.push('checkInterval must be between 5000ms and 300000ms');
    }

    // Validate paths
    if (!fs.existsSync(this.config.projectRoot)) {
      errors.push(`projectRoot does not exist: ${this.config.projectRoot}`);
    }

    // Validate API keys if required
    if (this.config.enableAIFix && !this.config.aiApiKey && !this.config.dryRun) {
      errors.push('aiApiKey is required when enableAIFix is true and not in dry-run mode');
    }

    // Validate commands
    const requiredCommands = ['buildCommand', 'installCommand'];
    requiredCommands.forEach(cmd => {
      if (!this.config[cmd]) {
        errors.push(`${cmd} is required`);
      }
    });

    if (errors.length > 0) {
      throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
    }
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }

  getAll() {
    return { ...this.config };
  }

  isDryRun() {
    return this.config.dryRun;
  }

  isVerbose() {
    return this.config.verbose;
  }

  isAutoFixEnabled() {
    return this.config.enableAutoFix;
  }

  getRetryLimits() {
    return {
      maxPerDeployment: this.config.maxRetryPerDeployment,
      maxTotal: this.config.maxTotalAttempts
    };
  }

  getTimingSettings() {
    return {
      checkInterval: this.config.checkInterval,
      deploymentTimeout: this.config.deploymentTimeout,
      buildTimeout: this.config.buildTimeout
    };
  }

  getBranchSettings() {
    return {
      prefix: this.config.branchPrefix,
      main: this.config.mainBranch
    };
  }

  getVercelConfig() {
    return {
      token: this.config.vercelToken,
      projectId: this.config.vercelProjectId,
      teamId: this.config.vercelTeamId
    };
  }

  getAIConfig() {
    return {
      provider: this.config.aiProvider,
      apiKey: this.config.aiApiKey,
      model: this.config.aiModel
    };
  }

  getBuildCommands() {
    return {
      build: this.config.buildCommand,
      install: this.config.installCommand,
      test: this.config.testCommand
    };
  }

  getPathConfig() {
    return {
      logDir: this.config.logDir,
      projectRoot: this.config.projectRoot
    };
  }

  getSafetyLimits() {
    return {
      maxCommitsPerDay: this.config.maxCommitsPerDay,
      maxFileSize: this.config.maxFileSize,
      allowedExtensions: this.config.allowedFileExtensions,
      requireApproval: this.config.requireApproval
    };
  }

  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
    this.validateConfig();
  }

  saveConfig(filePath = null) {
    const configPath = filePath || path.join(__dirname, 'config.json');
    
    try {
      fs.writeFileSync(configPath, JSON.stringify(this.config, null, 2));
      console.log(`Configuration saved to ${configPath}`);
    } catch (error) {
      console.error(`Failed to save configuration: ${error.message}`);
    }
  }

  resetToDefaults() {
    this.config = { ...this.defaultConfig };
  }

  exportConfig() {
    const exportData = {
      timestamp: new Date().toISOString(),
      config: this.config,
      environment: {
        node: process.version,
        platform: process.platform,
        arch: process.arch
      }
    };

    return exportData;
  }

  printConfig() {
    console.log('Current Configuration:');
    console.log(JSON.stringify(this.config, null, 2));
  }

  printSummary() {
    console.log('\n=== Configuration Summary ===');
    console.log(`Auto Fix Enabled: ${this.config.enableAutoFix}`);
    console.log(`Dry Run Mode: ${this.config.dryRun}`);
    console.log(`Verbose Logging: ${this.config.verbose}`);
    console.log(`Max Retry per Deployment: ${this.config.maxRetryPerDeployment}`);
    console.log(`Max Total Attempts: ${this.config.maxTotalAttempts}`);
    console.log(`Check Interval: ${this.config.checkInterval}ms`);
    console.log(`Branch Prefix: ${this.config.branchPrefix}`);
    console.log(`Log Directory: ${this.config.logDir}`);
    console.log(`AI Fix Enabled: ${this.config.enableAIFix}`);
    console.log(`Vercel Token Configured: ${!!this.config.vercelToken}`);
    console.log('=============================\n');
  }
}

module.exports = Config;
