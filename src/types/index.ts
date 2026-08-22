export interface Book {
  id: string
  slug: string
  title: string
  titleEn?: string
  subtitle?: string
  subtitleEn?: string
  excerpt: string
  excerptEn?: string
  content?: string
  contentEn?: string
  preview: string
  previewEn?: string
  description?: string
  descriptionEn?: string
  author?: string

  category:
    | "kehidupan"
    | "cerita"
    | "renungan"
    | "proses"
    | "kopi"
    | "pekerja"
    | "filosofi"
    | "refleksi"
    | "catatan-malam"

  pages: number
  readTime: string
  readTimeEn?: string
  cover: string

  downloadUrl?: string

  publishedAt: string
  featured: boolean

  stats?: {
    views: number
    downloads: number
  }

  tags?: string[]
  tagsEn?: string[]
  chapters?: Chapter[]
  chaptersEn?: Chapter[]
  audioSrc?: string
}

export interface Chapter {
  title: string
  titleEn?: string
  content: any[]
  contentEn?: any[]
}

export interface Post {
  id: string
  slug: string
  title: string
  titleEn?: string
  content: string
  contentEn?: string
  excerpt: string
  excerptEn?: string

  category?: string
  tags?: string[]

  publishedAt: string
  readingTime?: number
  featured?: boolean

  cover?: string
}

export interface Quote {
  id: number
  text: string
  textEn?: string

  category:
    | "kopi"
    | "malam"
    | "pekerja"
    | "cinta"
    | "hidup"
    | "refleksi"

  mood:
    | "melancholic"
    | "hopeful"
    | "peaceful"
    | "energetic"
}

export interface Author {
  name: string
  bio: string
  bioEn?: string
  photo?: string

  roles: {
    past: string[]
    current: string
  }

  social: {
    whatsapp?: string
    instagram?: string
    email?: string
    twitter?: string
  }

  manifesto: string
  manifestoEn?: string
}

export interface BankAccount {
  bank: string
  number: string
  holder: string
  logo?: string
}

export interface SiteConfig {
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  tagline: string
  taglineEn?: string

  author: Author
  accounts?: BankAccount[]

  navigation: {
    label: string
    href: string
  }[]
}

