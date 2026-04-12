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

async function checkDuplicates() {
  console.log('Fetching all books...\n')
  const books = await client.fetch(`*[_type == "book"]{_id, title, slug}`)

  console.log(`Found ${books.length} books\n`)

  const slugs: Record<string, any[]> = {}
  
  for (const book of books) {
    const slug = book.slug?.current
    if (slug) {
      if (!slugs[slug]) {
        slugs[slug] = []
      }
      slugs[slug].push(book)
    }
  }

  console.log('=== Checking for duplicates ===\n')
  for (const [slug, bookList] of Object.entries(slugs)) {
    if (bookList.length > 1) {
      console.log(`⚠️  Duplicate slug: "${slug}"`)
      bookList.forEach((b, i) => {
        console.log(`   ${i + 1}. ID: ${b._id}, Title: ${b.title}`)
      })
    }
  }

  console.log('\n=== Expected books ===')
  const expectedSlugs = [
    'cahaya-itu',
    'seni-menyeduh-kehidupan',
    'di-balik-bar',
    'di-atas-cangkir-yang-sama',
    'kami-menulis-pelan',
    'yang-tertinggal-di-lembah'
  ]

  for (const slug of expectedSlugs) {
    const exists = slugs[slug]
    if (exists) {
      console.log(`✓ ${slug} (${exists.length} entry)`)
    } else {
      console.log(`✗ ${slug} - MISSING`)
    }
  }

  console.log('\n=== All books ===')
  books.forEach(book => {
    console.log(`- ${book.title} (${book.slug?.current}) [ID: ${book._id}]`)
  })
}

checkDuplicates().catch(console.error)
