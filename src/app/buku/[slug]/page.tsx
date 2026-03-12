import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Clock, BookOpen } from "lucide-react"

import { getBook } from "@/src/lib/api"
import booksData from "@/public/data/books.json"
import { Book } from "@/src/types"

import BookmarkButton from "@/src/components/BookmarkButton"
import ShareButtons from "@/src/components/ShareButtons"

const books = booksData.books as Book[]

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const book = books.find((b) => b.slug === slug)

  if (!book) {
    return {
      title: "Buku Tidak Ditemukan | Kelas Pekerja",
    }
  }

  return {
    title: `${book.title} | Kelas Pekerja`,
    description: book.excerpt,
    openGraph: {
      title: book.title,
      description: book.excerpt,
      images: [book.cover],
    },
  }
}

export const revalidate = 3600

interface BookPageProps {
  params: Promise<{ slug: string }>
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params

  let book: Book | undefined

  try {
    const data = await getBook(slug)
    book = data.book as Book
  } catch {
    book = books.find((b) => b.slug === slug)
  }

  if (!book) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1816] text-[#2b2b2b] dark:text-[#e8e0d5] transition-colors duration-700">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 dark:bg-[#1a1816]/90 backdrop-blur-sm border-b border-[#8b7355]/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

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
                type: "book",
                title: book.title,
                slug: book.slug,
              }}
            />
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* COVER */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-6">

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

              <h1 className="font-serif text-3xl md:text-4xl leading-tight opacity-90">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="text-lg opacity-60 italic">
                  {book.subtitle}
                </p>
              )}

              <p className="text-sm leading-relaxed opacity-70">
                {book.excerpt}
              </p>

              {book.stats && (
                <div className="flex items-center gap-6 text-xs opacity-40 py-4 border-y border-[#8b7355]/10">
                  <span>{book.stats.views.toLocaleString("id-ID")} kali dibaca</span>
                  <span>{book.stats.downloads} kali diunduh</span>
                </div>
              )}

              <div className="p-6 rounded-lg bg-[#8b7355]/5 border-l-2 border-[#8b7355]/30">
                <p className="font-serif italic text-sm opacity-60">
                  "{book.preview}"
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">

                {book.downloadUrl && (
                  <a
                    href={book.downloadUrl}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2b2b2b] dark:bg-[#e8e0d5] text-white dark:text-[#1a1816] rounded-lg hover:opacity-90 transition-opacity text-sm tracking-wider"
                  >
                    <Download size={18} />
                    Unduh Buku
                  </a>
                )}

                <button
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-[#8b7355]/30 rounded-lg hover:bg-[#8b7355]/5 transition-colors text-sm tracking-wider opacity-80"
                >
                  <BookOpen size={18} />
                  Baca Online
                </button>

              </div>

              {book.tags && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-black/5 dark:bg-white/5 opacity-60"
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

    </main>
  )
}
