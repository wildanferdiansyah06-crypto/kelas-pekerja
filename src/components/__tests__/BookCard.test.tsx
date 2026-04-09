import { render, screen } from '@testing-library/react'
import BookCard from '../BookCard'
import { Book } from '@/src/types'

const mockBook: Book = {
  id: '1',
  slug: 'test-book',
  title: 'Test Book',
  subtitle: 'Test Subtitle',
  excerpt: 'Test excerpt',
  preview: 'Test preview content',
  category: 'kehidupan',
  readTime: '10 menit',
  cover: 'https://example.com/cover.jpg',
  publishedAt: '2024-01-01',
  featured: false,
  stats: { views: 100, downloads: 10 },
  tags: ['test', 'tag'],
  pages: 50,
}

describe('BookCard', () => {
  it('should render book title', () => {
    render(<BookCard book={mockBook} />)
    expect(screen.getByText('Test Book')).toBeInTheDocument()
  })

  it('should render book subtitle', () => {
    render(<BookCard book={mockBook} />)
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('should render preview text', () => {
    render(<BookCard book={mockBook} />)
    expect(screen.getByText(/Test preview content/)).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<BookCard book={mockBook} onClick={handleClick} />)
    const card = screen.getByText('Test Book').closest('article')
    card?.click()
    expect(handleClick).toHaveBeenCalled()
  })
})
