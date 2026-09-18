import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryComingSoon from '../components/CategoryComingSoon'
import { useCategoryActive } from '../hooks/useCategoryActive'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

const CITIES = [
  { name: 'Berlin',    svg: '/city-berlin.svg' },
  { name: 'Amsterdam', svg: '/city-amsterdam.svg' },
  { name: 'Paris',     svg: '/city-paris.svg' },
  { name: 'Madrid',    svg: '/city-madrid.svg' },
  { name: 'Barcelona', svg: '/city-barcelona.svg' },
  { name: 'Milan',     svg: '/city-milan.svg' },
  { name: 'Lisbon',    svg: '/city-lisbon.svg' },
  { name: 'Vienna',    svg: '/city-vienna.svg' },
]

interface HousingListing {
  id: string
  title: string
  property_type: string | null
  city: string | null
  country: string | null
  rent: number | null
  deposit: number | null
  size_sqm: number | null
  utilities_included: string | null
  included_internet: number
  furnished: string | null
  available_now: number
  available_date: string | null
  pets: string | null
  smoking: string | null
  full_name: string | null
  cover_photo: string | null
}

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#a8edea,#fed6e3)',
  'linear-gradient(135deg,#ffecd2,#fcb69f)',
  'linear-gradient(135deg,#c3cfe2,#f5f7fa)',
  'linear-gradient(135deg,#d4fc79,#96e6a1)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
]

