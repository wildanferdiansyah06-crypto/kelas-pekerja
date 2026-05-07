import { Book, Quote, SiteConfig } from "@/src/types";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";

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

  const sanityBooks = await client.fetch<any[]>(query, params);

  // Handle null response
  if (!sanityBooks) {
    return {
      books: [],
      total: 0,
    };
  }

  // Transform Sanity data to match Book type
  const books: Book[] = sanityBooks.map((book) => {
    let coverUrl = '';
    try {
      if (book.cover) {
        // Check if cover is a string (direct URL)
        if (typeof book.cover === 'string') {
          coverUrl = book.cover;
        }
        // Check if cover has a url property that is an external URL
        else if (book.cover.url && typeof book.cover.url === 'string') {
          const url = book.cover.url;
          // If it starts with http/https, it's an external URL
          if (url.startsWith('http://') || url.startsWith('https://')) {
            coverUrl = url;
          }
          // Otherwise, it might be a Sanity asset reference, try urlFor
          else if (book.cover.asset || book.cover._type === 'image') {
            const imageUrl = urlFor(book.cover);
            if (imageUrl && typeof imageUrl.url === 'function') {
              coverUrl = imageUrl.url() || '';
            }
          }
        }
        // Check if it's a Sanity image asset
        else if (book.cover.asset || (book.cover._type === 'image' && !book.cover.url)) {
          const imageUrl = urlFor(book.cover);
          if (imageUrl && typeof imageUrl.url === 'function') {
            coverUrl = imageUrl.url() || '';
          }
        }
      }
    } catch (error) {
      console.error('Error generating cover URL for book:', book.title, error);
      coverUrl = '';
    }

    return {
      id: book._id,
      slug: book.slug?.current || '',
      title: book.title,
      subtitle: book.subtitle || '',
      excerpt: book.excerpt || '',
      preview: book.preview || '',
      category: book.category || 'kehidupan',
      pages: 0, // Sanity doesn't have pages, default to 0
      readTime: book.readTime || '5 menit',
      cover: coverUrl,
      publishedAt: book.publishedAt || '',
      featured: book.featured || false,
      stats: book.stats || { views: 0, downloads: 0 },
      tags: book.tags || [],
      chapters: book.chapters || [],
    };
  });

  return {
    books,
    total: books.length,
  };
}

export async function getBook(slug: string) {
  const query = `*[_type == "book" && slug.current == $slug][0]`;
  const sanityBook = await client.fetch<any>(query, { slug });

  if (!sanityBook) {
    throw new Error("Book not found");
  }

  // Generate cover URL with error handling
  let coverUrl = '';
  try {
    if (sanityBook.cover) {
      // Check if cover is a string (direct URL)
      if (typeof sanityBook.cover === 'string') {
        coverUrl = sanityBook.cover;
      }
      // Check if cover has a url property that is an external URL
      else if (sanityBook.cover.url && typeof sanityBook.cover.url === 'string') {
        const url = sanityBook.cover.url;
        // If it starts with http/https, it's an external URL
        if (url.startsWith('http://') || url.startsWith('https://')) {
          coverUrl = url;
        }
        // Otherwise, it might be a Sanity asset reference, try urlFor
        else if (sanityBook.cover.asset || sanityBook.cover._type === 'image') {
          const imageUrl = urlFor(sanityBook.cover);
          if (imageUrl && typeof imageUrl.url === 'function') {
            coverUrl = imageUrl.url() || '';
          }
        }
      }
      // Check if it's a Sanity image asset
      else if (sanityBook.cover.asset || (sanityBook.cover._type === 'image' && !sanityBook.cover.url)) {
        const imageUrl = urlFor(sanityBook.cover);
        if (imageUrl && typeof imageUrl.url === 'function') {
          coverUrl = imageUrl.url() || '';
        }
      }
    }
  } catch (error) {
    console.error('Error generating cover URL for book:', sanityBook.title, error);
    coverUrl = '';
  }

  // Transform Sanity data to match Book type
  const book: Book = {
    id: sanityBook._id,
    slug: sanityBook.slug?.current || '',
    title: sanityBook.title,
    subtitle: sanityBook.subtitle || '',
    excerpt: sanityBook.excerpt || '',
    preview: sanityBook.preview || '',
    category: sanityBook.category || 'kehidupan',
    pages: sanityBook.pages || 0,
    readTime: sanityBook.readTime || '5 menit',
    cover: coverUrl,
    publishedAt: sanityBook.publishedAt || '',
    featured: sanityBook.featured || false,
    stats: sanityBook.stats || { views: 0, downloads: 0 },
    tags: sanityBook.tags || [],
    // New fields
    description: sanityBook.description || '',
    author: sanityBook.author || '',
    downloadUrl: sanityBook.downloadUrl || '',
    chapters: sanityBook.chapters || [],
  };

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
  try {
    const query = `*[_type == "siteConfig"][0]`;
    const config = await client.fetch<SiteConfig>(query);
    return config;
  } catch (error) {
    console.error('Error fetching config from Sanity:', error);
    // Return fallback config if Sanity fails
    return {
      title: "Kelas Pekerja",
      description: "Catatan tentang malam, kopi, dan kehidupan.",
      tagline: "Tentang malam yang tak pernah benar-benar tidur, kopi yang menghangatkan, dan cerita-cerita yang tersimpan di antara detik-detik yang terlewat.",
      author: {
        name: "Wildan Ferdiansyah",
        bio: "Seseorang yang mencoba memahami hidupnya melalui kata kata.",
        roles: {
          past: ["Barista", "Muralis"],
          current: "Penulis & Web Developer"
        },
        social: {
          whatsapp: "6289636357091",
          instagram: "_iamwildan_",
          email: "wildanferdiansyah06@gmail.com"
        },
        manifesto: "Menulis untuk hadir, bukan untuk memukau."
      },
      navigation: [
        { label: "Beranda", href: "/" },
        { label: "Buku", href: "/buku" },
        { label: "Tulisan", href: "/tulisan" },
        { label: "Tentang", href: "/tentang" }
      ]
    };
  }
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
  try {
    const { supabase } = await import('./supabase');
    
    if (!supabase) {
      return false;
    }
    
    // Check if view record exists
    const { data: existing } = await supabase
      .from('book_views')
      .select('views')
      .eq('slug', slug)
      .single();

    if (existing) {
      // Increment existing views
      await supabase
        .from('book_views')
        .update({ views: existing.views + 1 })
        .eq('slug', slug);
    } else {
      // Create new view record
      await supabase
        .from('book_views')
        .insert({ slug, views: 1 });
    }

    return true;
  } catch (error) {
    console.error('Error incrementing view:', error);
    return false;
  }
}

export async function getBookView(slug: string): Promise<number> {
  try {
    const { supabase } = await import('./supabase');
    
    if (!supabase) {
      return 0;
    }
    
    const { data } = await supabase
      .from('book_views')
      .select('views')
      .eq('slug', slug)
      .single();

    return data?.views || 0;
  } catch (error) {
    console.error('Error getting book views:', error);
    return 0;
  }
}

export async function getAllBookViews(): Promise<Record<string, number>> {
  try {
    const { supabase } = await import('./supabase');
    
    if (!supabase) {
      return {};
    }
    
    const { data } = await supabase
      .from('book_views')
      .select('slug, views');

    const viewsMap: Record<string, number> = {};
    data?.forEach(item => {
      if (item.slug) {
        viewsMap[item.slug] = item.views || 0;
      }
    });

    return viewsMap;
  } catch (error) {
    console.error('Error getting all book views:', error);
    return {};
  }
}
