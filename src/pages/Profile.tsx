import { useState, useEffect, useRef } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PhoneDialDropdown from '../components/PhoneDialDropdown'
import CountryDropdown from '../components/CountryDropdown'
import RegionDropdown from '../components/RegionDropdown'
import { fetchCountries, fetchStates, fetchCities } from '../api/locations'
import type { ApiCountry } from '../api/locations'
import { COUNTRIES } from '../data/countries'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { apiGet, apiPatch, apiDelete } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

type Tab = 'info' | 'student' | 'listings' | 'security'

const COURSES = [
  'Computer Science', 'Business Administration', 'Law', 'Medicine', 'Engineering',
  'Economics', 'Psychology', 'Architecture', 'Data Science', 'Design',
  'International Relations', 'Political Science', 'Sociology', 'Marketing',
  'Finance', 'Biotechnology', 'Pharmacy', 'Education', 'Linguistics', 'Other',
]
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters Year 1', 'Masters Year 2', 'PhD', 'Exchange Student']
const NATIONALITIES = [
  'Afghan','Albanian','Algerian','American','Argentine','Australian','Austrian','Belgian',
  'Brazilian','British','Bulgarian','Canadian','Chinese','Colombian','Croatian','Czech',
  'Danish','Dutch','Egyptian','Estonian','Ethiopian','Filipino','Finnish','French',
  'German','Greek','Hungarian','Indian','Indonesian','Iranian','Irish','Israeli',
  'Italian','Japanese','Jordanian','Kenyan','Korean','Latvian','Lebanese','Lithuanian',
  'Luxembourgish','Maltese','Mexican','Moroccan','Nepalese','Nigerian','Norwegian',
  'Pakistani','Polish','Portuguese','Romanian','Russian','Serbian','Singaporean',
  'Slovak','Slovenian','South African','Spanish','Swedish','Swiss','Thai','Turkish',
  'Ukrainian','Uruguayan','Vietnamese','Other',
]
const LANGUAGES = [
  'English','Dutch','German','French','Spanish','Italian','Portuguese','Polish',
  'Romanian','Swedish','Norwegian','Danish','Finnish','Greek','Czech','Hungarian',
  'Turkish','Arabic','Hindi','Urdu','Mandarin','Japanese','Korean','Russian','Bengali',
]
const LIFESTYLE_OPTIONS: { key: string; label: string; options: string[] }[] = [
  { key: 'cleanliness', label: 'Cleanliness',    options: ['Low', 'Medium', 'High'] },
  { key: 'sleep',       label: 'Sleep Schedule', options: ['Early Bird', 'Flexible', 'Night Owl'] },
  { key: 'smoking',     label: 'Smoking',        options: ['No', 'Occasionally', 'Yes'] },
  { key: 'drinking',    label: 'Drinking',       options: ['No', 'Occasionally', 'Yes'] },
  { key: 'cooking',     label: 'Cooking',        options: ['Often', 'Sometimes', 'Never'] },
  { key: 'guests',      label: 'Guests',         options: ['Rarely', 'Sometimes', 'Often'] },
  { key: 'pets',        label: 'Pets',           options: ['No Pets', 'Have Pets', 'Love Pets'] },
  { key: 'music',       label: 'Music',          options: ['Quiet', 'Moderate', 'Loud'] },
]

