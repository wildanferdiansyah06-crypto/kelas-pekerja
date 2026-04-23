import { NextResponse } from 'next/server'
import { incrementView } from '@/src/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug } = body

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Valid slug is required' },
        { status: 400 }
      )
    }

    const result = await incrementView(slug)

    if (result) {
      const response = NextResponse.json({ success: true })
      // Don't cache view increment requests
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
      response.headers.set('Pragma', 'no-cache')
      return response
    } else {
      return NextResponse.json(
        { error: 'Failed to increment view' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in /api/increment-view:', error)
    return NextResponse.json(
      { error: 'Failed to increment view', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
