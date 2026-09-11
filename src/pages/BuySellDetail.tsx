import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LISTINGS } from './BuySell'

const FULL_LISTINGS = [
  { id: 1, title: 'MacBook Air M1', price: 250, condition: 'LIKE NEW', location: 'Dublin, Ireland', time: '2h ago', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'], category: 'Electronics', seller: 'Liam O.', sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', sellerJoined: 'Sep 2024', desc: 'Selling my MacBook Air M1 in excellent condition. Used for university work only. Battery health 97%, no scratches on screen or body. Original charger and box included. Upgrading to M3 so letting this go at a great price.' },
  { id: 2, title: '2-Seater Sofa', price: 120, condition: 'GOOD', location: 'Berlin, Germany', time: '5h ago', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80','https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'], category: 'Furniture & Home', seller: 'Jonas K.', sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', sellerJoined: 'Mar 2024', desc: 'Comfortable 2-seater sofa, light grey fabric. Minor wear on the armrests but overall great condition. Perfect for a student apartment. Moving out of Berlin so need to sell ASAP. Buyer arranges pickup.' },
  { id: 3, title: 'Trek Hybrid Bike', price: 90, condition: 'GOOD', location: 'Amsterdam, Netherlands', time: '1d ago', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80','https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80'], category: 'Bikes & Mobility', seller: 'Sven D.', sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80', sellerJoined: 'Jan 2025', desc: 'Trek FX2 hybrid bike, great for city commuting. Recently serviced — new brake pads, chain, and tyres. 21-speed, lightweight aluminium frame. Comes with front & rear lights and a lock.' },
  { id: 4, title: 'Business Books Set', price: 25, condition: 'LIKE NEW', location: 'Madrid, Spain', time: '1d ago', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80'], category: 'Books & Study', seller: 'Ana R.', sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80', sellerJoined: 'Oct 2024', desc: 'Set of 8 business and economics textbooks from my first year. All in like-new condition — barely opened. Includes titles on microeconomics, marketing, accounting, and strategy. Selling as a bundle only.' },
  { id: 5, title: 'Sony WH-CH510 Headphones', price: 35, condition: 'GOOD', location: 'Paris, France', time: '2d ago', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80','https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'], category: 'Electronics', seller: 'Clara M.', sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80', sellerJoined: 'Jun 2024', desc: 'Sony WH-CH510 wireless headphones in good working condition. 35-hour battery life, clear sound quality. Minor cosmetic scratches on the headband but audio is perfect. Comes with USB-C charging cable.' },
  { id: 6, title: 'Nike Air Force 1', price: 45, condition: 'LIKE NEW', location: 'Milan, Italy', time: '2d ago', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'], category: 'Fashion', seller: 'Marco B.', sellerAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=60&q=80', sellerJoined: 'Feb 2025', desc: 'Nike Air Force 1 Low, white, UK size 9. Worn only twice for a photoshoot. Absolutely pristine condition. Original box included. Perfect for anyone who missed out on this colourway.' },
  { id: 7, title: 'IKEA Desk Lamp', price: 18, condition: 'GOOD', location: 'Prague, Czechia', time: '3d ago', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'], category: 'Furniture & Home', seller: 'Tomáš N.', sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&q=80', sellerJoined: 'Apr 2024', desc: 'IKEA Forså work lamp in white. Adjustable arm and head for flexible lighting. Fully working, bulb included. Great for studying. Moving apartments so selling most of my furniture.' },
  { id: 8, title: 'Cookware Set (5 Pcs)', price: 40, condition: 'LIKE NEW', location: 'Vienna, Austria', time: '3d ago', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', imgs: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'], category: 'Kitchen & Appliances', seller: 'Eva H.', sellerAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80', sellerJoined: 'Nov 2023', desc: '5-piece non-stick cookware set — 2 pots, 2 pans, 1 saucepan. Used for 6 months, all in excellent condition. No scratches on the coating. Selling because I\'m moving back home after graduation.' },
]

const CONDITION_COLOR: Record<string, string> = {
  'LIKE NEW': '#5dae61',
  'GOOD': '#f0a500',
}