interface ProfileUser {
  id: string
  full_name: string
  email: string
  phone_code: string | null
  phone_number: string | null
  is_email_verified: boolean
  is_active: boolean
  profile_picture: string | null
  country: string | null
  state: string | null
  city: string | null
  dob: string | null
  language: string | null
  role: string
  created_at: string
}

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const VALID_TABS: Tab[] = ['info', 'student', 'listings', 'security']
  const hashTab = window.location.hash.replace('#', '') as Tab
  const [activeTab, setActiveTab] = useState<Tab>(VALID_TABS.includes(hashTab) ? hashTab : 'info')

  function switchTab(tab: Tab) {
    setActiveTab(tab)
    window.history.replaceState(null, '', `#${tab}`)
  }

  if (!user) return <Navigate to="/" replace />

  const u = user as ProfileUser

  const joinedDate = new Date(u.created_at).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const locationParts = [u.city, u.state, u.country].filter(Boolean)

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'info',
      label: 'Personal Info',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: 'student',
      label: 'Student Profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M12 3L2 8l10 5 10-5-10-5z" />
          <path d="M6 13v6M18 13v6M4 19h16" />
        </svg>
      ),
    },
    {
      key: 'listings',
      label: 'My Listings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      key: 'security',
      label: 'Security',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ]

  const filledFields = [u.full_name, u.email, u.phone_number, u.country, u.state, u.city, u.dob, u.language].filter(Boolean).length
  const completionPct = Math.round((filledFields / 8) * 100)

  return (
    <>
      <Navbar />
      <main className="profile-page">

        {/* ── Cover Banner ── */}
        <div className="profile-cover">
          <div className="profile-cover__circle profile-cover__circle--1" aria-hidden="true" />
          <div className="profile-cover__circle profile-cover__circle--2" aria-hidden="true" />
          <div className="profile-cover__circle profile-cover__circle--3" aria-hidden="true" />

          <div className="profile-cover__inner">
            <div className="profile-cover__left">
              <div className="profile-cover__avatar-wrap">
                <div className="profile-cover__avatar">
                  {u.profile_picture ? (
                    <img src={u.profile_picture} alt={u.full_name} />
                  ) : (
                    <span>{u.full_name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button type="button" className="profile-cover__photo-btn" title="Change photo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
              </div>

              <div className="profile-cover__identity">
                <h1 className="profile-cover__name">{u.full_name}</h1>
                <div className="profile-cover__badges">
                  {u.is_email_verified && (
                    <span className="profile-badge profile-badge--verified">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified
                    </span>
                  )}
                  <span className="profile-badge profile-badge--role">
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1).toLowerCase()}
                  </span>
                </div>
                {locationParts.length > 0 && (
                  <p className="profile-cover__location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {locationParts.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div className="profile-cover__stats">
              <div className="profile-cover__stat">
                <span className="profile-cover__stat-num">0</span>
                <span className="profile-cover__stat-label">Listings</span>
              </div>
              <div className="profile-cover__stat-sep" />
              <div className="profile-cover__stat">
                <span className="profile-cover__stat-num">0</span>
                <span className="profile-cover__stat-label">Saved</span>
              </div>
              <div className="profile-cover__stat-sep" />
              <div className="profile-cover__stat">
                <span className="profile-cover__stat-num">0</span>
                <span className="profile-cover__stat-label">Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="profile-body">
          <div className="profile-body__inner">

            {/* ── Sidebar ── */}
            <aside className="profile-sidebar">

              {/* About card */}
              <div className="profile-sidebar__card">
                <h4 className="profile-sidebar__card-title">About</h4>
                <div className="profile-sidebar__info-rows">
                  <div className="profile-sidebar__info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{u.email}</span>
                  </div>
                  {locationParts.length > 0 && (
                    <div className="profile-sidebar__info-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{locationParts.join(', ')}</span>
                    </div>
                  )}
                  <div className="profile-sidebar__info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Joined {joinedDate}</span>
                  </div>
                  {u.language && (
                    <div className="profile-sidebar__info-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span>{u.language}</span>
                    </div>
                  )}
                  {u.phone_number && (
                    <div className="profile-sidebar__info-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{u.phone_code} {u.phone_number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="profile-sidebar__card profile-sidebar__card--actions">
                <h4 className="profile-sidebar__card-title">Quick Links</h4>
                <button type="button" className="profile-action-btn" onClick={() => navigate('/profile/post')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Post a Listing
                </button>
                <Link to="/" className="profile-action-btn profile-action-btn--outline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Browse Listings
                </Link>
              </div>

              {/* Profile completion */}
              <div className="profile-sidebar__card">
                <div className="profile-completion__header">
                  <h4 className="profile-sidebar__card-title" style={{ marginBottom: 0 }}>Profile</h4>
                  <span className="profile-completion__pct">{completionPct}%</span>
                </div>
                <div className="profile-completion__bar">
                  <div className="profile-completion__fill" style={{ width: `${completionPct}%` }} />
                </div>
                <p className="profile-completion__hint">
                  {completionPct < 100
                    ? 'Complete your profile to build trust with landlords.'
                    : 'Your profile is fully complete!'}
                </p>
              </div>

            </aside>

            {/* ── Main ── */}
            <div className="profile-main">
              <div className="profile-tabs">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`profile-tab-btn${activeTab === t.key ? ' is-active' : ''}`}
                    onClick={() => switchTab(t.key)}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="profile-panel">
                {activeTab === 'info' && <PersonalInfoPanel user={u} />}
                {activeTab === 'student' && <StudentProfilePanel />}
                {activeTab === 'listings' && <ListingsPanel />}
                {activeTab === 'security' && <SecurityPanel />}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* ─── Personal Info Panel ──────────────────────────── */

function PersonalInfoPanel({ user }: { user: ProfileUser }) {
  const { showToast } = useToast()
  const [form, setForm] = useState({
    full_name: user.full_name ?? '',
    email: user.email ?? '',
    phone_number: user.phone_number ?? '',
    dob: user.dob ?? '',
    language: user.language ?? '',
  })
  const [saving, setSaving] = useState(false)

  const [dialCode, setDialCode] = useState(user.phone_code ?? '+44')
  const [countryCode, setCountryCode] = useState(() => {
    if (!user.country) return 'GB'
    const match = COUNTRIES.find((c) => c.name.toLowerCase() === (user.country ?? '').toLowerCase())
    return match?.code ?? 'GB'
  })

  const [apiCountries, setApiCountries]         = useState<ApiCountry[]>([])
  const [countriesLoading, setCountriesLoading] = useState(false)
  const [apiStates, setApiStates]               = useState<string[]>([])
  const [statesLoading, setStatesLoading]       = useState(false)
  const [stateVal, setStateVal]                 = useState(user.state ?? '')
  const [apiCities, setApiCities]               = useState<string[]>([])
  const [citiesLoading, setCitiesLoading]       = useState(false)
  const [cityVal, setCityVal]                   = useState(user.city ?? '')

  const skipCountryEffect = useRef(true)
  const skipStateEffect   = useRef(true)

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Fetch countries on mount, pre-load states (and cities if state is set)
  useEffect(() => {
    setCountriesLoading(true)
    fetchCountries()
      .then((countries) => {
        setApiCountries(countries)
        const current = countries.find((c) => c.iso2 === countryCode)
        if (!current) return
        setStatesLoading(true)
        fetchStates(current.name)
          .then((states) => {
            setApiStates(states)
            if (stateVal) {
              setCitiesLoading(true)
              fetchCities(current.name, stateVal)
                .then(setApiCities)
                .catch(() => setApiCities([]))
                .finally(() => setCitiesLoading(false))
            }
          })
          .catch(() => setApiStates([]))
          .finally(() => setStatesLoading(false))
      })
      .catch(() => {})
      .finally(() => setCountriesLoading(false))
  }, [])

  // Fetch states when country changes (skip first render)
  useEffect(() => {
    if (skipCountryEffect.current) { skipCountryEffect.current = false; return }
    setApiStates([])
    setStateVal('')
    setApiCities([])
    setCityVal('')
    if (!countryCode || apiCountries.length === 0) return
    const country = apiCountries.find((c) => c.iso2 === countryCode)
    if (!country) return
    setStatesLoading(true)
    fetchStates(country.name)
      .then(setApiStates)
      .catch(() => setApiStates([]))
      .finally(() => setStatesLoading(false))
  }, [countryCode])

  // Fetch cities when state changes (skip first render)
  useEffect(() => {
    if (skipStateEffect.current) { skipStateEffect.current = false; return }
    setApiCities([])
    setCityVal('')
    if (!stateVal || !countryCode || apiCountries.length === 0) return
    const country = apiCountries.find((c) => c.iso2 === countryCode)
    if (!country) return
    setCitiesLoading(true)
    fetchCities(country.name, stateVal)
      .then(setApiCities)
      .catch(() => setApiCities([]))
      .finally(() => setCitiesLoading(false))
  }, [stateVal])

  function handleCountryChange(code: string) {
    setCountryCode(code)
    const country = apiCountries.find((c) => c.iso2 === code)
    if (country) setDialCode(country.phone_code)
  }

  function handleDialChange(dial: string) {
    setDialCode(dial)
    const fromApi = apiCountries.find((c) => c.phone_code === dial)
    if (fromApi) setCountryCode(fromApi.iso2)
    else {
      const fromStatic = COUNTRIES.find((c) => c.dial === dial)
      if (fromStatic) setCountryCode(fromStatic.code)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const countryName = apiCountries.find((c) => c.iso2 === countryCode)?.name ?? countryCode
    try {
      // TODO: wire up actual API save with { ...form, phone_code: dialCode, country: countryName, state: stateVal, city: cityVal }
      await new Promise((r) => setTimeout(r, 600))
      showToast('Profile updated successfully!', 'success')
    } catch {
      showToast('Failed to update profile. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="profile-panel__header">
        <h3 className="profile-panel__title">Personal Information</h3>
      </div>

      <form className="profile-form" onSubmit={handleSave} noValidate>
        <div className="profile-form__section">
          <div className="profile-form__section-label">Basic Info</div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">Full Name</label>
              <input
                className="profile-form__input"
                type="text"
                value={form.full_name}
                onChange={(e) => set('full_name', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="profile-form__field">
              <label className="profile-form__label">Date of Birth</label>
              <input
                className="profile-form__input"
                type="date"
                value={form.dob}
                onChange={(e) => set('dob', e.target.value)}
              />
            </div>
          </div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">Language</label>
              <input
                className="profile-form__input"
                type="text"
                value={form.language}
                onChange={(e) => set('language', e.target.value)}
                placeholder="e.g. English"
              />
            </div>
            <div className="profile-form__field" />
          </div>
        </div>

        <div className="profile-form__section">
          <div className="profile-form__section-label">Contact</div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">Email Address</label>
              <div className="profile-form__input-wrap">
                <input
                  className="profile-form__input"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="your@email.com"
                />
                {user.is_email_verified && (
                  <span className="profile-form__verified-tick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
            <div className="profile-form__field">
              <label className="profile-form__label">Phone Number</label>
              <div className="profile-form__phone">
                <PhoneDialDropdown value={dialCode} onChange={handleDialChange} />
                <input
                  className="profile-form__input profile-form__phone-num"
                  type="tel"
                  placeholder="712 345 678"
                  value={form.phone_number}
                  onChange={(e) => set('phone_number', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="profile-form__section">
          <div className="profile-form__section-label">Location</div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">Country</label>
              <CountryDropdown
                value={countryCode}
                onChange={handleCountryChange}
                apiCountries={apiCountries.length > 0 ? apiCountries : undefined}
                loading={countriesLoading}
              />
            </div>
            <div className="profile-form__field">
              <label className="profile-form__label">State / Region</label>
              <RegionDropdown
                items={apiStates}
                value={stateVal}
                onChange={setStateVal}
                placeholder="Select state"
                loading={statesLoading}
                disabled={!countryCode}
              />
            </div>
          </div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">City</label>
              <RegionDropdown
                items={apiCities}
                value={cityVal}
                onChange={setCityVal}
                placeholder="Select city"
                loading={citiesLoading}
                disabled={!stateVal}
              />
            </div>
            <div className="profile-form__field" />
          </div>
        </div>

        <div className="profile-form__actions">
          <button type="submit" className="profile-form__save-btn" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  )
}

/* ─── Student Profile Panel ────────────────────────── */

function StudentProfilePanel() {
  const { showToast } = useToast()
  const [university, setUniversity]   = useState('')
  const [course, setCourse]           = useState('')
  const [year, setYear]               = useState('')
  const [nationality, setNationality] = useState('')
  const [languages, setLanguages]     = useState<string[]>([])
  const [aboutMe, setAboutMe]         = useState('')
  const [saving, setSaving]           = useState(false)
  const [lifestyle, setLifestyle]     = useState<Record<string, string>>(
    () => Object.fromEntries(LIFESTYLE_OPTIONS.map(r => [r.key, '']))
  )

  function toggleLanguage(lang: string) {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang])
  }

  function setLifestyleOption(key: string, val: string) {
    setLifestyle(prev => ({ ...prev, [key]: prev[key] === val ? '' : val }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      showToast('Student profile updated!', 'success')
    } catch {
      showToast('Failed to save. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="profile-panel__header">
        <h3 className="profile-panel__title">Student Profile</h3>
        <p className="profile-panel__subtitle">This info appears on your roommate listings and helps others find a good match.</p>
      </div>

      <form className="profile-form" onSubmit={handleSave} noValidate>

        {/* Academic */}
        <div className="profile-form__section">
          <div className="profile-form__section-label">Academic</div>
          <div className="profile-form__row">
            <div className="profile-form__field profile-form__field--full">
              <label className="profile-form__label">University / School</label>
              <input
                className="profile-form__input"
                type="text"
                placeholder="e.g. University of Amsterdam, TU Delft..."
                value={university}
                onChange={e => setUniversity(e.target.value)}
              />
            </div>
          </div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">Course / Program</label>
              <div className="crp-select-wrap">
                <select className="crp-select profile-form__input" value={course} onChange={e => setCourse(e.target.value)}>
                  <option value="">Select your course</option>
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
            <div className="profile-form__field">
              <label className="profile-form__label">Year of Study</label>
              <div className="crp-select-wrap">
                <select className="crp-select profile-form__input" value={year} onChange={e => setYear(e.target.value)}>
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="profile-form__section">
          <div className="profile-form__section-label">Background</div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">Nationality</label>
              <div className="crp-select-wrap">
                <select className="crp-select profile-form__input" value={nationality} onChange={e => setNationality(e.target.value)}>
                  <option value="">Select nationality</option>
                  {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
            <div className="profile-form__field" />
          </div>
          <div className="profile-form__row">
            <div className="profile-form__field profile-form__field--full">
              <label className="profile-form__label">Languages Spoken</label>
              <div className="crp-lang-grid" style={{ marginTop: 8 }}>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    className={`crp-lang-btn${languages.includes(lang) ? ' is-active' : ''}`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                    {languages.includes(lang) && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11" style={{ marginLeft: 3 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="profile-form__section">
          <div className="profile-form__section-label">About Me</div>
          <div className="profile-form__row">
            <div className="profile-form__field profile-form__field--full">
              <label className="profile-form__label">About Me</label>
              <p style={{ fontSize: 12, color: '#aaa', margin: '2px 0 8px' }}>Describe your routine, what you're like as a flatmate, what you enjoy.</p>
              <textarea
                className="profile-form__input cl-textarea"
                rows={4}
                placeholder="e.g. I'm a quiet and tidy student who works mostly in the mornings. I love cooking and enjoy a peaceful home environment..."
                value={aboutMe}
                onChange={e => setAboutMe(e.target.value.slice(0, 300))}
              />
              <div className="cl-char-count">{aboutMe.length}/300</div>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="profile-form__section">
          <div className="profile-form__section-label">Lifestyle</div>
          <p style={{ fontSize: 12, color: '#aaa', marginBottom: 14 }}>Helps others know if you're a good match as a flatmate.</p>
          <div className="crp-lifestyle-grid">
            {LIFESTYLE_OPTIONS.map(row => (
              <div key={row.key} className="crp-lifestyle-row">
                <span className="crp-lifestyle-label">{row.label}</span>
                <div className="crl-gender-btns">
                  {row.options.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`crl-gender-btn${lifestyle[row.key] === opt ? ' is-active' : ''}`}
                      onClick={() => setLifestyleOption(row.key, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-form__actions">
          <button type="submit" className="profile-form__save-btn" disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  )
}

/* ─── Listings Panel ───────────────────────────────── */

interface MyListing {
  id: string
  listing_type: string
  status: string
  category_id: number
  category_name: string
  category_slug: string
  title: string | null
  city: string | null
  country: string | null
  price: number | null
  created_at: string
  updated_at: string
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  draft:   { label: 'Draft',   color: '#f59e0b' },
  active:  { label: 'Active',  color: '#16a34a' },
  paused:  { label: 'Paused',  color: '#6b7280' },
  removed: { label: 'Removed', color: '#dc2626' },
  banned:  { label: 'Banned',  color: '#dc2626' },
}

function ListingsPanel() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [listings, setListings] = useState<MyListing[]>([])
  const [loading, setLoading]   = useState(true)
  const [acting, setActing]     = useState<string | null>(null)

  useEffect(() => {
    apiGet<{ success: boolean; data: MyListing[] }>(ENDPOINTS.listings.my)
      .then(res => setListings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title || 'this listing'}"? This cannot be undone.`)) return
    setActing(id)
    try {
      await apiDelete(ENDPOINTS.housing.delete(id))
      setListings(prev => prev.filter(l => l.id !== id))
      showToast('Listing deleted.', 'success')
    } catch {
      showToast('Failed to delete listing.', 'error')
    } finally {
      setActing(null)
    }
  }

  async function handleToggleStatus(l: MyListing) {
    const next = l.status === 'active' ? 'paused' : 'active'
    setActing(l.id)
    try {
      await apiPatch(ENDPOINTS.housing.status(l.id), { status: next })
      setListings(prev => prev.map(x => x.id === l.id ? { ...x, status: next } : x))
      showToast(`Listing ${next === 'active' ? 'activated' : 'paused'}.`, 'success')
    } catch {
      showToast('Failed to update status.', 'error')
    } finally {
      setActing(null)
    }
  }

  return (
    <>
      <div className="profile-panel__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 className="profile-panel__title">My Listings</h3>
          <p className="profile-panel__subtitle">Manage your active posts and listings</p>
        </div>
        <button type="button" className="profile-form__save-btn" style={{ margin: 0 }} onClick={() => navigate('/profile/post')}>
          + Post a Listing
        </button>
      </div>

      {loading && (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#6b7280', fontSize: 14 }}>Loading...</div>
      )}

      {!loading && listings.length === 0 && (
        <div className="profile-empty">
          <div className="profile-empty__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="32" height="32">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h4 className="profile-empty__title">No listings yet</h4>
          <p className="profile-empty__text">You haven't posted anything yet. Start by posting your first listing.</p>
        </div>
      )}

      {!loading && listings.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {listings.map(l => {
            const st = STATUS_LABEL[l.status] ?? { label: l.status, color: '#6b7280' }
            const busy = acting === l.id
            const isActive = l.status === 'active'
            return (
              <div key={l.id} style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, background: '#fff' }}>

                {/* Category icon */}
                <div style={{ width: 42, height: 42, borderRadius: 8, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="20" height="20">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {l.title || 'Untitled listing'}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: st.color, background: `${st.color}18`, borderRadius: 20, padding: '2px 8px' }}>{st.label}</span>
                    <span>·</span>
                    <span>{l.category_name}</span>
                    {l.city && <><span>·</span><span>{l.city}{l.country ? `, ${l.country}` : ''}</span></>}
                    {l.price && <><span>·</span><span>€{Number(l.price).toLocaleString()}</span></>}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>
                    {new Date(l.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {/* Action icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>

                  {/* View */}
                  <button
                    type="button"
                    title="View listing"
                    disabled={busy}
                    onClick={() => navigate(`/housing/${l.id}`)}
                    style={{ width: 34, height: 34, borderRadius: 7, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    title="Edit listing"
                    disabled={busy}
                    onClick={() => navigate(`/profile/post/housing/edit/${l.id}`)}
                    style={{ width: 34, height: 34, borderRadius: 7, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>

                  {/* Active / Pause toggle */}
                  <button
                    type="button"
                    title={isActive ? 'Pause listing' : 'Activate listing'}
                    disabled={busy || l.status === 'banned' || l.status === 'removed'}
                    onClick={() => handleToggleStatus(l)}
                    style={{ width: 34, height: 34, borderRadius: 7, border: `1px solid ${isActive ? '#fde68a' : '#bbf7d0'}`, background: isActive ? '#fffbeb' : '#f0fdf4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#d97706' : '#16a34a', opacity: (busy || l.status === 'banned' || l.status === 'removed') ? 0.5 : 1 }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = (busy || l.status === 'banned' || l.status === 'removed') ? '0.5' : '1')}
                  >
                    {isActive ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    title="Delete listing"
                    disabled={busy}
                    onClick={() => handleDelete(l.id, l.title ?? '')}
                    style={{ width: 34, height: 34, borderRadius: 7, border: '1px solid #fecaca', background: '#fff5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', opacity: busy ? 0.5 : 1 }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff5f5')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>

                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

/* ─── Security Panel ───────────────────────────────── */

function SecurityPanel() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [saving, setSaving] = useState(false)

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    if (form.next !== form.confirm) {
      showToast('New passwords do not match.', 'error')
      return
    }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setSaving(false)
    showToast('Password updated successfully!', 'success')
    setForm({ current: '', next: '', confirm: '' })
  }

  return (
    <>
      <div className="profile-panel__header">
        <h3 className="profile-panel__title">Security</h3>
        <p className="profile-panel__subtitle">Manage your password and account security</p>
      </div>

      <div className="profile-security__section">
        <h4 className="profile-security__section-title">Change Password</h4>
        <form className="profile-form" onSubmit={handlePassword} noValidate>
          <div className="profile-form__row">
            <div className="profile-form__field profile-form__field--full">
              <label className="profile-form__label">Current Password</label>
              <input
                className="profile-form__input"
                type="password"
                value={form.current}
                onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="profile-form__row">
            <div className="profile-form__field">
              <label className="profile-form__label">New Password</label>
              <input
                className="profile-form__input"
                type="password"
                value={form.next}
                onChange={(e) => setForm((f) => ({ ...f, next: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
            <div className="profile-form__field">
              <label className="profile-form__label">Confirm Password</label>
              <input
                className="profile-form__input"
                type="password"
                value={form.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="profile-form__actions">
            <button type="submit" className="profile-form__save-btn" disabled={saving}>
              {saving ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      <div className="profile-security__danger">
        <h4 className="profile-security__danger-title">Danger Zone</h4>
        <p className="profile-security__danger-text">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button type="button" className="profile-security__delete-btn">
          Delete Account
        </button>
      </div>
    </>
  )
}
