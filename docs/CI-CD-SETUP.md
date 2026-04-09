# CI/CD Setup Guide

## GitHub Actions Workflows

Project ini memiliki 3 workflow GitHub Actions:

### 1. CI Workflow (`.github/workflows/ci.yml`)
Trigger: Push ke branch `main` atau `develop`, serta Pull Request

Jobs:
- **Lint**: Menjalankan ESLint
- **Type Check**: Validasi TypeScript
- **Build**: Build project Next.js

### 2. Deploy to Vercel (`.github/workflows/deploy-vercel.yml`)
Trigger: Push ke branch `main` atau manual trigger

### 3. Deploy to Netlify (`.github/workflows/deploy-netlify.yml`)
Trigger: Push ke branch `main` atau manual trigger

---

## Setup Secrets di GitHub

### Untuk Vercel Deployment

Buka repository GitHub → Settings → Secrets and variables → Actions → New repository secret

Tambahkan secrets berikut:

1. **VERCEL_TOKEN**
   - Cara mendapatkan: 
     - Login ke Vercel
     - Buka Settings → Tokens
     - Create token dengan scope "Full Account"
   - Copy token dan paste ke GitHub secret

2. **VERCEL_ORG_ID**
   - Cara mendapatkan:
     - Install Vercel CLI: `npm i -g vercel`
     - Login: `vercel login`
     - Jalankan: `vercel link`
     - Buka file `.vercel/project.json` di project
     - Copy value dari `orgId`

3. **VERCEL_PROJECT_ID**
   - Cara mendapatkan:
     - Dari file `.vercel/project.json` yang sama
     - Copy value dari `projectId`

### Untuk Netlify Deployment

Tambahkan secrets berikut:

1. **NETLIFY_AUTH_TOKEN**
   - Cara mendapatkan:
     - Login ke Netlify
     - Buka User settings → Applications → Personal access tokens
     - New access token
     - Copy token dan paste ke GitHub secret

2. **NETLIFY_SITE_ID**
   - Cara mendapatkan:
     - Buka site di Netlify dashboard
     - Site settings → General → Site details
     - Copy "Site ID" atau "API ID"

---

## Cara Menggunakan

### CI Workflow (Otomatis)
Workflow ini berjalan otomatis setiap:
- Push ke branch `main` atau `develop`
- Membuat Pull Request ke `main` atau `develop`

### Deployment Workflow

#### Opsi 1: Otomatis (Push ke main)
Deploy otomatis ketika push ke branch `main`

#### Opsi 2: Manual Trigger
1. Buka repository GitHub
2. Masuk ke tab "Actions"
3. Pilih workflow yang diinginkan (Deploy to Vercel / Deploy to Netlify)
4. Klik "Run workflow" → Pilih branch → Klik "Run workflow"

---

## Catatan Penting

- Hanya aktifkan salah satu deployment workflow (Vercel atau Netlify)
- Untuk menonaktifkan workflow, rename file dari `*.yml` menjadi `*.yml.disabled`
- Pastikan branch `main` sudah terproteksi dengan branch protection rules
