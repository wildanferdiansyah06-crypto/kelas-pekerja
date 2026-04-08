#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Auto-fix system for Vercel builds
class VercelAutoFix {
  constructor() {
    this.commonFixes = [
      this.fixImportErrors,
      this.fixAsyncClientComponent,
      this.fixMissingFiles,
      this.fixTypeScriptErrors,
      this.fixBuildConfig
    ];
  }

  async monitorAndFix() {
    console.log('Starting Vercel auto-fix monitoring...');
    
    try {
      // Check current build status
      const buildStatus = this.checkBuildStatus();
      console.log('Build status:', buildStatus);
      
      // Apply fixes based on common errors
      for (const fix of this.commonFixes) {
        await fix.call(this);
      }
      
      // Commit and push fixes
      if (this.hasChanges()) {
        this.commitAndPush();
      }
      
      console.log('Auto-fix cycle completed');
    } catch (error) {
      console.error('Auto-fix error:', error.message);
    }
  }

  checkBuildStatus() {
    try {
      const gitLog = execSync('git log --oneline -1', { encoding: 'utf8' });
      return { success: true, lastCommit: gitLog.trim() };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  fixImportErrors() {
    console.log('Checking import errors...');
    
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Fix common import issues
      if (content.includes('import HomePageClient') && content.includes('function HomePageClient')) {
        console.log('Fixing duplicate HomePageClient definition...');
        content = content.replace(/function HomePageClient[\s\S]*?^}/m, '');
        fs.writeFileSync(pagePath, content);
      }
    }
  }

  fixAsyncClientComponent() {
    console.log('Checking async client component issues...');
    
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Ensure proper server/client separation
      if (content.includes('"use client"') && content.includes('export default async function')) {
        console.log('Fixing async client component...');
        content = `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`;
        fs.writeFileSync(pagePath, content);
      }
    }
  }

  fixMissingFiles() {
    console.log('Checking missing files...');
    
    const requiredFiles = [
      '../src/app/HomePageClient.tsx',
      '../src/app/page-data.tsx'
    ];
    
    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.log(`Creating missing file: ${file}`);
        if (file.includes('HomePageClient')) {
          this.createHomePageClient(filePath);
        } else if (file.includes('page-data')) {
          this.createPageData(filePath);
        }
      }
    });
  }

  createHomePageClient(filePath) {
    const content = `"use client";

import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";
import Footer from "@/src/components/Footer";

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Hari ini";
  if (diffInDays === 1) return "Kemarin";
  if (diffInDays < 7) return \`\${diffInDays} hari lalu\`;
  if (diffInDays < 30) return \`\${Math.floor(diffInDays / 7)} minggu lalu\`;
  return \`\${Math.floor(diffInDays / 30)} bulan lalu\`;
}

interface HomePageClientProps {
  featuredBooks: any[];
  allBooks: any[];
  latestBooks: any[];
  mostRelatable: any[];
  totalViews: number;
  totalDownloads: number;
  config: any;
}

export default function HomePageClient({ 
  featuredBooks, 
  allBooks, 
  latestBooks, 
  mostRelatable, 
  totalViews, 
  totalDownloads, 
  config 
}: HomePageClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={\`relative min-h-screen \${isDark ? 'bg-[#faf9f7]' : 'bg-gradient-to-br from-[#faf9f7] via-[#f8f7e6] to-[#e8e5d6]'} \${isDark ? 'text-[#2d2a26]' : 'text-[#2b2a26]'} dark:text-[#e8e0d5] transition-colors duration-500\`}>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className={\`font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 \${isDark ? 'text-[#f5f0e8]' : 'text-[#1a1816]'} dark:text-[#f5f0e8]\`}>
              Kelas Pekerja
            </h1>
            <p className={\`text-xl md:text-2xl \${isDark ? 'text-[#c4b5a0]' : 'text-[#5c5346]'} dark:text-[#c4b5a0] mb-4 max-w-2xl mx-auto leading-relaxed\`}>
              Di antara sunyi dan langkah, kita menemukan makna.
            </p>
          </div>
        </section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}`;
    fs.writeFileSync(filePath, content);
  }

  createPageData(filePath) {
    const content = `import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";

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
}`;
    fs.writeFileSync(filePath, content);
  }

  fixTypeScriptErrors() {
    console.log('Checking TypeScript errors...');
    
    // Fix common TypeScript issues
    const fixes = [
      this.fixImageImport,
      this.fixThemeImport,
      this.fixFooterImport
    ];
    
    fixes.forEach(fix => fix.call(this));
  }

  fixImageImport() {
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Ensure Image is imported
      if (content.includes('<Image') && !content.includes('import Image from "next/image"')) {
        content = content.replace(
          'import Link from "next/link";',
          'import Link from "next/link";\nimport Image from "next/image";'
        );
        fs.writeFileSync(clientPath, content);
      }
    }
  }

  fixThemeImport() {
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Ensure useTheme is imported
      if (content.includes('useTheme') && !content.includes('import { useTheme }')) {
        content = content.replace(
          '"use client";',
          '"use client";\nimport { useTheme } from "@/src/components/ThemeProvider";'
        );
        fs.writeFileSync(clientPath, content);
      }
    }
  }

  fixFooterImport() {
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Ensure Footer is imported
      if (content.includes('<Footer') && !content.includes('import Footer')) {
        content = content.replace(
          'import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";',
          'import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";\nimport Footer from "@/src/components/Footer";'
        );
        fs.writeFileSync(clientPath, content);
      }
    }
  }

  fixBuildConfig() {
    console.log('Checking build configuration...');
    
    const vercelPath = path.join(__dirname, '../vercel.json');
    if (fs.existsSync(vercelPath)) {
      let config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
      
      // Ensure correct output directory
      if (!config.outputDirectory || config.outputDirectory !== '.next') {
        config.outputDirectory = '.next';
        fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2));
      }
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

  commitAndPush() {
    try {
      execSync('git add .', { encoding: 'utf8' });
      execSync('git commit -m "auto-fix: resolve build errors automatically"', { encoding: 'utf8' });
      execSync('git push origin main', { encoding: 'utf8' });
      console.log('Auto-fix changes pushed to repository');
    } catch (error) {
      console.error('Failed to push changes:', error.message);
    }
  }
}

// Run auto-fix
const autoFix = new VercelAutoFix();
autoFix.monitorAndFix().catch(console.error);
