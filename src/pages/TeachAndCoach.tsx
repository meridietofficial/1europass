import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryComingSoon from '../components/CategoryComingSoon'
import { useCategoryActive } from '../hooks/useCategoryActive'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

interface TacListing {
  id: string
  title: string
  category: string
  subcategory: string | null
  teaching_mode: string | null
  language: string | null
  price: number | null
  price_freq: string | null
  cover_photo: string | null
  full_name: string
  created_at: string
}

interface TacCategory {
  id: string
  name: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Academic':              { bg: '#fff8e8', text: '#d97706' },
  'Coaching':              { bg: '#e8fff0', text: '#16a34a' },
  'Creative & Skills':     { bg: '#fff0e8', text: '#ea580c' },
  'Guidance & Mentoring':  { bg: '#f0e8ff', text: '#7c3aed' },
  'Language Learning':     { bg: '#e8f4ff', text: '#2563eb' },
}

const WHY_ITEMS = [
  'Verified student instructors from top universities.',
  'Affordable student-to-student pricing.',
  'Flexible scheduling that fits your classes.',
  'Direct chat before booking a session.',
  'Transparent reviews and ratings.',
]

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)
}

export default function TeachAndCoach() {
  const { active, loading: catLoading } = useCategoryActive('tutor')
  const [listings, setListings] = useState<TacListing[]>([])
  const [categories, setCategories] = useState<TacCategory[]>([])
  const [loadingListings, setLoadingListings] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    apiGet<{ data: TacCategory[] }>(ENDPOINTS.teachAndCoach.categories)
      .then(res => setCategories(res.data))
      .catch(() => {})

    apiGet<{ data: TacListing[] }>(ENDPOINTS.teachAndCoach.list)
      .then(res => setListings(res.data))
      .catch(() => {})
      .finally(() => setLoadingListings(false))
  }, [])

  if (catLoading) return null
  if (!active) return <CategoryComingSoon name="Teach & Coach" />

  const filtered = listings.filter(l => {
    const matchesCat = activeCategory === 'All' || l.category === activeCategory
    const matchesSearch = !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (l.category ?? '').toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Find a Teacher or Coach in Europe — 1 Euro Pass</title>
        <meta name="description" content="Connect with teachers, coaches, professors and mentors across Europe & UK. Find sessions for languages, sports, music, business and more." />
        <link rel="canonical" href="https://1europass.com/teach-and-coach" />
      </Helmet>
      <Navbar />
      <main className="tr">

        {/* HERO */}
        <div className="tr__hero">
          <div className="tr__hero-left-deco">
            <img src="/tutor-hero-left.svg" alt="" className="tr__hero-deco-img" />
          </div>

          <div className="tr__hero-center">
            <h1 className="tr__hero-title">
              Learn Anything.<br />
              <span className="tr__hero-accent">Achieve Everything.</span>
            </h1>
            <img src="/tutor-hero-deco.svg" alt="" className="tr__hero-title-deco" />
            <p className="tr__hero-sub">Connect with fellow students, master new skills, and share your<br />knowledge in our community-driven marketplace.</p>
            <div className="bs__search-bar" style={{ maxWidth: 540 }}>
              <div className="bs__search-input-wrap">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  className="bs__search-input"
                  placeholder="What do you want to learn today?"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="bs__search-btn">Search</button>
            </div>
          </div>

          <div className="tr__hero-right-deco">
            <img src="/tutor-hero-right.svg" alt="" className="tr__hero-deco-img" />
          </div>
        </div>

        {/* WHITE CONTENT CARD */}
        <div className="bs__content-card">
          <div className="bs__main-layout">

            {/* MAIN COLUMN */}
            <div className="bs__main-col">

              {/* CATEGORY FILTER TABS */}
              <div className="tr__cats-tabs">
                <button
                  className={`tr__cat-tab${activeCategory === 'All' ? ' tr__cat-tab--active' : ''}`}
                  onClick={() => setActiveCategory('All')}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="1" width="6" height="6" rx="1"/>
                    <rect x="9" y="1" width="6" height="6" rx="1"/>
                    <rect x="1" y="9" width="6" height="6" rx="1"/>
                    <rect x="9" y="9" width="6" height="6" rx="1"/>
                  </svg>
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`tr__cat-tab${activeCategory === cat.name ? ' tr__cat-tab--active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* LISTINGS GRID */}
              <div className="bs__section">
                <div className="bs__section-header">
                  <h2 className="bs__section-title">
                    {activeCategory === 'All' ? 'All Instructors' : activeCategory}
                  </h2>
                  {filtered.length > 0 && (
                    <span style={{ fontSize: 13, color: '#6b7280' }}>{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</span>
                  )}
                </div>

                {loadingListings && (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                    Loading listings...
                  </div>
                )}

                {!loadingListings && filtered.length === 0 && (
                  <div style={{ padding: '48px 0', textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>📚</div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: '#374151', marginBottom: 6 }}>
                      No listings yet
                    </div>
                    <div style={{ fontSize: 13, color: '#9ca3af' }}>
                      {search ? 'Try a different search term.' : 'Be the first to post a listing in this category.'}
                    </div>
                  </div>
                )}

                {!loadingListings && filtered.length > 0 && (
                  <div className="tr__instructors-grid">
                    {filtered.map(listing => {
                      const colors = CATEGORY_COLORS[listing.category] ?? { bg: '#f5f5f5', text: '#555' }
                      return (
                        <Link key={listing.id} to={`/teach-and-coach/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="tr__card" style={{ cursor: 'pointer' }}>
                          {/* Cover photo or avatar */}
                          <div className="tr__card-avatar-section">
                            <div className="tr__card-avatar-wrap">
                              {listing.cover_photo ? (
                                <img src={listing.cover_photo} alt={listing.title} className="tr__card-avatar" style={{ objectFit: 'cover' }} />
                              ) : (
                                <div className="tr__card-avatar" style={{ background: '#e8f4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#5dae61' }}>
                                  {getInitials(listing.full_name)}
                                </div>
                              )}
                            </div>
                            {listing.teaching_mode && (
                              <div className="tr__card-top">
                                <span style={{ fontSize: 10, fontWeight: 600, background: '#f0fdf4', color: '#16a34a', borderRadius: 20, padding: '2px 8px', border: '1px solid #bbf7d0' }}>
                                  {listing.teaching_mode}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="tr__card-body">
                            <div className="tr__card-name" style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 2 }}>
                              {listing.title}
                            </div>
                            <div className="tr__card-specialty" style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
                              by {listing.full_name}
                            </div>
                            {listing.language && (
                              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>
                                {listing.language}
                              </div>
                            )}
                            <div className="tr__card-price">
                              {listing.price != null ? (
                                <>€{Number(listing.price).toLocaleString()} <span>/ {listing.price_freq ?? 'hr'}</span></>
                              ) : (
                                <span style={{ color: '#9ca3af', fontSize: 12 }}>Price on request</span>
                              )}
                            </div>
                            <span
                              className="tr__card-badge"
                              style={{ background: colors.bg, color: colors.text }}
                            >
                              {listing.subcategory ?? listing.category}
                            </span>
                          </div>
                        </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* CTA BANNER */}
              <div className="tr__cta-banner">
                <img src="/cta-tutor-deco.svg" alt="" className="tr__cta-img" />
                <div className="tr__cta-text">
                  <div className="tr__cta-title">Can't find what you need?</div>
                  <div className="tr__cta-sub">Post a request and let qualified instructors come to you.</div>
                </div>
                <button className="tr__cta-btn">Post a Listing</button>
              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="bs__sidebar">

              {/* WHY LEARN WITH US */}
              <div className="bs__sidebar-card tr__why-card">
                <h3 className="tr__why-title">Why Learn with Us?</h3>
                {WHY_ITEMS.map(item => (
                  <div key={item} className="tr__why-item">
                    <span className="tr__why-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
                <img src="/why-learn-deco.svg" alt="" className="tr__why-deco" />
                <button className="tr__become-btn">Become an Instructor</button>
                <p className="tr__become-sub">Share Your Knowledge. Earn Money.</p>
              </div>

              {/* LEARNING TIP */}
              <div className="bs__sidebar-card tr__tip-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <img src="/learning-tip-deco.svg" alt="" className="tr__tip-right-deco" />
                <div className="tr__tip-header">
                  <img src="/footer-bulb.svg" alt="" className="tr__tip-bulb" />
                  <h3 className="tr__tip-title">Learning Tip</h3>
                </div>
                <p className="tr__tip-text">Set a goal, stay consistent<br />and track your progress.<br />Small steps, big results!</p>
              </div>

            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
