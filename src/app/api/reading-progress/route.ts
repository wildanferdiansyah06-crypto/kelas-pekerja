import { NextResponse } from 'next/server'
import { getOrCreateUser, updateReadingProgress } from '@/src/lib/user'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, image, bookSlug, progress } = body

    if (!email || !bookSlug || typeof progress !== 'number') {
      return NextResponse.json(
        { error: 'Email, bookSlug, and progress are required' },
        { status: 400 }
      )
    }

    const user = await getOrCreateUser(email, name, image)
    await updateReadingProgress(user._id, bookSlug, Math.round(progress))

    const response = NextResponse.json({ success: true })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  } catch (error) {
    console.error('Error in /api/reading-progress:', error)
    return NextResponse.json(
      { error: 'Failed to update reading progress', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
