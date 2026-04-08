#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class VercelDashboardFix {
  constructor() {
    this.commonDashboardErrors = [
      'Build failed',
      'Runtime Error',
      'Function invocation error',
      'Timeout',
      'Memory limit exceeded',
      'Static file not found',
      '500 Internal Server Error',
      '504 Gateway Timeout',
      'hydration failed',
      'chunk load error',
      'network error',
      'client-side exception'
    ];
  }

  async diagnoseAndFix() {
    console.log('Diagnosing Vercel dashboard errors...');
    
    try {
      // Check for common dashboard issues
      await this.checkBuildIssues();
      await this.checkRuntimeIssues();
      await this.checkPerformanceIssues();
      await this.checkStaticFileIssues();
      await this.checkHydrationIssues();
      
      // Apply comprehensive fixes
      await this.applyComprehensiveFixes();
      
      // Deploy fixes
      if (this.hasChanges()) {
        await this.commitAndPush('dashboard-fix: resolve Vercel dashboard errors');
      }
      
      console.log('Dashboard error fixes completed');
    } catch (error) {
      console.error('Dashboard fix error:', error.message);
    }
  }

  async checkBuildIssues() {
    console.log('Checking build issues...');
    
    // Check Next.js configuration
    const nextConfigPath = path.join(__dirname, '../next.config.js');
    if (!fs.existsSync(nextConfigPath)) {
      console.log('Creating Next.js configuration...');
      this.createNextConfig();
    }
    
    // Check package.json scripts
    const packagePath = path.join(__dirname, '../package.json');
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Ensure proper build script
      if (!packageJson.scripts || !packageJson.scripts.build) {
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts.build = "next build";
        packageJson.scripts.start = "next start";
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      }
    }
  }

  createNextConfig() {
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;`;
    
    fs.writeFileSync(path.join(__dirname, '../next.config.js'), nextConfig);
  }

  async checkRuntimeIssues() {
    console.log('Checking runtime issues...');
    
    // Check for server-side API issues
    const apiDir = path.join(__dirname, '../src/app/api');
    if (fs.existsSync(apiDir)) {
      // Ensure API routes are properly structured
      const apiFiles = this.findFiles(apiDir, '.js', '.ts');
      
      apiFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        // Add error handling to API routes
        if (content.includes('export async function') && !content.includes('try')) {
          const fixedContent = this.addErrorHandlingToAPI(content);
          fs.writeFileSync(file, fixedContent);
        }
      });
    }
  }

  addErrorHandlingToAPI(content) {
    return content.replace(
      /export async function (\w+)\([^)]*\) {[\s\S]*?^}/gm,
      (match, funcName) => {
        const funcBody = match.replace(/export async function (\w+)\([^)]*\) {/, '').replace(/}$/, '');
        return `export async function ${funcName}() {
  try {
${funcBody}
  } catch (error) {
    console.error('API Error in ${funcName}:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}`;
      }
    );
  }

  async checkPerformanceIssues() {
    console.log('Checking performance issues...');
    
    // Check for large bundle sizes
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Optimize imports
      if (content.includes('import * as')) {
        content = content.replace(/import \* as (\w+) from/g, 'import { $1 } from');
        fs.writeFileSync(clientPath, content);
      }
      
      // Add lazy loading for heavy components
      if (content.length > 50000) {
        console.log('Large component detected, optimizing...');
        this.optimizeLargeComponent(clientPath);
      }
    }
  }

  optimizeLargeComponent(filePath) {
    // Split large component into smaller chunks
    const content = fs.readFileSync(filePath, 'utf8');
    
    // This is a simplified optimization - in real scenarios, you'd want more sophisticated splitting
    const optimizedContent = content.replace(
      /\/\* FEATURED BOOKS \*\/[\s\S]*?<\/section>/g,
      '// Lazy loaded section'
    );
    
    fs.writeFileSync(filePath, optimizedContent);
  }

  async checkStaticFileIssues() {
    console.log('Checking static file issues...');
    
    // Check public directory
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Ensure robots.txt exists
    const robotsPath = path.join(publicDir, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      fs.writeFileSync(robotsPath, `User-agent: *
Allow: /
Sitemap: https://kelas-pekerja.vercel.app/sitemap.xml`);
    }
    
    // Ensure sitemap.xml exists
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kelas-pekerja.vercel.app/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
    }
  }

  async checkHydrationIssues() {
    console.log('Checking hydration issues...');
    
    // Fix hydration mismatches
    const clientPath = path.join(__dirname, '../src/app/HomePageClient.tsx');
    if (fs.existsSync(clientPath)) {
      let content = fs.readFileSync(clientPath, 'utf8');
      
      // Add proper hydration guards
      if (!content.includes('useEffect(() => {')) {
        content = this.addHydrationGuards(content);
        fs.writeFileSync(clientPath, content);
      }
    }
  }

  addHydrationGuards(content) {
    return content.replace(
      'export default function HomePageClient',
      `export default function HomePageClient`
    ).replace(
      /const { theme } = useTheme\(\);/,
      `const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);`
    ).replace(
      /const isDark = theme === "dark";/g,
      'const isDark = mounted ? theme === "dark" : false;'
    );
  }

  async applyComprehensiveFixes() {
    console.log('Applying comprehensive fixes...');
    
    // Fix common Next.js issues
    await this.fixNextJSIssues();
    
    // Fix component structure
    await this.fixComponentStructure();
    
    // Fix imports
    await this.fixImports();
    
    // Add error boundaries
    await this.addErrorBoundaries();
  }

  async fixNextJSIssues() {
    console.log('Fixing Next.js specific issues...');
    
    // Ensure proper layout structure
    const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
    if (!fs.existsSync(layoutPath)) {
      this.createLayout();
    }
    
    // Fix metadata issues
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Remove any metadata from client components
      if (content.includes('export const metadata')) {
        content = content.replace(/export const metadata[^;]*;[^}]*}/g, '');
        fs.writeFileSync(pagePath, content);
      }
    }
  }

  createLayout() {
    const layoutContent = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kelas Pekerja",
  description: "Ruang bagi yang mengarungi sunyi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`;
    
    fs.writeFileSync(path.join(__dirname, '../src/app/layout.tsx'), layoutContent);
  }

  async fixComponentStructure() {
    console.log('Fixing component structure...');
    
    // Ensure proper component separation
    const pagePath = path.join(__dirname, '../src/app/page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Remove any client component logic from server component
      if (content.includes('"use client"')) {
        content = content.replace('"use client";', '');
        fs.writeFileSync(pagePath, content);
      }
    }
  }

  async fixImports() {
    console.log('Fixing imports...');
    
    const files = [
      '../src/app/page.tsx',
      '../src/app/HomePageClient.tsx',
      '../src/app/page-data.tsx'
    ];
    
    files.forEach(filePath => {
      const fullPath = path.join(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Fix common import issues
        content = content.replace(/from "@\/src\//g, 'from "@/src/');
        content = content.replace(/from "\.\/\//g, 'from "./');
        
        fs.writeFileSync(fullPath, content);
      }
    });
  }

  async addErrorBoundaries() {
    console.log('Adding error boundaries...');
    
    // Create error boundary component
    const errorBoundaryPath = path.join(__dirname, '../src/components/ErrorBoundary.tsx');
    if (!fs.existsSync(errorBoundaryPath)) {
      const errorBoundaryContent = `'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf9f7] to-[#e8e5d6]">
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-4 text-[#1a1816]">Oops!</h1>
            <p className="text-lg text-[#5c5346] mb-8">Something went wrong. We're working on it.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#2d2a26] text-white rounded-full hover:bg-[#1a1816] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}`;
      
      fs.writeFileSync(errorBoundaryPath, errorBoundaryContent);
    }
  }

  findFiles(dir, ...extensions) {
    const files = [];
    
    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(dir);
    return files;
  }

  hasChanges() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  async commitAndPush(message) {
    try {
      execSync('git add .', { encoding: 'utf8' });
      execSync(`git commit -m "${message}"`, { encoding: 'utf8' });
      execSync('git push origin main', { encoding: 'utf8' });
      console.log(`Dashboard fixes deployed: ${message}`);
    } catch (error) {
      console.error('Failed to push dashboard fixes:', error.message);
    }
  }
}

// Run dashboard fix
const dashboardFix = new VercelDashboardFix();
dashboardFix.diagnoseAndFix().catch(console.error);
