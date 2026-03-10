import { Book, Quote, SiteConfig } from "@/src/types";

import booksData from "@/public/data/books.json";
import quotesData from "@/public/data/quotes.json";
import configData from "@/public/data/config.json";

/* =========================
   BOOKS
========================= */

export async function getBooks(filters?: {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
}) {
  let books: Book[] = booksData.books || [];

  // Filter category
  if (filters?.category && filters.category !== "all") {
    books = books.filter((b) => b.category === filters.category);
  }

  // Filter featured
  if (filters?.featured) {
    books = books.filter((b) => b.featured);
  }

  // Search
  if (filters?.search) {
    const search = filters.search.toLowerCase();

    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.excerpt?.toLowerCase().includes(search) ||
        b.tags?.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  // Sort newest
  books = books.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );

  // Limit
  if (filters?.limit) {
    books = books.slice(0, filters.limit);
  }

  return {
    books,
    total: books.length,
  };
}

export async function getBook(slug: string) {
  const book = booksData.books.find((b) => b.slug === slug);

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
  const quotes: Quote[] = quotesData.quotes || [];

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
  let quotes: Quote[] = quotesData.quotes || [];

  if (filters?.category) {
    quotes = quotes.filter(
      (q) => q.category === filters.category
    );
  }

  if (filters?.mood) {
    quotes = quotes.filter((q) => q.mood === filters.mood);
  }

  if (filters?.limit) {
    quotes = quotes.slice(0, filters.limit);
  }

  return {
    quotes,
    total: quotes.length,
  };
}

/* =========================
   CONFIG
========================= */

export async function getConfig(): Promise<SiteConfig> {
  return configData;
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
   VIEW COUNTER (placeholder)
========================= */

export async function incrementView(slug: string) {
  console.log(`View incremented for: ${slug}`);
}
