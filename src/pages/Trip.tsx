import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryComingSoon from '../components/CategoryComingSoon'
import { useCategoryActive } from '../hooks/useCategoryActive'

const TRIP_TYPES = [
  { name: 'All Trips',          icon: <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg> },
  { name: 'Weekend Getaways',   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { name: 'City Breaks',        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { name: 'Nature & Adventure', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polygon points="3 20 9 4 15 16 19 10 21 20"/></svg> },
  { name: 'Beach & Islands',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M2 20h20M12 4s-6 4-6 10h12C18 8 12 4 12 4z"/></svg> },
  { name: 'Road Trips',         icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
]

const TRIPS = [
  { id: 1, title: 'Austrian Alps Getaway',   location: 'Hallstatt, Austria',    dates: '24–28 May 2025', seats: 3, price: 150, type: 'WEEKEND GETAWAY', host: 'Alex M.',   rating: 4.9, reviews: 23, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80' },
  { id: 2, title: 'Prague Weekend Escape',   location: 'Prague, Czechia',        dates: '3–5 Jun 2025',   seats: 4, price: 80,  type: 'CITY BREAK',    host: 'Lukas M.',  rating: 4.7, reviews: 18, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', img: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=500&q=80' },
  { id: 3, title: 'Amalfi Coast Road Trip',  location: 'Amalfi, Italy',          dates: '10–15 Jun 2025', seats: 3, price: 200, type: 'ROAD TRIP',     host: 'Sofia R.',  rating: 5.0, reviews: 41, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80', img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=500&q=80' },
  { id: 4, title: 'Barcelona Beach Vibes',   location: 'Barcelona, Spain',       dates: '20–25 Jun 2025', seats: 6, price: 160, type: 'BEACH',         host: 'Carlos D.', rating: 4.8, reviews: 35, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80', img: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&q=80' },
  { id: 5, title: 'Dolomites Hiking Trip',   location: 'Dolomites, Italy',       dates: '8–12 Jul 2025',  seats: 2, price: 180, type: 'ADVENTURE',     host: 'Marco V.',  rating: 4.9, reviews: 27, avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=60&q=80', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80' },
  { id: 6, title: 'Kraków Cultural Tour',    location: 'Kraków, Poland',         dates: '1–4 Jul 2025',   seats: 5, price: 70,  type: 'CITY BREAK',    host: 'Anna W.',   rating: 4.6, reviews: 14, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80', img: 'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=500&q=80' },
  { id: 7, title: 'Lisbon Weekend Trip',     location: 'Lisbon, Portugal',       dates: '18–20 Jul 2025', seats: 3, price: 110, type: 'WEEKEND GETAWAY', host: 'Pedro F.', rating: 4.7, reviews: 19, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&q=80', img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=500&q=80' },
  { id: 8, title: 'Swiss Alps Ski Weekend',  location: 'Verbier, Switzerland',   dates: '25–27 Jul 2025', seats: 4, price: 220, type: 'SKI TRIP',      host: 'Chloe B.',  rating: 4.9, reviews: 31, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80', img: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&q=80' },
  { id: 9, title: 'Amsterdam City Break',    location: 'Amsterdam, Netherlands', dates: '14–16 Aug 2025', seats: 5, price: 120, type: 'CITY BREAK',    host: 'Emma K.',   rating: 4.8, reviews: 22, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&q=80' },
  { id: 10, title: 'Greek Islands Hop',      location: 'Santorini, Greece',      dates: '5–12 Sep 2025',  seats: 6, price: 300, type: 'BEACH',         host: 'Nikos P.',  rating: 5.0, reviews: 48, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80' },
]

const POPULAR_DESTINATIONS = [
  { name: 'Alps & Mountains', count: 42 },
  { name: 'City Breaks',      count: 89 },
  { name: 'Beach & Coast',    count: 56 },
  { name: 'Eastern Europe',   count: 34 },
  { name: 'Iberian Peninsula',count: 28 },
]

const WHY_ITEMS = [
  'Verified student trip organisers.',
  'Affordable group travel pricing.',
  'Flexible plans that fit your schedule.',
  'Direct chat before you join any trip.',
  'Transparent reviews and safety ratings.',
]

export default function Trip() {
  const { active, loading } = useCategoryActive('trip')
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeType, setActiveType] = useState('All Trips')
  const [search, setSearch] = useState('')

  if (loading) return null
  if (!active) return <CategoryComingSoon name="Trips" />

  const toggleFav = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  const filtered = TRIPS.filter(t =>
    activeType === 'All Trips' || t.type.toLowerCase().includes(activeType.toLowerCase().split(' ')[0])
  )

  return (
    <>
      <Helmet>
        <title>Student Trips in Europe — 1 Euro Pass</title>
        <meta name="description" content="Discover and join affordable student trips across Europe. Weekend getaways, city breaks and adventure travel for international students." />
        <link rel="canonical" href="https://1europass.com/trip" />
      </Helmet>
      <Navbar />
      <main className="tr">

        {/* ── HERO (same structure as Roommates) ── */}
        <div className="roommates__hero">
          <div className="roommates__hero-left">
            <h1 className="roommates__hero-title">
              Explore Europe.<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span className="roommates__hero-accent">Together.</span>
                <img src="/trip-together-underline.svg" alt="" style={{ position: 'absolute', left: 0, bottom: -10, width: '100%', pointerEvents: 'none' }} />
              </span>
            </h1>
            <p style={{ width: 326, fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: '25px', letterSpacing: 0, color: '#40493E', margin: 0 }}>
              Discover amazing places, join student trips,<br />and create unforgettable memories across Europe.
            </p>

            <button className="tr__cta-btn" style={{ alignSelf: 'flex-start', marginTop: 8, padding: '14px 80px' }} onClick={() => navigate('/profile/post/trip')}>
              Create a Trip
            </button>
            <img src="/trip-hero-deco.svg" alt="" style={{ marginTop: 12, width: 100, alignSelf: 'flex-start' }} />
          </div>

          <div className="roommates__hero-right">
            <img src="/trip-hero.svg" alt="Trip illustration" className="roommates__hero-img" />
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div className="bs__content-card">

          {/* ── TRIP TYPE TABS ── */}
          <div className="tr__cats-tabs">
            {TRIP_TYPES.map(type => (
              <button
                key={type.name}
                className={`tr__cat-tab${activeType === type.name ? ' tr__cat-tab--active' : ''}`}
                onClick={() => setActiveType(type.name)}
              >
                {type.icon}
                {type.name}
              </button>
            ))}
          </div>

        {/* ── MAIN BODY ── */}
        <div className="trp__body">

          {/* Filter sidebar */}
          <aside className="trp__filters">
            <h3 className="trp__filters-title">Filter Trips</h3>

            <div className="trp__filter-group">
              <label className="trp__filter-label">Destination</label>
              <div className="trp__input-wrap">
                <input className="trp__input" placeholder="Enter city, country or region" />
                <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="16" height="16" className="trp__input-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>

            <div className="trp__filter-group">
              <label className="trp__filter-label">Dates</label>
              <div className="trp__input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input className="trp__input trp__input--date" placeholder="Select dates" readOnly />
              </div>
            </div>

            <div className="trp__filter-group">
              <label className="trp__filter-label">Price</label>
              <div className="trp__price-row">
                <span className="trp__price-val">€ 0</span>
                <span className="trp__price-val">€ 500+</span>
              </div>
              <input className="trp__range" type="range" min={0} max={500} defaultValue={500} />
            </div>

            <div className="trp__filter-group">
              <label className="trp__filter-label">Trip Type</label>
              {['Solo traveler welcome', 'Group trips', 'Open to all genders'].map(opt => (
                <label key={opt} className="trp__checkbox-row">
                  <input type="checkbox" className="trp__checkbox" />
                  {opt}
                </label>
              ))}
            </div>

            <div className="trp__filter-actions">
              <button className="trp__clear-btn">Clear all</button>
              <button className="trp__apply-btn">Apply filters</button>
            </div>
          </aside>

          {/* Listings */}
          <div className="trp__listings">
            <div className="trp__listings-bar">
              <p className="trp__listings-count">Showing <strong>128 trips</strong></p>
              <div className="trp__listings-bar-right">
                <div className="trp__sort-wrap">
                  <select className="trp__sort-select">
                    <option>Sort by: Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" width="13" height="13" className="trp__sort-icon"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div className="trp__view-toggle">
                  <button className="trp__view-btn trp__view-btn--active">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="15" height="15"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
                  </button>
                  <button className="trp__view-btn">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="15" height="15"><rect x="1" y="2" width="14" height="3" rx="1"/><rect x="1" y="7" width="14" height="3" rx="1"/><rect x="1" y="12" width="14" height="3" rx="1"/></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="trp__grid">
              {filtered.map(trip => (
                <div key={trip.id} className="trp-card" onClick={() => navigate(`/trip/${trip.id}`)}>
                  <div className="trp-card__img-wrap">
                    <img src={trip.img} alt={trip.title} className="trp-card__img" />
                    <span className="trp-card__badge">{trip.type}</span>
                    <button
                      className={`trp-card__fav${favorites.includes(trip.id) ? ' trp-card__fav--active' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleFav(trip.id) }}
                    >
                      <svg viewBox="0 0 24 24" fill={favorites.includes(trip.id) ? '#e05252' : 'none'} stroke={favorites.includes(trip.id) ? '#e05252' : '#555'} strokeWidth="2" width="15" height="15">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="trp-card__body">
                    <h3 className="trp-card__title">{trip.title}</h3>
                    <div className="trp-card__meta-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{trip.location}</span>
                    </div>
                    <div className="trp-card__meta-row">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span>{trip.dates}</span>
                    </div>
                    <p className="trp-card__desc">Scenic lakes, mountains and charming streets. Let's explore</p>
                    <div className="trp-card__footer">
                      <div className="trp-card__host">
                        <img src={trip.avatar} alt={trip.host} className="trp-card__avatar" />
                        <div>
                          <span className="trp-card__host-name">{trip.host}</span>
                          <span className="trp-card__rating">
                            {trip.rating} <svg viewBox="0 0 24 24" fill="#f0a500" width="11" height="11"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span className="trp-card__reviews">({trip.reviews})</span>
                          </span>
                        </div>
                      </div>
                      <div className="trp-card__price">
                        <span className="trp-card__price-val">€{trip.price}</span>
                        <span className="trp-card__price-pp">PER PERSON</span>
                      </div>
                    </div>
                    <div className="trp-card__seats">{trip.seats} seat{trip.seats !== 1 ? 's' : ''} left</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="trp__load-more-wrap">
              <button className="trp__load-more">
                Load more listings
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── FEATURES STRIP ── */}
        <div className="trp__features">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Travel with Friends', desc: 'Join student travelers or invite your friends.' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, title: 'Verified & Safe', desc: 'All trips are verified for your safety and comfort.' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><path d="M4 19V5a2 2 0 0 1 2-2h13.4a.6.6 0 0 1 .6.6v13.114"/><path d="M8 3v8l2.5-1.5L13 11V3"/><path d="M4 17h16"/><path d="M6 21h12a2 2 0 0 0 0-4H4"/></svg>, title: 'Student Friendly', desc: 'Best prices and discounts only for students.' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: 'Amazing Experiences', desc: 'Create memories that last a lifetime.' },
          ].map((f, i, arr) => (
            <div key={i} className="trp__feature">
              {i > 0 && <div className="trp__feature-divider" />}
              <div className="trp__feature-inner">
                <div className="trp__feature-icon">{f.icon}</div>
                <div>
                  <h4 className="trp__feature-title">{f.title}</h4>
                  <p className="trp__feature-desc">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>{/* end bs__content-card */}

      </main>
      <Footer />
    </>
  )
}
