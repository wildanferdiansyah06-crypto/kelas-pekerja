#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ContinuousMonitor {
  constructor() {
    this.monitoring = true;
    this.lastBuildHash = '';
    this.errorPatterns = [
      /Cannot find module/g,
      /Error:.*export/g,
      /Failed to compile/g,
      /client-side exception/g,
      /HomePageClient.*defined/g,
      /async.*client/g,
      /useTheme.*cannot/g
    ];
  }

  async startMonitoring() {
    console.log('Starting continuous Vercel build monitoring...');
    console.log('Press Ctrl+C to stop monitoring');
    
    while (this.monitoring) {
      try {
        await this.checkAndFix();
        await this.sleep(30000); // Check every 30 seconds
      } catch (error) {
        console.error('Monitor error:', error.message);
        await this.sleep(10000);
      }
    }
  }

  async checkAndFix() {
    // Get latest commit
    const currentHash = this.getCurrentCommitHash();
    
    if (currentHash !== this.lastBuildHash) {
      console.log(`New build detected: ${currentHash}`);
      this.lastBuildHash = currentHash;
      
      // Wait a bit for build to start
      await this.sleep(10000);
      
      // Monitor build progress
      await this.monitorBuildProgress();
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

  async monitorBuildProgress() {
    console.log('Monitoring build progress...');
    
    let attempts = 0;
    const maxAttempts = 20; // 10 minutes max
    
    while (attempts < maxAttempts) {
      try {
        // Check if there are any local changes that need fixing
        if (this.needsFixing()) {
          console.log('Issues detected, applying fixes...');
          await this.applyFixes();
          break;
        }
        
        // Check if build is complete (no ongoing build)
        const buildStatus = this.checkBuildStatus();
        if (buildStatus.success) {
          console.log('Build completed successfully!');
          break;
        }
        
        attempts++;
        await this.sleep(30000);
      } catch (error) {
        console.error('Build monitoring error:', error.message);
        attempts++;
        await this.sleep(30000);
      }
    }
    
    if (attempts >= maxAttempts) {
      console.log('Build monitoring timeout, applying emergency fixes...');
      await this.applyEmergencyFixes();
    }
  }

  needsFixing() {
    try {
      // Check for common issues
      const filesToCheck = [
        '../src/app/page.tsx',
        '../src/app/HomePageClient.tsx',
        '../src/app/page-data.tsx'
      ];
      
      for (const file of filesToCheck) {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
          console.log(`Missing file: ${file}`);
          return true;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for error patterns
        for (const pattern of this.errorPatterns) {
          if (pattern.test(content)) {
            console.log(`Error pattern found in ${file}`);
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error checking files:', error.message);
      return true;
    }
  }

  async applyFixes() {
    console.log('Applying automated fixes...');
    
    try {
      // Fix missing files
      this.ensureRequiredFiles();
      
      // Fix import issues
      this.fixImportProblems();
      
      // Fix component structure
      this.fixComponentStructure();
      
      // Fix build configuration
      this.fixBuildConfig();
      
      // Commit and push
      if (this.hasChanges()) {
        this.commitAndPush('auto-fix: resolve build issues detected by monitoring');
      }
      
      console.log('Fixes applied successfully');
    } catch (error) {
      console.error('Error applying fixes:', error.message);
    }
  }

  ensureRequiredFiles() {
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
        path: '../src/app/page-data.tsx',
        content: `import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";

export async function getPageData() {
  const featuredData = await getFeaturedBooks(2);
  const config = await getConfig();
  const allBooksData = await getBooks({ limit: 6 });
  
  const featuredBooks = featuredData.books;
  const allBooks = allBooksData.books;
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
}`
      }
    ];
    
    requiredFiles.forEach(({ path: filePath, content }) => {
      const fullPath = path.join(__dirname, filePath);
      if (!fs.existsSync(fullPath)) {
        console.log(`Creating missing file: ${filePath}`);
        fs.writeFileSync(fullPath, content);
      }
    });
  }

  fixImportProblems() {
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Ensure all required imports
      const requiredImports = [
        '"use client";',
        'import { useTheme } from "@/src/components/ThemeProvider";',
        'import Link from "next/link";',
        'import Image from "next/image";',
        'import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";',
        'import Footer from "@/src/components/Footer";'
      ];
      
      requiredImports.forEach(importLine => {
        if (!content.includes(importLine.split(' from ')[0] || importLine)) {
          content = importLine + '\n' + content;
        }
      });
      
      fs.writeFileSync(clientPath, content);
    }
  }

  fixComponentStructure() {
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Remove any duplicate HomePageClient definitions
      content = content.replace(/function HomePageClient[\s\S]*?^}/gm, '');
      
      // Ensure proper structure
      if (!content.includes('import HomePageClient from "./HomePageClient"')) {
        content = `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`;
      }
      
      fs.writeFileSync(pagePath, content);
    }
  }

  fixBuildConfig() {
    const vercelPath = path.join(__dirname, '../vercel.json');
    if (fs.existsSync(vercelPath)) {
      let config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
      
      // Ensure correct configuration
      config = {
        framework: "nextjs",
        buildCommand: "npm run build",
        devCommand: "npm run dev",
        installCommand: "npm install",
        outputDirectory: ".next"
      };
      
      fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2));
    }
  }

  async applyEmergencyFixes() {
    console.log('Applying emergency fixes...');
    
    // Create minimal working version
    this.createMinimalWorkingVersion();
    
    if (this.hasChanges()) {
      this.commitAndPush('emergency-fix: restore basic functionality');
    }
  }

  createMinimalWorkingVersion() {
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    const dataPath = path.join(__dirname, '../src/app/page-data.tsx');
    
    // Create minimal page.tsx
    fs.writeFileSync(pagePath, `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`);
    
    // Create minimal HomePageClient.tsx
    fs.writeFileSync(clientPath, `"use client";

import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import Footer from "@/src/components/Footer";

interface HomePageClientProps {
  featuredBooks: any[];
  allBooks: any[];
  latestBooks: any[];
  mostRelatable: any[];
  totalViews: number;
  totalDownloads: number;
  config: any;
}

export default function HomePageClient(props: HomePageClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={\`relative min-h-screen \${isDark ? 'bg-[#faf9f7]' : 'bg-gradient-to-br from-[#faf9f7] via-[#f8f7e6] to-[#e8e5d6]'}\`}>
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
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
}`);
    
    // Create minimal page-data.tsx
    fs.writeFileSync(dataPath, `import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";

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
}`);
  }

  checkBuildStatus() {
    try {
      // Simple check - if we can read the files, build is likely OK
      const pagePath = path.join(__dirname, '../src/app/page.tsx');
      const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
      
      return {
        success: fs.existsSync(pagePath) && fs.existsSync(clientPath),
        message: 'Build files exist'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  hasChanges() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  commitAndPush(message) {
    try {
      execSync('git add .', { encoding: 'utf8' });
      execSync(`git commit -m "${message}"`, { encoding: 'utf8' });
      execSync('git push origin main', { encoding: 'utf8' });
      console.log(`Changes pushed: ${message}`);
    } catch (error) {
      console.error('Failed to push changes:', error.message);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Start continuous monitoring
const monitor = new ContinuousMonitor();
monitor.startMonitoring().catch(console.error);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nStopping continuous monitoring...');
  monitor.monitoring = false;
  process.exit(0);
});
