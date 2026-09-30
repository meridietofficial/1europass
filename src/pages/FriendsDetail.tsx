import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface FriendListing {
  id: string
  title: string
  looking_for: string | null
  age_min: number | null
  age_max: number | null
  vibes: string | string[] | null
  interests: string | string[] | null
  bio: string | null
  created_at: string
  full_name: string
  dob: string | null
  city: string | null
  state: string | null
  country: string | null
  language: string | null
  profile_picture: string | null
}

function parseJsonArray(val: string | string[] | null): string[] {
  if (!val) return []
  if (Array.isArray(val)) return val
  try { return JSON.parse(val) } catch { return [] }
}

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function calcAge(dob: string | null): number | null {
  if (!dob) return null
  const diff = Date.now() - new Date(dob).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Football:      { bg: '#e8f5e9', color: '#2e7d32' },
  Basketball:    { bg: '#e3f2fd', color: '#1565c0' },
  Tennis:        { bg: '#fff8e1', color: '#f57f17' },
  Running:       { bg: '#fce4ec', color: '#c62828' },
  Cycling:       { bg: '#f3e5f5', color: '#6a1b9a' },
  Hiking:        { bg: '#e8f5e9', color: '#2e7d32' },
  Guitar:        { bg: '#fff3e0', color: '#e65100' },
  Piano:         { bg: '#e8eaf6', color: '#283593' },
  Singing:       { bg: '#fce4ec', color: '#c62828' },
  Gaming:        { bg: '#ede7f6', color: '#4527a0' },
  Cooking:       { bg: '#fff8e1', color: '#f57f17' },
  Photography:   { bg: '#e3f2fd', color: '#1565c0' },
  Painting:      { bg: '#fce4ec', color: '#c62828' },
  Yoga:          { bg: '#e8f5e9', color: '#2e7d32' },
  Travel:        { bg: '#e3f2fd', color: '#1565c0' },
  Reading:       { bg: '#fff8e1', color: '#f57f17' },
  Movies:        { bg: '#fce4ec', color: '#c62828' },
  Dancing:       { bg: '#fce4ec', color: '#ad1457' },
}

const GRADIENTS = [
  'linear-gradient(135deg,#a8edea,#fed6e3)',
  'linear-gradient(135deg,#ffecd2,#fcb69f)',
  'linear-gradient(135deg,#d4fc79,#96e6a1)',
  'linear-gradient(135deg,#c3cfe2,#f5f7fa)',
  'linear-gradient(135deg,#a29bfe,#6c5ce7)',
  'linear-gradient(135deg,#fd79a8,#e84393)',
  'linear-gradient(135deg,#55efc4,#00b894)',
  'linear-gradient(135deg,#fdcb6e,#e17055)',
]

function hashGradient(id: string) {
  let n = 0
  for (let i = 0; i < id.length; i++) n = (n * 31 + id.charCodeAt(i)) | 0
  return GRADIENTS[Math.abs(n) % GRADIENTS.length]
}

