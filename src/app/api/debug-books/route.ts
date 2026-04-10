import { NextResponse } from 'next/server';
import { client } from '@/src/sanity/lib/client';
import { apiVersion, dataset, projectId } from '@/src/sanity/env';

export async function GET() {
  try {
    // Test basic connection
    const testQuery = `*[_type == "book"] | order(publishedAt desc)`;
    const books = await client.fetch(testQuery);
    
    return NextResponse.json({
      projectId,
      dataset,
      apiVersion,
      totalBooks: books.length,
      books: books.map((book: any) => ({
        id: book._id,
        title: book.title,
        slug: book.slug?.current,
        published: book.publishedAt,
        stats: book.stats,
        featured: book.featured,
      }))
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch books',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
