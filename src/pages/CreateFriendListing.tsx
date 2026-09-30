import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

export const FRIEND_DRAFT_KEY = 'friend_draft_id'

const LOOKING_FOR = ['Anyone', 'Male', 'Female']

export default function CreateFriendListing() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()

  const [name, setName]             = useState(user?.full_name ?? '')
  const [city, setCity]               = useState(user?.city ?? '')
  const [dob, setDob]                 = useState(user?.dob ?? '')
  const [language, setLanguage]       = useState(user?.language ?? '')
  const [country, setCountry]         = useState(user?.country ?? '')
  const [stateRegion, setStateRegion] = useState(user?.state ?? '')
  const [title, setTitle]             = useState('')
  const [lookingFor, setLookingFor]   = useState('Anyone')
  const [ageMin, setAgeMin]           = useState(18)
  const [ageMax, setAgeMax]           = useState(30)
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.profile_picture ?? null)
  const [loadingEdit, setLoadingEdit] = useState(!!id)
  const photoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!id) return
    apiGet<{ success: boolean; data: Record<string, unknown> }>(ENDPOINTS.friend.get(id))
      .then(res => {
        const d = res.data
        if (d.title)      setTitle(String(d.title))
        if (d.looking_for) setLookingFor(String(d.looking_for))
        if (d.age_min != null) setAgeMin(Number(d.age_min))
        if (d.age_max != null) setAgeMax(Number(d.age_max))
        const vibes     = Array.isArray(d.vibes)     ? d.vibes     : (d.vibes     ? JSON.parse(String(d.vibes))     : [])
        const interests = Array.isArray(d.interests) ? d.interests : (d.interests ? JSON.parse(String(d.interests)) : [])
        const bio = d.bio ? String(d.bio) : ''
        sessionStorage.setItem('friend_step2', JSON.stringify({ vibes, interests, bio }))
      })
      .catch(() => {})
      .finally(() => setLoadingEdit(false))
  }, [id])

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
  }

  function handleAgeMin(val: number) {
    setAgeMin(Math.min(val, ageMax - 1))
  }

  function handleAgeMax(val: number) {
    setAgeMax(Math.max(val, ageMin + 1))
  }

  function handleNext() {
    if (!title.trim()) {
      alert('Please enter a listing title.')
      return
    }
    sessionStorage.setItem('friend_step1', JSON.stringify({
      title: title.trim(),
      name, city, dob, language, country, stateRegion,
      lookingFor, ageMin, ageMax,
    }))
    navigate(id ? `/profile/post/friend/edit/${id}/vibe` : '/profile/post/friend/vibe')
  }

  const ageMinPct = ((ageMin - 18) / (30 - 18)) * 100
  const ageMaxPct = ((ageMax - 18) / (30 - 18)) * 100

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* ── Hero / Steps ── */}
        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <span>Find a Friend</span>
              </nav>
              <h1 className="cl-hero__title">Create Friend listing</h1>
              <p className="cl-hero__sub">3 easy steps to help you find your people</p>
            </div>

            <div className="cl-steps">
              {/* Step 1 — active */}
              <div className="cl-step is-active">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-basic-info.svg" width="36" height="36" alt="About you" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">About you</span>
                  <span className="cl-step__sub">Tell us about yourself</span>
                </div>
              </div>

              <div className="cl-steps__line" />

              {/* Step 2 */}
              <div className="cl-step">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-photos.svg" width="36" height="36" alt="Your vibe & interests" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Your vibe &amp; interests</span>
                  <span className="cl-step__sub">What are you looking for?</span>
                </div>
              </div>

              <div className="cl-steps__line" />

              {/* Step 3 */}
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-review.svg" width="36" height="36" alt="Review & Publish" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; publish</span>
                  <span className="cl-step__sub">Check everything and go live.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content card ── */}
        <div className="content-card">
          <div className="cl-body">

            {/* ── Left column (form) ── */}
            <div className="cl-left">
              <div style={{ padding: '4px 20px 0' }}>
                <h2 className="friend-section-title">Let's start with the basics</h2>
                <p className="friend-section-sub">This information helps others get to know you.</p>
              </div>

              {/* ── Unified form ── */}
              <div className="friend-form-body" style={{ padding: '0 20px 8px' }}>

                {/* Listing title */}
                <div className="tutor-field tutor-field--standalone">
                  <label className="cl-label">Listing Title *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="cl-input"
                      type="text"
                      placeholder="e.g. Looking for a hiking buddy in Berlin"
                      maxLength={80}
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      style={{ paddingRight: 52 }}
                    />
                    <span style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      fontSize: 11, color: '#b0afa8', fontFamily: 'Nunito, sans-serif', pointerEvents: 'none',
                    }}>
                      {title.length}/80
                    </span>
                  </div>
                </div>

                {/* Edit profile link */}
                <div className="friend-edit-row">
                  <span className="friend-edit-hint">Auto-filled from your profile</span>
                  <Link to="/profile/edit" className="friend-edit-link">Edit profile →</Link>
                </div>

                {/* Rows 1-3: Name / DOB / Country on left, Photo spanning all 3 on right */}
                <div className="friend-top-grid">
                  <div className="tutor-field">
                    <label className="cl-label">Your name</label>
                    <div className="friend-display-value">{name || '—'}</div>
                  </div>

                  {/* Right col — spans rows 1-3 */}
                  <div className="tutor-field friend-photo-field">
                    <label className="cl-label">Profile Photo</label>
                    <div className="friend-photo-preview">
                      {photoPreview
                        ? <img src={photoPreview} alt="Preview" className="friend-photo-img" />
                        : <div className="friend-photo-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" width="28" height="28">
                              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                              <circle cx="12" cy="13" r="4"/>
                            </svg>
                            <span>No photo set</span>
                          </div>
                      }
                    </div>
                  </div>

                  <div className="tutor-field">
                    <label className="cl-label">Date of Birth</label>
                    <div className="friend-display-value">{dob ? dob.slice(0, 10) : '—'}</div>
                  </div>

                  <div className="tutor-field">
                    <label className="cl-label">Country</label>
                    <div className="friend-display-value">{country || '—'}</div>
                  </div>
                </div>

                <div className="tutor-grid-2">
                  <div className="tutor-field">
                    <label className="cl-label">State / Region</label>
                    <div className="friend-display-value">{stateRegion || '—'}</div>
                  </div>
                  <div className="tutor-field">
                    <label className="cl-label">I am looking for *</label>
                    <div className="friend-gender-row">
                      {LOOKING_FOR.map(opt => (
                        <button key={opt} type="button"
                          className={`friend-gender-btn${lookingFor === opt ? ' is-active' : ''}`}
                          onClick={() => setLookingFor(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* City + Preferred age range */}
                <div className="tutor-grid-2">
                  <div className="tutor-field">
                    <label className="cl-label">City</label>
                    <div className="friend-display-value">{city || '—'}</div>
                  </div>
                  <div className="tutor-field">
                    <label className="cl-label">Preferred age range</label>
                    <div className="friend-range-wrap">
                      <div className="friend-range-track">
                        <div className="friend-range-fill" style={{ left: `${ageMinPct}%`, width: `${ageMaxPct - ageMinPct}%` }} />
                        <input type="range" min={18} max={30} value={ageMin}
                          onChange={e => handleAgeMin(Number(e.target.value))} className="friend-range-input" />
                        <input type="range" min={18} max={30} value={ageMax}
                          onChange={e => handleAgeMax(Number(e.target.value))} className="friend-range-input" />
                      </div>
                      <div className="friend-range-labels">
                        <span>18</span>
                        <span>{ageMin} – {ageMax === 30 ? '30+' : ageMax}</span>
                        <span>30+</span>
                      </div>
                    </div>
                  </div>
                </div>


              </div>{/* end unified form */}

              {/* Trust bar */}
              <div className="friend-trust-bar">
                <div className="friend-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                  <div>
                    <div className="friend-trust-title">Verified &amp; safe</div>
                    <div className="friend-trust-sub">All profiles are reviewed for your safety.</div>
                  </div>
                </div>
                <div className="friend-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <div>
                    <div className="friend-trust-title">Your info is private</div>
                    <div className="friend-trust-sub">We never share your personal information.</div>
                  </div>
                </div>
                <div className="friend-trust-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <div>
                    <div className="friend-trust-title">Build real connections</div>
                    <div className="friend-trust-sub">Find friends who share your interests and vibe.</div>
                  </div>
                </div>
              </div>

            </div>{/* end cl-left */}

            {/* ── Right sidebar ── */}
            <aside className="cl-right">

              {/* Find your people */}
              <div className="friend-sidebar-card friend-sidebar-card--green">
                <div className="friend-sc-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="18" height="18">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <span>Find your people</span>
                </div>
                <ul className="friend-sc-list">
                  <li><span className="friend-sc-check">✓</span> Make new friends in your city</li>
                  <li><span className="friend-sc-check">✓</span> Meet people with similar interests</li>
                  <li><span className="friend-sc-check">✓</span> Find study buddies, travel partners and more</li>
                  <li><span className="friend-sc-check">✓</span> Be part of a supportive community</li>
                </ul>
              </div>

              {/* Tips for a great profile */}
              <div className="friend-sidebar-card">
                <div className="friend-sc-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" width="18" height="18">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>Tips for a great profile</span>
                </div>
                <ul className="friend-sc-list">
                  <li><span className="friend-sc-check friend-sc-check--green">✓</span> Add a clear and friendly profile photo</li>
                  <li><span className="friend-sc-check friend-sc-check--green">✓</span> Be honest about your interests</li>
                  <li><span className="friend-sc-check friend-sc-check--green">✓</span> Share what you're looking for</li>
                  <li><span className="friend-sc-check friend-sc-check--green">✓</span> A short bio helps start a conversation</li>
                  <li><span className="friend-sc-check friend-sc-check--green">✓</span> Keep it friendly and respectful</li>
                </ul>
              </div>

              {/* Need inspiration? */}
              <div className="friend-sidebar-card friend-sidebar-card--purple">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" width="16" height="16">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#7c3aed' }}>Need inspiration?</span>
                </div>
                <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 12, lineHeight: 1.5 }}>
                  Check out some example profiles to see how others introduce themselves.
                </p>
                <button className="friend-examples-btn">View Examples →</button>
              </div>

            </aside>

          </div>

          {/* ── Footer bar (matches housing style) ── */}
          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-next-btn" onClick={handleNext} disabled={loadingEdit}>
                  {loadingEdit ? 'Loading…' : 'Next: Your vibe & interests'}
                  {!loadingEdit && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>
              <p className="cl-footer-bar__note">One-time payment of €1 to publish</p>
            </div>
          </div>

        </div>{/* end content-card */}

      </main>
      <Footer />
    </>
  )
}
