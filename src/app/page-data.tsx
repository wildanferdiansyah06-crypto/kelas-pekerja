import { getFeaturedBooks, getConfig, getBooks } from "@/src/lib/api";

export async function getPageData() {
  try {
  const featuredData = await getFeaturedBooks(2);
  const config = await getConfig();
  const allBooksData = await getBooks({ limit: 6 });
  
  const featuredBooks = featuredData.books;
  const allBooks = allBooksData.books;
  const latestBooks = allBooks.slice(0, 3);
  
  const featuredSlugs = new Set(latestBooks.map(b => b.slug));
  const mostRelatable = allBooks
    .filter(b => b.featured && !featuredSlugs.has(b.slug))
    .slice(0, 3);
  
  if (mostRelatable.length < 3) {
    const remaining = allBooks.filter(b => !featuredSlugs.has(b.slug) && !mostRelatable.find(m => m.slug === b.slug));
    mostRelatable.push(...remaining.slice(0, 3 - mostRelatable.length));
  }
  
  const totalViews = allBooks.reduce((sum, book) => sum + (book.stats?.views || 0), 0);
  const totalDownloads = allBooks.reduce((sum, book) => sum + (book.stats?.downloads || 0), 0);

  return {
    featuredBooks,
    allBooks,
    latestBooks,
    mostRelatable,
    totalViews,
    totalDownloads,
    config
  };
}
