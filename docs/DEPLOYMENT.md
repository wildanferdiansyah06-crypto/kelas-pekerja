# Production Deployment Specification

This document provides deployment configurations, environment variable specifications, and build artifact management for **Kelas Pekerja**.

---

## 🎯 Primary Target: Vercel Edge Platform

Vercel is the primary recommended platform for Next.js 15 applications due to native support for App Router, Server Components, and Edge Middleware.

### Configuration Specification (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Production Deployment via CLI

```bash
# Preview Deployment
npx vercel

# Production Deployment
npx vercel --prod
```

---

## 🌐 Alternative Target: Netlify Platform

Netlify is supported via the official `@netlify/plugin-nextjs` plugin.

### Configuration Specification (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 📦 Static Export (SSG) Configuration

If deploying to a pure static file web server (e.g. AWS S3, Nginx, GitHub Pages), enable static export in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig;
```

Execute static export build:

```bash
npm run export
```

The static output artifacts will be written to the `out/` directory.

---

## 🔐 Production Environment Variables Checklist

Ensure the following environment variables are set in your hosting platform dashboard prior to deploying:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] `NEXTAUTH_URL` (Must match production domain URL)
- [ ] `NEXTAUTH_SECRET` (Cryptographically secure 32-byte secret)
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
