"use client";

import { useState } from "react";
import { Book } from "@/src/types";
import BookCard from "./BookCard";
import BookPreviewModal from "./BookPreviewModal";

interface BooksGridClientProps {
  featuredBooks: (Book & { slug: string })[];
  regularBooks: (Book & { slug: string })[];
  total: number;
  filteredCount: number;
  hasFilters: boolean;
  category?: string;
  search?: string;
}

export default function BooksGridClient({
  featuredBooks,
  regularBooks,
  total,
  filteredCount,
  hasFilters,
  category,
  search,
}: BooksGridClientProps) {
  const [selectedBook, setSelectedBook] = useState<(Book & { slug: string }) | null>(null);

  return (
    <>
      {/* =========================
          FEATURED (FIXED TOTAL)
         ========================= */}
      {!hasFilters && featuredBooks.length > 0 && (
        <section className="mb-20" style={{ animation: "fade-in 0.6s ease-out" }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="text-sm tracking-[0.2em] uppercase text-[#d4a574] dark:opacity-60 font-medium">
              Paling Banyak Dibaca Minggu Ini
            </h2>
          </div>

          {/* ✅ PAKAI BookCard BIAR SAMA PERSIS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
            {featuredBooks.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================
          REGULAR GRID
         ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
        {regularBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {/* =========================
          FOOTER INFO
         ========================= */}
      <div className="mt-32 text-center" style={{ animation: "fade-in 0.6s ease-out" }}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#8b4513]/30 dark:border-[#e8e0d5]/10 hover:border-[#8b7355]/40 dark:hover:border-[#e8e0d5]/20 transition-colors duration-300">
          <span className="w-2 h-2 rounded-full bg-[#8b7355]/40 dark:bg-[#e8e0d5]/40 animate-pulse" />
          <span className="text-sm text-[#8b7355] dark:opacity-50 tracking-wide">
            Menampilkan {filteredCount} dari {total} cerita
            {category && category !== "all" && ` • ${category}`}
            {search && ` • "${search}"`}
          </span>
        </div>
      </div>

      {/* =========================
          MODAL
         ========================= */}
      <BookPreviewModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}
