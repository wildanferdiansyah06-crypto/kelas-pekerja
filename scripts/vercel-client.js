#!/usr/bin/env node

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

class VercelClient {
  constructor(config = {}) {
    this.token = process.env.VERCEL_TOKEN || config.vercelToken;
    this.projectId = process.env.VERCEL_PROJECT_ID || config.projectId;
    this.teamId = process.env.VERCEL_TEAM_ID || config.teamId;
    this.baseUrl = 'https://api.vercel.com';
    this.useCLI = !this.token; // Fallback to CLI if no token
  }

  async getLatestDeployment() {
    if (this.useCLI) {
      return this.getLatestDeploymentCLI();
    } else {
      return this.getLatestDeploymentAPI();
    }
  }

  async getLatestDeploymentAPI() {
    try {
      const url = `${this.baseUrl}/v9/projects/${this.projectId}/deployments?limit=1`;
      const deployment = await this.makeAPIRequest('GET', url);
      
      if (deployment.deployments && deployment.deployments.length > 0) {
        const latest = deployment.deployments[0];
        return {
          id: latest.id,
          url: latest.url,
          status: latest.state,
          createdAt: latest.createdAt,
          readyState: latest.readyState,
          alias: latest.alias?.[0] || latest.url,
          inspectorUrl: latest.inspectorUrl,
          target: latest.target,
          gitCommit: latest.meta?.githubCommitSha
        };
      }
      
      return null;
    } catch (error) {
      console.error('API Error fetching deployment:', error.message);
      return this.getLatestDeploymentCLI(); // Fallback to CLI
    }
  }

  async getLatestDeploymentCLI() {
    try {
      const output = execSync('vercel ls --limit 1', { encoding: 'utf8' });
      const lines = output.trim().split('\n');
      
      if (lines.length >= 2) {
        const deployment = lines[1];
        const parts = deployment.split(/\s+/);
        
        return {
          id: parts[0] || 'unknown',
          url: parts[1] || 'unknown',
          status: this.parseCLIStatus(parts[2] || 'unknown'),
          createdAt: parts[3] || new Date().toISOString(),
          alias: parts[1] || 'unknown',
          inspectorUrl: `https://vercel.com/${parts[0]}`,
          target: 'production',
          gitCommit: this.getCurrentCommitHash()
        };
      }
      
      return null;
    } catch (error) {
      console.error('CLI Error fetching deployment:', error.message);
      return null;
    }
  }

  async getDeploymentLogs(deploymentId) {
    if (this.useCLI) {
      return this.getDeploymentLogsCLI(deploymentId);
    } else {
      return this.getDeploymentLogsAPI(deploymentId);
    }
  }

