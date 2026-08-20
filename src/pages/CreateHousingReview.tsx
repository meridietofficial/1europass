import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80',
]

const DETAIL_TAGS = [
  'Fully Furnished',
  'Parking: Yes',
  'Pets Allowed: No',
  'Smoking Allowed: No',
  'Gender: Female Only',
]

const UTILITY_TAGS = ['Bills Included', 'Balcony', 'Water', 'Heating', 'Internet', 'Gas']

const HOW_IT_WORKS = [
  'Students will find your listing',
  'They will send you a chat request',
  'You chat in-app and decide',
  'Share contact only after mutual consent',
]

export default function CreateHousingReview() {
  const navigate = useNavigate()
  const [autoTranslate, setAutoTranslate] = useState(true)

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* Hero */}
        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post/housing">Housing</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">List your place and connect with students across Europe.</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step">
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Basic Info</span>
                  <span className="cl-step__sub">What are you renting?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step">
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Photos</span>
                  <span className="cl-step__sub">Make your listing stand out</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step is-active">
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                </div>
                <div className="cl-step__circle">3</div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; Publish</span>
                  <span className="cl-step__sub">See what others will see</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-card">
          <div className="rv-body">

            {/* ── Left column ── */}
            <div className="rv-left">

              {/* Header */}
              <div className="rv-section-header">
                <div>
                  <h2 className="rv-main-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
                    </svg>
                    Review Your Listing
                  </h2>
                  <p className="rv-main-sub">Please check all details before publishing. You can go back to edit if needed.</p>
                </div>
                <button className="rv-edit-all-btn" type="button" onClick={() => navigate('/profile/post/housing')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit All
                </button>
              </div>

              {/* Basic Information */}
              <div className="rv-section">
                <div className="rv-section__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="rv-section__body">
                  <div className="rv-section__row">
                    <h3 className="rv-section__title">Basic Information</h3>
                    <button className="rv-edit-btn" type="button" onClick={() => navigate('/profile/post/housing')}>Edit</button>
                  </div>
                  <p className="rv-section__line rv-section__line--strong">Entire Apartment • Amsterdam, Netherlands</p>
                  <p className="rv-section__line">De Pijp, Amsterdam</p>
                  <p className="rv-section__line">+31 6 123456789</p>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="rv-section">
                <div className="rv-section__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="rv-section__body">
                  <div className="rv-section__row">
                    <h3 className="rv-section__title">Pricing &amp; Availability</h3>
                    <button className="rv-edit-btn" type="button" onClick={() => navigate('/profile/post/housing')}>Edit</button>
                  </div>
                  <p className="rv-section__line">Rent (per month): <strong>€650</strong></p>
                  <p className="rv-section__line">Deposit: <strong>€650</strong></p>
                  <p className="rv-section__line">Available From: <strong>15 June 2025</strong></p>
                </div>
              </div>

              {/* Photos */}
              <div className="rv-section">
                <div className="rv-section__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="rv-section__body">
                  <div className="rv-section__row">
                    <h3 className="rv-section__title">Photos</h3>
                    <button className="rv-edit-btn" type="button" onClick={() => navigate('/profile/post/housing/photos')}>Edit</button>
                  </div>
                  <div className="rv-photos">
                    {MOCK_PHOTOS.slice(0, 3).map((url, i) => (
                      <img key={i} src={url} alt="" className="rv-photo-thumb" />
                    ))}
                    {MOCK_PHOTOS.length > 3 && (
                      <div className="rv-photo-more">+{MOCK_PHOTOS.length - 3}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rv-section">
                <div className="rv-section__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                </div>
                <div className="rv-section__body">
                  <div className="rv-section__row">
                    <h3 className="rv-section__title">Description</h3>
                    <button className="rv-edit-btn" type="button" onClick={() => navigate('/profile/post/housing')}>Edit</button>
                  </div>
                  <p className="rv-section__line">Bright room in a fully furnished apartment. 5 min walk to metro. All basic amenities included.</p>
                </div>
              </div>

              {/* Details */}
              <div className="rv-section">
                <div className="rv-section__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </div>
                <div className="rv-section__body">
                  <div className="rv-section__row">
                    <h3 className="rv-section__title">Details</h3>
                    <button className="rv-edit-btn" type="button" onClick={() => navigate('/profile/post/housing')}>Edit</button>
                  </div>
                  <div className="rv-tags">
                    {DETAIL_TAGS.map(t => <span key={t} className="rv-tag">{t}</span>)}
                  </div>
                  <div className="rv-tags" style={{ marginTop: 6 }}>
                    {UTILITY_TAGS.map(t => <span key={t} className="rv-tag rv-tag--util">{t}</span>)}
                  </div>
                </div>
              </div>

              {/* Privacy notice */}
              <div className="rv-privacy">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <p className="rv-privacy__title">Your Privacy is Protected</p>
                  <p className="rv-privacy__sub">Your phone number will never be shown publicly. Students will contact you through in-app chat first.</p>
                </div>
              </div>

              {/* Bottom action row */}
              <div className="rv-action-row">

                {/* Verify */}
                <div className="rv-action-card">
                  <div className="rv-action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div className="rv-action-card__body">
                    <p className="rv-action-card__title">Verify Yourself <span className="rv-action-card__opt">(Optional)</span></p>
                    <p className="rv-action-card__sub">Get a verified badge to build trust and get more enquiries.</p>
                  </div>
                  <button className="rv-action-btn" type="button">Verify Now</button>
                </div>

                {/* Save Draft */}
                <div className="rv-action-card">
                  <div className="rv-action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="rv-action-card__body">
                    <p className="rv-action-card__title">Save as Draft</p>
                    <p className="rv-action-card__sub">You can save and continue later.</p>
                  </div>
                  <button className="rv-action-btn" type="button">Save Draft</button>
                </div>

                {/* Auto Translate */}
                <div className="rv-action-card">
                  <div className="rv-action-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="rv-action-card__body">
                    <p className="rv-action-card__title">Auto Translate</p>
                    <p className="rv-action-card__sub">Your listing will be automatically translated to 15+ languages.</p>
                  </div>
                  <label className="cl-switch" style={{ flexShrink: 0 }}>
                    <input type="checkbox" checked={autoTranslate} onChange={e => setAutoTranslate(e.target.checked)} />
                    <span className="cl-switch__track" />
                  </label>
                </div>

              </div>
            </div>

            {/* ── Right column ── */}
            <div className="rv-right">

              {/* Listing Preview */}
              <div className="rv-preview">
                <div className="rv-preview__header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  Listing Preview
                </div>
                <div className="rv-preview__card">
                  <div className="rv-preview__img-wrap">
                    <img src={MOCK_PHOTOS[0]} alt="Listing" className="rv-preview__img" />
                    <button className="rv-preview__heart" type="button">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#e05" strokeWidth="2" width="14" height="14">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                  <div className="rv-preview__info">
                    <p className="rv-preview__name">Room in Shared Apartment</p>
                    <p className="rv-preview__price">€650<span>/month</span></p>
                    <div className="rv-preview__loc">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      De Pijp, Amsterdam
                    </div>
                    <div className="rv-preview__tags">
                      <span className="rv-preview__tag">Furnished</span>
                      <span className="rv-preview__tag">Bills</span>
                      <span className="rv-preview__tag">Wi-Fi Included</span>
                    </div>
                    <p className="rv-preview__avail">Available from 15 June</p>
                    <div className="rv-preview__host">
                      <div className="rv-preview__avatar">A</div>
                      <div>
                        <p className="rv-preview__host-name">Anna</p>
                        <p className="rv-preview__host-role">Verified Host</p>
                      </div>
                      <a href="#" className="rv-preview__details">View details →</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="rv-hiw">
                <div className="rv-hiw__illus">
                  <svg viewBox="0 0 120 60" width="120" height="60">
                    <circle cx="30" cy="30" r="20" fill="#a8d4ab" opacity="0.5" />
                    <circle cx="60" cy="25" r="15" fill="#5dae61" opacity="0.4" />
                    <circle cx="90" cy="32" r="18" fill="#a8d4ab" opacity="0.45" />
                    <circle cx="30" cy="30" r="10" fill="#5dae61" opacity="0.7" />
                    <circle cx="60" cy="25" r="7" fill="#fff" opacity="0.6" />
                    <circle cx="90" cy="32" r="9" fill="#5dae61" opacity="0.6" />
                    <path d="M20 30 Q45 10 60 25 Q75 38 90 32" stroke="#fff" strokeWidth="2" fill="none" opacity="0.7" />
                  </svg>
                </div>
                <h4 className="rv-hiw__title">How it works after publishing?</h4>
                <ul className="rv-hiw__list">
                  {HOW_IT_WORKS.map((item, i) => (
                    <li key={i} className="rv-hiw__item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Footer bar */}
          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post/housing/photos')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button type="button" className="rv-publish-btn">
                  Publish Listing
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <p className="cl-footer-bar__note">One-time payment of €1 to publish</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
