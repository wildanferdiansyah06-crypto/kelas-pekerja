✅ README.md created

# Kelas Pekerja — Static Frontend + JSON API

Arsitektur modern untuk website literasi dengan Next.js 15, App Router, dan Static Site Generation (SSG).

## 🏗️ Arsitektur

```
Static Frontend (Next.js 15 + React 19)
         ↓
    JSON API (Local Files)
         ↓
   Static HTML Export
```

### Keunggulan Arsitektur Ini:

- ⚡ **Super Cepat**: Static HTML, no server rendering delay
- 🔧 **Mudah Maintain**: Konten di JSON, bukan hardcode
- 📱 **SEO-Friendly**: Prerender + proper meta tags
- 🚀 **Siap Scale**: Bisa ganti backend tanpa ubah frontend
- 💰 **Gratis Hosting**: Vercel, Netlify, GitHub Pages

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/username/kelas-pekerja.git
cd kelas-pekerja
npm install
```

### 2. Development

```bash
npm run dev
# Open http://localhost:3000
```

### 3. Build & Export

```bash
npm run build
# Output: ./dist (static files)
```

### 4. Serve Locally

```bash
npm run serve
# Serve ./dist on http://localhost:3000
```

## 📁 Struktur Data (JSON API)

### Buku (`public/data/books.json`)

```json
{
  "books": [
    {
      "id": "1",
      "slug": "seni-menyeduh-kehidupan",
      "title": "Seni Menyeduh Kehidupan",
      "category": "kehidupan",
      "pages": 45,
      "readTime": "25 menit",
      "cover": "https://images.unsplash.com/...",
      "featured": true
    }
  ]
}
```

### Quotes (`public/data/quotes.json`)

```json
{
  "quotes": [
    {
      "id": 1,
      "text": "Hari ini kopi lebih pahit dari biasanya...",
      "category": "kopi",
      "mood": "melancholic"
    }
  ]
}
```

### Config (`public/data/config.json`)

```json
{
  "site": { "title": "...", "description": "..." },
  "author": { "name": "...", "bio": "..." },
  "navigation": [...],
  "accounts": [...]
}
```

## 🔌 API Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/books` | GET | List semua buku (dengan filter) |
| `/api/books/[slug]` | GET | Detail buku |
| `/api/quotes` | GET | List quotes |
| `/api/quotes/random` | GET | Random quote |
| `/api/config` | GET | Konfigurasi situs |

### Query Parameters

```bash
# Filter kategori
/api/books?category=kehidupan

# Search
/api/books?search=kopi

# Limit
/api/books?limit=3

# Featured only
/api/books?featured=true
```

## ✨ Fitur

### Implemented ✅

- [x] **Static Generation**: Semua halaman diprerender saat build
- [x] **ISR**: Incremental Static Regeneration (revalidate tiap jam)
- [x] **Dark Mode**: Toggle + system preference detection
- [x] **Bookmark System**: LocalStorage + halaman simpanan
- [x] **Random Coffee Thought**: Generator quote acak
- [x] **Search**: Client-side search buku
- [x] **Category Filter**: Filter buku by kategori
- [x] **Share Buttons**: WhatsApp, Twitter, Facebook, Copy Link
- [x] **Real-time Clock**: Widget jam di navbar
- [x] **Responsive Design**: Mobile-first approach
- [x] **SEO**: Meta tags, Open Graph, structured data

### Roadmap 🗺️

- [ ] **Komentar**: Giscus/Disqus integration
- [ ] **Newsletter**: Email subscription form
- [ ] **View Counter**: KV storage (Upstash/Redis)
- [ ] **Submit Cerita**: Form untuk komunitas
- [ ] **CMS Integration**: Strapi/Sanity untuk edit konten
- [ ] **PWA**: Offline support + installable

## 🎨 Customization

### Ganti Warna

Edit `tailwind.config.ts`:

```typescript
colors: {
  coffee: {
    500: '#8b7355', // Primary
    600: '#6b5635', // Hover
  }
}
```

### Tambah Buku

1. Tambah entry di `public/data/books.json`
2. Rebuild: `npm run build`
3. Deploy

### Tambah Quote

1. Tambah entry di `public/data/quotes.json`
2. Rebuild & deploy

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Drag ./dist to Netlify drop
```

### GitHub Pages

```bash
npm run build
# Push ./dist to gh-pages branch
```

## 📝 Content Management

### Cara 1: Edit JSON Langsung

Edit file di `public/data/` → Commit → Auto rebuild (jika pakai Vercel/GitHub Actions)

### Cara 2: CMS (Future)

Integrasi dengan:
- **Strapi**: Self-hosted CMS
- **Sanity**: Headless CMS
- **Notion**: Database + API

### Cara 3: Git-based CMS

- **Netlify CMS**: Edit via UI, commit ke Git
- **Forestry**: Git-based content management

## 🔧 Advanced Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://kelaspekerja.id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Domain (Vercel)

```bash
vercel domains add kelaspekerja.id
```

### Analytics

Tambah di `layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

// In body:
<Analytics />
```

## 🐛 Troubleshooting

### Build Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not loading

Pastikan `images.unoptimized: true` di `next.config.js` untuk static export.

### API 404 in production

Static export tidak support API routes di runtime. Data di-fetch saat build time.

## 📄 License

MIT © 2026 Wildan Ferdiansyah

---

**Kelas Pekerja** — Dibuat dengan ☕ dan ❤️ di malam yang sunyi.
