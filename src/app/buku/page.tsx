import { Suspense } from "react";
import { Metadata } from "next";
import { getBooks } from "@/src/lib/api";
import BookCard from "@/src/components/BookCard";
import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";

export const metadata: Metadata = {
  title: "Koleksi Buku | Kelas Pekerja",
  description:
    "Koleksi buku-buku kecil tentang malam, kopi, dan kehidupan pekerja.",
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function BooksPage() {
  const { books, total } = await getBooks();

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1816] text-[#2b2b2b] dark:text-[#e8e0d5] transition-colors duration-700">

      {/* HEADER */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

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

      {/* FILTER */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">

            <Suspense
              fallback={
                <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
              }
            >
              <CategoryFilter />
            </Suspense>

            <Suspense
              fallback={
                <div className="h-10 w-64 bg-gray-200 animate-pulse rounded" />
              }
            >
              <SearchBar />
            </Suspense>

          </div>

        </div>
      </section>

      {/* GRID BUKU */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">

          {books.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                {books.map((book, index) => (
                  <BookCard key={book.id} book={book} index={index} />
                ))}

              </div>

              <div className="mt-20 text-center text-xs opacity-40">
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
