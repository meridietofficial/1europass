import { useState, useRef, useEffect } from 'react'
import AuthModal from './AuthModal'
import { useAuth } from '../context/AuthContext'

type AuthMode = 'login' | 'register' | null

export default function Navbar() {
  const [authMode, setAuthMode]   = useState<AuthMode>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

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

            {user ? (
              <div className="navbar__user-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`navbar__user-box${dropdownOpen ? ' is-open' : ''}`}
                  onClick={() => setDropdownOpen((o) => !o)}
                >
                  <div className="navbar__avatar">
                    {user.profile_picture
                      ? <img src={user.profile_picture} alt={user.full_name} className="navbar__avatar-img" />
                      : user.full_name.charAt(0).toUpperCase()
                    }
                  </div>
                  <span className="navbar__user-name">{user.full_name.split(' ')[0]}</span>
                  <svg className="navbar__user-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="navbar__dropdown">
                    <a href="/profile" className="navbar__dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      Profile
                    </a>
                    <button
                      type="button"
                      className="navbar__dropdown-item navbar__dropdown-item--logout"
                      onClick={() => { logout(); setDropdownOpen(false) }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="navbar__login" type="button" onClick={() => setAuthMode('login')}>Log in</button>
                <button className="navbar__signup" type="button" onClick={() => setAuthMode('register')}>Sign up</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {authMode && (
        <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} />
      )}
    </>
  )
}
