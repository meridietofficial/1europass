import { useState } from 'react'
import AuthModal from './AuthModal'

type AuthMode = 'login' | 'register' | null

export default function Navbar() {
  const [authMode, setAuthMode] = useState<AuthMode>(null)

  return (
    <>
      <nav className="navbar">
        <div className="navbar__inner">
          <a href="/" className="navbar__logo">
            <img src="/logo.svg" alt="1 Euro Pass" className="navbar__logo-img" />
          </a>

          <nav className="navbar__nav">
            <a href="/" className="active">Home</a>
            <a href="/browse">Browse</a>
            <a href="/how-it-works">How it works</a>
            <a href="/for-businesses">For Businesses</a>
            <a href="/about">About us</a>
          </nav>

          <div className="navbar__actions">
            <button className="navbar__lang" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              EN
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <button className="navbar__login" type="button" onClick={() => setAuthMode('login')}>Log in</button>
            <button className="navbar__signup" type="button" onClick={() => setAuthMode('register')}>Sign up</button>
          </div>
        </div>
      </nav>

      {authMode && (
        <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} />
      )}
    </>
  )
}
