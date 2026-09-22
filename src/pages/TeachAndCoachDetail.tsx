import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface ListingDetail {
  id: string
  title: string
  category: string | null
  subcategory: string | null
  teaching_mode: string | null
  language: string | null
  price: number | null
  price_freq: string | null
  schedule: string | null
  cover_photo: string | null
  description: string | null
  requirements: string | null
  full_name: string
  member_since: string | null
  created_at: string
}

interface RelatedListing {
  id: string
  title: string
  price: number | null
  price_freq: string | null
  category: string | null
  cover_photo: string | null
  full_name: string
  created_at: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Academic':             { bg: '#fff8e8', text: '#d97706' },
  'Coaching':             { bg: '#e8fff0', text: '#16a34a' },
  'Creative & Skills':    { bg: '#fff0e8', text: '#ea580c' },
  'Guidance & Mentoring': { bg: '#f0e8ff', text: '#7c3aed' },
  'Language Learning':    { bg: '#e8f4ff', text: '#2563eb' },
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60) || 1}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 604800)}w ago`
}

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)
}

export default function TeachAndCoachDetail() {
  const { id } = useParams<{ id: string }>()

  const [listing, setListing] = useState<ListingDetail | null>(null)
  const [related, setRelated] = useState<RelatedListing[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [saved, setSaved] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    apiGet<{ data: ListingDetail }>(ENDPOINTS.teachAndCoach.view(id))
      .then(res => setListing(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))

    apiGet<{ data: RelatedListing[] }>(ENDPOINTS.teachAndCoach.list)
      .then(res => setRelated(res.data.filter((l: RelatedListing) => l.id !== id).slice(0, 4)))
      .catch(() => {})
  }, [id])

  if (loading) return (
    <>
      <Navbar />
      <main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888' }}>Loading listing…</p>
      </main>
      <Footer />
    </>
  )

  if (notFound || !listing) return (
    <>
      <Navbar />
      <main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888' }}>Listing not found.</p>
      </main>
      <Footer />
    </>
  )

  const instructorName = listing.full_name ?? 'Instructor'
  const instructorInitial = getInitials(instructorName)
  const memberSince = listing.member_since
    ? new Date(listing.member_since).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : ''
  const catColors = CATEGORY_COLORS[listing.category ?? ''] ?? { bg: '#f5f5f5', text: '#555' }
  const languages = listing.language ? listing.language.split(', ').filter(Boolean) : []

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* Hero section */}
        <div className="hd__hero-section">

          {/* Breadcrumb */}
          <div className="hd__top-row">
            <nav className="hd__breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/teach-and-coach">Teach &amp; Coach</Link>
              <span>›</span>
              <span className="hd__breadcrumb-current">{listing.title}</span>
            </nav>
          </div>

          {/* Title row */}
          <div className="hd__title-row">
            <h1 className="hd__title">{listing.title}</h1>
            <div className="hd__title-actions">
              <button className={`hd__save-btn${saved ? ' hd__save-btn--active' : ''}`} onClick={() => setSaved(s => !s)}>
                ♥ Save
              </button>
              <button className="hd__share-btn">↗ Share</button>
            </div>
          </div>

          {/* Meta */}
          <div className="hd__meta">
            <span>by {instructorName}</span>
            <span className="hd__meta-dot">·</span>
            <span>{timeAgo(listing.created_at)}</span>
          </div>

          {/* Chips */}
          <div className="hd__chips">
            {listing.category && (
              <span className="hd__chip" style={{ background: catColors.bg, color: catColors.text }}>
                {listing.category}
              </span>
            )}
            {listing.subcategory && <span className="hd__chip">{listing.subcategory}</span>}
            {listing.teaching_mode && <span className="hd__chip">{listing.teaching_mode}</span>}
            {languages.map(lang => (
              <span key={lang} className="hd__chip">{lang}</span>
            ))}
          </div>

          {/* Cover photo */}
          <div className="hd__gallery-wrap">
            <div className="hd__gallery hd__gallery--1">
              {listing.cover_photo ? (
                <div
                  className="hd__gcell"
                  style={{ backgroundImage: `url(${listing.cover_photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              ) : (
                <div className="hd__gcell" style={{ background: '#e8f4f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 56, fontWeight: 800, color: '#5dae61', letterSpacing: 2 }}>
                    {instructorInitial}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* White body card */}
        <div className="hd__body-card">
          <div className="hd__content">

            {/* Left column */}
            <div className="hd__left">

              {/* Summary */}
              <div className="hd__summary">
                <h2 className="hd__summary-title">
                  {listing.subcategory ?? listing.category ?? 'Course'}
                </h2>
                <div className="hd__summary-stats">
                  {listing.teaching_mode && <><span style={{ fontWeight: 700, color: '#5dae61' }}>{listing.teaching_mode}</span><span className="hd__dot">·</span></>}
                  {listing.schedule && <><span>{listing.schedule}</span><span className="hd__dot">·</span></>}
                  <span>Posted {timeAgo(listing.created_at)}</span>
                </div>
              </div>

              {/* Description */}
              {listing.description && (
                <section className="hd__section">
                  <h3 className="hd__section-title">About this course</h3>
                  <div
                    className="hd__about-text"
                    dangerouslySetInnerHTML={{ __html: listing.description }}
                  />
                </section>
              )}

              {/* Requirements */}
              {listing.requirements && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Requirements</h3>
                  <p className="hd__about-text">{listing.requirements}</p>
                </section>
              )}

              {/* Instructor info */}
              <section className="hd__section hd__host-section">
                <div className="hd__host-info">
                  <div className="hd__host-avatar">{instructorInitial}</div>
                  <div className="hd__host-details">
                    <div className="hd__host-name">Taught by {instructorName}</div>
                    <div className="hd__host-since">
                      {memberSince ? `Member since ${memberSince}` : 'Member'}
                    </div>
                  </div>
                </div>
                <div className="hd__host-meta">
                  <div className="hd__host-meta-item">⚡ Usually responds quickly</div>
                </div>
              </section>

              {/* Details badges */}
              <section className="hd__section hd__type-badges-section">
                {listing.teaching_mode && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🖥️</span>
                    <span className="hd__type-badge-label">{listing.teaching_mode}</span>
                  </div>
                )}
                {listing.category && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📚</span>
                    <span className="hd__type-badge-label">{listing.category}</span>
                  </div>
                )}
                {listing.schedule && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📅</span>
                    <span className="hd__type-badge-label">{listing.schedule}</span>
                  </div>
                )}
                {languages.length > 0 && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🌐</span>
                    <span className="hd__type-badge-label">{languages.join(', ')}</span>
                  </div>
                )}
              </section>

              {/* Safety */}
              <section className="hd__section">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="20" height="20" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                  <p style={{ fontSize: 13, color: '#166534', margin: 0, lineHeight: 1.5 }}>
                    Chat with the instructor before booking · Verify credentials · Never pay outside the platform
                  </p>
                </div>
              </section>

            </div>

            {/* Right sidebar */}
            <aside className="hd__sidebar">
              <div className="hd__sidebar-card">

                <div className="hd__price-row">
                  <span className="hd__price">
                    {listing.price != null
                      ? `€${Number(listing.price).toLocaleString()}`
                      : 'Price on request'}
                  </span>
                  {listing.price != null && listing.price_freq && (
                    <span style={{ fontSize: 14, color: '#6b7280', fontWeight: 400, marginLeft: 4 }}>
                      / {listing.price_freq}
                    </span>
                  )}
                </div>

                {listing.teaching_mode && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', margin: '8px 0 10px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="13" height="13">
                      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                    </svg>
                    {listing.teaching_mode}
                  </div>
                )}

                <button className="hd__book-btn" onClick={() => setMsgOpen(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: 6 }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Message Instructor
                </button>
                <button className="hd__message-btn" onClick={() => setSaved(s => !s)}>
                  <svg viewBox="0 0 24 24" fill={saved ? '#e05252' : 'none'} stroke={saved ? '#e05252' : 'currentColor'} strokeWidth="2" width="15" height="15" style={{ marginRight: 6 }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {saved ? 'Saved' : 'Save to wishlist'}
                </button>
                <div className="hd__secure-badge">🛡️ Safe booking through 1 Euro Pass</div>

              </div>
            </aside>

          </div>

          {/* Lower grid */}
          <div className="hd__lower-grid">
            <section className="hd__section">
              <h3 className="hd__section-title">Good to know</h3>
              <div className="hd__good-to-know">
                <div className="hd__gtk-col">
                  {[
                    'Chat with the instructor before booking',
                    'Confirm session schedule in advance',
                    'Ask about cancellation policy',
                  ].map(tip => (
                    <div key={tip} className="hd__gtk-item">
                      <span className="hd__gtk-check hd__gtk-check--yes">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
                <div className="hd__gtk-col">
                  {[
                    'Never pay outside the platform',
                    'Do not share personal bank details',
                  ].map(tip => (
                    <div key={tip} className="hd__gtk-item">
                      <span className="hd__gtk-check hd__gtk-check--no">✗</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="hd__section">
              <h3 className="hd__section-title">About this listing</h3>
              <p className="hd__about-text">Posted {timeAgo(listing.created_at)} · Listing ID: {listing.id.slice(0, 8).toUpperCase()}</p>
            </section>
          </div>

          {/* Verify bar */}
          <div className="hd__verify-bar">
            <div className="hd__verify-badge">
              <div className="hd__verify-shield">🛡️</div>
              <div>
                <div className="hd__verify-title">Book safely on 1 Euro Pass</div>
                <div className="hd__verify-sub">We verify student listings to keep the marketplace safe and trustworthy.</div>
              </div>
            </div>
            <div className="hd__verify-checks">
              <div className="hd__verify-check">✓ Student verified</div>
              <div className="hd__verify-check">✓ Listing reviewed</div>
              <div className="hd__verify-check">✓ Secure messaging</div>
            </div>
          </div>

          <div className="hd__report">
            <button className="hd__report-btn">🚩 Something doesn't look right? Report this listing</button>
          </div>

        </div>

        {/* Related listings */}
        {related.length > 0 && (
          <div style={{ background: '#f5f4ed', padding: '32px 0' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
              <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 20, color: '#1a1a1a', marginBottom: 20 }}>
                More instructors you might like
              </h2>
              <div className="bsd__related-grid">
                {related.map(l => {
                  const rColors = CATEGORY_COLORS[l.category ?? ''] ?? { bg: '#f5f5f5', text: '#555' }
                  return (
                    <Link key={l.id} to={`/teach-and-coach/${l.id}`} style={{ textDecoration: 'none' }}>
                      <div className="bs__card" style={{ cursor: 'pointer' }}>
                        <div className="bs__card-img-wrap">
                          {l.cover_photo
                            ? <img src={l.cover_photo} alt={l.title} className="bs__card-img" />
                            : <div className="bs__card-img" style={{ background: '#e8f4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#5dae61' }}>
                                {getInitials(l.full_name)}
                              </div>
                          }
                        </div>
                        <div className="bs__card-body">
                          <span className="bs__card-price">
                            {l.price != null ? `€${Number(l.price).toLocaleString()}` : 'On request'}
                            {l.price != null && l.price_freq ? ` / ${l.price_freq}` : ''}
                          </span>
                          <div className="bs__card-title-row">
                            <span className="bs__card-title">{l.title}</span>
                            {l.category && (
                              <span style={{ fontSize: 11, fontWeight: 600, background: rColors.bg, color: rColors.text, borderRadius: 20, padding: '1px 8px' }}>
                                {l.category}
                              </span>
                            )}
                          </div>
                          <div className="bs__card-meta">
                            <span style={{ fontSize: 12, color: '#6b7280' }}>by {l.full_name}</span>
                            <span className="bs__card-time">{timeAgo(l.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />

      {/* Message modal */}
      {msgOpen && (
        <div className="bsd-modal-overlay" onClick={() => setMsgOpen(false)}>
          <div className="bsd-modal" onClick={e => e.stopPropagation()}>
            <div className="bsd-modal__header">
              <h3 className="bsd-modal__title">Message {instructorName.split(' ')[0]}</h3>
              <button className="bsd-modal__close" onClick={() => setMsgOpen(false)}>✕</button>
            </div>
            <p className="bsd-modal__item-ref">Re: {listing.title}</p>
            <textarea
              className="bsd-modal__textarea"
              rows={4}
              placeholder={`Hi ${instructorName.split(' ')[0]}, I'm interested in your course!`}
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
            <button className="bsd-modal__send-btn" onClick={() => { setMsgOpen(false); setMsg('') }}>
              Send Message
            </button>
          </div>
        </div>
      )}
    </>
  )
}
