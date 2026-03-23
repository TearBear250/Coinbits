import { Link } from 'react-router-dom'
import './Home.css'

const modules = [
  {
    to: '/learn',
    icon: '📚',
    title: 'Learn About Crypto',
    desc: 'Discover what Bitcoin and other cryptocurrencies are!',
    color: '#29b6f6',
  },
  {
    to: '/mine',
    icon: '⛏️',
    title: 'Mine Coins',
    desc: 'Tap to mine your very own CoinBits!',
    color: '#f9a825',
  },
  {
    to: '/wallet',
    icon: '👛',
    title: 'My Wallet',
    desc: 'Check your balance and see your coins.',
    color: '#66bb6a',
  },
  {
    to: '/transfer',
    icon: '📤',
    title: 'Send & Receive',
    desc: 'Send CoinBits to your friends safely.',
    color: '#ab47bc',
  },
  {
    to: '/quiz',
    icon: '🎯',
    title: 'Take the Quiz',
    desc: 'Test what you have learned and earn stars!',
    color: '#ef5350',
  },
]

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-coins" aria-hidden="true">
          <span className="hero-coin coin-1">₿</span>
          <span className="hero-coin coin-2">Ξ</span>
          <span className="hero-coin coin-3">₿</span>
        </div>
        <h1 className="hero-title">Welcome to CoinBits! 🪙</h1>
        <p className="hero-subtitle">
          The fun way for kids to learn about Bitcoin and cryptocurrency!
        </p>
        <Link to="/learn" className="hero-cta">
          Start Learning 🚀
        </Link>
      </section>

      <section className="home-modules" aria-label="Learning modules">
        <h2 className="modules-heading">What do you want to do today?</h2>
        <div className="module-grid">
          {modules.map(({ to, icon, title, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="module-card"
              style={{ '--card-accent': color }}
            >
              <span className="module-icon" aria-hidden="true">{icon}</span>
              <h3 className="module-title">{title}</h3>
              <p className="module-desc">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-info">
        <div className="info-card">
          <span className="info-icon">🔒</span>
          <div>
            <h3>Safe &amp; Educational</h3>
            <p>No real money — everything here is for learning only!</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">🌟</span>
          <div>
            <h3>Earn Stars</h3>
            <p>Complete quizzes and mining to earn stars on your profile!</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">👨‍👩‍👧</span>
          <div>
            <h3>Parent Approved</h3>
            <p>Built for kids aged 6–14, with safe and simple explanations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
