import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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

const LISTINGS = [
  { id: 1,  name: 'Lena M.',    age: 23, intent: 'Looking for a room',  budget: 650,  neighborhood: 'Mitte, Berlin',          university: 'Humboldt University',  tags: ['Non-smoker', 'Students only', 'Pet-friendly'], moveIn: '1 September', gender: 'Female', verified: true,  gradient: 'linear-gradient(135deg,#a8edea,#fed6e3)', initials: 'LM' },
  { id: 2,  name: 'Marco R.',   age: 25, intent: 'Has a room to share', budget: 580,  neighborhood: 'Charlottenburg, Berlin', university: 'TU Berlin',             tags: ['Non-smoker', 'Clean'],                         moveIn: '1 September', gender: 'Male',   verified: true,  gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)', initials: 'MR' },
  { id: 3,  name: 'Sophie K.',  age: 22, intent: 'Looking for a room',  budget: 720,  neighborhood: 'Friedrichshain, Berlin', university: 'FU Berlin',             tags: ['Non-smoker', 'Quiet hours'],                   moveIn: '1 September', gender: 'Female', verified: true,  gradient: 'linear-gradient(135deg,#c3cfe2,#f5f7fa)', initials: 'SK' },
  { id: 4,  name: 'James T.',   age: 24, intent: 'Has a room to share', budget: 490,  neighborhood: 'Mitte, Berlin',          university: 'Humboldt University',  tags: ['Students only', 'LGBTQ+ friendly'],            moveIn: '1 September', gender: 'Any',    verified: false, gradient: 'linear-gradient(135deg,#d4fc79,#96e6a1)', initials: 'JT' },
  { id: 5,  name: 'Ana C.',     age: 21, intent: 'Looking for a room',  budget: 580,  neighborhood: 'Kreuzberg, Berlin',      university: 'Beuth University',      tags: ['Non-smoker', 'Female only'],                   moveIn: '1 September', gender: 'Female', verified: true,  gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', initials: 'AC' },
  { id: 6,  name: 'Noah V.',    age: 26, intent: 'Has a room to share', budget: 480,  neighborhood: 'Neukölln, Berlin',       university: 'HWR Berlin',            tags: ['Non-smoker', 'Clean', 'Students only'],        moveIn: '1 September', gender: 'Male',   verified: true,  gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)', initials: 'NV' },
]

const TAG_COLORS: Record<string, string> = {
  'Non-smoker':       '#E8F5E9',
  'Students only':    '#E3F2FD',
  'Pet-friendly':     '#FFF8E1',
  'Clean':            '#F3E5F5',
  'Quiet hours':      '#E0F7FA',
  'Female only':      '#FCE4EC',
  'LGBTQ+ friendly':  '#FFF3E0',
}

export default function Roommates() {
  const [budget, setBudget] = useState(1000)
  const [activeCity, setActiveCity] = useState('Berlin')
  const [favorites, setFavorites] = useState<number[]>([])

  const navigate = useNavigate()

  const toggleFav = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])

  return (
    <>
      <Navbar />
      <main className="roommates">

        {/* ── HERO ── */}
        <div className="roommates__hero">
          <div className="roommates__hero-left">
            <h1 className="roommates__hero-title">
              Find your <span className="roommates__hero-accent">Perfect Roommate</span>
              <img src="/roommates-title-deco.svg" alt="" className="roommates__hero-title-deco" />
            </h1>
            <p className="roommates__hero-sub">
              <img src="/star-icon.svg" alt="" className="roommates__hero-sub-icon" />
              Match with verified students and find<br />someone you vibe with.
            </p>


            <div className="hero__trust">
              <div className="hero__trust-item">
                <img src="/icon-secure.png" alt="" className="hero__trust-icon" />
                <div>
                  <div className="hero__trust-label">Verified<br />Students</div>
                </div>
              </div>
              <div className="hero__trust-item">
                <img src="/icon-tag.png" alt="" className="hero__trust-icon" />
                <div>
                  <div className="hero__trust-label">Safe &amp;<br />Secure</div>
                </div>
              </div>
              <div className="hero__trust-item">
                <img src="/icon-heart.png" alt="" className="hero__trust-icon" />
                <div>
                  <div className="hero__trust-label">Easy<br />Matching</div>
                </div>
              </div>
            </div>

            <div className="roommates__social-proof">
              <div className="roommates__social-avatars">
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#a8edea,#fed6e3)' }}>LM</div>
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#ffecd2,#fcb69f)' }}>MR</div>
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#c3cfe2,#f5f7fa)' }}>SK</div>
                <div className="roommates__social-avatar" style={{ background: 'linear-gradient(135deg,#d4fc79,#96e6a1)' }}>JT</div>
              </div>
              <span className="roommates__social-text"><strong>10,000+</strong> students<br />already found their match!</span>
            </div>
          </div>

          <div className="roommates__hero-right">
            <img src="/roommates-hero.svg" alt="" className="roommates__hero-img" />
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div className="roommates__content-card">

          {/* ── POPULAR CITIES ── */}
          <div className="roommates__cities-wrap">
            <div className="roommates__cities-header">
              <h2 className="roommates__cities-title">
                Popular student cities
                <img src="/star-icon.svg" alt="" className="roommates__cities-title-star" />
              </h2>
              <p className="roommates__cities-sub">Find roommates wherever your future takes you</p>
            </div>
            <div className="roommates__cities-row">
              {CITIES.map(c => (
                <button
                  key={c.name}
                  className={`roommates__city-btn${activeCity === c.name ? ' roommates__city-btn--active' : ''}`}
                  onClick={() => setActiveCity(c.name)}
                >
                  <img src={c.svg} alt={c.name} className="roommates__city-img" />
                  <span className="roommates__city-name">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── RESULTS + FILTERS ── */}
          <div className="roommates__body" id="results">

            {/* FILTER SIDEBAR */}
            <aside className="roommates__filters">
              <h3 className="roommates__filters-title">Filter roommates</h3>

              <div className="roommates__filter-group">
                <div className="roommates__filter-label">LOCATION</div>
                <div className="roommates__filter-location">
                  <span className="roommates__filter-location-pin">📍</span>
                  <input className="roommates__filter-input" defaultValue="Berlin, Germany" />
                </div>
              </div>

              <div className="roommates__filter-group">
                <div className="roommates__filter-label">MONTHLY BUDGET</div>
                <input
                  type="range" min={0} max={2000} step={50}
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="roommates__filter-range"
                />
                <div className="roommates__filter-range-labels">
                  <span>€0</span><span>€{budget.toLocaleString()}</span>
                </div>
              </div>

              <div className="roommates__filter-group">
                <div className="roommates__filter-label">LOOKING FOR</div>
                {['Has a room to share', 'Looking for a room'].map(t => (
                  <label key={t} className="roommates__filter-check">
                    <input type="checkbox" /> {t}
                  </label>
                ))}
              </div>

              <div className="roommates__filter-group">
                <div className="roommates__filter-label">MOVE-IN DATE</div>
                <input type="date" className="roommates__filter-input roommates__filter-date" />
              </div>

              <div className="roommates__filter-group">
                <div className="roommates__filter-label">GENDER</div>
                {['Any', 'Male', 'Female'].map(t => (
                  <label key={t} className="roommates__filter-check">
                    <input type="checkbox" /> {t}
                  </label>
                ))}
              </div>

              <div className="roommates__filter-group">
                <div className="roommates__filter-label">LIFESTYLE</div>
                {['Non-smoker', 'Pet-friendly', 'Students only', 'LGBTQ+ friendly', 'Quiet hours', 'Early bird'].map(t => (
                  <label key={t} className="roommates__filter-check">
                    <input type="checkbox" /> {t}
                  </label>
                ))}
              </div>

              <label className="roommates__filter-toggle">
                <input type="checkbox" />
                <span>Verified profiles only</span>
              </label>
              <label className="roommates__filter-toggle">
                <input type="checkbox" />
                <span>Female-only roommate</span>
              </label>

              <div className="roommates__filter-actions">
                <button className="roommates__filter-clear">Clear all</button>
                <button className="roommates__filter-apply">Apply filters</button>
              </div>
            </aside>

            {/* LISTINGS */}
            <div className="roommates__results">
              <div className="roommates__results-header">
                <h2 className="roommates__results-count">
                  <strong>87 roommates</strong> found in {activeCity}
                </h2>
                <div className="roommates__results-controls">
                  <select className="roommates__sort-select">
                    <option>Recommended</option>
                    <option>Budget: low to high</option>
                    <option>Budget: high to low</option>
                    <option>Newest first</option>
                  </select>
                </div>
              </div>
              <p className="roommates__results-sub">Students looking for roommates or sharing their place near universities and city centres.</p>

              <div className="roommates__grid">
                {LISTINGS.map(l => (
                  <div key={l.id} className="roommates__card" onClick={() => navigate(`/roommates/${l.id}`)}>
                    <div className="roommates__card-img" style={{ background: l.gradient }}>
                      {l.verified && <span className="roommates__card-verified">✔ VERIFIED</span>}
                      <button
                        className={`roommates__card-fav${favorites.includes(l.id) ? ' roommates__card-fav--active' : ''}`}
                        onClick={e => { e.stopPropagation(); toggleFav(l.id) }}
                      >♥</button>
                      <div className="roommates__card-avatar-wrap">
                        <div className="roommates__card-avatar-circle">{l.initials}</div>
                      </div>
                    </div>
                    <div className="roommates__card-body">
                      <div className="roommates__card-header-row">
                        <div className="roommates__card-title">{l.name}, {l.age}</div>
                        <span className={`roommates__card-gender roommates__card-gender--${l.gender.toLowerCase().replace(/\s/g, '-').replace(/\+/g, '')}`}>{l.gender}</span>
                      </div>
                      <div className="roommates__card-intent">{l.intent}</div>
                      <div className="roommates__card-price">€{l.budget}<span>/month</span></div>
                      <div className="roommates__card-location">📍 {l.neighborhood}</div>
                      <div className="roommates__card-uni">🎓 {l.university}</div>
                      <div className="roommates__card-tags">
                        {l.tags.map(tag => (
                          <span key={tag} className="roommates__card-tag" style={{ background: TAG_COLORS[tag] || '#f5f5f5' }}>{tag}</span>
                        ))}
                      </div>
                      <div className="roommates__card-avail">Moving from {l.moveIn}</div>
                      <div className="roommates__card-footer">
                        <button className="roommates__card-details" onClick={e => { e.stopPropagation(); navigate(`/roommates/${l.id}`) }}>View profile +</button>
                        <button className="roommates__card-contact" onClick={e => { e.stopPropagation() }}>Message</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end roommates__body */}

          {/* ── HOW IT WORKS ── */}
          <div className="rm-hiw">
            <div className="rm-hiw__top-row">
              <button className="rm-hiw__view-all" onClick={() => navigate('/roommates')}>View all listings →</button>
              <img src="/doodle-arrow-text.svg" alt="" className="rm-hiw__tagline-img" />
            </div>
            <h2 className="rm-hiw__title">How it works</h2>
            <div className="rm-hiw__steps">
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">1</div>
                <div className="rm-hiw__icon-wrap">
                  <img src="/hiw-step1.svg" alt="Create your profile" className="rm-hiw__step-img" />
                </div>
                <div className="rm-hiw__step-name">Create your profile</div>
                <div className="rm-hiw__step-desc">Tell us about yourself and what you're looking for.</div>
              </div>
              <div className="rm-hiw__arrow"><img src="/hiw-arrow.svg" alt="" className="rm-hiw__arrow-img" /></div>
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">2</div>
                <div className="rm-hiw__icon-wrap">
                  <img src="/hiw-step2.svg" alt="Browse matches" className="rm-hiw__step-img" />
                </div>
                <div className="rm-hiw__step-name">Browse matches</div>
                <div className="rm-hiw__step-desc">We'll show you compatible roommates.</div>
              </div>
              <div className="rm-hiw__arrow"><img src="/hiw-arrow.svg" alt="" className="rm-hiw__arrow-img" /></div>
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">3</div>
                <div className="rm-hiw__icon-wrap">
                  <img src="/hiw-step3.svg" alt="Connect & chat" className="rm-hiw__step-img" />
                </div>
                <div className="rm-hiw__step-name">Connect &amp; chat</div>
                <div className="rm-hiw__step-desc">Start a conversation and get to know each other.</div>
              </div>
              <div className="rm-hiw__arrow"><img src="/hiw-arrow.svg" alt="" className="rm-hiw__arrow-img" /></div>
              <div className="rm-hiw__step">
                <div className="rm-hiw__badge">4</div>
                <div className="rm-hiw__icon-wrap rm-hiw__icon-wrap--deco">
                  <img src="/hiw-step4.svg" alt="Move in & enjoy!" className="rm-hiw__step-img" />
                  <img src="/star-deco.svg" alt="" className="rm-hiw__step-star" />
                </div>
                <div className="rm-hiw__step-name">Move in &amp; enjoy!</div>
                <div className="rm-hiw__step-desc">Find your perfect match and start your journey.</div>
              </div>
            </div>
          </div>

          {/* ── WHY STUDENTS LOVE ── */}
          <div className="rm-why">
            <img src="/why-leaf.svg" alt="" className="rm-why__leaf rm-why__leaf--left" />
            <img src="/why-leaf-right.svg" alt="" className="rm-why__leaf rm-why__leaf--right" />
            <h2 className="rm-why__title">Why students love Roommate</h2>
            <div className="rm-why__grid">
              <div className="rm-why__item">
                <div className="rm-why__icon">
                  <img src="/why-verified.svg" alt="Verified & safe" className="rm-why__icon-img" />
                </div>
                <div className="rm-why__item-text">
                  <div className="rm-why__item-title">Verified &amp; safe</div>
                  <div className="rm-why__item-desc">All users are verified for your safety.</div>
                </div>
              </div>
              <div className="rm-why__item">
                <div className="rm-why__icon">
                  <img src="/why-matching.svg" alt="Smart matching" className="rm-why__icon-img" />
                </div>
                <div className="rm-why__item-text">
                  <div className="rm-why__item-title">Smart matching</div>
                  <div className="rm-why__item-desc">Get matches based on lifestyle &amp; preferences.</div>
                </div>
              </div>
              <div className="rm-why__item">
                <div className="rm-why__icon">
                  <img src="/why-privacy.svg" alt="Privacy first" className="rm-why__icon-img" />
                </div>
                <div className="rm-why__item-text">
                  <div className="rm-why__item-title">Privacy first</div>
                  <div className="rm-why__item-desc">Your personal info is always protected.</div>
                </div>
              </div>
              <div className="rm-why__item">
                <div className="rm-why__icon">
                  <img src="/why-connections.svg" alt="Build connections" className="rm-why__icon-img" />
                </div>
                <div className="rm-why__item-text">
                  <div className="rm-why__item-title">Build connections</div>
                  <div className="rm-why__item-desc">Find more than a roommate, find a friend.</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── FINAL CTA BANNER ── */}
          <div className="rm-cta">
            <img src="/cta-deco-left.svg" alt="" className="rm-cta__deco rm-cta__deco--left" />
            <img src="/cta-deco-right.svg" alt="" className="rm-cta__deco rm-cta__deco--right" />
            <p className="rm-cta__sub">Student life is better together.</p>
            <h2 className="rm-cta__title">Let's find your perfect match!</h2>
            <button className="rm-cta__btn" onClick={() => navigate('/profile/post/roommates')}>Join 1 Euro Pass →</button>
            <p className="rm-cta__launch">Launching on 21 September 2026</p>
          </div>

        </div>{/* end roommates__content-card */}
      </main>
      <Footer />
    </>
  )
}
