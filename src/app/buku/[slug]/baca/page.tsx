import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBook, incrementView, getBookView } from "@/src/lib/api"
import { Book } from "@/src/types"
import BookDetailClient from "@/src/components/BookDetailClient"

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

  return <BookDetailClient book={book} />
}
