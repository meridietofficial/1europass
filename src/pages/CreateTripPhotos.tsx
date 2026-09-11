import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MAX_PHOTOS = 15

const DEFAULT_DAYS = [
  { title: 'Day 1 - Arrival & Meet Up', desc: 'Airport pickup, check-in and get to know each other' },
  { title: 'Day 2 - City Exploration', desc: 'Walking tour, local food & hidden gems' },
  { title: 'Day 3 - Scenic Adventure', desc: 'Hiking and nature exploration' },
  { title: 'Day 4 - Chill & Departure', desc: 'Free time, goodbyes and departure' },
]

const TIPS = [
  'Add clear and attractive photos',
  'Include a detailed day-wise plan',
  'Mention inclusions & exclusions',
  'Be transparent about budget',
  'Share important notes for travelers',
]

interface DayItem {
  id: number
  title: string
  desc: string
  expanded: boolean
}

let dayCounter = DEFAULT_DAYS.length + 1

export default function CreateTripPhotos() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [days, setDays] = useState<DayItem[]>(
    DEFAULT_DAYS.map((d, i) => ({ id: i + 1, title: d.title, desc: d.desc, expanded: false }))
  )
  const [newDayTitle, setNewDayTitle] = useState('')

  function addPhotos(files: FileList | null) {
    if (!files) return
    const imgs = Array.from(files).filter(f => f.type.startsWith('image/'))
    setPhotos(prev => [...prev, ...imgs.map(f => ({ file: f, url: URL.createObjectURL(f) }))].slice(0, MAX_PHOTOS))
  }

  function removePhoto(i: number) {
    setPhotos(prev => { URL.revokeObjectURL(prev[i].url); return prev.filter((_, idx) => idx !== i) })
  }

  function addDay() {
    const n = dayCounter++
    setDays(prev => [...prev, { id: n, title: `Day ${n} - New Day`, desc: '', expanded: true }])
  }

  function removeDay(id: number) { setDays(prev => prev.filter(d => d.id !== id)) }

  function toggleDay(id: number) { setDays(prev => prev.map(d => d.id === id ? { ...d, expanded: !d.expanded } : d)) }

  function updateDay(id: number, field: 'title' | 'desc', val: string) {
    setDays(prev => prev.map(d => d.id === id ? { ...d, [field]: val } : d))
  }

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* ─── Hero ─── */}
        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post/trip">Trip</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Photos &amp; Itinerary</span>
              </nav>
              <h1 className="cl-hero__title">Post a Trip</h1>
              <p className="cl-hero__sub">Share your adventure and find travel buddies!</p>
            </div>

            <div className="cl-steps">
              {/* Step 1 done */}
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Trip Details</span>
                  <span className="cl-step__sub">Tell us about your trip.</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done"/>
              {/* Step 2 active */}
              <div className="cl-step is-active">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Photos &amp; Itinerary</span>
                  <span className="cl-step__sub">Show what students can expect.</span>
                </div>
              </div>
              <div className="cl-steps__line"/>
              {/* Step 3 */}
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; publish</span>
                  <span className="cl-step__sub">Check everything and go live.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-card">
          <div className="cl-body">
            <div className="cl-left">
              <div className="crl-form-body">
                <div className="crl-form-section">

                  {/* Page heading */}
                  <h2 className="tp-section-heading">Photos &amp; Itinerary</h2>

                  {/* ── Trip Photos ── */}
                  <div style={{ marginBottom: 32 }}>
                    <div className="tp-row-header">
                      <div>
                        <h3 className="cl-card__title" style={{ marginBottom: 4 }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                          </svg>
                          Trip Photos *
                        </h3>
                        <p className="cl-card__sub">Upload high-quality photos to attract more travelers.</p>
                      </div>
                      <span className="tp-photo-count">{photos.length} / {MAX_PHOTOS} photos added</span>
                    </div>

                    <div className="tp-photo-grid">
                      {/* Drop zone — always first */}
                      <div
                        className={`tp-dropzone${dragOver ? ' is-drag' : ''}`}
                        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); addPhotos(e.dataTransfer.files) }}
                        onClick={() => fileRef.current?.click()}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.5" width="36" height="36">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span className="tp-dropzone__title">Drag &amp; drop photos<br/>here</span>
                        <span className="tp-dropzone__or">or <span className="tp-dropzone__browse">click to browse</span></span>
                        <span className="tp-dropzone__hint">You can add up to {MAX_PHOTOS} photos<br/>JPG, PNG up to 10MB each</span>
                        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => { addPhotos(e.target.files); e.target.value = '' }}/>
                      </div>

                      {/* Uploaded photos */}
                      {photos.map((p, i) => (
                        <div key={i} className="tp-photo-thumb">
                          <img src={p.url} alt={`Trip photo ${i + 1}`} className="tp-photo-thumb__img"/>
                          <button type="button" className="tp-photo-thumb__remove" onClick={() => removePhoto(i)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                              <path d="M18 6 6 18M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                      ))}

                      {/* Add more slot */}
                      {photos.length > 0 && photos.length < MAX_PHOTOS && (
                        <button type="button" className="tp-add-more" onClick={() => fileRef.current?.click()}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" width="28" height="28">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span>Add more photos</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Itinerary / Plan ── */}
                  <div>
                    <div className="tp-row-header">
                      <div>
                        <h3 className="cl-card__title" style={{ marginBottom: 4 }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                          </svg>
                          Itinerary / Plan *
                        </h3>
                        <p className="cl-card__sub">Add your day-wise itinerary to help travelers know what to expect.</p>
                      </div>
                      <button type="button" className="tp-add-day-btn" onClick={addDay}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add Day
                      </button>
                    </div>

                    <div className="tp-days-list">
                      {days.map(day => (
                        <div key={day.id} className="tp-day-row">
                          <div className="tp-day-card">
                            <span className="tp-day-drag">
                              <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" width="14" height="14">
                                <line x1="9" y1="5" x2="9" y2="19"/><line x1="15" y1="5" x2="15" y2="19"/>
                              </svg>
                            </span>
                            <div className="tp-day-body">
                              {day.expanded ? (
                                <>
                                  <input
                                    className="tp-day-title-input"
                                    type="text"
                                    value={day.title}
                                    onChange={e => updateDay(day.id, 'title', e.target.value)}
                                    placeholder="Day title..."
                                  />
                                  <input
                                    className="tp-day-desc-input"
                                    type="text"
                                    value={day.desc}
                                    onChange={e => updateDay(day.id, 'desc', e.target.value)}
                                    placeholder="Brief description..."
                                  />
                                </>
                              ) : (
                                <>
                                  <span className="tp-day-title">{day.title}</span>
                                  <span className="tp-day-desc">{day.desc}</span>
                                </>
                              )}
                            </div>
                            <button type="button" className="tp-day-chevron" onClick={() => toggleDay(day.id)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="16" height="16"
                                style={{ transform: day.expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                <polyline points="6 9 12 15 18 9"/>
                              </svg>
                            </button>
                          </div>
                          <button type="button" className="tp-day-del" onClick={() => removeDay(day.id)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" width="15" height="15">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ─── Right sidebar ─── */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>

              {/* Tips for a Great Trip */}
              <div className="cl-card bsl-tips-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2" width="17" height="17">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Tips for a Great Trip
                </h3>
                <div className="bsl-tips-list">
                  {TIPS.map(tip => (
                    <div key={tip} className="bsl-tip-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Safety First */}
              <div className="cl-card" style={{ background: '#f3f0fc', border: '1.5px solid #e2ddf5' }}>
                <h3 className="cl-card__title" style={{ marginBottom: 10 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                  Travel Safety First
                </h3>
                <p className="cl-card__sub" style={{ marginBottom: 14 }}>Safety is our priority. Please follow our travel guidelines and meet in public places.</p>
                <button type="button" className="trip-outline-btn">View Safety Tips →</button>
              </div>

              {/* Need Inspiration */}
              <div className="cl-card" style={{ background: '#f0faf0', border: '1.5px solid #c8e6c9' }}>
                <h3 className="cl-card__title" style={{ marginBottom: 10 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Need Inspiration?
                </h3>
                <p className="cl-card__sub" style={{ marginBottom: 14 }}>Check out popular trips and get ideas for your next adventure.</p>
                <button type="button" className="trip-outline-btn">Explore Trips →</button>
              </div>

              <p className="trip-guidelines-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="13" height="13" style={{ display: 'inline', marginRight: 4 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Have questions? Read our{' '}
                <a href="#" className="trip-guidelines-link__a">listing guidelines →</a>
              </p>

            </div>
          </div>

          {/* Footer */}
          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post/trip')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={() => navigate('/profile/post/trip/review')}>
                  Publish Listing
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              <p className="cl-footer-bar__note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" style={{ display: 'inline', marginRight: 3 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
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
