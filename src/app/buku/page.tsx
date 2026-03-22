import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBooks } from "@/src/lib/api";

import BookCard from "@/src/components/BookCard";
import CategoryFilter from "@/src/components/CategoryFilter";
import SearchBar from "@/src/components/SearchBar";
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

// Mapping judul buku ke slug folder
const bookSlugMap: Record<string, string> = {
  "Di Atas Cangkir Yang Sama": "di-atas-cangkir-yang-sama",
  "Di Balik Bar": "di-balik-bar",
  "Kami Menulis Pelan": "kami-menulis-pelan",
  "Seni Menyeduh Kehidupan": "seni-menyeduh-kehidupan",
};

// Helper function untuk generate slug fallback
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Komponen terpisah untuk empty state
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

// Skeleton loading untuk grid buku
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

// Featured Book Card - lebih besar untuk highlight
function FeaturedBookCard({ book, index }: { book: Book & { slug: string }; index: number }) {
  const author = (book as any).author || "Kelas Pekerja";
  
  return (
    <Link 
      href={`/buku/${book.slug}`}
      className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-[#2b2b2b]/10 dark:border-[#e8e0d5]/10 hover:border-[#2b2b2b]/30 dark:hover:border-[#e8e0d5]/30 transition-all duration-500 hover:shadow-lg"
    >
      <div className="aspect-[3/4] md:w-48 md:h-64 relative overflow-hidden rounded-lg bg-[#2b2b2b]/5 flex-shrink-0">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b2b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-col justify-center">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-wider uppercase opacity-50 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          {book.category || "Umum"}
        </span>
        
        <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-3 group-hover:opacity-70 transition-opacity">
          {book.title}
        </h3>
        
        <p className="text-base opacity-60 leading-relaxed line-clamp-3 mb-4">
          &ldquo;{(book.excerpt?.substring(0, 150) || book.subtitle || "Tidak ada deskripsi")}...&rdquo;
        </p>
        
        <div className="flex items-center gap-4 text-xs opacity-40 mt-auto">
          <span>{book.readTime || "5 min read"}</span>
          <span>•</span>
          <span>{author}</span>
        </div>
      </div>
    </Link>
  );
}

// Komponen terpisah untuk grid buku dengan filtering
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

  return (
    <>
      {!hasFilters && featuredBooks.length > 0 && (
        <section className="mb-20" style={{ animation: 'fade-in 0.6s ease-out' }}>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="text-sm tracking-[0.2em] uppercase opacity-60 font-medium">
              Paling Banyak Dibaca Minggu Ini
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredBooks.map((book, index) => (
              <FeaturedBookCard key={book.id} book={book} index={index} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-20">
        {regularBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            index={index}
            href={`/buku/${book.slug}`}
          />
        ))}
      </div>

      <div className="mt-32 text-center" style={{ animation: 'fade-in 0.6s ease-out' }}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#2b2b2b]/10 dark:border-[#e8e0d5]/10 hover:border-[#2b2b2b]/20 dark:hover:border-[#e8e0d5]/20 transition-colors duration-300">
          <span className="w-2 h-2 rounded-full bg-[#2b2b2b]/40 dark:bg-[#e8e0d5]/40 animate-pulse" />
          <span className="text-sm opacity-50 tracking-wide">
            Menampilkan {filteredBooks.length} dari {total} cerita
            {category && category !== 'all' && ` • ${category}`}
            {search && ` • &quot;${search}&quot;`}
          </span>
        </div>
      </div>
    </>
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

    // FIX: Use Array.from() instead of spread operator on Set
    const categoriesArray = books.map(b => b.category).filter((c): c is string => !!c);
    uniqueCategories = Array.from(new Set(categoriesArray));
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
