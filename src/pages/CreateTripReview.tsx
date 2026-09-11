import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ITINERARY = [
  { day: 'Day 1', title: 'Arrival & Meet Up', desc: 'Airport pickup, check-in and get to know each other', location: 'Vienna → Hallstatt' },
  { day: 'Day 2', title: 'City Exploration', desc: 'Walking tour, local food & hidden gems', location: 'Hallstatt' },
  { day: 'Day 3', title: 'Scenic Adventure', desc: 'Hiking and nature exploration', location: 'Dachstein Mountains' },
  { day: 'Day 4', title: 'Chill & Departure', desc: 'Free time, goodbyes and departure', location: 'Hallstatt → Vienna' },
]

const SUMMARY_ROWS = [
  { label: 'Trip Title', value: 'Austrian Alps Getaway' },
  { label: 'Trip Type', value: 'Group Trip' },
  { label: 'Start Date', value: '24 May 2025' },
  { label: 'End Date', value: '28 May 2025' },
  { label: 'Duration', value: '4 Days' },
  { label: 'Budget (Per Person)', value: '€150' },
  { label: 'Location / Meeting Point', value: 'Vienna Airport' },
  { label: 'Photos', value: '6 Photos' },
  { label: 'Itinerary Days', value: '4 Days' },
]

const PHOTO_COLORS = ['#c8dfc8', '#d4cbe8', '#c8d4e0', '#e0d4c8', '#c8e0d4']

