import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { apiGet, apiPatch } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

const DRAFT_KEY = 'tac_draft_id'

const HOW_IT_WORKS = [
  'Students will find your listing',
  'They send you a chat request',
  'You discuss and confirm details',
  'Share contact only after mutual consent',
]

interface Listing {
  id: string
  title: string
  category: string | null
  subcategory: string | null
  teaching_mode: string | null
  language: string | null
  price: number | null
  price_freq: string
  schedule: string | null
  cover_photo: string | null
  description: string | null
  requirements: string | null
  status: string
}

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

export default function CreateTeachAndCoachReview() {
  const navigate = useNavigate()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const step1Route = '/profile/post/teach-and-coach'
  const step2Route = '/profile/post/teach-and-coach/course-details'

  useEffect(() => {
    const id = sessionStorage.getItem(DRAFT_KEY)
    if (!id) { setLoadError(true); return }
    apiGet<{ data: Listing }>(ENDPOINTS.teachAndCoach.get(id))
      .then(res => setListing(res.data))
      .catch(() => setLoadError(true))
  }, [])

  async function handlePublish() {
    const id = sessionStorage.getItem(DRAFT_KEY)
    if (!id) return
    setPublishing(true)
    try {
      await apiPatch(ENDPOINTS.teachAndCoach.status(id), { status: 'active' })
      sessionStorage.removeItem(DRAFT_KEY)
      navigate('/profile')
    } catch (e: any) {
      alert(e.message ?? 'Failed to publish')
    } finally {
      setPublishing(false)
    }
  }

  async function handleSaveDraft() {
    sessionStorage.removeItem(DRAFT_KEY)
    navigate('/profile')
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
                <Link to="/profile/post/teach-and-coach">Teach &amp; Coach</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
            </div>

            <div className="cl-steps">
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
                  <span className="cl-step__sub">What are you teaching?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
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
                  <span className="cl-step__sub">What will you cover?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
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

              {loadError && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>
                  <p>No listing found. Please go back to Step 1.</p>
                  <button className="cl-back-btn" style={{ marginTop: 16 }} onClick={() => navigate(step1Route)}>← Go to Step 1</button>
                </div>
              )}

              {!loadError && !listing && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#aaa', fontSize: 14 }}>Loading…</div>
              )}

              {listing && (
                <>
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
                      <p className="crv-row__detail" style={{ fontWeight: 600 }}>{listing.title}</p>
                      {listing.category && (
                        <p className="crv-row__detail">
                          Category: {listing.category}
                          {listing.subcategory && ` • Subcategory: ${listing.subcategory}`}
                        </p>
                      )}
                    </ReviewRow>

                    {/* Teaching & Schedule */}
                    <ReviewRow
                      icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                      title="Teaching &amp; Schedule"
                      editTo={step1Route}
                    >
                      {listing.teaching_mode && <p className="crv-row__detail">Mode: {listing.teaching_mode}</p>}
                      {listing.language && <p className="crv-row__detail">Language: {listing.language}</p>}
                      {listing.schedule && <p className="crv-row__detail">Schedule: {listing.schedule}</p>}
                    </ReviewRow>

                    {/* Price */}
                    <ReviewRow
                      icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
                      title="Price"
                      editTo={step1Route}
                    >
                      <p className="crv-row__detail">
                        {listing.price != null ? `€${listing.price}` : 'Free'} • {listing.price_freq}
                      </p>
                    </ReviewRow>

                    {/* Course Details */}
                    <ReviewRow
                      icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                      title="Course Details"
                      editTo={step2Route}
                      last={!listing.requirements}
                    >
                      {listing.cover_photo && (
                        <img src={listing.cover_photo} alt="Cover" style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                      )}
                      {listing.description
                        ? <div className="crv-row__detail" dangerouslySetInnerHTML={{ __html: listing.description }} />
                        : <p className="crv-row__detail" style={{ color: '#aaa' }}>No description added.</p>
                      }
                    </ReviewRow>

                    {/* Requirements */}
                    {listing.requirements && (
                      <ReviewRow
                        icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                        title="Requirements / Prerequisites"
                        editTo={step2Route}
                        last
                      >
                        <p className="crv-row__detail">{listing.requirements}</p>
                      </ReviewRow>
                    )}

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

                </>
              )}

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
                    {listing?.cover_photo
                      ? <img src={listing.cover_photo} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                      : <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" width="36" height="36"><path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/></svg>
                    }
                  </div>
                  <div className="crl-preview__body">
                    <div className="crl-preview__title">{listing?.title ?? '—'}</div>
                    <div className="crl-preview__price">
                      {listing?.price != null ? `€${listing.price}` : 'Free'}
                      <span>/{listing?.price_freq ?? ''}</span>
                    </div>
                    {listing?.teaching_mode && (
                      <div className="crl-preview__location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        {listing.teaching_mode}{listing.language ? ` • ${listing.language}` : ''}
                      </div>
                    )}
                    {listing?.category && (
                      <div className="crl-preview__tags">
                        <span className="crl-preview__tag">{listing.category}</span>
                        {listing.subcategory && <span className="crl-preview__tag">{listing.subcategory}</span>}
                      </div>
                    )}
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
                <button
                  type="button"
                  className="cl-next-btn"
                  style={{ background: '#fff', color: '#1a1a1a', borderColor: '#1a1a1a' }}
                  onClick={handleSaveDraft}
                  disabled={publishing}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="cl-next-btn"
                  style={{ background: '#2a8a3d' }}
                  onClick={handlePublish}
                  disabled={publishing || !listing}
                >
                  {publishing ? 'Publishing…' : 'Publish Listing'}
                  {!publishing && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
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
