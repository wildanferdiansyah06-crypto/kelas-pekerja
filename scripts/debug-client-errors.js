#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ClientErrorDebugger {
  constructor() {
    this.errorPatterns = [
      /Cannot find module/g,
      /useTheme.*must be used/g,
      /ThemeProvider/g,
      /HomePageClient/g,
      /getPageData/g,
      /localStorage/g,
      /window/g,
      /document/g,
      /ReferenceError/g,
      /TypeError/g
    ];
  }

  async debugAndFix() {
    console.log('Starting client-side error debugging...');
    
    try {
      // Check for common client-side issues
      this.checkThemeProviderIssues();
      this.checkImportIssues();
      this.checkSSRIssues();
      this.checkDataIssues();
      
      // Apply fixes
      await this.applyEmergencyFixes();
      
      // Commit and push
      if (this.hasChanges()) {
        this.commitAndPush('debug-fix: resolve client-side exceptions');
      }
      
      console.log('Client-side debugging completed');
    } catch (error) {
      console.error('Debug error:', error.message);
    }
  }

  checkThemeProviderIssues() {
    console.log('Checking ThemeProvider issues...');
    
    const themeProviderPath = path.join(__dirname, '../src/components/ThemeProvider.tsx');
    if (fs.existsSync(themeProviderPath)) {
      let content = fs.readFileSync(themeProviderPath, 'utf8');
      
      // Check for SSR issues
      if (content.includes('window.') && !content.includes('typeof window')) {
        console.log('Found window access without SSR guard');
        content = content.replace(/window\./g, 'typeof window !== "undefined" && window.');
        fs.writeFileSync(themeProviderPath, content);
      }
      
      if (content.includes('localStorage') && !content.includes('typeof window')) {
        console.log('Found localStorage access without SSR guard');
        content = content.replace(/localStorage\./g, 'typeof window !== "undefined" && localStorage.');
        fs.writeFileSync(themeProviderPath, content);
      }
      
      if (content.includes('document.') && !content.includes('typeof window')) {
        console.log('Found document access without SSR guard');
        content = content.replace(/document\./g, 'typeof window !== "undefined" && document.');
        fs.writeFileSync(themeProviderPath, content);
      }
    }
  }

  checkImportIssues() {
    console.log('Checking import issues...');
    
    const filesToCheck = [
      '../src/app/page.tsx',
      '../src/app/HomePageClient.tsx',
      '../src/app/page-data.tsx'
    ];
    
    filesToCheck.forEach(filePath => {
      const fullPath = path.join(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for missing imports
        if (content.includes('useTheme') && !content.includes('import { useTheme }')) {
          console.log(`Missing useTheme import in ${filePath}`);
          content = content.replace(
            '"use client";',
            '"use client";\nimport { useTheme } from "@/src/components/ThemeProvider";'
          );
          fs.writeFileSync(fullPath, content);
        }
        
        if (content.includes('<Image') && !content.includes('import Image')) {
          console.log(`Missing Image import in ${filePath}`);
          content = content.replace(
            'import Link from "next/link";',
            'import Link from "next/link";\nimport Image from "next/image";'
          );
          fs.writeFileSync(fullPath, content);
        }
        
        if (content.includes('<Footer') && !content.includes('import Footer')) {
          console.log(`Missing Footer import in ${filePath}`);
          content = content.replace(
            'import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";',
            'import { ArrowRight, BookOpen, PenLine, Coffee, Eye } from "lucide-react";\nimport Footer from "@/src/components/Footer";'
          );
          fs.writeFileSync(fullPath, content);
        }
      }
    });
  }

  checkSSRIssues() {
    console.log('Checking SSR issues...');
    
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Add SSR-safe checks if missing
      if (!content.includes('typeof window')) {
        console.log('Adding SSR safety checks');
        
        // Add mounted state for SSR safety
        if (content.includes('const { theme } = useTheme()')) {
          content = content.replace(
            'const { theme } = useTheme();',
            'const { theme } = useTheme();\n  const [mounted, setMounted] = React.useState(false);\n\n  React.useEffect(() => {\n    setMounted(true);\n  }, []);'
          );
        }
        
        // Update theme usage with mounted check
        content = content.replace(
          /const isDark = theme === "dark";/g,
          'const isDark = mounted && theme === "dark";'
        );
        
        fs.writeFileSync(clientPath, content);
      }
    }
  }

  checkDataIssues() {
    console.log('Checking data fetching issues...');
    
    const dataPath = path.join(__dirname, '../src/app/page-data.tsx');
    if (fs.existsSync(dataPath)) {
      let content = fs.readFileSync(dataPath, 'utf8');
      
      // Add error handling for data fetching
      if (!content.includes('try') && !content.includes('catch')) {
        console.log('Adding error handling to data fetching');
        
        content = content.replace(
          'export async function getPageData() {',
          'export async function getPageData() {\n  try {'
        );
        
        content = content.replace(
          /};$/,
          '  } catch (error) {\n    console.error("Error in getPageData:", error);\n    return {\n      featuredBooks: [],\n      allBooks: [],\n      latestBooks: [],\n      mostRelatable: [],\n      totalViews: 0,\n      totalDownloads: 0,\n      config: { tagline: "Tentang malam yang tak pernah benar-benar tidur..." }\n    };\n  }\n}'
        );
        
        fs.writeFileSync(dataPath, content);
      }
    }
  }

  async applyEmergencyFixes() {
    console.log('Applying emergency fixes...');
    
    // Create minimal working HomePageClient if needed
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (!fs.existsSync(clientPath)) {
      console.log('Creating minimal HomePageClient');
      this.createMinimalHomePageClient(clientPath);
    }
    
    // Ensure page.tsx is minimal and working
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (!fs.existsSync(pagePath)) {
      console.log('Creating minimal page.tsx');
      this.createMinimalPage(pagePath);
    }
  }

  createMinimalHomePageClient(filePath) {
    const content = `"use client";

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
        {/* Simple background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-32 h-32 opacity-30 rounded-full bg-gradient-to-br from-[#c7b299]/20 to-[#8b7355]/10 blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 opacity-25 rounded-full bg-gradient-to-tr from-[#d2691e]/15 to-[#c7b299]/8 blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 opacity-20 rounded-full bg-gradient-to-r from-[#cd853f]/10 to-[#8b7355]/5 blur-2xl"></div>
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
}`;
    fs.writeFileSync(filePath, content);
  }

  createMinimalPage(filePath) {
    const content = `import { getPageData } from "./page-data";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const pageData = await getPageData();
  
  return <HomePageClient {...pageData} />;
}`;
    fs.writeFileSync(filePath, content);
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
      console.log(`Debug fixes pushed: ${message}`);
    } catch (error) {
      console.error('Failed to push debug fixes:', error.message);
    }
  }
}

// Run client error debugger
const clientDebugger = new ClientErrorDebugger();
clientDebugger.debugAndFix().catch(console.error);
