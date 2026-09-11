import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PHOTO_ROOM_LABELS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Common Area', 'Other']

interface PhotoItem {
  file: File
  preview: string
  label: string
}

const MOCK_STUDENT_PROFILE = {
  university: 'University of Amsterdam',
  course: 'Computer Science',
  year: '2nd Year',
  nationality: 'Indian',
  languages: ['English', 'Hindi'],
  aboutMe: "I'm a quiet and tidy student who enjoys cooking and keeping things organised. Looking for a chill flatmate who respects shared spaces.",
  lifestyle: {
    Cleanliness: 'High',
    'Sleep Schedule': 'Early Bird',
    Smoking: 'No',
    Drinking: 'Occasionally',
    Cooking: 'Often',
    Guests: 'Rarely',
    Pets: 'Love Pets',
    Music: 'Quiet',
  },
}

const LIFESTYLE_COLORS: Record<string, string> = {
  High: '#5dae61', Low: '#e05252', Medium: '#f4b942',
  'Early Bird': '#5dae61', 'Night Owl': '#6c63ff', Flexible: '#f4b942',
  No: '#5dae61', Yes: '#e05252', Occasionally: '#f4b942',
  Often: '#5dae61', Sometimes: '#f4b942', Never: '#e05252',
  Rarely: '#5dae61',
  'No Pets': '#888', 'Have Pets': '#f4b942', 'Love Pets': '#5dae61',
  Quiet: '#5dae61', Moderate: '#f4b942', Loud: '#e05252',
}

