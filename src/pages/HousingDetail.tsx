import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DETAIL_LISTINGS = [
  { id: 1, title: 'Bright room in City Center', price: 650, neighborhood: 'Mitte', district: 'Berlin', distance: '8 min to metro', tags: ['Furnished', 'Wi-Fi Included', 'Bills included'], available: '2026-09-01', agent: 'Anna', verified: true, type: 'Private room', apartment: 'Shared apartment', flatmates: 3, area: 14, deposit: 650, gradients: ['linear-gradient(135deg,#a8edea,#fed6e3)', 'linear-gradient(135deg,#a2c4e0,#89b4d8)', 'linear-gradient(135deg,#f0c4a8,#e8a880)', 'linear-gradient(135deg,#c4dfc4,#9dc49d)', 'linear-gradient(135deg,#e8d4a8,#d4b880)'] },
  { id: 2, title: 'Cozy room near TU Berlin', price: 580, neighborhood: 'Charlottenburg', district: 'Berlin', distance: '12 min to TU Berlin', tags: ['Furnished', 'Wi-Fi Included'], available: '2026-09-01', agent: 'Anna', verified: true, type: 'Private room', apartment: 'Shared apartment', flatmates: 2, area: 12, deposit: 580, gradients: ['linear-gradient(135deg,#ffecd2,#fcb69f)', 'linear-gradient(135deg,#ffe0b0,#fcb680)', 'linear-gradient(135deg,#ffd0a0,#f8a060)', 'linear-gradient(135deg,#ffc090,#f09050)', 'linear-gradient(135deg,#ffb080,#e88040)'] },
  { id: 3, title: 'Modern student studio', price: 720, neighborhood: 'Friedrichshain', district: 'Berlin', distance: '6 min to metro', tags: ['Furnished', 'Wi-Fi Included', 'Bills included'], available: '2026-09-01', agent: 'Anna', verified: true, type: 'Studio', apartment: 'Entire studio', flatmates: 0, area: 25, deposit: 720, gradients: ['linear-gradient(135deg,#c3cfe2,#f5f7fa)', 'linear-gradient(135deg,#b0c0d8,#e0e8f0)', 'linear-gradient(135deg,#a0b0c8,#d0d8e8)', 'linear-gradient(135deg,#90a0b8,#c0c8d8)', 'linear-gradient(135deg,#8090a8,#b0b8c8)'] },
  { id: 4, title: 'Private room near Humboldt', price: 490, neighborhood: 'Mitte', district: 'Berlin', distance: '10 min to university', tags: ['Furnished', 'Wi-Fi Included'], available: '2026-09-01', agent: 'Anna', verified: false, type: 'Private room', apartment: 'Shared apartment', flatmates: 4, area: 11, deposit: 490, gradients: ['linear-gradient(135deg,#d4fc79,#96e6a1)', 'linear-gradient(135deg,#c0ec60,#80d090)', 'linear-gradient(135deg,#a8d840,#68bc78)', 'linear-gradient(135deg,#90c428,#50a060)', 'linear-gradient(135deg,#78b010,#388848)'] },
  { id: 5, title: 'Furnished room in Kreuzberg', price: 580, neighborhood: 'Kreuzberg', district: 'Berlin', distance: '5 min to metro', tags: ['Furnished', 'Wi-Fi Included'], available: '2026-09-01', agent: 'Anna', verified: true, type: 'Private room', apartment: 'Shared apartment', flatmates: 3, area: 13, deposit: 580, gradients: ['linear-gradient(135deg,#f093fb,#f5576c)', 'linear-gradient(135deg,#e080e8,#e04060)', 'linear-gradient(135deg,#c868d0,#c83050)', 'linear-gradient(135deg,#b050b8,#b02040)', 'linear-gradient(135deg,#9838a0,#981030)'] },
  { id: 6, title: 'Sunny room near the metro', price: 480, neighborhood: 'Neukölln', district: 'Berlin', distance: '3 min to metro', tags: ['Furnished', 'Wi-Fi Included'], available: '2026-09-01', agent: 'Anna', verified: true, type: 'Private room', apartment: 'Shared apartment', flatmates: 2, area: 12, deposit: 480, gradients: ['linear-gradient(135deg,#4facfe,#00f2fe)', 'linear-gradient(135deg,#3898e8,#00d8e8)', 'linear-gradient(135deg,#2080d0,#00c0d0)', 'linear-gradient(135deg,#0868b8,#00a8b8)', 'linear-gradient(135deg,#0050a0,#0090a0)'] },
]

