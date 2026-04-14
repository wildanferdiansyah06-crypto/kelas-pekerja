import { NextResponse } from 'next/server'
import { incrementView } from '@/src/lib/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug } = body

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const success = await incrementView(slug)

    if (success) {
      return NextResponse.json({ success: true })
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