function formatAvailable(listing: HousingListing): string {
  if (listing.available_now) return 'Available now'
  if (listing.available_date) {
    return `From ${new Date(listing.available_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
  }
  return ''
}

export default function Housing() {
  const { active, loading } = useCategoryActive('housing')
  const [rent, setRent] = useState(1000)
  const [activeCity, setActiveCity] = useState('Berlin')
  const [favorites, setFavorites] = useState<string[]>([])
  const [listings, setListings] = useState<HousingListing[]>([])
  const [listingsLoading, setListingsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    apiGet<{ success: boolean; data: HousingListing[] }>(ENDPOINTS.housing.list)
      .then(res => setListings(res.data ?? []))
      .catch(() => {})
      .finally(() => setListingsLoading(false))
  }, [])

  const toggleFav = (id: string) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  if (loading) return null
  if (!active) return <CategoryComingSoon name="Housing" />

  return (
    <>
      <Helmet>
        <title>Student Housing in Europe — 1 Euro Pass</title>
        <meta name="description" content="Find verified student rooms, flats and apartments across Europe & UK. Affordable housing near universities in Berlin, Amsterdam, Paris and more." />
        <link rel="canonical" href="https://1europass.com/housing" />
      </Helmet>
      <Navbar />
      <main className="housing">

        {/* ── HERO ── */}
        <div className="housing__hero">
          <div className="housing__hero-left">
            <h1 className="housing__hero-title">
              Find your <span className="housing__hero-accent">
                place in Europe.
                <img src="/underline.svg" alt="" className="housing__hero-underline" />
              </span>
            </h1>
            <p className="housing__hero-sub">
              <img src="/star-icon.svg" alt="" className="housing__hero-sub-icon" />
              Rooms, apartments &amp; student housing<br />made simple.
            </p>

            <div className="housing__search-box">
              <div className="housing__search-row">
                <div className="housing__search-field">
                  <label className="housing__search-label">WHERE</label>
                  <input className="housing__search-input" placeholder="Berlin, Germany" />
                </div>
                <div className="housing__search-divider" />
                <div className="housing__search-field">
                  <label className="housing__search-label">MOVE-IN</label>
                  <input className="housing__search-input" placeholder="Any time" type="date" />
                </div>
                <div className="housing__search-divider" />
                <div className="housing__search-field">
                  <label className="housing__search-label">BUDGET</label>
                  <input className="housing__search-input" placeholder="€300 – €1,000" />
                </div>
                <div className="housing__search-divider" />
                <div className="housing__search-field">
                  <label className="housing__search-label">HOUSING TYPE</label>
                  <select className="housing__search-input housing__search-select">
                    <option>Any type</option>
                    <option>Private room</option>
                    <option>Studio</option>
                    <option>Apartment</option>
                  </select>
                </div>
                <button className="housing__search-btn">Search</button>
              </div>
              <a href="#results" className="housing__browse-link">Browse all housing →</a>
            </div>
          </div>

          <div className="housing__hero-right">
            <img src="/housing-hero.svg" alt="" className="housing__hero-img" />
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div className="housing__content-card">

          {/* ── POPULAR CITIES ── */}
          <div className="housing__cities-wrap">
            <div className="housing__cities-header">
              <h2 className="housing__cities-title">
                Popular student cities
                <img src="/star-icon.svg" alt="" className="housing__cities-title-star" />
              </h2>
              <p className="housing__cities-sub">Find rooms wherever your future takes you</p>
            </div>
            <div className="housing__cities-row">
              {CITIES.map(c => (
                <button
                  key={c.name}
                  className={`housing__city-btn${activeCity === c.name ? ' housing__city-btn--active' : ''}`}
                  onClick={() => setActiveCity(c.name)}
                >
                  <img src={c.svg} alt={c.name} className="housing__city-img" />
                  <span className="housing__city-name">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── RESULTS + FILTERS ── */}
          <div className="housing__body" id="results">

          {/* FILTER SIDEBAR */}
          <aside className="housing__filters">
            <h3 className="housing__filters-title">Filter housing</h3>

            <div className="housing__filter-group">
              <div className="housing__filter-label">LOCATION</div>
              <div className="housing__filter-location">
                <span className="housing__filter-location-pin">📍</span>
                <input className="housing__filter-input" defaultValue="Berlin, Germany" />
              </div>
            </div>

            <div className="housing__filter-group">
              <div className="housing__filter-label">MONTHLY RENT</div>
              <input
                type="range" min={0} max={2000} step={50}
                value={rent}
                onChange={e => setRent(Number(e.target.value))}
                className="housing__filter-range"
              />
              <div className="housing__filter-range-labels">
                <span>€0</span><span>€{rent.toLocaleString()}</span>
              </div>
            </div>

            <div className="housing__filter-group">
              <div className="housing__filter-label">HOUSING TYPE</div>
              {['Private room','Shared room','Studio','Apartment','Student residence'].map(t => (
                <label key={t} className="housing__filter-check">
                  <input type="checkbox" /> {t}
                </label>
              ))}
            </div>

            <div className="housing__filter-group">
              <div className="housing__filter-label">MOVE-IN DATE</div>
              <input type="date" className="housing__filter-input housing__filter-date" />
            </div>

            <div className="housing__filter-group">
              <div className="housing__filter-label">STAY DURATION</div>
              {['Short term','3+ months','6+ months','12+ months'].map(t => (
                <label key={t} className="housing__filter-check">
                  <input type="checkbox" /> {t}
                </label>
              ))}
            </div>

            <div className="housing__filter-group">
              <div className="housing__filter-label">AMENITIES</div>
              {['Furnished','Wi-Fi included','Bills included','Private bathroom','Kitchen','Laundry'].map(t => (
                <label key={t} className="housing__filter-check">
                  <input type="checkbox" /> {t}
                </label>
              ))}
            </div>

            <label className="housing__filter-toggle">
              <input type="checkbox" />
              <span>Verified listings only</span>
            </label>
            <label className="housing__filter-toggle">
              <input type="checkbox" />
              <span>Female-only housing</span>
            </label>

            <div className="housing__filter-actions">
              <button className="housing__filter-clear">Clear all</button>
              <button className="housing__filter-apply">Apply filters</button>
            </div>
          </aside>

          {/* LISTINGS */}
          <div className="housing__results">
            <div className="housing__results-header">
              <h2 className="housing__results-count">
                <strong>{listingsLoading ? '…' : listings.length} listing{listings.length !== 1 ? 's' : ''}</strong> found
              </h2>
              <div className="housing__results-controls">
                <select className="housing__sort-select">
                  <option>Recommended</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                  <option>Newest first</option>
                </select>
                <button className="housing__map-btn">🗺 Map view</button>
              </div>
            </div>
            <p className="housing__results-sub">Student-friendly housing near universities, transport &amp; city centers.</p>

            {listingsLoading ? (
              <p style={{ color: '#888', padding: '40px 0' }}>Loading listings…</p>
            ) : listings.length === 0 ? (
              <p style={{ color: '#888', padding: '40px 0' }}>No active listings yet. Be the first to post!</p>
            ) : (
              <div className="housing__grid">
                {listings.map((l, idx) => {
                  const hostName = l.full_name || 'Host'
                  const location = [l.city, l.country].filter(Boolean).join(', ')
                  const tags: string[] = []
                  if (l.included_internet) tags.push('Wi-Fi')
                  if (l.utilities_included === 'included') tags.push('Bills included')
                  const TAG_COLORS: Record<string, string> = {
                    'Furnished': '#E8F5E9',
                    'Wi-Fi': '#E3F2FD',
                    'Bills included': '#FFF8E1',
                    'Pets OK': '#FFF3E0',
                    'No smoking': '#FCE4EC',
                  }
                  if (l.pets === 'yes') tags.push('Pets OK')
                  if (l.smoking === 'no') tags.push('No smoking')

                  return (
                    <div key={l.id} className="housing__card" onClick={() => navigate(`/housing/${l.id}`)}>
                      <div
                        className="housing__card-img"
                        style={l.cover_photo
                          ? { backgroundImage: `url(${l.cover_photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : { background: FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length] }
                        }
                      >
                        {l.property_type && (
                          <span className="housing__card-type-badge">{l.property_type}</span>
                        )}
                        <button
                          className={`housing__card-fav${favorites.includes(l.id) ? ' housing__card-fav--active' : ''}`}
                          onClick={e => { e.stopPropagation(); toggleFav(l.id) }}
                        >♥</button>
                      </div>
                      <div className="housing__card-body">
                        <div className="housing__card-title">{l.title}</div>
                        <div className="housing__card-price-row">
                          {l.rent && (
                            <div className="housing__card-price">€{l.rent.toLocaleString()}<span>/month</span></div>
                          )}
                          {l.size_sqm && (
                            <div className="housing__card-size">{l.size_sqm} m²</div>
                          )}
                        </div>
                        {l.furnished !== null && (
                          <div className={`housing__card-furnished${l.furnished === 'yes' ? ' housing__card-furnished--yes' : ''}`}>
                            {l.furnished === 'yes' ? '✓ Furnished' : '✗ Not furnished'}
                          </div>
                        )}
                        {location && <div className="housing__card-location">📍 {location}</div>}
                        {tags.length > 0 && (
                          <div className="housing__card-tags">
                            {tags.map(tag => (
                              <span key={tag} className="housing__card-tag" style={{ background: TAG_COLORS[tag] || '#f5f5f5' }}>{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="housing__card-avail">{formatAvailable(l)}</div>
                        <div className="housing__card-footer">
                          <div className="housing__card-agent">
                            <div className="housing__card-avatar">{hostName[0]?.toUpperCase()}</div>
                            <div className="housing__card-agent-info">
                              <span className="housing__card-agent-name">{hostName}</span>
                              <span className="housing__card-agent-role">Owner</span>
                            </div>
                          </div>
                          <button className="housing__card-details" onClick={e => { e.stopPropagation(); navigate(`/housing/${l.id}`) }}>View details +</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>{/* end housing__body */}

        {/* ── MAP EXPLORE SECTION ── */}
        <div className="housing__map-section">
          <div className="housing__map-left">
            <h2 className="housing__map-title">Explore housing around you</h2>
            <p className="housing__map-sub">See available rooms near universities, transport and student hotspots.</p>
            <button className="housing__map-open-btn">Open map view</button>
          </div>
          <div className="housing__map-right">
            <img src="/housing-map.svg" alt="Housing map" className="housing__map-img" />
          </div>
        </div>

        {/* ── TRUST SECTION ── */}
        <div className="housing__trust-section">
          <div className="housing__trust-left">
            <h2 className="housing__trust-title">Find housing with confidence.</h2>
            <p className="housing__trust-sub">We help students discover safer, clearer and more student-friendly housing.</p>
          </div>
          <div className="housing__trust-features">
            <div className="housing__trust-feature">
              <img src="/trust-verified.svg" alt="" className="housing__trust-icon" />
              <div>
                <div className="housing__trust-feature-title">Verified listings</div>
                <div className="housing__trust-feature-desc">Listings can be verified before students contact hosts.</div>
              </div>
            </div>
            <div className="housing__trust-feature">
              <img src="/trust-student.svg" alt="" className="housing__trust-icon" />
              <div>
                <div className="housing__trust-feature-title">Student-friendly</div>
                <div className="housing__trust-feature-desc">Built specifically for international students.</div>
              </div>
            </div>
            <div className="housing__trust-feature">
              <img src="/trust-pricing.svg" alt="" className="housing__trust-icon" />
              <div>
                <div className="housing__trust-feature-title">Clear pricing</div>
                <div className="housing__trust-feature-desc">See rent, deposit and included bills upfront.</div>
              </div>
            </div>
            <div className="housing__trust-feature">
              <img src="/trust-support.svg" alt="" className="housing__trust-icon" />
              <div>
                <div className="housing__trust-feature-title">Report &amp; support</div>
                <div className="housing__trust-feature-desc">Something doesn't look right? Report it to us.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LANDLORD CTA SECTION ── */}
        <div className="housing__landlord-section">
          <div className="housing__landlord-img-wrap">
            <img src="/landlord-illustration.svg" alt="" className="housing__landlord-img" />
          </div>
          <div className="housing__landlord-content">
            <h2 className="housing__landlord-title">Have a room to rent?</h2>
            <p className="housing__landlord-sub">Reach international students looking for housing across Europe.</p>
            <p className="housing__landlord-link">Post your listing for just €1.</p>
            <p className="housing__landlord-tagline"><strong>Simple. Fast. Student-friendly.</strong></p>
          </div>
          <button className="housing__landlord-btn">Post a listing for €1 →</button>
        </div>

        </div>{/* end housing__content-card */}
      </main>
      <Footer />
    </>
  )
}
