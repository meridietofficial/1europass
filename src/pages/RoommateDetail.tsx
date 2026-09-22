import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface Photo { id: number; url: string; sort_order: number }

interface RoommateListing {
  id: string
  title: string
  intent: string
  room_type: string
  description: string | null
  street_address: string | null
  apartment_floor: string | null
  postal_code: string | null
  city: string | null
  state_region: string | null
  country: string | null
  latitude: string | null
  longitude: string | null
  rent: number | null
  budget_min: number | null
  budget_max: number | null
  size_sqm: number | null
  utilities_included: number | null
  available_now: number
  available_date: string | null
  furnished: string | null
  pets_allowed: number | null
  smoking_allowed: number | null
  gender_preference: string | null
  housemates: string | null
  age_min: number | null
  age_max: number | null
  included_electricity: number
  included_water: number
  included_heating: number
  included_internet: number
  included_gas: number
  included_other: number
  included_other_spec: string | null
  nearby_supermarket: number
  nearby_metro: number
  nearby_bus_stop: number
  nearby_train_station: number
  nearby_university_flag: number
  nearby_hospital: number
  nearby_gym: number
  nearby_cafe: number
  nearby_restaurant: number
  nearby_university: string | null
  decl_info_accurate: number
  decl_photos_current: number
  decl_agreed_terms: number
  share_profile: number
  full_name: string
  about_me: string | null
  member_since: string | null
  photos: Photo[]
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
      {photos.length > 1 && (
        <button className="hd__lightbox-prev" onClick={e => { e.stopPropagation(); onPrev() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}
      <img key={photo.url} src={photo.url} alt="" className="hd__lightbox-img" onClick={e => e.stopPropagation()} />
      {photos.length > 1 && (
        <button className="hd__lightbox-next" onClick={e => { e.stopPropagation(); onNext() }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}
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
      {extra !== undefined && extra > 0 && <div className="hd__gcell-overlay"><span>+{extra} more</span></div>}
    </div>
  )
}

function Gallery({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  const n = photos.length
  if (n === 0) return null
  return (
    <div className="hd__gallery-wrap">
      {n === 1 && <div className="hd__gallery hd__gallery--1"><GalleryCell photo={photos[0]} index={0} onOpen={onOpen} /></div>}
      {n === 2 && <div className="hd__gallery hd__gallery--2"><GalleryCell photo={photos[0]} index={0} onOpen={onOpen} /><GalleryCell photo={photos[1]} index={1} onOpen={onOpen} /></div>}
      {n === 3 && <div className="hd__gallery hd__gallery--3"><GalleryCell photo={photos[0]} index={0} onOpen={onOpen} /><div className="hd__gallery-col"><GalleryCell photo={photos[1]} index={1} onOpen={onOpen} /><GalleryCell photo={photos[2]} index={2} onOpen={onOpen} /></div></div>}
      {n === 4 && <div className="hd__gallery hd__gallery--4"><GalleryCell photo={photos[0]} index={0} onOpen={onOpen} /><GalleryCell photo={photos[1]} index={1} onOpen={onOpen} /><GalleryCell photo={photos[2]} index={2} onOpen={onOpen} /><GalleryCell photo={photos[3]} index={3} onOpen={onOpen} /></div>}
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
        Show all {n} photo{n !== 1 ? 's' : ''}
      </button>
    </div>
  )
}

const NEARBY_LABELS: { key: keyof RoommateListing; emoji: string; label: string }[] = [
  { key: 'nearby_supermarket', emoji: '🛒', label: 'Supermarket' },
  { key: 'nearby_metro', emoji: '🚇', label: 'Metro' },
  { key: 'nearby_bus_stop', emoji: '🚌', label: 'Bus stop' },
  { key: 'nearby_train_station', emoji: '🚆', label: 'Train station' },
  { key: 'nearby_university_flag', emoji: '🏫', label: 'University' },
  { key: 'nearby_hospital', emoji: '🏥', label: 'Hospital' },
  { key: 'nearby_gym', emoji: '🏋️', label: 'Gym' },
  { key: 'nearby_cafe', emoji: '☕', label: 'Cafes' },
  { key: 'nearby_restaurant', emoji: '🍽️', label: 'Restaurants' },
]

export default function RoommateDetail() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<RoommateListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  useEffect(() => {
    if (!id) return
    apiGet<{ success: boolean; data: RoommateListing }>(ENDPOINTS.roommates.view(id))
      .then(res => setListing(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <><Navbar /><main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#888' }}>Loading…</p></main><Footer /></>
  )

  if (!listing) return (
    <><Navbar /><main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#888' }}>Listing not found.</p></main><Footer /></>
  )

  const isNeedRoom = listing.intent === 'need-room'
  const photos = listing.photos ?? []
  const price = isNeedRoom ? listing.budget_max : listing.rent
  const priceMin = isNeedRoom ? listing.budget_min : null
  const priceLabel = isNeedRoom ? 'Budget range' : 'per month'
  const location = [listing.city, listing.country].filter(Boolean).join(', ')
  const fullAddress = [listing.street_address, listing.apartment_floor ? `Floor ${listing.apartment_floor}` : null, listing.city, listing.postal_code, listing.country].filter(Boolean).join(', ')
  const hostName = listing.full_name || 'User'
  const hostInitial = hostName[0]?.toUpperCase() ?? 'U'

  const availableText = listing.available_now
    ? (isNeedRoom ? 'Can move immediately' : 'Available immediately')
    : listing.available_date ? `${isNeedRoom ? 'Can move from' : 'From'} ${fmtDate(listing.available_date)}` : ''

  const includedBills: string[] = [
    listing.included_electricity && 'Electricity',
    listing.included_water && 'Water',
    listing.included_heating && 'Heating',
    listing.included_internet && 'Wi-Fi',
    listing.included_gas && 'Gas',
    listing.included_other && (listing.included_other_spec || 'Other'),
  ].filter(Boolean) as string[]

  const nearbyItems = NEARBY_LABELS.filter(n => listing[n.key])

  const gtkYes: string[] = []
  const gtkNo: string[] = []
  if (listing.pets_allowed === 1) gtkYes.push(isNeedRoom ? 'I have a pet' : 'Pets allowed')
  else if (listing.pets_allowed === 0) gtkNo.push(isNeedRoom ? 'No pets' : 'No pets')
  if (listing.smoking_allowed === 1) gtkYes.push(isNeedRoom ? 'I smoke' : 'Smoking allowed')
  else if (listing.smoking_allowed === 0) gtkNo.push(isNeedRoom ? 'Non-smoker' : 'No smoking')

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* Hero section */}
        <div className="hd__hero-section">
          <div className="hd__top-row">
            <nav className="hd__breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/roommates">Roommates</Link><span>›</span>
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
            <span className="hd__chip" style={{ marginRight: 6 }}>{isNeedRoom ? 'Looking for a room' : 'Has a room'}</span>
            {location && <><span className="hd__meta-dot">·</span><span>📍 {location}</span></>}
            {availableText && <><span className="hd__meta-dot">·</span><span>{availableText}</span></>}
          </div>

          {/* Photos — have-room only */}
          {!isNeedRoom && photos.length > 0 && (
            <Gallery photos={photos} onOpen={(i) => { setGalleryIndex(i); setGalleryOpen(true) }} />
          )}

          {/* No-photo banner for need-room or no photos */}
          {(isNeedRoom || photos.length === 0) && (
            <div style={{
              height: 220, borderRadius: 16, background: 'linear-gradient(135deg,#a8edea,#fed6e3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>👤</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>{hostName}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#555', marginTop: 4 }}>
                  {isNeedRoom ? 'Looking for a room' : 'Has a room to share'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Body card */}
        <div className="hd__body-card">
          <div className="hd__content">

            {/* ── Left column ── */}
            <div className="hd__left">

              {/* Summary */}
              <div className="hd__summary">
                <h2 className="hd__summary-title">
                  {isNeedRoom ? 'Looking for a room' : `${listing.room_type === 'private' ? 'Private' : 'Shared'} room`}
                  {location ? ` in ${location}` : ''}
                </h2>
                <div className="hd__summary-stats">
                  {listing.size_sqm && !isNeedRoom && <><span>{listing.size_sqm} m²</span><span className="hd__dot">·</span></>}
                  {listing.housemates && !isNeedRoom && <><span>{listing.housemates} housemate(s)</span><span className="hd__dot">·</span></>}
                  {listing.age_min && listing.age_max && !isNeedRoom && <><span>Age {listing.age_min}–{listing.age_max}</span><span className="hd__dot">·</span></>}
                  {availableText && <span className="hd__avail-pill">🟢 {availableText}</span>}
                </div>
              </div>

              {/* About */}
              {listing.description && (
                <section className="hd__section">
                  <h3 className="hd__section-title">About</h3>
                  <p className="hd__about-text">{listing.description}</p>
                </section>
              )}

              {/* Host */}
              <section className="hd__section hd__host-section">
                <div className="hd__host-info">
                  <div className="hd__host-avatar">{hostInitial}</div>
                  <div className="hd__host-details">
                    <div className="hd__host-name">{isNeedRoom ? 'Posted by' : 'Hosted by'} {hostName}</div>
                    <div className="hd__host-since">
                      {listing.member_since ? `Member since ${new Date(listing.member_since).getFullYear()}` : 'Member'}
                    </div>
                  </div>
                </div>
                {listing.about_me && (
                  <p className="hd__about-text" style={{ marginTop: 12 }}>{listing.about_me}</p>
                )}
                <div className="hd__host-meta" style={{ marginTop: listing.about_me ? 10 : 0 }}>
                  <div className="hd__host-meta-item">⚡ Usually responds within a few hours</div>
                </div>
              </section>

              {/* Room details badges */}
              <section className="hd__section hd__type-badges-section">
                <div className="hd__type-badge">
                  <span className="hd__type-badge-icon">{listing.room_type === 'private' ? '🚪' : '🤝'}</span>
                  <span className="hd__type-badge-label">{listing.room_type === 'private' ? 'Private Room' : 'Shared Room'}</span>
                </div>
                {listing.size_sqm && !isNeedRoom && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📐</span>
                    <span className="hd__type-badge-label">{listing.size_sqm} m²</span>
                  </div>
                )}
                {listing.furnished && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🛋️</span>
                    <span className="hd__type-badge-label">{listing.furnished} furnished</span>
                  </div>
                )}
                {listing.gender_preference && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">👤</span>
                    <span className="hd__type-badge-label">{listing.gender_preference}</span>
                  </div>
                )}
                {listing.housemates && !isNeedRoom && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🏠</span>
                    <span className="hd__type-badge-label">{listing.housemates} housemate(s)</span>
                  </div>
                )}
              </section>

              {/* Bills included */}
              {includedBills.length > 0 && !isNeedRoom && (
                <section className="hd__section">
                  <h3 className="hd__section-title">What's included in the rent</h3>
                  <div className="hd__amenities-grid">
                    {includedBills.map(b => (
                      <div key={b} className="hd__amenity">
                        <span className="hd__amenity-check">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Good to know */}
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

              {/* Nearby — have-room only */}
              {!isNeedRoom && nearbyItems.length > 0 && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Nearby</h3>
                  {listing.nearby_university && (
                    <div className="hd__transport" style={{ marginBottom: 10 }}>
                      <div className="hd__transport-item">
                        <span className="hd__transport-badge">🎓</span>
                        <span className="hd__transport-label">{listing.nearby_university}</span>
                      </div>
                    </div>
                  )}
                  <div className="hd__amenities-grid">
                    {nearbyItems.map(n => (
                      <div key={n.key as string} className="hd__amenity">
                        <span>{n.emoji}</span>
                        <span>{n.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Location & map — have-room only */}
              {!isNeedRoom && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Location</h3>
                  <p className="hd__about-text">{fullAddress || location || 'Location not provided.'}</p>
                  {listing.latitude && listing.longitude ? (
                    <div style={{ height: 300, borderRadius: 12, overflow: 'hidden', marginTop: 16 }}>
                      <MapContainer
                        center={[parseFloat(listing.latitude), parseFloat(listing.longitude)]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                        <Marker position={[parseFloat(listing.latitude), parseFloat(listing.longitude)]}>
                          <Popup>{listing.street_address || listing.title}</Popup>
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
              )}

            </div>

            {/* ── Right sidebar ── */}
            <aside className="hd__sidebar">
              <div className="hd__sidebar-card">

                <div className="hd__price-row">
                  {isNeedRoom ? (
                    price != null ? (
                      <>
                        <span className="hd__price">
                          {priceMin != null ? `€${priceMin.toLocaleString()} – €${price.toLocaleString()}` : `€${price.toLocaleString()}`}
                        </span>
                        <span className="hd__price-unit">/month</span>
                      </>
                    ) : <span className="hd__price" style={{ fontSize: 16 }}>Budget not set</span>
                  ) : (
                    price != null ? (
                      <>
                        <span className="hd__price">€{price.toLocaleString()}</span>
                        <span className="hd__price-unit">/month</span>
                      </>
                    ) : <span className="hd__price" style={{ fontSize: 16 }}>Price not set</span>
                  )}
                </div>
                {isNeedRoom && price != null && (
                  <div className="hd__price-note">{priceLabel}</div>
                )}
                {!isNeedRoom && listing.utilities_included === 1 && (
                  <div className="hd__price-note">Bills included · No hidden fees</div>
                )}

                <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {availableText && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>{isNeedRoom ? 'Can move' : 'Available'}</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{availableText}</span>
                    </div>
                  )}
                  {listing.gender_preference && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Preference</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.gender_preference}</span>
                    </div>
                  )}
                  {listing.room_type && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Room type</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.room_type === 'private' ? 'Private' : 'Shared'}</span>
                    </div>
                  )}
                  {!isNeedRoom && listing.housemates && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Housemates</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.housemates}</span>
                    </div>
                  )}
                </div>

                <div className="hd__breakdown-divider" />

                <button className="hd__book-btn" style={{ marginTop: 16 }}>
                  💬 Message {hostName.split(' ')[0]}
                </button>
                <button className="hd__message-btn">❤️ Save listing</button>
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
                <div className="hd__verify-sub">1 Euro Pass checks listing information before students make contact.</div>
              </div>
            </div>
            <div className="hd__verify-checks">
              {listing.decl_info_accurate ? <div className="hd__verify-check">✓ Information accurate</div> : null}
              {listing.decl_agreed_terms ? <div className="hd__verify-check">✓ Agreed to terms</div> : null}
              <div className="hd__verify-check">✓ Secure messaging</div>
            </div>
          </div>

          <div className="hd__report">
            <button className="hd__report-btn">🚩 Something doesn't look right? Report this listing</button>
          </div>

        </div>
      </main>

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
