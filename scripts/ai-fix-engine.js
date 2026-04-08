#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AIFixEngine {
  constructor(config = {}) {
    this.config = config;
    this.logger = config.logger;
    this.aiConfig = config.getAIConfig();
    this.promptTemplate = this.loadPromptTemplate();
    
    // Error patterns and categories
    this.errorPatterns = {
      'missing_module': [
        /Cannot find module ['"](.*)['"]/g,
        /Module not found: Can't resolve ['"](.*)['"]/g,
        /Error: Cannot resolve module ['"](.*)['"]/g
      ],
      'import_error': [
        /import.*from ['"](.*)['"].*does not exist/g,
        /The requested module.*does not provide an export/g,
        /export ['"](.*)['"] was not found/g
      ],
      'ssr_issue': [
        /window is not defined/g,
        /document is not defined/g,
        /localStorage is not defined/g,
        /navigator is not defined/g
      ],
      'async_client_component': [
        /"use client".*async function/g,
        /async.*component.*client/g,
        /Server Components.*client/g
      ],
      'type_error': [
        /TypeError: (.*)/g,
        /ReferenceError: (.*) is not defined/g,
        /Cannot read property ['"](.*)['"] of undefined/g
      ],
      'hydration_mismatch': [
        /Hydration failed/g,
        /Text content does not match/g,
        /Warning: Prop.*did not match/g
      ],
      'duplicate_definition': [
        /Duplicate function definition/g,
        /Identifier ['"](.*)['"] has already been declared/g,
        /.*already defined/g
      ],
      'build_config': [
        /Failed to compile/g,
        /Build failed/g,
        /Configuration error/g
      ]
    };
  }

  loadPromptTemplate() {
    const promptPath = path.join(__dirname, 'prompts', 'fix-prompt.md');
    
    try {
      if (fs.existsSync(promptPath)) {
        return fs.readFileSync(promptPath, 'utf8');
      }
    } catch (error) {
      this.logger?.warn('Failed to load prompt template', { error: error.message });
    }
    
    // Fallback prompt
    return this.getDefaultPrompt();
  }

  getDefaultPrompt() {
    return `
You are an expert Next.js and React developer tasked with fixing deployment errors.

## Error Analysis
Error Type: {errorType}
Error Summary: {errorSummary}
Build Logs: {buildLogs}

## Instructions
1. Analyze the error and identify the root cause
2. Provide a minimal, focused fix that addresses the specific issue
3. Ensure the fix follows Next.js App Router best practices
4. Do not make unnecessary structural changes
5. Focus on SSR safety, proper imports, and component structure

## Output Format
Provide your response in this exact JSON format:

{
  "errorType": "{errorType}",
  "rootCause": "Brief explanation of what caused the error",
  "fixStrategy": "How the fix addresses the issue",
  "filesToChange": [
    {
      "filePath": "relative/path/to/file",
      "changes": "Exact code changes to apply",
      "reason": "Why this change is needed"
    }
  ],
  "additionalNotes": "Any important context or warnings"
}

## Important Notes
- Always check for SSR issues (window, document, localStorage)
- Ensure proper client/server component separation
- Fix import paths and missing dependencies
- Maintain existing code structure and patterns
- Test that the fix doesn't break other functionality
`;
  }

  async analyzeError(deploymentData) {
    const { buildLogs, errorSummary, deploymentId } = deploymentData;
    
    this.logger?.info('Analyzing deployment error', { deploymentId });
    
    // Detect error type
    const errorType = this.detectErrorType(buildLogs, errorSummary);
    
    // Extract relevant context
    const context = this.extractErrorContext(buildLogs, errorType);
    
    // Generate AI prompt
    const prompt = this.generatePrompt(errorType, errorSummary, buildLogs, context);
    
    try {
      // Get AI fix suggestion
      const aiResponse = await this.getAIFixSuggestion(prompt);
      
      // Parse and validate AI response
      const fixPlan = this.parseAIResponse(aiResponse);
      
      this.logger?.info('AI fix analysis completed', { 
        errorType, 
        filesToChange: fixPlan.filesToChange?.length || 0 
      });
      
      return {
        errorType,
        fixPlan,
        confidence: this.calculateConfidence(errorType, context),
        context
      };
      
    } catch (error) {
      this.logger?.error('AI analysis failed', { error: error.message });
      
      // Fallback to rule-based fixes
      return this.getFallbackFix(errorType, context);
    }
  }

  detectErrorType(buildLogs, errorSummary) {
    const fullErrorText = `${buildLogs}\n${errorSummary}`.toLowerCase();
    
    for (const [errorType, patterns] of Object.entries(this.errorPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(fullErrorText)) {
          return errorType;
        }
      }
    }
    
    // Default to unknown if no pattern matches
    return 'unknown';
  }

  extractErrorContext(buildLogs, errorType) {
    const context = {
      errorLines: [],
      affectedFiles: [],
      stackTrace: [],
      relevantCode: []
    };

    // Extract error lines
    const lines = buildLogs.split('\n');
    const errorStartIndex = lines.findIndex(line => 
      line.toLowerCase().includes('error') || 
      line.toLowerCase().includes('failed')
    );
    
    if (errorStartIndex !== -1) {
      context.errorLines = lines.slice(
        Math.max(0, errorStartIndex - 2),
        Math.min(lines.length, errorStartIndex + 10)
      );
    }

    // Extract affected files
    const filePattern = /at\s+.*\(([^:]+):(\d+):\d+\)/g;
    let match;
    while ((match = filePattern.exec(buildLogs)) !== null) {
      const filePath = match[1];
      if (!context.affectedFiles.includes(filePath)) {
        context.affectedFiles.push(filePath);
      }
    }

    // Extract stack trace
    const stackPattern = /Error:.*\n([\s\S]*?)(?=\n\s*$|\n\s*at)/g;
    const stackMatch = stackPattern.exec(buildLogs);
    if (stackMatch) {
      context.stackTrace = stackMatch[1].split('\n').filter(line => line.trim());
    }

    return context;
  }

  generatePrompt(errorType, errorSummary, buildLogs, context) {
    let prompt = this.promptTemplate;
    
    // Replace placeholders
    prompt = prompt.replace('{errorType}', errorType);
    prompt = prompt.replace('{errorSummary}', errorSummary);
    prompt = prompt.replace('{buildLogs}', buildLogs.substring(0, 2000)); // Limit logs size
    
    // Add context-specific information
    if (context.affectedFiles.length > 0) {
      prompt += `\n\n## Affected Files\n${context.affectedFiles.join('\n')}\n`;
    }
    
    if (context.errorLines.length > 0) {
      prompt += `\n\n## Error Context\n${context.errorLines.join('\n')}\n`;
    }

    return prompt;
  }

  async getAIFixSuggestion(prompt) {
    if (!this.aiConfig.apiKey) {
      throw new Error('AI API key not configured');
    }

    try {
      // OpenAI API call
      if (this.aiConfig.provider === 'openai') {
        return await this.callOpenAI(prompt);
      }
      
      // Add other AI providers here
      throw new Error(`Unsupported AI provider: ${this.aiConfig.provider}`);
      
    } catch (error) {
      this.logger?.error('AI API call failed', { error: error.message });
      throw error;
    }
  }

  async callOpenAI(prompt) {
    const https = require('https');
    
    const requestData = JSON.stringify({
      model: this.aiConfig.model || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Next.js developer. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2000
    });

    return new Promise((resolve, reject) => {
      const req = https.request('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.aiConfig.apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestData)
        }
      });

      req.on('response', (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (response.choices && response.choices[0]) {
              resolve(response.choices[0].message.content);
            } else {
              reject(new Error('Invalid AI response format'));
            }
          } catch (error) {
            reject(new Error(`Failed to parse AI response: ${error.message}`));
          }
        });
      });

      req.on('error', reject);
      req.write(requestData);
      req.end();
    });
  }

  parseAIResponse(response) {
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback: try parsing entire response
      return JSON.parse(response);
      
    } catch (error) {
      this.logger?.error('Failed to parse AI response', { 
        error: error.message, 
        response: response.substring(0, 500) 
      });
      
      // Return minimal fallback plan
      return {
        errorType: 'unknown',
        rootCause: 'Failed to parse AI response',
        fixStrategy: 'Manual intervention required',
        filesToChange: [],
        additionalNotes: 'AI response could not be parsed'
      };
    }
  }

  calculateConfidence(errorType, context) {
    let confidence = 0.5; // Base confidence
    
    // Higher confidence for well-known error types
    const knownErrors = ['missing_module', 'import_error', 'ssr_issue', 'async_client_component'];
    if (knownErrors.includes(errorType)) {
      confidence += 0.3;
    }
    
    // Higher confidence if we have clear file context
    if (context.affectedFiles.length > 0) {
      confidence += 0.1;
    }
    
    // Higher confidence if we have stack trace
    if (context.stackTrace.length > 0) {
      confidence += 0.1;
    }
    
    return Math.min(confidence, 1.0);
  }

  getFallbackFix(errorType, context) {
    const fallbackFixes = {
      'missing_module': {
        errorType,
        rootCause: 'Module import issue detected',
        fixStrategy: 'Fix import paths and install missing dependencies',
        filesToChange: this.getMissingModuleFixes(context),
        additionalNotes: 'Using rule-based fallback fix'
      },
      'ssr_issue': {
        errorType,
        rootCause: 'SSR compatibility issue',
        fixStrategy: 'Add proper SSR guards for client-side APIs',
        filesToChange: this.getSSRFixes(context),
        additionalNotes: 'Using rule-based fallback fix'
      },
      'async_client_component': {
        errorType,
        rootCause: 'Async client component detected',
        fixStrategy: 'Separate server and client components properly',
        filesToChange: this.getAsyncComponentFixes(context),
        additionalNotes: 'Using rule-based fallback fix'
      }
    };

    return {
      errorType,
      fixPlan: fallbackFixes[errorType] || fallbackFixes['missing_module'],
      confidence: 0.3,
      context
    };
  }

  getMissingModuleFixes(context) {
    const fixes = [];
    
    context.affectedFiles.forEach(filePath => {
      if (filePath.includes('.tsx') || filePath.includes('.ts')) {
        fixes.push({
          filePath,
          changes: '// Fix import paths and ensure all dependencies are installed',
          reason: 'Missing module detected in this file'
        });
      }
    });
    
    return fixes;
  }

  getSSRFixes(context) {
    const fixes = [];
    
    context.affectedFiles.forEach(filePath => {
      if (filePath.includes('.tsx') || filePath.includes('.ts')) {
        fixes.push({
          filePath,
          changes: `
// Add SSR safety checks
if (typeof window !== 'undefined') {
  // Client-side only code
}
`,
          reason: 'Add SSR safety for client-side APIs'
        });
      }
    });
    
    return fixes;
  }

  getAsyncComponentFixes(context) {
    const fixes = [];
    
    context.affectedFiles.forEach(filePath => {
      if (filePath.includes('HomePageClient') || filePath.includes('Client')) {
        fixes.push({
          filePath,
          changes: `
// Remove async from client component
// Move async operations to server component
`,
          reason: 'Client components cannot be async'
        });
      }
    });
    
    return fixes;
  }

  async applyFixes(fixPlan, dryRun = false) {
    if (!fixPlan.filesToChange || fixPlan.filesToChange.length === 0) {
      this.logger?.warn('No files to change in fix plan');
      return { applied: false, reason: 'No files specified' };
    }

    const appliedFixes = [];
    
    for (const fileChange of fixPlan.filesToChange) {
      try {
        const result = await this.applyFileChange(fileChange, dryRun);
        appliedFixes.push(result);
      } catch (error) {
        this.logger?.error('Failed to apply file change', { 
          filePath: fileChange.filePath, 
          error: error.message 
        });
        appliedFixes.push({ 
          filePath: fileChange.filePath, 
          applied: false, 
          error: error.message 
        });
      }
    }

    const successCount = appliedFixes.filter(f => f.applied).length;
    
    this.logger?.info('Fix application completed', { 
      totalFiles: fixPlan.filesToChange.length,
      successful: successCount,
      dryRun 
    });

    return {
      applied: successCount > 0,
      totalFiles: fixPlan.filesToChange.length,
      successful: successCount,
      fixes: appliedFixes
    };
  }

  async applyFileChange(fileChange, dryRun = false) {
    const { filePath, changes, reason } = fileChange;
    
    // Resolve file path relative to project root
    const fullPath = path.resolve(this.config.getPathConfig().projectRoot, filePath);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File does not exist: ${fullPath}`);
    }

    if (dryRun) {
      this.logger?.info('Dry run: would apply change', { filePath, reason });
      return { filePath, applied: true, dryRun: true };
    }

    try {
      // Read current file content
      const currentContent = fs.readFileSync(fullPath, 'utf8');
      
      // Apply the change (this is a simplified approach)
      // In a real implementation, you'd want more sophisticated diff/patch logic
      let newContent = currentContent;
      
      if (changes.includes('// Fix')) {
        // Add fix comments or code
        newContent = currentContent + '\n\n' + changes;
      } else {
        // Replace content based on specific patterns
        newContent = this.applySpecificFix(currentContent, fileChange);
      }
      
      // Write the changes
      fs.writeFileSync(fullPath, newContent);
      
      this.logger?.info('File change applied', { filePath, reason });
      
      return { filePath, applied: true, dryRun: false };
      
    } catch (error) {
      throw new Error(`Failed to apply changes to ${filePath}: ${error.message}`);
    }
  }

  applySpecificFix(content, fileChange) {
    const { filePath, changes } = fileChange;
    
    // Apply specific fix patterns based on file type and error
    if (filePath.includes('HomePageClient')) {
      return this.fixHomePageClient(content, changes);
    }
    
    if (filePath.includes('page.tsx')) {
      return this.fixPageComponent(content, changes);
    }
    
    // Default: append changes
    return content + '\n\n' + changes;
  }

  fixHomePageClient(content, changes) {
    // Fix common HomePageClient issues
    let fixed = content;
    
    // Add SSR safety
    if (content.includes('window.') || content.includes('localStorage')) {
      fixed = fixed.replace(/window\./g, 'typeof window !== "undefined" && window.');
      fixed = fixed.replace(/localStorage\./g, 'typeof window !== "undefined" && localStorage.');
    }
    
    // Add mounted state if missing
    if (!fixed.includes('mounted') && fixed.includes('useTheme')) {
      fixed = fixed.replace(
        'const { theme } = useTheme();',
        'const { theme } = useTheme();\n  const [mounted, setMounted] = React.useState(false);\n\n  React.useEffect(() => {\n    setMounted(true);\n  }, []);'
      );
    }
    
    return fixed;
  }

  fixPageComponent(content, changes) {
    // Fix common page component issues
    let fixed = content;
    
    // Remove duplicate client component definitions
    if (fixed.includes('function HomePageClient') && fixed.includes('import HomePageClient')) {
      fixed = fixed.replace(/function HomePageClient[\s\S]*?^}/gm, '');
    }
    
    // Ensure proper async structure
    if (fixed.includes('"use client"') && fixed.includes('export default async function')) {
      fixed = `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`;
    }
    
    return fixed;
  }
}

module.exports = AIFixEngine;
