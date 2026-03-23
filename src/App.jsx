import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Mine from './pages/Mine'
import Wallet from './pages/Wallet'
import Transfer from './pages/Transfer'
import Quiz from './pages/Quiz'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