const AMENITIES = [
  'Furnished room', 'Wardrobe', 'Wi-Fi included', 'Shared kitchen',
  'Bills included', 'Washing machine', 'Heating', 'Private toilet',
  'Study desk', 'Bicycle parking',
]

const TRANSPORT = [
  { label: 'U-Bahn', minutes: '3 min' },
  { label: 'City Center', minutes: '9 min' },
  { label: 'Humboldt University', minutes: '12 min' },
  { label: 'TU Berlin', minutes: '18 min' },
]

// Sep 1, 2026 is a Tuesday → offset 1 in Mon-first calendar
const SEP_START_OFFSET = 1
const CAL_DAYS: (number | null)[] = [
  ...Array(SEP_START_OFFSET).fill(null),
  ...Array.from({ length: 30 }, (_, i) => i + 1),
]

function computeMoveOut(moveIn: Date, months: number): Date {
  const d = new Date(moveIn)
  d.setMonth(d.getMonth() + months)
  d.setDate(d.getDate() - 1)
  return d
}

function fmtDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function HousingDetail() {
  const { id } = useParams()
  const listing = DETAIL_LISTINGS.find(l => l.id === Number(id)) ?? DETAIL_LISTINGS[0]

  const [saved, setSaved] = useState(false)
  const [duration, setDuration] = useState(6)

  const moveIn = new Date(listing.available)
  const moveOut = computeMoveOut(moveIn, duration)
  const billsIncluded = listing.tags.some(t => t.toLowerCase().includes('bills'))
  const total = listing.price + listing.deposit + 1

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* Breadcrumb */}
        <nav className="hd__breadcrumb">
          <Link to="/housing">Housing</Link>
          <span>›</span>
          <Link to="/housing">{listing.district}</Link>
          <span>›</span>
          <Link to="/housing">{listing.neighborhood}</Link>
          <span>›</span>
          <span className="hd__breadcrumb-current">{listing.title}</span>
        </nav>

        {/* Title row */}
        <div className="hd__title-row">
          <h1 className="hd__title">{listing.title}</h1>
          <div className="hd__title-actions">
            <button
              className={`hd__save-btn${saved ? ' hd__save-btn--active' : ''}`}
              onClick={() => setSaved(s => !s)}
            >
              ♥ Save
            </button>
            <button className="hd__share-btn">↗ Share</button>
          </div>
        </div>

        {/* Location meta */}
        <div className="hd__meta">
          <span>📍 {listing.neighborhood}, {listing.district}</span>
          <span className="hd__meta-dot">·</span>
          <span>{listing.distance}</span>
          <span className="hd__meta-dot">·</span>
          <span>Available from {fmtDate(moveIn)}</span>
        </div>

        {/* Chips */}
        <div className="hd__chips">
          {listing.verified && <span className="hd__chip hd__chip--verified">✔ VERIFIED</span>}
          {listing.tags.map(t => <span key={t} className="hd__chip">{t}</span>)}
        </div>

        {/* Photo gallery */}
        <div className="hd__gallery">
          <div className="hd__gallery-main" style={{ background: listing.gradients[0] }} />
          <div className="hd__gallery-grid">
            {listing.gradients.slice(1, 5).map((g, i) => (
              <div
                key={i}
                className={`hd__gallery-thumb${i === 3 ? ' hd__gallery-thumb--last' : ''}`}
                style={{ background: g }}
              >
                {i === 3 && (
                  <button className="hd__gallery-show-all">Show all 12 photos</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content + sidebar */}
        <div className="hd__content">

          {/* ── Left column ── */}
          <div className="hd__left">

            {/* Room summary */}
            <div className="hd__summary">
              <h2 className="hd__summary-title">{listing.type} in {listing.district}, Germany</h2>
              <div className="hd__summary-stats">
                <span>1 bedroom</span>
                <span className="hd__dot">·</span>
                <span>{listing.apartment}</span>
                {listing.flatmates > 0 && (
                  <>
                    <span className="hd__dot">·</span>
                    <span>{listing.flatmates} flatmates</span>
                  </>
                )}
                <span className="hd__dot">·</span>
                <span>{listing.area} m²</span>
              </div>
            </div>

            {/* About */}
            <section className="hd__section">
              <h3 className="hd__section-title">About this room</h3>
              <p className="hd__about-text">
                A bright, fully furnished private room in the heart of Berlin. Perfect for international
                students looking for a comfortable home close to universities, public transport and everyday
                essentials.
              </p>
              <button className="hd__text-link">Read more →</button>
            </section>

            {/* Host */}
            <section className="hd__section hd__host-section">
              <div className="hd__host-info">
                <div className="hd__host-avatar">{listing.agent[0]}</div>
                <div className="hd__host-details">
                  <div className="hd__host-name">Hosted by {listing.agent}</div>
                  {listing.verified && <div className="hd__host-badge">✔ Verified host</div>}
                  <div className="hd__host-since">Member since 2024</div>
                </div>
              </div>
              <div className="hd__host-meta">
                <div className="hd__host-meta-item">⚡ Usually responds within a few hours</div>
                <div className="hd__host-meta-item">🌐 English, German</div>
              </div>
              <button className="hd__view-profile-btn">View profile</button>
            </section>

            {/* Amenities */}
            <section className="hd__section">
              <h3 className="hd__section-title">What this place offers</h3>
              <div className="hd__amenities-grid">
                {AMENITIES.map(a => (
                  <div key={a} className="hd__amenity">
                    <span className="hd__amenity-check">✓</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
              <button className="hd__show-all-btn">Show all amenities →</button>
            </section>

            {/* Room type badges */}
            <section className="hd__section hd__type-badges-section">
              <div className="hd__type-badge">
                <span className="hd__type-badge-icon">🛏️</span>
                <span className="hd__type-badge-label">{listing.type}</span>
              </div>
              <div className="hd__type-badge">
                <span className="hd__type-badge-icon">🏠</span>
                <span className="hd__type-badge-label">{listing.apartment}</span>
              </div>
              <div className="hd__type-badge">
                <span className="hd__type-badge-icon">📐</span>
                <span className="hd__type-badge-label">{listing.area} m²</span>
              </div>
              {listing.flatmates > 0 && (
                <div className="hd__type-badge">
                  <span className="hd__type-badge-icon">👨‍🎓</span>
                  <span className="hd__type-badge-label">{listing.flatmates} students</span>
                </div>
              )}
            </section>

            {/* Where you'll live */}
            <section className="hd__section">
              <h3 className="hd__section-title">Where you'll live</h3>
              <p className="hd__about-text">
                {listing.neighborhood}, {listing.district}. Central, student-friendly and well connected
                to universities and the rest of Berlin.
              </p>
              <div className="hd__transport">
                {TRANSPORT.map(t => (
                  <div key={t.label} className="hd__transport-item">
                    <span className="hd__transport-badge">U</span>
                    <span className="hd__transport-label">{t.label}</span>
                    <span className="hd__transport-time">{t.minutes}</span>
                  </div>
                ))}
              </div>
              <div className="hd__map-placeholder">
                <div className="hd__map-streets" />
                <div className="hd__map-pin-wrap">
                  <div className="hd__map-pin">📍 Property</div>
                </div>
              </div>
              <button className="hd__show-all-btn">Open map view →</button>
            </section>

          </div>{/* end hd__left */}

          {/* ── Right sidebar ── */}
          <aside className="hd__sidebar">
            <div className="hd__sidebar-card">

              <div className="hd__price-row">
                <span className="hd__price">€{listing.price}</span>
                <span className="hd__price-unit">/month</span>
              </div>
              <div className="hd__price-note">
                {billsIncluded ? 'Bills included · ' : ''}No hidden fees
              </div>

              <div className="hd__booking-form">
                <div className="hd__booking-field">
                  <label className="hd__booking-label">MOVE-IN</label>
                  <div className="hd__booking-value">📅 {fmtDate(moveIn)}</div>
                </div>
                <div className="hd__booking-field hd__booking-field--select">
                  <label className="hd__booking-label">STAY DURATION</label>
                  <select
                    className="hd__booking-select"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                  >
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
                  <div className="hd__booking-value">📅 {fmtDate(moveOut)}</div>
                </div>
              </div>

              <div className="hd__breakdown">
                <div className="hd__breakdown-row">
                  <span>Monthly rent</span>
                  <span>€{listing.price}</span>
                </div>
                <div className="hd__breakdown-row">
                  <span>Security deposit</span>
                  <span>€{listing.deposit}</span>
                </div>
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
              <button className="hd__message-btn">Message {listing.agent}</button>
              <p className="hd__not-charged">You won't be charged yet.</p>
              <div className="hd__secure-badge">
                🛡️ Secure through 1 Euro Pass
              </div>

            </div>
          </aside>

        </div>{/* end hd__content */}

        {/* Availability calendar */}
        <div className="hd__availability">
          <h3 className="hd__section-title">Availability</h3>
          <div className="hd__calendar">
            <div className="hd__cal-header">
              <button className="hd__cal-nav">‹</button>
              <span className="hd__cal-month">September 2026</span>
              <button className="hd__cal-nav">›</button>
            </div>
            <div className="hd__cal-grid">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                <div key={d} className="hd__cal-dow">{d}</div>
              ))}
              {CAL_DAYS.map((day, i) => (
                <div
                  key={i}
                  className={[
                    'hd__cal-day',
                    day === null ? 'hd__cal-day--empty' : 'hd__cal-day--available',
                    day === 1 ? 'hd__cal-day--start' : '',
                  ].join(' ').trim()}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="hd__avail-info">
              <div className="hd__avail-row">
                <span className="hd__avail-dot" />
                Available from 1 September 2026
              </div>
              <div className="hd__avail-row">Minimum stay: 3 months</div>
              <div className="hd__avail-row">Maximum stay: 12 months</div>
            </div>
          </div>
        </div>

        {/* Good to know + Cancellation */}
        <div className="hd__lower-grid">
          <section className="hd__section">
            <h3 className="hd__section-title">Good to know</h3>
            <div className="hd__good-to-know">
              <div className="hd__gtk-col">
                {['Students preferred', 'Registration / Anmeldung possible', 'Visitors allowed', 'Couples allowed'].map(item => (
                  <div key={item} className="hd__gtk-item">
                    <span className="hd__gtk-check hd__gtk-check--yes">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="hd__gtk-col">
                {['No smoking', 'No pets'].map(item => (
                  <div key={item} className="hd__gtk-item">
                    <span className="hd__gtk-check hd__gtk-check--no">✗</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="hd__section">
            <div className="hd__section-title-row">
              <h3 className="hd__section-title">Cancellation policy</h3>
              <button className="hd__text-link">View cancellation policy →</button>
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
              <div className="hd__verify-sub">
                1 Euro Pass checks listing information before students contact hosts.
              </div>
            </div>
          </div>
          <div className="hd__verify-checks">
            <div className="hd__verify-check">✓ Identity verified</div>
            <div className="hd__verify-check">✓ Property information checked</div>
            <div className="hd__verify-check">✓ Secure messaging</div>
          </div>
          <button className="hd__verify-learn">Learn how verification works →</button>
        </div>

        {/* Report */}
        <div className="hd__report">
          <button className="hd__report-btn">🚩 Something doesn't look right? Report this listing</button>
        </div>

      </main>
      <Footer />
    </>
  )
}
