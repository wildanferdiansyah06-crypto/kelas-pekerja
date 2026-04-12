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

async function deleteDuplicate() {
  // Delete the draft version of Di Balik Bar
  const draftId = 'drafts.ZkworHGUTPIkJvE7sqP8HP'
  
  console.log(`Deleting duplicate draft: ${draftId}`)
  
  try {
    await client.delete(draftId)
    console.log('✓ Draft deleted successfully')
  } catch (error) {
    console.error('✗ Failed to delete draft:', error)
  }

  // Verify
  console.log('\nVerifying books after deletion...')
  const books = await client.fetch(`*[_type == "book"]{_id, title, slug}`)
  console.log(`Found ${books.length} books\n`)
  
  books.forEach((book: any) => {
    console.log(`- ${book.title} (${book.slug?.current}) [ID: ${book._id}]`)
  })
}

deleteDuplicate().catch(console.error)
