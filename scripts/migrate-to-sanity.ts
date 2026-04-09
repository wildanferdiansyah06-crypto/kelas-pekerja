import { createClient } from '@sanity/client'

import booksData from '../public/data/books.json' with { type: 'json' }
import postsData from '../public/data/posts.json' with { type: 'json' }
import quotesData from '../public/data/quotes.json' with { type: 'json' }
import configData from '../public/data/config.json' with { type: 'json' }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'frlqeeaf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function migrateBooks() {
  console.log('Migrating books...')
  const books = (booksData as any).books || []
  
  for (const book of books) {
    try {
      await client.create({
        _type: 'book',
        title: book.title,
        slug: { _type: 'slug', current: book.slug },
        subtitle: book.subtitle,
        excerpt: book.excerpt,
        preview: book.preview,
        category: book.category,
        readTime: book.readTime,
        cover: book.cover ? { _type: 'image', url: book.cover } : undefined,
        publishedAt: book.publishedAt,
        featured: book.featured,
        stats: book.stats,
        tags: book.tags,
      })
      console.log(`✓ Migrated: ${book.title}`)
    } catch (error) {
      console.error(`✗ Failed to migrate ${book.title}:`, error)
    }
  }
}

async function migratePosts() {
  console.log('Migrating posts...')
  const posts = (postsData as any).posts || []
  
  for (const post of posts) {
    try {
      await client.create({
        _type: 'post',
        slug: { _type: 'slug', current: post.slug },
        title: post.title,
        hook: post.hook,
        opening: post.opening,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
        date: post.date,
        role: post.role,
        workplace: post.workplace,
        duration: post.duration,
        isFeatured: post.isFeatured,
        content: post.content,
        impact: post.impact,
        related: post.related,
        likes: post.likes,
      })
      console.log(`✓ Migrated: ${post.title}`)
    } catch (error) {
      console.error(`✗ Failed to migrate ${post.title}:`, error)
    }
  }
}

async function migrateQuotes() {
  console.log('Migrating quotes...')
  const quotes = (quotesData as any).quotes || []
  
  for (const quote of quotes) {
    try {
      await client.create({
        _type: 'quote',
        text: quote.text,
        category: quote.category,
        mood: quote.mood,
      })
      console.log(`✓ Migrated quote: ${quote.text.substring(0, 30)}...`)
    } catch (error) {
      console.error(`✗ Failed to migrate quote:`, error)
    }
  }
}

async function migrateConfig() {
  console.log('Migrating config...')
  try {
    await client.create({
      _type: 'siteConfig',
      site: configData.site,
      author: configData.author,
      navigation: configData.navigation,
      accounts: configData.accounts,
      features: configData.features,
      seo: configData.seo,
    })
    console.log('✓ Migrated config')
  } catch (error) {
    console.error('✗ Failed to migrate config:', error)
  }
}

async function main() {
  console.log('Starting migration to Sanity...\n')
  
  await migrateBooks()
  await migratePosts()
  await migrateQuotes()
  await migrateConfig()
  
  console.log('\nMigration complete!')
}

main().catch(console.error)
