import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface ItineraryDay { name: string; type: string; desc: string }

interface TripListing {
  id: string
  title: string
  destination: string | null
  trip_type: string | null
  category: string | null
  duration: string | null
  start_date: string | null
  end_date: string | null
  budget: number | null
  meeting_point: string | null
  description: string | null
  who_can_join: string[] | null
  photos: string[] | null
  itinerary: ItineraryDay[] | null
  created_at: string
  full_name: string
  member_since: string | null
}

const WHO_LABELS: Record<string, string> = {
  solo:  'Solo travelers welcome',
  group: 'Group trips',
  all:   'Open to all genders',
}

function fmt(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function fmtDateRange(s: string | null, e: string | null) {
  if (!s && !e) return '—'
  if (s && e) {
    const sd = new Date(s), ed = new Date(e)
    if (sd.getMonth() === ed.getMonth() && sd.getFullYear() === ed.getFullYear()) {
      return `${sd.getDate()}–${fmt(e)}`
    }
    return `${fmt(s)} – ${fmt(e)}`
  }
  return fmt(s || e)
}

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

/* ── Lightbox ── */
function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: string[]; index: number
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose, onPrev, onNext])

  return (
    <div className="hd__lightbox" onClick={onClose}>
      <button className="hd__lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
      {photos.length > 1 && (
        <button className="hd__lightbox-prev" onClick={e => { e.stopPropagation(); onPrev() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}
      <img src={photos[index]} alt="" className="hd__lightbox-img" onClick={e => e.stopPropagation()} />
      {photos.length > 1 && (
        <button className="hd__lightbox-next" onClick={e => { e.stopPropagation(); onNext() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}
      <div className="hd__lightbox-counter">{index + 1} / {photos.length}</div>
    </div>
  )
}

/* ── Gallery cell ── */
function GCell({ url, index, onOpen, extra }: {
  url: string; index: number; onOpen: (i: number) => void; extra?: number
}) {
  return (
    <div
      className="hd__gcell"
      style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={() => onOpen(index)}
    >
      {extra !== undefined && extra > 0 && <div className="hd__gcell-overlay"><span>+{extra} more</span></div>}
    </div>
  )
}

/* ── Gallery ── */
function Gallery({ photos, onOpen }: { photos: string[]; onOpen: (i: number) => void }) {
  const n = photos.length
  if (n === 0) return null
  return (
    <div className="hd__gallery-wrap">
      {n === 1 && <div className="hd__gallery hd__gallery--1"><GCell url={photos[0]} index={0} onOpen={onOpen} /></div>}
      {n === 2 && <div className="hd__gallery hd__gallery--2"><GCell url={photos[0]} index={0} onOpen={onOpen} /><GCell url={photos[1]} index={1} onOpen={onOpen} /></div>}
      {n === 3 && <div className="hd__gallery hd__gallery--3"><GCell url={photos[0]} index={0} onOpen={onOpen} /><div className="hd__gallery-col"><GCell url={photos[1]} index={1} onOpen={onOpen} /><GCell url={photos[2]} index={2} onOpen={onOpen} /></div></div>}
      {n === 4 && <div className="hd__gallery hd__gallery--4"><GCell url={photos[0]} index={0} onOpen={onOpen} /><GCell url={photos[1]} index={1} onOpen={onOpen} /><GCell url={photos[2]} index={2} onOpen={onOpen} /><GCell url={photos[3]} index={3} onOpen={onOpen} /></div>}
      {n >= 5 && (
        <div className="hd__gallery hd__gallery--5">
          <GCell url={photos[0]} index={0} onOpen={onOpen} />
          <div className="hd__gallery-grid2">
            <GCell url={photos[1]} index={1} onOpen={onOpen} />
            <GCell url={photos[2]} index={2} onOpen={onOpen} />
            <GCell url={photos[3]} index={3} onOpen={onOpen} />
            <GCell url={photos[4]} index={4} onOpen={onOpen} extra={n > 5 ? n - 5 : 0} />
          </div>
        </div>
      )}
      <button className="hd__gallery-all-btn" onClick={() => onOpen(0)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
        Show all {n} photo{n !== 1 ? 's' : ''}
      </button>
    </div>
  )
}

/* ── Main page ── */
export default function TripDetail() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<TripListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!id) return
    apiGet<{ success: boolean; data: TripListing }>(ENDPOINTS.trip.view(id))
      .then(res => setListing(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <><Navbar /><main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#888' }}>Loading…</p></main><Footer /></>
  )

  if (!listing) return (
    <><Navbar /><main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#888' }}>Trip not found.</p></main><Footer /></>
  )

  const photos = listing.photos ?? []
  const itinerary = listing.itinerary ?? []
  const whoCanJoin = listing.who_can_join ?? []
  const hostName = listing.full_name || 'Organiser'
  const hostInitial = getInitials(hostName)
  const memberYear = listing.member_since ? new Date(listing.member_since).getFullYear() : null

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true) }

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* ── Hero ── */}
        <div className="hd__hero-section">
          <div className="hd__top-row">
            <nav className="hd__breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/trip">Trips</Link><span>›</span>
              <span className="hd__breadcrumb-current">{listing.title}</span>
            </nav>
          </div>

          <div className="hd__title-row">
            <h1 className="hd__title">{listing.title}</h1>
            <div className="hd__title-actions">
              <button className={`hd__save-btn${saved ? ' hd__save-btn--active' : ''}`} onClick={() => setSaved(s => !s)}>♥ Save</button>
              <button className="hd__share-btn">↗ Share</button>
            </div>
          </div>

          <div className="hd__meta">
            {listing.category && <span className="hd__chip" style={{ marginRight: 6 }}>{listing.category}</span>}
            {listing.trip_type && <span className="hd__chip" style={{ marginRight: 6, background: '#f0f4ff', color: '#4a6fa5', border: '1.5px solid #d0daf5' }}>{listing.trip_type}</span>}
            {listing.destination && <><span className="hd__meta-dot">·</span><span>📍 {listing.destination}</span></>}
            {(listing.start_date || listing.end_date) && <><span className="hd__meta-dot">·</span><span>📅 {fmtDateRange(listing.start_date, listing.end_date)}</span></>}
            {listing.duration && <><span className="hd__meta-dot">·</span><span>⏱ {listing.duration}</span></>}
          </div>

          {photos.length > 0
            ? <Gallery photos={photos} onOpen={openLightbox} />
            : (
              <div style={{ height: 240, borderRadius: 16, background: 'linear-gradient(135deg,#c8efc8,#a8edea)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" width="56" height="56"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
            )
          }
        </div>

        {/* ── Body card ── */}
        <div className="hd__body-card">
          <div className="hd__content">

            {/* ── Left column ── */}
            <div className="hd__left">

              {/* Summary */}
              <div className="hd__summary">
                <h2 className="hd__summary-title">
                  {listing.trip_type || 'Trip'}{listing.destination ? ` to ${listing.destination}` : ''}
                </h2>
                <div className="hd__summary-stats">
                  {listing.duration && <><span>{listing.duration}</span><span className="hd__dot">·</span></>}
                  {itinerary.length > 0 && <><span>{itinerary.length} day itinerary</span><span className="hd__dot">·</span></>}
                  {listing.budget != null && <span className="hd__avail-pill">💶 €{listing.budget} per person</span>}
                </div>
              </div>

              {/* Description */}
              {listing.description && (
                <section className="hd__section">
                  <h3 className="hd__section-title">About this trip</h3>
                  <p className="hd__about-text" style={{ whiteSpace: 'pre-wrap' }}>{listing.description}</p>
                </section>
              )}

              {/* Host */}
              <section className="hd__section hd__host-section">
                <div className="hd__host-info">
                  <div className="hd__host-avatar">{hostInitial}</div>
                  <div className="hd__host-details">
                    <div className="hd__host-name">Organised by {hostName}</div>
                    <div className="hd__host-since">
                      {memberYear ? `Member since ${memberYear}` : 'Member'}
                    </div>
                  </div>
                </div>
                <div className="hd__host-meta" style={{ marginTop: 10 }}>
                  <div className="hd__host-meta-item">⚡ Usually responds within a few hours</div>
                </div>
              </section>

              {/* Trip detail badges */}
              <section className="hd__section hd__type-badges-section">
                {listing.trip_type && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🗺</span>
                    <span className="hd__type-badge-label">{listing.trip_type}</span>
                  </div>
                )}
                {listing.category && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🏷</span>
                    <span className="hd__type-badge-label">{listing.category}</span>
                  </div>
                )}
                {listing.duration && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">⏱</span>
                    <span className="hd__type-badge-label">{listing.duration}</span>
                  </div>
                )}
                {listing.meeting_point && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📌</span>
                    <span className="hd__type-badge-label">Meets at {listing.meeting_point}</span>
                  </div>
                )}
              </section>

              {/* Who can join */}
              {whoCanJoin.length > 0 && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Who can join</h3>
                  <div className="hd__amenities-grid">
                    {whoCanJoin.map(w => (
                      <div key={w} className="hd__amenity">
                        <span className="hd__amenity-check">✓</span>
                        <span>{WHO_LABELS[w] ?? w}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Itinerary — {itinerary.length} Day{itinerary.length !== 1 ? 's' : ''}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {itinerary.map((day, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: '#f9f9f7', borderRadius: 12, border: '1px solid #ece9e0' }}>
                        <div style={{ minWidth: 40, height: 40, background: '#5dae61', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14.5, color: '#1a1a1a', marginBottom: 4 }}>
                            {day.name || `Day ${i + 1}`}
                          </div>
                          {day.type && (
                            <span style={{ fontSize: 11.5, fontWeight: 700, background: '#edf7ee', color: '#3a8f3e', border: '1px solid #c8e6c9', borderRadius: 10, padding: '2px 10px', display: 'inline-block', marginBottom: day.desc ? 6 : 0 }}>
                              {day.type}
                            </span>
                          )}
                          {day.desc && <p style={{ margin: 0, fontSize: 13.5, color: '#555', lineHeight: 1.55 }}>{day.desc}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Meeting point */}
              {listing.meeting_point && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Meeting point</h3>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18" style={{ flexShrink: 0, marginTop: 2 }}>
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <p className="hd__about-text" style={{ margin: 0 }}>{listing.meeting_point}</p>
                  </div>
                </section>
              )}

            </div>

            {/* ── Right sidebar ── */}
            <aside className="hd__sidebar">
              <div className="hd__sidebar-card">

                {/* Price */}
                <div className="hd__price-row">
                  {listing.budget != null
                    ? <><span className="hd__price">€{listing.budget.toLocaleString()}</span><span className="hd__price-unit">/person</span></>
                    : <span className="hd__price" style={{ fontSize: 16 }}>Budget not set</span>
                  }
                </div>
                {listing.budget != null && <div className="hd__price-note">Estimated cost per traveler</div>}

                {/* Key info */}
                <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {listing.destination && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Destination</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a', textAlign: 'right', maxWidth: 150 }}>{listing.destination}</span>
                    </div>
                  )}
                  {(listing.start_date || listing.end_date) && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Dates</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a', textAlign: 'right' }}>{fmtDateRange(listing.start_date, listing.end_date)}</span>
                    </div>
                  )}
                  {listing.duration && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Duration</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.duration}</span>
                    </div>
                  )}
                  {listing.trip_type && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Trip type</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.trip_type}</span>
                    </div>
                  )}
                  {listing.meeting_point && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Meets at</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a', textAlign: 'right', maxWidth: 150 }}>{listing.meeting_point}</span>
                    </div>
                  )}
                  {itinerary.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Itinerary</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{itinerary.length} day{itinerary.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                <div className="hd__breakdown-divider" />

                <button className="hd__book-btn" style={{ marginTop: 16 }}>
                  🤝 Join this trip
                </button>
                <button className="hd__message-btn">💬 Message {hostName.split(' ')[0]}</button>
                <p className="hd__not-charged">Your contact details are never shared publicly.</p>
                <div className="hd__secure-badge">🛡️ Secure through 1 Euro Pass</div>
              </div>
            </aside>

          </div>

          {/* Verification bar */}
          <div className="hd__verify-bar">
            <div className="hd__verify-badge">
              <div className="hd__verify-shield">🛡️</div>
              <div>
                <div className="hd__verify-title">Safe &amp; Verified</div>
                <div className="hd__verify-sub">1 Euro Pass reviews all trips to keep our community safe and trustworthy.</div>
              </div>
            </div>
            <div className="hd__verify-checks">
              <div className="hd__verify-check">✓ Organiser verified</div>
              <div className="hd__verify-check">✓ Secure messaging</div>
              <div className="hd__verify-check">✓ Agreed to terms</div>
            </div>
          </div>

          <div className="hd__report">
            <button className="hd__report-btn">🚩 Something doesn't look right? Report this listing</button>
          </div>

        </div>
      </main>

      {lightboxOpen && photos.length > 0 && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex(i => (i - 1 + photos.length) % photos.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % photos.length)}
        />
      )}

      <Footer />
    </>
  )
}
