import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { to: '/', label: '🏠 Home' },
  { to: '/learn', label: '📚 Learn' },
  { to: '/mine', label: '⛏️ Mine' },
  { to: '/wallet', label: '👛 Wallet' },
  { to: '/transfer', label: '📤 Send' },
  { to: '/quiz', label: '🎯 Quiz' },
]

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand">
        <span className="navbar-logo">🪙</span>
        <span className="navbar-title">CoinBits</span>
      </div>
      <ul className="navbar-links">
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
