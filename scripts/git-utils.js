#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitUtils {
  constructor(config = {}) {
    this.branchPrefix = config.branchPrefix || 'bot-fix';
    this.maxCommitsPerDay = config.maxCommitsPerDay || 10;
    this.mainBranch = config.mainBranch || 'main';
  }

  getCurrentCommitHash() {
    try {
      const result = execSync('git rev-parse HEAD', { encoding: 'utf8' });
      return result.trim();
    } catch (error) {
      throw new Error(`Failed to get current commit hash: ${error.message}`);
    }
  }

  getCurrentBranch() {
    try {
      const result = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' });
      return result.trim();
    } catch (error) {
      throw new Error(`Failed to get current branch: ${error.message}`);
    }
  }

  getCommitHistory(limit = 10) {
    try {
      const result = execSync(`git log --oneline -${limit}`, { encoding: 'utf8' });
      return result.trim().split('\n').map(line => {
        const [hash, ...messageParts] = line.split(' ');
        return {
          hash,
          message: messageParts.join(' '),
          timestamp: this.getCommitTimestamp(hash)
        };
      });
    } catch (error) {
      throw new Error(`Failed to get commit history: ${error.message}`);
    }
  }

  getCommitTimestamp(commitHash) {
    try {
      const result = execSync(`git show -s --format=%ct ${commitHash}`, { encoding: 'utf8' });
      return parseInt(result.trim()) * 1000; // Convert to milliseconds
    } catch (error) {
      return Date.now();
    }
  }

  hasUncommittedChanges() {
    try {
      const result = execSync('git status --porcelain', { encoding: 'utf8' });
      return result.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  getChangedFiles() {
    try {
      const result = execSync('git status --porcelain', { encoding: 'utf8' });
      return result.trim().split('\n')
        .filter(line => line.trim())
        .map(line => {
          const status = line.substring(0, 2).trim();
          const filePath = line.substring(3);
          return { status, filePath };
        });
    } catch (error) {
      return [];
    }
  }

  createFixBranch(errorType, commitHash) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const shortHash = commitHash.substring(0, 7);
    const branchName = `${this.branchPrefix}/${timestamp}-${shortHash}-${errorType.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    try {
      // Create and checkout new branch
      execSync(`git checkout -b ${branchName}`, { encoding: 'utf8' });
      console.log(`Created and switched to branch: ${branchName}`);
      return branchName;
    } catch (error) {
      throw new Error(`Failed to create branch ${branchName}: ${error.message}`);
    }
  }

  async commitAndPush(message, branchName = null) {
    const currentBranch = branchName || this.getCurrentBranch();

    try {
      // Stage all changes
      if (this.hasUncommittedChanges()) {
        execSync('git add .', { encoding: 'utf8' });
        
        // Commit changes
        execSync(`git commit -m "${message}"`, { encoding: 'utf8' });
        console.log(`Committed changes: ${message}`);
      }

      // Push to remote
      execSync(`git push -u origin ${currentBranch}`, { encoding: 'utf8' });
      console.log(`Pushed branch ${currentBranch} to remote`);

      return {
        branch: currentBranch,
        committed: this.hasUncommittedChanges() === false,
        pushed: true
      };
    } catch (error) {
      throw new Error(`Failed to commit and push: ${error.message}`);
    }
  }

  switchToMainBranch() {
    try {
      execSync(`git checkout ${this.mainBranch}`, { encoding: 'utf8' });
      console.log(`Switched to main branch: ${this.mainBranch}`);
    } catch (error) {
      throw new Error(`Failed to switch to main branch: ${error.message}`);
    }
  }

  mergeBranch(branchName) {
    try {
      // Switch to main branch first
      this.switchToMainBranch();
      
      // Merge the fix branch
      execSync(`git merge ${branchName}`, { encoding: 'utf8' });
      console.log(`Merged branch ${branchName} into main`);
      
      return true;
    } catch (error) {
      console.error(`Failed to merge branch ${branchName}: ${error.message}`);
      return false;
    }
  }

  deleteBranch(branchName, force = false) {
    try {
      const flag = force ? '-D' : '-d';
      execSync(`git branch ${flag} ${branchName}`, { encoding: 'utf8' });
      console.log(`Deleted branch: ${branchName}`);
    } catch (error) {
      console.error(`Failed to delete branch ${branchName}: ${error.message}`);
    }
  }

  getBotCommitsToday() {
    try {
      const today = new Date().toDateString();
      const result = execSync(`git log --since="today" --grep="bot-fix:" --oneline`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line.trim()).length;
    } catch (error) {
      return 0;
    }
  }

  canCreateBotCommit() {
    const botCommitsToday = this.getBotCommitsToday();
    return botCommitsToday < this.maxCommitsPerDay;
  }

  getCommitDiff(commitHash) {
    try {
      const result = execSync(`git show ${commitHash} --name-only`, { encoding: 'utf8' });
      const lines = result.trim().split('\n');
      const commitInfo = lines[0]; // First line contains commit info
      const files = lines.slice(1).filter(line => line.trim() && !line.startsWith('diff'));
      
      return {
        commitInfo,
        files,
        fullDiff: execSync(`git show ${commitHash}`, { encoding: 'utf8' })
      };
    } catch (error) {
      throw new Error(`Failed to get commit diff: ${error.message}`);
    }
  }

  resetToCommit(commitHash, hard = false) {
    try {
      const flag = hard ? '--hard' : '--soft';
      execSync(`git reset ${flag} ${commitHash}`, { encoding: 'utf8' });
      console.log(`Reset to commit ${commitHash} (${flag})`);
    } catch (error) {
      throw new Error(`Failed to reset to commit: ${error.message}`);
    }
  }

  stashChanges() {
    try {
      if (this.hasUncommittedChanges()) {
        execSync('git stash', { encoding: 'utf8' });
        console.log('Stashed uncommitted changes');
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Failed to stash changes: ${error.message}`);
      return false;
    }
  }

  popStash() {
    try {
      execSync('git stash pop', { encoding: 'utf8' });
      console.log('Popped stashed changes');
    } catch (error) {
      console.error(`Failed to pop stash: ${error.message}`);
    }
  }

  isCleanWorkingDirectory() {
    return !this.hasUncommittedChanges();
  }

  getRemoteBranches() {
    try {
      const result = execSync('git branch -r', { encoding: 'utf8' });
      return result.trim().split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.includes('HEAD'))
        .map(line => line.replace('origin/', ''));
    } catch (error) {
      return [];
    }
  }

  getLocalBranches() {
    try {
      const result = execSync('git branch', { encoding: 'utf8' });
      return result.trim().split('\n')
        .map(line => line.trim().replace('* ', ''))
        .filter(line => line);
    } catch (error) {
      return [];
    }
  }

  branchExists(branchName) {
    const localBranches = this.getLocalBranches();
    const remoteBranches = this.getRemoteBranches();
    return localBranches.includes(branchName) || remoteBranches.includes(branchName);
  }

  pullLatestChanges() {
    try {
      execSync(`git pull origin ${this.mainBranch}`, { encoding: 'utf8' });
      console.log('Pulled latest changes from remote');
    } catch (error) {
      console.error(`Failed to pull changes: ${error.message}`);
    }
  }

  getCommitMessage(commitHash) {
    try {
      const result = execSync(`git log --format=%B -n 1 ${commitHash}`, { encoding: 'utf8' });
      return result.trim();
    } catch (error) {
      return 'Unknown commit message';
    }
  }

  async safeBranchOperation(operation) {
    const originalBranch = this.getCurrentBranch();
    const hadStash = this.stashChanges();

    try {
      const result = await operation();
      return result;
    } catch (error) {
      // Switch back to original branch on error
      try {
        execSync(`git checkout ${originalBranch}`, { encoding: 'utf8' });
      } catch (switchError) {
        console.error(`Failed to switch back to original branch: ${switchError.message}`);
      }
      
      if (hadStash) {
        this.popStash();
      }
      
      throw error;
    }
  }
}

module.exports = GitUtils;
