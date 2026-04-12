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

async function checkCahayaItu() {
  console.log('Fetching Cahaya Itu book...')
  const book = await client.fetch(`*[_type == "book" && slug.current == "cahaya-itu"][0]`)

  if (!book) {
    console.log('Book not found')
    return
  }

  console.log('Book:', book.title)
  console.log('Chapters:', JSON.stringify(book.chapters, null, 2))
}

checkCahayaItu().catch(console.error)
