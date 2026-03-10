✅ Book detail page (buku/[slug]/page.tsx) created

// src/app/buku/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, Clock, BookOpen, Share2, Bookmark } from 'lucide-react';
import { getBook, getBooks } from '@/src/lib/api';
import booksData from '@/public/data/books.json';
import BookmarkButton from '@/src/components/BookmarkButton';
import ShareButtons from '@/src/components/ShareButtons';

// Generate static params from local JSON
export async function generateStaticParams() {
  // Read directly from JSON file at build time
  const books = booksData.books;

  return books.map((book) => ({
    slug: book.slug,
  }));
}

// Generate metadata for each book
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const book = booksData.books.find(b => b.slug === slug);

  if (!book) {
    return {
      title: 'Buku Tidak Ditemukan | Kelas Pekerja',
    };
  }

  return {
    title: `${book.title} | Kelas Pekerja`,
    description: book.excerpt,
    openGraph: {
      title: book.title,
      description: book.excerpt,
      images: [book.cover],
    },
  };
}

export const revalidate = 3600; // ISR: revalidate every hour

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;

  // Fetch book data
  let book;
  try {
    const data = await getBook(slug);
    book = data.book;
  } catch (error) {
    notFound();
  }

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1816] text-[#2b2b2b] dark:text-[#e8e0d5] transition-colors duration-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 dark:bg-[#1a1816]/90 backdrop-blur-sm border-b border-[#8b7355]/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/buku" 
            className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke Rak</span>
          </Link>

          <div className="flex items-center gap-2">
            <ShareButtons title={book.title} />
            <BookmarkButton 
              item={{
                id: book.id,
                type: 'book',
                title: book.title,
                slug: book.slug,
              }}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Cover Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.2em] uppercase opacity-40">
                <span className="px-3 py-1 rounded-full bg-[#8b7355]/10 text-[#8b7355]">
                  {book.category}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {book.pages} halaman
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {book.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl leading-tight opacity-90">
                {book.title}
              </h1>

              {/* Subtitle */}
              {book.subtitle && (
                <p className="text-lg opacity-60 italic">
                  {book.subtitle}
                </p>
              )}

              {/* Excerpt */}
              <p className="text-sm leading-relaxed opacity-70">
                {book.excerpt}
              </p>

              {/* Stats */}
              {book.stats && (
                <div className="flex items-center gap-6 text-xs opacity-40 py-4 border-y border-[#8b7355]/10">
                  <span>{book.stats.views.toLocaleString('id-ID')} kali dibaca</span>
                  <span>{book.stats.downloads} kali diunduh</span>
                </div>
              )}

              {/* Preview Quote */}
              <div className="p-6 rounded-lg bg-[#8b7355]/5 border-l-2 border-[#8b7355]/30">
                <p className="font-serif italic text-sm opacity-60">
                  "{book.preview}"
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {book.downloadUrl && (
                  <a
                    href={book.downloadUrl}
                    className="flex items-center justify-center gap-2 px-6 py-3 
                             bg-[#2b2b2b] dark:bg-[#e8e0d5] 
                             text-white dark:text-[#1a1816]
                             rounded-lg hover:opacity-90 transition-opacity
                             text-sm tracking-wider"
                  >
                    <Download size={18} />
                    <span>Unduh Buku</span>
                  </a>
                )}

                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 
                           border border-[#8b7355]/30 
                           rounded-lg hover:bg-[#8b7355]/5 transition-colors
                           text-sm tracking-wider opacity-80"
                >
                  <BookOpen size={18} />
                  <span>Baca Online</span>
                </button>
              </div>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full 
                               bg-black/5 dark:bg-white/5 
                               opacity-60 hover:opacity-100 transition-opacity"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section (Placeholder for full content) */}
      <section className="py-16 px-6 border-t border-[#8b7355]/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl mb-8 opacity-90">Isi Buku</h2>
          <div className="prose dark:prose-invert max-w-none opacity-70">
            <p className="italic">
              Konten lengkap buku akan ditampilkan di sini. 
              Saat ini Anda dapat mengunduh versi PDF untuk membaca selengkapnya.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
