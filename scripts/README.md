# 🛡️ Auto Deploy Monitoring & Fixing System

Complete automation system for Vercel deployments with AI-powered error detection and automatic fixes.

## Features

- Real-time deployment monitoring
- Automatic error detection and classification
- AI-powered fix generation
- Automatic branch creation and commit management
- Comprehensive logging and reporting
- Safety guards and retry limits
- Vercel API + CLI fallback support
- Local build validation
- Configurable via environment variables

## File Structure

```
scripts/
  auto-deploy-agent.js          # Main orchestrator system
  vercel-client.js              # Vercel API + CLI client
  git-utils.js                  # Git operations and branch management
  logger.js                     # Structured logging system
  config.js                     # Configuration management
  ai-fix-engine.js              # AI-powered error analysis and fixes
  run-build-check.js            # Local build validation
  prompts/
    fix-prompt.md              # AI fix prompt template
  logs/
    deploy-history.json        # Deployment history tracking
  auto-deploy-monitor.js        # Legacy system (deprecated)
  auto-fix-vercel.js            # Legacy system (deprecated)
  continuous-monitor.js          # Legacy system (deprecated)
  debug-client-errors.js         # Debug tool
  vercel-dashboard-fix.js        # Dashboard fix tool
  debug-monitor-system.js        # Debug reporting tool
  README.md                     # This documentation
```

## Usage

### Main Auto-Deploy Agent
```bash
# Start monitoring with default settings
node auto-deploy-agent.js

# Dry-run mode (simulation only)
node auto-deploy-agent.js --dry-run

# Verbose logging
node auto-deploy-agent.js --verbose

# Custom settings
node auto-deploy-agent.js --max-retry 5 --interval 60 --branch-prefix custom-fix
```

### Build Validation
```bash
# Full build validation
node run-build-check.js

# Quick syntax check
node run-build-check.js --quick

# Deployment readiness check
node run-build-check.js --readiness
```

### Legacy Scripts (for debugging only)
```bash
# Legacy monitoring (deprecated)
node auto-deploy-monitor.js
node auto-fix-vercel.js
node continuous-monitor.js
```

## Configuration

### Environment Variables
```bash
# Vercel Settings
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id
VERCEL_TEAM_ID=your_team_id

# AI Settings
AI_PROVIDER=openai
AI_API_KEY=your_openai_key
AI_MODEL=gpt-4

# Retry & Timing
MAX_RETRY_PER_DEPLOYMENT=3
MAX_TOTAL_ATTEMPTS=10
CHECK_INTERVAL=30000
DEPLOYMENT_TIMEOUT=600000

# Branch Settings
BRANCH_PREFIX=bot-fix
MAIN_BRANCH=main

# Feature Flags
ENABLE_AUTO_FIX=true
DRY_RUN=false
VERBOSE=false
ENABLE_AI_FIX=true
```

## Safety Features

- **Branch Isolation**: All fixes applied to separate branches
- **Retry Limits**: Configurable retry attempts per deployment
- **Dry-Run Mode**: Test without making actual changes
- **Build Validation**: Local testing before deployment
- **Error Pattern Detection**: Smart error classification
- **Commit Limits**: Prevent excessive bot commits
- **Rollback Capability**: Automatic rollback on failure
- **Comprehensive Logging**: Full audit trail

## 🚀 Usage

### Safe Monitoring (Recommended)
```bash
# Start with safety enabled (default)
node scripts/safe-deploy-automation.js

# Dry-run mode (simulation only)
node scripts/safe-deploy-automation.js --dry-run true

# Override daily commit limit
node scripts/safe-deploy-automation.js --max-commits 5

# Force mode (bypass some safety checks)
node scripts/safe-deploy-automation.js --force true
```

### Legacy Tools (Deprecated)
```bash
# ⚠️ Use only for debugging
node scripts/debug-monitor-system.js
node scripts/debug-client-errors.js
```

## ⚙️ Configuration

```javascript
config = {
  maxDailyCommits: 10,        // Max commits per day
  maxRetryAttempts: 3,         // Max retry per deployment
  deploymentTimeout: 300000,     // 5 minutes max
  cooldownPeriod: 60000,         // 1 minute cooldown
  enableDryRun: true,           // Start with dry-run
  requireManualApproval: true,    // Require approval for fixes
  enableRollback: true,          // Enable auto-rollback
  logLevel: 'info'              // Detailed logging
}
```

