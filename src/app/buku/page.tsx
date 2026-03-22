import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBooks } from "@/src/lib/api";

import BookCard from "@/src/components/BookCard";
import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";
import BooksGridClient from "@/src/components/BooksGridClient";
import { Book } from "@/src/types";

interface BooksResponse {
  books: Book[];
  total: number;
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Rak Buku | Kelas Pekerja",
  description:
    "Kumpulan pengalaman kerja nyata dari barista, retail staff, dan pekerja kantoran yang gak diajarin di sekolah.",
  openGraph: {
    title: "Rak Buku | Kelas Pekerja",
    description: "Kumpulan pengalaman kerja nyata dari barista, retail staff, dan pekerja kantoran yang gak diajarin di sekolah.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const bookSlugMap: Record<string, string> = {
  "Di Atas Cangkir Yang Sama": "di-atas-cangkir-yang-sama",
  "Di Balik Bar": "di-balik-bar",
  "Kami Menulis Pelan": "kami-menulis-pelan",
  "Seni Menyeduh Kehidupan": "seni-menyeduh-kehidupan",
};

// YANG INI KEEP - HAPUS YANG KEDUA
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateExcerpt(content: string, maxLength = 140): string {
  if (!content) return "";

  const clean = content
    .replace(/[#_*`]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= maxLength) return clean;

  return clean.slice(0, maxLength) + "...";
}

function EmptyState({ hasFilters = false }: { hasFilters?: boolean }) {
  return (
    <div className="text-center py-32" style={{ animation: 'fade-in 0.6s ease-out' }}>
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#2b2b2b]/5 dark:bg-[#e8e0d5]/5 flex items-center justify-center transition-all duration-500 hover:scale-105">
        <svg
          className="w-10 h-10 opacity-30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <p className="font-serif text-2xl opacity-60 mb-4">
        {hasFilters ? "Tidak ada buku yang cocok" : "Rak masih terlalu ringan"}
      </p>
      <p className="text-base opacity-40 max-w-md mx-auto mb-8">
        {hasFilters 
          ? "Coba ubah filter kategori atau kata kunci pencarian" 
          : "Belum banyak cerita di sini. Jadi yang pertama berbagi pengalaman lo."}
      </p>
      {!hasFilters && (
        <Link 
          href="/tulis"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#2b2b2b] dark:border-[#e8e0d5] rounded-full hover:bg-[#2b2b2b] hover:text-[#e8e0d5] dark:hover:bg-[#e8e0d5] dark:hover:text-[#2b2b2b] transition-all duration-300"
        >
          <span>Tulis Pengalaman Lo</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}

function BooksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[16/10] bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 rounded-lg mb-6" />
          <div className="h-6 bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 rounded w-3/4 mb-3" />
          <div className="h-4 bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

// Server component buat fetch data
async function BooksGrid({ 
  books, 
  total,
  category,
  search
}: { 
  books: (Book & { slug: string })[]; 
  total: number;
  category?: string;
  search?: string;
}) {
  let filteredBooks = books;
  
  if (category && category !== 'all') {
    filteredBooks = filteredBooks.filter(book => 
      book.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchLower) ||
      book.excerpt?.toLowerCase().includes(searchLower) ||
      (book.subtitle?.toLowerCase().includes(searchLower) || false) ||
      (book.category?.toLowerCase().includes(searchLower) || false)
    );
  }

  const hasFilters = !!(category || search);
  const featuredBooks = !hasFilters ? filteredBooks.slice(0, 2) : [];
  const regularBooks = !hasFilters ? filteredBooks.slice(2) : filteredBooks;

  if (filteredBooks.length === 0) {
    return <EmptyState hasFilters={hasFilters} />;
  }

  // Pass data ke client component yang punya modal logic
  return (
    <BooksGridClient 
      featuredBooks={featuredBooks}
      regularBooks={regularBooks}
      total={total}
      filteredCount={filteredBooks.length}
      hasFilters={hasFilters}
      category={category}
      search={search}
    />
  );
}

export default async function BooksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const search = typeof params.search === 'string' ? params.search : undefined;

  let booksWithSlugs: (Book & { slug: string })[] = [];
  let total = 0;
  let error: Error | null = null;
  let uniqueCategories: string[] = [];

  try {
    const { books, total: totalBooks }: BooksResponse = await getBooks();
    total = totalBooks;

    booksWithSlugs = books.map((book) => ({
      ...book,
      slug: bookSlugMap[book.title] || generateSlug(book.title),
    }));

    const allCategories = books.map(b => b.category).filter(Boolean) as string[];
    uniqueCategories = Array.from(new Set(allCategories));
  } catch (err) {
    error = err instanceof Error ? err : new Error('Unknown error');
    console.error("Error fetching books:", error);
  }

  const hasBooks = booksWithSlugs.length > 0;

  return (
    <main className="min-h-screen">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-[11px] tracking-[0.5em] uppercase opacity-40 mb-6 font-medium" style={{ animation: 'fade-in 0.6s ease-out' }}>
            Perpustakaan Mini
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl opacity-90 mb-6 tracking-tight" style={{ animation: 'fade-in-up 0.6s ease-out 0.1s forwards', opacity: 0 }}>
            Rak Buku
          </h1>

          <p className="text-lg md:text-xl opacity-60 max-w-2xl mx-auto leading-relaxed mb-6" style={{ animation: 'fade-in-up 0.6s ease-out 0.2s forwards', opacity: 0 }}>
            &ldquo;Kumpulan pengalaman kerja nyata dari barista, retail staff, 
            dan pekerja kantoran yang gak diajarin di sekolah.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-6 text-sm opacity-40" style={{ animation: 'fade-in-up 0.6s ease-out 0.3s forwards', opacity: 0 }}>
            <span className="flex items-center gap-2">
              <span className="font-semibold opacity-60">{total}</span> cerita
            </span>
            <span className="opacity-20">|</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold opacity-60">{uniqueCategories.length}</span> kategori
            </span>
            <span className="opacity-20">|</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              diupdate mingguan
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <Suspense
              fallback={
                <div className="h-12 w-40 bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 animate-pulse rounded-lg" />
              }
            >
              <CategoryFilter activeCategory={category} books={booksWithSlugs} />
            </Suspense>

            <Suspense
              fallback={
                <div className="h-12 w-72 bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 animate-pulse rounded-lg" />
              }
            >
              <SearchBar initialSearch={search} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-screen-2xl mx-auto">
          {error ? (
            <div className="text-center py-32">
              <p className="font-serif text-2xl opacity-60 mb-4">Terjadi kesalahan</p>
              <p className="text-base opacity-40">{error.message}</p>
            </div>
          ) : hasBooks ? (
            <Suspense fallback={<BooksGridSkeleton />}>
              <BooksGrid 
                books={booksWithSlugs} 
                total={total} 
                category={category}
                search={search}
              />
            </Suspense>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}
