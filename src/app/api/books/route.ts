import { NextResponse } from 'next/server'
import { getBooks, getAllBookViews } from '@/src/lib/api'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const featured = searchParams.get('featured') === 'true'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const result = await getBooks({
      category: category === 'all' ? undefined : category,
      search,
      featured,
      limit,
    })

    // Get real-time view counts from Supabase
    const viewCounts = await getAllBookViews()

    // Merge view counts with books
    const booksWithViews = result.books.map(book => ({
      ...book,
      stats: {
        ...book.stats,
        views: viewCounts[book.slug] || book.stats?.views || 0
      }
    }))

    return NextResponse.json({
      books: booksWithViews,
      total: result.total
    })
  } catch (error) {
    console.error('Error in /api/books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
