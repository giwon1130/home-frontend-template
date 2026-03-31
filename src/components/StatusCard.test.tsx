import { render, screen } from '@testing-library/react'
import { StatusCard } from './StatusCard'

describe('StatusCard', () => {
  it('renders title and description', () => {
    render(<StatusCard title="A" description="B" />)

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
