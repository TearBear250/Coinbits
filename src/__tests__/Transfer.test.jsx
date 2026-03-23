import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import Transfer from '../pages/Transfer'

describe('Transfer page', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('renders the send heading', () => {
    render(<Transfer />)
    expect(screen.getByText(/Send & Receive/i)).toBeInTheDocument()
  })

  it('renders the friend selection buttons', () => {
    render(<Transfer />)
    expect(screen.getByText('Alex')).toBeInTheDocument()
    expect(screen.getByText('Jamie')).toBeInTheDocument()
    expect(screen.getByText('Sam')).toBeInTheDocument()
    expect(screen.getByText('Morgan')).toBeInTheDocument()
  })

  it('shows error if no recipient is selected', () => {
    render(<Transfer />)
    const sendBtn = screen.getByText(/Send Now/i)
    fireEvent.click(sendBtn)
    expect(screen.getByRole('alert')).toHaveTextContent(/choose who to send to/i)
  })

  it('shows error if amount is 0', () => {
    render(<Transfer />)
    fireEvent.click(screen.getByText('Alex'))
    const amountInput = screen.getByLabelText(/Amount/i)
    fireEvent.change(amountInput, { target: { value: '0' } })
    fireEvent.click(screen.getByText(/Send Now/i))
    expect(screen.getByText(/valid amount/i)).toBeInTheDocument()
  })

  it('shows success message after a valid send', () => {
    render(<Transfer />)
    fireEvent.click(screen.getByText('Alex'))
    const amountInput = screen.getByLabelText(/Amount/i)
    fireEvent.change(amountInput, { target: { value: '5' } })
    fireEvent.click(screen.getByText(/Send Now/i))
    expect(screen.getByText(/You sent 5 CoinBits/i)).toBeInTheDocument()
  })

  it('shows error if sending more than balance', () => {
    render(<Transfer />)
    fireEvent.click(screen.getByText('Alex'))
    const amountInput = screen.getByLabelText(/Amount/i)
    fireEvent.change(amountInput, { target: { value: '9999' } })
    fireEvent.click(screen.getByText(/Send Now/i))
    expect(screen.getByText(/don't have enough/i)).toBeInTheDocument()
  })
})
