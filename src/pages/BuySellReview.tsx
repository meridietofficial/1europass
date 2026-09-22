import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { apiGet, apiPatch } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Photo { id: number; url: string; sort_order: number }

interface MarketplaceListing {
  id: string
  title: string
  description: string | null
  condition: string
  price: number
  is_free: number
  city: string | null
  country: string | null
  status: string
  category_name: string | null
  subcategory_name: string | null
  photos: Photo[]
}

const CONDITION_LABELS: Record<string, string> = {
  'new': 'New', 'like-new': 'Like New', 'good': 'Good', 'fair': 'Fair', 'used': 'Used',
}

export default function BuySellReview() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { pathname } = useLocation()
  const isEdit = pathname.includes('/edit/')

  const [listing, setListing] = useState<MarketplaceListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewIndex, setPreviewIndex] = useState(0)

  const photosUrl = id
    ? (isEdit ? `/profile/post/buy-sell/edit/${id}/photos` : `/profile/post/buy-sell/${id}/photos`)
    : '/profile/post/buy-sell'

  useEffect(() => {
    if (!id) return
    apiGet<{ data: MarketplaceListing }>(ENDPOINTS.marketplace.get(id))
      .then(res => setListing(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  async function handlePublish() {
    if (!id) return
    setPublishing(true)
    try {
      await apiPatch(ENDPOINTS.marketplace.status(id), { status: 'active' })
      sessionStorage.removeItem('marketplace_draft_id')
      navigate('/profile#listings')
    } catch {
      alert('Failed to publish. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  function handleSaveDraft() {
    sessionStorage.removeItem('marketplace_draft_id')
    navigate('/profile#listings')
  }

  const openPreview = useCallback((index: number, allPhotos: Photo[]) => {
    setPreviewIndex(index)
    setPreviewUrl(allPhotos[index].url)
  }, [])

  const closePreview = useCallback(() => setPreviewUrl(null), [])

  useEffect(() => {
    if (!previewUrl) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closePreview()
      if (!listing) return
      const all = listing.photos ?? []
      if (e.key === 'ArrowRight') { const next = (previewIndex + 1) % all.length; setPreviewIndex(next); setPreviewUrl(all[next].url) }
      if (e.key === 'ArrowLeft')  { const prev = (previewIndex - 1 + all.length) % all.length; setPreviewIndex(prev); setPreviewUrl(all[prev].url) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [previewUrl, previewIndex, listing, closePreview])

  if (loading) return (
    <>
      <Navbar />
      <main className="create-listing-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888' }}>Loading listing…</p>
      </main>
      <Footer />
    </>
  )

  if (!listing) return (
    <>
      <Navbar />
      <main className="create-listing-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888' }}>Listing not found.</p>
      </main>
      <Footer />
    </>
  )

  const photos = listing.photos ?? []
  const location = [listing.city, listing.country].filter(Boolean).join(', ')

  const details = [
    { label: 'Category',    value: listing.category_name ?? '—' },
    { label: 'Subcategory', value: listing.subcategory_name ?? '—' },
    { label: 'Condition',   value: CONDITION_LABELS[listing.condition] ?? listing.condition },
    { label: 'Price',       value: listing.is_free ? 'Free' : `€ ${Number(listing.price).toFixed(2)}` },
    { label: 'Location',    value: location || '—' },
    ...(listing.description ? [{ label: 'Description', value: listing.description }] : []),
  ]

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
                {isEdit
                  ? <><Link to="/profile#listings">My Listings</Link><span className="cl-breadcrumb__sep">/</span><Link to={`/profile/post/buy-sell/edit/${id}`}>Edit</Link></>
                  : <Link to="/profile/post/buy-sell">Buy &amp; Sell</Link>
                }
                <span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">{isEdit ? 'Edit your listing' : 'Post Your Item'}</h1>
              <p className="cl-hero__sub">{isEdit ? 'Review your changes before saving.' : 'Sell it in seconds. Reach students across Europe.'}</p>
            </div>
            <div className="cl-steps">
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Item Details</span>
                  <span className="cl-step__sub">What are you selling?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Photos</span>
                  <span className="cl-step__sub">Make your listing stand out</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
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
              <div className="bslr-header">
                <div className="bslr-header__left">
                  <h2 className="bslr-title">Review Your Listing</h2>
                  <p className="bslr-sub">Please review all details before publishing your item.</p>
                </div>
                <div className="bslr-header__illus" aria-hidden="true">
                  <svg viewBox="0 0 120 90" fill="none" width="110" height="82">
                    <ellipse cx="60" cy="80" rx="50" ry="6" fill="#e8e7e0" />
                    <rect x="22" y="38" width="58" height="40" rx="4" fill="#f4b942" stroke="#1a1a1a" strokeWidth="1.8" />
                    <path d="M22 50h58" stroke="#1a1a1a" strokeWidth="1.8" />
                    <path d="M51 38v-10a11 11 0 0 0-22 0v10" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="40" cy="56" r="4" fill="#fff" stroke="#1a1a1a" strokeWidth="1.4" />
                    <rect x="68" y="42" width="28" height="22" rx="3" fill="#5dae61" stroke="#1a1a1a" strokeWidth="1.5" />
                    <path d="M74 53l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <button type="button" className="bslr-edit-all-btn" onClick={() => navigate('/profile/post/buy-sell')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit All
                </button>
              </div>

              <div className="bslr-content">
                {/* Photo gallery */}
                {photos.length > 0 && (
                  <div className="bslr-gallery">
                    <img
                      src={photos[0].url} alt="Main"
                      className="bslr-gallery__main bslr-gallery__img"
                      onClick={() => openPreview(0, photos)}
                    />
                    {photos.length > 1 && (
                      <div className="bslr-gallery__side">
                        {photos.slice(1, 4).map((p, i) => (
                          <img
                            key={p.id} src={p.url} alt={`Photo ${i + 2}`}
                            className="bslr-gallery__thumb bslr-gallery__img"
                            onClick={() => openPreview(i + 1, photos)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Details table */}
                <div className="bslr-details">
                  <h3 className="bslr-item-title">{listing.title}</h3>
                  <table className="bslr-table">
                    <tbody>
                      {details.map(({ label, value }) => (
                        <tr key={label} className="bslr-table__row">
                          <td className="bslr-table__label">{label}</td>
                          <td className="bslr-table__value" style={{ whiteSpace: label === 'Description' ? 'pre-line' : 'normal' }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bslr-bottom-row">
                <div className="bslr-safety-card">
                  <div className="bslr-safety-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="28" height="28">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div className="bslr-safety-card__body">
                    <h4 className="bslr-safety-card__title">Be safe when you sell</h4>
                    <p className="bslr-safety-card__desc">Meet in public places, avoid sharing personal details, and complete the exchange securely.</p>
                    <button type="button" className="bslr-safety-card__link">
                      Read our safety tips
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>
              <div className="cl-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                  </svg>
                  Selling on 1 Euro Pass is Easy!
                </h3>
                <div className="bsl-selling-list">
                  {[
                    { title: 'List in seconds', desc: 'Create your listing in just a few steps.' },
                    { title: 'Reach students', desc: 'Your item will be seen by thousands.' },
                    { title: 'Sell safely', desc: 'Follow our safety tips for a secure deal.' },
                  ].map(item => (
                    <div key={item.title} className="bsl-selling-item">
                      <div className="bsl-selling-item__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                      </div>
                      <div>
                        <p className="bsl-selling-item__title">{item.title}</p>
                        <p className="bsl-selling-item__desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cl-card bsl-tips-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2" width="17" height="17"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  Tips for a Great Listing
                </h3>
                <div className="bsl-tips-list">
                  {['Choose the right category', 'Add clear photos', 'Write a detailed description', 'Set a fair price', 'Respond to buyers quickly'].map(tip => (
                    <div key={tip} className="bsl-tip-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

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
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate(photosUrl)} disabled={publishing}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#fff', color: '#1a1a1a', borderColor: '#1a1a1a' }} onClick={handleSaveDraft} disabled={publishing}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save as Draft
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={handlePublish} disabled={publishing}>
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
      {previewUrl && listing && (
        <div className="bslr-lightbox" onClick={closePreview}>
          <button className="bslr-lightbox__close" onClick={closePreview}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          {listing.photos.length > 1 && (
            <button className="bslr-lightbox__nav bslr-lightbox__nav--prev" onClick={e => { e.stopPropagation(); const all = listing.photos; const prev = (previewIndex - 1 + all.length) % all.length; setPreviewIndex(prev); setPreviewUrl(all[prev].url) }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
          )}
          <img src={previewUrl} alt="Preview" className="bslr-lightbox__img" onClick={e => e.stopPropagation()} />
          {listing.photos.length > 1 && (
            <button className="bslr-lightbox__nav bslr-lightbox__nav--next" onClick={e => { e.stopPropagation(); const all = listing.photos; const next = (previewIndex + 1) % all.length; setPreviewIndex(next); setPreviewUrl(all[next].url) }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          )}
          <div className="bslr-lightbox__dots">
            {listing.photos.map((_, i) => (
              <span key={i} className={`bslr-lightbox__dot${i === previewIndex ? ' is-active' : ''}`} onClick={e => { e.stopPropagation(); setPreviewIndex(i); setPreviewUrl(listing.photos[i].url) }} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
