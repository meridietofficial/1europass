import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CATEGORIES: Record<string, string[]> = {
  'Electronics': ['Phones', 'Laptops & Computers', 'Tablets', 'Headphones & Audio', 'Gaming', 'Cameras & Photography', 'TVs & Monitors', 'Accessories', 'Other Electronics'],
  'Books & Study': ['Textbooks', 'Study Notes', 'Stationery', 'Calculators', 'Other Study Items'],
  'Clothing & Fashion': ["Men's Clothing", "Women's Clothing", 'Shoes', 'Bags & Backpacks', 'Accessories', 'Other Fashion'],
  'Furniture': ['Desks & Chairs', 'Beds & Mattresses', 'Storage & Shelving', 'Sofas & Seating', 'Lighting', 'Other Furniture'],
  'Sports & Fitness': ['Bikes', 'Gym Equipment', 'Sports Gear', 'Outdoor & Camping', 'Other Sports'],
  'Kitchen & Home': ['Appliances', 'Kitchenware', 'Bedding & Linens', 'Home Decor', 'Cleaning Supplies', 'Other Home'],
  'Music & Arts': ['Instruments', 'Art & Craft Supplies', 'Music Accessories', 'Other'],
  'Bikes & Transport': ['Bikes', 'Scooters & Skateboards', 'Accessories', 'Other Transport'],
  'Other': ['Other Items'],
}

