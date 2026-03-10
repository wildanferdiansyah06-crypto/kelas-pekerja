import { MetadataRoute } from 'next';
import booksData from '@/public/data/books.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kelaspekerja.id';

  // Static pages
  const staticPages = [
    '',
    '/buku/',
    '/tentang/',
    '/simpanan/',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic book pages
  const bookPages = booksData.books.map((book) => ({
    url: `${baseUrl}/buku/${book.slug}/`,
    lastModified: new Date(book.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...bookPages];
}