export default function BuySellDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = FULL_LISTINGS.find(l => l.id === Number(id)) ?? FULL_LISTINGS[0]
  const related = LISTINGS.filter(l => l.id !== item.id).slice(0, 4)

  const [activeImg, setActiveImg] = useState(0)
  const [saved, setSaved] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [msg, setMsg] = useState('')

  return (
    <>
      <Navbar />
      <main className="bsd">

        {/* Breadcrumb */}
        <div className="bsd__breadcrumb-bar">
          <div className="bsd__breadcrumb-inner">
            <nav className="bsd__breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/buy-sell">Buy &amp; Sell</Link>
              <span>/</span>
              <span>{item.title}</span>
            </nav>
          </div>
        </div>

        <div className="bsd__body">

          {/* Left: photos + description */}
          <div className="bsd__left">

            {/* Photo gallery */}
            <div className="bsd__gallery">
              <div className="bsd__gallery-main">
                <img src={item.imgs[activeImg]} alt={item.title} className="bsd__gallery-main-img" />
                <button className="bsd__gallery-save" onClick={() => setSaved(s => !s)} aria-label="Save">
                  <svg viewBox="0 0 24 24" fill={saved ? '#e05252' : 'none'} stroke={saved ? '#e05252' : '#1a1a1a'} strokeWidth="2" width="20" height="20">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>
              {item.imgs.length > 1 && (
                <div className="bsd__gallery-thumbs">
                  {item.imgs.map((src, i) => (
                    <button
                      key={i}
                      className={`bsd__gallery-thumb${activeImg === i ? ' bsd__gallery-thumb--active' : ''}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bsd__section">
              <h2 className="bsd__section-title">Description</h2>
              <p className="bsd__desc">{item.desc}</p>
            </div>

            {/* Details table */}
            <div className="bsd__section">
              <h2 className="bsd__section-title">Item Details</h2>
              <div className="bsd__details-table">
                {[
                  { label: 'Category', value: item.category },
                  { label: 'Condition', value: item.condition },
                  { label: 'Location', value: item.location },
                  { label: 'Listed', value: item.time },
                ].map(row => (
                  <div key={row.label} className="bsd__details-row">
                    <span className="bsd__details-label">{row.label}</span>
                    <span className="bsd__details-value" style={row.label === 'Condition' ? { color: CONDITION_COLOR[row.value], fontWeight: 800 } : {}}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety tips */}
            <div className="bsd__safety-banner">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="22" height="22" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
              </svg>
              <p className="bsd__safety-text">Meet in a public place · Inspect before buying · Never share personal details before agreeing</p>
            </div>

          </div>

          {/* Right: price + seller */}
          <div className="bsd__right">

            {/* Price card */}
            <div className="bsd__price-card">
              <div className="bsd__price-top">
                <span className="bsd__price">€{item.price}</span>
                <span className="bsd__condition-badge" style={{ background: CONDITION_COLOR[item.condition] + '22', color: CONDITION_COLOR[item.condition] }}>
                  {item.condition}
                </span>
              </div>
              <h1 className="bsd__item-title">{item.title}</h1>
              <div className="bsd__location-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span className="bsd__location">{item.location}</span>
                <span className="bsd__time">· {item.time}</span>
              </div>
              <button className="bsd__contact-btn" onClick={() => setMsgOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                Message Seller
              </button>
              <button className="bsd__save-btn" onClick={() => setSaved(s => !s)}>
                <svg viewBox="0 0 24 24" fill={saved ? '#e05252' : 'none'} stroke={saved ? '#e05252' : 'currentColor'} strokeWidth="2" width="16" height="16">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {saved ? 'Saved' : 'Save to wishlist'}
              </button>
            </div>

            {/* Seller card */}
            <div className="bsd__seller-card">
              <h3 className="bsd__seller-heading">Seller</h3>
              <div className="bsd__seller-row">
                <img src={item.sellerAvatar} alt={item.seller} className="bsd__seller-avatar" />
                <div>
                  <p className="bsd__seller-name">{item.seller}</p>
                  <p className="bsd__seller-joined">Member since {item.sellerJoined}</p>
                </div>
              </div>
              <div className="bsd__seller-badges">
                <span className="bsd__seller-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="12" height="12"><polyline points="20 6 9 17 4 12" /></svg>
                  Verified student
                </span>
                <span className="bsd__seller-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="12" height="12"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Responds quickly
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Related listings */}
        <div className="bsd__related">
          <div className="bsd__related-inner">
            <h2 className="bsd__related-title">More listings you might like</h2>
            <div className="bsd__related-grid">
              {related.map(l => (
                <div key={l.id} className="bs__card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/buy-sell/${l.id}`)}>
                  <div className="bs__card-img-wrap">
                    <img src={l.img} alt={l.title} className="bs__card-img" />
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
          </div>
        </div>

      </main>
      <Footer />

      {/* Message modal */}
      {msgOpen && (
        <div className="bsd-modal-overlay" onClick={() => setMsgOpen(false)}>
          <div className="bsd-modal" onClick={e => e.stopPropagation()}>
            <div className="bsd-modal__header">
              <h3 className="bsd-modal__title">Message {item.seller}</h3>
              <button className="bsd-modal__close" onClick={() => setMsgOpen(false)}>✕</button>
            </div>
            <p className="bsd-modal__item-ref">Re: {item.title} — €{item.price}</p>
            <textarea
              className="bsd-modal__textarea"
              rows={4}
              placeholder={`Hi ${item.seller.split(' ')[0]}, is this still available?`}
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