export default function FriendsDetail() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<FriendListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!id) return
    apiGet<{ success: boolean; data: FriendListing }>(ENDPOINTS.friend.view(id))
      .then(res => setListing(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <><Navbar /><main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#888' }}>Loading…</p></main><Footer /></>
  )

  if (!listing) return (
    <><Navbar /><main className="hd" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#888' }}>Profile not found.</p></main><Footer /></>
  )

  const vibes = parseJsonArray(listing.vibes)
  const interests = parseJsonArray(listing.interests)
  const hostName = listing.full_name || 'Student'
  const initials = getInitials(hostName)
  const age = calcAge(listing.dob)
  const location = [listing.city, listing.country].filter(Boolean).join(', ')
  const gradient = hashGradient(listing.id)
  const memberYear = listing.created_at ? new Date(listing.created_at).getFullYear() : null

  return (
    <>
      <Navbar />
      <main className="hd">

        {/* ── Hero ── */}
        <div className="hd__hero-section">
          <div className="hd__top-row">
            <nav className="hd__breadcrumb">
              <Link to="/">Home</Link><span>›</span>
              <Link to="/friends">Friends</Link><span>›</span>
              <span className="hd__breadcrumb-current">{listing.title}</span>
            </nav>
          </div>

          <div className="hd__title-row">
            <h1 className="hd__title">{listing.title}</h1>
            <div className="hd__title-actions">
              <button className={`hd__save-btn${saved ? ' hd__save-btn--active' : ''}`} onClick={() => setSaved(s => !s)}>♥ Save</button>
              <button className="hd__share-btn">↗ Share</button>
            </div>
          </div>

          <div className="hd__meta">
            <span className="hd__chip" style={{ marginRight: 6 }}>Looking for friends</span>
            {location && <><span className="hd__meta-dot">·</span><span>📍 {location}</span></>}
            {age && <><span className="hd__meta-dot">·</span><span>{age} years old</span></>}
            {listing.language && <><span className="hd__meta-dot">·</span><span>🗣 {listing.language}</span></>}
          </div>

          {/* Profile banner */}
          <div style={{
            height: 260, borderRadius: 16, background: gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 16, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ textAlign: 'center' }}>
              {listing.profile_picture ? (
                <img
                  src={listing.profile_picture}
                  alt={hostName}
                  style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', marginBottom: 12 }}
                />
              ) : (
                <div style={{
                  width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, fontWeight: 800, color: '#1a1a1a', margin: '0 auto 12px',
                  fontFamily: 'Caveat Brush, cursive', border: '4px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}>
                  {initials}
                </div>
              )}
              <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 24, color: '#1a1a1a', marginBottom: 4 }}>{hostName}</div>
              {location && (
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Body card ── */}
        <div className="hd__body-card">
          <div className="hd__content">

            {/* ── Left column ── */}
            <div className="hd__left">

              {/* Summary */}
              <div className="hd__summary">
                <h2 className="hd__summary-title">{hostName}{age ? `, ${age}` : ''}{location ? ` · ${location}` : ''}</h2>
                <div className="hd__summary-stats">
                  {listing.age_min != null && listing.age_max != null && (
                    <><span>Looking for ages {listing.age_min}–{listing.age_max}</span><span className="hd__dot">·</span></>
                  )}
                  {listing.looking_for && <span className="hd__avail-pill">🤝 {listing.looking_for}</span>}
                </div>
              </div>

              {/* About */}
              {listing.bio && (
                <section className="hd__section">
                  <h3 className="hd__section-title">About me</h3>
                  <p className="hd__about-text">{listing.bio}</p>
                </section>
              )}

              {/* Host row */}
              <section className="hd__section hd__host-section">
                <div className="hd__host-info">
                  <div className="hd__host-avatar" style={{ background: gradient }}>{initials}</div>
                  <div className="hd__host-details">
                    <div className="hd__host-name">{hostName}</div>
                    <div className="hd__host-since">
                      {memberYear ? `Member since ${memberYear}` : 'Member'}
                      {age ? ` · ${age} years old` : ''}
                    </div>
                  </div>
                </div>
                <div className="hd__host-meta" style={{ marginTop: 10 }}>
                  <div className="hd__host-meta-item">⚡ Usually responds within a few hours</div>
                </div>
              </section>

              {/* Vibes */}
              {vibes.length > 0 && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Vibe &amp; personality</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {vibes.map(v => (
                      <span key={v} style={{
                        fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700,
                        background: '#f0fdf4', color: '#2e7d32', border: '1.5px solid #c8e6c9',
                        borderRadius: 20, padding: '5px 14px',
                      }}>{v}</span>
                    ))}
                  </div>
                </section>
              )}

              {/* Interests */}
              {interests.length > 0 && (
                <section className="hd__section">
                  <h3 className="hd__section-title">Interests &amp; hobbies</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {interests.map(tag => {
                      const c = TAG_COLORS[tag] ?? { bg: '#f5f5f5', color: '#555' }
                      return (
                        <span key={tag} style={{
                          fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700,
                          background: c.bg, color: c.color,
                          border: `1.5px solid ${c.bg}`, borderRadius: 20, padding: '5px 14px',
                        }}>{tag}</span>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Basic info */}
              <section className="hd__section hd__type-badges-section">
                {listing.looking_for && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🤝</span>
                    <span className="hd__type-badge-label">{listing.looking_for}</span>
                  </div>
                )}
                {listing.age_min != null && listing.age_max != null && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🎂</span>
                    <span className="hd__type-badge-label">Ages {listing.age_min}–{listing.age_max}</span>
                  </div>
                )}
                {listing.language && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🗣</span>
                    <span className="hd__type-badge-label">{listing.language}</span>
                  </div>
                )}
                {listing.city && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">📍</span>
                    <span className="hd__type-badge-label">{listing.city}</span>
                  </div>
                )}
                {listing.country && (
                  <div className="hd__type-badge">
                    <span className="hd__type-badge-icon">🌍</span>
                    <span className="hd__type-badge-label">{listing.country}</span>
                  </div>
                )}
              </section>

            </div>

            {/* ── Right sidebar ── */}
            <aside className="hd__sidebar">
              <div className="hd__sidebar-card">

                {/* Avatar */}
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  {listing.profile_picture ? (
                    <img
                      src={listing.profile_picture}
                      alt={hostName}
                      style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e8f5e9', margin: '0 auto', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%', background: gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 26, fontWeight: 800, color: '#1a1a1a', margin: '0 auto',
                      fontFamily: 'Caveat Brush, cursive',
                    }}>
                      {initials}
                    </div>
                  )}
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, color: '#1a1a1a', marginTop: 8 }}>{hostName}</div>
                  {age && <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888', marginTop: 2 }}>{age} years old</div>}
                </div>

                <div className="hd__breakdown-divider" />

                {/* Key info */}
                <div style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {location && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Location</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a', textAlign: 'right', maxWidth: 140 }}>{location}</span>
                    </div>
                  )}
                  {listing.language && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Language</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.language}</span>
                    </div>
                  )}
                  {listing.age_min != null && listing.age_max != null && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Friend age range</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.age_min}–{listing.age_max} yrs</span>
                    </div>
                  )}
                  {listing.looking_for && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito, sans-serif', fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Looking for</span>
                      <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{listing.looking_for}</span>
                    </div>
                  )}
                </div>

                <div className="hd__breakdown-divider" />

                <button
                  className="hd__book-btn"
                  style={{ marginTop: 16, background: connected ? '#2a8a3d' : undefined }}
                  onClick={() => setConnected(c => !c)}
                >
                  {connected ? '✓ Connected' : '🤝 Connect'}
                </button>
                <button className="hd__message-btn">💬 Send a message</button>
                <p className="hd__not-charged">Your contact details are never shared publicly.</p>
                <div className="hd__secure-badge">🛡️ Secure through 1 Euro Pass</div>
              </div>
            </aside>

          </div>

          {/* Verification bar */}
          <div className="hd__verify-bar">
            <div className="hd__verify-badge">
              <div className="hd__verify-shield">🛡️</div>
              <div>
                <div className="hd__verify-title">Safe &amp; Verified</div>
                <div className="hd__verify-sub">1 Euro Pass verifies student profiles before they can connect.</div>
              </div>
            </div>
            <div className="hd__verify-checks">
              <div className="hd__verify-check">✓ Student verified</div>
              <div className="hd__verify-check">✓ Secure messaging</div>
              <div className="hd__verify-check">✓ Agreed to terms</div>
            </div>
          </div>

          <div className="hd__report">
            <button className="hd__report-btn">🚩 Something doesn't look right? Report this profile</button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