## 🔒 Security Measures

### 1. **Git Safety**
- Branch isolation for fixes
- Hash-based rollback
- Pre-merge validation
- Clean branch management

### 2. **Process Safety**
- Cooldown periods
- Timeout protection
- Infinite loop detection
- Emergency stop capability

### 3. **Data Safety**
- State persistence
- Error logging
- Backup tracking
- Graceful degradation

## 📊 Monitoring Dashboard

### Real-time Status
- Deployment monitoring
- Build progress tracking
- Error classification
- Fix application status

### Historical Reports
- Deployment history
- Fix success rate
- Error patterns
- Performance metrics

## 🚨 Emergency Procedures

### Manual Stop
```bash
# Emergency stop all automation
taskkill /f /im node.exe
```

### Manual Rollback
```bash
# Rollback to last known good state
git log --oneline -10 --grep="safe-deploy"
git reset --hard <commit-hash>
git push --force origin main
```

### Recovery Mode
```bash
# Start in recovery mode
node scripts/safe-deploy-automation.js --force true --enable-rollback false
```

## 🔄 Migration Guide

### From Legacy to Safe System
1. **Stop Legacy Systems**
   ```bash
   taskkill /f /im node.exe
   ```

2. **Start Safe System**
   ```bash
   node scripts/safe-deploy-automation.js --dry-run true
   ```

3. **Validate Configuration**
   ```bash
   node scripts/safe-deploy-automation.js --help
   ```

4. **Go Live**
   ```bash
   node scripts/safe-deploy-automation.js
   ```

## ⚡ Performance Optimization

### Memory Management
- State persistence to disk
- Process cleanup on exit
- Garbage collection friendly
- Minimal memory footprint

### Network Efficiency
- Cooldown periods
- Batch operations
- Error caching
- Smart retry logic

## 🐛 Troubleshooting

### Common Issues
1. **Infinite Loop Detection**
   - Symptom: Rapid continuous commits
   - Solution: Check `isInfiniteLoop` guard
   - Fix: Review deployment detection logic

2. **Branch Conflicts**
   - Symptom: Merge failures
   - Solution: Clean up fix branches
   - Fix: `git branch -D bot-fix/*`

3. **Rate Limiting**
   - Symptom: Git/Vercel API errors
   - Solution: Check daily commit limits
   - Fix: Adjust `maxDailyCommits`

### Debug Mode
```bash
# Enable debug logging
node scripts/safe-deploy-automation.js --log-level debug

# Check system status
node scripts/debug-monitor-system.js
```

## 📈 Best Practices

### 1. **Always Use Dry-Run First**
```bash
node scripts/safe-deploy-automation.js --dry-run true
```

### 2. **Monitor Logs Closely**
```bash
# Follow logs in real-time
tail -f automation-state.json
```

### 3. **Regular Maintenance**
- Clean up old fix branches
- Review commit history
- Update configuration
- Test rollback procedures

### 4. **Security First**
- Never bypass safety checks in production
- Always validate before merging
- Keep rollback points current
- Monitor for unusual activity

## 🎯 Success Metrics

### KPIs to Track
- **Deployment Success Rate**: >95%
- **Mean Time to Recovery**: <5 minutes
- **False Positive Rate**: <5%
- **Rollback Success Rate**: >99%
- **System Uptime**: >99.9%

### Alert Thresholds
- **Critical**: >3 failed deployments in 1 hour
- **Warning**: >5 commits in 1 hour
- **Info**: Any rollback triggered

## 📞 Support

### Emergency Contacts
- **System Emergency**: Stop all automation
- **Vercel Support**: dashboard.vercel.com
- **GitHub Issues**: Repository issues tab

### Documentation
- **User Guide**: This file
- **API Reference**: Code comments
- **Troubleshooting**: Section above

---

## 🛡️ SECURITY NOTICE

This system implements multiple layers of safety checks:
- ✅ **Branch Isolation**: Fixes never touch main directly
- ✅ **Rollback Capability**: Always can revert changes
- ✅ **Rate Limiting**: Prevents API abuse
- ✅ **Timeout Protection**: Prevents hanging processes
- ✅ **Validation**: Pre-deployment safety checks
- ✅ **Logging**: Complete audit trail

**Use in production environment only after thorough testing!**

---

*Last Updated: 2026-04-08*
*Version: 1.0.0-safe*
*Status: Production Ready*