export default function CreateTripReview() {
  const navigate = useNavigate()
  const step1Route = '/profile/post/trip'
  const step2Route = '/profile/post/trip/photos'

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* Hero / Steps */}
        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post/trip">Trip</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Post a Trip</h1>
              <p className="cl-hero__sub">Share your adventure and find travel companions across Europe.</p>
            </div>

            <div className="cl-steps">
              {/* Step 1 done */}
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Trip Details</span>
                  <span className="cl-step__sub">Where are you going?</span>
                </div>
              </div>

              <div className="cl-steps__line cl-steps__line--done" />

              {/* Step 2 done */}
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Photos &amp; Itinerary</span>
                  <span className="cl-step__sub">Show what's included</span>
                </div>
              </div>

              <div className="cl-steps__line cl-steps__line--done" />

              {/* Step 3 active */}
              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
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

              {/* Review header */}
              <div style={{ padding: '8px 20px' }}>
                <div className="crv-review-header">
                  <div>
                    <h2 className="crv-review-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                      Review Your Trip
                    </h2>
                    <p className="crv-review-sub">Please review all details before publishing your trip.</p>
                  </div>
                  <button type="button" className="crv-edit-all-btn" onClick={() => navigate(step1Route)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Trip Details
                  </button>
                </div>
              </div>

              {/* Trip Preview Card */}
              <div style={{ padding: '0 20px' }}>
                <div className="tr-preview-card">

                  {/* Photos + Info Row */}
                  <div className="tr-preview-top">

                    {/* Photo Mosaic */}
                    <div className="tr-photo-mosaic">
                      <div className="tr-mosaic-left">
                        <div className="tr-photo tr-photo--tall" style={{ background: PHOTO_COLORS[0] }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" width="28" height="28" style={{ opacity: 0.5 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      </div>
                      <div className="tr-mosaic-right">
                        <div className="tr-photo tr-photo--sm" style={{ background: PHOTO_COLORS[1] }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" width="20" height="20" style={{ opacity: 0.5 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                        <div className="tr-mosaic-right-bottom">
                          <div className="tr-photo tr-photo--xs" style={{ background: PHOTO_COLORS[2] }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" width="16" height="16" style={{ opacity: 0.5 }}>
                              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                          <div className="tr-photo tr-photo--xs tr-photo--more" style={{ background: PHOTO_COLORS[3] }}>
                            <span>+3</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trip Info */}
                    <div className="tr-trip-info">
                      <h3 className="tr-trip-title">Austrian Alps Getaway 🏔️</h3>
                      <div className="tr-meta-list">
                        <div className="tr-meta-row">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          <span>Hallstatt, Austria</span>
                        </div>
                        <div className="tr-meta-row">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          <span>24 – 28 May 2025 <span className="tr-meta-muted">(4 Days)</span></span>
                        </div>
                        <div className="tr-meta-row">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                          <span>Group Trip <span className="tr-meta-muted">(2–6 people)</span></span>
                        </div>
                        <div className="tr-meta-row">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                          <span>€150 <span className="tr-meta-muted">per person</span></span>
                        </div>
                        <div className="tr-meta-row">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                          <span>Vienna Airport → Hallstatt</span>
                        </div>
                      </div>
                      <p className="tr-trip-desc">
                        Explore the stunning beauty of Austrian Alps! Crystal clear lakes, charming villages, hiking trails and unforgettable memories. All details in the itinerary.
                      </p>
                    </div>

                  </div>

                  {/* Itinerary */}
                  <div className="tr-itinerary">
                    <h4 className="tr-itinerary__heading">Itinerary Overview</h4>
                    <div className="tr-itinerary__list">
                      {ITINERARY.map((item, i) => (
                        <div key={i} className={`tr-day-row${i === ITINERARY.length - 1 ? ' tr-day-row--last' : ''}`}>
                          <div className="tr-day-label">
                            <svg viewBox="0 0 24 24" fill="#5dae61" width="12" height="12" style={{ marginBottom: 1 }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                            {item.day}
                          </div>
                          <div className="tr-day-title">{item.title}</div>
                          <div className="tr-day-desc">{item.desc}</div>
                          <div className="tr-day-loc">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="11" height="11"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            {item.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Guidelines Banner */}
                  <div className="tr-guidelines-banner">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="22" height="22" style={{ flexShrink: 0 }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                    <p className="tr-guidelines-text">
                      By publishing, you agree to our community guidelines and safety policies.
                    </p>
                    <a href="#" className="tr-guidelines-link">View Community Guidelines →</a>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>

              {/* Trip Summary */}
              <div className="cl-card tr-summary-card">
                <h3 className="cl-card__title" style={{ marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Trip Summary
                </h3>
                {SUMMARY_ROWS.map((row, i) => (
                  <div key={i} className={`tr-summary-row${i === SUMMARY_ROWS.length - 1 ? ' tr-summary-row--last' : ''}`}>
                    <span className="tr-summary-label">{row.label}</span>
                    <span className="tr-summary-value">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Travel Safe Card */}
              <div className="cl-card tr-safety-sidebar">
                <div className="tr-safety-sidebar__top">
                  <div className="tr-safety-sidebar__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="22" height="22">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="tr-safety-sidebar__title">Travel Safe, Travel Smart</h4>
                    <p className="tr-safety-sidebar__desc">We review all trips to keep our community safe and trustworthy.</p>
                  </div>
                </div>
                <a href="#" className="tr-safety-sidebar__link">Read our safety guidelines →</a>
              </div>

              {/* Pricing Card */}
              <div className="cl-card tr-pricing-card">
                <div className="tr-pricing-row">
                  <span className="tr-pricing-label">Your Listing</span>
                  <span className="tr-pricing-val">€ 1.00</span>
                </div>
                <div className="tr-pricing-row">
                  <span className="tr-pricing-label">Listing Fee</span>
                  <span className="tr-pricing-val">€ 1.00</span>
                </div>
                <div className="tr-pricing-divider" />
                <div className="tr-pricing-row tr-pricing-row--total">
                  <span className="tr-pricing-label--total">Total</span>
                  <span className="tr-pricing-val--total">€ 1.00</span>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
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
                <button type="button" className="cl-back-btn" onClick={() => navigate(step2Route)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={() => navigate('/profile')}>
                  Publish Listing
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
