# Fitur-Fitur Project

Project ini dilengkapi berbagai fitur modern untuk meningkatkan pengalaman pengguna. Berikut dokumentasi lengkap setiap fitur.

---

## 1. Dark Mode

### Deskripsi
Mode gelap yang mendukung preferensi sistem dan menyimpan pilihan pengguna di localStorage.

### Implementasi
- **Component**: `ThemeProvider.tsx`
- **Hook**: `useTheme()`
- **Storage**: `localStorage.getItem("kelas-pekerja-theme")`

### Cara Menggunakan
```typescript
import { useTheme } from "@/components/ThemeProvider";

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
```

### Fitur
- **Auto-detect**: Mendeteksi preferensi sistem (`prefers-color-scheme`)
- **Persistence**: Menyimpan pilihan di localStorage
- **Hydration-safe**: Mencegah hydration mismatch di Next.js
- **Manual override**: Bisa diubah manual oleh pengguna

### Konfigurasi
Aktifkan di `public/data/config.json`:
```json
{
  "features": {
    "darkMode": true
  }
}
```

---

## 2. Pencarian (Search)

### Deskripsi
Fitur pencarian buku dengan filter berdasarkan judul, excerpt, dan tags.

### Implementasi
- **Component**: `SearchBar.tsx`
- **API**: `getBooks({ search: string })`
- **URL Params**: `?search=query`

### Cara Menggunakan
```typescript
import SearchBar from "@/components/SearchBar";

function BooksPage() {
  return <SearchBar initialSearch="kopi" />;
}
```

### Fitur
- **Real-time**: Pencarian dengan URL params
- **Multi-field**: Mencari di title, excerpt, dan tags
- **Case-insensitive**: Tidak sensitif huruf besar/kecil
- **Clear button**: Tombol untuk menghapus pencarian

### Contoh URL
- `/buku?search=kopi` - Mencari buku dengan kata "kopi"
- `/buku?search=kehidupan` - Mencari buku dengan kata "kehidupan"

---

## 3. Bookmark (Simpanan)

### Deskripsi
Fitur untuk menyimpan buku atau tulisan favorit dengan localStorage.

### Implementasi
- **Hook**: `useBookmarks()`
- **Component**: `BookmarkButton.tsx`
- **Storage**: `localStorage.getItem("kelas-pekerja-bookmarks")`
- **Page**: `/simpanan`

### Cara Menggunakan
```typescript
import { useBookmarks } from "@/hooks/useBookmarks";

function BookCard({ book }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  return (
    <button onClick={() => toggleBookmark({
      id: book.id,
      type: "book",
      title: book.title,
      slug: book.slug
    })}>
      {isBookmarked(book.id) ? "Tersimpan" : "Simpan"}
    </button>
  );
}
```

### API Hook
```typescript
const {
  bookmarks,        // Semua bookmark
  bookBookmarks,    // Bookmark buku saja
  postBookmarks,    // Bookmark tulisan saja
  isLoaded,         // Status loading
  addBookmark,      // Tambah bookmark
  removeBookmark,   // Hapus bookmark
  isBookmarked,     // Cek status bookmark
  toggleBookmark,   // Toggle bookmark
  clearAll,         // Hapus semua
  count             // Jumlah bookmark
} = useBookmarks();
```

### Struktur Data Bookmark
```typescript
interface BookmarkedItem {
  id: string;
  type: "book" | "post";
  title: string;
  slug: string;
  savedAt: string;  // ISO timestamp
}
```

### Fitur
- **Persistence**: Disimpan di localStorage
- **Type-safe**: TypeScript support
- **Separation**: Bedakan bookmark buku dan tulisan
- **Timestamp**: Menyimpan waktu penyimpanan

---

## 4. Random Quote (Random Coffee Thought)

### Deskripsi
Menampilkan kutipan acak untuk menemani waktu ngopi.

### Implementasi
- **Component**: `RandomCoffeeThought.tsx`
- **Data**: `public/data/quotes.json`
- **API**: `getRandomQuote()`

### Cara Menggunakan
```typescript
import RandomCoffeeThought from "@/components/RandomCoffeeThought";

function HomePage() {
  return <RandomCoffeeThought />;
}
```

### Fitur
- **Random selection**: Memilih kutipan secara acak
- **Category filter**: Bisa filter berdasarkan kategori
- **Mood filter**: Bisa filter berdasarkan mood
- **Refresh button**: Tombol untuk ganti kutipan

### Struktur Data Quote
```typescript
interface Quote {
  id: number;
  text: string;
  category: string;  // "kopi", "refleksi", "menulis", "kehidupan"
  mood: string;      // "melancholic", "peaceful", "hopeful", dll
}
```

### Kategori yang Tersedia
- `kopi` - Tentang kopi
- `refleksi` - Refleksi hidup
- `menulis` - Tentang menulis
- `kehidupan` - Kehidupan

### Mood yang Tersedia
- `melancholic` - Melankolis
- `peaceful` - Tenang
- `hopeful` - Penuh harapan
- `calm` - Kalem
- `contemplative` - Kontemplatif
- `deep` - Dalam
- `quiet` - Sunyi

