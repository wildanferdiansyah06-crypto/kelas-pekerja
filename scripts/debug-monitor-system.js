#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class MonitorSystemDebugger {
  constructor() {
    this.startTime = new Date();
  }

  async displayDebugInfo() {
    console.log('\n' + '='.repeat(80));
    console.log('AUTO-MONITOR SYSTEM DEBUG REPORT');
    console.log('='.repeat(80));
    
    await this.showSystemStatus();
    await this.showMonitoringHistory();
    await this.showCurrentDeployment();
    await this.showFixHistory();
    await this.showSystemPerformance();
    await this.showActiveProcesses();
    await this.showFileStructure();
    await this.showErrorPatterns();
    await this.showNextActions();
    
    console.log('\n' + '='.repeat(80));
    console.log('DEBUG REPORT COMPLETE');
    console.log('='.repeat(80));
  }

  async showSystemStatus() {
    console.log('\n1. SYSTEM STATUS');
    console.log('-'.repeat(40));
    
    try {
      // Check if monitor is running
      const processes = execSync('tasklist | findstr node', { encoding: 'utf8' });
      const monitorProcesses = processes.split('\n').filter(line => 
        line.includes('auto-deploy-monitor') || line.includes('continuous-monitor')
      );
      
      console.log(`Monitor Processes Running: ${monitorProcesses.length}`);
      monitorProcesses.forEach((proc, i) => {
        console.log(`  ${i + 1}. ${proc.trim()}`);
      });
    } catch (error) {
      console.log('Monitor Processes: Not running or not found');
    }
    
    // Check git status
    try {
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      console.log(`Git Status: ${gitStatus.trim().split('\n').length} files changed`);
    } catch (error) {
      console.log('Git Status: Error checking');
    }
    
    // Check last commit
    try {
      const lastCommit = execSync('git log --oneline -1', { encoding: 'utf8' });
      console.log(`Last Commit: ${lastCommit.trim()}`);
    } catch (error) {
      console.log('Last Commit: Error checking');
    }
  }

  async showMonitoringHistory() {
    console.log('\n2. MONITORING HISTORY');
    console.log('-'.repeat(40));
    
    try {
      const commits = execSync('git log --oneline -10 --grep="auto-fix\\|debug-fix\\|dashboard-fix\\|emergency-fix"', { encoding: 'utf8' });
      const commitList = commits.trim().split('\n');
      
      console.log(`Recent Auto-Fix Commits: ${commitList.length}`);
      commitList.forEach((commit, i) => {
        console.log(`  ${i + 1}. ${commit}`);
      });
    } catch (error) {
      console.log('Monitoring History: No auto-fix commits found');
    }
  }

  async showCurrentDeployment() {
    console.log('\n3. CURRENT DEPLOYMENT');
    console.log('-'.repeat(40));
    
    try {
      const currentHash = execSync('git rev-parse HEAD', { encoding: 'utf8' });
      console.log(`Current Hash: ${currentHash.trim()}`);
      
      const commitMessage = execSync('git log --format=%B -1', { encoding: 'utf8' });
      console.log(`Commit Message: ${commitMessage.trim()}`);
      
      const commitDate = execSync('git log --format=%cd -1', { encoding: 'utf8' });
      console.log(`Commit Date: ${commitDate.trim()}`);
    } catch (error) {
      console.log('Current Deployment: Error checking');
    }
  }

  async showFixHistory() {
    console.log('\n4. FIX HISTORY');
    console.log('-'.repeat(40));
    
    const fixTypes = [
      { name: 'Auto-Fix', pattern: 'auto-fix:' },
      { name: 'Debug-Fix', pattern: 'debug-fix:' },
      { name: 'Dashboard-Fix', pattern: 'dashboard-fix:' },
      { name: 'Emergency-Fix', pattern: 'emergency-fix:' }
    ];
    
    fixTypes.forEach(fixType => {
      try {
        const commits = execSync(`git log --oneline --grep="${fixType.pattern}"`, { encoding: 'utf8' });
        const count = commits.trim().split('\n').length;
        console.log(`${fixType.name} Commits: ${count}`);
      } catch (error) {
        console.log(`${fixType.name} Commits: 0`);
      }
    });
  }

  async showSystemPerformance() {
    console.log('\n5. SYSTEM PERFORMANCE');
    console.log('-'.repeat(40));
    
    const startTime = this.startTime;
    const currentTime = new Date();
    const uptime = currentTime - startTime;
    
    console.log(`Debug Session Started: ${startTime.toISOString()}`);
    console.log(`Current Time: ${currentTime.toISOString()}`);
    console.log(`Uptime: ${Math.round(uptime / 1000)}s`);
    
    // Check file sizes
    const files = [
      '../src/app/page.tsx',
      '../src/app/HomePageClient.tsx',
      '../src/app/page-data.tsx',
      '../src/components/ThemeProvider.tsx'
    ];
    
    files.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`${file}: ${stats.size} bytes`);
      }
    });
  }

  async showActiveProcesses() {
    console.log('\n6. ACTIVE PROCESSES');
    console.log('-'.repeat(40));
    
    try {
      // Check for running Node.js processes
      const nodeProcesses = execSync('tasklist | findstr node.exe', { encoding: 'utf8' });
      const processes = nodeProcesses.trim().split('\n');
      
      console.log(`Node.js Processes: ${processes.length}`);
      processes.forEach((proc, i) => {
        if (i < 5) { // Show first 5 to avoid spam
          console.log(`  ${i + 1}. ${proc.trim()}`);
        }
      });
      
      if (processes.length > 5) {
        console.log(`  ... and ${processes.length - 5} more`);
      }
    } catch (error) {
      console.log('Node.js Processes: None running');
    }
  }

  async showFileStructure() {
    console.log('\n7. FILE STRUCTURE');
    console.log('-'.repeat(40));
    
    const importantDirs = [
      '../src/app',
      '../src/components',
      '../scripts',
      '../public'
    ];
    
    importantDirs.forEach(dir => {
      const dirPath = path.join(__dirname, dir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        console.log(`${dir}: ${files.length} files`);
        
        // Show key files
        const keyFiles = files.filter(f => 
          f.includes('.tsx') || f.includes('.ts') || f.includes('.js') || f.includes('.json')
        ).slice(0, 3);
        
        keyFiles.forEach(file => {
          console.log(`  - ${file}`);
        });
        
        if (files.length > 3) {
          console.log(`  ... and ${files.length - 3} more`);
        }
      } else {
        console.log(`${dir}: Not found`);
      }
    });
  }

  async showErrorPatterns() {
    console.log('\n8. ERROR PATTERNS MONITORED');
    console.log('-'.repeat(40));
    
    const patterns = [
      'Cannot find module',
      'Error:.*export',
      'Failed to compile',
      'client-side exception',
      'HomePageClient.*defined',
      'async.*client',
      'useTheme.*cannot',
      'ReferenceError',
      'TypeError',
      'hydration',
      'window.*not defined',
      'localStorage.*not defined',
      'document.*not defined'
    ];
    
    console.log(`Patterns Monitored: ${patterns.length}`);
    patterns.forEach((pattern, i) => {
      console.log(`  ${i + 1}. ${pattern}`);
    });
  }

  async showNextActions() {
    console.log('\n9. RECOMMENDED ACTIONS');
    console.log('-'.repeat(40));
    
    // Check for potential issues
    const issues = [];
    
    // Check if monitor is running
    try {
      const processes = execSync('tasklist | findstr node', { encoding: 'utf8' });
      const monitorProcesses = processes.split('\n').filter(line => 
        line.includes('auto-deploy-monitor') || line.includes('continuous-monitor')
      );
      
      if (monitorProcesses.length === 0) {
        issues.push('Restart auto-monitor system');
      }
    } catch (error) {
      issues.push('Start auto-monitor system');
    }
    
    // Check for uncommitted changes
    try {
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      if (gitStatus.trim().length > 0) {
        issues.push('Commit and push pending changes');
      }
    } catch (error) {
      issues.push('Check git repository status');
    }
    
    // Check file integrity
    const requiredFiles = [
      '../src/app/page.tsx',
      '../src/app/HomePageClient.tsx',
      '../src/app/page-data.tsx'
    ];
    
    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        issues.push(`Create missing file: ${file}`);
      }
    });
    
    if (issues.length === 0) {
      console.log('System Status: HEALTHY');
      console.log('All systems operational');
    } else {
      console.log(`Issues Found: ${issues.length}`);
      issues.forEach((issue, i) => {
        console.log(`  ${i + 1}. ${issue}`);
      });
    }
    
    console.log('\nSystem Commands:');
    console.log('  Start Monitor: node scripts/auto-deploy-monitor.js');
    console.log('  Debug Issues: node scripts/debug-client-errors.js');
    console.log('  Dashboard Fix: node scripts/vercel-dashboard-fix.js');
    console.log('  Quick Fix: node scripts/auto-fix-vercel.js');
  }
}

// Run debug display
const monitorDebugger = new MonitorSystemDebugger();
monitorDebugger.displayDebugInfo().catch(console.error);
