"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getBooks } from "@/src/lib/api";
import { useTheme } from "@/src/components/ThemeProvider";

import BookCard from "@/src/components/BookCard";
import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";
import BooksGridClient from "@/src/components/BooksGridClient";
import { Book } from "@/src/types";

interface BooksResponse {
  books: Book[];
  total: number;
}

const bookSlugMap: Record<string, string> = {
  "Di Atas Cangkir Yang Sama": "di-atas-cangkir-yang-sama",
  "Di Balik Bar": "di-balik-bar",
  "Kami Menulis Pelan": "kami-menulis-pelan",
  "Seni Menyeduh Kehidupan": "seni-menyeduh-kehidupan",
};

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function EmptyState({ hasFilters = false, isDark = false }: { hasFilters?: boolean; isDark?: boolean }) {
  return (
    <div className="text-center py-32" style={{ animation: 'fade-in 0.6s ease-out' }}>
      <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 ${isDark ? 'bg-[#e8e0d5]/5' : 'bg-[#3d2817]/10'}`}>
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
      <p className={`font-serif text-2xl opacity-60 mb-4 ${isDark ? 'text-[#f4e4d4]' : 'text-[#8b7355]'}`}>
        {hasFilters ? "Tidak ada buku yang cocok" : "Rak masih terlalu ringan"}
      </p>
      <p className={`text-base opacity-40 max-w-md mx-auto mb-8 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
        {hasFilters 
          ? "Coba ubah filter kategori atau kata kunci pencarian" 
          : "Belum banyak cerita di sini. Jadi yang pertama berbagi pengalaman lo."}
      </p>
      {!hasFilters && (
        <Link 
          href="/tulis"
          className={`inline-flex items-center gap-2 px-6 py-3 border rounded-full transition-all duration-300 ${isDark ? 'border-[#e8e0d5] hover:bg-[#e8e0d5] hover:text-[#2b2b2b]' : 'border-[#8b4513]/30 hover:bg-[#8b7355] hover:text-[#f4e4d4]'}`}
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

function GridSkeleton({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className={`aspect-[16/10] rounded-lg mb-6 ${isDark ? 'bg-[#e8e0d5]/10' : 'bg-[#3d2817]/20'}`} />
          <div className={`h-6 rounded w-3/4 mb-3 ${isDark ? 'bg-[#e8e0d5]/10' : 'bg-[#3d2817]/20'}`} />
          <div className={`h-4 rounded w-1/2 ${isDark ? 'bg-[#e8e0d5]/10' : 'bg-[#3d2817]/20'}`} />
        </div>
      ))}
    </div>
  );
}

function FeaturedCard({ book, index, onSelect, isDark = false }: { book: Book & { slug: string }; index: number; onSelect: (b: Book & { slug: string }) => void; isDark?: boolean }) {
  const author = (book as any).author || "Kelas Pekerja";

  return (
    <div
      onClick={() => onSelect(book)}
      className={`group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all duration-500 hover:shadow-lg cursor-pointer ${isDark ? 'border-[#e8e0d5]/10 hover:border-[#e8e0d5]/30' : 'border-[#8b4513]/20 hover:border-[#8b7355]/40'}`}
    >
      <div className={`aspect-[3/4] md:w-48 md:h-64 relative overflow-hidden rounded-lg flex-shrink-0 ${isDark ? 'bg-[#e8e0d5]/10' : 'bg-[#3d2817]/20'}`}>
        {book.cover ? (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col justify-center">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase opacity-50 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          {book.category || "Umum"}
        </span>

        <h3 className={`font-serif text-2xl md:text-3xl leading-tight mb-3 group-hover:opacity-70 transition-opacity ${isDark ? 'text-[#f4e4d4]' : 'text-[#8b7355]'}`}>
          {book.title}
        </h3>

        <p className={`text-base opacity-60 leading-relaxed line-clamp-3 mb-4 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
          &ldquo;{(book.excerpt?.substring(0, 150) || book.subtitle || "Tidak ada deskripsi")}...&rdquo;
        </p>

        <div className={`flex items-center gap-4 text-xs opacity-40 mt-auto ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>
          <span>{book.readTime || "5 min read"}</span>
          <span>•</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
}

function GridWithData({
  books,
  total,
  category,
  search,
  isDark = false
}: {
  books: (Book & { slug: string })[];
  total: number;
  category?: string;
  search?: string;
  isDark?: boolean;
}) {
  let filtered = books;

  if (category && category !== 'all') {
    filtered = filtered.filter(b => b.category?.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(s) ||
      b.excerpt?.toLowerCase().includes(s) ||
      (b.subtitle?.toLowerCase().includes(s) || false) ||
      (b.category?.toLowerCase().includes(s) || false)
    );
  }

  const hasFilters = !!(category || search);
  const featured = !hasFilters ? filtered.slice(0, 2) : [];
  const regular = !hasFilters ? filtered.slice(2) : filtered;

  if (filtered.length === 0) {
    return <EmptyState hasFilters={hasFilters} isDark={isDark} />;
  }

  return (
    <BooksGridClient
      featuredBooks={featured}
      regularBooks={regular}
      total={total}
      filteredCount={filtered.length}
      hasFilters={hasFilters}
      category={category}
      search={search}
      isDark={isDark}
    />
  );
}

function PageContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const searchParams = useSearchParams();

  const [booksWithSlugs, setBooksWithSlugs] = useState<(Book & { slug: string })[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  useEffect(() => {
    // Fetch books
    getBooks()
      .then(({ books, total: totalBooks }: BooksResponse) => {
        setTotal(totalBooks);

        const slugs = books.map((book) => ({
          ...book,
          slug: bookSlugMap[book.title] || makeSlug(book.title),
        }));

        setBooksWithSlugs(slugs);

        const allCategories = books.map(b => b.category).filter(Boolean) as string[];
        setUniqueCategories(Array.from(new Set(allCategories)));
      })
      .catch((err) => {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        console.error("Error fetching books:", error);
      });
  }, []);

  const hasBooks = booksWithSlugs.length > 0;

  return (
    <main className="transition-colors duration-500">
      <section className={`pt-32 pb-16 px-6 ${isDark ? 'bg-[#0f0e0c]' : 'bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]'}`}>
        <div className="max-w-screen-lg mx-auto text-center">
          <p className={`text-[11px] tracking-[0.5em] uppercase mb-6 font-medium ${isDark ? 'text-[#d4a574]' : 'text-[#d4a574]'}`} style={{ animation: 'fade-in 0.6s ease-out' }}>
            Perpustakaan Mini
          </p>

          <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight ${isDark ? 'text-[#f4e4d4]' : 'text-[#f4e4d4]'}`} style={{ animation: 'fade-in-up 0.6s ease-out 0.1s forwards', opacity: 0 }}>
            Rak Buku
          </h1>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`} style={{ animation: 'fade-in-up 0.6s ease-out 0.2s forwards', opacity: 0 }}>
            &ldquo;Kumpulan pengalaman kerja nyata dari barista, retail staff,
            dan pekerja kantoran yang gak diajarin di sekolah.&rdquo;
          </p>

          <div className={`flex items-center justify-center gap-6 text-sm ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`} style={{ animation: 'fade-in-up 0.6s ease-out 0.3s forwards', opacity: 0 }}>
            <span className="flex items-center gap-2">
              <span className={`font-semibold ${isDark ? 'text-[#d4a574]' : 'text-[#d4a574]'}`}>{total}</span> cerita
            </span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-2">
              <span className={`font-semibold ${isDark ? 'text-[#d4a574]' : 'text-[#d4a574]'}`}>{uniqueCategories.length}</span> kategori
            </span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              diupdate mingguan
            </span>
          </div>
        </div>
      </section>

      <section className={`px-6 pb-16 ${isDark ? 'bg-[#0f0e0c]' : 'bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]'}`}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <Suspense fallback={<div className={`h-12 w-40 animate-pulse rounded-lg ${isDark ? 'bg-[#e8e0d5]/10' : 'bg-[#3d2817]/20'}`} />}>
              <CategoryFilter activeCategory={category} books={booksWithSlugs} />
            </Suspense>

            <Suspense fallback={<div className={`h-12 w-72 animate-pulse rounded-lg ${isDark ? 'bg-[#e8e0d5]/10' : 'bg-[#3d2817]/20'}`} />}>
              <SearchBar initialSearch={search} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className={`px-6 pb-32 ${isDark ? 'bg-[#0f0e0c]' : 'bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]'}`}>
        <div className="max-w-screen-2xl mx-auto">
          {error ? (
            <div className="text-center py-32">
              <p className={`font-serif text-2xl opacity-60 mb-4 ${isDark ? 'text-[#f4e4d4]' : 'text-[#8b7355]'}`}>Terjadi kesalahan</p>
              <p className={`text-base opacity-40 ${isDark ? 'text-[#bfae9c]' : 'text-[#8b7355]'}`}>{error.message}</p>
            </div>
          ) : hasBooks ? (
            <Suspense fallback={<GridSkeleton isDark={isDark} />}>
              <GridWithData books={booksWithSlugs} total={total} category={category} search={search} isDark={isDark} />
            </Suspense>
          ) : (
            <EmptyState isDark={isDark} />
          )}
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
