import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CATEGORIES = [
  { name: 'Furniture & Home',            img: '/cat-bs-furniture.svg',    bg: '#FFFFFF' },
  { name: 'Electronics',                 img: '/cat-bs-electronics.svg',  bg: '#FFFFFF' },
  { name: 'Books & Study',               img: '/cat-bs-books.svg',        bg: '#FFFFFF' },
  { name: 'Fashion',                     img: '/cat-bs-others.svg',       bg: '#FFFFFF' },
  { name: 'Bikes & Mobility',            img: '/cat-bs-free.svg',         bg: '#FFFFFF' },
  { name: 'Kitchen & Appliances',        img: '/cat-bs-tickets.svg',      bg: '#FFFFFF' },
  { name: 'Sport & Fitness',             img: '/cat-bs-university.svg',   bg: '#FFFFFF' },
  { name: 'Gaming & Entertainment',      img: '/cat-bs-moving.svg',       bg: '#FFFFFF' },
  { name: 'Moving & Student Essentials', img: '/cat-bs-gaming.svg',       bg: '#FFFFFF' },
  { name: 'University & Campus',         img: '/cat-bs-sports.svg',       bg: '#FFFFFF' },
  { name: 'Tickets & Passes',            img: '/cat-bs-kitchen.svg',      bg: '#FFFFFF' },
  { name: 'Free Stuff',                  img: '/cat-bs-bikes.svg',        bg: '#FFFFFF' },
  { name: 'Others',                      img: '/cat-bs-fashion.svg',      bg: '#FFFFFF' },
]