const CONDITIONS = [
  { id: 'new', label: 'New', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> },
  { id: 'like-new', label: 'Like New', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" /><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg> },
  { id: 'good', label: 'Good', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" /></svg> },
  { id: 'fair', label: 'Fair', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10" /><line x1="8" y1="15" x2="16" y2="15" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> },
  { id: 'used', label: 'Used', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg> },
]

interface NominatimResult {
  display_name: string
  address: { city?: string; town?: string; village?: string; municipality?: string }
}

export default function CreateBuySellListing() {
  const navigate = useNavigate()

  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [title, setTitle] = useState('')
  const [condition, setCondition] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)

  const subcategories = category ? CATEGORIES[category] ?? [] : []

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setSuggestions([]); return }
    setSearchLoading(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=5`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data: NominatimResult[] = await res.json()
      setSuggestions(data)
      setShowSuggestions(true)
    } catch { setSuggestions([]) }
    finally { setSearchLoading(false) }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => fetchSuggestions(location), 400)
    return () => clearTimeout(t)
  }, [location, fetchSuggestions])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function selectSuggestion(item: NominatimResult) {
    const a = item.address
    const city = a.city || a.town || a.village || a.municipality || ''
    setLocation(city ? `${city}, ${item.display_name.split(',').slice(-1)[0].trim()}` : item.display_name.split(',').slice(0, 2).join(',').trim())
    setShowSuggestions(false)
    setSuggestions([])
  }

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Buy &amp; Sell</span>
              </nav>
              <h1 className="cl-hero__title">Post Your Item</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
            </div>
            <div className="cl-steps">
              <div className="cl-step is-active">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Item Details</span>
                  <span className="cl-step__sub">What are you selling?</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Photos</span>
                  <span className="cl-step__sub">Make your listing stand out</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; publish</span>
                  <span className="cl-step__sub">See what others will see</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-card">
          <div className="cl-body">
            <div className="cl-left">
              <div className="crl-form-body">

                <div className="crl-form-section">
                  {/* Form header */}
                  <div className="bsl-form-header">
                    <div>
                      <h2 className="bsl-form-title">Item Details</h2>
                      <p className="bsl-form-sub">Fill in all the details to help buyers find your item.</p>
                    </div>
                    <div className="bsl-form-header__illus" aria-hidden="true">
                      <svg viewBox="0 0 120 90" fill="none" width="120" height="90">
                        <rect x="20" y="38" width="60" height="44" rx="4" fill="#f4b942" stroke="#1a1a1a" strokeWidth="2" />
                        <path d="M20 50h60" stroke="#1a1a1a" strokeWidth="2" />
                        <path d="M50 38v-10a12 12 0 0 0-24 0v10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="38" cy="56" r="4" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
                        <path d="M90 20c2-4 6-3 5 1" stroke="#5dae61" strokeWidth="2" strokeLinecap="round" />
                        <path d="M95 10l1-3M100 14l3-1M97 18l2 2" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M10 30c-2-3 2-6 4-3" stroke="#5dae61" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Category + Subcategory */}
                  <div className="bsl-cat-row">
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Category *
                      </h3>
                      <div className="crp-select-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="14" height="14" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
                          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        <select
                          className="crp-select"
                          style={{ paddingLeft: 32 }}
                          value={category}
                          onChange={e => { setCategory(e.target.value); setSubcategory('') }}
                        >
                          <option value="">Select a category</option>
                          {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        Subcategory *
                      </h3>
                      <div className="crp-select-wrap">
                        <select
                          className="crp-select"
                          value={subcategory}
                          onChange={e => setSubcategory(e.target.value)}
                          disabled={!category}
                        >
                          <option value="">Select a subcategory</option>
                          {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Item Title */}
                  <div style={{ marginBottom: 18 }}>
                    <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Item Title *
                    </h3>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. iPhone 14 Pro - 256GB"
                        maxLength={80}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                      <span className="cl-char-count" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', marginTop: 0 }}>{title.length}/80</span>
                    </div>
                  </div>

                  {/* Condition */}
                  <div style={{ marginBottom: 18 }}>
                    <h3 className="cl-card__title" style={{ marginBottom: 10 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Condition *
                    </h3>
                    <div className="bsl-condition-btns">
                      {CONDITIONS.map(c => (
                        <button
                          key={c.id}
                          type="button"
                          className={`bsl-condition-btn${condition === c.id ? ' is-active' : ''}`}
                          onClick={() => setCondition(condition === c.id ? '' : c.id)}
                        >
                          {c.icon}
                          {c.label}
                          {condition === c.id && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price + Location */}
                  <div className="crl-location-rent-row" style={{ marginBottom: 18 }}>
                    <div className="crl-field-group">
                      <h3 className="cl-card__title" style={{ marginBottom: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Price *
                      </h3>
                      <div className="cl-euro-wrap" style={{ marginTop: 6 }}>
                        <span className="cl-euro-sym">€</span>
                        <input
                          className="cl-input cl-input--euro"
                          type="number"
                          min="0"
                          placeholder="Enter price"
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                        />
                      </div>
                      <p className="cl-card__sub" style={{ marginTop: 4 }}>Enter the selling price in euros.</p>
                    </div>
                    <div className="crl-field-group" style={{ flex: 1 }}>
                      <h3 className="cl-card__title" style={{ marginBottom: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        Location *
                      </h3>
                      <div className="cl-location-search" ref={searchRef} style={{ marginTop: 6 }}>
                        <div className="cl-iicon-wrap">
                          {searchLoading
                            ? <svg className="cl-iicon cl-iicon--spin" viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                            : <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          }
                          <input
                            className="cl-input cl-input--pl"
                            type="text"
                            placeholder="Enter your location or city"
                            value={location}
                            onChange={e => { setLocation(e.target.value); setShowSuggestions(true) }}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            autoComplete="off"
                          />
                          {location && (
                            <button className="cl-input-clear" type="button" onClick={() => { setLocation(''); setSuggestions([]); setShowSuggestions(false) }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </button>
                          )}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                          <ul className="cl-suggestions">
                            {suggestions.map((s, i) => (
                              <li key={i} className="cl-suggestion-item" onMouseDown={() => selectSuggestion(s)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="13" height="13" style={{ flexShrink: 0, marginTop: 2 }}>
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{s.display_name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <p className="cl-card__sub" style={{ marginTop: 4 }}>City, area or postcode</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                      </svg>
                      Description *
                    </h3>
                    <p className="cl-card__sub" style={{ marginBottom: 8 }}>Describe your item, its features, condition, and any other important details.</p>
                    <textarea
                      className="cl-textarea"
                      rows={6}
                      placeholder="Write a detailed description..."
                      value={description}
                      onChange={e => setDescription(e.target.value.slice(0, 1000))}
                    />
                    <div className="cl-char-count">{description.length}/1000</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>

              {/* Selling on 1 Euro Pass */}
              <div className="cl-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                  </svg>
                  Selling on 1 Euro Pass is Easy!
                </h3>
                <div className="bsl-selling-list">
                  <div className="bsl-selling-item">
                    <div className="bsl-selling-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </div>
                    <div>
                      <p className="bsl-selling-item__title">List in seconds</p>
                      <p className="bsl-selling-item__desc">Create your listing in just a few steps.</p>
                    </div>
                  </div>
                  <div className="bsl-selling-item">
                    <div className="bsl-selling-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <div>
                      <p className="bsl-selling-item__title">Reach students</p>
                      <p className="bsl-selling-item__desc">Your item will be seen by thousands.</p>
                    </div>
                  </div>
                  <div className="bsl-selling-item">
                    <div className="bsl-selling-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                    </div>
                    <div>
                      <p className="bsl-selling-item__title">Sell safely</p>
                      <p className="bsl-selling-item__desc">Follow our safety tips for a secure deal.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for a Great Listing */}
              <div className="cl-card bsl-tips-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2" width="17" height="17"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  Tips for a Great Listing
                </h3>
                <div className="bsl-tips-list">
                  {[
                    'Choose the right category',
                    'Add clear photos',
                    'Write a detailed description',
                    'Set a fair price',
                    'Respond to buyers quickly',
                  ].map(tip => (
                    <div key={tip} className="bsl-tip-item">
                      <svg viewBox="0 0 24 24" fill="#5dae61" stroke="#5dae61" strokeWidth="0" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="cl-card bsl-help-card">
                <div className="bsl-help-card__inner">
                  <div>
                    <h4 className="bsl-help-card__title">Need Help?</h4>
                    <p className="bsl-help-card__desc">Check our guidelines for posting items.</p>
                    <button type="button" className="bsl-help-card__btn">
                      View Posting Guidelines
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <div className="bsl-help-card__illus" aria-hidden="true">
                    <svg viewBox="0 0 60 70" fill="none" width="56" height="56">
                      <rect x="10" y="20" width="36" height="44" rx="3" fill="#e8d5f5" stroke="#1a1a1a" strokeWidth="1.5" />
                      <path d="M18 32h20M18 39h20M18 46h12" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M40 8l6 4-4 6" stroke="#5dae61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="48" cy="10" r="3" fill="#f4b942" stroke="#1a1a1a" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <button type="button" className="cl-next-btn" onClick={() => navigate('/profile/post/buy-sell/photos')}>
                Next: Photos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <p className="cl-footer-bar__note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" style={{ display: 'inline', marginRight: 3 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                One-time payment of €1 to publish
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
