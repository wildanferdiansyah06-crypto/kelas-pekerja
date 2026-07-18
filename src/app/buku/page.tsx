"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Book as BookIcon, Sparkles } from "lucide-react";

import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";
import BooksGridClient from "@/src/components/BooksGridClient";
import { Book } from "@/src/types";

interface BooksResponse {
  books: Book[];
  total: number;
}

const bookSlugMap: Record<string, string> = {
  "Cahaya Itu": "cahaya-itu",
  "Seni Menyeduh Kehidupan": "seni-menyeduh-kehidupan",
  "Di Atas Cangkir Yang Sama": "di-atas-cangkir-yang-sama",
  "Di Balik Bar": "di-balik-bar",
  "Kami Menulis Pelan": "kami-menulis-pelan",
  "Yang Tertinggal di Lembah": "yang-tertinggal-di-lembah",
};

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function EmptyState({ hasFilters = false }: { hasFilters?: boolean }) {
  return (
    <div className="text-center py-32 animate-fade-in-up">
      <div
        className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center glass-card glow-amber"
      >
        <BookIcon size={32} style={{ color: 'var(--kp-accent)', opacity: 0.5 }} />
      </div>
      <p className="font-display text-2xl mb-4" style={{ color: 'var(--kp-text-primary)', opacity: 0.6 }}>
        {hasFilters ? "Tidak ada buku yang cocok" : "Rak masih terlalu ringan"}
      </p>
      <p className="font-body text-base max-w-md mx-auto mb-8" style={{ color: 'var(--kp-text-muted)', opacity: 0.4 }}>
        {hasFilters
          ? "Coba ubah filter kategori atau kata kunci pencarian"
          : "Belum banyak cerita di sini. Jadi yang pertama berbagi pengalaman lo."}
      </p>
      {!hasFilters && (
        <Link
          href="/tulis"
          className="inline-flex items-center gap-2 px-6 py-3 font-ui text-sm font-medium rounded-full transition-all duration-300 glass"
          style={{
            border: '1px solid rgba(212, 165, 116, 0.2)',
            color: 'var(--kp-text-muted)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.5)';
            e.currentTarget.style.color = 'var(--kp-accent)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.2)';
            e.currentTarget.style.color = 'var(--kp-text-muted)';
            e.currentTarget.style.boxShadow = 'none';
          }}
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

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse glass-card rounded-2xl p-6">
          <div className="aspect-[16/10] rounded-lg mb-4 animate-shimmer" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
          <div className="h-6 rounded-full w-3/4 mb-3" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
          <div className="h-4 rounded-full w-1/2" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />
        </div>
      ))}
    </div>
  );
}

function GridWithData({
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
  const featured = !hasFilters ? filtered.filter(b => b.featured) : [];
  const regular = !hasFilters ? filtered.filter(b => !b.featured) : filtered;

  if (filtered.length === 0) {
    return <EmptyState hasFilters={hasFilters} />;
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
    />
  );
}

function PageContent() {
  const searchParams = useSearchParams();

  const [booksWithSlugs, setBooksWithSlugs] = useState<(Book & { slug: string })[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  useEffect(() => {
    // Fetch books from API route
    fetch('/api/books')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(({ books, total: totalBooks }: BooksResponse) => {
        setTotal(totalBooks);

        const slugs = books.map((book) => ({
          ...book,
          slug: book.slug || bookSlugMap[book.title] || makeSlug(book.title),
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
    <main className="transition-colors duration-500 w-full" style={{ backgroundColor: 'var(--kp-bg-base)' }}>

      {/* ═══════════════════════════════
          HERO HEADER — Cinematic
      ═══════════════════════════════ */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-6 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.06),transparent_70%)] pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute top-1/3 left-[15%] animate-firefly particle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/4 right-[20%] animate-firefly particle" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-ui font-medium tracking-wider uppercase mb-6 glass animate-fade-in-up"
            style={{ color: 'var(--kp-accent)', borderColor: 'rgba(212, 165, 116, 0.2)' }}
          >
            <Sparkles size={12} className="animate-pulse" />
            Perpustakaan Mini
          </div>

          <h1
            className="typography-h1 mb-6 animate-slide-in-up delay-100"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            Rak Buku
          </h1>

          <p
            className="font-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-200 text-balance"
            style={{ color: 'var(--kp-text-secondary)' }}
          >
            &ldquo;Kumpulan pengalaman kerja nyata dari barista, retail staff,
            dan pekerja kantoran yang gak diajarin di sekolah.&rdquo;
          </p>

          {/* Stats */}
          <div
            className="inline-flex items-center gap-5 sm:gap-8 text-xs sm:text-sm font-ui glass px-6 py-3 rounded-full border animate-fade-in-up delay-300"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            <span className="flex items-center gap-2">
              <span className="font-semibold text-glow" style={{ color: 'var(--kp-accent)' }}>{total}</span>
              <span style={{ color: 'var(--kp-text-muted)' }}>cerita</span>
            </span>
            <span className="w-[1px] h-4" style={{ backgroundColor: 'rgba(212, 165, 116, 0.2)' }} />
            <span className="flex items-center gap-2">
              <span className="font-semibold text-glow" style={{ color: 'var(--kp-accent)' }}>{uniqueCategories.length}</span>
              <span style={{ color: 'var(--kp-text-muted)' }}>kategori</span>
            </span>
            <span className="w-[1px] h-4" style={{ backgroundColor: 'rgba(212, 165, 116, 0.2)' }} />
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--kp-accent)', boxShadow: '0 0 6px rgba(212, 165, 116, 0.5)' }} />
              <span style={{ color: 'var(--kp-text-muted)' }}>diupdate mingguan</span>
            </span>
          </div>
        </div>

        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.15)] to-transparent" />
      </section>

      {/* ═══════════════════════════════
          FILTER BAR — Glassmorphism
      ═══════════════════════════════ */}
      <section className="px-6 pb-8 sm:pb-12 w-full">
        <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          <div
            className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center justify-between glass rounded-2xl px-6 py-4 border"
            style={{ borderColor: 'rgba(212, 165, 116, 0.08)' }}
          >
            <Suspense fallback={<div className="h-10 sm:h-12 w-32 sm:w-40 animate-pulse rounded-lg" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />}>
              <CategoryFilter activeCategory={category} books={booksWithSlugs} />
            </Suspense>

            <Suspense fallback={<div className="h-10 sm:h-12 w-56 sm:w-72 animate-pulse rounded-lg" style={{ backgroundColor: 'var(--kp-bg-elevated)' }} />}>
              <SearchBar initialSearch={search} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          BOOKS GRID — Untouched grid component
      ═══════════════════════════════ */}
      <section className="px-6 pb-16 sm:pb-24 md:pb-32 w-full">
        <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-24 sm:py-32 glass-card rounded-2xl">
              <p className="font-display text-xl sm:text-2xl mb-4" style={{ color: 'var(--kp-text-primary)', opacity: 0.6 }}>Terjadi kesalahan</p>
              <p className="font-body text-sm sm:text-base" style={{ color: 'var(--kp-text-muted)', opacity: 0.4 }}>{error.message}</p>
            </div>
          ) : hasBooks ? (
            <Suspense fallback={<GridSkeleton />}>
              <GridWithData books={booksWithSlugs} total={total} category={category} search={search} />
            </Suspense>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--kp-bg-base)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(212, 165, 116, 0.3)', borderTopColor: 'var(--kp-accent)' }} />
          <span className="font-ui text-sm" style={{ color: 'var(--kp-text-muted)' }}>Memuat rak buku...</span>
        </div>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
