# Developer Onboarding & Local Setup Guide

This document outlines the local environment configuration, data layer setup, and verification procedures required for development on **Kelas Pekerja**.

---

## 📋 System Requirements

Ensure your local development workstation satisfies the following requirements:

| Tool | Version Requirement | Verification Command |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.17.0` (LTS Recommended) | `node --version` |
| **npm** | `>= 9.0.0` | `npm --version` |
| **Git** | `>= 2.30.0` | `git --version` |

---

## 🔑 Environment Variables Setup

Create a `.env.local` file in the project root directory. Copy the contents from `.env.example` or populate with your service credentials:

```ini
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_sanity_api_token

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 💾 Data Layer Initialization

### 1. Supabase Relational Database Setup

1. Log into your Supabase Dashboard and select your project.
2. Open the **SQL Editor**.
3. Run the schema migration script located at `supabase-quotes-table.sql`:

```sql
-- Execute supabase-quotes-table.sql content in SQL Editor
```

This creates the requisite tables, indexes, and Row Level Security (RLS) policies for quotes, bookmarks, and user state.

### 2. Sanity Studio CORS Configuration

Ensure your local development URL (`http://localhost:3000`) is allowed in Sanity Management Console:

1. Navigate to `https://manage.sanity.io/`.
2. Select your project -> **API** -> **CORS Origins**.
3. Add `http://localhost:3000` with Credentials enabled.

---

## 🚀 Execution & Verification Pipeline

### 1. Dependencies Installation

```bash
npm install
```

### 2. Static Analysis & Type Checking

Verify code quality and type safety:

```bash
npm run lint
```

### 3. Unit & Integration Testing

Execute Jest test suites:

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### 4. End-to-End Testing (Playwright)

```bash
# Run headless E2E tests
npm run test:e2e

# Open interactive Playwright UI
npm run test:e2e:ui
```

### 5. Production Build Verification

Validate that static site generation (SSG) and server component bundles compile cleanly:

```bash
npm run build
```

---

## ⚡ Operational Troubleshooting

| Issue | Potential Cause | Solution |
| :--- | :--- | :--- |
| `Sanity API Error / CORS Blocked` | Missing origin registration | Add `http://localhost:3000` to Sanity Management CORS origins |
| `Supabase URL Required` | Missing `.env.local` keys | Ensure `NEXT_PUBLIC_SUPABASE_URL` is set prior to starting dev server |
| `NextAuth Callback Error` | Mismatched redirect URI | Set Google Cloud Console Authorized Redirect URI to `http://localhost:3000/api/auth/callback/google` |
