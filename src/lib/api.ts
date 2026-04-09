import { Book, Quote, SiteConfig } from "@/src/types";
import { client } from "@/src/sanity/lib/client";

/* =========================
   BOOKS
========================= */

export async function getBooks(filters?: {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
}) {
  let query = `*[_type == "book"]`;
  const params: Record<string, any> = {};

  if (filters?.category && filters.category !== "all") {
    query += ` && category == $category`;
    params.category = filters.category;
  }

  if (filters?.featured) {
    query += ` && featured == true`;
  }

  if (filters?.search) {
    query += ` && (title match $search || excerpt match $search || tags match $search)`;
    params.search = filters.search;
  }

  query += ` | order(publishedAt desc)`;

  if (filters?.limit) {
    query += `[0...$limit]`;
    params.limit = filters.limit;
  }

  const books = await client.fetch<Book[]>(query, params);

  return {
    books,
    total: books.length,
  };
}

export async function getBook(slug: string) {
  const query = `*[_type == "book" && slug.current == $slug][0]`;
  const book = await client.fetch<Book>(query, { slug });

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
  const query = `*[_type == "quote"] | order(rand())`;
  const quotes = await client.fetch<Quote[]>(query);
  const random = quotes[Math.floor(Math.random() * quotes.length)];

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
  let query = `*[_type == "quote"]`;
  const params: Record<string, any> = {};

  if (filters?.category) {
    query += ` && category == $category`;
    params.category = filters.category;
  }

  if (filters?.mood) {
    query += ` && mood == $mood`;
    params.mood = filters.mood;
  }

  if (filters?.limit) {
    query += `[0...$limit]`;
    params.limit = filters.limit;
  }

  const quotes = await client.fetch<Quote[]>(query, params);

  return {
    quotes,
    total: quotes.length,
  };
}

/* =========================
   CONFIG
========================= */

export async function getConfig(): Promise<SiteConfig> {
  const query = `*[_type == "siteConfig"][0]`;
  const config = await client.fetch<SiteConfig>(query);
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
