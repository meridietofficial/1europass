import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const COURSES = [
  'Computer Science', 'Business Administration', 'Law', 'Medicine', 'Engineering',
  'Economics', 'Psychology', 'Architecture', 'Data Science', 'Design',
  'International Relations', 'Political Science', 'Sociology', 'Marketing',
  'Finance', 'Biotechnology', 'Pharmacy', 'Education', 'Linguistics', 'Other',
]

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters Year 1', 'Masters Year 2', 'PhD', 'Exchange Student']

const NATIONALITIES = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Argentine', 'Australian',
  'Austrian', 'Belgian', 'Brazilian', 'British', 'Bulgarian', 'Canadian',
  'Chinese', 'Colombian', 'Croatian', 'Czech', 'Danish', 'Dutch',
  'Egyptian', 'Estonian', 'Ethiopian', 'Filipino', 'Finnish', 'French',
  'German', 'Greek', 'Hungarian', 'Indian', 'Indonesian', 'Iranian',
  'Irish', 'Israeli', 'Italian', 'Japanese', 'Jordanian', 'Kenyan',
  'Korean', 'Latvian', 'Lebanese', 'Lithuanian', 'Luxembourgish', 'Maltese',
  'Mexican', 'Moroccan', 'Nepalese', 'Nigerian', 'Norwegian', 'Pakistani',
  'Polish', 'Portuguese', 'Romanian', 'Russian', 'Serbian', 'Singaporean',
  'Slovak', 'Slovenian', 'South African', 'Spanish', 'Swedish', 'Swiss',
  'Thai', 'Turkish', 'Ukrainian', 'Uruguayan', 'Vietnamese', 'Other',
]

const LANGUAGES = [
  'English', 'Dutch', 'German', 'French', 'Spanish', 'Italian', 'Portuguese',
  'Polish', 'Romanian', 'Swedish', 'Norwegian', 'Danish', 'Finnish',
  'Greek', 'Czech', 'Hungarian', 'Turkish', 'Arabic', 'Hindi', 'Urdu',
  'Mandarin', 'Japanese', 'Korean', 'Russian', 'Bengali',
]

const LIFESTYLE: { key: string; label: string; options: string[] }[] = [
  { key: 'cleanliness', label: 'Cleanliness', options: ['Low', 'Medium', 'High'] },
  { key: 'sleep', label: 'Sleep Schedule', options: ['Early Bird', 'Flexible', 'Night Owl'] },
  { key: 'smoking', label: 'Smoking', options: ['No', 'Occasionally', 'Yes'] },
  { key: 'drinking', label: 'Drinking', options: ['No', 'Occasionally', 'Yes'] },
  { key: 'cooking', label: 'Cooking', options: ['Often', 'Sometimes', 'Never'] },
  { key: 'guests', label: 'Guests', options: ['Rarely', 'Sometimes', 'Often'] },
  { key: 'pets', label: 'Pets', options: ['No Pets', 'Have Pets', 'Love Pets'] },
  { key: 'music', label: 'Music', options: ['Quiet', 'Moderate', 'Loud'] },
]

