import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { apiGet, apiPost, apiPut } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

const DRAFT_KEY = 'tac_draft_id'

interface TacSubcategory { id: number; name: string }
interface TacCategory    { id: number; name: string; subcategories: TacSubcategory[] }

const LANGUAGES = [
  'English', 'French', 'Spanish', 'German', 'Dutch', 'Italian',
  'Portuguese', 'Polish', 'Romanian', 'Other',
]

const PRICE_FREQUENCY = ['One-time', 'Per hour', 'Per session', 'Per month']

export default function CreateTeachAndCoachListing() {
  const navigate = useNavigate()

  const [courseTitle, setCourseTitle] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [teachingMode, setTeachingMode] = useState('')

  const [languages, setLanguages] = useState<string[]>([])
  const [price, setPrice] = useState('')
  const [priceFreq, setPriceFreq] = useState('One-time')
  const [schedule, setSchedule] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [draftId, setDraftId] = useState<string | null>(
    () => sessionStorage.getItem(DRAFT_KEY),
  )

  const [tacCategories, setTacCategories] = useState<TacCategory[]>([])

  // Load categories then pre-populate from API if a draft exists
  useEffect(() => {
    apiGet<{ data: TacCategory[] }>(ENDPOINTS.teachAndCoach.categories)
      .then(res => setTacCategories(res.data))
      .catch(() => {})

    const id = sessionStorage.getItem(DRAFT_KEY)
    if (!id) return
    apiGet<{ data: Record<string, any> }>(ENDPOINTS.teachAndCoach.get(id))
      .then(res => {
        const d = res.data
        if (d.title)         setCourseTitle(d.title)
        if (d.category)      setCategory(d.category)
        if (d.subcategory)   setSubcategory(d.subcategory)
        if (d.teaching_mode) setTeachingMode(d.teaching_mode)
        if (d.language)      setLanguages(d.language.split(', ').filter(Boolean))
        if (d.price != null) setPrice(String(d.price))
        if (d.price_freq)    setPriceFreq(d.price_freq)
        if (d.schedule)      setSchedule(d.schedule)
      })
      .catch(() => {})
  }, [])

  const selectedCat = tacCategories.find(c => c.name === category)
  const subcategoryList = selectedCat?.subcategories ?? []

  function buildPayload() {
    return {
      title:         courseTitle.trim(),
      category:      category || null,
      subcategory:   subcategory || null,
      teaching_mode: teachingMode || null,
      language:      languages.length ? languages.join(', ') : null,
      price:         price ? Number(price) : null,
      price_freq:    priceFreq,
      schedule:      schedule || null,
    }
  }

  async function saveToApi(): Promise<string> {
    if (draftId) {
      await apiPut(ENDPOINTS.teachAndCoach.update(draftId), buildPayload())
      return draftId
    }
    const res = await apiPost<{ data: { id: string } }>(ENDPOINTS.teachAndCoach.create, buildPayload())
    const id = res.data.id
    sessionStorage.setItem(DRAFT_KEY, id)
    setDraftId(id)
    return id
  }

  async function handleSaveDraft() {
    if (!courseTitle.trim()) { alert('Title is required to save a draft'); return }
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
    if (!courseTitle.trim()) { alert('Title is required'); return }
    setSubmitting(true)
    try {
      await saveToApi()
      navigate('/profile/post/teach-and-coach/course-details')
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
                <span>Teach &amp; Coach</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">Sell it in seconds. Reach students across Europe.</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step is-active">
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
              <div className="cl-step">
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

            {/* ─── Left Column ─── */}
            <div className="cl-left">

              <div style={{ padding: '4px 20px 12px' }}>
                <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 26, color: '#1a1a1a', marginBottom: 20 }}>
                  Basic Information
                </h2>

                {/* Row 1: Course Title (full width) */}
                <div className="tutor-field tutor-field--standalone">
                  <label className="cl-label">Course / Class Title *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className="cl-input"
                      type="text"
                      placeholder="e.g. English Speaking Mastery"
                      maxLength={80}
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      style={{ paddingRight: 52 }}
                    />
                    <span style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      fontSize: 11, color: '#b0afa8', fontFamily: 'Nunito, sans-serif', pointerEvents: 'none',
                    }}>
                      {courseTitle.length}/80
                    </span>
                  </div>
                </div>

                {/* Row 2: Category + Subcategory */}
                <div className="tutor-grid-2">
                  <div className="tutor-field">
                    <label className="cl-label">Category *</label>
                    <div className="cl-select-wrap">
                      <svg className="cl-select-icon" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15">
                        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                      </svg>
                      <select
                        className="cl-input cl-input--select cl-input--pl"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setSubcategory('') }}
                      >
                        <option value="">Select a category</option>
                        {tacCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="tutor-field">
                    <label className="cl-label">Subcategory *</label>
                    <div className="cl-select-wrap">
                      <select
                        className="cl-input cl-input--select"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        disabled={!category}
                      >
                        <option value="">Select a subcategory</option>
                        {subcategoryList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 3: Price + Teaching Mode */}
                <div className="tutor-grid-2">
                  <div className="tutor-field">
                    <label className="cl-label">Price *</label>
                    <div className="tutor-price-row">
                      <div className="cl-euro-wrap" style={{ flex: 1 }}>
                        <span className="cl-euro-sym">€</span>
                        <input
                          className="cl-input cl-input--euro"
                          type="number"
                          min="0"
                          placeholder="e.g. 10"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <select
                        className="cl-input tutor-freq-select"
                        value={priceFreq}
                        onChange={(e) => setPriceFreq(e.target.value)}
                      >
                        {PRICE_FREQUENCY.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="tutor-field">
                    <label className="cl-label">Teaching Mode *</label>
                    <div className="tutor-toggle-row">
                      {[
                        { val: 'Online', icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                        )},
                        { val: 'In-person', icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                        )},
                        { val: 'Both', icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                          </svg>
                        )},
                      ].map(({ val, icon }) => (
                        <button
                          key={val}
                          type="button"
                          className={`tutor-mode-btn${teachingMode === val ? ' is-active' : ''}`}
                          onClick={() => setTeachingMode(teachingMode === val ? '' : val)}
                        >
                          {icon} {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 4: Language + Schedule */}
                <div className="tutor-grid-2">
                  <div className="tutor-field">
                    <label className="cl-label">Language of Instruction *</label>
                    <div className="tac-lang-wrap">
                      {LANGUAGES.map(l => {
                        const active = languages.includes(l)
                        return (
                          <button
                            key={l}
                            type="button"
                            className={`tac-lang-chip${active ? ' is-active' : ''}`}
                            onClick={() => setLanguages(prev =>
                              active ? prev.filter(x => x !== l) : [...prev, l]
                            )}
                          >{l}</button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="tutor-field">
                    <label className="cl-label">Schedule / Availability *</label>
                    <div className="cl-iicon-wrap">
                      <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <input
                        className="cl-input cl-input--pl"
                        type="text"
                        placeholder="e.g. Mon / Wed evenings, 7–8:30 PM"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ─── Right Column ─── */}
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
                    'Use a clear and specific title',
                    'Choose the right category',
                    'Highlight what students will learn',
                    'Add accurate pricing and duration',
                    'High quality listings get more students!',
                  ].map((tip) => (
                    <li key={tip} className="tutor-tips-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="tutor-tips-img-placeholder" />
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
                  {submitting ? 'Saving...' : 'Next: Course Details'}
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
