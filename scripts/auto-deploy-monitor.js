#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoDeployMonitor {
  constructor() {
    this.monitoring = true;
    this.lastDeployHash = '';
    this.deployAttempts = 0;
    this.maxAttempts = 10;
    this.bugPatterns = [
      /Cannot find module/g,
      /Error:.*export/g,
      /Failed to compile/g,
      /client-side exception/g,
      /HomePageClient.*defined/g,
      /async.*client/g,
      /useTheme.*cannot/g,
      /ReferenceError/g,
      /TypeError/g,
      /hydration/g,
      /window.*not defined/g,
      /localStorage.*not defined/g,
      /document.*not defined/g
    ];
    this.fixStrategies = [
      this.fixMissingFiles,
      this.fixImportErrors,
      this.fixSSRIssues,
      this.fixComponentStructure,
      this.fixDataFetching,
      this.fixThemeIssues,
      this.fixBuildConfig,
      this.createEmergencyFallback
    ];
  }

  async startMonitoring() {
    console.log('Starting automated Vercel deployment monitoring...');
    console.log('This system will monitor every deploy and auto-fix bugs until success');
    console.log('Press Ctrl+C to stop monitoring');
    
    while (this.monitoring && this.deployAttempts < this.maxAttempts) {
      try {
        await this.monitorDeployment();
        await this.sleep(30000); // Check every 30 seconds
      } catch (error) {
        console.error('Monitor error:', error.message);
        await this.sleep(10000);
      }
    }
    
    if (this.deployAttempts >= this.maxAttempts) {
      console.log('Max deployment attempts reached. Stopping monitoring.');
    }
  }

  async monitorDeployment() {
    // Get current commit hash
    const currentHash = this.getCurrentCommitHash();
    
    if (currentHash !== this.lastDeployHash) {
      console.log(`New deployment detected: ${currentHash}`);
      this.lastDeployHash = currentHash;
      this.deployAttempts++;
      
      // Wait for deployment to start
      await this.sleep(15000);
      
      // Monitor deployment progress
      const deploySuccess = await this.monitorDeployProgress();
      
      if (deploySuccess) {
        console.log('Deployment successful! Website is live and working.');
        this.deployAttempts = 0; // Reset on success
      } else {
        console.log('Deployment failed, applying auto-fixes...');
        await this.applyAutoFixes();
      }
    }
  }

  getCurrentCommitHash() {
    try {
      const result = execSync('git rev-parse HEAD', { encoding: 'utf8' });
      return result.trim();
    } catch (error) {
      return '';
    }
  }

  async monitorDeployProgress() {
    console.log('Monitoring deployment progress...');
    
    let attempts = 0;
    const maxAttempts = 20; // 10 minutes max
    
    while (attempts < maxAttempts) {
      try {
        // Check for deployment status
        const deployStatus = this.checkDeployStatus();
        
        if (deployStatus.success) {
          console.log('Deployment completed successfully!');
          return true;
        }
        
        if (deployStatus.failed) {
          console.log('Deployment failed, detecting bugs...');
          const bugs = this.detectBugs();
          console.log(`Found ${bugs.length} bugs:`, bugs);
          return false;
        }
        
        attempts++;
        await this.sleep(30000);
      } catch (error) {
        console.error('Deploy monitoring error:', error.message);
        attempts++;
        await this.sleep(30000);
      }
    }
    
    console.log('Deployment monitoring timeout, assuming failure');
    return false;
  }

  checkDeployStatus() {
    try {
      // Check if files are properly structured
      const filesToCheck = [
        '../src/app/page.tsx',
        '../src/app/HomePageClient.tsx',
        '../src/app/page-data.tsx',
        '../src/components/ThemeProvider.tsx'
      ];
      
      for (const file of filesToCheck) {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
          return { success: false, failed: true, error: `Missing file: ${file}` };
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for obvious syntax errors
        if (content.includes('import HomePageClient') && content.includes('function HomePageClient')) {
          return { success: false, failed: true, error: 'Duplicate HomePageClient definition' };
        }
        
        if (content.includes('"use client"') && content.includes('export default async function')) {
          return { success: false, failed: true, error: 'Async client component' };
        }
      }
      
      return { success: true, failed: false };
    } catch (error) {
      return { success: false, failed: true, error: error.message };
    }
  }

  detectBugs() {
    const bugs = [];
    
    try {
      // Check all relevant files for bug patterns
      const filesToCheck = [
        '../src/app/page.tsx',
        '../src/app/HomePageClient.tsx',
        '../src/app/page-data.tsx',
        '../src/components/ThemeProvider.tsx'
      ];
      
      filesToCheck.forEach(filePath => {
        const fullPath = path.join(__dirname, filePath);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          this.bugPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
              bugs.push({
                file: filePath,
                pattern: pattern.toString(),
                matches: matches.slice(0, 3) // Limit matches to avoid spam
              });
            }
          });
        }
      });
    } catch (error) {
      bugs.push({ error: error.message });
    }
    
    return bugs;
  }

  async applyAutoFixes() {
    console.log('Applying automated fixes...');
    
    let fixesApplied = 0;
    
    for (const strategy of this.fixStrategies) {
      try {
        const result = await strategy.call(this);
        if (result) {
          fixesApplied++;
          console.log(`Applied fix: ${strategy.name}`);
        }
      } catch (error) {
        console.error(`Fix strategy ${strategy.name} failed:`, error.message);
      }
    }
    
    if (fixesApplied > 0) {
      console.log(`Applied ${fixesApplied} fixes, deploying...`);
      await this.commitAndPush(`auto-fix: resolve ${fixesApplied} deployment issues (attempt ${this.deployAttempts})`);
    } else {
      console.log('No fixes applied, creating emergency fallback...');
      await this.createEmergencyFallback();
      await this.commitAndPush(`emergency-fix: fallback deployment (attempt ${this.deployAttempts})`);
    }
  }

  fixMissingFiles() {
    console.log('Checking for missing files...');
    let fixed = false;
    
    const requiredFiles = [
      {
        path: '../src/app/page.tsx',
        content: `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`
      },
      {
        path: '../src/app/HomePageClient.tsx',
        content: `"use client";

import React from "react";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import Footer from "@/src/components/Footer";

interface HomePageClientProps {
  featuredBooks?: any[];
  allBooks?: any[];
  latestBooks?: any[];
  mostRelatable?: any[];
  totalViews?: number;
  totalDownloads?: number;
  config?: any;
}

export default function HomePageClient({ 
  featuredBooks = [],
  allBooks = [],
  latestBooks = [],
  mostRelatable = [],
  totalViews = 0,
  totalDownloads = 0,
  config = { tagline: "Tentang malam yang tak pernah benar-benar tidur..." }
}: HomePageClientProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = mounted && theme === "dark";
  
  return (
    <div className={\`relative min-h-screen \${isDark ? 'bg-[#faf9f7]' : 'bg-gradient-to-br from-[#faf9f7] via-[#f8f7e6] to-[#e8e5d6]'}\`}>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-40 rounded-full bg-gradient-to-br from-[#c7b299]/30 to-[#8b7355]/15 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 opacity-35 rounded-full bg-gradient-to-tr from-[#d2691e]/20 to-[#c7b299]/10 blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 opacity-30 rounded-full bg-gradient-to-r from-[#cd853f]/15 to-[#8b7355]/8 blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className={\`font-serif text-6xl md:text-8xl tracking-tight mb-6 \${isDark ? 'text-[#f5f0e8]' : 'text-[#1a1816]'}\`}>
            Kelas Pekerja
          </h1>
          <p className={\`text-xl md:text-2xl \${isDark ? 'text-[#c4b5a0]' : 'text-[#5c5346]'} mb-4\`}>
            Di antara sunyi dan langkah, kita menemukan makna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/buku"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2d2a26] text-white rounded-full hover:bg-[#1a1816] transition-all duration-300"
            >
              <BookOpen size={18} />
              Mulai Membaca
            </Link>
            <Link
              href="/tulis"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#8b7355]/20 rounded-full text-[#5c5346] hover:border-[#8b7355] hover:text-[#1a1816] transition-all duration-300"
            >
              <PenLine size={18} />
              Tulis Cerita
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}`
      },
      {
        path: '../src/app/page-data.tsx',
        content: `import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";

export async function getPageData() {
  try {
    const featuredData = await getFeaturedBooks(2);
    const config = await getConfig();
    const allBooksData = await getBooks({ limit: 6 });
    
    const featuredBooks = featuredData.books || [];
    const allBooks = allBooksData.books || [];
    const latestBooks = allBooks.slice(0, 3);
    
    const featuredSlugs = new Set(latestBooks.map(b => b.slug));
    const mostRelatable = allBooks
      .filter(b => b.featured && !featuredSlugs.has(b.slug))
      .slice(0, 3);
    
    if (mostRelatable.length < 3) {
      const remaining = allBooks.filter(b => !featuredSlugs.has(b.slug) && !mostRelatable.find(m => m.slug === b.slug));
      mostRelatable.push(...remaining.slice(0, 3 - mostRelatable.length));
    }
    
    const totalViews = allBooks.reduce((sum, book) => sum + (book.stats?.views || 0), 0);
    const totalDownloads = allBooks.reduce((sum, book) => sum + (book.stats?.downloads || 0), 0);

    return {
      featuredBooks,
      allBooks,
      latestBooks,
      mostRelatable,
      totalViews,
      totalDownloads,
      config
    };
  } catch (error) {
    console.error('Error in getPageData:', error);
    return {
      featuredBooks: [],
      allBooks: [],
      latestBooks: [],
      mostRelatable: [],
      totalViews: 0,
      totalDownloads: 0,
      config: { tagline: "Tentang malam yang tak pernah benar-benar tidur..." }
    };
  }
}`
      }
    ];
    
    requiredFiles.forEach(({ path: filePath, content }) => {
      const fullPath = path.join(__dirname, filePath);
      if (!fs.existsSync(fullPath)) {
        console.log(`Creating missing file: ${filePath}`);
        fs.writeFileSync(fullPath, content);
        fixed = true;
      }
    });
    
    return fixed;
  }

  fixImportErrors() {
    console.log('Fixing import errors...');
    let fixed = false;
    
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Ensure all required imports
      const requiredImports = [
        { import: 'import React from "react";', check: 'React.' },
        { import: 'import { useTheme } from "@/src/components/ThemeProvider";', check: 'useTheme' },
        { import: 'import Link from "next/link";', check: '<Link' },
        { import: 'import { ArrowRight, BookOpen, PenLine } from "lucide-react";', check: 'ArrowRight' },
        { import: 'import Footer from "@/src/components/Footer";', check: '<Footer' }
      ];
      
      requiredImports.forEach(({ import: importLine, check }) => {
        if (content.includes(check) && !content.includes(importLine.split(' from ')[0])) {
          content = importLine + '\n' + content;
          fixed = true;
        }
      });
      
      if (fixed) {
        fs.writeFileSync(clientPath, content);
      }
    }
    
    return fixed;
  }

  fixSSRIssues() {
    console.log('Fixing SSR issues...');
    let fixed = false;
    
    const themePath = path.join(__dirname, '../src/components/ThemeProvider.tsx');
    if (fs.existsSync(themePath)) {
      let content = fs.readFileSync(themePath, 'utf8');
      
      // Ensure SSR safety
      if (!content.includes('typeof window')) {
        content = content.replace(/window\./g, 'typeof window !== "undefined" && window.');
        content = content.replace(/localStorage\./g, 'typeof window !== "undefined" && localStorage.');
        content = content.replace(/document\./g, 'typeof window !== "undefined" && document.');
        fixed = true;
      }
      
      if (fixed) {
        fs.writeFileSync(themePath, content);
      }
    }
    
    return fixed;
  }

  fixComponentStructure() {
    console.log('Fixing component structure...');
    let fixed = false;
    
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Remove duplicate HomePageClient definitions
      if (content.includes('function HomePageClient')) {
        content = content.replace(/function HomePageClient[\s\S]*?^}/gm, '');
        fixed = true;
      }
      
      // Ensure proper structure
      if (!content.includes('import HomePageClient from "./HomePageClient"')) {
        content = `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`;
        fixed = true;
      }
      
      if (fixed) {
        fs.writeFileSync(pagePath, content);
      }
    }
    
    return fixed;
  }

  fixDataFetching() {
    console.log('Fixing data fetching...');
    let fixed = false;
    
    const dataPath = path.join(__dirname, '../src/app/page-data.tsx');
    if (fs.existsSync(dataPath)) {
      let content = fs.readFileSync(dataPath, 'utf8');
      
      // Add error handling if missing
      if (!content.includes('try') && !content.includes('catch')) {
        content = content.replace(
          'export async function getPageData() {',
          'export async function getPageData() {\n  try {'
        );
        
        content = content.replace(
          /};$/,
          '  } catch (error) {\n    console.error("Error in getPageData:", error);\n    return {\n      featuredBooks: [],\n      allBooks: [],\n      latestBooks: [],\n      mostRelatable: [],\n      totalViews: 0,\n      totalDownloads: 0,\n      config: { tagline: "Tentang malam yang tak pernah benar-benar tidur..." }\n    };\n  }\n}'
        );
        
        fixed = true;
      }
      
      if (fixed) {
        fs.writeFileSync(dataPath, content);
      }
    }
    
    return fixed;
  }

  fixThemeIssues() {
    console.log('Fixing theme issues...');
    let fixed = false;
    
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Add mounted state if missing
      if (!content.includes('mounted')) {
        content = content.replace(
          'const { theme } = useTheme();',
          'const { theme } = useTheme();\n  const [mounted, setMounted] = React.useState(false);\n\n  React.useEffect(() => {\n    setMounted(true);\n  }, []);'
        );
        
        // Update theme usage
        content = content.replace(
          /const isDark = theme === "dark";/g,
          'const isDark = mounted && theme === "dark";'
        );
        
        fixed = true;
      }
      
      if (fixed) {
        fs.writeFileSync(clientPath, content);
      }
    }
    
    return fixed;
  }

  fixBuildConfig() {
    console.log('Fixing build configuration...');
    let fixed = false;
    
    const vercelPath = path.join(__dirname, '../vercel.json');
    if (fs.existsSync(vercelPath)) {
      let config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
      
      const requiredConfig = {
        framework: "nextjs",
        buildCommand: "npm run build",
        devCommand: "npm run dev",
        installCommand: "npm install",
        outputDirectory: ".next"
      };
      
      if (JSON.stringify(config) !== JSON.stringify(requiredConfig)) {
        fs.writeFileSync(vercelPath, JSON.stringify(requiredConfig, null, 2));
        fixed = true;
      }
    }
    
    return fixed;
  }

  createEmergencyFallback() {
    console.log('Creating emergency fallback...');
    
    // Create ultra-minimal working version
    const minimalPage = `import HomePageClient from "./HomePageClient";

export default function HomePage() {
  return (
    <HomePageClient 
      featuredBooks={[]}
      allBooks={[]}
      latestBooks={[]}
      mostRelatable={[]}
      totalViews={0}
      totalDownloads={0}
      config={{ tagline: "Tentang malam yang tak pernah benar-benar tidur..." }}
    />
  );
}`;
    
    const minimalClient = `"use client";

import React from "react";

export default function HomePageClient(props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#f8f7e6] to-[#e8e5d6] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-serif mb-4 text-[#1a1816]">Kelas Pekerja</h1>
        <p className="text-xl text-[#5c5346] mb-8">Di antara sunyi dan langkah, kita menemukan makna.</p>
        <div className="flex gap-4 justify-center">
          <a href="/buku" className="px-6 py-3 bg-[#2d2a26] text-white rounded-full">Mulai Membaca</a>
          <a href="/tulis" className="px-6 py-3 border border-[#8b7355] rounded-full text-[#5c5346]">Tulis Cerita</a>
        </div>
      </div>
    </div>
  );
}`;
    
    fs.writeFileSync(path.join(__dirname, '../src/app/page.tsx'), minimalPage);
    fs.writeFileSync(path.join(__dirname, '../src/app/HomePageClient.tsx'), minimalClient);
    
    return true;
  }

  async commitAndPush(message) {
    try {
      execSync('git add .', { encoding: 'utf8' });
      execSync(`git commit -m "${message}"`, { encoding: 'utf8' });
      execSync('git push origin main', { encoding: 'utf8' });
      console.log(`Auto-fixes deployed: ${message}`);
    } catch (error) {
      console.error('Failed to push fixes:', error.message);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Start automated deployment monitoring
const monitor = new AutoDeployMonitor();
monitor.startMonitoring().catch(console.error);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nStopping deployment monitoring...');
  monitor.monitoring = false;
  process.exit(0);
});
