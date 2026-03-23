import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Quiz from '../pages/Quiz'

describe('Quiz page', () => {
  it('renders the quiz heading', () => {
    render(<Quiz />)
    expect(screen.getByText(/Crypto Quiz/i)).toBeInTheDocument()
  })

  it('shows the first question', () => {
    render(<Quiz />)
    expect(screen.getByText(/What is cryptocurrency/i)).toBeInTheDocument()
  })

  it('shows 4 answer options', () => {
    render(<Quiz />)
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(4)
  })

  it('marks correct answer green when user clicks the right option', () => {
    render(<Quiz />)
    // First question correct answer index is 1
    const options = screen.getAllByRole('button')
    // Find option B (index 1): "A type of digital money..."
    fireEvent.click(options[1])
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument()
  })

  it('marks wrong answer and shows correct one', () => {
    render(<Quiz />)
    const options = screen.getAllByRole('button')
    // Click first option (wrong)
    fireEvent.click(options[0])
    expect(screen.getByText(/Not quite/i)).toBeInTheDocument()
  })

  it('shows Next Question button after answering', () => {
    render(<Quiz />)
    const options = screen.getAllByRole('button')
    fireEvent.click(options[0])
    expect(screen.getByText(/Next Question/i)).toBeInTheDocument()
  })

  it('shows results after answering all questions', () => {
    render(<Quiz />)
    // Answer all 8 questions (always picking option A = index 0)
    for (let q = 0; q < 8; q++) {
      const options = screen.getAllByRole('button')
      fireEvent.click(options[0])
      // click next
      const nextBtn = screen.queryByText(/Next Question|See Results/i)
      if (nextBtn) fireEvent.click(nextBtn)
    }
    expect(screen.getByText(/Quiz Complete/i)).toBeInTheDocument()
  })

  it('shows Try Again button on result screen', () => {
    render(<Quiz />)
    for (let q = 0; q < 8; q++) {
      const options = screen.getAllByRole('button')
      fireEvent.click(options[0])
      const nextBtn = screen.queryByText(/Next Question|See Results/i)
      if (nextBtn) fireEvent.click(nextBtn)
    }
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument()
  })
})
