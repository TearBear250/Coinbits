import { useState } from 'react'
import './Learn.css'

const topics = [
  {
    id: 'what',
    icon: '❓',
    title: 'What is Crypto?',
    content: (
      <>
        <p>
          <strong>Cryptocurrency</strong> (say it: <em>krip-toe-curr-en-see</em>) is a special kind
          of digital money that lives on the internet. Unlike the coins and bills in your piggy bank,
          you cannot hold cryptocurrency in your hands — but it is just as real!
        </p>
        <div className="learn-fact">
          <span>💡</span>
          <span>
            The word <strong>&quot;crypto&quot;</strong> comes from the Greek word for &quot;hidden&quot;.
            Cryptocurrency uses secret math codes called <strong>cryptography</strong> to keep your
            money safe.
          </span>
        </div>
        <p>
          There are thousands of different cryptocurrencies. The most famous ones are{' '}
          <strong>Bitcoin (₿)</strong> and <strong>Ethereum (Ξ)</strong>.
        </p>
        <h3>Why is it special?</h3>
        <ul className="learn-list">
          <li>🌍 You can send it to anyone in the world instantly</li>
          <li>🏦 No bank is needed — you are your own bank!</li>
          <li>🔒 It is very secure because of powerful math</li>
          <li>📜 Every transaction is recorded on a public list called the <strong>blockchain</strong></li>
        </ul>
      </>
    ),
  },
  {
    id: 'bitcoin',
    icon: '₿',
    title: 'Bitcoin Basics',
    content: (
      <>
        <p>
          <strong>Bitcoin</strong> was created in 2009 by a mysterious person (or group) known as{' '}
          <strong>Satoshi Nakamoto</strong>. Nobody knows who this person really is!
        </p>
        <div className="learn-fact">
          <span>🎂</span>
          <span>
            The very first Bitcoin transaction bought <strong>two pizzas</strong> for 10,000 Bitcoins
            back in 2010. Those pizzas would be worth millions today!
          </span>
        </div>
        <h3>Key Bitcoin Facts</h3>
        <ul className="learn-list">
          <li>₿ There will only ever be <strong>21 million</strong> Bitcoins</li>
          <li>🔢 Each Bitcoin can be split into tiny pieces called <strong>Satoshis</strong></li>
          <li>⛏️ New Bitcoins are created through a process called <strong>mining</strong></li>
          <li>💻 It runs on a global network of computers</li>
        </ul>
        <p>
          Because Bitcoin is scarce (there is a limited supply), many people think it is like{' '}
          <strong>digital gold</strong>!
        </p>
      </>
    ),
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    title: 'The Blockchain',
    content: (
      <>
        <p>
          The <strong>blockchain</strong> is like a magical notebook that keeps a record of every
          cryptocurrency transaction ever made. Once something is written in this notebook, it can
          never be erased!
        </p>
        <div className="learn-visual">
          <div className="block-chain-demo">
            {['Block 1', 'Block 2', 'Block 3'].map((b, i) => (
              <div key={i} className="demo-block">
                <strong>{b}</strong>
                <small>Transactions</small>
              </div>
            ))}
          </div>
          <p className="visual-caption">Each block links to the one before it — forming a chain!</p>
        </div>
        <h3>How it works:</h3>
        <ol className="learn-list">
          <li>Someone sends cryptocurrency to a friend</li>
          <li>That transaction is broadcast to thousands of computers</li>
          <li>Computers check that the transaction is valid</li>
          <li>The transaction is grouped with others into a <strong>block</strong></li>
          <li>The block is added to the chain — forever!</li>
        </ol>
      </>
    ),
  },
  {
    id: 'mining',
    icon: '⛏️',
    title: 'Crypto Mining',
    content: (
      <>
        <p>
          <strong>Mining</strong> is the process of adding new transactions to the blockchain and
          creating new Bitcoin. Miners use powerful computers to solve very hard math puzzles.
        </p>
        <div className="learn-fact">
          <span>🏆</span>
          <span>
            The first miner to solve the puzzle gets to add the next block and wins a{' '}
            <strong>reward</strong> in Bitcoin! This is called the <strong>block reward</strong>.
          </span>
        </div>
        <h3>What do miners need?</h3>
        <ul className="learn-list">
          <li>💻 Powerful computers (called <strong>mining rigs</strong>)</li>
          <li>⚡ Lots of electricity to run the computers</li>
          <li>🌡️ Cooling systems so the computers don&apos;t overheat</li>
          <li>🌐 A fast internet connection</li>
        </ul>
        <p>
          Try our <strong>Mining Simulator</strong> to see what mining feels like — without the
          electricity bill! ⚡
        </p>
      </>
    ),
  },
  {
    id: 'wallets',
    icon: '👛',
    title: 'Crypto Wallets',
    content: (
      <>
        <p>
          A <strong>crypto wallet</strong> is like a digital backpack that stores your cryptocurrency.
          It does not actually hold coins — instead, it holds secret keys that prove the coins are
          yours.
        </p>
        <h3>Two important keys:</h3>
        <div className="key-cards">
          <div className="key-card public">
            <span>🔑</span>
            <strong>Public Key</strong>
            <p>Like your home address — share it so people can send you coins!</p>
          </div>
          <div className="key-card private">
            <span>🔐</span>
            <strong>Private Key</strong>
            <p>Like your house key — NEVER share this with anyone!</p>
          </div>
        </div>
        <div className="learn-fact">
          <span>⚠️</span>
          <span>
            If you lose your <strong>private key</strong>, you lose access to your coins forever.
            Always keep it safe!
          </span>
        </div>
      </>
    ),
  },
  {
    id: 'safety',
    icon: '🛡️',
    title: 'Staying Safe',
    content: (
      <>
        <p>
          Using cryptocurrency safely is super important! Here are the golden rules every crypto
          user — even kids — should know:
        </p>
        <ul className="learn-list safety-list">
          <li>🔐 <strong>Never share your private keys</strong> with anyone</li>
          <li>🧑‍💻 <strong>Always ask a parent or guardian</strong> before making any real transactions</li>
          <li>🎣 Watch out for <strong>scams</strong> — if something sounds too good to be true, it is!</li>
          <li>💾 <strong>Back up your wallet</strong> in a safe place</li>
          <li>🌐 Only use <strong>trusted websites and apps</strong></li>
          <li>🔒 Use a <strong>strong password</strong> for any crypto account</li>
        </ul>
        <div className="learn-fact">
          <span>✅</span>
          <span>
            Remember: <strong>CoinBits uses no real money!</strong> Everything here is for
            educational purposes only.
          </span>
        </div>
      </>
    ),
  },
]

export default function Learn() {
  const [activeId, setActiveId] = useState('what')
  const activeTopic = topics.find((t) => t.id === activeId)

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>📚 Learn About Crypto</h1>
        <p>Pick a topic to start learning!</p>
      </div>
      <div className="learn-layout">
        <nav className="learn-nav" aria-label="Topics">
          {topics.map(({ id, icon, title }) => (
            <button
              key={id}
              className={`topic-btn ${activeId === id ? 'active' : ''}`}
              onClick={() => setActiveId(id)}
            >
              <span className="topic-icon" aria-hidden="true">{icon}</span>
              <span>{title}</span>
            </button>
          ))}
        </nav>
        <article className="learn-content" aria-live="polite">
          <h2>
            {activeTopic.icon} {activeTopic.title}
          </h2>
          {activeTopic.content}
        </article>
      </div>
    </div>
  )
}
