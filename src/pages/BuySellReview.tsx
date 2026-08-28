import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
  'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300&q=80',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&q=80',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&q=80',
]

const DETAILS = [
  { label: 'Category',    value: 'Mobiles & Tablets' },
  { label: 'Subcategory', value: 'iPhone' },
  { label: 'Condition',   value: 'Good' },
  { label: 'Price',       value: '€ 550' },
  { label: 'Location',    value: 'Berlin, Germany' },
  { label: 'Description', value: 'iPhone 14 Pro in good condition. Always used with a case and screen protector.\nBattery health: 88%. Comes with original box and cable. Minor signs of use.' },
]

export default function BuySellReview() {
  const navigate = useNavigate()

  const step1 = '/profile/post/buy-sell'
  const step2 = '/profile/post/buy-sell/photos'

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
                <Link to="/profile/post/buy-sell">Buy &amp; Sell</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Post Your Item</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
            </div>
            <div className="cl-steps">
              {/* Step 1 done */}
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
              {/* Step 2 done */}
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
              {/* Step 3 active */}
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

            {/* ── Left column ── */}
            <div className="cl-left">

              {/* Review header */}
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
                    <path d="M95 28c2-4 6-3 5 1" stroke="#5dae61" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M100 18l1-3M105 22l3-1M102 26l2 2" stroke="#f4b942" strokeWidth="1.4" strokeLinecap="round" />
                    <rect x="30" y="14" width="42" height="18" rx="8" fill="#fff" stroke="#1a1a1a" strokeWidth="1.4" />
                    <text x="36" y="27" fontFamily="sans-serif" fontSize="8" fill="#1a1a1a">List once,</text>
                    <text x="36" y="36" fontFamily="sans-serif" fontSize="8" fill="#1a1a1a">reach many!</text>
                  </svg>
                </div>
                <button type="button" className="bslr-edit-all-btn" onClick={() => navigate(step1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit All
                </button>
              </div>

              {/* Photo gallery + Item details */}
              <div className="bslr-content">
                {/* Photo gallery */}
                <div className="bslr-gallery">
                  <img src={MOCK_PHOTOS[0]} alt="Main" className="bslr-gallery__main" />
                  <div className="bslr-gallery__side">
                    {MOCK_PHOTOS.slice(1, 4).map((src, i) => (
                      <img key={i} src={src} alt={`Photo ${i + 2}`} className="bslr-gallery__thumb" />
                    ))}
                  </div>
                </div>

                {/* Item details table */}
                <div className="bslr-details">
                  <h3 className="bslr-item-title">iPhone 14 Pro — 256GB</h3>
                  <table className="bslr-table">
                    <tbody>
                      {DETAILS.map(({ label, value }) => (
                        <tr key={label} className="bslr-table__row">
                          <td className="bslr-table__label">{label}</td>
                          <td className="bslr-table__value" style={{ whiteSpace: label === 'Description' ? 'pre-line' : 'normal' }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Safety + Pricing row */}
              <div className="bslr-bottom-row">

                {/* Safety card */}
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

                {/* Pricing card */}
                <div className="bslr-pricing-card">
                  <div className="bslr-pricing-row">
                    <span className="bslr-pricing-label">Your Listing</span>
                    <span className="bslr-pricing-value">€ 1.00</span>
                  </div>
                  <div className="bslr-pricing-divider" />
                  <div className="bslr-pricing-row">
                    <span className="bslr-pricing-label">Listing Fee</span>
                    <span className="bslr-pricing-value">€ 1.00</span>
                  </div>
                  <div className="bslr-pricing-divider" />
                  <div className="bslr-pricing-row bslr-pricing-row--total">
                    <span className="bslr-pricing-label bslr-pricing-label--total">Total</span>
                    <span className="bslr-pricing-value bslr-pricing-value--total">€ 1.00</span>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Right column ── */}
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
                      <circle cx="48" cy="10" r="3" fill="#f4b942" stroke="#1a1a1a" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer bar */}
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
                <button type="button" className="cl-back-btn" onClick={() => navigate(step2)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={() => alert('Listing published! 🎉')}>
                  Publish Listing
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
