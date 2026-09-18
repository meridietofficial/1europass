import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Fix Leaflet default marker icons in Vite/webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Photo {
  id: number
  url: string
  label: string | null
  sort_order: number
}

interface Listing {
  id: string
  title: string
  status: string
  property_type: string | null
  bedrooms: number | null
  description: string | null
  full_address: string | null
  city: string | null
  country: string | null
  rent: number | null
  deposit: number | null
  size_sqm: number | null
  utilities_included: string | null
  available_now: number
  available_date: string | null
  furnished: string | null
  parking: string | null
  pets: string | null
  smoking: string | null
  gender: string | null
  elevator: string | null
  balcony: string | null
  laundry: string | null
  floor: string | null
  included_electricity: number
  included_water: number
  included_heating: number
  included_internet: number
  included_gas: number
  included_other: number
  included_other_spec: string | null
  phone_code: string | null
  phone_number: string | null
  nearby_university: string | null
  latitude: string | null
  longitude: string | null
  full_name: string | null
  member_since: string | null
  photos: Photo[]
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function computeMoveOut(moveIn: Date, months: number): Date {
  const d = new Date(moveIn)
  d.setMonth(d.getMonth() + months)
  d.setDate(d.getDate() - 1)
  return d
}

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#a8edea,#fed6e3)',
  'linear-gradient(135deg,#a2c4e0,#89b4d8)',
  'linear-gradient(135deg,#f0c4a8,#e8a880)',
  'linear-gradient(135deg,#c4dfc4,#9dc49d)',
  'linear-gradient(135deg,#e8d4a8,#d4b880)',
]

