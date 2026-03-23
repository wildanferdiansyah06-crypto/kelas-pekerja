"use client";

import { useState } from "react";
import Image from "next/image";
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
      {/* Featured Section */}
      {!hasFilters && featuredBooks.length > 0 && (
        <section className="mb-20" style={{ animation: "fade-in 0.6s ease-out" }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="text-sm tracking-[0.2em] uppercase opacity-60 font-medium">
              Paling Banyak Dibaca Minggu Ini
            </h2>
          </div>

          {/* GRID FIX → sekarang vertical card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {featuredBooks.map((book, index) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                index={index}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Grid */}
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

      {/* Info Footer */}
      <div className="mt-32 text-center" style={{ animation: "fade-in 0.6s ease-out" }}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#2b2b2b]/10 dark:border-[#e8e0d5]/10 hover:border-[#2b2b2b]/20 dark:hover:border-[#e8e0d5]/20 transition-colors duration-300">
          <span className="w-2 h-2 rounded-full bg-[#2b2b2b]/40 dark:bg-[#e8e0d5]/40 animate-pulse" />
          <span className="text-sm opacity-50 tracking-wide">
            Menampilkan {filteredCount} dari {total} cerita
            {category && category !== "all" && ` • ${category}`}
            {search && ` • "${search}"`}
          </span>
        </div>
      </div>

      {/* Modal */}
      <BookPreviewModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}

/* =========================
   FEATURED CARD (FIXED)
   ========================= */

function FeaturedBookCard({
  book,
  index,
  onClick,
}: {
  book: Book & { slug: string };
  index: number;
  onClick: () => void;
}) {
  const author = (book as any).author || "Kelas Pekerja";

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
      style={{ animation: `fade-in 0.6s ease-out ${index * 0.1}s both` }}
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-5 bg-[#2b2b2b]/5">
        {book.cover ? (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width:768px) 100vw, 300px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 opacity-20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}

        {/* overlay hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b2b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="px-1">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase opacity-50 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          {book.category || "Umum"}
        </span>

        <h3 className="font-serif text-xl md:text-2xl leading-tight mb-2 group-hover:opacity-70 transition-opacity">
          {book.title}
        </h3>

        <p className="text-sm opacity-60 leading-relaxed line-clamp-3 mb-3">
          &ldquo;
          {(book.excerpt?.substring(0, 120) ||
            book.subtitle ||
            "Tidak ada deskripsi")}
          ...&rdquo;
        </p>

        <div className="flex items-center gap-3 text-xs opacity-40">
          <span>{book.readTime || "5 min read"}</span>
          <span>•</span>
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
}