---

## 5. Reading Time

### Deskripsi
Estimasi waktu baca untuk setiap konten.

### Implementasi
- **Data**: Disimpan di `readTime` field di JSON
- **Display**: Ditampilkan di card dan detail page

### Format
```json
{
  "readTime": "25 menit"
}
```

### Cara Menggunakan
```typescript
function BookCard({ book }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.readTime}</p>
    </div>
  );
}
```

---

## 6. Reading Progress

### Deskripsi
Progress bar saat membaca konten panjang.

### Implementasi
- **Component**: `ReadingProgress.tsx`
- **Behavior**: Scroll-based progress indicator

### Cara Menggunakan
```typescript
import ReadingProgress from "@/components/ReadingProgress";

function ArticleLayout({ children }) {
  return (
    <>
      <ReadingProgress />
      {children}
    </>
  );
}
```

### Fitur
- **Scroll-based**: Update berdasarkan scroll position
- **Smooth animation**: Transisi halus
- **Fixed position**: Tetap di atas saat scroll

---

## 7. Category Filter

### Deskripsi
Filter konten berdasarkan kategori.

### Implementasi
- **Component**: `CategoryFilter.tsx`
- **API**: `getBooks({ category: string })`

### Cara Menggunakan
```typescript
import CategoryFilter from "@/components/CategoryFilter";

function BooksPage() {
  return <CategoryFilter />;
}
```

### Kategori Buku
- `all` - Semua kategori
- `kehidupan` - Kehidupan
- `cerita` - Cerita
- `renungan` - Renungan
- `proses` - Proses
- `kopi` - Kopi
- `pekerja` - Pekerja
- `filosofi` - Filosofi
- `catatan-malam` - Catatan Malam

---

## 8. Share Buttons

### Deskripsi
Tombol share untuk media sosial.

### Implementasi
- **Component**: `ShareButtons.tsx`
- **Platforms**: Twitter, WhatsApp, Facebook, Copy Link

### Cara Menggunakan
```typescript
import ShareButtons from "@/components/ShareButtons";

function Article({ article }) {
  return (
    <ShareButtons 
      title={article.title}
      url={`https://kelaspekerja.id/tulisan/${article.slug}`}
    />
  );
}
```

---

## 9. Scroll to Top

### Deskripsi
Tombol untuk scroll ke atas halaman.

### Implementasi
- **Component**: `ScrollToTop.tsx`
- **Trigger**: Muncul setelah scroll tertentu

### Cara Menggunakan
```typescript
import ScrollToTop from "@/components/ScrollToTop";

function Layout({ children }) {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}
```

---

## 10. Local Storage Hook

### Deskripsi
Custom hook untuk mengelola localStorage dengan type safety.

### Implementasi
- **Hook**: `useLocalStorage.ts`

### Cara Menggunakan
```typescript
import { useLocalStorage } from "@/hooks/useLocalStorage";

function MyComponent() {
  const [value, setValue] = useLocalStorage("key", "default");
  
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

---

## Fitur yang Belum Aktif

Berdasarkan `config.json`, fitur berikut belum aktif:
- `comments: false` - Fitur komentar
- `newsletter: false` - Fitur newsletter

### Rencana Implementasi
Lihat roadmap untuk rencana implementasi fitur ini.

---

## Cara Mengaktifkan/Menonaktifkan Fitur

Edit `public/data/config.json`:
```json
{
  "features": {
    "darkMode": true,
    "search": true,
    "bookmarks": true,
    "randomQuote": true,
    "readingTime": true,
    "comments": false,
    "newsletter": false
  }
}
```

---

## Performa & Optimasi

### Lazy Loading
Komponen yang menggunakan `'use client'` di-load hanya saat diperlukan.

### Static Generation
Konten di-generate statis untuk performa maksimal.

### Image Optimization
Gambar dari Unsplash dengan format webp.

### Bundle Size
Dioptimalkan dengan Next.js automatic code splitting.

---

## Troubleshooting

### Dark Mode Tidak Berfungsi
- Pastikan `ThemeProvider` membungsel root layout
- Cek localStorage di browser dev tools
- Pastikan tidak ada CSS conflict

### Bookmark Tidak Tersimpan
- Cek browser localStorage support
- Pastikan storage key benar: `kelas-pekerja-bookmarks`
- Cek console untuk error

### Search Tidak Berfungsi
- Pastikan URL params ter-set dengan benar
- Cek implementasi `getBooks` di `api.ts`
- Pastikan data JSON valid

---

## Roadmap Fitur

### Q2 2026
- [ ] Implementasi komentar dengan Disqus atau giscus
- [ ] Newsletter signup dengan Resend atau Mailchimp
- [ ] PWA support (service worker, manifest)

### Q3 2026
- [ ] Migrasi ke headless CMS (Sanity/Contentful)
- [ ] Analytics integration (Vercel Analytics/Plausible)
- [ ] RSS feed untuk blog

### Q4 2026
- [ ] Multi-language support (i18n)
- [ ] Advanced search dengan Algolia
- [ ] User authentication untuk fitur premium
