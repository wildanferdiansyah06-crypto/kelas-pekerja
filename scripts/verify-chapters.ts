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

async function verifyChapters() {
  console.log('Fetching books with chapters...\n')
  const books = await client.fetch(`*[_type == "book"]{title, slug, chapters}`)

  console.log(`Found ${books.length} books\n`)

  for (const book of books) {
    console.log(`\n📚 ${book.title}`)
    console.log(`   Slug: ${book.slug?.current}`)
    console.log(`   Chapters: ${book.chapters?.length || 0}`)
    
    if (book.chapters && book.chapters.length > 0) {
      book.chapters.forEach((chapter: any, index: number) => {
        console.log(`   ${index + 1}. ${chapter.title}`)
        console.log(`      Key: ${chapter._key}`)
        console.log(`      Content blocks: ${chapter.content?.length || 0}`)
      })
    } else {
      console.log('   ⚠️  No chapters found')
    }
  }

  console.log('\n✅ Verification complete')
}

verifyChapters().catch(console.error)
