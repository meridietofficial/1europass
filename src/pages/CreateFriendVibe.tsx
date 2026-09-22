import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PERSONALITIES = [
  {
    id: 'easy-going',
    label: 'Easy-going',
    sub: 'Laid back and chill',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    id: 'ambitious',
    label: 'Ambitious',
    sub: 'Focused and driven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32">
        <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/>
      </svg>
    ),
  },
  {
    id: 'creative',
    label: 'Creative',
    sub: 'Artistic and expressive',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32">
        <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/>
        <circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/>
        <path d="M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" strokeDasharray="3 2"/>
      </svg>
    ),
  },
  {
    id: 'active',
    label: 'Active',
    sub: 'Energetic and sporty',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32">
        <circle cx="12" cy="5" r="2"/><path d="M12 7v5l3 3"/><path d="M6 12l3-3 3 3 3-3"/>
      </svg>
    ),
  },
  {
    id: 'calm',
    label: 'Calm',
    sub: 'Peaceful and relaxed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.41a.77.77 0 0 0 .91 1.1A23.08 23.08 0 0 0 8 19c4-2 6-6 6-6"/><path d="M20 2c0 0-2 6-6 8"/>
      </svg>
    ),
  },
]

const INTERESTS = [
  { id: 'travel',    label: 'Travel',            icon: '✈️' },
  { id: 'study',     label: 'Study buddy',        icon: '📚' },
  { id: 'sports',    label: 'Sports',             icon: '⚽' },
  { id: 'music',     label: 'Music',              icon: '🎵' },
  { id: 'art',       label: 'Art',                icon: '🎨' },
  { id: 'gaming',    label: 'Gaming',             icon: '🎮' },
  { id: 'fitness',   label: 'Fitness',            icon: '💪' },
  { id: 'food',      label: 'Food & Cafes',       icon: '☕' },
  { id: 'photo',     label: 'Photography',        icon: '📷' },
  { id: 'movies',    label: 'Movies',             icon: '🎬' },
  { id: 'events',    label: 'Events',             icon: '🎉' },
  { id: 'language',  label: 'Language exchange',  icon: '🌐' },
  { id: 'reading',   label: 'Reading',            icon: '📖' },
  { id: 'hiking',    label: 'Hiking',             icon: '🥾' },
  { id: 'cycling',   label: 'Cycling',            icon: '🚲' },
  { id: 'volunteer', label: 'Volunteering',       icon: '🤝' },
  { id: 'other',     label: 'Other',              icon: '—' },
]

const MAX_BIO = 200

export default function CreateFriendVibe() {
  const navigate = useNavigate()

  const [vibes, setVibes]         = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [bio, setBio]             = useState('')

  function toggleVibe(id: string) {
    setVibes(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id])
  }

  function toggleInterest(id: string) {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  function handleBack() {
    navigate('/profile/post/friend')
  }

  function handleNext() {
    sessionStorage.setItem('friend_step2', JSON.stringify({ vibes, interests, bio }))
    navigate('/profile/post/friend/review')
  }

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
              {/* Step 1 — done */}
              <div className="cl-step cl-step--done">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-basic-info.svg" width="36" height="36" alt="About you" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">About you</span>
                  <span className="cl-step__sub">Tell us about yourself</span>
                </div>
              </div>

              <div className="cl-steps__line cl-steps__line--done" />

              {/* Step 2 — active */}
              <div className="cl-step is-active">
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

            {/* ── Left column ── */}
            <div className="cl-left">
              <div style={{ padding: '4px 20px 0' }}>
                <h2 className="friend-section-title">Your vibe &amp; interests</h2>
              </div>

              <div style={{ padding: '0 20px 20px' }}>

                {/* ── Personality ── */}
                <div style={{ marginBottom: 28 }}>
                  <div className="friend-q-title">How would your friends describe you?</div>
                  <div className="friend-q-sub">Select a few that match your personality.</div>
                  <div className="friend-vibe-grid">
                    {PERSONALITIES.map(p => {
                      const active = vibes.includes(p.id)
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className={`friend-vibe-card${active ? ' is-active' : ''}`}
                          onClick={() => toggleVibe(p.id)}
                        >
                          {active && (
                            <span className="friend-vibe-check">
                              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="10" height="10">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </span>
                          )}
                          <div className="friend-vibe-icon">{p.icon}</div>
                          <div className="friend-vibe-label">{p.label}</div>
                          <div className="friend-vibe-sub">{p.sub}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ── Interests ── */}
                <div style={{ marginBottom: 28 }}>
                  <div className="friend-q-title">My interests</div>
                  <div className="friend-q-sub">Select as many as you like.</div>
                  <div className="friend-interests-wrap">
                    {INTERESTS.map(item => {
                      const active = interests.includes(item.id)
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`friend-interest-chip${active ? ' is-active' : ''}`}
                          onClick={() => toggleInterest(item.id)}
                        >
                          <span className="friend-interest-icon">{item.icon}</span>
                          {item.label}
                          {active && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11" style={{ marginLeft: 4 }}>
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ── Bio ── */}
                <div style={{ marginBottom: 20 }}>
                  <div className="friend-q-title">What are you hoping to find?</div>
                  <div className="friend-q-sub">Share a bit about what you're looking for (e.g. coffee buddies, travel friends, study partners, etc.).</div>
                  <div style={{ position: 'relative' }}>
                    <textarea
                      className="friend-bio-textarea"
                      maxLength={MAX_BIO}
                      rows={5}
                      placeholder="I'm looking for kind, open-minded friends to explore the city, try new cafes, study together and make unforgettable memories!"
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                    />
                    <span className="friend-bio-counter">{bio.length}/{MAX_BIO}</span>
                  </div>
                </div>

                {/* ── Trust bar ── */}
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

              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="11" height="11" style={{ marginRight: 4, verticalAlign: 'middle' }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Have questions? Read our{' '}
                <span style={{ color: '#5dae61', fontWeight: 600, cursor: 'pointer' }}>listing guidelines →</span>
              </div>

            </aside>

          </div>

          {/* ── Footer bar ── */}
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
                <button type="button" className="cl-next-btn" style={{ background: '#fff', color: '#1a1a1a', borderColor: '#1a1a1a' }} onClick={handleBack}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" onClick={handleNext}>
                  Next: Review
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