const HOW_IT_WORKS = [
  { label: 'Mon', key: 0 }, { label: 'Tue', key: 1 }, { label: 'Wed', key: 2 },
  { label: 'Thu', key: 3 }, { label: 'Fri', key: 4 }, { label: 'Sat', key: 5 }, { label: 'Sun', key: 6 },
]

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
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  const photo = photos[index]
  return (
    <div className="hd__lightbox" onClick={onClose}>
      {/* Close */}
      <button className="hd__lightbox-close" onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Prev */}
      {photos.length > 1 && (
        <button className="hd__lightbox-prev" onClick={e => { e.stopPropagation(); onPrev() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        key={photo.url}
        src={photo.url}
        alt={photo.label ?? ''}
        className="hd__lightbox-img"
        onClick={e => e.stopPropagation()}
      />

      {/* Next */}
      {photos.length > 1 && (
        <button className="hd__lightbox-next" onClick={e => { e.stopPropagation(); onNext() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}

      {/* Label */}
      {photo.label && (
        <div className="hd__lightbox-label">{photo.label}</div>
      )}

      {/* Counter */}
      <div className="hd__lightbox-counter">{index + 1} / {photos.length}</div>
    </div>
  )
}

function GalleryCell({ photo, index, onOpen, extra }: {
  photo: Photo; index: number; onOpen: (i: number) => void; extra?: number
}) {
  return (
    <div
      className="hd__gcell"
      style={{ backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={() => onOpen(index)}
    >
      {extra !== undefined && extra > 0 && (
        <div className="hd__gcell-overlay">
          <span>+{extra} more</span>
        </div>
      )}
    </div>
  )
}

function Gallery({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  const n = photos.length
  if (n === 0) return null

  return (
    <div className="hd__gallery-wrap">
      {/* 1 photo — full width */}
      {n === 1 && (
        <div className="hd__gallery hd__gallery--1">
          <GalleryCell photo={photos[0]} index={0} onOpen={onOpen} />
        </div>
      )}

      {/* 2 photos — side by side */}
      {n === 2 && (
        <div className="hd__gallery hd__gallery--2">
          <GalleryCell photo={photos[0]} index={0} onOpen={onOpen} />
          <GalleryCell photo={photos[1]} index={1} onOpen={onOpen} />
        </div>
      )}

      {/* 3 photos — large left + 2 stacked right */}
      {n === 3 && (
        <div className="hd__gallery hd__gallery--3">
          <GalleryCell photo={photos[0]} index={0} onOpen={onOpen} />
          <div className="hd__gallery-col">
            <GalleryCell photo={photos[1]} index={1} onOpen={onOpen} />
            <GalleryCell photo={photos[2]} index={2} onOpen={onOpen} />
          </div>
        </div>
      )}

      {/* 4 photos — 2×2 grid */}
      {n === 4 && (
        <div className="hd__gallery hd__gallery--4">
          <GalleryCell photo={photos[0]} index={0} onOpen={onOpen} />
          <GalleryCell photo={photos[1]} index={1} onOpen={onOpen} />
          <GalleryCell photo={photos[2]} index={2} onOpen={onOpen} />
          <GalleryCell photo={photos[3]} index={3} onOpen={onOpen} />
        </div>
      )}

      {/* 5+ photos — large left + 2×2 right */}
      {n >= 5 && (
        <div className="hd__gallery hd__gallery--5">
          <GalleryCell photo={photos[0]} index={0} onOpen={onOpen} />
          <div className="hd__gallery-grid2">
            <GalleryCell photo={photos[1]} index={1} onOpen={onOpen} />
            <GalleryCell photo={photos[2]} index={2} onOpen={onOpen} />
            <GalleryCell photo={photos[3]} index={3} onOpen={onOpen} />
            <GalleryCell photo={photos[4]} index={4} onOpen={onOpen} extra={n > 5 ? n - 5 : 0} />
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

export default function HousingDetail() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [duration, setDuration] = useState(6)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  useEffect(() => {
    if (!id) return
    apiGet<{ success: boolean; data: Listing }>(ENDPOINTS.housing.view(id))
      .then(res => setListing(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#888' }}>Loading listing…</p>
        </main>
        <Footer />
      </>
    )
  }

  if (!listing) {
    return (
      <>
        <Navbar />
        <main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#888' }}>Listing not found.</p>
        </main>
        <Footer />
      </>
    )
  }

  const photos = listing.photos ?? []
  const moveInDate = listing.available_now ? new Date() : listing.available_date ? new Date(listing.available_date) : new Date()
  const moveOut = computeMoveOut(moveInDate, duration)
  const billsIncluded = listing.utilities_included === 'included'
  const rent = Number(listing.rent ?? 0)
  const deposit = Number(listing.deposit ?? 0)
  const total = rent + deposit + 1
  const location = [listing.city, listing.country].filter(Boolean).join(', ')
  const propertyLabel = listing.property_type
    ? listing.property_type.charAt(0).toUpperCase() + listing.property_type.slice(1).replace(/_/g, ' ')
    : 'Property'
  const hostName = listing.full_name || 'Host'
  const hostInitial = hostName[0]?.toUpperCase() ?? 'H'

  // Amenities from listing fields
  const amenities: string[] = []
  if (listing.furnished === 'yes') amenities.push('Fully furnished')
  if (listing.furnished === 'partial') amenities.push('Partially furnished')
  if (listing.included_internet) amenities.push('Wi-Fi included')
  if (listing.included_electricity) amenities.push('Electricity included')
  if (listing.included_water) amenities.push('Water included')
  if (listing.included_heating) amenities.push('Heating included')
  if (listing.included_gas) amenities.push('Gas included')
  if (billsIncluded) amenities.push('Bills included')
  if (listing.parking === 'yes') amenities.push('Parking available')
  if (listing.elevator === 'yes') amenities.push('Elevator')
  if (listing.balcony === 'yes') amenities.push('Balcony')
  if (listing.laundry === 'yes') amenities.push('Washing machine')

  // "Good to know" items
  const gtkYes: string[] = []
  const gtkNo: string[] = []
  if (listing.pets === 'yes') gtkYes.push('Pets allowed'); else if (listing.pets === 'no') gtkNo.push('No pets')
  if (listing.smoking === 'yes') gtkYes.push('Smoking allowed'); else if (listing.smoking === 'no') gtkNo.push('No smoking')
  if (listing.parking === 'yes') gtkYes.push('Parking available')
  if (listing.balcony === 'yes') gtkYes.push('Balcony')
  if (listing.elevator === 'yes') gtkYes.push('Elevator')

  const availableText = listing.available_now
    ? 'Available immediately'
    : listing.available_date ? `From ${fmtDate(listing.available_date)}` : ''

  // Calendar: compute current month offset
  const calMonth = listing.available_date ? new Date(listing.available_date) : new Date()
  const calMonthName = calMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const firstDayOfMonth = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1).getDay()
  // Convert Sunday=0 to Mon-first: Mon=0..Sun=6
  const offset = (firstDayOfMonth + 6) % 7
  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate()
  const calDays: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const availDay = listing.available_date ? new Date(listing.available_date).getDate() : null

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* ── Hero section (outside white card) ── */}
        <div className="hd__hero-section">

          {/* Breadcrumb row */}
          <div className="hd__top-row">
            <nav className="hd__breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <Link to="/housing">Housing</Link>
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

          {/* Location meta */}
          <div className="hd__meta">
            {location && <span>📍 {location}</span>}
            {availableText && <><span className="hd__meta-dot">·</span><span>{availableText}</span></>}
          </div>

          {/* Chips */}
          <div className="hd__chips">
            {listing.furnished === 'yes' && <span className="hd__chip">Furnished</span>}
            {billsIncluded && <span className="hd__chip">Bills Included</span>}
            {listing.pets === 'yes' && <span className="hd__chip">Pets Allowed</span>}
          </div>

          {/* Photo gallery */}
          <Gallery
            photos={photos}
            onOpen={(i) => { setGalleryIndex(i); setGalleryOpen(true) }}
          />

        </div>{/* end hd__hero-section */}

        {/* ── White body card ── */}
        <div className="hd__body-card">

        {/* Main content + sidebar */}
        <div className="hd__content">

          {/* ── Left column ── */}
          <div className="hd__left">

            {/* Room summary */}
            <div className="hd__summary">
              <h2 className="hd__summary-title">{propertyLabel}{location ? ` in ${location}` : ''}</h2>
              <div className="hd__summary-stats">
                {listing.bedrooms && <><span>{listing.bedrooms} bedroom{listing.bedrooms > 1 ? 's' : ''}</span><span className="hd__dot">·</span></>}
                {listing.size_sqm && <><span>{listing.size_sqm} m²</span><span className="hd__dot">·</span></>}
                {listing.floor && <><span>Floor {listing.floor}</span><span className="hd__dot">·</span></>}
                {availableText && <span className="hd__avail-pill">🟢 {availableText}</span>}
              </div>
            </div>

            {/* About */}
            <section className="hd__section">
              <h3 className="hd__section-title">About this place</h3>
              <p className="hd__about-text">
                {listing.description || 'No description provided.'}
              </p>
            </section>

            {/* Host */}
            <section className="hd__section hd__host-section">
              <div className="hd__host-info">
                <div className="hd__host-avatar">{hostInitial}</div>
                <div className="hd__host-details">
                  <div className="hd__host-name">Hosted by {hostName}</div>
                  <div className="hd__host-since">
                    {listing.member_since ? `Member since ${new Date(listing.member_since).getFullYear()}` : 'Member'}
                  </div>
                </div>
              </div>
              <div className="hd__host-meta">
                <div className="hd__host-meta-item">⚡ Usually responds within a few hours</div>
              </div>
            </section>

            {/* Amenities */}
            {amenities.length > 0 && (
              <section className="hd__section">
                <h3 className="hd__section-title">What this place offers</h3>
                <div className="hd__amenities-grid">
                  {amenities.map(a => (
                    <div key={a} className="hd__amenity">
                      <span className="hd__amenity-check">✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Room type badges */}
            <section className="hd__section hd__type-badges-section">
              <div className="hd__type-badge">
                <span className="hd__type-badge-icon">🏠</span>
                <span className="hd__type-badge-label">{propertyLabel}</span>
              </div>
              {listing.size_sqm && (
                <div className="hd__type-badge">
                  <span className="hd__type-badge-icon">📐</span>
                  <span className="hd__type-badge-label">{listing.size_sqm} m²</span>
                </div>
              )}
              {listing.bedrooms && (
                <div className="hd__type-badge">
                  <span className="hd__type-badge-icon">🛏️</span>
                  <span className="hd__type-badge-label">{listing.bedrooms} bedroom{listing.bedrooms > 1 ? 's' : ''}</span>
                </div>
              )}
              {listing.floor && (
                <div className="hd__type-badge">
                  <span className="hd__type-badge-icon">🏢</span>
                  <span className="hd__type-badge-label">Floor {listing.floor}</span>
                </div>
              )}
            </section>

            {/* Where you'll live */}
            <section className="hd__section">
              <h3 className="hd__section-title">Where you'll live</h3>
              <p className="hd__about-text">{listing.full_address || location || 'Location details not provided.'}</p>
              {listing.nearby_university && (
                <div className="hd__transport">
                  <div className="hd__transport-item">
                    <span className="hd__transport-badge">🎓</span>
                    <span className="hd__transport-label">{listing.nearby_university}</span>
                  </div>
                </div>
              )}
              {listing.latitude && listing.longitude ? (
                <div style={{ height: 320, borderRadius: 12, overflow: 'hidden', marginTop: 16 }}>
                  <MapContainer
                    center={[parseFloat(listing.latitude), parseFloat(listing.longitude)]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[parseFloat(listing.latitude), parseFloat(listing.longitude)]}>
                      <Popup>{listing.full_address || listing.title}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <div className="hd__map-placeholder">
                  <div className="hd__map-streets" />
                  <div className="hd__map-pin-wrap">
                    <div className="hd__map-pin">📍 {listing.city || 'Property'}</div>
                  </div>
                </div>
              )}
            </section>

          </div>

          {/* ── Right sidebar ── */}
          <aside className="hd__sidebar">
            <div className="hd__sidebar-card">

              <div className="hd__price-row">
                <span className="hd__price">€{rent ? rent.toLocaleString() : '—'}</span>
                <span className="hd__price-unit">/month</span>
              </div>
              <div className="hd__price-note">
                {billsIncluded ? 'Bills included · ' : ''}No hidden fees
              </div>

              <div className="hd__booking-form">
                <div className="hd__booking-field">
                  <label className="hd__booking-label">MOVE-IN</label>
                  <div className="hd__booking-value">📅 {fmtDate(moveInDate.toISOString())}</div>
                </div>
                <div className="hd__booking-field hd__booking-field--select">
                  <label className="hd__booking-label">STAY DURATION</label>
                  <select className="hd__booking-select" value={duration} onChange={e => setDuration(Number(e.target.value))}>
                    <option value={3}>3 months</option>
                    <option value={4}>4 months</option>
                    <option value={5}>5 months</option>
                    <option value={6}>6 months</option>
                    <option value={9}>9 months</option>
                    <option value={12}>12 months</option>
                  </select>
                </div>
                <div className="hd__booking-field">
                  <label className="hd__booking-label">MOVE-OUT</label>
                  <div className="hd__booking-value">📅 {fmtDate(moveOut.toISOString())}</div>
                </div>
              </div>

              <div className="hd__breakdown">
                <div className="hd__breakdown-row">
                  <span>Monthly rent</span>
                  <span>€{rent ? rent.toLocaleString() : '—'}</span>
                </div>
                {deposit > 0 && (
                  <div className="hd__breakdown-row">
                    <span>Security deposit</span>
                    <span>€{deposit.toLocaleString()}</span>
                  </div>
                )}
                <div className="hd__breakdown-row">
                  <span>1 Euro Pass service</span>
                  <span>€1</span>
                </div>
                <div className="hd__breakdown-row">
                  <span>Bills</span>
                  <span>{billsIncluded ? 'Included' : '—'}</span>
                </div>
                <div className="hd__breakdown-divider" />
                <div className="hd__breakdown-row hd__breakdown-total">
                  <span>Due before move-in</span>
                  <span>€{total.toLocaleString()}</span>
                </div>
              </div>

              <button className="hd__book-btn">Request to book →</button>
              <button className="hd__message-btn">Message {listing.full_name?.split(' ')[0] || 'Host'}</button>
              <p className="hd__not-charged">You won't be charged yet.</p>
              <div className="hd__secure-badge">🛡️ Secure through 1 Euro Pass</div>

            </div>
          </aside>

        </div>

        {/* Good to know + Cancellation */}
        <div className="hd__lower-grid">
          {(gtkYes.length > 0 || gtkNo.length > 0) && (
            <section className="hd__section">
              <h3 className="hd__section-title">Good to know</h3>
              <div className="hd__good-to-know">
                {gtkYes.length > 0 && (
                  <div className="hd__gtk-col">
                    {gtkYes.map(item => (
                      <div key={item} className="hd__gtk-item">
                        <span className="hd__gtk-check hd__gtk-check--yes">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {gtkNo.length > 0 && (
                  <div className="hd__gtk-col">
                    {gtkNo.map(item => (
                      <div key={item} className="hd__gtk-item">
                        <span className="hd__gtk-check hd__gtk-check--no">✗</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="hd__section">
            <div className="hd__section-title-row">
              <h3 className="hd__section-title">Cancellation policy</h3>
            </div>
            <p className="hd__about-text">Flexible cancellation</p>
          </section>
        </div>

        {/* Verification bar */}
        <div className="hd__verify-bar">
          <div className="hd__verify-badge">
            <div className="hd__verify-shield">🛡️</div>
            <div>
              <div className="hd__verify-title">This listing is verified</div>
              <div className="hd__verify-sub">1 Euro Pass checks listing information before students contact hosts.</div>
            </div>
          </div>
          <div className="hd__verify-checks">
            <div className="hd__verify-check">✓ Identity verified</div>
            <div className="hd__verify-check">✓ Property information checked</div>
            <div className="hd__verify-check">✓ Secure messaging</div>
          </div>
        </div>

        {/* Report */}
        <div className="hd__report">
          <button className="hd__report-btn">🚩 Something doesn't look right? Report this listing</button>
        </div>

        </div>{/* end hd__body-card */}

      </main>

      {/* Full gallery lightbox */}
      {galleryOpen && photos.length > 0 && (
        <Lightbox
          photos={photos}
          index={galleryIndex}
          onClose={() => setGalleryOpen(false)}
          onPrev={() => setGalleryIndex(i => (i - 1 + photos.length) % photos.length)}
          onNext={() => setGalleryIndex(i => (i + 1) % photos.length)}
        />
      )}

      <Footer />
    </>
  )
}
