# Deployment Guide

Project ini dapat dideploy ke berbagai platform. Berikut panduan deployment untuk Vercel dan Netlify.

---

## Deployment ke Vercel

### Opsi 1: Melalui Vercel Dashboard (Manual)

#### Langkah 1: Buat Akun Vercel
1. Buka [vercel.com](https://vercel.com)
2. Sign up dengan GitHub, GitLab, atau Bitbucket

#### Langkah 2: Import Project
1. Klik "Add New" → "Project"
2. Pilih repository `wildanferdiansyah06-crypto/kelas-pekerja`
3. Vercel akan mendeteksi Next.js secara otomatis

#### Langkah 3: Konfigurasi Build
Vercel akan mengisi konfigurasi secara otomatis:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Jika perlu diubah secara manual:
```bash
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### Langkah 4: Environment Variables (Opsional)
Tambahkan environment variables jika diperlukan:
- `NEXT_PUBLIC_SITE_URL`: URL produksi (misal: `https://kelaspekerja.vercel.app`)

#### Langkah 5: Deploy
1. Klik "Deploy"
2. Tunggu proses build selesai
3. Site akan live di URL yang diberikan Vercel

#### Langkah 6: Custom Domain (Opsional)
1. Buka project settings → Domains
2. Add custom domain
3. Update DNS records sesuai instruksi Vercel

---

### Opsi 2: Melalui Vercel CLI

#### Langkah 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Langkah 2: Login
```bash
vercel login
```

#### Langkah 3: Link Project
```bash
cd path/to/kelas-pekerja
vercel link
```

#### Langkah 4: Deploy ke Preview
```bash
vercel
```

#### Langkah 5: Deploy ke Production
```bash
vercel --prod
```

---

### Opsi 3: Melalui GitHub Actions (Otomatis)

Project sudah memiliki workflow GitHub Actions untuk deploy otomatis ke Vercel. Lihat [CI-CD-SETUP.md](./CI-CD-SETUP.md) untuk setup secrets.

Workflow akan berjalan otomatis ketika:
- Push ke branch `main`

---

## Deployment ke Netlify

### Opsi 1: Melalui Netlify Dashboard (Manual)

#### Langkah 1: Buat Akun Netlify
1. Buka [netlify.com](https://netlify.com)
2. Sign up dengan GitHub, GitLab, atau Bitbucket

#### Langkah 2: Import Project
1. Klik "Add new site" → "Import an existing project"
2. Pilih repository `wildanferdiansyah06-crypto/kelas-pekerja`

#### Langkah 3: Konfigurasi Build
Netlify akan mendeteksi Next.js, tapi mungkin perlu penyesuaian:

```bash
Build command: npm run build
Publish directory: .next
```

**PENTING**: Untuk static export, ubah konfigurasi:
```bash
Build command: npm run export
Publish directory: out
```

#### Langkah 4: Environment Variables (Opsional)
Tambahkan di Site settings → Environment variables:
- `NEXT_PUBLIC_SITE_URL`: URL produksi

#### Langkah 5: Deploy
1. Klik "Deploy site"
2. Tunggu proses build selesai

#### Langkah 6: Custom Domain (Opsional)
1. Domain settings → Add custom domain
2. Update DNS records

---

### Opsi 2: Melalui Netlify CLI

#### Langkah 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Langkah 2: Login
```bash
netlify login
```

#### Langkah 3: Init Project
```bash
cd path/to/kelas-pekerja
netlify init
```

#### Langkah 4: Deploy
```bash
netlify deploy --prod
```

---

### Opsi 3: Melalui GitHub Actions (Otomatis)

Project sudah memiliki workflow GitHub Actions untuk deploy otomatis ke Netlify. Lihat [CI-CD-SETUP.md](./CI-CD-SETUP.md) untuk setup secrets.

---

## Konfigurasi Khusus

### Static Export (SSG)

Project ini mendukung static export untuk hosting statis. Pastikan konfigurasi di `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

Untuk build static:
```bash
npm run export
```

Output akan ada di folder `out/`.

---

### Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Untuk static export:
```toml
[build]
  command = "npm run export"
  publish = "out"
```

---

## Environment Variables

### Development
Buat file `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production

**Vercel:**
- Settings → Environment Variables
- Add: `NEXT_PUBLIC_SITE_URL` = `https://domain-anda.com`

**Netlify:**
- Site settings → Environment variables
- Add: `NEXT_PUBLIC_SITE_URL` = `https://domain-anda.com`

---

## Troubleshooting

### Build Gagal di Vercel

**Masalah:** Memory limit terlampaui
**Solusi:**
- Upgrade ke Vercel Pro
- Optimasi bundle dengan `next analyze`

**Masalah:** Gambar tidak muncul
**Solusi:**
- Pastikan `images.unoptimized: true` di `next.config.js` untuk static export
- Gunakan URL absolut untuk gambar eksternal

### Build Gagal di Netlify

**Masalah:** Next.js plugin error
**Solusi:**
- Pastikan `@netlify/plugin-nextjs` terinstall
- Cek log build di Netlify dashboard

**Masalah:** Static export gagal
**Solusi:**
- Pastikan `output: 'export'` di `next.config.js`
- Cek apakah ada API routes (tidak didukung di static export)

---

## Platform Lain

### GitHub Pages
Untuk deploy ke GitHub Pages, gunakan workflow khusus atau GitHub Actions dengan `peaceiris/actions-gh-pages`.

### Cloudflare Pages
- Connect GitHub repository
- Build command: `npm run build`
- Output directory: `.next`

### AWS S3 + CloudFront
- Build dengan `npm run export`
- Upload folder `out/` ke S3
- Konfigurasi CloudFront untuk CDN

---

## Rekomendasi

- **Untuk development cepat**: Vercel (integrasi Next.js terbaik)
- **Untuk static hosting**: Netlify atau GitHub Pages
- **Untuk enterprise**: AWS S3 + CloudFront atau Vercel Enterprise

---

## Monitoring

### Vercel Analytics
Aktifkan di project settings untuk monitoring:
- Web Vitals
- Traffic
- Build times

### Netlify Analytics
Aktifkan di site settings untuk:
- Bandwidth usage
- Visitor analytics
- Build performance

---

## Backup & Rollback

### Vercel
- Deployments tab menampilkan semua deployment
- Klik "..." pada deployment → "Promote to Production" untuk rollback

### Netlify
- Deploys tab menampilkan history
- Klik "Publish deploy" pada deployment yang ingin di-rollback
