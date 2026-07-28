# Data Access Layer & API Specification

This document details the data fetching strategy, GROQ query interface, and persistence endpoints for **Kelas Pekerja**.

---

## 🏛️ Data Architecture Overview

The system uses a primary-secondary data pipeline designed for high performance, content elasticity, and resilience:

1. **Primary Content Lake (Sanity CMS)**: Stores articles, books, quotes, user profiles, and site configuration. Queried via GROQ (`Graph-Relational Object Queries`).
2. **Persistence Store (Supabase PostgreSQL)**: Handles relational data, user bookmarks, reading progress tracking, and quote stats using Row Level Security (RLS).
3. **Resilient Local Fallback Layer (`public/data/`)**: Provides static fallback JSON datasets during static site generation (SSG) if Sanity API endpoints are unreachable.

---

## 🔍 Sanity Content Schemas & GROQ Engine

All Sanity schemas are defined in `src/sanity/schemas/`.

### 1. Book Schema (`book.ts`)
- **Document Type**: `book`
- **Fields**: `id`, `slug`, `title`, `subtitle`, `excerpt`, `preview`, `category`, `readTime`, `cover`, `publishedAt`, `featured`, `stats`, `tags`

### 2. Post Schema (`post.ts`)
- **Document Type**: `post`
- **Fields**: `slug`, `title`, `hook`, `opening`, `excerpt`, `category`, `readTime`, `date`, `role`, `workplace`, `duration`, `isFeatured`, `content` (Portable Text blocks), `impact`, `related`

### 3. Quote Schema (`quote.ts`)
- **Document Type**: `quote`
- **Fields**: `id`, `text`, `category`, `mood`

### 4. User Schema (`user.ts`)
- **Document Type**: `user`
- **Fields**: `id`, `name`, `email`, `image`, `role`, `bookmarks`, `readingProgress`

---

## 🛠️ Core API Modules (`src/lib/api.ts`)

### Books API

#### `getBooks(filters?: BookFilters): Promise<{ books: Book[], total: number }>`
Executes a GROQ query to retrieve filtered books from Sanity with dynamic parameters.

```typescript
// Query Specification
const query = `*[_type == "book" && category == $category] | order(publishedAt desc)[0...$limit]`;

// Usage Example
const { books } = await getBooks({
  category: "kehidupan",
  featured: true,
  limit: 5
});
```

#### `getBook(slug: string): Promise<{ book: Book | null }>`
Retrieves a single book document matching the unique slug identifier.

```typescript
const { book } = await getBook("seni-menyeduh-kehidupan");
```

---

### Quotes API

#### `getRandomQuote(): Promise<{ quote: Quote | null }>`
Fetches a single quote object dynamically or selects from cache.

#### `getQuotes(filters?: QuoteFilters): Promise<{ quotes: Quote[], total: number }>`
Filters quotes by category or mood metrics (`melancholic`, `peaceful`, `reflective`).

---

### Configuration API

#### `getConfig(): Promise<SiteConfig>`
Loads site navigation, author metadata, social media links, and feature flags.

---

## 💾 Relational Persistence Layer (`src/lib/user.ts`)

User bookmark storage and reading tracking interfaces interact directly with Supabase via client instances defined in `src/lib/supabase.ts`.

### Bookmark Operations
- `getUserBookmarks(userId: string)`
- `addBookmark(userId: string, bookSlug: string)`
- `removeBookmark(userId: string, bookSlug: string)`

### Reading Progress Operations
- `updateReadingProgress(userId: string, bookSlug: string, progressPercent: number)`
- `getReadingProgress(userId: string, bookSlug: string)`
