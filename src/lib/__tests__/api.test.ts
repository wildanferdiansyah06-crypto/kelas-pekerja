import { getBooks, getBook } from '../api'

describe('API Functions', () => {
  describe('getBooks', () => {
    it('should return all books when no filters provided', async () => {
      const result = await getBooks()
      expect(result.books).toBeDefined()
      expect(Array.isArray(result.books)).toBe(true)
      expect(result.total).toBe(result.books.length)
    })

    it('should filter by category', async () => {
      const result = await getBooks({ category: 'kehidupan' })
      expect(result.books.every((book) => book.category === 'kehidupan')).toBe(true)
    })

    it('should filter by featured', async () => {
      const result = await getBooks({ featured: true })
      expect(result.books.every((book) => book.featured)).toBe(true)
    })

    it('should limit results', async () => {
      const result = await getBooks({ limit: 2 })
      expect(result.books.length).toBeLessThanOrEqual(2)
    })

    it('should search by title', async () => {
      const result = await getBooks({ search: 'kopi' })
      expect(result.books.length).toBeGreaterThan(0)
    })
  })

  describe('getBook', () => {
    it('should return a book by slug', async () => {
      const result = await getBook('seni-menyeduh-kehidupan')
      expect(result.book).toBeDefined()
      expect(result.book.slug).toBe('seni-menyeduh-kehidupan')
    })

    it('should throw error for non-existent slug', async () => {
      await expect(getBook('non-existent-slug')).rejects.toThrow('Book not found')
    })
  })
})
