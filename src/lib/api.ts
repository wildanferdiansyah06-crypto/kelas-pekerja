import { Book, Quote, SiteConfig } from "@/src/types";

import booksData from "@/public/data/books.json";
import quotesData from "@/public/data/quotes.json";
import configData from "@/public/data/config.json";

/* =========================
   LOCAL DATA
========================= */

const books = (booksData.books || []) as Book[];
const quotes = (quotesData.quotes || []) as Quote[];
const config = configData as unknown as SiteConfig;

/* =========================
   BOOKS
========================= */

export async function getBooks(filters?: {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
}) {
  let result = [...books];

  // Filter category
  if (filters?.category && filters.category !== "all") {
    result = result.filter((b) => b.category === filters.category);
  }

  // Filter featured
  if (filters?.featured) {
    result = result.filter((b) => b.featured);
  }

  // Search
  if (filters?.search) {
    const search = filters.search.toLowerCase();

    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.excerpt?.toLowerCase().includes(search) ||
        b.tags?.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  // Sort newest
  result = result.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );

  // Limit
  if (filters?.limit) {
    result = result.slice(0, filters.limit);
  }

  return {
    books: result,
    total: result.length,
  };
}

export async function getBook(slug: string) {
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    throw new Error("Book not found");
  }

  return { book };
}

export async function getFeaturedBooks(limit = 3) {
  return getBooks({
    featured: true,
    limit,
  });
}

/* =========================
   QUOTES
========================= */

export async function getRandomQuote() {
  const random =
    quotes[Math.floor(Math.random() * quotes.length)];

  return {
    quote: random,
    total: quotes.length,
  };
}

export async function getQuotes(filters?: {
  category?: string;
  mood?: string;
  limit?: number;
}) {
  let result = [...quotes];

  if (filters?.category) {
    result = result.filter((q) => q.category === filters.category);
  }

  if (filters?.mood) {
    result = result.filter((q) => q.mood === filters.mood);
  }

  if (filters?.limit) {
    result = result.slice(0, filters.limit);
  }

  return {
    quotes: result,
    total: result.length,
  };
}

/* =========================
   CONFIG
========================= */

export async function getConfig(): Promise<SiteConfig> {
  return config;
}

/* =========================
   CATEGORIES
========================= */

export const categories = [
  { id: "all", label: "Semua", count: 4 },
  { id: "kehidupan", label: "Kehidupan", count: 1 },
  { id: "cerita", label: "Cerita", count: 1 },
  { id: "renungan", label: "Renungan", count: 1 },
  { id: "proses", label: "Proses", count: 1 },
  { id: "kopi", label: "Kopi", count: 0 },
  { id: "pekerja", label: "Pekerja", count: 0 },
  { id: "filosofi", label: "Filosofi", count: 0 },
  { id: "catatan-malam", label: "Catatan Malam", count: 0 },
] as const;

/* =========================
   VIEW COUNTER
========================= */

export async function incrementView(slug: string) {
  console.log(`View incremented for: ${slug}`);
}
