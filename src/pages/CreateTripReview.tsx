import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getTripListing, publishTripListing, type TripListing } from '../api/trip'

const PHOTO_COLORS = ['#c8dfc8', '#d4cbe8', '#c8d4e0', '#e0d4c8', '#c8e0d4']

const WHO_LABELS: Record<string, string> = {
  solo: 'Solo travelers welcome',
  group: 'Group trips',
  all: 'Open to all genders',
}

function fmt(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function CreateTripReview() {
  const navigate = useNavigate()
  const { id: editId } = useParams<{ id: string }>()
  const step1Route = editId ? `/profile/post/trip/edit/${editId}` : '/profile/post/trip'
  const step2Route = editId ? `/profile/post/trip/edit/${editId}/photos` : '/profile/post/trip/photos'

  const [listing, setListing] = useState<TripListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editId) { setLoading(false); return }
    getTripListing(editId)
      .then(data => setListing(data))
      .catch(() => setError('Failed to load listing. Please go back and try again.'))
      .finally(() => setLoading(false))
  }, [editId])

  async function handlePublish() {
    if (!editId) { setError('Listing not found. Please restart.'); return }
    setPublishing(true)
    setError('')
    try {
      await publishTripListing(editId)
      navigate('/profile')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to publish. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  const photos: string[] = listing?.photos ?? []
  const itinerary = listing?.itinerary ?? []
  const whoCanJoin: string[] = listing?.who_can_join ?? []

  const summaryRows = listing ? [
    { label: 'Trip Title',           value: listing.title },
    { label: 'Destination',          value: listing.destination ?? '—' },
    { label: 'Trip Type',            value: listing.trip_type ?? '—' },
    { label: 'Category',             value: listing.category ?? '—' },
    { label: 'Start Date',           value: fmt(listing.start_date) },
    { label: 'End Date',             value: fmt(listing.end_date) },
    { label: 'Duration',             value: listing.duration ?? '—' },
    { label: 'Budget (Per Person)',  value: listing.budget ? `€${listing.budget}` : '—' },
    { label: 'Meeting Point',        value: listing.meeting_point ?? '—' },
    { label: 'Photos',               value: `${photos.length} photo${photos.length !== 1 ? 's' : ''}` },
    { label: 'Itinerary Days',       value: `${itinerary.length} day${itinerary.length !== 1 ? 's' : ''}` },
  ] : []

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* Hero / Steps */}
        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post/trip">Trip</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Post a Trip</h1>
              <p className="cl-hero__sub">Share your adventure and find travel companions across Europe.</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Trip Details</span>
                  <span className="cl-step__sub">Where are you going?</span>
                </div>
              </div>

              <div className="cl-steps__line cl-steps__line--done" />

              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Photos &amp; Itinerary</span>
                  <span className="cl-step__sub">Show what's included</span>
                </div>
              </div>

              <div className="cl-steps__line cl-steps__line--done" />

              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
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

              {/* Review header */}
              <div style={{ padding: '8px 20px' }}>
                <div className="crv-review-header">
                  <div>
                    <h2 className="crv-review-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                      Review Your Trip
                    </h2>
                    <p className="crv-review-sub">Please review all details before publishing your trip.</p>
                  </div>
                  <button type="button" className="crv-edit-all-btn" onClick={() => navigate(step1Route)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Trip Details
                  </button>
                </div>
              </div>

              {loading ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#888' }}>Loading your trip...</div>
              ) : !listing ? (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <p style={{ color: '#e05252', marginBottom: 16 }}>No trip draft found. Please start from Step 1.</p>
                  <button type="button" className="cl-next-btn" onClick={() => navigate(step1Route)}>Go to Step 1</button>
                </div>
              ) : (
                <div style={{ padding: '0 20px' }}>
                  <div className="tr-preview-card">

                    {/* ── Photos ── */}
                    {photos.length > 0 ? (
                      <div className="tr-photo-mosaic" style={{ marginBottom: 20 }}>
                        <div className="tr-mosaic-left">
                          <div className="tr-photo tr-photo--tall" style={{ overflow: 'hidden' }}>
                            <img src={photos[0]} alt="Trip photo 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        </div>
                        {photos.length > 1 && (
                          <div className="tr-mosaic-right">
                            <div className="tr-photo tr-photo--sm" style={{ overflow: 'hidden' }}>
                              {photos[1] && <img src={photos[1]} alt="Trip photo 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div className="tr-mosaic-right-bottom">
                              <div className="tr-photo tr-photo--xs" style={{ overflow: 'hidden' }}>
                                {photos[2] && <img src={photos[2]} alt="Trip photo 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                              </div>
                              <div className="tr-photo tr-photo--xs tr-photo--more" style={{ overflow: 'hidden', background: PHOTO_COLORS[3] }}>
                                {photos[3]
                                  ? photos.length > 4
                                    ? <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <img src={photos[3]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>+{photos.length - 3}</div>
                                      </div>
                                    : <img src={photos[3]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  : <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{photos.length} photos</span>
                                }
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ background: '#f5f5f3', borderRadius: 10, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, gap: 8, color: '#aaa', fontSize: 13 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        No photos added
                      </div>
                    )}

                    {/* ── Trip Info ── */}
                    <div style={{ padding: '16px 18px', borderBottom: '1.5px solid #f0efe8' }}>
                      <h3 className="tr-trip-title" style={{ marginBottom: 10 }}>{listing.title}</h3>

                      {/* Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                        {listing.category && (
                          <span style={{ fontSize: 12, fontWeight: 700, background: '#edf7ee', color: '#3a8f3e', border: '1.5px solid #c8e6c9', borderRadius: 20, padding: '3px 12px' }}>{listing.category}</span>
                        )}
                        {listing.trip_type && (
                          <span style={{ fontSize: 12, fontWeight: 600, background: '#f0f4ff', color: '#4a6fa5', border: '1.5px solid #d0daf5', borderRadius: 20, padding: '3px 12px' }}>{listing.trip_type}</span>
                        )}
                        {listing.status === 'draft' && (
                          <span style={{ fontSize: 12, fontWeight: 600, background: '#fff7ed', color: '#c2620a', border: '1.5px solid #fde8c8', borderRadius: 20, padding: '3px 12px' }}>Draft</span>
                        )}
                      </div>

                      {/* Details grid — always visible, no conditional hiding */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: listing.description ? 14 : 0 }}>

                        {/* Destination — full width */}
                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Destination</div>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1a1a1a' }}>{listing.destination || '—'}</div>
                          </div>
                        </div>

                        {/* Start Date */}
                        <div style={{ display: 'flex', gap: 8, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Start Date</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{fmt(listing.start_date)}</div>
                          </div>
                        </div>

                        {/* End Date */}
                        <div style={{ display: 'flex', gap: 8, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>End Date</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{fmt(listing.end_date)}</div>
                          </div>
                        </div>

                        {/* Duration */}
                        <div style={{ display: 'flex', gap: 8, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Duration</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{listing.duration || '—'}</div>
                          </div>
                        </div>

                        {/* Budget */}
                        <div style={{ display: 'flex', gap: 8, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Budget (per person)</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{listing.budget != null ? `€${listing.budget}` : '—'}</div>
                          </div>
                        </div>

                        {/* Meeting Point — full width */}
                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Meeting Point</div>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1a1a1a' }}>{listing.meeting_point || '—'}</div>
                          </div>
                        </div>

                        {/* Who Can Join — full width */}
                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, padding: '10px 12px', background: '#f8f8f6', borderRadius: 9, border: '1px solid #ece9e0', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15" style={{ flexShrink: 0, marginTop: 2 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                          <div>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>Who Can Join</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{whoCanJoin.length > 0 ? whoCanJoin.map(w => WHO_LABELS[w] ?? w).join(' · ') : '—'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {listing.description && (
                        <div style={{ padding: '12px 14px', background: '#f9f9f7', borderRadius: 8, border: '1px solid #eee' }}>
                          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>About this trip</div>
                          <p style={{ margin: 0, fontSize: 13.5, color: '#444', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{listing.description}</p>
                        </div>
                      )}
                    </div>

                    {/* ── Itinerary ── */}
                    {itinerary.length > 0 ? (
                      <div style={{ padding: '16px 18px', borderBottom: '1.5px solid #f0efe8' }}>
                        <h4 className="tr-itinerary__heading">Itinerary — {itinerary.length} Day{itinerary.length !== 1 ? 's' : ''}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {itinerary.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: '#f9f9f7', borderRadius: 10, border: '1px solid #ece9e0' }}>
                              {/* Day number circle */}
                              <div style={{ minWidth: 36, height: 36, background: '#5dae61', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                                {i + 1}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a1a', marginBottom: 4 }}>
                                  {item.name || `Day ${i + 1}`}
                                </div>
                                {item.type && (
                                  <span style={{ fontSize: 11, fontWeight: 700, background: '#edf7ee', color: '#3a8f3e', border: '1px solid #c8e6c9', borderRadius: 10, padding: '2px 8px', display: 'inline-block', marginBottom: item.desc ? 6 : 0 }}>
                                    {item.type}
                                  </span>
                                )}
                                {item.desc && (
                                  <p style={{ margin: 0, fontSize: 13, color: '#555', lineHeight: 1.55 }}>{item.desc}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '14px 18px', borderBottom: '1.5px solid #f0efe8' }}>
                        <div style={{ padding: '12px 14px', background: '#fffbf0', border: '1px solid #fde8c8', borderRadius: 8, fontSize: 13, color: '#c2620a' }}>
                          No itinerary days added. Go back to Step 2 to add days.
                        </div>
                      </div>
                    )}

                    {/* Guidelines Banner */}
                    <div className="tr-guidelines-banner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="22" height="22" style={{ flexShrink: 0 }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                      </svg>
                      <p className="tr-guidelines-text">By publishing, you agree to our community guidelines and safety policies.</p>
                      <a href="#" className="tr-guidelines-link">View Community Guidelines →</a>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>

              {/* Trip Summary */}
              <div className="cl-card tr-summary-card">
                <h3 className="cl-card__title" style={{ marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Trip Summary
                </h3>
                {summaryRows.map((row, i) => (
                  <div key={i} className={`tr-summary-row${i === summaryRows.length - 1 ? ' tr-summary-row--last' : ''}`}>
                    <span className="tr-summary-label">{row.label}</span>
                    <span className="tr-summary-value">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Travel Safe Card */}
              <div className="cl-card tr-safety-sidebar">
                <div className="tr-safety-sidebar__top">
                  <div className="tr-safety-sidebar__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="22" height="22">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="tr-safety-sidebar__title">Travel Safe, Travel Smart</h4>
                    <p className="tr-safety-sidebar__desc">We review all trips to keep our community safe and trustworthy.</p>
                  </div>
                </div>
                <a href="#" className="tr-safety-sidebar__link">Read our safety guidelines →</a>
              </div>


            </div>
          </div>

          {/* Footer */}
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
              {error && <p style={{ color: '#e05252', fontSize: 13, marginBottom: 8, textAlign: 'right' }}>{error}</p>}
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate(step2Route)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={handlePublish} disabled={publishing || !listing}>
                  {publishing ? 'Publishing...' : 'Publish Listing'}
                  {!publishing && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                </button>
              </div>
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
