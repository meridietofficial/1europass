import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const FRIEND_DRAFT_KEY = 'friend_draft_id'

const UNIVERSITIES = [
  'University of Amsterdam', 'Humboldt University Berlin', 'KU Leuven',
  'University of Copenhagen', 'University of Helsinki', 'Sorbonne University',
  'LMU Munich', 'University of Barcelona', 'University of Warsaw',
  'Charles University Prague', 'University of Vienna', 'University College Dublin',
  'University of Edinburgh', 'University of Bologna', 'Erasmus University Rotterdam',
  'Uppsala University', 'University of Lisbon', 'Maastricht University', 'Other',
]

const FIELDS_OF_STUDY = [
  'Business & Economics', 'Computer Science & IT', 'Engineering',
  'Medicine & Health', 'Law', 'Arts & Humanities', 'Social Sciences',
  'Natural Sciences', 'Mathematics & Statistics', 'Architecture & Design',
  'Education', 'Psychology', 'Communication & Media', 'Languages', 'Other',
]

const YEARS_OF_STUDY = [
  '1st Year', '2nd Year', '3rd Year', '4th Year',
  'Masters Year 1', 'Masters Year 2', 'PhD', 'Exchange Student',
]

const LOOKING_FOR = ['Anyone', 'Male', 'Female']

export default function CreateFriendListing() {
  const navigate = useNavigate()
  const photoRef = useRef<HTMLInputElement>(null)

  const [name, setName]           = useState('')
  const [city, setCity]           = useState('')
  const [university, setUniversity] = useState('')
  const [field, setField]         = useState('')
  const [year, setYear]           = useState('')
  const [lookingFor, setLookingFor] = useState('Anyone')
  const [ageMin, setAgeMin]       = useState(18)
  const [ageMax, setAgeMax]       = useState(30)
  const [photo, setPhoto]         = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function removePhoto() {
    setPhoto(null)
    setPhotoPreview(null)
    if (photoRef.current) photoRef.current.value = ''
  }

  function handleAgeMin(val: number) {
    setAgeMin(Math.min(val, ageMax - 1))
  }

  function handleAgeMax(val: number) {
    setAgeMax(Math.max(val, ageMin + 1))
  }

  function handleNext() {
    sessionStorage.setItem('friend_step1', JSON.stringify({
      name, city, university, field, year, lookingFor, ageMin, ageMax,
    }))
    navigate('/profile/post/friend/vibe')
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

              {/* Inner grid: form fields left | photo right */}
              <div className="friend-inner-grid">

                {/* ── Form fields ── */}
                <div className="friend-fields">

                  {/* Your name */}
                  <div className="tutor-field">
                    <label className="cl-label">Your name *</label>
                    <input
                      className="cl-input"
                      type="text"
                      placeholder="e.g. Sophie"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  {/* City */}
                  <div className="tutor-field">
                    <label className="cl-label">City *</label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <input
                        className="cl-input cl-input--pl"
                        type="text"
                        placeholder="e.g. Berlin, Amsterdam"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* University */}
                  <div className="tutor-field">
                    <label className="cl-label">University *</label>
                    <div className="cl-select-wrap">
                      <svg className="cl-select-icon" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15">
                        <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/>
                      </svg>
                      <select
                        className="cl-input cl-input--select cl-input--pl"
                        value={university}
                        onChange={e => setUniversity(e.target.value)}
                      >
                        <option value="">Select your university</option>
                        {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Course + Year */}
                  <div className="tutor-grid-2">
                    <div className="tutor-field">
                      <label className="cl-label">Course / Field of Study</label>
                      <div className="cl-select-wrap">
                        <svg className="cl-select-icon" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                        </svg>
                        <select
                          className="cl-input cl-input--select cl-input--pl"
                          value={field}
                          onChange={e => setField(e.target.value)}
                        >
                          <option value="">What are you studying?</option>
                          {FIELDS_OF_STUDY.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="tutor-field">
                      <label className="cl-label">Year of Study</label>
                      <div className="cl-select-wrap">
                        <svg className="cl-select-icon" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <select
                          className="cl-input cl-input--select cl-input--pl"
                          value={year}
                          onChange={e => setYear(e.target.value)}
                        >
                          <option value="">Select year</option>
                          {YEARS_OF_STUDY.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* I am looking for */}
                  <div className="tutor-field">
                    <label className="cl-label">I am looking for *</label>
                    <div className="friend-gender-row">
                      {LOOKING_FOR.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          className={`friend-gender-btn${lookingFor === opt ? ' is-active' : ''}`}
                          onClick={() => setLookingFor(opt)}
                        >
                          {lookingFor === opt && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" style={{ marginRight: 4 }}>
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred age range */}
                  <div className="tutor-field">
                    <label className="cl-label">Preferred age range</label>
                    <div className="friend-range-wrap">
                      <div className="friend-range-track">
                        <div
                          className="friend-range-fill"
                          style={{
                            left: `${ageMinPct}%`,
                            width: `${ageMaxPct - ageMinPct}%`,
                          }}
                        />
                        <input
                          type="range" min={18} max={30}
                          value={ageMin}
                          onChange={e => handleAgeMin(Number(e.target.value))}
                          className="friend-range-input"
                        />
                        <input
                          type="range" min={18} max={30}
                          value={ageMax}
                          onChange={e => handleAgeMax(Number(e.target.value))}
                          className="friend-range-input"
                        />
                      </div>
                      <div className="friend-range-labels">
                        <span>18</span>
                        <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
                          {ageMin} – {ageMax === 30 ? '30+' : ageMax}
                        </span>
                        <span>30+</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ── Profile photo ── */}
                <div className="friend-photo-col">
                  <label className="cl-label">Profile photo</label>
                  <div
                    className="friend-photo-box"
                    onClick={() => photoRef.current?.click()}
                  >
                    {photoPreview ? (
                      <>
                        <img src={photoPreview} alt="Preview" className="friend-photo-preview" />
                        <button
                          type="button"
                          className="friend-photo-remove"
                          onClick={e => { e.stopPropagation(); removePhoto() }}
                        >✕</button>
                      </>
                    ) : (
                      <>
                        <div className="friend-photo-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" width="40" height="40">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                          </svg>
                        </div>
                        <p className="friend-photo-label">Add a photo</p>
                        <p className="friend-photo-hint">JPG, PNG up to 5MB</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={photoRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    style={{ display: 'none' }}
                    onChange={handlePhotoChange}
                  />
                </div>

              </div>{/* end friend-inner-grid */}

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
                <button type="button" className="cl-next-btn" onClick={handleNext}>
                  Next: Your vibe &amp; interests
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
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
