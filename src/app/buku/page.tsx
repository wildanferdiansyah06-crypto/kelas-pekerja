import { Suspense } from 'react';
import { Metadata } from 'next';
import { getBooks, getConfig } from '@/src/lib/api';
import BookCard from '@/src/components/BookCard';
import CategoryFilter from '@/src/components/CategoryFilter';
import SearchBar from '@/src/components/SearchBar';

export const metadata: Metadata = {
  title: 'Koleksi Buku | Kelas Pekerja',
  description: 'Koleksi buku-buku kecil tentang malam, kopi, dan kehidupan pekerja.',
};

// Revalidate every hour
export const revalidate = 3600;

interface BooksPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const search = typeof params.search === 'string' ? params.search : undefined;

  // Fetch data in parallel
  const [booksData, config] = await Promise.all([
    getBooks({ category, search }),
    getConfig(),
  ]);

  const { books, total } = booksData;

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1816] text-[#2b2b2b] dark:text-[#e8e0d5] transition-colors duration-700">
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-4">
            Perpustakaan Mini
          </p>
          <h1 className="font-serif text-4xl md:text-5xl opacity-90 mb-6">
            Rak Buku
          </h1>
          <p className="text-sm opacity-60 max-w-md mx-auto">
            Koleksi buku-buku kecil yang ditulis perlahan, untuk dibaca perlahan.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Suspense fallback={<div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />}>
              <CategoryFilter activeCategory={category} />
            </Suspense>
            <Suspense fallback={<div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />}>
              <SearchBar initialSearch={search} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Book Grid */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {books.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                {books.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}
              </div>

              {/* Results count */}
              <div className="mt-16 text-center text-xs opacity-40">
                Menampilkan {books.length} dari {total} buku
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl opacity-60 mb-4">
                Tidak ada buku yang ditemukan
              </p>
              <p className="text-sm opacity-40">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
