import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryComingSoon from '../components/CategoryComingSoon'
import { useCategoryActive } from '../hooks/useCategoryActive'

const CATEGORIES = [
  { name: 'All Categories', icon: null },
  { name: 'Languages',      icon: 'fa-solid fa-language' },
  { name: 'Academic',       icon: 'fa-solid fa-graduation-cap' },
  { name: 'IT & Software',  icon: 'fa-solid fa-code' },
  { name: 'Design',         icon: 'fa-solid fa-pen-nib' },
  { name: 'Business',       icon: 'fa-solid fa-briefcase' },
]

const CATEGORY_COLOR: Record<string, string> = {
  Language:      '#e8f4ff',
  'IT & Software': '#f0e8ff',
  Design:        '#fff0e8',
  Business:      '#e8fff0',
  Academic:      '#fff8e8',
}

const CATEGORY_TEXT: Record<string, string> = {
  Language:      '#2563eb',
  'IT & Software': '#7c3aed',
  Design:        '#ea580c',
  Business:      '#16a34a',
  Academic:      '#d97706',
}

const INSTRUCTORS = [
  { id: 1,  name: 'Carlos Mendoza',  specialty: 'Spanish Language Expert',  rating: 4.9, price: 15, category: 'Language',      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { id: 2,  name: 'Priya Sharma',    specialty: 'Python Developer',          rating: 5.0, price: 20, category: 'IT & Software', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80' },
  { id: 3,  name: 'Lukas Becker',    specialty: 'Graphic Designer',          rating: 4.8, price: 18, category: 'Design',        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { id: 4,  name: 'Sophie Martin',   specialty: 'French Language Expert',    rating: 4.9, price: 12, category: 'Language',      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { id: 5,  name: 'Ahmed Khan',      specialty: 'Business Coach',            rating: 4.7, price: 25, category: 'Business',      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { id: 6,  name: 'Emma Wilson',     specialty: 'IELTS & English Tutor',     rating: 4.9, price: 14, category: 'Academic',      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' },
  { id: 7,  name: 'Ravi Patel',      specialty: 'Data Science & ML',         rating: 4.8, price: 22, category: 'IT & Software', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' },
  { id: 8,  name: 'Julia Hoffmann',  specialty: 'German Language Expert',    rating: 4.6, price: 16, category: 'Language',      img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80' },
  { id: 9,  name: 'Marco Rossi',     specialty: 'Business & Marketing',      rating: 4.7, price: 20, category: 'Business',      img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80' },
  { id: 10, name: 'Aisha Ndiaye',    specialty: 'UI/UX Designer',            rating: 5.0, price: 19, category: 'Design',        img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80' },
]

const TOPICS = [
  { icon: '/topic-ielts.svg',      name: 'IELTS Prep',        count: 42 },
  { icon: '/topic-english.svg',    name: 'English Speaking',  count: 89 },
  { icon: '/topic-webdev.svg',     name: 'Web Dev',           count: 56 },
  { icon: '/topic-excel.svg',      name: 'Excel & Data',      count: 34 },
  { icon: '/topic-marketing.svg',  name: 'Digital Marketing', count: 28 },
]

const WHY_ITEMS = [
  'Verified student instructors from top universities.',
  'Affordable student-to-student pricing.',
  'Flexible scheduling that fits your classes.',
  'Direct chat before booking a session.',
  'Transparent reviews and ratings.',
]

export default function Tutor() {
  const { active, loading } = useCategoryActive('tutor')
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState('All Categories')
  const [search, setSearch] = useState('')

  if (loading) return null
  if (!active) return <CategoryComingSoon name="Tutor" />

  const toggleFav = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  return (
    <>
      <Helmet>
        <title>Find a Tutor in Europe — 1 Euro Pass</title>
        <meta name="description" content="Get academic help from verified student tutors across Europe & UK. Find tutors for languages, math, IT, design and more." />
        <link rel="canonical" href="https://1europass.com/tutor" />
      </Helmet>
      <Navbar />
      <main className="tr">

        {/* ── HERO ── */}
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

          <div className="tr__hero-right-deco">
            <img src="/tutor-hero-right.svg" alt="" className="tr__hero-deco-img" />
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div className="bs__content-card">
          <div className="bs__main-layout">

            {/* ── LEFT / MAIN COLUMN ── */}
            <div className="bs__main-col">

              {/* CATEGORY FILTER TABS */}
              <div className="tr__cats-tabs">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    className={`tr__cat-tab${activeCategory === cat.name ? ' tr__cat-tab--active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.icon
                      ? <i className={cat.icon} />
                      : <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
                    }
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* POPULAR INSTRUCTORS */}
              <div className="bs__section">
                <div className="bs__section-header">
                  <h2 className="bs__section-title">Popular Instructors</h2>
                  <button className="bs__view-all">View All</button>
                </div>

                <div className="tr__instructors-grid">
                  {INSTRUCTORS.map(ins => (
                    <div key={ins.id} className="tr__card">
                      <div className="tr__card-avatar-section">
                        <div className="tr__card-avatar-wrap">
                          <img src={ins.img} alt={ins.name} className="tr__card-avatar" />
                        </div>
                        <div className="tr__card-top">
                          <span className="tr__card-rating">⭐ {ins.rating}</span>
                          <button
                            className={`tr__card-fav${favorites.includes(ins.id) ? ' tr__card-fav--active' : ''}`}
                            onClick={() => toggleFav(ins.id)}
                          >♥</button>
                        </div>
                      </div>
                      <div className="tr__card-body">
                        <div className="tr__card-name">{ins.name}</div>
                        <div className="tr__card-specialty">{ins.specialty}</div>
                        <div className="tr__card-price">€{ins.price} <span>/hr</span></div>
                        <span
                          className="tr__card-badge"
                          style={{
                            background: CATEGORY_COLOR[ins.category] ?? '#f5f5f5',
                            color: CATEGORY_TEXT[ins.category] ?? '#555',
                          }}
                        >{ins.category}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bs__load-more-wrap">
                  <button className="bs__load-more">Load more listings ↓</button>
                </div>
              </div>

              {/* EXPLORE POPULAR TOPICS */}
              <div className="bs__section">
                <h2 className="bs__section-title">Explore Popular Topics</h2>
                <div className="tr__topics-grid">
                  {TOPICS.map(topic => (
                    <button key={topic.name} className="tr__topic-card">
                      <img src={topic.icon} alt="" className="tr__topic-icon" />
                      <div className="tr__topic-info">
                        <span className="tr__topic-name">{topic.name}</span>
                        <span className="tr__topic-count">{topic.count} Instructors</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA BANNER */}
              <div className="tr__cta-banner">
                <img src="/cta-tutor-deco.svg" alt="" className="tr__cta-img" />
                <div className="tr__cta-text">
                  <div className="tr__cta-title">Can't find what you need?</div>
                  <div className="tr__cta-sub">Post a request and let qualified instructors come to you.</div>
                </div>
                <button className="tr__cta-btn">Request a Class</button>
              </div>

            </div>

            {/* ── RIGHT SIDEBAR ── */}
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
