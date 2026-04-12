import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'frlqeeaf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function addKeysToChapters() {
  console.log('Fetching existing books...')
  const books = await client.fetch(`*[_type == "book"]`)

  console.log(`Found ${books.length} books`)

  for (const book of books) {
    const slug = book.slug?.current
    if (!slug) {
      console.log(`Skipping book without slug: ${book.title}`)
      continue
    }

    if (!book.chapters || book.chapters.length === 0) {
      console.log(`Skipping ${book.title} - no chapters`)
      continue
    }

    // Check if chapters already have _key
    const hasKeys = book.chapters.every((chapter: any) => chapter._key)
    if (hasKeys) {
      console.log(`Skipping ${book.title} - chapters already have _key`)
      continue
    }

    // Add _key to each chapter
    const chaptersWithKeys = book.chapters.map((chapter: any, index: number) => ({
      ...chapter,
      _key: `chapter-${index + 1}`,
    }))

    try {
      await client.patch(book._id).set({ chapters: chaptersWithKeys }).commit()
      console.log(`✓ Added _key to chapters in: ${book.title}`)
    } catch (error) {
      console.error(`✗ Failed to add _key to ${book.title}:`, error)
    }
  }

  console.log('\nDone!')
}

addKeysToChapters().catch(console.error)
