import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CITIES = [
  { name: 'Berlin',    emoji: '🏛️' },
  { name: 'Amsterdam', emoji: '🚲' },
  { name: 'Paris',     emoji: '🗼' },
  { name: 'Madrid',    emoji: '☀️' },
  { name: 'Barcelona', emoji: '🏖️' },
  { name: 'Milan',     emoji: '👗' },
  { name: 'Lisbon',    emoji: '🌊' },
  { name: 'Vienna',    emoji: '🎻' },
]

const LISTINGS = [
  { id: 1, title: 'Bright room in City Center', price: 650, neighborhood: 'Mitte, Berlin', distance: '8 min to metro', tags: ['Furnished', 'Wi-Fi'], available: '1 September', agent: 'Anna', verified: true, gradient: 'linear-gradient(135deg,#a8edea,#fed6e3)' },
  { id: 2, title: 'Cozy room near TU Berlin',   price: 580, neighborhood: 'Charlottenburg, Berlin', distance: '12 min to TU Berlin', tags: ['Furnished', 'Wi-Fi'], available: '1 September', agent: 'Anna', verified: true, gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)' },
  { id: 3, title: 'Modern student studio',       price: 720, neighborhood: 'Friedrichshain, Berlin', distance: '6 min to metro', tags: ['Furnished', 'Wi-Fi', 'Bills included'], available: '1 September', agent: 'Anna', verified: true, gradient: 'linear-gradient(135deg,#c3cfe2,#f5f7fa)' },
  { id: 4, title: 'Private room near Humboldt…', price: 490, neighborhood: 'Mitte, Berlin', distance: '10 min by university', tags: ['Furnished', 'Wi-Fi'], available: '1 September', agent: 'Anna', verified: false, gradient: 'linear-gradient(135deg,#d4fc79,#96e6a1)' },
  { id: 5, title: 'Furnished room in Kreuzberg', price: 580, neighborhood: 'Kreuzberg, Berlin', distance: '5 min to metro', tags: ['Furnished', 'Wi-Fi'], available: '1 September', agent: 'Anna', verified: true, gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { id: 6, title: 'Sunny room near the metro',   price: 480, neighborhood: 'Neukölln, Berlin', distance: '3 min to metro', tags: ['Furnished', 'Wi-Fi'], available: '1 September', agent: 'Anna', verified: true, gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
]

const TAG_COLORS: Record<string, string> = {
  'Furnished':     '#E8F5E9',
  'Wi-Fi':         '#E3F2FD',
  'Bills included':'#FFF8E1',
}

export default function Housing() {
  const [rent, setRent] = useState(1000)
  const [activeCity, setActiveCity] = useState('Berlin')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFav = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  return (
    <>
      <Navbar />
      <main className="housing">

        {/* ── HERO ── */}
        <div className="housing__hero">
          <div className="housing__hero-left">
            <h1 className="housing__hero-title">
              Find your <span className="housing__hero-accent">place in Europe.</span>
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
                  <span className="housing__city-emoji">{c.emoji}</span>
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
                <strong>124 rooms</strong> found in {activeCity}
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

            <div className="housing__grid">
              {LISTINGS.map(l => (
                <div key={l.id} className="housing__card">
                  <div className="housing__card-img" style={{ background: l.gradient }}>
                    {l.verified && <span className="housing__card-verified">✔ VERIFIED</span>}
                    <button
                      className={`housing__card-fav${favorites.includes(l.id) ? ' housing__card-fav--active' : ''}`}
                      onClick={() => toggleFav(l.id)}
                    >♥</button>
                  </div>
                  <div className="housing__card-body">
                    <div className="housing__card-title">{l.title}</div>
                    <div className="housing__card-price">€{l.price}<span>/month</span></div>
                    <div className="housing__card-location">📍 {l.neighborhood} · {l.distance}</div>
                    <div className="housing__card-tags">
                      {l.tags.map(tag => (
                        <span key={tag} className="housing__card-tag" style={{ background: TAG_COLORS[tag] || '#f5f5f5' }}>{tag}</span>
                      ))}
                    </div>
                    <div className="housing__card-avail">Available from {l.available}</div>
                    <div className="housing__card-footer">
                      <div className="housing__card-agent">
                        <div className="housing__card-avatar">{l.agent[0]}</div>
                        <span>{l.agent}</span>
                      </div>
                      <button className="housing__card-details">View details +</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>{/* end housing__body */}
        </div>{/* end housing__content-card */}
      </main>
      <Footer />
    </>
  )
}
