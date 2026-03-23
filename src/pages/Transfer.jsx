import { useState } from 'react'
import './Transfer.css'

const INITIAL_BALANCE = 20

const friends = [
  { id: 'alex', name: 'Alex', avatar: '🧑' },
  { id: 'jamie', name: 'Jamie', avatar: '👧' },
  { id: 'sam', name: 'Sam', avatar: '👦' },
  { id: 'morgan', name: 'Morgan', avatar: '🧒' },
]

function getBalance() {
  const stored = parseInt(sessionStorage.getItem('coinbits_balance'), 10)
  return INITIAL_BALANCE + (isNaN(stored) ? 0 : stored)
}

function saveTransaction(tx) {
  const txList = JSON.parse(sessionStorage.getItem('coinbits_transactions') || '[]')
  txList.unshift(tx)
  sessionStorage.setItem('coinbits_transactions', JSON.stringify(txList))
}

export default function Transfer() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)   // null | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('')
  const [balance, setBalance] = useState(getBalance)
  const [history, setHistory] = useState([])

  const handleSend = (e) => {
    e.preventDefault()
    const amt = parseInt(amount, 10)
    if (!recipient) {
      setStatus('error')
      setStatusMsg('Please choose who to send to!')
      return
    }
    if (isNaN(amt) || amt <= 0) {
      setStatus('error')
      setStatusMsg('Please enter a valid amount greater than 0.')
      return
    }
    if (amt > balance) {
      setStatus('error')
      setStatusMsg(`You don't have enough CoinBits! Your balance is ${balance} CB.`)
      return
    }

    // Deduct from balance
    const newBalance = balance - amt
    const stored = parseInt(sessionStorage.getItem('coinbits_balance'), 10) || 0
    sessionStorage.setItem('coinbits_balance', String(stored - amt))
    setBalance(newBalance)

    const friend = friends.find((f) => f.id === recipient)
    const tx = {
      id: Date.now(),
      type: 'send',
      amount: amt,
      description: `Sent to ${friend.name}${message ? `: "${message}"` : ''}`,
      date: new Date().toLocaleString(),
    }
    saveTransaction(tx)
    setHistory((h) => [tx, ...h])

    setStatus('success')
    setStatusMsg(`🎉 You sent ${amt} CoinBits to ${friend.avatar} ${friend.name}!`)
    setAmount('')
    setMessage('')
    setRecipient('')
  }

  return (
    <div className="transfer-page">
      <div className="transfer-header">
        <h1>📤 Send &amp; Receive</h1>
        <p>Send CoinBits to your friends! This is how crypto payments work.</p>
      </div>

      <div className="transfer-layout">
        <section className="transfer-form-card">
          <h2>Send CoinBits</h2>
          <div className="transfer-balance">
            Your balance: <strong>{balance} CB</strong>
          </div>

          {status && (
            <div
              className={`transfer-status ${status}`}
              role="alert"
              aria-live="polite"
            >
              {statusMsg}
            </div>
          )}

          <form onSubmit={handleSend} noValidate>
            <div className="form-group">
              <label htmlFor="recipient">Send to:</label>
              <div className="friend-grid">
                {friends.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`friend-btn ${recipient === f.id ? 'selected' : ''}`}
                    onClick={() => setRecipient(f.id)}
                  >
                    <span className="friend-avatar">{f.avatar}</span>
                    <span className="friend-name">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (CB):</label>
              <input
                id="amount"
                type="number"
                min="1"
                max={balance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message (optional):</label>
              <input
                id="message"
                type="text"
                maxLength={60}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy birthday! 🎂"
                className="form-input"
              />
            </div>

            <button type="submit" className="send-btn">
              📤 Send Now
            </button>
          </form>
        </section>

        <section className="transfer-info-card">
          <h2>How does sending crypto work?</h2>
          <ol className="transfer-steps">
            <li>
              <span className="step-num">1</span>
              <span>You choose who to send to using their <strong>wallet address</strong></span>
            </li>
            <li>
              <span className="step-num">2</span>
              <span>You enter how much crypto to send</span>
            </li>
            <li>
              <span className="step-num">3</span>
              <span>The transaction is broadcast to the <strong>blockchain</strong></span>
            </li>
            <li>
              <span className="step-num">4</span>
              <span>Miners verify the transaction — it is confirmed!</span>
            </li>
          </ol>
          <div className="transfer-note">
            <span>⚠️</span>
            <p>In real crypto, transactions cannot be undone — always double-check before sending!</p>
          </div>

          {history.length > 0 && (
            <div className="sent-history">
              <h3>Sent This Session</h3>
              <ul>
                {history.map((tx) => (
                  <li key={tx.id}>
                    <span>📤</span>
                    <span>{tx.description}</span>
                    <strong>-{tx.amount} CB</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