export const LISTINGS = [
  { id: 1,  title: 'MacBook Air M1',       price: 250, condition: 'LIKE NEW', location: 'Dublin, Ireland',      time: '2h ago',  img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
  { id: 2,  title: '2-Seater Sofa',        price: 120, condition: 'GOOD',     location: 'Berlin, Germany',      time: '5h ago',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { id: 3,  title: 'Trek Hybrid Bike',     price: 90,  condition: 'GOOD',     location: 'Amsterdam, Neth...',   time: '1d ago',  img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80' },
  { id: 4,  title: 'Business Books Set',   price: 25,  condition: 'LIKE NEW', location: 'Madrid, Spain',        time: '1d ago',  img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80' },
  { id: 5,  title: 'Sony WH-CH510 He...', price: 35,  condition: 'GOOD',     location: 'Paris, France',        time: '2d ago',  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
  { id: 6,  title: 'Nike Air Force 1',     price: 45,  condition: 'LIKE NEW', location: 'Milan, Italy',         time: '2d ago',  img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: 7,  title: 'IKEA Desk Lamp',       price: 18,  condition: 'GOOD',     location: 'Prague, Czechia',      time: '3d ago',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: 8,  title: 'Cookware Set (5 Pcs)', price: 40,  condition: 'LIKE NEW', location: 'Vienna, Austria',      time: '3d ago',  img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
]

const POPULAR_SEARCHES = ['iPhone', 'Bicycle', 'Desk', 'Chair', 'Textbooks', 'Headphones', 'Shoes', 'Laptop', 'Fridge']

const CONDITION_COLOR: Record<string, string> = {
  'LIKE NEW': '#5dae61',
  'GOOD':     '#f0a500',
}

export default function BuySell() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [search, setSearch] = useState('')
  const [showAllCats, setShowAllCats] = useState(false)
  const navigate = useNavigate()

  const toggleFav = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  return (
    <>
      <Navbar />
      <main className="bs">

        {/* ── HERO ── */}
        <div className="bs__hero">
          <div className="bs__hero-left-deco">
            <img src="/bs-hero-left.svg" alt="" className="bs__hero-deco-img" />
          </div>

          <div className="bs__hero-center">
            <h1 className="bs__hero-title">
              Buy, <span className="bs__hero-accent">Sell,</span> Save.
            </h1>
            <p className="bs__hero-sub">Find amazing deals from students near you.</p>
            <div className="bs__search-bar">
              <div className="bs__search-input-wrap">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  className="bs__search-input"
                  placeholder="Search for items, brands or keywords..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="bs__search-divider" />
              <div className="bs__search-location">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <select className="bs__search-loc-select">
                  <option>All Locations</option>
                  <option>Berlin</option>
                  <option>Amsterdam</option>
                  <option>Paris</option>
                  <option>Dublin</option>
                  <option>Madrid</option>
                </select>
              </div>
              <button className="bs__search-btn">Search</button>
            </div>
          </div>

          <div className="bs__hero-right-deco">
            <img src="/bs-hero-right.svg" alt="" className="bs__hero-deco-img" />
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div className="bs__content-card">
          <div className="bs__main-layout">

            {/* ── LEFT / MAIN COLUMN ── */}
            <div className="bs__main-col">

              {/* SHOP BY CATEGORY */}
              <div className="bs__section">
                <div className="bs__section-header">
                  <h2 className="bs__section-title">Shop by Category</h2>
                  <button className="bs__view-all" onClick={() => setShowAllCats(true)}>View all categories →</button>
                </div>
                <div className="bs__cats-row">
                  {CATEGORIES.map(c => (
                    <button key={c.name} className="bs__cat-btn" style={{ background: c.bg }}>
                      <div className="bs__cat-img-wrap">
                        <img src={c.img} alt={c.name} className="bs__cat-img" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </div>
                      <span className="bs__cat-name">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FEATURED LISTINGS */}
              <div className="bs__section">
                <h2 className="bs__section-title">Featured Listings</h2>

                {/* FILTERS */}
                <div className="bs__filters-bar">
                  <div className="bs__select-wrap"><select className="bs__filter-select"><option>All Categories</option></select></div>
                  <div className="bs__select-wrap"><select className="bs__filter-select"><option>Price: Any</option><option>Under €50</option><option>€50–€200</option><option>€200+</option></select></div>
                  <div className="bs__select-wrap"><select className="bs__filter-select"><option>Distance: Any</option><option>5 km</option><option>10 km</option><option>25 km</option></select></div>
                  <div className="bs__select-wrap"><select className="bs__filter-select"><option>Condition: Any</option><option>Like New</option><option>Good</option><option>Fair</option></select></div>
                  <label className="bs__filter-check"><input type="checkbox" /> Free Items</label>
                  <div className="bs__filter-spacer" />
                  <div className="bs__select-wrap"><select className="bs__sort-select"><option>Sort by: Newest</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
                  <div className="bs__view-toggle">
                    <button className="bs__view-btn bs__view-btn--active">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
                        <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
                      </svg>
                    </button>
                    <button className="bs__view-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <rect x="1" y="2" width="14" height="3" rx="1"/><rect x="1" y="7" width="14" height="3" rx="1"/><rect x="1" y="12" width="14" height="3" rx="1"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* LISTINGS GRID */}
                <div className="bs__grid">
                  {LISTINGS.map(l => (
                    <div key={l.id} className="bs__card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/buy-sell/${l.id}`)}>
                      <div className="bs__card-img-wrap">
                        <img src={l.img} alt={l.title} className="bs__card-img" />
                        <button
                          className={`bs__card-fav${favorites.includes(l.id) ? ' bs__card-fav--active' : ''}`}
                          onClick={() => toggleFav(l.id)}
                        >♥</button>
                      </div>
                      <div className="bs__card-body">
                        <span className="bs__card-price">€{l.price}</span>
                        <div className="bs__card-title-row">
                          <span className="bs__card-title">{l.title}</span>
                          <span className="bs__card-condition" style={{ color: CONDITION_COLOR[l.condition] }}>{l.condition}</span>
                        </div>
                        <div className="bs__card-meta">
                          <span className="bs__card-location">📍 {l.location}</span>
                          <span className="bs__card-time">{l.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* LOAD MORE */}
                <div className="bs__load-more-wrap">
                  <button className="bs__load-more">Load more listings ↓</button>
                </div>
              </div>

            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <aside className="bs__sidebar">

              {/* POST AN ITEM */}
              <div className="bs__sidebar-card bs__sidebar-card--dark">
                <div className="bs__post-header">
                  <div className="bs__post-header-left">
                    <h3 className="bs__post-title">Post an Item</h3>
                    <p className="bs__post-sub">List in seconds. Sell in euros.</p>
                    <div className="bs__post-btn-wrap">
                      <button className="bs__post-btn" onClick={() => navigate('/profile/post/buy-sell')}>+ Post Your Item</button>
                      <p className="bs__post-fee">Just €1 per listing ⓘ</p>
                    </div>
                  </div>
                  <img src="/post-item-deco.svg" alt="" className="bs__post-deco" />
                </div>
              </div>

              {/* SAFETY TIPS */}
              <div className="bs__sidebar-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="/safety-tips-deco.svg" alt="" className="bs__safety-deco" />
                <div className="bs__safety-header">
                  <img src="/safety-tips-icon.svg" alt="" className="bs__safety-icon" />
                  <h3 className="bs__safety-title">Safety Tips</h3>
                </div>
                <p className="bs__safety-sub">Stay safe while buying &amp; selling.</p>
                {[
                  'Meet in a public place',
                  'Inspect the item before buying',
                  'Pay securely – cash or trusted methods',
                  'Never share personal information',
                ].map(tip => (
                  <div key={tip} className="bs__safety-item">
                    <span className="bs__safety-check">✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
                <button className="bs__safety-link">View all safety tips →</button>
              </div>

              {/* NEED SOMETHING */}
              <div className="bs__sidebar-card bs__sidebar-card--purple" style={{ position: 'relative', overflow: 'hidden' }}>
                <h3 className="bs__need-title">Need Something?</h3>
                <p className="bs__need-sub">Can't find what you're looking for?</p>
                <button className="bs__need-btn">Create Want Ad →</button>
                <img src="/need-something-deco.svg" alt="" className="bs__need-img" />
              </div>

              {/* POPULAR SEARCHES */}
              <div className="bs__sidebar-card">
                <h3 className="bs__popular-title">Popular Searches</h3>
                <div className="bs__popular-tags">
                  {POPULAR_SEARCHES.map(tag => (
                    <button key={tag} className="bs__popular-tag">{tag}</button>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>
      <Footer />

      {/* ── ALL CATEGORIES MODAL ── */}
      {showAllCats && (
        <div className="bs-modal-overlay" onClick={() => setShowAllCats(false)}>
          <div className="bs-modal" onClick={e => e.stopPropagation()}>
            <div className="bs-modal__header">
              <h2 className="bs-modal__title">All Categories</h2>
              <button className="bs-modal__close" onClick={() => setShowAllCats(false)}>✕</button>
            </div>
            <div className="bs-modal__grid">
              {CATEGORIES.map(c => (
                <button key={c.name} className="bs-modal__item" onClick={() => setShowAllCats(false)}>
                  <div className="bs-modal__img-wrap">
                    <img src={c.img} alt={c.name} className="bs-modal__img" />
                  </div>
                  <span className="bs-modal__name">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
