# Kelas Pekerja — Literasi Platform dengan Sanity CMS

Platform literasi modern dengan Next.js 15, Sanity CMS, dan NextAuth untuk manajemen konten dan autentikasi.

## 🏗️ Arsitektur

```
Frontend (Next.js 15 + React 18)
         ↓
    Sanity CMS (Headless CMS)
         ↓
    NextAuth (Authentication)
         ↓
   Static & Dynamic Rendering
```

### Keunggulan Arsitektur Ini:

- ⚡ **Hybrid Rendering**: Static + Dynamic rendering untuk optimal performance
- 🔧 **CMS-powered**: Konten dikelola via Sanity Studio, bukan hardcode
- 🔐 **Authentication**: Login dengan Google OAuth via NextAuth
- 📱 **SEO-Friendly**: Proper meta tags dan structured data
- 🚀 **Siap Scale**: Architecture yang scalable dan maintainable
- 💰 **Gratis Hosting**: Vercel, Netlify, atau lainnya

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/wildanferdiansyah06-crypto/kelas-pekerja.git
cd kelas-pekerja
npm install
```

### 2. Environment Variables

Copy `.env.example` ke `.env.local` dan isi:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Development

```bash
npm run dev
# Open http://localhost:3000
# Sanity Studio: http://localhost:3000/y
```

### 4. Build

```bash
npm run build
```

### 5. Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test with UI
npm run test:e2e:ui
```

## 📁 Struktur Data (Sanity CMS)

### Content Types

Konten dikelola melalui Sanity Studio di `/y` dengan schema types:

- **Book**: Buku dengan chapters, cover, dan metadata
- **Post**: Tulisan/artikel dengan content blocks
- **Quote**: Quotes dengan kategori dan mood
- **User**: User data dengan bookmarks dan reading progress
- **SiteConfig**: Konfigurasi situs (author, navigation, SEO)

### Schema Location

Schema definitions di `src/sanity/schemas/`:
- `book.ts` - Schema untuk buku
- `post.ts` - Schema untuk tulisan
- `quote.ts` - Schema untuk quotes
- `user.ts` - Schema untuk user
- `config.ts` - Schema untuk konfigurasi situs

## ✨ Fitur

### Implemented ✅

- [x] **Sanity CMS**: Manajemen konten via Sanity Studio
- [x] **NextAuth Authentication**: Login dengan Google OAuth
- [x] **Bookmark System**: Simpan buku dan tulisan favorit
- [x] **Reading Progress**: Lacak progress membaca buku
- [x] **Dark Mode**: Toggle + system preference detection
- [x] **Category Filter**: Filter buku dan tulisan by kategori
- [x] **Search**: Client-side search untuk buku
- [x] **Share Buttons**: WhatsApp, Twitter, Facebook, Copy Link
- [x] **Responsive Design**: Mobile-first approach
- [x] **SEO**: Meta tags, Open Graph, structured data
- [x] **Testing**: Jest (unit) + Playwright (E2E)
- [x] **CI/CD**: GitHub Actions untuk deployment

### Roadmap 🗺️

- [ ] **Komentar**: Giscus/Disqus integration
- [ ] **Newsletter**: Email subscription form
- [ ] **View Counter**: KV storage (Upstash/Redis)
- [ ] **PWA**: Offline support + installable
- [ ] **Multi-language**: i18n support
- [ ] **RSS Feed**: RSS untuk blog/tulisan

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

1. Buka Sanity Studio di `/y`
2. Klik "Buku" → "Create new"
3. Isi data buku (title, slug, chapters, dll)
4. Publish

### Tambah Tulisan

1. Buka Sanity Studio di `/y`
2. Klik "Tulisan" → "Create new"
3. Isi konten tulisan
4. Publish

### Tambah Quote

1. Buka Sanity Studio di `/y`
2. Klik "Quotes" → "Create new"
3. Isi quote text, kategori, dan mood
4. Publish

### Edit Schema

Schema definitions ada di `src/sanity/schemas/`:
- Edit schema file yang sesuai
- Sanity Studio akan otomatis reload dengan perubahan

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repository ke Vercel
2. Set environment variables di Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
3. Deploy

```bash
vercel --prod
```

### Netlify

1. Connect repository ke Netlify
2. Set environment variables di Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Deploy

### GitHub Pages

```bash
npm run build
# Push ./out to gh-pages branch (jika menggunakan static export)
```

## 📝 Content Management

### Sanity Studio

Konten dikelola melalui Sanity Studio yang terintegrasi di `/y`:

1. **Buka Studio**: Navigate ke `/y` di aplikasi
2. **Edit Konten**: Klik pada content type yang ingin diedit
3. **Real-time Preview**: Lihat perubahan secara langsung
4. **Publish**: Publish changes untuk membuatnya live

### Content Types

- **Buku**: Kelola buku, chapters, dan metadata
- **Tulisan**: Kelola artikel dan tulisan
- **Quotes**: Kelola quotes dengan kategori
- **Pengguna**: Kelola user data dan bookmarks
- **Konfigurasi**: Kelola settings situs

### Sanity CLI

```bash
# Deploy Sanity Studio
npx sanity deploy

# Add new dataset
npx sanity dataset create

# Import/Export data
npx sanity dataset import
npx sanity dataset export
```

## 🔧 Advanced Configuration

### Environment Variables

```bash
# .env.local
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional
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

### Sanity Studio Customization

Edit `sanity.config.ts` untuk custom studio configuration:

```typescript
export default defineConfig({
  basePath: '/y',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
  ],
})
```

## 🐛 Troubleshooting

### Build Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Sanity Studio Error

Jika Sanity Studio error saat membuka user documents:
- Clear browser cache (Ctrl+F5)
- Tunggu deployment selesai
- Restart development server

### NextAuth Issues

Jika login gagal:
- Pastikan environment variables ter-set dengan benar
- Cek Google OAuth credentials di Google Cloud Console
- Pastikan `NEXTAUTH_URL` sesuai dengan domain

### Images not loading

Pastikan image URLs valid dan accessible. Untuk Sanity images, gunakan `urlFor()` helper dari `src/sanity/lib/image.ts`.

### Sanity Connection Issues

```bash
# Cek Sanity connection
npx sanity manage

# Re-deploy Sanity Studio
npx sanity deploy
```

## 📄 License

MIT © 2026 Wildan Ferdiansyah

---

**Kelas Pekerja** — Dibuat dengan ☕ dan ❤️ di malam yang sunyi.
