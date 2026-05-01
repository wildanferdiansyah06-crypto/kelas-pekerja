# Kelas Pekerja — Literasi Platform dengan Sanity CMS

Platform literasi modern dengan Next.js 15, Sanity CMS, dan NextAuth untuk manajemen konten dan autentikasi.

## 📊 Project Status

### ✅ Latest Updates (v2.0.0)
- **Build Optimization**: Clean build without warnings
- **Environment Setup**: Improved .env configuration
- **Error Handling**: Better API error suppression during build
- **Cross-Platform**: Tested on multiple Linux distributions
- **Performance**: Optimized bundle sizes and loading times

### 🏗️ Arsitektur

```
Frontend (Next.js 15 + React 18)
         ↓
    Sanity CMS (Headless CMS)
         ↓
    NextAuth (Authentication)
         ↓
   Static & Dynamic Rendering
```

### Arsitektur:

- ⚡ **Hybrid Rendering**: Static + Dynamic rendering untuk optimal performance
- 🔧 **CMS-powered**: Konten dikelola via Sanity Studio, bukan hardcode
- 🔐 **Authentication**: Login dengan Google OAuth via NextAuth
- 📱 **SEO-Friendly**: Proper meta tags dan structured data
- 🚀 **Siap Scale**: Architecture yang scalable dan maintainable

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18+ (recommended: use NVM)
- **npm**: v9+ (comes with Node.js)
- **Git**: Latest version

### 1. Clone & Install

```bash
git clone https://github.com/wildanferdiansyah06-crypto/kelas-pekerja.git
cd kelas-pekerja
npm install
```

### 2. Environment Setup

Copy `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi nilai yang diperlukan:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SPEED_INSIGHTS_ENABLED=true
```

### 3. Development

```bash
npm run dev
# Open http://localhost:3000
# Sanity Studio: http://localhost:3000/y
```

### 4. Build & Test

```bash
# Build untuk production
npm run build

# Jalankan production server
npm start

# Run tests
npm test
npm run test:e2e
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

## �️ Setup Instructions

### Fresh Install (New Distro/Device)

1. **Install Node.js via NVM**:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   nvm install --lts
   nvm use --lts
   ```

2. **Install Git**:
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt install git
   # Atau via Snap
   sudo snap install git --classic
   ```

3. **Configure Git**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **Clone & Setup Project**:
   ```bash
   git clone https://github.com/wildanferdiansyah06-crypto/kelas-pekerja.git
   cd kelas-pekerja
   npm install
   cp .env.example .env.local
   # Edit .env.local dengan credentials Anda
   ```

5. **Verify Installation**:
   ```bash
   npm run build  # Should complete without errors
   npm run dev     # Start development server
   ```

### Build Verification

Project ini telah diuji dan berhasil dibuild dengan:
- ✅ Node.js LTS (via NVM)
- ✅ Clean build tanpa warnings
- ✅ 28 halaman static + dynamic
- ✅ Optimal bundle sizes (211kB shared JS)

## 🐛 Troubleshooting

### Build Errors

**Error: "supabaseUrl is required"**
```bash
# Solution: Copy .env.example
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials
```

**Error: "projectId can only contain only a-z, 0-9 and dashes"**
```bash
# Solution: Pastikan NEXT_PUBLIC_SANITY_PROJECT_ID valid format
# Contoh: testproject (bukan your_project_id)
```

**Error: "Unauthorized - Session not found"**
```bash
# Solution: Check SANITY_API_TOKEN di .env.local
# Atau hapus token untuk development
```

### Common Issues

**Node.js not found**:
```bash
# Install NVM dan Node.js LTS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```

**Git authentication failed**:
```bash
# Setup GitHub Personal Access Token
# 1. Buka github.com/settings/tokens
# 2. Generate new token (centang 'repo' permission)
# 3. Gunakan token sebagai password saat git push
```

**Dependencies not installing**:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📄 License

MIT © 2026 Wildan Ferdiansyah

---

**Kelas Pekerja** — Dibuat dengan ☕ dan ❤️ di malam yang sunyi.
