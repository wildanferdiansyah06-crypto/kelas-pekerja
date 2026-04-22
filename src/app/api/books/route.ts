import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const JAVA_API_URL = process.env.NEXT_PUBLIC_JAVA_API_URL || 'http://localhost:8080';

    const response = await fetch(`${JAVA_API_URL}/books`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Java API error:', response.status, errorText);
      throw new Error(`Java API returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    const nextResponse = NextResponse.json({
      books: result.books || [],
      total: result.total || 0
    })

    nextResponse.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

    return nextResponse
  } catch (error) {
    console.error('Error in /api/books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
