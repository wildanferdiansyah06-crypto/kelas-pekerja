#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class Logger {
  constructor(config = {}) {
    this.logDir = config.logDir || path.join(__dirname, 'logs');
    this.verbose = config.verbose || false;
    this.logLevel = config.logLevel || 'info';
    this.deployHistoryFile = path.join(this.logDir, 'deploy-history.json');
    
    // Ensure log directory exists
    this.ensureLogDirectory();
    
    // Initialize deploy history if it doesn't exist
    this.initializeDeployHistory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  initializeDeployHistory() {
    if (!fs.existsSync(this.deployHistoryFile)) {
      fs.writeFileSync(this.deployHistoryFile, JSON.stringify([], null, 2));
    }
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      data
    };

    // Console output
    const consoleMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    if (this.verbose || ['error', 'warn'].includes(level.toLowerCase())) {
      console.log(consoleMessage);
      if (data) {
        console.log('Data:', JSON.stringify(data, null, 2));
      }
    }

    // File output
    this.writeToLogFile(logEntry);
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  error(message, data = null) {
    this.log('error', message, data);
  }

  debug(message, data = null) {
    if (this.verbose) {
      this.log('debug', message, data);
    }
  }

  writeToLogFile(logEntry) {
    const logFile = path.join(this.logDir, `deploy-agent-${new Date().toISOString().split('T')[0]}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      fs.appendFileSync(logFile, logLine);
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  recordDeployment(deploymentData) {
    const history = this.getDeployHistory();
    const entry = {
      timestamp: new Date().toISOString(),
      commitHash: deploymentData.commitHash,
      deploymentId: deploymentData.deploymentId,
      deploymentUrl: deploymentData.deploymentUrl,
      status: deploymentData.status,
      errorType: deploymentData.errorType || null,
      errorSummary: deploymentData.errorSummary || null,
      fixApplied: deploymentData.fixApplied || false,
      filesChanged: deploymentData.filesChanged || [],
      branchCreated: deploymentData.branchCreated || null,
      buildResult: deploymentData.buildResult || null,
      attemptNumber: deploymentData.attemptNumber || 1,
      duration: deploymentData.duration || null,
      retryCount: deploymentData.retryCount || 0
    };

    history.push(entry);
    
    // Keep only last 100 entries to prevent file from growing too large
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }

    try {
      fs.writeFileSync(this.deployHistoryFile, JSON.stringify(history, null, 2));
      this.info('Deployment recorded', entry);
    } catch (error) {
      this.error('Failed to record deployment', { error: error.message });
    }
  }

  getDeployHistory() {
    try {
      const data = fs.readFileSync(this.deployHistoryFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      this.error('Failed to read deploy history', { error: error.message });
      return [];
    }
  }

  getRecentDeployments(limit = 10) {
    const history = this.getDeployHistory();
    return history.slice(-limit).reverse();
  }

  getDeploymentStats() {
    const history = this.getDeployHistory();
    const stats = {
      total: history.length,
      successful: history.filter(d => d.status === 'READY').length,
      failed: history.filter(d => d.status === 'ERROR').length,
      withFixes: history.filter(d => d.fixApplied).length,
      averageRetries: 0,
      errorTypes: {},
      recentFailures: 0
    };

    if (stats.failed > 0) {
      const totalRetries = history.reduce((sum, d) => sum + (d.retryCount || 0), 0);
      stats.averageRetries = totalRetries / stats.failed;
    }

    // Count error types
    history.forEach(deployment => {
      if (deployment.errorType) {
        stats.errorTypes[deployment.errorType] = (stats.errorTypes[deployment.errorType] || 0) + 1;
      }
    });

    // Count recent failures (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    stats.recentFailures = history.filter(d => 
      d.status === 'ERROR' && new Date(d.timestamp) > oneDayAgo
    ).length;

    return stats;
  }

  hasRecentError(errorType, timeWindowMinutes = 30) {
    const history = this.getDeployHistory();
    const timeWindow = new Date(Date.now() - timeWindowMinutes * 60 * 1000);
    
    return history.some(deployment => 
      deployment.errorType === errorType && 
      new Date(deployment.timestamp) > timeWindow
    );
  }

  getErrorPattern(errorType) {
    const history = this.getDeployHistory();
    return history
      .filter(d => d.errorType === errorType)
      .map(d => ({
        timestamp: d.timestamp,
        errorSummary: d.errorSummary,
        fixApplied: d.fixApplied,
        filesChanged: d.filesChanged
      }));
  }

  saveDeploymentLogs(deploymentId, logs) {
    const logFile = path.join(this.logDir, `${deploymentId}.log`);
    
    try {
      const logContent = Array.isArray(logs) ? logs.join('\n') : logs;
      fs.writeFileSync(logFile, logContent);
      this.info('Deployment logs saved', { deploymentId, logFile });
    } catch (error) {
      this.error('Failed to save deployment logs', { deploymentId, error: error.message });
    }
  }

  getDeploymentLogs(deploymentId) {
    const logFile = path.join(this.logDir, `${deploymentId}.log`);
    
    try {
      if (fs.existsSync(logFile)) {
        return fs.readFileSync(logFile, 'utf8');
      }
      return null;
    } catch (error) {
      this.error('Failed to read deployment logs', { deploymentId, error: error.message });
      return null;
    }
  }

  cleanupOldLogs(daysToKeep = 7) {
    try {
      const files = fs.readdirSync(this.logDir);
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
      
      files.forEach(file => {
        const filePath = path.join(this.logDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(filePath);
          this.info('Cleaned up old log file', { file });
        }
      });
    } catch (error) {
      this.error('Failed to cleanup old logs', { error: error.message });
    }
  }

  generateReport() {
    const stats = this.getDeploymentStats();
    const recentDeployments = this.getRecentDeployments(5);
    
    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      recentDeployments,
      recommendations: this.generateRecommendations(stats)
    };

    return report;
  }

  generateRecommendations(stats) {
    const recommendations = [];

    if (stats.failed > stats.successful) {
      recommendations.push('High failure rate detected. Consider reviewing build configuration.');
    }

    if (stats.averageRetries > 2) {
      recommendations.push('High retry average. Consider improving error detection and fixes.');
    }

    if (stats.recentFailures > 3) {
      recommendations.push('Multiple recent failures. Manual intervention may be required.');
    }

    const mostCommonError = Object.entries(stats.errorTypes)
      .sort(([,a], [,b]) => b - a)[0];

    if (mostCommonError && mostCommonError[1] > 2) {
      recommendations.push(`Frequent error type: ${mostCommonError[0]}. Consider creating specific fix for this pattern.`);
    }

    return recommendations;
  }

  exportReport(filePath) {
    const report = this.generateReport();
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
      this.info('Report exported', { filePath });
    } catch (error) {
      this.error('Failed to export report', { filePath, error: error.message });
    }
  }

  createErrorSnapshot(errorData) {
    const snapshotFile = path.join(this.logDir, `error-snapshot-${Date.now()}.json`);
    
    try {
      const snapshot = {
        timestamp: new Date().toISOString(),
        error: errorData,
        systemInfo: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch
        }
      };
      
      fs.writeFileSync(snapshotFile, JSON.stringify(snapshot, null, 2));
      this.info('Error snapshot created', { snapshotFile });
    } catch (error) {
      this.error('Failed to create error snapshot', { error: error.message });
    }
  }
}

module.exports = Logger;
