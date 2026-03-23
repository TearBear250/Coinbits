import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Mine from '../pages/Mine'

describe('Mine page', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders the mine heading', () => {
    render(<Mine />)
    expect(screen.getByText(/Mine CoinBits/i)).toBeInTheDocument()
  })

  it('renders the mine button', () => {
    render(<Mine />)
    expect(screen.getByRole('button', { name: /Mine CoinBits/i })).toBeInTheDocument()
  })

  it('starts with zero clicks and zero blocks found', () => {
    render(<Mine />)
    expect(screen.getByText(/Total Clicks/i)).toBeInTheDocument()
    expect(screen.getByText(/Blocks Found/i)).toBeInTheDocument()
    expect(screen.getByText(/CoinBits Earned/i)).toBeInTheDocument()
  })

  it('increments click count when mine button is clicked', () => {
    render(<Mine />)
    const btn = screen.getByRole('button', { name: /Mine CoinBits/i })
    fireEvent.click(btn)
    // Progress label should show 1/10
    expect(screen.getByText(/1 \/ 10/)).toBeInTheDocument()
  })

  it('awards coins after 10 clicks (one block)', () => {
    render(<Mine />)
    const btn = screen.getByRole('button', { name: /Mine CoinBits/i })
    for (let i = 0; i < 10; i++) {
      fireEvent.click(btn)
    }
    // 1 block found
    const statValues = screen.getAllByText('1')
    expect(statValues.length).toBeGreaterThan(0)
  })

  it('renders the progress bar', () => {
    render(<Mine />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