export default function RoommatePreferences() {
  const navigate = useNavigate()

  // About You
  const [university, setUniversity] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge] = useState('')
  const [nationality, setNationality] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [aboutMe, setAboutMe] = useState('')

  // Lifestyle
  const [lifestyle, setLifestyle] = useState<Record<string, string>>({
    cleanliness: '', sleep: '', smoking: '', drinking: '', cooking: '', guests: '', pets: '', music: '',
  })

  // About the Room / Flat
  const [numPeople, setNumPeople] = useState(2)
  const [rules, setRules] = useState('')

  function setLifestyleOption(key: string, val: string) {
    setLifestyle(prev => ({ ...prev, [key]: prev[key] === val ? '' : val }))
  }

  function toggleLanguage(lang: string) {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang])
  }

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
                <span>Preferences</span>
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
                  <span className="cl-step__label">Preferences</span>
                  <span className="cl-step__sub">Make your listing stand out</span>
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
                  <span className="cl-step__label">Review &amp; publish</span>
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

                {/* ── About You ── */}
                <div className="crl-form-section">
                  <h2 className="crp-section-title">About You</h2>

                  {/* University — full width */}
                  <div style={{ marginBottom: 14 }}>
                    <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>University / School *</label>
                    <input
                      className="cl-input"
                      type="text"
                      placeholder="e.g. University of Amsterdam, TU Delft..."
                      value={university}
                      onChange={e => setUniversity(e.target.value)}
                    />
                  </div>

                  {/* Course + Year — equal 2-col */}
                  <div className="crl-form-2col" style={{ marginBottom: 14 }}>
                    <div>
                      <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>Course / Program *</label>
                      <div className="crp-select-wrap">
                        <select className="crp-select" value={course} onChange={e => setCourse(e.target.value)}>
                          <option value="">Select your course</option>
                          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                    <div>
                      <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>Year of Study</label>
                      <div className="crp-select-wrap">
                        <select className="crp-select" value={year} onChange={e => setYear(e.target.value)}>
                          <option value="">Select year</option>
                          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Age + Nationality — narrow age, wide nationality */}
                  <div className="crl-form-2col crl-form-2col--age" style={{ marginBottom: 14 }}>
                    <div>
                      <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>Age *</label>
                      <input
                        className="cl-input"
                        type="number"
                        min="16"
                        max="99"
                        placeholder="e.g. 22"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>Nationality *</label>
                      <div className="crp-select-wrap">
                        <select className="crp-select" value={nationality} onChange={e => setNationality(e.target.value)}>
                          <option value="">Select nationality</option>
                          {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div style={{ marginBottom: 14 }}>
                    <label className="cl-label" style={{ marginBottom: 8, display: 'block' }}>Languages Spoken *</label>
                    <div className="crp-lang-grid">
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

                  {/* About Me */}
                  <div>
                    <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>About Me</label>
                    <p className="cl-card__sub" style={{ marginBottom: 8 }}>Describe yourself — your routine, what you're like as a flatmate, what you enjoy.</p>
                    <textarea
                      className="cl-textarea"
                      rows={4}
                      placeholder="e.g. I'm a quiet and tidy student who works mostly in the mornings. I love cooking and enjoy a peaceful home environment..."
                      value={aboutMe}
                      onChange={e => setAboutMe(e.target.value.slice(0, 300))}
                    />
                    <div className="cl-char-count">{aboutMe.length}/300</div>
                  </div>
                </div>

                {/* ── About the Room / Flat ── */}
                <div className="crl-form-section">
                  <h2 className="crp-section-title">About the Room / Flat</h2>

                  <div style={{ marginBottom: 16 }}>
                    <label className="cl-label" style={{ marginBottom: 8, display: 'block' }}>Number of people in flat (including you) *</label>
                    <div className="crp-spinner">
                      <button type="button" className="crp-spinner__btn" onClick={() => setNumPeople(p => Math.max(1, p - 1))} disabled={numPeople <= 1} aria-label="Decrease">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                      <span className="crp-spinner__val">{numPeople}</span>
                      <button type="button" className="crp-spinner__btn" onClick={() => setNumPeople(p => Math.min(10, p + 1))} disabled={numPeople >= 10} aria-label="Increase">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="cl-label" style={{ marginBottom: 6, display: 'block' }}>Any rules or important info?</label>
                    <textarea
                      className="cl-textarea"
                      rows={4}
                      placeholder="E.g. No parties, quiet after 11pm, no shoes inside, etc."
                      value={rules}
                      onChange={e => setRules(e.target.value.slice(0, 150))}
                    />
                    <div className="cl-char-count">{rules.length}/150</div>
                  </div>
                </div>

                {/* ── Lifestyle ── */}
                <div className="crl-form-section">
                  <h2 className="crp-section-title">Lifestyle</h2>
                  <p className="crp-section-sub">Help others know you better. Select the option that best describes you.</p>

                  <div className="crp-lifestyle-grid">
                    {LIFESTYLE.map(row => (
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

              </div>
            </div>

            {/* Right Column */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>
              <div className="cl-card crl-preview-card">
                <h3 className="cl-card__title" style={{ marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  Listing Preview
                </h3>
                <div className="crl-preview">
                  <div className="crl-preview__img-wrap">
                    <div className="crl-preview__img-placeholder" style={{ background: '#e8f5e9' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.5" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </div>
                    <button type="button" className="crl-preview__heart" aria-label="Save">
                      <svg viewBox="0 0 24 24" fill="#e05252" stroke="#e05252" strokeWidth="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  </div>
                  <div className="crl-preview__body">
                    <div className="crl-preview__title">Room in Shared Apartment</div>
                    <div className="crl-preview__price">€650<span>/month</span></div>
                    <div className="crl-preview__location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      De Pijp, Amsterdam
                    </div>
                    <div className="crl-preview__tags">
                      <span className="crl-preview__tag">Furnished</span>
                      <span className="crl-preview__tag">Wi-Fi</span>
                      <span className="crl-preview__tag">Bills included</span>
                    </div>
                    <div className="crl-preview__avail">Available from 15 June</div>
                    <div className="crl-preview__host">
                      <div className="crl-preview__avatar">A</div>
                      <div className="crl-preview__host-info">
                        <span className="crl-preview__host-name">Anna</span>
                        <span className="crl-preview__host-badge">Verified host</span>
                      </div>
                      <button type="button" className="crl-preview__details-link">View details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cl-card crl-tip-card">
                <div className="crl-tip">
                  <div className="crl-tip__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f4b942" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span className="crl-tip__sparkles">✨</span>
                  </div>
                  <p className="crl-tip__text">Tip</p>
                  <p className="crl-tip__desc">A complete profile gets more responses. Add details in the next step!</p>
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
