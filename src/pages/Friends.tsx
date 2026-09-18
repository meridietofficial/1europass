import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryComingSoon from '../components/CategoryComingSoon'
import { useCategoryActive } from '../hooks/useCategoryActive'

const INTEREST_TABS = [
  { name: 'All',        icon: <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg> },
  { name: 'Sports',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/></svg> },
  { name: 'Music',      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
  { name: 'Gaming',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4"/><circle cx="16" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg> },
  { name: 'Travel',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { name: 'Art',        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
  { name: 'Cooking',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
]

const TAG_COLORS: Record<string, string> = {
  Football: '#e8f5e9', Basketball: '#e3f2fd', Tennis: '#fff8e1',
  Running: '#fce4ec', Cycling: '#f3e5f5', Hiking: '#e8f5e9',
  Guitar: '#fff3e0', Piano: '#e8eaf6', Singing: '#fce4ec',
  Gaming: '#ede7f6', 'Board games': '#e0f2f1', Streaming: '#e8eaf6',
  Cooking: '#fff8e1', Baking: '#fce4ec', Vegan: '#e8f5e9',
  Photography: '#e3f2fd', Painting: '#fce4ec', Drawing: '#fff3e0',
  Yoga: '#e8f5e9', Gym: '#e3f2fd', Dancing: '#fce4ec',
  Reading: '#fff8e1', Writing: '#e8eaf6', Podcasts: '#e0f2f1',
  Travel: '#e3f2fd', Languages: '#e8f5e9', Movies: '#fce4ec',
}

const PROFILES = [
  { id: 1, name: 'Sofia R.',    age: 21, initials: 'SR', gradient: 'linear-gradient(135deg,#a8edea,#fed6e3)', city: 'Amsterdam', university: 'University of Amsterdam', tags: ['Reading', 'Yoga', 'Travel'], bio: 'Exchange student from Italy. Love coffee, books & long walks.', verified: true, mutual: 3 },
  { id: 2, name: 'Lukas M.',    age: 23, initials: 'LM', gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)', city: 'Berlin', university: 'Humboldt University', tags: ['Football', 'Gaming', 'Cooking'], bio: 'CS student always down for a FIFA match or a cook-off.', verified: true, mutual: 5 },
  { id: 3, name: 'Anna W.',     age: 20, initials: 'AW', gradient: 'linear-gradient(135deg,#c3cfe2,#f5f7fa)', city: 'Prague', university: 'Charles University', tags: ['Photography', 'Travel', 'Languages'], bio: 'Capturing every moment. Speak 4 languages, learning a 5th.', verified: false, mutual: 1 },
  { id: 4, name: 'Carlos D.',   age: 22, initials: 'CD', gradient: 'linear-gradient(135deg,#d4fc79,#96e6a1)', city: 'Barcelona', university: 'Universitat de Barcelona', tags: ['Guitar', 'Hiking', 'Movies'], bio: 'Music & mountains — that’s my vibe. Always up for a jam session.', verified: true, mutual: 8 },
  { id: 5, name: 'Emma K.',     age: 21, initials: 'EK', gradient: 'linear-gradient(135deg,#f8b195,#f67280)', city: 'Paris', university: 'Sorbonne University', tags: ['Painting', 'Baking', 'Yoga'], bio: 'Art student who bakes too much and does yoga to make up for it.', verified: true, mutual: 2 },
  { id: 6, name: 'Marco V.',    age: 24, initials: 'MV', gradient: 'linear-gradient(135deg,#a29bfe,#6c5ce7)', city: 'Milan', university: 'Politecnico di Milano', tags: ['Gym', 'Cooking', 'Podcasts'], bio: 'Engineering student. Into fitness, good food and long podcasts.', verified: false, mutual: 4 },
  { id: 7, name: 'Klara B.',    age: 20, initials: 'KB', gradient: 'linear-gradient(135deg,#fd79a8,#e84393)', city: 'Vienna', university: 'University of Vienna', tags: ['Piano', 'Reading', 'Dancing'], bio: 'Classical pianist by day, salsa dancer by night.', verified: true, mutual: 6 },
  { id: 8, name: 'Nikos P.',    age: 22, initials: 'NP', gradient: 'linear-gradient(135deg,#55efc4,#00b894)', city: 'Athens', university: 'University of Athens', tags: ['Basketball', 'Gaming', 'Movies'], bio: "Sports fan, gamer and movie buff — let's hang!", verified: true, mutual: 0 },
  { id: 9, name: 'Maja T.',     age: 23, initials: 'MT', gradient: 'linear-gradient(135deg,#fdcb6e,#e17055)', city: 'Krakow', university: 'Jagiellonian University', tags: ['Cycling', 'Writing', 'Vegan'], bio: 'Cycling across Poland one route at a time. Vegan cook.', verified: false, mutual: 3 },
]

const CITIES = ['All Cities', 'Amsterdam', 'Berlin', 'Barcelona', 'Prague', 'Paris', 'Milan', 'Vienna', 'Athens']

export default function Friends() {
  const { active, loading } = useCategoryActive('friend')
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [activeCity, setActiveCity] = useState('All Cities')
  const [connections, setConnections] = useState<number[]>([])

  if (loading) return null
  if (!active) return <CategoryComingSoon name="Friends" />

  const toggleConnect = (id: number) =>
    setConnections(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])

  const filtered = PROFILES.filter(p =>
    (activeCity === 'All Cities' || p.city === activeCity) &&
    (activeTab === 'All' || p.tags.some(t => t.toLowerCase().includes(activeTab.toLowerCase().slice(0, 4))))
  )

  return (
    <>
      <Helmet>
        <title>Make Friends as a Student in Europe — 1 Euro Pass</title>
        <meta name="description" content="Meet like-minded international students across Europe & UK. Find friends who share your interests — sports, music, gaming and more." />
        <link rel="canonical" href="https://1europass.com/friends" />
      </Helmet>
      <Navbar />
      <main className="fr">

        {/* ── HERO ── */}
        <div className="roommates__hero">
          <div className="roommates__hero-left">
            <h1 className="roommates__hero-title">
              Make Friends.<br />
              <span className="roommates__hero-accent">Build Bonds.</span>
            </h1>
            <p style={{ width: 340, fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: '25px', color: '#40493E', margin: 0 }}>
              Connect with students who share your interests — across your city, your campus, and all of Europe.
            </p>

            <div className="hero__trust" style={{ marginTop: 8 }}>
              <div className="hero__trust-item">
                <img src="/icon-secure.png" alt="" className="hero__trust-icon" />
                <div className="hero__trust-label">Verified<br />Students</div>
              </div>
              <div className="hero__trust-item">
                <img src="/icon-heart.png" alt="" className="hero__trust-icon" />
                <div className="hero__trust-label">Shared<br />Interests</div>
              </div>
              <div className="hero__trust-item">
                <img src="/icon-tag.png" alt="" className="hero__trust-icon" />
                <div className="hero__trust-label">Free to<br />Connect</div>
              </div>
            </div>

            <div className="roommates__social-proof" style={{ marginTop: 8 }}>
              <div className="roommates__social-avatars">
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#a8edea,#fed6e3)' }}>SR</div>
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#ffecd2,#fcb69f)' }}>LM</div>
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#d4fc79,#96e6a1)' }}>CD</div>
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#a29bfe,#6c5ce7)' }}>MV</div>
              </div>
              <span className="roommates__social-text"><strong>25,000+</strong> students<br />already connected!</span>
            </div>
          </div>

          <div className="roommates__hero-right">
            {/* Illustrated placeholder using CSS art */}
            <div className="fr__hero-illustration">
              <div className="fr__hero-blob fr__hero-blob--1" />
              <div className="fr__hero-blob fr__hero-blob--2" />
              <div className="fr__hero-card fr__hero-card--1">
                <div className="fr__hero-card-avatar" style={{ background: 'linear-gradient(135deg,#a8edea,#fed6e3)' }}>SR</div>
                <div>
                  <div className="fr__hero-card-name">Sofia R.</div>
                  <div className="fr__hero-card-tags">Travel · Yoga · Reading</div>
                </div>
                <div className="fr__hero-card-btn">Connect</div>
              </div>
              <div className="fr__hero-card fr__hero-card--2">
                <div className="fr__hero-card-avatar" style={{ background: 'linear-gradient(135deg,#d4fc79,#96e6a1)' }}>CD</div>
                <div>
                  <div className="fr__hero-card-name">Carlos D.</div>
                  <div className="fr__hero-card-tags">Guitar · Hiking · Movies</div>
                </div>
                <div className="fr__hero-card-btn">Connect</div>
              </div>
              <div className="fr__hero-card fr__hero-card--3">
                <div className="fr__hero-card-avatar" style={{ background: 'linear-gradient(135deg,#fd79a8,#e84393)' }}>KB</div>
                <div>
                  <div className="fr__hero-card-name">Klara B.</div>
                  <div className="fr__hero-card-tags">Piano · Dancing</div>
                </div>
                <div className="fr__hero-card-btn">Connect</div>
              </div>
              <div className="fr__hero-mutual">
                <svg viewBox="0 0 24 24" fill="#5dae61" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>8 mutual friends</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div className="roommates__content-card">

          {/* ── INTEREST TABS ── */}
          <div className="fr__tabs-wrap">
            <div className="tr__cats-tabs" style={{ marginBottom: 0 }}>
              {INTEREST_TABS.map(tab => (
                <button
                  key={tab.name}
                  className={`tr__cat-tab${activeTab === tab.name ? ' tr__cat-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── CITY FILTER ROW ── */}
          <div className="fr__city-row">
            {CITIES.map(city => (
              <button
                key={city}
                className={`fr__city-btn${activeCity === city ? ' fr__city-btn--active' : ''}`}
                onClick={() => setActiveCity(city)}
              >
                {city}
              </button>
            ))}
          </div>

          {/* ── MAIN BODY ── */}
          <div className="fr__body">

            {/* Filter sidebar */}
            <aside className="fr__filters">
              <h3 className="trp__filters-title">Find Friends</h3>

              <div className="trp__filter-group">
                <label className="trp__filter-label">Search by name</label>
                <div className="trp__input-wrap">
                  <input className="trp__input" placeholder="Type a name..." />
                  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="16" height="16" className="trp__input-icon">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>

              <div className="trp__filter-group">
                <label className="trp__filter-label">University</label>
                <div className="trp__input-wrap">
                  <input className="trp__input" placeholder="Enter university..." />
                  <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="16" height="16" className="trp__input-icon">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
              </div>

              <div className="trp__filter-group">
                <label className="trp__filter-label">Interests</label>
                {['Sports', 'Music', 'Gaming', 'Travel', 'Art & Creativity', 'Cooking'].map(opt => (
                  <label key={opt} className="trp__checkbox-row">
                    <input type="checkbox" className="trp__checkbox" />
                    {opt}
                  </label>
                ))}
              </div>

              <div className="trp__filter-group">
                <label className="trp__filter-label">Only verified students</label>
                <label className="trp__checkbox-row">
                  <input type="checkbox" className="trp__checkbox" />
                  Verified only
                </label>
              </div>

              <div className="trp__filter-actions">
                <button className="trp__clear-btn">Clear all</button>
                <button className="trp__apply-btn">Apply filters</button>
              </div>
            </aside>

            {/* Profiles grid */}
            <div className="fr__results">
              <div className="trp__listings-bar">
                <p className="trp__listings-count">Showing <strong>{filtered.length} students</strong></p>
                <div className="trp__listings-bar-right">
                  <div className="trp__sort-wrap">
                    <select className="trp__sort-select">
                      <option>Sort by: Recommended</option>
                      <option>Most mutual friends</option>
                      <option>Newest joined</option>
                    </select>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" width="13" height="13" className="trp__sort-icon"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>

              <div className="fr__grid">
                {filtered.map(p => (
                  <div key={p.id} className="fr-card" onClick={() => navigate(`/friends/${p.id}`)}>
                    <div className="fr-card__top" style={{ background: p.gradient }}>
                      {p.verified && <span className="fr-card__verified">✔ VERIFIED</span>}
                      <button
                        className={`fr-card__connect${connections.includes(p.id) ? ' fr-card__connect--active' : ''}`}
                        onClick={e => { e.stopPropagation(); toggleConnect(p.id) }}
                        title={connections.includes(p.id) ? 'Connected' : 'Connect'}
                      >
                        <svg viewBox="0 0 24 24" fill={connections.includes(p.id) ? '#5dae61' : 'none'} stroke={connections.includes(p.id) ? '#5dae61' : '#555'} strokeWidth="2" width="15" height="15">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </button>
                      <div className="fr-card__avatar-wrap">
                        <div className="fr-card__avatar">{p.initials}</div>
                      </div>
                    </div>
                    <div className="fr-card__body">
                      <div className="fr-card__name-row">
                        <span className="fr-card__name">{p.name}, {p.age}</span>
                        {p.mutual > 0 && (
                          <span className="fr-card__mutual">
                            <svg viewBox="0 0 24 24" fill="#5dae61" width="11" height="11"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            {p.mutual} mutual
                          </span>
                        )}
                      </div>
                      <div className="fr-card__location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {p.city}
                      </div>
                      <div className="fr-card__uni">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        {p.university}
                      </div>
                      <p className="fr-card__bio">{p.bio}</p>
                      <div className="fr-card__tags">
                        {p.tags.map(tag => (
                          <span key={tag} className="fr-card__tag" style={{ background: TAG_COLORS[tag] || '#f5f5f5' }}>{tag}</span>
                        ))}
                      </div>
                      <div className="fr-card__footer">
                        <button className="fr-card__view" onClick={e => { e.stopPropagation(); navigate(`/friends/${p.id}`) }}>View profile</button>
                        <button className={`fr-card__add${connections.includes(p.id) ? ' fr-card__add--done' : ''}`} onClick={e => { e.stopPropagation(); toggleConnect(p.id) }}>
                          {connections.includes(p.id) ? 'Connected ✓' : '+ Connect'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="trp__load-more-wrap">
                <button className="trp__load-more">
                  Load more students
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <div className="rm-hiw">
            <div className="rm-hiw__top-row">
              <button className="rm-hiw__view-all" onClick={() => navigate('/friends')}>Explore all students →</button>
            </div>
            <h2 className="rm-hiw__title">How it works</h2>
            <div className="rm-hiw__steps">
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">1</div>
                <div className="rm-hiw__icon-wrap">
                  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                    <circle cx="40" cy="40" r="40" fill="#f0faf0"/>
                    <circle cx="40" cy="30" r="12" fill="#5dae61" opacity=".2"/>
                    <circle cx="40" cy="30" r="7" fill="#5dae61"/>
                    <rect x="20" y="50" width="40" height="6" rx="3" fill="#5dae61" opacity=".3"/>
                  </svg>
                </div>
                <div className="rm-hiw__step-name">Create your profile</div>
                <div className="rm-hiw__step-desc">Add your interests, university and a short bio.</div>
              </div>
              <div className="rm-hiw__arrow">
                <svg viewBox="0 0 60 24" fill="none" width="60" height="24"><path d="M0 12h50M44 6l10 6-10 6" stroke="#5dae61" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">2</div>
                <div className="rm-hiw__icon-wrap">
                  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                    <circle cx="40" cy="40" r="40" fill="#f0faf0"/>
                    <circle cx="28" cy="38" r="8" fill="#5dae61" opacity=".3"/>
                    <circle cx="52" cy="38" r="8" fill="#5dae61" opacity=".3"/>
                    <path d="M20 55c0-5 4-8 8-8h24c4 0 8 3 8 8" stroke="#5dae61" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div className="rm-hiw__step-name">Browse students</div>
                <div className="rm-hiw__step-desc">Filter by city, university or shared interests.</div>
              </div>
              <div className="rm-hiw__arrow">
                <svg viewBox="0 0 60 24" fill="none" width="60" height="24"><path d="M0 12h50M44 6l10 6-10 6" stroke="#5dae61" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">3</div>
                <div className="rm-hiw__icon-wrap">
                  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                    <circle cx="40" cy="40" r="40" fill="#f0faf0"/>
                    <rect x="18" y="28" width="44" height="30" rx="6" fill="#5dae61" opacity=".2"/>
                    <rect x="18" y="28" width="44" height="30" rx="6" stroke="#5dae61" strokeWidth="2"/>
                    <circle cx="30" cy="43" r="3" fill="#5dae61"/>
                    <circle cx="40" cy="43" r="3" fill="#5dae61"/>
                    <circle cx="50" cy="43" r="3" fill="#5dae61"/>
                  </svg>
                </div>
                <div className="rm-hiw__step-name">Send a message</div>
                <div className="rm-hiw__step-desc">Connect and start chatting instantly.</div>
              </div>
              <div className="rm-hiw__arrow">
                <svg viewBox="0 0 60 24" fill="none" width="60" height="24"><path d="M0 12h50M44 6l10 6-10 6" stroke="#5dae61" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">4</div>
                <div className="rm-hiw__icon-wrap">
                  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                    <circle cx="40" cy="40" r="40" fill="#f0faf0"/>
                    <path d="M40 52s-16-8-16-20a8 8 0 0 1 16 0 8 8 0 0 1 16 0c0 12-16 20-16 20z" fill="#5dae61" opacity=".3"/>
                    <path d="M40 52s-16-8-16-20a8 8 0 0 1 16 0 8 8 0 0 1 16 0c0 12-16 20-16 20z" stroke="#5dae61" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="rm-hiw__step-name">Build friendships</div>
                <div className="rm-hiw__step-desc">Meet up, explore Europe together & make memories.</div>
              </div>
            </div>
          </div>

          {/* ── FEATURES STRIP ── */}
          <div className="trp__features">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Real Connections', desc: 'Meet students who genuinely share your passions.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>, title: 'Verified Profiles', desc: 'Every student is verified for a safe experience.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: 'Instant Messaging', desc: 'Chat directly without sharing your private contacts.' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="36" height="36"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Across Europe', desc: 'Find friends in 30+ student cities across Europe.' },
            ].map((f, i) => (
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

          {/* ── CTA BANNER ── */}
          <div className="rm-cta">
            <img src="/cta-deco-left.svg" alt="" className="rm-cta__deco rm-cta__deco--left" />
            <img src="/cta-deco-right.svg" alt="" className="rm-cta__deco rm-cta__deco--right" />
            <p className="rm-cta__sub">Student life is better with good people.</p>
            <h2 className="rm-cta__title">Start making friends today!</h2>
            <button className="rm-cta__btn" onClick={() => navigate('/profile')}>Join 1 Euro Pass →</button>
            <p className="rm-cta__launch">Launching on 21 September 2026</p>
          </div>

        </div>{/* end roommates__content-card */}

      </main>
      <Footer />
    </>
  )
}
