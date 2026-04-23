import { NextResponse } from 'next/server'
import { getBooks } from '@/src/lib/api'

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

    const response = NextResponse.json({
      books: result.books,
      total: result.total
    })

    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

    return response
  } catch (error) {
    console.error('Error in /api/books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
