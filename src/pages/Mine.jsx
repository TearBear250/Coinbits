import { useState, useEffect, useCallback } from 'react'
import './Mine.css'

const BLOCK_SIZE = 10       // clicks needed to complete a block
const REWARD_PER_BLOCK = 5  // CoinBits earned per block

export default function Mine() {
  const [clicks, setClicks] = useState(0)
  const [blocksFound, setBlocksFound] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)
  const [lastReward, setLastReward] = useState(null)
  const [isMining, setIsMining] = useState(false)

  const progress = clicks % BLOCK_SIZE
  const progressPct = Math.round((progress / BLOCK_SIZE) * 100)

  const handleMine = useCallback(() => {
    setIsMining(true)
    setClicks((prev) => {
      const newClicks = prev + 1
      if (newClicks % BLOCK_SIZE === 0) {
        setBlocksFound((b) => b + 1)
        setTotalEarned((t) => t + REWARD_PER_BLOCK)
        setLastReward(REWARD_PER_BLOCK)
        // Store earned coins in sessionStorage so Wallet can read them
        const stored = parseInt(sessionStorage.getItem('coinbits_balance') || '0', 10)
        sessionStorage.setItem('coinbits_balance', String(stored + REWARD_PER_BLOCK))
        const txList = JSON.parse(sessionStorage.getItem('coinbits_transactions') || '[]')
        txList.unshift({
          id: Date.now(),
          type: 'mine',
          amount: REWARD_PER_BLOCK,
          description: `Mined block #${Math.floor(newClicks / BLOCK_SIZE)}`,
          date: new Date().toLocaleString(),
        })
        sessionStorage.setItem('coinbits_transactions', JSON.stringify(txList))
      }
      return newClicks
    })
    setTimeout(() => setIsMining(false), 150)
    setTimeout(() => setLastReward(null), 2000)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        handleMine()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleMine])

  return (
    <div className="mine-page">
      <div className="mine-header">
        <h1>⛏️ Mine CoinBits</h1>
        <p>
          Click the <strong>Mine!</strong> button to solve a puzzle and earn CoinBits!
          <br />
          <small>You can also press <kbd>Space</kbd> or <kbd>Enter</kbd>.</small>
        </p>
      </div>

      <div className="mine-layout">
        <div className="mine-main">
          <div className="mine-rig">
            <div className={`rig-screen ${isMining ? 'active' : ''}`} aria-hidden="true">
              <div className="rig-dots">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className="rig-dot"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="rig-label">⛏️ Mining Rig</span>
            </div>
          </div>

          <div className="mine-progress-wrap">
            <div className="mine-progress-label">
              <span>Block Progress</span>
              <span>{progress} / {BLOCK_SIZE} clicks ({progressPct}%)</span>
            </div>
            <div
              className="mine-progress-bar"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="mine-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {lastReward && (
            <div className="mine-reward-popup" role="alert" aria-live="polite">
              🎉 Block solved! +{lastReward} CoinBits!
            </div>
          )}

          <button
            className={`mine-btn ${isMining ? 'mining' : ''}`}
            onClick={handleMine}
            aria-label="Mine CoinBits"
          >
            ⛏️ Mine!
          </button>
        </div>

        <div className="mine-stats">
          <div className="stat-card">
            <span className="stat-icon">🖱️</span>
            <div>
              <div className="stat-value">{clicks.toLocaleString()}</div>
              <div className="stat-label">Total Clicks</div>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div>
              <div className="stat-value">{blocksFound}</div>
              <div className="stat-label">Blocks Found</div>
            </div>
          </div>
          <div className="stat-card highlight">
            <span className="stat-icon">🪙</span>
            <div>
              <div className="stat-value">{totalEarned}</div>
              <div className="stat-label">CoinBits Earned</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mine-info">
        <h2>How does real mining work?</h2>
        <p>
          In the real world, Bitcoin miners use powerful computers to solve incredibly hard math
          puzzles. The first miner to solve the puzzle gets to add the next block to the blockchain
          and wins a <strong>Bitcoin reward</strong>. The more computing power you have, the better
          your chances!
        </p>
        <p>
          In CoinBits, each click represents your computer doing some work. Every{' '}
          <strong>{BLOCK_SIZE} clicks</strong> completes a block and earns you{' '}
          <strong>{REWARD_PER_BLOCK} CoinBits</strong>!
        </p>
      </div>
    </div>
  )
}
