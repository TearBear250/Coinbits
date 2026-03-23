import { useState, useEffect } from 'react'
import './Wallet.css'

const INITIAL_BALANCE = 20  // starter coins for new users

function readBalance() {
  const stored = parseInt(sessionStorage.getItem('coinbits_balance'), 10)
  return INITIAL_BALANCE + (isNaN(stored) ? 0 : stored)
}

function readTransactions() {
  const txRaw = sessionStorage.getItem('coinbits_transactions')
  if (txRaw) {
    try { return JSON.parse(txRaw) } catch { /* ignore */ }
  }
  return []
}

export default function Wallet() {
  const [balance, setBalance] = useState(readBalance)
  const [transactions, setTransactions] = useState(readTransactions)

  // Also listen for storage changes (e.g. after mining or transfer)
  useEffect(() => {
    const onStorage = () => {
      setBalance(readBalance())
      setTransactions(readTransactions())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const coins = [
    { symbol: '₿', name: 'CoinBits (CB)', amount: balance, color: '#f9a825' },
    { symbol: 'Ξ', name: 'EtherKids (EK)', amount: 0, color: '#627eea' },
    { symbol: '✦', name: 'LiteCoin Jr (LCJ)', amount: 0, color: '#b2b2b2' },
  ]

  return (
    <div className="wallet-page">
      <div className="wallet-header">
        <h1>👛 My Wallet</h1>
        <p>Here are all your CoinBits! Mine or receive more to grow your balance.</p>
      </div>

      <div className="wallet-balance-card">
        <div className="balance-main">
          <span className="balance-icon" aria-hidden="true">🪙</span>
          <div>
            <div className="balance-amount">{balance.toLocaleString()} CB</div>
            <div className="balance-label">Total CoinBits Balance</div>
          </div>
        </div>
        <div className="balance-badge">
          {balance >= 50 ? '🥇 Gold Wallet' : balance >= 20 ? '🥈 Silver Wallet' : '🥉 Starter'}
        </div>
      </div>

      <section className="wallet-coins-section">
        <h2>My Coins</h2>
        <div className="coins-grid">
          {coins.map(({ symbol, name, amount, color }) => (
            <div key={name} className="coin-row" style={{ '--coin-color': color }}>
              <div className="coin-symbol" aria-hidden="true">{symbol}</div>
              <div className="coin-info">
                <div className="coin-name">{name}</div>
                <div className="coin-amount">{amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wallet-tx-section">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <div className="tx-empty">
            <span>📭</span>
            <p>No transactions yet. Go mine some CoinBits or send coins to a friend!</p>
          </div>
        ) : (
          <ul className="tx-list">
            {transactions.map((tx) => (
              <li key={tx.id} className={`tx-item ${tx.type}`}>
                <span className="tx-icon" aria-hidden="true">
                  {tx.type === 'mine' ? '⛏️' : tx.type === 'send' ? '📤' : '📥'}
                </span>
                <div className="tx-info">
                  <div className="tx-desc">{tx.description}</div>
                  <div className="tx-date">{tx.date}</div>
                </div>
                <div className={`tx-amount ${tx.type === 'send' ? 'negative' : 'positive'}`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} CB
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="wallet-tips">
        <h2>💡 Wallet Tips</h2>
        <ul className="tip-list">
          <li>⛏️ Go to <strong>Mine</strong> to earn more CoinBits</li>
          <li>📤 Use <strong>Send &amp; Receive</strong> to transfer coins to friends</li>
          <li>🔒 Never share your wallet password with anyone</li>
          <li>💾 Real crypto wallets have a <strong>seed phrase</strong> — keep it secret!</li>
        </ul>
      </section>
    </div>
  )
}
