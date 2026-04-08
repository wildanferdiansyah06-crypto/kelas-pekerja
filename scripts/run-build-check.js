#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class BuildValidator {
  constructor(config = {}) {
    this.projectRoot = config.projectRoot || path.join(__dirname, '..');
    this.buildCommand = config.buildCommand || 'npm run build';
    this.installCommand = config.installCommand || 'npm install';
    this.testCommand = config.testCommand || 'npm test';
    this.timeout = config.timeout || 300000; // 5 minutes
    this.verbose = config.verbose || false;
  }

  async validateBuild() {
    console.log('Starting build validation...');
    
    const results = {
      install: { success: false, output: '', error: null },
      lint: { success: false, output: '', error: null },
      test: { success: false, output: '', error: null },
      build: { success: false, output: '', error: null },
      overall: { success: false, duration: 0 }
    };

    const startTime = Date.now();

    try {
      // Step 1: Install dependencies
      results.install = await this.runCommand('install', this.installCommand);
      if (!results.install.success) {
        throw new Error('Dependency installation failed');
      }

      // Step 2: Run linting (if available)
      results.lint = await this.runCommand('lint', 'npm run lint', true);
      
      // Step 3: Run tests (if available)
      results.test = await this.runCommand('test', this.testCommand, true);
      
      // Step 4: Run build
      results.build = await this.runCommand('build', this.buildCommand);
      if (!results.build.success) {
        throw new Error('Build failed');
      }

      results.overall.success = true;
      console.log('Build validation completed successfully');
      
    } catch (error) {
      results.overall.success = false;
      results.overall.error = error.message;
      console.error('Build validation failed:', error.message);
    }

    results.overall.duration = Date.now() - startTime;
    
    return results;
  }

  async runCommand(type, command, optional = false) {
    console.log(`Running ${type}...`);
    
    try {
      const output = execSync(command, {
        cwd: this.projectRoot,
        encoding: 'utf8',
        stdio: this.verbose ? 'inherit' : 'pipe',
        timeout: this.timeout
      });
      
      console.log(`${type} completed successfully`);
      
      return {
        success: true,
        output: this.verbose ? output : output.substring(0, 1000),
        error: null
      };
      
    } catch (error) {
      if (optional) {
        console.log(`${type} failed (optional): ${error.message}`);
        return {
          success: true,
          output: '',
          error: null,
          skipped: true
        };
      }
      
      console.error(`${type} failed: ${error.message}`);
      
      return {
        success: false,
        output: error.stdout || '',
        error: error.message,
        code: error.status
      };
    }
  }

  async quickCheck() {
    console.log('Running quick build check...');
    
    // Check if critical files exist
    const criticalFiles = [
      'package.json',
      'next.config.js',
      'src/app/page.tsx',
      'src/app/layout.tsx'
    ];
    
    const missingFiles = [];
    for (const file of criticalFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    }
    
    if (missingFiles.length > 0) {
      return {
        success: false,
        error: `Missing critical files: ${missingFiles.join(', ')}`,
        missingFiles
      };
    }

    // Quick syntax check
    try {
      const checkCommand = 'npx tsc --noEmit --skipLibCheck';
      execSync(checkCommand, {
        cwd: this.projectRoot,
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 60000
      });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `TypeScript compilation failed: ${error.message}`,
        output: error.stdout
      };
    }
  }

  analyzeBuildErrors(buildOutput) {
    const errors = [];
    const warnings = [];
    
    const lines = buildOutput.split('\n');
    
    for (const line of lines) {
      if (line.includes('error') || line.includes('Error')) {
        errors.push(line.trim());
      } else if (line.includes('warning') || line.includes('Warning')) {
        warnings.push(line.trim());
      }
    }
    
    return {
      errors,
      warnings,
      totalErrors: errors.length,
      totalWarnings: warnings.length,
      hasErrors: errors.length > 0,
      hasWarnings: warnings.length > 0
    };
  }

  generateBuildReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        success: results.overall.success,
        duration: results.overall.duration,
        steps: {
          install: results.install.success,
          lint: results.lint.success,
          test: results.test.success,
          build: results.build.success
        }
      },
      details: results,
      recommendations: []
    };

    // Generate recommendations
    if (!results.install.success) {
      report.recommendations.push('Check package.json and network connection');
    }
    
    if (!results.build.success) {
      const buildErrors = this.analyzeBuildErrors(results.build.output || '');
      if (buildErrors.hasErrors) {
        report.recommendations.push(`Fix ${buildErrors.totalErrors} build errors`);
      }
      if (buildErrors.hasWarnings) {
        report.recommendations.push(`Address ${buildErrors.totalWarnings} warnings`);
      }
    }
    
    if (results.lint.success === false) {
      report.recommendations.push('Fix linting errors');
    }
    
    if (results.test.success === false) {
      report.recommendations.push('Fix failing tests');
    }

    return report;
  }

  async checkDeploymentReadiness() {
    console.log('Checking deployment readiness...');
    
    const checks = {
      dependencies: await this.checkDependencies(),
      build: await this.quickCheck(),
      environment: await this.checkEnvironment(),
      configuration: await this.checkConfiguration()
    };

    const allPassed = Object.values(checks).every(check => check.success);
    
    return {
      ready: allPassed,
      checks,
      summary: {
        passed: Object.values(checks).filter(check => check.success).length,
        total: Object.keys(checks).length
      }
    };
  }

  async checkDependencies() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      const criticalDeps = ['next', 'react', 'react-dom'];
      const missingDeps = criticalDeps.filter(dep => !packageJson.dependencies[dep]);
      
      if (missingDeps.length > 0) {
        return {
          success: false,
          error: `Missing critical dependencies: ${missingDeps.join(', ')}`
        };
      }
      
      // Check if node_modules exists
      const nodeModulesPath = path.join(this.projectRoot, 'node_modules');
      if (!fs.existsSync(nodeModulesPath)) {
        return {
          success: false,
          error: 'node_modules directory not found'
        };
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Dependency check failed: ${error.message}`
      };
    }
  }

  async checkEnvironment() {
    const checks = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    };
    
    // Check Node.js version compatibility
    const nodeVersion = process.version.replace('v', '');
    const majorVersion = parseInt(nodeVersion.split('.')[0]);
    
    if (majorVersion < 16) {
      return {
        success: false,
        error: `Node.js version ${nodeVersion} is too old. Requires v16 or higher.`,
        checks
      };
    }
    
    return { success: true, checks };
  }

  async checkConfiguration() {
    try {
      const configFiles = [
        'next.config.js',
        'package.json',
        'tsconfig.json'
      ];
      
      const missingConfigs = [];
      
      for (const configFile of configFiles) {
        const configPath = path.join(this.projectRoot, configFile);
        if (!fs.existsSync(configPath)) {
          missingConfigs.push(configFile);
        }
      }
      
      if (missingConfigs.length > 0) {
        return {
          success: false,
          error: `Missing configuration files: ${missingConfigs.join(', ')}`
        };
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Configuration check failed: ${error.message}`
      };
    }
  }

  saveReport(report, filePath = null) {
    const reportPath = filePath || path.join(this.projectRoot, 'build-report.json');
    
    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`Build report saved to ${reportPath}`);
    } catch (error) {
      console.error(`Failed to save build report: ${error.message}`);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const config = {
    verbose: process.argv.includes('--verbose'),
    timeout: process.argv.includes('--quick') ? 60000 : 300000
  };
  
  const validator = new BuildValidator(config);
  
  if (process.argv.includes('--quick')) {
    validator.quickCheck()
      .then(result => {
        console.log('Quick check result:', result.success ? 'PASS' : 'FAIL');
        if (!result.success) {
          console.error('Error:', result.error);
          process.exit(1);
        }
      })
      .catch(error => {
        console.error('Quick check failed:', error);
        process.exit(1);
      });
  } else if (process.argv.includes('--readiness')) {
    validator.checkDeploymentReadiness()
      .then(result => {
        console.log('Deployment readiness:', result.ready ? 'READY' : 'NOT READY');
        console.log(`Checks passed: ${result.summary.passed}/${result.summary.total}`);
        
        if (!result.ready) {
          Object.entries(result.checks).forEach(([name, check]) => {
            if (!check.success) {
              console.error(`${name}: ${check.error}`);
            }
          });
          process.exit(1);
        }
      })
      .catch(error => {
        console.error('Readiness check failed:', error);
        process.exit(1);
      });
  } else {
    validator.validateBuild()
      .then(results => {
        const report = validator.generateBuildReport(results);
        validator.saveReport(report);
        
        if (results.overall.success) {
          console.log('Build validation PASSED');
        } else {
          console.log('Build validation FAILED');
          console.error('Error:', results.overall.error);
          process.exit(1);
        }
      })
      .catch(error => {
        console.error('Build validation failed:', error);
        process.exit(1);
      });
  }
}

module.exports = BuildValidator;
