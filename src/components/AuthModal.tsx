import { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import PhoneDialDropdown from './PhoneDialDropdown'
import CountryDropdown from './CountryDropdown'
import RegionDropdown from './RegionDropdown'
import { login as apiLogin, register as apiRegister, googleLogin } from '../api/auth'
import { fetchCountries, fetchStates, fetchCities } from '../api/locations'
import type { ApiCountry } from '../api/locations'
import { COUNTRIES } from '../data/countries'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

interface Props {
  initialMode: 'login' | 'register'
  onClose: () => void
}

const CLOSE_DURATION = 260

export default function AuthModal({ initialMode, onClose }: Props) {
  const { login: authLogin } = useAuth()
  const { showToast } = useToast()

  const [mode, setMode]           = useState<'login' | 'register'>(initialMode)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [isClosing, setIsClosing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Shake state — set of field keys currently animating
  const [shaking, setShaking] = useState<Set<string>>(new Set())

  // Login fields
  const [loginEmail, setLoginEmail]       = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [fullName, setFullName]           = useState('')
  const [regEmail, setRegEmail]           = useState('')
  const [phoneNumber, setPhoneNumber]     = useState('')
  const [regPassword, setRegPassword]     = useState('')
  const [dialCode, setDialCode]           = useState('+44')
  const [termsChecked, setTermsChecked]   = useState(false)

  // Location state — default to UK (European country)
  const [apiCountries, setApiCountries]         = useState<ApiCountry[]>([])
  const [countriesLoading, setCountriesLoading] = useState(false)
  const [countryCode, setCountryCode]           = useState('GB')

  const [apiStates, setApiStates]         = useState<string[]>([])
  const [statesLoading, setStatesLoading] = useState(false)
  const [state, setState]                 = useState('')

  const [apiCities, setApiCities]         = useState<string[]>([])
  const [citiesLoading, setCitiesLoading] = useState(false)
  const [city, setCity]                   = useState('')

  const googleAuth = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      setLoading(true)
      try {
        const { token, user } = await googleLogin(access_token)
        authLogin(user, token)
        close()
        const msg = mode === 'login' ? 'Welcome back!' : 'Account created! Welcome to 1 Euro Pass.'
        setTimeout(() => showToast(msg, 'success'), CLOSE_DURATION + 50)
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Google sign-in failed', 'error')
      } finally {
        setLoading(false)
      }
    },
    onError: () => showToast('Google sign-in failed', 'error'),
  })

  function triggerShake(fields: string[]) {
    setShaking(new Set())
    // double-rAF ensures the DOM clears the class before re-adding it
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setShaking(new Set(fields))
      setTimeout(() => setShaking(new Set()), 450)
    }))
  }

  // Fetch countries once when register tab first opens, then immediately
  // fetch states for the default country (GB)
  useEffect(() => {
    if (mode !== 'register' || apiCountries.length > 0) return
    setCountriesLoading(true)
    fetchCountries()
      .then((countries) => {
        setApiCountries(countries)
        const defaultCountry = countries.find((c) => c.iso2 === 'GB')
        if (defaultCountry) {
          setStatesLoading(true)
          fetchStates(defaultCountry.name)
            .then(setApiStates)
            .catch(() => setApiStates([]))
            .finally(() => setStatesLoading(false))
        }
      })
      .catch(() => {})
      .finally(() => setCountriesLoading(false))
  }, [mode])

  // Fetch states when country changes
  useEffect(() => {
    setApiStates([])
    setState('')
    setApiCities([])
    setCity('')
    if (!countryCode) return
    const country = apiCountries.find((c) => c.iso2 === countryCode)
    if (!country) return
    setStatesLoading(true)
    fetchStates(country.name)
      .then(setApiStates)
      .catch(() => setApiStates([]))
      .finally(() => setStatesLoading(false))
  }, [countryCode])

  // Fetch cities when state changes
  useEffect(() => {
    setApiCities([])
    setCity('')
    if (!state || !countryCode) return
    const country = apiCountries.find((c) => c.iso2 === countryCode)
    if (!country) return
    setCitiesLoading(true)
    fetchCities(country.name, state)
      .then(setApiCities)
      .catch(() => setApiCities([]))
      .finally(() => setCitiesLoading(false))
  }, [state])

  function handleCountryChange(code: string) {
    setCountryCode(code)
    const country = apiCountries.find((c) => c.iso2 === code)
    if (country) setDialCode(country.phone_code)
  }

  function handleDialChange(dial: string) {
    setDialCode(dial)
    // sync the country dropdown to the selected dial code
    const fromApi = apiCountries.find((c) => c.phone_code === dial)
    if (fromApi) {
      setCountryCode(fromApi.iso2)
    } else {
      const fromStatic = COUNTRIES.find((c) => c.dial === dial)
      if (fromStatic) setCountryCode(fromStatic.code)
    }
  }

  function close() {
    setIsClosing(true)
    setTimeout(onClose, CLOSE_DURATION)
  }

  function switchMode(next: 'login' | 'register') {
    if (next === mode) return
    setDirection(next === 'register' ? 'forward' : 'back')
    setShaking(new Set())
    setMode(next)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    const empty: string[] = []
    if (!loginEmail.trim()) empty.push('email')
    if (!loginPassword)     empty.push('password')
    if (empty.length > 0) { triggerShake(empty); return }

    setLoading(true)
    try {
      const { token, user } = await apiLogin({ email: loginEmail, password: loginPassword })
      authLogin(user, token)
      close()
      setTimeout(() => showToast('Welcome back!', 'success'), CLOSE_DURATION + 50)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Login failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault()
    const empty: string[] = []
    if (!fullName.trim()) empty.push('fullName')
    if (!regEmail.trim()) empty.push('email')
    if (!regPassword)     empty.push('password')
    if (empty.length > 0) { triggerShake(empty); return }
    if (!termsChecked) { triggerShake(['terms']); return }

    setLoading(true)
    const countryName = apiCountries.find((c) => c.iso2 === countryCode)?.name ?? countryCode
    try {
      const { token, user } = await apiRegister({
        full_name: fullName,
        email: regEmail,
        password: regPassword,
        phone_code: dialCode,
        phone_number: phoneNumber,
        country: countryName,
        state,
        city,
      })
      authLogin(user, token)
      close()
      setTimeout(() => showToast('Account created! Welcome to 1 Euro Pass.', 'success'), CLOSE_DURATION + 50)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const sh = (key: string) => shaking.has(key) ? ' is-shake' : ''

  return (
    <div className={`auth-overlay${isClosing ? ' is-closing' : ''}`} onClick={close}>
      <div className={`auth-modal-wrap${mode === 'register' ? ' auth-modal-wrap--wide' : ''}`} onClick={(e) => e.stopPropagation()}>

        <button className="auth-modal__close" onClick={close} type="button">✕</button>

        <div className={`auth-modal${isClosing ? ' is-closing' : ''}`}>

          <div className="auth-modal__brand">
            <img src="/logo.svg" alt="1 Euro Pass" className="auth-modal__logo" />
          </div>

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
              <form className="auth-form" onSubmit={handleLoginSubmit} noValidate>
                <div className="auth-form__group">
                  <label className="auth-form__label">Email</label>
                  <input
                    className={`auth-form__input${sh('email')}`}
                    type="email"
                    placeholder="you@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="auth-form__group">
                  <label className="auth-form__label">Password</label>
                  <div className="auth-form__input-wrap">
                    <input
                      className={`auth-form__input${sh('password')}`}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button type="button" className="auth-form__eye" onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <a href="/forgot-password" className="auth-form__forgot">Forgot password?</a>


                <button className="auth-form__submit" type="submit" disabled={loading}>
                  {loading ? 'Logging in…' : 'Log in'}
                </button>

                <div className="auth-form__divider">or</div>

                <button
                  type="button"
                  className="auth-form__google-btn"
                  onClick={() => googleAuth()}
                  disabled={loading}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

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
              <form className="auth-form auth-form--register" onSubmit={handleRegisterSubmit} noValidate>

                <div className="auth-form__row">
                  <div className="auth-form__group">
                    <label className="auth-form__label">Full Name</label>
                    <input
                      className={`auth-form__input${sh('fullName')}`}
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">Email</label>
                    <input
                      className={`auth-form__input${sh('email')}`}
                      type="email"
                      placeholder="you@email.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-form__row">
                  <div className="auth-form__group">
                    <label className="auth-form__label">Phone Number</label>
                    <div className="auth-form__phone">
                      <PhoneDialDropdown value={dialCode} onChange={handleDialChange} />
                      <input
                        className="auth-form__input auth-form__phone-num"
                        type="tel"
                        placeholder="712 345 678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">Country</label>
                    <CountryDropdown
                      value={countryCode}
                      onChange={handleCountryChange}
                      apiCountries={apiCountries.length > 0 ? apiCountries : undefined}
                      loading={countriesLoading}
                    />
                  </div>
                </div>

                <div className="auth-form__row">
                  <div className="auth-form__group">
                    <label className="auth-form__label">State / Region</label>
                    <RegionDropdown
                      items={apiStates}
                      value={state}
                      onChange={setState}
                      placeholder="Select state"
                      loading={statesLoading}
                      disabled={!countryCode}
                    />
                  </div>
                  <div className="auth-form__group">
                    <label className="auth-form__label">City</label>
                    <RegionDropdown
                      items={apiCities}
                      value={city}
                      onChange={setCity}
                      placeholder="Select city"
                      loading={citiesLoading}
                      disabled={!state}
                    />
                  </div>
                </div>

                <div className="auth-form__group">
                  <label className="auth-form__label">Password</label>
                  <div className="auth-form__input-wrap">
                    <input
                      className={`auth-form__input${sh('password')}`}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <button type="button" className="auth-form__eye" onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className={`auth-form__group auth-form__terms${shaking.has('terms') ? ' is-shake' : ''}`}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="/terms">Terms</a> & <a href="/privacy">Privacy Policy</a>
                  </label>
                </div>


                <button className="auth-form__submit" type="submit" disabled={loading}>
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>

                <div className="auth-form__divider">or</div>

                <button
                  type="button"
                  className="auth-form__google-btn"
                  onClick={() => googleAuth()}
                  disabled={loading}
                >
                  <GoogleIcon />
                  Sign up with Google
                </button>

                <p className="auth-form__switch">
                  Already have an account?{' '}
                  <button type="button" className="auth-form__switch-btn" onClick={() => switchMode('login')}>
                    Log in
                  </button>
                </p>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.09-6.09C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.73 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.67c-.55 2.97-2.2 5.48-4.67 7.17l7.19 5.59C43.3 37.26 46.5 31.34 46.5 24.5z"/>
      <path fill="#FBBC05" d="M10.74 28.26A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.91.7-4.26l-7.1-5.52A23.9 23.9 0 0 0 .5 24c0 3.86.93 7.5 2.56 10.72l7.68-6.46z"/>
      <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.49-4.94l-7.19-5.59C28.6 38.3 26.42 39 24 39c-6.27 0-11.6-4.17-13.26-9.74l-7.68 6.46C6.54 43.45 14.73 47 24 47z"/>
    </svg>
  )
}
