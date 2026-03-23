import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

describe('Home page', () => {
  const renderHome = () =>
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

  it('renders the welcome heading', () => {
    renderHome()
    expect(screen.getByText(/Welcome to CoinBits/i)).toBeInTheDocument()
  })

  it('renders all five module cards', () => {
    renderHome()
    expect(screen.getByText(/Learn About Crypto/i)).toBeInTheDocument()
    expect(screen.getByText(/Mine Coins/i)).toBeInTheDocument()
    expect(screen.getByText(/My Wallet/i)).toBeInTheDocument()
    expect(screen.getByText(/Send & Receive/i)).toBeInTheDocument()
    expect(screen.getByText(/Take the Quiz/i)).toBeInTheDocument()
  })

  it('renders the Start Learning CTA', () => {
    renderHome()
    expect(screen.getByText(/Start Learning/i)).toBeInTheDocument()
  })

  it('renders the safety info section', () => {
    renderHome()
    expect(screen.getByText(/Safe.*Educational/i)).toBeInTheDocument()
    expect(screen.getByText(/Parent Approved/i)).toBeInTheDocument()
  })
})
