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

// Sample chapters data for each book
const bookChapters: Record<string, Array<{ title: string; content: any[] }>> = {
  'seni-menyeduh-kehidupan': [
    {
      title: 'Bab 1: Awal yang Pelan',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Hidup tidak selalu dimulai dengan ledakan. Kadang, ia dimulai dengan seteguk kopi yang hangat di pagi hari.' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kita belajar bahwa tidak semua hal harus cepat. Bahkan dalam kesabaran, ada keindahan yang sering terlewatkan oleh mata yang terburu-buru.' }],
        },
      ],
    },
    {
      title: 'Bab 2: Menyeduh Makna',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Setiap proses memiliki ritmenya sendiri. Seperti menyeduh kopi, kita tidak bisa memaksa air mengalir lebih cepat dari yang seharusnya.' }],
        },
      ],
    },
  ],
  'di-balik-bar': [
    {
      title: 'Bab 1: Pelanggan Pertama',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Jam tujuh pagi, pintu pertama terbuka. Seorang pria dengan jas kusut memesan kopi hitam tanpa gula.' }],
        },
      ],
    },
    {
      title: 'Bab 2: Cerita di Uap Kopi',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Di balik bar, saya mendengar banyak cerita. Ada yang dituturkan dengan suara keras, ada yang hanya bisikan yang tertinggal di uap kopi.' }],
        },
      ],
    },
  ],
  'di-atas-cangkir-yang-sama': [
    {
      title: 'Bab 1: Konsistensi',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Konsistensi bukan tentang melakukan hal yang sama setiap hari. Tapi tentang hadir, meskipun kadang kita tidak merasa ingin hadir.' }],
        },
      ],
    },
    {
      title: 'Bab 2: Kehadiran',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Menjadi hadir adalah seni yang hilang di era di mana semua orang sibuk mengejar hal-hal yang besar.' }],
        },
      ],
    },
  ],
  'kami-menulis-pelan': [
    {
      title: 'Bab 1: Kesabaran',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kami menulis pelan. Bukan karena kami tidak bisa menulis cepat. Tapi karena kami percaya bahwa kata-kata yang diucapkan dengan lirih sering lebih kuat dari yang berteriak.' }],
        },
      ],
    },
    {
      title: 'Bab 2: Proses',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Proses tidak selalu terlihat. Kadang, ia terjadi di dalam, di tempat yang tidak bisa dilihat oleh mata lain.' }],
        },
      ],
    },
  ],
  'yang-tertinggal-di-lembah': [
    {
      title: 'Bab 1: Janji',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Janji tidak selalu tentang hal-hal besar. Kadang, janji adalah tentang tetap berada di lembah bersama seseorang ketika semua orang sudah lari menuju cahaya.' }],
        },
      ],
    },
    {
      title: 'Bab 2: Kehilangan',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kehilangan bukan akhir. Kadang, ia adalah awal dari sesuatu yang baru, sesuatu yang lebih dalam.' }],
        },
      ],
    },
  ],
  'cahaya-itu': [
    {
      title: 'Bab 1: Pelita yang Lelah',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Badan bau keringat. Dia pulang jam dua. Bukan karena lembur. Tapi karena di rumahnya, tidak ada yang menunggu.' }],
        },
      ],
    },
    {
      title: 'Bab 2: Kehancuran yang Indah',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Tentang mereka yang menjadi cahaya untuk orang lain hingga api mereka sendiri padam. Tentang kehancuran yang indah tapi salah.' }],
        },
      ],
    },
  ],
}

async function addChaptersToBooks() {
  console.log('Fetching existing books...')
  const books = await client.fetch(`*[_type == "book"]`)

  console.log(`Found ${books.length} books`)

  for (const book of books) {
    const slug = book.slug?.current
    if (!slug) {
      console.log(`Skipping book without slug: ${book.title}`)
      continue
    }

    if (book.chapters && book.chapters.length > 0) {
      console.log(`Skipping ${book.title} - already has chapters`)
      continue
    }

    const chapters = bookChapters[slug]
    if (!chapters) {
      console.log(`No chapters data for ${slug}, skipping`)
      continue
    }

    try {
      await client.patch(book._id).set({ chapters }).commit()
      console.log(`✓ Added chapters to: ${book.title}`)
    } catch (error) {
      console.error(`✗ Failed to add chapters to ${book.title}:`, error)
    }
  }

  console.log('\nDone!')
}

addChaptersToBooks().catch(console.error)
