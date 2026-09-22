import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Photo { id: number; url: string; sort_order: number }

interface ListingDetail {
  id: string
  title: string
  description: string | null
  condition: string
  price: number
  is_free: number
  city: string | null
  country: string | null
  status: string
  category_name: string | null
  subcategory_name: string | null
  full_name: string | null
  member_since: string | null
  created_at: string
  photos: Photo[]
}

interface RelatedListing {
  id: string
  title: string
  price: number
  is_free: number
  condition: string
  city: string | null
  country: string | null
  cover_photo: string | null
  created_at: string
}

const CONDITION_LABEL: Record<string, string> = {
  'new': 'New', 'like-new': 'Like New', 'good': 'Good', 'fair': 'Fair', 'used': 'Used',
}

const CONDITION_COLOR: Record<string, string> = {
  'new': '#5dae61', 'like-new': '#5dae61', 'good': '#f0a500', 'fair': '#e87d00', 'used': '#9ca3af',
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60) || 1}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return `${Math.floor(diff / 604800)}w ago`
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: Photo[]; index: number
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

  const photo = photos[index]
  return (
    <div className="hd__lightbox" onClick={onClose}>
      <button className="hd__lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
      {photos.length > 1 && (
        <button className="hd__lightbox-prev" onClick={e => { e.stopPropagation(); onPrev() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}
      <img key={photo.url} src={photo.url} alt="" className="hd__lightbox-img" onClick={e => e.stopPropagation()} />
      {photos.length > 1 && (
        <button className="hd__lightbox-next" onClick={e => { e.stopPropagation(); onNext() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}
      <div className="hd__lightbox-counter">{index + 1} / {photos.length}</div>
    </div>
  )
}

function GalleryCell({ url, index, onOpen, extra }: {
  url: string; index: number; onOpen: (i: number) => void; extra?: number
}) {
  return (
    <div
      className="hd__gcell"
      style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={() => onOpen(index)}
    >
      {extra !== undefined && extra > 0 && (
        <div className="hd__gcell-overlay"><span>+{extra} more</span></div>
      )}
    </div>
  )
}

function Gallery({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  const n = photos.length
  if (n === 0) return (
    <div className="hd__gallery-wrap">
      <div className="hd__gallery hd__gallery--1">
        <div className="hd__gcell" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" width="48" height="48">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <div className="hd__gallery-wrap">
      {n === 1 && (
        <div className="hd__gallery hd__gallery--1">
          <GalleryCell url={photos[0].url} index={0} onOpen={onOpen} />
        </div>
      )}
      {n === 2 && (
        <div className="hd__gallery hd__gallery--2">
          <GalleryCell url={photos[0].url} index={0} onOpen={onOpen} />
          <GalleryCell url={photos[1].url} index={1} onOpen={onOpen} />
        </div>
      )}
      {n === 3 && (
        <div className="hd__gallery hd__gallery--3">
          <GalleryCell url={photos[0].url} index={0} onOpen={onOpen} />
          <div className="hd__gallery-col">
            <GalleryCell url={photos[1].url} index={1} onOpen={onOpen} />
            <GalleryCell url={photos[2].url} index={2} onOpen={onOpen} />
          </div>
        </div>
      )}
      {n === 4 && (
        <div className="hd__gallery hd__gallery--4">
          <GalleryCell url={photos[0].url} index={0} onOpen={onOpen} />
          <GalleryCell url={photos[1].url} index={1} onOpen={onOpen} />
          <GalleryCell url={photos[2].url} index={2} onOpen={onOpen} />
          <GalleryCell url={photos[3].url} index={3} onOpen={onOpen} />
        </div>
      )}
      {n >= 5 && (
        <div className="hd__gallery hd__gallery--5">
          <GalleryCell url={photos[0].url} index={0} onOpen={onOpen} />
          <div className="hd__gallery-grid2">
            <GalleryCell url={photos[1].url} index={1} onOpen={onOpen} />
            <GalleryCell url={photos[2].url} index={2} onOpen={onOpen} />
            <GalleryCell url={photos[3].url} index={3} onOpen={onOpen} />
            <GalleryCell url={photos[4].url} index={4} onOpen={onOpen} extra={n > 5 ? n - 5 : 0} />
          </div>
        </div>
      )}
      <button className="hd__gallery-all-btn" onClick={() => onOpen(0)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
        Show all {n} photo{n !== 1 ? 's' : ''}
      </button>
    </div>
  )
}

export default function BuySellDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [listing, setListing] = useState<ListingDetail | null>(null)
  const [related, setRelated] = useState<RelatedListing[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [saved, setSaved] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    apiGet<{ data: ListingDetail }>(ENDPOINTS.marketplace.view(id))
      .then(res => setListing(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))

    apiGet<{ data: RelatedListing[] }>(ENDPOINTS.marketplace.list)
      .then(res => setRelated(res.data.filter(l => l.id !== id).slice(0, 4)))
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

  const photos = listing.photos ?? []
  const condLabel = CONDITION_LABEL[listing.condition] ?? listing.condition
  const condColor = CONDITION_COLOR[listing.condition] ?? '#9ca3af'
  const location = [listing.city, listing.country].filter(Boolean).join(', ')
  const sellerName = listing.full_name ?? 'Seller'
  const sellerInitial = sellerName.charAt(0).toUpperCase()
  const memberSince = listing.member_since
    ? new Date(listing.member_since).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : ''

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* ── Hero section ── */}
        <div className="hd__hero-section">

          {/* Breadcrumb */}
          <div className="hd__top-row">
            <nav className="hd__breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/buy-sell">Buy &amp; Sell</Link>
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
            {location && <span>📍 {location}</span>}
            <span className="hd__meta-dot">·</span>
            <span>{timeAgo(listing.created_at)}</span>
          </div>

          {/* Chips */}
          <div className="hd__chips">
            <span className="hd__chip" style={{ background: condColor + '18', color: condColor }}>{condLabel}</span>
            {listing.category_name && <span className="hd__chip">{listing.category_name}</span>}
            {listing.subcategory_name && <span className="hd__chip">{listing.subcategory_name}</span>}
            {listing.is_free ? <span className="hd__chip" style={{ background: '#e8f5e9', color: '#5dae61' }}>Free</span> : null}
          </div>

          {/* Gallery */}
          <Gallery photos={photos} onOpen={i => { setLightboxIndex(i); setLightboxOpen(true) }} />

        </div>

        {/* ── White body card ── */}
        <div className="hd__body-card">
          <div className="hd__content">

            {/* ── Left column ── */}
            <div className="hd__left">

              {/* Summary */}
              <div className="hd__summary">
                <h2 className="hd__summary-title">
                  {listing.category_name ?? 'Item'}{location ? ` · ${location}` : ''}
                </h2>
                <div className="hd__summary-stats">
                  <span style={{ color: condColor, fontWeight: 700 }}>{condLabel}</span>
                  <span className="hd__dot">·</span>
                  {listing.subcategory_name && <><span>{listing.subcategory_name}</span><span className="hd__dot">·</span></>}
                  <span>Posted {timeAgo(listing.created_at)}</span>
                </div>
              </div>

              {/* Description */}
              <section className="hd__section">
                <h3 className="hd__section-title">About this item</h3>
                <p className="hd__about-text">{listing.description || 'No description provided.'}</p>
              </section>

              {/* Seller info */}
              <section className="hd__section hd__host-section">
                <div className="hd__host-info">
                  <div className="hd__host-avatar">{sellerInitial}</div>
                  <div className="hd__host-details">
                    <div className="hd__host-name">Listed by {sellerName}</div>
                    <div className="hd__host-since">
                      {memberSince ? `Member since ${memberSince}` : 'Member'}
                    </div>
                  </div>
                </div>
                <div className="hd__host-meta">
                  <div className="hd__host-meta-item">⚡ Usually responds quickly</div>
                </div>
              </section>

              {/* Item details */}
              <section className="hd__section hd__type-badges-section">
                <div className="hd__type-badge">
                  <span className="hd__type-badge-icon">🏷️</span>
                  <span className="hd__type-badge-label">{condLabel}</span>
                </div>
                {listing.category_name && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📦</span>
                    <span className="hd__type-badge-label">{listing.category_name}</span>
                  </div>
                )}
                {location && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📍</span>
                    <span className="hd__type-badge-label">{location}</span>
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
                    Meet in a public place · Inspect the item before paying · Never send money in advance
                  </p>
                </div>
              </section>

            </div>

            {/* ── Right sidebar ── */}
            <aside className="hd__sidebar">
              <div className="hd__sidebar-card">

                <div className="hd__price-row">
                  <span className="hd__price">{listing.is_free ? 'Free' : `€${Number(listing.price).toLocaleString()}`}</span>
                </div>
                <div className="hd__price-note" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ background: condColor + '18', color: condColor, fontWeight: 700, fontSize: 12, borderRadius: 20, padding: '2px 10px' }}>{condLabel}</span>
                  {listing.category_name && <span style={{ color: '#9ca3af', fontSize: 12 }}>{listing.category_name}</span>}
                </div>

                {location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', margin: '10px 0' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="13" height="13">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {location}
                  </div>
                )}

                <button className="hd__book-btn" onClick={() => setMsgOpen(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ marginRight: 6 }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Message Seller
                </button>
                <button className="hd__message-btn" onClick={() => setSaved(s => !s)}>
                  <svg viewBox="0 0 24 24" fill={saved ? '#e05252' : 'none'} stroke={saved ? '#e05252' : 'currentColor'} strokeWidth="2" width="15" height="15" style={{ marginRight: 6 }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {saved ? 'Saved' : 'Save to wishlist'}
                </button>
                <div className="hd__secure-badge">🛡️ Safe buying through 1 Euro Pass</div>

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
                    'Meet in a public place for safety',
                    'Inspect the item before paying',
                    'Ask for a receipt when possible',
                  ].map(tip => (
                    <div key={tip} className="hd__gtk-item">
                      <span className="hd__gtk-check hd__gtk-check--yes">✓</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
                <div className="hd__gtk-col">
                  {[
                    'Never pay before seeing the item',
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
                <div className="hd__verify-title">Buy safely on 1 Euro Pass</div>
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

        </div>{/* end hd__body-card */}

        {/* Related listings */}
        {related.length > 0 && (
          <div style={{ background: '#f5f4ed', padding: '32px 0' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
              <h2 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 20, color: '#1a1a1a', marginBottom: 20 }}>
                More listings you might like
              </h2>
              <div className="bsd__related-grid">
                {related.map(l => {
                  const rCondLabel = CONDITION_LABEL[l.condition] ?? l.condition
                  const rCondColor = CONDITION_COLOR[l.condition] ?? '#9ca3af'
                  const rLocation = [l.city, l.country].filter(Boolean).join(', ')
                  return (
                    <div key={l.id} className="bs__card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/buy-sell/${l.id}`)}>
                      <div className="bs__card-img-wrap">
                        {l.cover_photo
                          ? <img src={l.cover_photo} alt={l.title} className="bs__card-img" />
                          : <div className="bs__card-img" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" width="32" height="32">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                              </svg>
                            </div>
                        }
                      </div>
                      <div className="bs__card-body">
                        <span className="bs__card-price">{l.is_free ? 'Free' : `€${Number(l.price).toLocaleString()}`}</span>
                        <div className="bs__card-title-row">
                          <span className="bs__card-title">{l.title}</span>
                          <span className="bs__card-condition" style={{ color: rCondColor }}>{rCondLabel}</span>
                        </div>
                        <div className="bs__card-meta">
                          {rLocation && <span className="bs__card-location">📍 {rLocation}</span>}
                          <span className="bs__card-time">{timeAgo(l.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

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

      {/* Message modal */}
      {msgOpen && (
        <div className="bsd-modal-overlay" onClick={() => setMsgOpen(false)}>
          <div className="bsd-modal" onClick={e => e.stopPropagation()}>
            <div className="bsd-modal__header">
              <h3 className="bsd-modal__title">Message {sellerName.split(' ')[0]}</h3>
              <button className="bsd-modal__close" onClick={() => setMsgOpen(false)}>✕</button>
            </div>
            <p className="bsd-modal__item-ref">
              Re: {listing.title}{!listing.is_free ? ` — €${Number(listing.price).toLocaleString()}` : ''}
            </p>
            <textarea
              className="bsd-modal__textarea"
              rows={4}
              placeholder={`Hi ${sellerName.split(' ')[0]}, is this still available?`}
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
