import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PHOTO_LABELS = [
  { label: 'Front View', icon: '📷' },
  { label: 'Back View', icon: '🔄' },
  { label: 'Side View', icon: '↔️' },
  { label: 'Detail Shot', icon: '🔍' },
  { label: 'Box / Packaging', icon: '📦' },
  { label: 'Accessories', icon: '🧩' },
  { label: 'Receipt / Proof', icon: '🧾' },
  { label: 'Other', icon: '🖼️' },
]

const PHOTO_TIPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    text: 'Use a plain, well-lit background',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    text: 'Show multiple angles of the item',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    text: 'Photograph any damage or wear',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: 'Include original box if available',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    text: 'Add a short video for more views',
  },
]

interface PhotoItem {
  file: File
  url: string
  label: string
}

export default function BuySellPhotos() {
  const navigate = useNavigate()
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [videoDragOver, setVideoDragOver] = useState(false)
  const [showLabelModal, setShowLabelModal] = useState(false)
  const [pendingLabel, setPendingLabel] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  const MAX_PHOTOS = 8
  const qualityStars = Math.min(5, Math.ceil((photos.length / MAX_PHOTOS) * 5))
  const photoProgress = Math.min(100, Math.round((photos.length / MAX_PHOTOS) * 100))

  function addPhotos(files: File[], label: string) {
    const images = files.filter(f => f.type.startsWith('image/'))
    const newItems: PhotoItem[] = images.map(file => ({ file, url: URL.createObjectURL(file), label }))
    setPhotos(prev => [...prev, ...newItems].slice(0, MAX_PHOTOS))
  }

  function handleLabelSelect(label: string) {
    setPendingLabel(label)
    setShowLabelModal(false)
    fileRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    addPhotos(Array.from(e.target.files ?? []), pendingLabel || 'Other')
    e.target.value = ''
    setPendingLabel('')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (!pendingLabel) { setShowLabelModal(true); return }
    addPhotos(Array.from(e.dataTransfer.files), pendingLabel)
    setPendingLabel('')
  }

  function removePhoto(idx: number) {
    setPhotos(prev => { URL.revokeObjectURL(prev[idx].url); return prev.filter((_, i) => i !== idx) })
  }

  function updateLabel(idx: number, label: string) {
    setPhotos(prev => prev.map((p, i) => i === idx ? { ...p, label } : p))
  }

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setVideoFile(file)
    e.target.value = ''
  }

  function handleVideoDrop(e: React.DragEvent) {
    e.preventDefault()
    setVideoDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) setVideoFile(file)
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
                <Link to="/profile/post/buy-sell">Buy &amp; Sell</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Photos</span>
              </nav>
              <h1 className="cl-hero__title">Post Your Item</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
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
              <div className="cl-step is-active">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
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
          <div className="cl-left" style={{ minWidth: 0 }}>

          {/* Header row */}
          <div className="ph-header" style={{ padding: '28px 0 0' }}>
            <div className="ph-header__left">
              <h2 className="ph-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Add Photos
              </h2>
              <p className="ph-subtitle">Upload high-quality photos to attract more buyers. You can add up to {MAX_PHOTOS} photos.</p>
            </div>

            {/* Photo Quality card */}
            <div className="ph-quality">
              <div className="ph-quality__label">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="14" height="14">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Photo Quality
              </div>
              <div className="ph-quality__stars">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} viewBox="0 0 24 24" width="16" height="16" fill={s <= qualityStars ? '#f5a623' : 'none'} stroke="#f5a623" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="ph-quality__count">{photos.length}/{MAX_PHOTOS} Photos Added</div>
              <div className="ph-quality__bar">
                <div className="ph-quality__bar-fill" style={{ width: `${photoProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="ph-body" style={{ padding: '20px 0 32px' }}>

            {/* Photo grid */}
            <div className="ph-grid">
              {photos.map((p, idx) => (
                <div key={idx} className="ph-photo">
                  <img src={p.url} alt={p.label} className="ph-photo__img" />
                  <button className="ph-photo__remove" type="button" onClick={() => removePhoto(idx)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <select
                    className="ph-photo__label"
                    value={p.label}
                    onChange={e => updateLabel(idx, e.target.value)}
                  >
                    {PHOTO_LABELS.map(l => <option key={l.label} value={l.label}>{l.label}</option>)}
                  </select>
                </div>
              ))}

              {/* Add photo slot */}
              {photos.length < MAX_PHOTOS && (
                <div
                  className={`ph-add${dragOver ? ' is-drag' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => setShowLabelModal(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.5" width="36" height="36">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="ph-add__label">Add Photo</span>
                  <span className="ph-add__sub">Recommended</span>
                  <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileChange} />
                </div>
              )}
            </div>

            {/* Photo Tips */}
            <div className="ph-tips">
              <div className="ph-tips__heading">
                <svg viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2" width="16" height="16">
                  <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.9V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.1A7 7 0 0 1 12 2z" />
                </svg>
                Photo Tips
              </div>
              <div className="ph-tips__list">
                {PHOTO_TIPS.map((tip, i) => (
                  <div key={i} className="ph-tip">
                    <span className="ph-tip__icon">{tip.icon}</span>
                    <span className="ph-tip__text">{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video + Save as Draft row */}
            <div className="ph-bottom-row">

              {/* Add a Video */}
              <div className="ph-video">
                <div className="ph-video__info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                  <div>
                    <p className="ph-video__title">Add a Video <span className="ph-video__opt">(Optional)</span></p>
                    <p className="ph-video__sub">A short video helps buyers see the item better.</p>
                  </div>
                </div>
                <div
                  className={`ph-video__upload${videoDragOver ? ' is-drag' : ''}`}
                  onDragOver={e => { e.preventDefault(); setVideoDragOver(true) }}
                  onDragLeave={() => setVideoDragOver(false)}
                  onDrop={handleVideoDrop}
                  onClick={() => videoRef.current?.click()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="16" height="16">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  {videoFile ? (
                    <span className="ph-video__filename">{videoFile.name}</span>
                  ) : (
                    <>
                      <span>Upload Video</span>
                      <span className="ph-video__max">Max 60 seconds</span>
                    </>
                  )}
                  <input ref={videoRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoChange} />
                </div>
              </div>

              {/* Save as Draft */}
              <div className="ph-draft">
                <div className="ph-draft__info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  <div>
                    <p className="ph-draft__title">Save as Draft</p>
                    <p className="ph-draft__sub">You can save and continue later.</p>
                  </div>
                </div>
                <button type="button" className="ph-draft__btn">Save Draft</button>
              </div>

            </div>
          </div>{/* end ph-body */}
          </div>{/* end cl-left */}

          {/* Right sidebar */}
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
                {['Choose the right category', 'Add clear photos', 'Write a detailed description', 'Set a fair price', 'Respond to buyers quickly'].map(tip => (
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

          </div>{/* end cl-right */}
          </div>{/* end cl-body */}

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
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post/buy-sell')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" onClick={() => navigate('/profile/post/buy-sell/review')}>
                  Next: Review
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

      {/* Photo label modal */}
      {showLabelModal && (
        <div className="ph-modal-overlay" onClick={() => setShowLabelModal(false)}>
          <div className="ph-modal" onClick={e => e.stopPropagation()}>
            <div className="ph-modal__header">
              <h3 className="ph-modal__title">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                What part of the item is this?
              </h3>
              <p className="ph-modal__sub">Select the view to label your photo correctly.</p>
              <button className="ph-modal__close" type="button" onClick={() => setShowLabelModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="ph-modal__grid">
              {PHOTO_LABELS.map(item => (
                <button
                  key={item.label}
                  type="button"
                  className="ph-modal__option"
                  onClick={() => handleLabelSelect(item.label)}
                >
                  <span className="ph-modal__option-icon">{item.icon}</span>
                  <span className="ph-modal__option-label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
