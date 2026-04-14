"use client";

import { useState, lazy, Suspense } from "react";
import { Book } from "@/src/types";
import BookCard from "./BookCard";
const BookPreviewModal = lazy(() => import("./BookPreviewModal"));

interface BooksGridClientProps {
  featuredBooks: (Book & { slug: string })[];
  regularBooks: (Book & { slug: string })[];
  total: number;
  filteredCount: number;
  hasFilters: boolean;
  category?: string;
  search?: string;
  isDark?: boolean;
}

export default function BooksGridClient({
  featuredBooks,
  regularBooks,
  total,
  filteredCount,
  hasFilters,
  category,
  search,
  isDark = false,
}: BooksGridClientProps) {
  const [selectedBook, setSelectedBook] = useState<(Book & { slug: string }) | null>(null);

  const handleBookClick = async (book: Book & { slug: string }) => {
    // Increment view count
    try {
      await fetch('/api/increment-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: book.slug })
      });
    } catch (error) {
      console.error('Error incrementing view:', error);
    }

    setSelectedBook(book);
  };

  return (
    <>
      {/* =========================
          FEATURED (FIXED TOTAL)
         ========================= */}
      {!hasFilters && featuredBooks.length > 0 && (
        <section className="mb-20" style={{ animation: "fade-in 0.6s ease-out" }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h2 className={`text-sm tracking-[0.1em] uppercase font-medium ${isDark ? 'text-[#d4a574] opacity-60' : 'text-[#8b7355]'}`}>
              Paling Banyak Dibaca Minggu Ini
            </h2>
          </div>

          {/* ✅ PAKAI BookCard BIAR SAMA PERSIS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 lg:gap-x-16 lg:gap-y-16">
            {featuredBooks.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                onClick={() => handleBookClick(book)}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================
          REGULAR GRID
         ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 lg:gap-x-16 lg:gap-y-16">
        {regularBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </div>

      {/* =========================
          FOOTER INFO
         ========================= */}
      <div className="mt-32 text-center" style={{ animation: "fade-in 0.6s ease-out" }}>
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-colors duration-300"
          style={{
            borderColor: 'var(--kp-border)',
            color: 'var(--kp-text-muted)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--kp-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--kp-border)';
          }}
        >
          <span 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--kp-accent)', opacity: 0.4 }}
          />
          <span className="text-sm tracking-wide">
            Menampilkan {filteredCount} dari {total} cerita
            {category && category !== "all" && ` • ${category}`}
            {search && ` • "${search}"`}
          </span>
        </div>
      </div>

      {/* =========================
          MODAL
         ========================= */}
      <Suspense fallback={null}>
        <BookPreviewModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      </Suspense>
    </>
  );
}