  async getDeploymentLogsAPI(deploymentId) {
    try {
      const url = `${this.baseUrl}/v2/deployments/${deploymentId}/logs`;
      const logs = await this.makeAPIRequest('GET', url);
      
      return {
        logs: logs.logs || [],
        deploymentId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('API Error fetching logs:', error.message);
      return this.getDeploymentLogsCLI(deploymentId); // Fallback to CLI
    }
  }

  async getDeploymentLogsCLI(deploymentId) {
    try {
      const output = execSync(`vercel logs ${deploymentId} --limit 100`, { encoding: 'utf8' });
      
      return {
        logs: output.split('\n').filter(line => line.trim()),
        deploymentId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('CLI Error fetching logs:', error.message);
      return {
        logs: [`Error fetching logs: ${error.message}`],
        deploymentId,
        timestamp: new Date().toISOString()
      };
    }
  }

  async getDeploymentStatus(deploymentId) {
    if (this.useCLI) {
      return this.getDeploymentStatusCLI(deploymentId);
    } else {
      return this.getDeploymentStatusAPI(deploymentId);
    }
  }

  async getDeploymentStatusAPI(deploymentId) {
    try {
      const url = `${this.baseUrl}/v13/deployments/${deploymentId}`;
      const deployment = await this.makeAPIRequest('GET', url);
      
      return {
        id: deployment.id,
        status: deployment.state,
        readyState: deployment.readyState,
        url: deployment.url,
        createdAt: deployment.createdAt,
        readyIn: deployment.readyIn,
        build: {
          status: deployment.build?.status,
          error: deployment.build?.error
        },
        alias: deployment.alias?.[0] || deployment.url
      };
    } catch (error) {
      console.error('API Error fetching status:', error.message);
      return this.getDeploymentStatusCLI(deploymentId);
    }
  }

  async getDeploymentStatusCLI(deploymentId) {
    try {
      const output = execSync(`vercel inspect ${deploymentId}`, { encoding: 'utf8' });
      const lines = output.split('\n');
      
      const status = {
        id: deploymentId,
        status: 'unknown',
        readyState: 'unknown',
        url: 'unknown',
        createdAt: 'unknown',
        build: { status: 'unknown', error: null }
      };
      
      lines.forEach(line => {
        if (line.includes('Status:')) {
          status.status = line.split(':')[1]?.trim() || 'unknown';
        }
        if (line.includes('URL:')) {
          status.url = line.split(':')[1]?.trim() || 'unknown';
        }
        if (line.includes('Created:')) {
          status.createdAt = line.split(':')[1]?.trim() || 'unknown';
        }
        if (line.includes('Build Status:')) {
          status.build.status = line.split(':')[1]?.trim() || 'unknown';
        }
      });
      
      return status;
    } catch (error) {
      console.error('CLI Error fetching status:', error.message);
      return {
        id: deploymentId,
        status: 'error',
        error: error.message
      };
    }
  }

  async makeAPIRequest(method, url, data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        method,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(url, options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(parsedData);
            } else {
              reject(new Error(`API Error: ${res.statusCode} - ${parsedData.error?.message || 'Unknown error'}`));
            }
          } catch (error) {
            reject(new Error(`Failed to parse API response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  parseCLIStatus(status) {
    const statusMap = {
      'READY': 'READY',
      'ERROR': 'ERROR',
      'BUILDING': 'BUILDING',
      'CANCELED': 'CANCELED',
      'QUEUED': 'QUEUED'
    };
    
    return statusMap[status?.toUpperCase()] || 'UNKNOWN';
  }

  getCurrentCommitHash() {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
      return 'unknown';
    }
  }

  async waitForDeploymentCompletion(deploymentId, maxWaitTime = 600000, checkInterval = 30000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getDeploymentStatus(deploymentId);
      
      if (status.status === 'READY' || status.status === 'ERROR') {
        return status;
      }
      
      await this.sleep(checkInterval);
    }
    
    throw new Error(`Deployment ${deploymentId} did not complete within ${maxWaitTime}ms`);
  }

  async getProjectInfo() {
    if (this.useCLI) {
      return this.getProjectInfoCLI();
    } else {
      return this.getProjectInfoAPI();
    }
  }

  async getProjectInfoAPI() {
    try {
      const url = `${this.baseUrl}/v9/projects/${this.projectId}`;
      const project = await this.makeAPIRequest('GET', url);
      
      return {
        id: project.id,
        name: project.name,
        framework: project.framework,
        buildCommand: project.buildCommand,
        devCommand: project.devCommand,
        installCommand: project.installCommand,
        outputDirectory: project.outputDirectory
      };
    } catch (error) {
      console.error('API Error fetching project info:', error.message);
      return this.getProjectInfoCLI();
    }
  }

  async getProjectInfoCLI() {
    try {
      const output = execSync('vercel project ls', { encoding: 'utf8' });
      const lines = output.split('\n');
      
      if (lines.length >= 2) {
        const project = lines[1];
        const parts = project.split(/\s+/);
        
        return {
          id: parts[0] || 'unknown',
          name: parts[1] || 'unknown',
          framework: 'nextjs',
          buildCommand: 'npm run build',
          devCommand: 'npm run dev',
          installCommand: 'npm install',
          outputDirectory: '.next'
        };
      }
      
      return null;
    } catch (error) {
      console.error('CLI Error fetching project info:', error.message);
      return null;
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = VercelClient;
