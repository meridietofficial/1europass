import { useState, useEffect } from 'react'
import PhoneDialDropdown from './PhoneDialDropdown'
import CountryDropdown from './CountryDropdown'
import RegionDropdown from './RegionDropdown'

interface Props {
  initialMode: 'login' | 'register'
  onClose: () => void
}

const CLOSE_DURATION = 260

export default function AuthModal({ initialMode, onClose }: Props) {
  const [mode, setMode]         = useState<'login' | 'register'>(initialMode)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [isClosing, setIsClosing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [dialCode, setDialCode] = useState('+44')
  const [countryCode, setCountryCode] = useState('GB')
  const [region, setRegion]     = useState('')

  function close() {
    setIsClosing(true)
    setTimeout(onClose, CLOSE_DURATION)
  }

  function switchMode(next: 'login' | 'register') {
    if (next === mode) return
    setDirection(next === 'register' ? 'forward' : 'back')
    setMode(next)
  }

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire to backend
  }

  return (
    <div className={`auth-overlay${isClosing ? ' is-closing' : ''}`} onClick={close}>
      <div className={`auth-modal-wrap${mode === 'register' ? ' auth-modal-wrap--wide' : ''}`} onClick={(e) => e.stopPropagation()}>

        {/* Close — sits on the corner of the wrap, outside the modal */}
        <button className="auth-modal__close" onClick={close} type="button">✕</button>

        <div className={`auth-modal${isClosing ? ' is-closing' : ''}`}>

        {/* Brand */}
        <div className="auth-modal__brand">
          <img src="/logo.svg" alt="1 Euro Pass" className="auth-modal__logo" />
        </div>

        {/* Tabs */}
        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${mode === 'login' ? 'is-active' : ''}`}
            onClick={() => switchMode('login')}
            type="button"
          >
            Log in
          </button>
          <button
            className={`auth-modal__tab ${mode === 'register' ? 'is-active' : ''}`}
            onClick={() => switchMode('register')}
            type="button"
          >
            Sign up
          </button>
        </div>

        <div key={mode} className={`auth-slide auth-slide--${direction}`}>

          {/* ── LOGIN ── */}
          {mode === 'login' && (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form__group">
                <label className="auth-form__label">Email</label>
                <input className="auth-form__input" type="email" placeholder="you@email.com" required />
              </div>

              <div className="auth-form__group">
                <label className="auth-form__label">Password</label>
                <div className="auth-form__input-wrap">
                  <input
                    className="auth-form__input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-form__eye"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <a href="/forgot-password" className="auth-form__forgot">Forgot password?</a>

              <button className="auth-form__submit" type="submit">Log in</button>

              <p className="auth-form__switch">
                Don't have an account?{' '}
                <button type="button" className="auth-form__switch-btn" onClick={() => switchMode('register')}>
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER ── */}
          {mode === 'register' && (
            <form className="auth-form auth-form--register" onSubmit={handleSubmit}>

              <div className="auth-form__row">
                <div className="auth-form__group">
                  <label className="auth-form__label">Full Name</label>
                  <input className="auth-form__input" type="text" placeholder="John Doe" required />
                </div>
                <div className="auth-form__group">
                  <label className="auth-form__label">Email</label>
                  <input className="auth-form__input" type="email" placeholder="you@email.com" required />
                </div>
              </div>

              <div className="auth-form__row">
                <div className="auth-form__group">
                  <label className="auth-form__label">Phone Number</label>
                  <div className="auth-form__phone">
                    <PhoneDialDropdown value={dialCode} onChange={setDialCode} />
                    <input className="auth-form__input auth-form__phone-num" type="tel" placeholder="712 345 678" required />
                  </div>
                </div>
                <div className="auth-form__group">
                  <label className="auth-form__label">Password</label>
                  <div className="auth-form__input-wrap">
                    <input
                      className="auth-form__input"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="auth-form__eye"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="auth-form__row">
                <div className="auth-form__group">
                  <label className="auth-form__label">Country</label>
                  <CountryDropdown
                    value={countryCode}
                    onChange={(code) => { setCountryCode(code); setRegion('') }}
                  />
                </div>
                <div className="auth-form__group">
                  <label className="auth-form__label">Region / City</label>
                  <RegionDropdown
                    countryCode={countryCode}
                    value={region}
                    onChange={setRegion}
                  />
                </div>
              </div>

              <div className="auth-form__group auth-form__terms">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="/terms">Terms</a> & <a href="/privacy">Privacy Policy</a>
                </label>
              </div>

              <button className="auth-form__submit" type="submit">Create Account</button>

              <p className="auth-form__switch">
                Already have an account?{' '}
                <button type="button" className="auth-form__switch-btn" onClick={() => switchMode('login')}>
                  Log in
                </button>
              </p>
            </form>
          )}

        </div>

        </div>{/* end auth-modal */}
      </div>{/* end auth-modal-wrap */}
    </div>
  )
}
