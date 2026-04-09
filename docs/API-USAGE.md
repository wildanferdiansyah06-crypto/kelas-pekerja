# API Usage Guide

Project ini menggunakan API lokal berbasis JSON untuk mengelola konten. Semua data disimpan di `public/data/` dan diakses melalui `src/lib/api.ts`.

---

## Struktur Data

### 1. Books (`public/data/books.json`)
Menyimpan data buku/ebook yang tersedia.

**Struktur:**
```json
{
  "books": [
    {
      "id": "1",
      "slug": "seni-menyeduh-kehidupan",
      "title": "Seni Menyeduh Kehidupan",
      "subtitle": "Catatan tentang...",
      "excerpt": "Deskripsi singkat...",
      "preview": "Preview konten...",
      "category": "kehidupan",
      "readTime": "25 menit",
      "cover": "URL gambar",
      "publishedAt": "2026-01-15",
      "featured": true,
      "stats": {
        "views": 1240,
        "downloads": 89
      },
      "tags": ["kehidupan", "kopi", "mindfulness", "gentle"]
    }
  ]
}
```

### 2. Posts (`public/data/posts.json`)
Menyimpan data artikel/tulisan.

**Struktur:**
```json
{
  "posts": [
    {
      "slug": "ruang-bagi-tulisan",
      "title": "Judul Tulisan",
      "hook": "Hook untuk menarik pembaca",
      "opening": "Paragraf pembuka",
      "excerpt": "Ringkasan konten",
      "category": "Ruang Bagi",
      "readTime": "2 menit",
      "date": "2024-01-01",
      "role": "Pembuka Ruang",
      "workplace": "Arsip Pikiran",
      "duration": "Selamanya",
      "isFeatured": true,
      "content": [
        {
          "type": "paragraph",
          "text": "Konten paragraf..."
        },
        {
          "type": "quote",
          "text": "Kutipan..."
        }
      ],
      "impact": "Dampak tulisan...",
      "related": ["slug-terkait-1", "slug-terkait-2"],
      "likes": 128
    }
  ]
}
```

### 3. Quotes (`public/data/quotes.json`)
Menyimpan data kutipan.

**Struktur:**
```json
{
  "quotes": [
    {
      "id": 1,
      "text": "Teks kutipan...",
      "category": "kopi",
      "mood": "melancholic"
    }
  ]
}
```

### 4. Config (`public/data/config.json`)
Konfigurasi situs global.

**Struktur:**
```json
{
  "site": {
    "title": "Kelas Pekerja",
    "description": "Deskripsi situs...",
    "tagline": "Tagline...",
    "url": "https://kelaspekerja.id",
    "language": "id",
    "locale": "id_ID"
  },
  "author": {
    "name": "Wildan Ferdiansyah",
    "bio": "Bio penulis...",
    "photo": "/wildan.png",
    "roles": {
      "past": ["Barista", "Mural Artist"],
      "current": "Penulis"
    },
    "social": {
      "whatsapp": "6289636357091",
      "instagram": "_iamwildan_",
      "email": "wildanferdiansyah06@gmail.com",
      "twitter": ""
    },
    "manifesto": "Aku menulis untuk hadir, bukan untuk memukau."
  },
  "navigation": [
    { "label": "Beranda", "href": "/" },
    { "label": "Tulisan", "href": "/tulisan" }
  ],
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

## Fungsi API

### Books API

#### `getBooks(filters?)`
Mengambil daftar buku dengan filter opsional.

```typescript
const result = await getBooks({
  category?: string,      // Filter berdasarkan kategori
  featured?: boolean,     // Hanya buku featured
  search?: string,        // Pencarian di title, excerpt, tags
  limit?: number          // Batas jumlah hasil
});

// Returns: { books: Book[], total: number }
```

**Contoh:**
```typescript
// Semua buku
const allBooks = await getBooks();

// Buku featured (max 3)
const featured = await getBooks({ featured: true, limit: 3 });

// Buku kategori "kehidupan"
const lifeBooks = await getBooks({ category: "kehidupan" });

// Pencarian
const searchResults = await getBooks({ search: "kopi" });
```

#### `getBook(slug)`
Mengambil satu buku berdasarkan slug.

```typescript
const { book } = await getBook("seni-menyeduh-kehidupan");

// Returns: { book: Book }
```

#### `getFeaturedBooks(limit?)`
Shortcut untuk mengambil buku featured.

```typescript
const { books } = await getFeaturedBooks(3);
```

### Quotes API

#### `getRandomQuote()`
Mengambil kutipan secara acak.

```typescript
const { quote, total } = await getRandomQuote();

// Returns: { quote: Quote, total: number }
```

#### `getQuotes(filters?)`
Mengambil kutipan dengan filter.

```typescript
const { quotes, total } = await getQuotes({
  category?: string,   // Filter kategori
  mood?: string,       // Filter mood
  limit?: number       // Batas jumlah
});
```

**Contoh:**
```typescript
// Semua kutipan kopi
const coffeeQuotes = await getQuotes({ category: "kopi" });

// Kutipan mood peaceful
const peacefulQuotes = await getQuotes({ mood: "peaceful" });
```

### Config API

#### `getConfig()`
Mengambil konfigurasi situs.

```typescript
const config = await getConfig();

// Returns: SiteConfig
```

---

## Cara Menambah Konten

### Menambah Buku Baru

1. Buka `public/data/books.json`
2. Tambah objek baru ke array `books`
3. Pastikan `slug` unik (gunakan kebab-case)
4. Set `publishedAt` dengan format YYYY-MM-DD
5. Tambah tags yang relevan

**Contoh:**
```json
{
  "id": "7",
  "slug": "judul-buku-baru",
  "title": "Judul Buku Baru",
  "subtitle": "Subtitle buku...",
  "excerpt": "Ringkasan...",
  "preview": "Preview...",
  "category": "kehidupan",
  "readTime": "30 menit",
  "cover": "URL gambar",
  "publishedAt": "2026-04-15",
  "featured": false,
  "stats": { "views": 0, "downloads": 0 },
  "tags": ["tag1", "tag2"]
}
```

### Menambah Tulisan Baru

1. Buka `public/data/posts.json`
2. Tambah objek baru ke array `posts`
3. Struktur `content` menggunakan array dengan type:
   - `paragraph`: teks paragraf
   - `quote`: kutipan
4. Tambah `related` dengan array slug tulisan terkait

### Menambah Kutipan Baru

1. Buka `public/data/quotes.json`
2. Tambah objek baru ke array `quotes`
3. Pastikan `id` unik

---

## Kategori Buku

Kategori yang tersedia:
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

## Catatan Penting

- **ID harus unik**: Pastikan setiap item memiliki ID yang berbeda
- **Slug harus unik**: Slug digunakan untuk routing, jadi harus unik
- **Format tanggal**: Gunakan format YYYY-MM-DD
- **URL gambar**: Gunakan URL absolut atau path relatif dari `public/`
- **Validasi JSON**: Pastikan format JSON valid (gunakan JSON validator)
- **Backup**: Selalu backup file JSON sebelum mengedit

---

## Migrasi ke Headless CMS

Untuk skala yang lebih besar, pertimbkan migrasi ke:
- **Sanity.io** - CMS headless dengan editor visual
- **Contentful** - CMS headless enterprise
- **Strapi** - CMS headless open-source
- **Notion API** - Jika menggunakan Notion sebagai CMS

Lihat roadmap untuk rencana migrasi.
