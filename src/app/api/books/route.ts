import { NextResponse } from 'next/server'
import { fetchBooks, getAllBookViews } from '@/src/lib/java-api'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const featured = searchParams.get('featured') === 'true'
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const result = await fetchBooks({
      category: category === 'all' ? undefined : category,
      search,
      featured,
      limit,
    })

    // Get real-time view counts from Java backend
    const viewCounts = await getAllBookViews()

    // Use Java backend views for all books
    const booksWithViews = result.books.map((book: any) => {
      const javaViews = viewCounts[book.slug] || 0
      return {
        ...book,
        stats: {
          views: javaViews,
          downloads: book.stats?.downloads || 0
        }
      }
    })

    const response = NextResponse.json({
      books: booksWithViews,
      total: result.total
    })

    // Cache for 5 minutes (300 seconds) with revalidation
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

    return response
  } catch (error) {
    console.error('Error in /api/books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
