import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HOW_IT_WORKS = [
  'Students will find your listing',
  'They send you a chat request',
  'You discuss and confirm details',
  'Share contact only after mutual consent',
]

function EditBtn({ to }: { to: string }) {
  const navigate = useNavigate()
  return (
    <button type="button" className="crv-edit-btn" onClick={() => navigate(to)}>Edit</button>
  )
}

function ReviewRow({ icon, title, editTo, children, last }: {
  icon: React.ReactNode
  title: string
  editTo: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className={`crv-row${last ? ' crv-row--last' : ''}`}>
      <div className="crv-row__icon">{icon}</div>
      <div className="crv-row__content">
        <div className="crv-row__head">
          <h3 className="crv-row__title">{title}</h3>
          <EditBtn to={editTo} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default function CreateTutorReview() {
  const navigate = useNavigate()
  const [autoTranslate, setAutoTranslate] = useState(true)

  const step1Route = '/profile/post/tutor'
  const step2Route = '/profile/post/tutor/course-details'

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
                <Link to="/profile/post/tutor">Tutor</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
            </div>

            <div className="cl-steps">
              {/* Step 1 done */}
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Basic Info</span>
                  <span className="cl-step__sub">What are you tutoring?</span>
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
                    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Course Details</span>
                  <span className="cl-step__sub">What will u cover?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              {/* Step 3 active */}
              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
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
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      Review Your Listing
                    </h2>
                    <p className="crv-review-sub">Please check all details before publishing. You can go back to edit if needed.</p>
                  </div>
                  <button type="button" className="crv-edit-all-btn" onClick={() => navigate(step1Route)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit All
                  </button>
                </div>
              </div>

              <div style={{ padding: '0 20px' }} className="crv-sections">

                {/* Basic Information */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/></svg>}
                  title="Basic Information"
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">English Speaking Mastery</p>
                  <p className="crv-row__detail">Category: Languages • Subcategory: English Language</p>
                </ReviewRow>

                {/* Course Details */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                  title="Course Details"
                  editTo={step2Route}
                >
                  <p className="crv-row__detail">A practical course to help you speak English confidently in everyday conversations and professional situations.</p>
                  <div className="crv-tags-wrap" style={{ marginTop: 6 }}>
                    {['Speak confidently in everyday conversations', 'Improve grammar and vocabulary', 'Write professional emails'].map(tag => (
                      <span key={tag} className="crv-tag">✓ {tag}</span>
                    ))}
                  </div>
                </ReviewRow>

                {/* Teaching & Schedule */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                  title="Teaching &amp; Schedule"
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">Mode: Online (Live Classes) • Level: Beginner</p>
                  <p className="crv-row__detail">Duration: 8 Hours / 4 Weeks • Schedule: Mon, Wed, Fri – 7:00 PM to 8:30 PM (CET)</p>
                </ReviewRow>

                {/* Curriculum / Outline */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>}
                  title="Curriculum / Outline"
                  editTo={step2Route}
                >
                  <div className="crv-tags-wrap">
                    {['Introduction', 'Basic Concepts', 'Key Techniques', 'Practice & Assignments', 'Final Project / Test'].map(mod => (
                      <span key={mod} className="crv-tag">{mod}</span>
                    ))}
                  </div>
                </ReviewRow>

                {/* Price & Seats */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
                  title="Price &amp; Seats"
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">€10 • One-time Payment • Max 30 Students</p>
                </ReviewRow>

                {/* Additional Information */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  title="Additional Information"
                  editTo={step1Route}
                  last
                >
                  <p className="crv-row__detail">Language: English • Materials: PDF Notes, Worksheets, Certificates</p>
                  <p className="crv-row__detail">Students will get: Certificate, Course material, Recordings</p>
                </ReviewRow>

              </div>

              {/* Privacy notice */}
              <div style={{ padding: '8px 20px' }}>
                <div className="crv-privacy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="28" height="28" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                  </svg>
                  <div>
                    <p className="crv-privacy__title">Your Privacy is Protected</p>
                    <p className="crv-privacy__desc">Your phone number will never be shown publicly.<br />Students will contact you through in-app chat first.</p>
                  </div>
                </div>
              </div>

              {/* Action cards */}
              <div style={{ padding: '8px 20px' }}>
                <div className="crv-action-cards">
                  <div className="crv-action-card">
                    <div className="crv-action-card__icon crv-action-card__icon--shield">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                    </div>
                    <h4 className="crv-action-card__title">Verify Yourself <span className="crv-action-card__badge">Optional</span></h4>
                    <p className="crv-action-card__desc">Get a verified badge to build trust and get more enquiries.</p>
                    <button type="button" className="crv-action-card__btn">Verify Now</button>
                  </div>

                  <div className="crv-action-card">
                    <div className="crv-action-card__icon crv-action-card__icon--draft">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                    </div>
                    <h4 className="crv-action-card__title">Save as Draft</h4>
                    <p className="crv-action-card__desc">You can save and continue later.</p>
                    <button type="button" className="crv-action-card__btn">Save Draft</button>
                  </div>

                  <div className="crv-action-card">
                    <div className="crv-action-card__icon crv-action-card__icon--globe">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    </div>
                    <h4 className="crv-action-card__title">Auto Translate</h4>
                    <p className="crv-action-card__desc">Your listing will be automatically translated to 15+ languages.</p>
                    <label className="cl-switch" style={{ marginTop: 6 }}>
                      <input type="checkbox" checked={autoTranslate} onChange={e => setAutoTranslate(e.target.checked)} />
                      <span className="cl-switch__track" />
                    </label>
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
                  <div className="crl-preview__img-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" width="36" height="36">
                      <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/>
                    </svg>
                  </div>
                  <div className="crl-preview__body">
                    <div className="crl-preview__title">English Speaking Mastery</div>
                    <div className="crl-preview__price">€10<span>/one-time</span></div>
                    <div className="crl-preview__location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      Online • English
                    </div>
                    <div className="crl-preview__tags">
                      <span className="crl-preview__tag">Beginner</span>
                      <span className="crl-preview__tag">Live Classes</span>
                      <span className="crl-preview__tag">Certificate</span>
                    </div>
                    <div className="crl-preview__avail">Starts anytime • 8 hrs / 4 weeks</div>
                  </div>
                </div>
              </div>

              <div className="cl-card crv-how-card">
                <div className="crv-how__illustration">
                  <div className="crv-how__bubble crv-how__bubble--1">Can I join your class? 📚</div>
                  <div className="crv-how__bubble crv-how__bubble--2">Sure! Let's chat in the app.</div>
                  <div className="crv-how__bubble crv-how__bubble--3">Share contact after mutual consent</div>
                  <div className="crv-how__emoji-row"><span>👤</span><span>📱</span><span>🎓</span><span>✅</span></div>
                </div>
                <h4 className="crv-how__title">How it works after publishing?</h4>
                <ul className="crv-how__list">
                  {HOW_IT_WORKS.map(item => (
                    <li key={item} className="crv-how__item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
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
                <button type="button" className="cl-back-btn" onClick={() => navigate(step2Route)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={() => navigate('/profile')}>
                  Publish listing
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
