import { Suspense } from "react";
import { Metadata } from "next";
import { getBooks } from "@/src/lib/api";

import BookCard from "@/src/components/BookCard";
import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";
import { Book } from "@/src/types";

interface BooksResponse {
  books: Book[];
  total: number;
}

export const metadata: Metadata = {
  title: "Koleksi Buku | Kelas Pekerja",
  description:
    "Koleksi buku-buku kecil tentang malam, kopi, dan kehidupan pekerja.",
  openGraph: {
    title: "Koleksi Buku | Kelas Pekerja",
    description: "Koleksi buku-buku kecil tentang malam, kopi, dan kehidupan pekerja.",
    type: "website",
  },
};

export const dynamic = "force-static";
export const revalidate = 3600;

// Mapping judul buku ke slug folder
const bookSlugMap: Record<string, string> = {
  "Di Atas Cangkir Yang Sama": "di-atas-cangkir-yang-sama",
  "Di Balik Bar": "di-balik-bar",
  "Kami Menulis Pelan": "kami-menulis-pelan",
  "Seni Menyeduh Kehidupan": "seni-menyeduh-kehidupan",
};

// Komponen terpisah untuk empty state agar lebih clean
function EmptyState() {
  return (
    <div className="text-center py-32">
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#2b2b2b]/5 dark:bg-[#e8e0d5]/5 flex items-center justify-center">
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
        Tidak ada buku yang ditemukan
      </p>
      <p className="text-base opacity-40 max-w-md mx-auto">
        Coba ubah filter atau kata kunci pencarian
      </p>
    </div>
  );
}

// Komponen terpisah untuk grid buku - BookCard hanya dipanggil di sini
function BooksGrid({ 
  books, 
  total 
}: { 
  books: (Book & { slug: string })[]; 
  total: number 
}) {
  return (
    <>
      {/* Desktop: 2 kolom, Tablet: 2 kolom, Mobile: 1 kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            href={`/buku/${book.slug}`}
          />
        ))}
      </div>

      {/* INFO JUMLAH BUKU */}
      <div className="mt-32 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#2b2b2b]/10 dark:border-[#e8e0d5]/10">
          <span className="w-2 h-2 rounded-full bg-[#2b2b2b]/40 dark:bg-[#e8e0d5]/40" />
          <span className="text-sm opacity-50 tracking-wide">
            Menampilkan {books.length} dari {total} buku
          </span>
        </div>
      </div>
    </>
  );
}

export default async function BooksPage() {
  let booksWithSlugs: (Book & { slug: string })[] = [];
  let total = 0;

  try {
    const { books, total: totalBooks }: BooksResponse = await getBooks();
    total = totalBooks;

    booksWithSlugs = books.map((book) => ({
      ...book,
      slug:
        bookSlugMap[book.title] ||
        book.title.toLowerCase().replace(/\s+/g, "-"),
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  // Cek apakah ada data buku
  const hasBooks = booksWithSlugs.length > 0;

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-[11px] tracking-[0.5em] uppercase opacity-40 mb-6 font-medium">
            Perpustakaan Mini
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl opacity-90 mb-8 tracking-tight">
            Rak Buku
          </h1>

          <p className="text-base md:text-lg opacity-50 max-w-lg mx-auto leading-relaxed">
            Koleksi buku-buku kecil yang ditulis perlahan, untuk dibaca perlahan.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="px-6 pb-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <Suspense
              fallback={
                <div className="h-12 w-40 bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 animate-pulse rounded-lg" />
              }
            >
              <CategoryFilter />
            </Suspense>

            <Suspense
              fallback={
                <div className="h-12 w-72 bg-[#2b2b2b]/10 dark:bg-[#e8e0d5]/10 animate-pulse rounded-lg" />
              }
            >
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      {/* GRID BUKU - BookCard hanya dirender jika ada data */}
      <section className="px-6 pb-32">
        <div className="max-w-screen-2xl mx-auto">
          {hasBooks ? (
            <BooksGrid books={booksWithSlugs} total={total} />
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </main>
  );
}
