import { Book, Quote, SiteConfig } from '@/src/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Error handling wrapper
async function fetchWithError<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Books API
export async function getBooks(filters?: { 
  category?: string; 
  featured?: boolean; 
  search?: string;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (filters?.category) params.set('category', filters.category);
  if (filters?.featured) params.set('featured', 'true');
  if (filters?.search) params.set('search', filters.search);
  if (filters?.limit) params.set('limit', filters.limit.toString());

  const url = `${API_BASE}/api/books?${params}`;

  return fetchWithError<{ books: Book[]; total: number }>(url, {
    next: { 
      revalidate: 3600, // Revalidate setiap jam
      tags: ['books']
    }
  });
}

export async function getBook(slug: string) {
  const url = `${API_BASE}/api/books/${slug}`;

  return fetchWithError<{ book: Book }>(url, {
    next: { 
      revalidate: 3600,
      tags: [`book-${slug}`]
    }
  });
}

export async function getFeaturedBooks(limit = 3) {
  return getBooks({ featured: true, limit });
}

// Quotes API
export async function getRandomQuote() {
  const url = `${API_BASE}/api/quotes/random`;

  return fetchWithError<{ quote: Quote; total: number }>(url, {
    cache: 'no-store' // Selalu fresh untuk random
  });
}

export async function getQuotes(filters?: {
  category?: string;
  mood?: string;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (filters?.category) params.set('category', filters.category);
  if (filters?.mood) params.set('mood', filters.mood);
  if (filters?.limit) params.set('limit', filters.limit.toString());

  const url = `${API_BASE}/api/quotes?${params}`;

  return fetchWithError<{ quotes: Quote[]; total: number }>(url, {
    next: { revalidate: 3600 }
  });
}

// Config API
export async function getConfig() {
  const url = `${API_BASE}/api/config`;

  return fetchWithError<SiteConfig>(url, {
    next: { revalidate: 86400 } // Revalidate setiap hari
  });
}

// Categories
export const categories = [
  { id: 'all', label: 'Semua', count: 4 },
  { id: 'kehidupan', label: 'Kehidupan', count: 1 },
  { id: 'cerita', label: 'Cerita', count: 1 },
  { id: 'renungan', label: 'Renungan', count: 1 },
  { id: 'proses', label: 'Proses', count: 1 },
  { id: 'kopi', label: 'Kopi', count: 0 },
  { id: 'pekerja', label: 'Pekerja', count: 0 },
  { id: 'filosofi', label: 'Filosofi', count: 0 },
  { id: 'catatan-malam', label: 'Catatan Malam', count: 0 }
] as const;

// Stats API (untuk view counter sederhana)
export async function incrementView(slug: string) {
  // Ini placeholder - nanti bisa integrate dengan database atau KV storage
  console.log(`View incremented for: ${slug}`);
}

