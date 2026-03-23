import { useState } from 'react'
import './Quiz.css'

const questions = [
  {
    id: 1,
    question: 'What is cryptocurrency?',
    options: [
      'Coins you find in a video game',
      'A type of digital money that uses secret codes to stay secure',
      'Money that only banks can use',
      'A special type of paper money',
    ],
    correct: 1,
    explanation:
      'Cryptocurrency is digital money secured by cryptography (secret math codes). It exists on the internet!',
  },
  {
    id: 2,
    question: 'Who created Bitcoin?',
    options: [
      'Bill Gates',
      'Elon Musk',
      'Satoshi Nakamoto',
      'Mark Zuckerberg',
    ],
    correct: 2,
    explanation:
      'Bitcoin was created in 2009 by a mysterious person (or group) called Satoshi Nakamoto. Their real identity is still unknown!',
  },
  {
    id: 3,
    question: 'What is the maximum number of Bitcoins that can ever exist?',
    options: ['1 billion', '100 million', '21 million', 'Unlimited'],
    correct: 2,
    explanation:
      'Only 21 million Bitcoins can ever be created. This limited supply is one reason Bitcoin is considered valuable!',
  },
  {
    id: 4,
    question: 'What is a blockchain?',
    options: [
      'A heavy metal chain used to lock computers',
      'A type of computer game',
      'A record of all cryptocurrency transactions',
      'A bank account number',
    ],
    correct: 2,
    explanation:
      'A blockchain is like a public notebook that records every transaction ever made. Once written, it cannot be changed!',
  },
  {
    id: 5,
    question: 'What do crypto miners do?',
    options: [
      'Dig for physical coins underground',
      'Solve math puzzles to add new blocks to the blockchain',
      'Print new cryptocurrency',
      'Work at a bank',
    ],
    correct: 1,
    explanation:
      'Miners use powerful computers to solve hard math puzzles. The winner gets to add the next block and earns a crypto reward!',
  },
  {
    id: 6,
    question: 'What should you NEVER share with anyone?',
    options: [
      'Your public wallet address',
      'Your favorite cryptocurrency',
      'Your private key',
      'How many coins you own',
    ],
    correct: 2,
    explanation:
      'Your private key is like the password to your crypto vault. NEVER share it — anyone with your private key can take all your coins!',
  },
  {
    id: 7,
    question: 'What is a tiny piece of Bitcoin called?',
    options: ['BitBit', 'Satoshi', 'MicroCoin', 'BitCrumb'],
    correct: 1,
    explanation:
      "A Satoshi is the smallest unit of Bitcoin (0.00000001 BTC). It is named after Bitcoin's creator, Satoshi Nakamoto!",
  },
  {
    id: 8,
    question: 'Which of these is a safety rule for using cryptocurrency?',
    options: [
      'Share your private key with your best friend',
      'Buy as much crypto as possible',
      'Always ask a parent or guardian before making real transactions',
      'Use your birthday as your wallet password',
    ],
    correct: 2,
    explanation:
      'Always involve a trusted adult before making any real crypto transactions. Safety first!',
  },
]

function StarRating({ score, total }) {
  const pct = score / total
  let stars = 1
  if (pct >= 0.9) stars = 5
  else if (pct >= 0.7) stars = 4
  else if (pct >= 0.5) stars = 3
  else if (pct >= 0.3) stars = 2
  return (
    <div className="star-rating" aria-label={`${stars} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < stars ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  )
}

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const q = questions[current]
  const isAnswered = selected !== null

  const handleSelect = (idx) => {
    if (isAnswered) return
    setSelected(idx)
  }

  const handleNext = () => {
    const newAnswers = [...answers, { questionId: q.id, selected, correct: q.correct }]
    setAnswers(newAnswers)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  const score = answers.filter((a) => a.selected === a.correct).length

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="result-icon" aria-hidden="true">
            {score === questions.length ? '🏆' : score >= questions.length * 0.7 ? '🌟' : '📚'}
          </div>
          <h1>Quiz Complete!</h1>
          <p className="result-score">
            You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct!
          </p>
          <StarRating score={score} total={questions.length} />
          <p className="result-message">
            {score === questions.length
              ? 'Amazing! You got everything right! You are a crypto genius! 🎉'
              : score >= Math.ceil(questions.length * 0.7)
              ? 'Great job! You know a lot about crypto! Keep learning! 💪'
              : 'Good try! Go back to the Learn section to review, then try again! 📚'}
          </p>

          <div className="result-breakdown">
            <h2>Review Your Answers</h2>
            {questions.map((q, i) => {
              const a = answers[i]
              const correct = a.selected === a.correct
              return (
                <div key={q.id} className={`breakdown-item ${correct ? 'correct' : 'wrong'}`}>
                  <div className="breakdown-q">
                    <span>{correct ? '✅' : '❌'}</span>
                    <strong>Q{i + 1}: {q.question}</strong>
                  </div>
                  {!correct && (
                    <div className="breakdown-answer">
                      Your answer: <em>{q.options[a.selected]}</em><br />
                      Correct answer: <strong>{q.options[a.correct]}</strong>
                    </div>
                  )}
                  <div className="breakdown-explain">{q.explanation}</div>
                </div>
              )
            })}
          </div>

          <button className="quiz-restart-btn" onClick={handleRestart}>
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>🎯 Crypto Quiz</h1>
        <p>Test your knowledge about Bitcoin and cryptocurrency!</p>
      </div>

      <div className="quiz-progress-wrap">
        <div className="quiz-progress-label">
          <span>Question {current + 1} of {questions.length}</span>
          <span>Score: {answers.filter((a) => a.selected === a.correct).length}</span>
        </div>
        <div
          className="quiz-progress-bar"
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin="1"
          aria-valuemax={questions.length}
        >
          <div
            className="quiz-progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-question">
          <span className="q-number">Q{current + 1}</span>
          <p>{q.question}</p>
        </div>

        <div className="quiz-options">
          {q.options.map((opt, idx) => {
            let cls = 'quiz-option'
            if (isAnswered) {
              if (idx === q.correct) cls += ' correct'
              else if (idx === selected) cls += ' wrong'
            } else if (idx === selected) {
              cls += ' selected'
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                aria-pressed={selected === idx}
              >
                <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={`quiz-feedback ${selected === q.correct ? 'correct' : 'wrong'}`} aria-live="polite">
            <strong>{selected === q.correct ? '✅ Correct!' : '❌ Not quite!'}</strong>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          {isAnswered && (
            <button className="quiz-next-btn" onClick={handleNext}>
              {current + 1 < questions.length ? 'Next Question →' : 'See Results 🏆'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