export default function RoommatePreferences() {
  const navigate = useNavigate()
  const p = MOCK_STUDENT_PROFILE

  const [shareProfile, setShareProfile] = useState(false)
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const newPhotos: PhotoItem[] = files.map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      label: PHOTO_ROOM_LABELS[photos.length + i] ?? 'Other',
    }))
    setPhotos(prev => [...prev, ...newPhotos])
    e.target.value = ''
  }

  function removePhoto(idx: number) {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const photoCount = photos.length
  const photoProgress = Math.min(100, Math.round((photoCount / 6) * 100))

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post/roommates">Roommates</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Profile &amp; Photos</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">List your place and connect with students across Europe.</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Basic Info</span>
                  <span className="cl-step__sub">What are you renting?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step is-active">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21a8 8 0 0 0-5-7.39" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Profile &amp; Photos</span>
                  <span className="cl-step__sub">Share your profile &amp; add photos</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; Publish</span>
                  <span className="cl-step__sub">See what others will see</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-card">
          <div className="cl-body">
            <div className="cl-left">
              <div className="crl-form-body">

                {/* ── Photos ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                    Add Photos *
                  </h3>
                  <p className="cl-card__sub">Show students what your space looks like. Listings with photos get far more clicks.</p>

                  {photoCount > 0 && (
                    <div className="crl-quality-badge">
                      <div className="crl-quality-badge__left">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        <span className="crl-quality-badge__title">Photo Quality</span>
                      </div>
                      <div className="crl-quality-badge__stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} viewBox="0 0 24 24" fill={i < Math.round((photoCount / 6) * 5) ? '#f4b942' : 'none'} stroke="#f4b942" strokeWidth="2" width="16" height="16">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="crl-quality-badge__count">{photoCount} / 6 Photos Added</span>
                      <div className="crl-quality-badge__bar">
                        <div className="crl-quality-badge__fill" style={{ width: `${photoProgress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="crl-photo-grid">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="crl-photo-item">
                        <div className="crl-photo-item__img-wrap">
                          <img src={photo.preview} alt={photo.label} className="crl-photo-item__img" />
                          <button type="button" className="crl-photo-item__remove" onClick={() => removePhoto(idx)} aria-label="Remove photo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11"><path d="M18 6 6 18M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <span className="crl-photo-item__label">{photo.label}</span>
                      </div>
                    ))}
                    {photos.length < 6 && (
                      <button type="button" className="crl-photo-add" onClick={() => fileRef.current?.click()}>
                        <div className="crl-photo-add__icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="28" height="28">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                        <span className="crl-photo-add__text">Add Photo</span>
                        <span className="crl-photo-add__sub">Recommended</span>
                      </button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileChange} />
                </div>

                {/* ── Share Student Profile toggle ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                    </svg>
                    Share Your Student Profile
                  </h3>
                  <p className="cl-card__sub">
                    Show your university, background, and lifestyle to potential roommates. Listings with a profile get 3× more responses.
                  </p>

                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: shareProfile ? '#f0faf1' : '#fafaf8',
                      border: `1.5px solid ${shareProfile ? '#b7e0b9' : '#e8e8e0'}`,
                      borderRadius: 12, padding: '14px 18px', marginTop: 14, cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                    onClick={() => setShareProfile(v => !v)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={shareProfile ? '#5dae61' : '#aaa'} strokeWidth="2" width="22" height="22">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      <div>
                        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700, color: shareProfile ? '#2e7d32' : '#444', margin: 0 }}>
                          {shareProfile ? 'Profile shared with this listing' : 'Share my student profile'}
                        </p>
                        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888', margin: '2px 0 0' }}>
                          {shareProfile ? 'Potential roommates will see your info below' : 'Toggle on to attach your profile to this listing'}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        width: 44, height: 24, borderRadius: 12, flexShrink: 0,
                        background: shareProfile ? '#5dae61' : '#d0cfc8',
                        position: 'relative', transition: 'background 0.18s',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute', top: 3, left: shareProfile ? 23 : 3,
                          width: 18, height: 18, borderRadius: '50%', background: '#fff',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.18s',
                        }}
                      />
                    </div>
                  </div>

                  {shareProfile && (
                    <div style={{ marginTop: 6 }}>
                      <div
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10,
                          background: '#f0faf1', border: '1.5px solid #b7e0b9',
                          borderRadius: 10, padding: '10px 14px', marginBottom: 18,
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="16" height="16" style={{ flexShrink: 0, marginTop: 1 }}>
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#555', margin: 0 }}>
                          This info comes from your <strong>Student Profile</strong>.{' '}
                          <Link to="/profile" style={{ color: '#5dae61', fontWeight: 700 }}>Edit in Profile →</Link>
                        </p>
                      </div>

                      {/* Academic */}
                      <div className="crl-form-section" style={{ paddingTop: 0 }}>
                        <h3 className="cl-card__title">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                            <path d="M12 3L2 8l10 5 10-5-10-5z" /><path d="M6 13v6M18 13v6M4 19h16" />
                          </svg>
                          Academic
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                          <div className="crp-profile-row">
                            <span className="crp-profile-row__label">University</span>
                            <span className="crp-profile-row__value">{p.university || <em style={{ color: '#aaa' }}>Not set</em>}</span>
                          </div>
                          <div className="crp-profile-row">
                            <span className="crp-profile-row__label">Course</span>
                            <span className="crp-profile-row__value">{p.course || <em style={{ color: '#aaa' }}>Not set</em>}</span>
                          </div>
                          <div className="crp-profile-row">
                            <span className="crp-profile-row__label">Year</span>
                            <span className="crp-profile-row__value">{p.year || <em style={{ color: '#aaa' }}>Not set</em>}</span>
                          </div>
                          <div className="crp-profile-row">
                            <span className="crp-profile-row__label">Nationality</span>
                            <span className="crp-profile-row__value">{p.nationality || <em style={{ color: '#aaa' }}>Not set</em>}</span>
                          </div>
                          <div className="crp-profile-row">
                            <span className="crp-profile-row__label">Languages</span>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {p.languages.length > 0
                                ? p.languages.map(l => (
                                    <span key={l} style={{ background: '#e8f5e9', color: '#2e7d32', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>{l}</span>
                                  ))
                                : <em style={{ color: '#aaa', fontSize: 12 }}>Not set</em>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* About Me */}
                      <div className="crl-form-section">
                        <h3 className="cl-card__title">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                          </svg>
                          About Me
                        </h3>
                        <p style={{
                          fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#444',
                          background: '#fafaf8', border: '1.5px solid #eee',
                          borderRadius: 10, padding: '12px 14px', marginTop: 12, lineHeight: 1.6,
                        }}>
                          {p.aboutMe || <em style={{ color: '#aaa' }}>Not set — add it in your Student Profile.</em>}
                        </p>
                      </div>

                      {/* Lifestyle */}
                      <div className="crl-form-section">
                        <h3 className="cl-card__title">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          Lifestyle
                        </h3>
                        <div className="crp-lifestyle-grid" style={{ marginTop: 12 }}>
                          {Object.entries(p.lifestyle).map(([label, val]) => (
                            <div key={label} className="crp-lifestyle-row">
                              <span className="crp-lifestyle-label">{label}</span>
                              <span style={{
                                fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700,
                                color: LIFESTYLE_COLORS[val] ?? '#555',
                                background: `${LIFESTYLE_COLORS[val] ?? '#555'}18`,
                                borderRadius: 20, padding: '3px 12px',
                              }}>{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>


              </div>
            </div>

            {/* Right Column */}
            <div className="cl-right" style={{ width: '300px', maxWidth: '300px', minWidth: 0 }}>
              <div className="cl-card" style={{ padding: '20px' }}>
                <h3 className="cl-card__title" style={{ marginBottom: 10 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Why share your profile?
                </h3>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 }}>
                  Roommate seekers browse your profile before contacting you. A complete student profile builds trust and gets you faster responses.
                </p>
                <Link
                  to="/profile"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, marginTop: 14,
                    fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700,
                    color: '#5dae61', textDecoration: 'none',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Student Profile
                </Link>
              </div>

              <div className="cl-card crl-tip-card" style={{ marginTop: 16 }}>
                <div className="crl-tip">
                  <div className="crl-tip__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f4b942" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span className="crl-tip__sparkles">✨</span>
                  </div>
                  <p className="crl-tip__text">Tip</p>
                  <p className="crl-tip__desc">Add at least 3 photos — listings with photos get 5× more views.</p>
                </div>
              </div>

              <div className="cl-card cl-card--draft" style={{ marginTop: 16 }}>
                <div className="cl-draft">
                  <div>
                    <h4 className="cl-draft__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="16" height="16"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                      Save as Draft
                    </h4>
                    <p className="cl-draft__sub">You can save and continue later.</p>
                  </div>
                  <button type="button" className="cl-draft__btn">Save Draft</button>
                </div>
              </div>
            </div>
          </div>

          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post/roommates')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" onClick={() => navigate('/profile/post/roommates/review')}>
                  Next: Review
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
              <p className="cl-footer-bar__note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" style={{ display: 'inline', marginRight: 3 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                One-time payment of €1 to publish
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
