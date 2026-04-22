import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Clock, BookOpen } from "lucide-react"

import { getBook, getBooks, incrementView, getBookView } from "@/src/lib/api"
import { Book } from "@/src/types"

import BookmarkButton from "@/src/components/BookmarkButton"
import ShareButtons from "@/src/components/ShareButtons"
import ReadingProgressRestore from "@/src/components/ReadingProgressRestore"

export async function generateStaticParams() {
  const { books } = await getBooks()
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

  try {
    const data = await getBook(slug)
    const book = data.book as Book

    return {
      title: `${book.title} | Kelas Pekerja`,
      description: book.excerpt,
      openGraph: {
        title: book.title,
        description: book.excerpt,
        images: [book.cover],
      },
    }
  } catch {
    return {
      title: "Buku Tidak Ditemukan | Kelas Pekerja",
    }
  }
}

export const revalidate = 3600

interface BookPageProps {
  params: Promise<{ slug: string }>
}

export default async function BookPage({ params }: BookPageProps) {

  const { slug } = await params

  let book: Book

  try {
    const data = await getBook(slug)
    book = data.book as Book

    // Increment view count in background (non-blocking)
    incrementView(slug).catch(err => console.error('Failed to increment view:', err))

    // Get real-time view count from Supabase
    const realTimeViews = await getBookView(slug)
    book.stats = {
      views: realTimeViews,
      downloads: book.stats?.downloads || 0
    }
  } catch (error) {
    console.error('Error fetching book:', error)
    notFound()
  }

  return (
    <main className="transition-colors duration-700 w-full bg-kp-bg-base text-kp-text-primary">

      <ReadingProgressRestore />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm" style={{ backgroundColor: 'rgba(250,247,242,0.94)', borderBottom: '1px solid var(--kp-border)' }}>

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            href="/buku"
            className="flex items-center gap-2 text-sm font-ui transition-colors duration-200 hover:opacity-100 text-kp-text-muted opacity-70"
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
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden" style={{ boxShadow: 'var(--kp-shadow-lg)' }}>

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

              <div className="flex flex-wrap items-center gap-3 font-ui text-xs tracking-widest uppercase" style={{ opacity: 0.4 }}>

                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    color: 'var(--kp-accent)',
                    backgroundColor: 'var(--kp-accent-faint)',
                  }}
                >
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

              <h1 className="font-display text-3xl md:text-4xl leading-tight">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="font-body text-lg italic" style={{ opacity: 0.6 }}>
                  {book.subtitle}
                </p>
              )}

              <p className="font-body text-sm leading-relaxed" style={{ opacity: 0.7 }}>
                {book.excerpt}
              </p>

              {book.stats && (
                <div className="flex items-center gap-6 text-xs font-ui py-4" style={{ opacity: 0.4, borderTop: '1px solid var(--kp-border)', borderBottom: '1px solid var(--kp-border)' }}>

                  <span>
                    {book.stats.views.toLocaleString("id-ID")} kali dibaca
                  </span>

                  <span>
                    {book.stats.downloads} kali diunduh
                  </span>

                </div>
              )}

              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--kp-bg-surface)', borderLeft: '2px solid var(--kp-accent)' }}>

                <p className="font-display italic text-sm" style={{ opacity: 0.6 }}>
                  "{book.preview}"
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">

                {book.downloadUrl && (

                  <a
                    href={book.downloadUrl}
                    className="flex items-center justify-center gap-2 px-6 py-3 font-ui text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-[var(--kp-accent)]"
                    style={{
                      backgroundColor: 'var(--kp-text-primary)',
                      color: 'var(--kp-bg-base)',
                    }}
                  >

                    <Download size={18} />
                    Unduh Buku

                  </a>

                )}

                {/* FIXED BUTTON */}
                <Link
                  href={`/buku/${book.slug}/baca`}
                  className="flex items-center justify-center gap-2 px-6 py-3 font-ui text-sm font-normal rounded-lg transition-colors duration-200 hover:opacity-100"
                  style={{
                    border: '1px solid var(--kp-border)',
                    opacity: 0.7,
                  }}
                >

                  <BookOpen size={18} />
                  Baca Online

                </Link>

              </div>

              {book.tags && (

                <div className="flex flex-wrap gap-2 pt-4">

                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-ui rounded-full"
                      style={{
                        backgroundColor: 'var(--kp-bg-surface)',
                        opacity: 0.6,
                      }}
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
