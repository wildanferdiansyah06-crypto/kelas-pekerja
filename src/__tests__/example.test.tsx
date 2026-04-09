import { render, screen } from '@testing-library/react'

describe('Example Test', () => {
  it('should render a test component', () => {
    const TestComponent = () => <div>Test Content</div>
    render(<TestComponent />)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
