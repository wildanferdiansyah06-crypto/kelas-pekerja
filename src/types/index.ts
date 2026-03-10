export interface Book {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content?: string
  preview: string

  category:
    | "kehidupan"
    | "cerita"
    | "renungan"
    | "proses"
    | "kopi"
    | "pekerja"
    | "filosofi"
    | "catatan-malam"

  pages: number
  readTime: string
  cover: string

  downloadUrl?: string

  publishedAt: string
  featured: boolean

  stats?: {
    views: number
    downloads: number
  }

  tags?: string[]
}

export interface Post {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string

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
}

export interface BankAccount {
  bank: string
  number: string
  holder: string
  logo?: string
}

export interface SiteConfig {
  title: string
  description: string
  tagline: string

  author: Author
  accounts?: BankAccount[]

  navigation: {
    label: string
    href: string
  }[]
}
