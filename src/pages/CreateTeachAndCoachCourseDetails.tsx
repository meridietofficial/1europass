import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { apiGet, apiPut } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import { uploadImagesToCloudinary } from '../api/cloudinaryUpload'

const DRAFT_KEY = 'tac_draft_id'

export default function CreateTeachAndCoachCourseDetails() {
  const navigate = useNavigate()
  const descRef = useRef<HTMLDivElement>(null)
  const [descLength, setDescLength] = useState(0)

  const [requirements, setRequirements] = useState('')
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null)
  const [coverDragOver, setCoverDragOver] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)

  // Pre-populate from API if a draft exists
  useEffect(() => {
    const id = sessionStorage.getItem(DRAFT_KEY)
    if (!id) return
    apiGet<{ data: Record<string, any> }>(ENDPOINTS.teachAndCoach.get(id))
      .then(res => {
        const d = res.data
        if (d.requirements) setRequirements(d.requirements)
        if (d.cover_photo)  { setCoverPreview(d.cover_photo); setExistingCoverUrl(d.cover_photo) }
        if (d.description && descRef.current) {
          descRef.current.innerHTML = d.description
          setDescLength(descRef.current.innerText.length)
        }
      })
      .catch(() => {})
  }, [])

  const handleCoverFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setCoverPhoto(file)
    setCoverPreview(URL.createObjectURL(file))
  }, [])

  function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleCoverFile(file)
  }

  function onCoverDrop(e: React.DragEvent) {
    e.preventDefault()
    setCoverDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleCoverFile(file)
  }

  function execCmd(cmd: string, val?: string) {
    document.execCommand(cmd, false, val)
    descRef.current?.focus()
    updateDescLength()
  }
  function updateDescLength() {
    setDescLength(descRef.current?.innerText.length ?? 0)
  }

  async function saveToApi(): Promise<void> {
    const id = sessionStorage.getItem(DRAFT_KEY)
    if (!id) { alert('No listing found. Please go back to Step 1.'); return }

    let coverUrl: string | null = existingCoverUrl
    if (coverPhoto) {
      const [url] = await uploadImagesToCloudinary([coverPhoto], 'teach-and-coach')
      coverUrl = url
    }

    await apiPut(ENDPOINTS.teachAndCoach.update(id), {
      cover_photo:  coverUrl,
      description:  descRef.current?.innerHTML ?? null,
      requirements: requirements || null,
    })
  }

  async function handleSaveDraft() {
    setSubmitting(true)
    try {
      await saveToApi()
      alert('Draft saved!')
    } catch (e: any) {
      alert(e.message ?? 'Failed to save draft')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleNext() {
    setSubmitting(true)
    try {
      await saveToApi()
      navigate('/profile/post/teach-and-coach/review')
    } catch (e: any) {
      alert(e.message ?? 'Failed to save')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* ─── Hero / Steps ─── */}
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
                <Link to="/profile/post/teach-and-coach">Teach &amp; Coach</Link>
                <span className="cl-breadcrumb__sep">/</span>
                <span>Course Details</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                    <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Basic Info</span>
                  <span className="cl-step__sub">What are you teaching?</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step is-active">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Course Details</span>
                  <span className="cl-step__sub">What will u cover?</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; Publish</span>
                  <span className="cl-step__sub">See what others will see</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-card">
          <div className="cl-body">

            {/* ─── Left main area ─── */}
            <div className="cl-left">
              <div style={{ padding: '4px 20px 12px' }}>
                <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 26, color: '#1a1a1a', marginBottom: 24 }}>
                  Course Details
                </h2>

                <div className="cd-single-col">

                  {/* Cover Photo */}
                  <div className="cd-section">
                    <label className="cl-label">Cover Photo *</label>
                    <div
                      className={`tutor-cover-drop${coverDragOver ? ' is-drag' : ''}`}
                      onClick={() => coverInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setCoverDragOver(true) }}
                      onDragLeave={() => setCoverDragOver(false)}
                      onDrop={onCoverDrop}
                    >
                      {coverPreview ? (
                        <>
                          <img src={coverPreview} alt="Cover preview" className="tutor-cover-preview" />
                          <button
                            type="button"
                            className="tutor-cover-remove"
                            onClick={(e) => { e.stopPropagation(); setCoverPhoto(null); setCoverPreview(null); setExistingCoverUrl(null) }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </>
                      ) : (
                        <div className="tutor-cover-empty">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" width="36" height="36">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <p>Click or drag to upload a cover photo</p>
                          <span>JPG, PNG — recommended 1200×630</span>
                        </div>
                      )}
                    </div>
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={onCoverChange}
                    />
                  </div>

                  {/* Course Description */}
                  <div className="cd-section">
                    <label className="cl-label">Course Description *</label>
                    <div className="cd-rte">
                      <div className="cd-rte__toolbar">
                        <button type="button" className="cd-rte__btn" title="Bold" onMouseDown={(e) => { e.preventDefault(); execCmd('bold') }}><b>B</b></button>
                        <button type="button" className="cd-rte__btn cd-rte__btn--italic" title="Italic" onMouseDown={(e) => { e.preventDefault(); execCmd('italic') }}><i>I</i></button>
                        <button type="button" className="cd-rte__btn cd-rte__btn--underline" title="Underline" onMouseDown={(e) => { e.preventDefault(); execCmd('underline') }}><u>U</u></button>
                        <div className="cd-rte__divider" />
                        <button type="button" className="cd-rte__btn" title="Align left" onMouseDown={(e) => { e.preventDefault(); execCmd('justifyLeft') }}>
                          <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M2 3h12v1.5H2zm0 3h8v1.5H2zm0 3h12v1.5H2zm0 3h8v1.5H2z"/></svg>
                        </button>
                        <button type="button" className="cd-rte__btn" title="Align center" onMouseDown={(e) => { e.preventDefault(); execCmd('justifyCenter') }}>
                          <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M2 3h12v1.5H2zm2 3h8v1.5H4zm-2 3h12v1.5H2zm2 3h8v1.5H4z"/></svg>
                        </button>
                        <div className="cd-rte__divider" />
                        <button type="button" className="cd-rte__btn" title="Insert link" onMouseDown={(e) => { e.preventDefault(); const url = prompt('Enter URL'); if (url) execCmd('createLink', url) }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        </button>
                        <span className="cd-rte__count">{descLength}/2000</span>
                      </div>
                      <div
                        ref={descRef}
                        className="cd-rte__body"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={updateDescLength}
                        data-placeholder="Describe your course, what it covers and why students should take it..."
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="cd-section">
                    <label className="cl-label">
                      Requirements / Prerequisites{' '}
                      <span style={{ color: '#5dae61', fontStyle: 'italic', fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <textarea
                      className="cl-textarea"
                      rows={3}
                      placeholder="e.g. Basic English knowledge, Laptop, etc."
                      maxLength={300}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                    />
                    <div className="cl-char-count">{requirements.length}/300</div>
                  </div>

                </div>
              </div>
            </div>

            {/* ─── Right sidebar ─── */}
            <div className="cl-right">

              {/* Tips */}
              <div className="tutor-tips-card">
                <div className="tutor-tips-card__header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" width="18" height="18">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>Tips for a Great Listing</span>
                </div>
                <ul className="tutor-tips-list">
                  {[
                    'Write a clear and engaging description',
                    'Break your course into well-structured modules',
                    'Highlight the outcomes students will achieve',
                    'Use attractive images and videos',
                    'Set the right price and duration',
                  ].map((tip) => (
                    <li key={tip} className="tutor-tips-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need Help */}
              <div className="tutor-help-card">
                <div>
                  <h4 className="tutor-help-card__title">Need Help?</h4>
                  <p className="tutor-help-card__sub">Check our guidelines for posting items.</p>
                </div>
                <button type="button" className="tutor-help-btn">
                  View Posting Guidelines →
                </button>
              </div>

            </div>
          </div>

          {/* Footer bar */}
          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post/teach-and-coach')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button
                  type="button"
                  className="cl-next-btn"
                  style={{ background: '#fff', color: '#1a1a1a', borderColor: '#1a1a1a' }}
                  onClick={handleSaveDraft}
                  disabled={submitting}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                  </svg>
                  {submitting ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  type="button"
                  className="cl-next-btn"
                  onClick={handleNext}
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Next: Review & Publish'}
                  {!submitting && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                </button>
              </div>
              <p className="cl-footer-bar__note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" style={{ display: 'inline', marginRight: 3 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
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
