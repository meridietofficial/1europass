import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TEACHING_METHODS = [
  {
    id: 'live',
    label: 'Live Classes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'prerecorded',
    label: 'Pre-recorded Videos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id: 'one-on-one',
    label: 'One-on-One Sessions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'group',
    label: 'Group Classes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'hands-on',
    label: 'Hands-on Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" /><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    id: 'other',
    label: 'Other',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
      </svg>
    ),
  },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Weekdays', 'Weekends']
const TIMES = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–9pm)', 'Night (9pm–12am)', 'Flexible']

const DEFAULT_MODULES = [
  '1. Introduction',
  '2. Basic Concepts',
  '3. Key Techniques',
  '4. Practice & Assignments',
  '5. Final Project / Test',
]

const DEFAULT_OUTCOMES = [
  'e.g. Speak confidently in everyday conversations',
  'e.g. Improve grammar and vocabulary',
  'e.g. Write professional emails',
]

export default function CreateTutorCourseDetails() {
  const navigate = useNavigate()
  const descRef = useRef<HTMLDivElement>(null)
  const [descLength, setDescLength] = useState(0)

  const [modules, setModules] = useState<string[]>(DEFAULT_MODULES)
  const [newModule, setNewModule] = useState('')
  const [outcomes, setOutcomes] = useState<string[]>(DEFAULT_OUTCOMES)
  const [newOutcome, setNewOutcome] = useState('')
  const [methods, setMethods] = useState<string[]>(['live'])
  const [selectedDays, setSelectedDays] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [flexibleTiming, setFlexibleTiming] = useState(false)
  const [requirements, setRequirements] = useState('')
  const [materials, setMaterials] = useState('')

  function execCmd(cmd: string, val?: string) {
    document.execCommand(cmd, false, val)
    descRef.current?.focus()
    updateDescLength()
  }
  function updateDescLength() {
    setDescLength(descRef.current?.innerText.length ?? 0)
  }

  function addModule() {
    const val = newModule.trim()
    if (!val) return
    setModules(prev => [...prev, `${prev.length + 1}. ${val}`])
    setNewModule('')
  }
  function removeModule(i: number) { setModules(prev => prev.filter((_, idx) => idx !== i)) }

  function addOutcome() {
    const val = newOutcome.trim()
    if (!val) return
    setOutcomes(prev => [...prev, val])
    setNewOutcome('')
  }
  function removeOutcome(i: number) { setOutcomes(prev => prev.filter((_, idx) => idx !== i)) }

  function toggleMethod(id: string) {
    setMethods(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id])
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
                <Link to="/profile/post/tutor">Tutor</Link>
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
                  <span className="cl-step__sub">What are you tutoring?</span>
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

                <div className="cd-grid-2">

                  {/* ── Left sub-column ── */}
                  <div className="cd-col">

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

                    {/* Course Outline */}
                    <div className="cd-section">
                      <label className="cl-label">Course Outline / Curriculum *</label>
                      <div className="cd-module-add-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                        <input
                          className="cd-module-add-input"
                          type="text"
                          placeholder="Add the main modules or topics you will cover."
                          value={newModule}
                          onChange={(e) => setNewModule(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addModule()}
                        />
                      </div>
                      <div className="cd-module-list">
                        {modules.map((mod, i) => (
                          <div key={i} className="cd-module-item">
                            <span className="cd-module-drag">
                              <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" width="14" height="14">
                                <line x1="9" y1="5" x2="9" y2="19"/><line x1="15" y1="5" x2="15" y2="19"/>
                              </svg>
                            </span>
                            <span className="cd-module-text">{mod}</span>
                            <button type="button" className="cd-module-del" onClick={() => removeModule(i)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" width="14" height="14">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" className="cd-add-link" onClick={addModule}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add another module
                      </button>
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

                  {/* ── Right sub-column ── */}
                  <div className="cd-col">

                    {/* What will students learn */}
                    <div className="cd-section">
                      <label className="cl-label">What will students learn? *</label>
                      <div className="cd-outcomes">
                        {outcomes.map((oc, i) => (
                          <div key={i} className="cd-outcome-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13" style={{ flexShrink: 0 }}>
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <span className="cd-outcome-text">{oc}</span>
                            <button type="button" className="cd-outcome-del" onClick={() => removeOutcome(i)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" width="11" height="11">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                        <div className="cd-outcome-add-row">
                          <input
                            className="cl-input cd-outcome-input"
                            type="text"
                            placeholder="Add a learning outcome..."
                            value={newOutcome}
                            onChange={(e) => setNewOutcome(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addOutcome()}
                          />
                        </div>
                        <button type="button" className="cd-outcome-add-btn" onClick={addOutcome}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                          Add another outcome
                        </button>
                      </div>
                    </div>

                    {/* Teaching Methods */}
                    <div className="cd-section">
                      <label className="cl-label">Teaching Methods *</label>
                      <div className="cd-methods-grid">
                        {TEACHING_METHODS.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            className={`cd-method-btn${methods.includes(m.id) ? ' is-active' : ''}`}
                            onClick={() => toggleMethod(m.id)}
                          >
                            <span className="cd-method-icon">{m.icon}</span>
                            <span className="cd-method-label">{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Class Schedule */}
                    <div className="cd-section">
                      <label className="cl-label">Class Schedule / Availability *</label>
                      <div className="cd-schedule-row">
                        <div className="cl-iicon-wrap" style={{ flex: 1 }}>
                          <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          <select
                            className="cl-input cl-input--select cl-input--pl"
                            value={selectedDays}
                            onChange={(e) => setSelectedDays(e.target.value)}
                          >
                            <option value="">Select days</option>
                            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div className="cl-iicon-wrap" style={{ flex: 1 }}>
                          <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <select
                            className="cl-input cl-input--select cl-input--pl"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          >
                            <option value="">Select time</option>
                            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                      <label className="cl-checkbox" style={{ marginTop: 10 }}>
                        <input type="checkbox" checked={flexibleTiming} onChange={(e) => setFlexibleTiming(e.target.checked)} />
                        <span className="cl-checkbox__box" />
                        <span className="cl-checkbox__label">
                          Flexible timing
                          <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="13" height="13" style={{ marginLeft: 4, display: 'inline', verticalAlign: 'middle' }}>
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                        </span>
                      </label>
                    </div>

                    {/* Materials Provided */}
                    <div className="cd-section">
                      <label className="cl-label">Materials Provided</label>
                      <textarea
                        className="cl-textarea"
                        rows={3}
                        placeholder="e.g. PDF notes, Worksheets, Assignments, Certificates"
                        maxLength={300}
                        value={materials}
                        onChange={(e) => setMaterials(e.target.value)}
                      />
                      <div className="cl-char-count">{materials.length}/300</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right sidebar ─── */}
            <div className="cl-right">

              {/* Live Preview */}
              <div className="tutor-preview-card">
                <div className="tutor-preview-card__header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>Live Preview</span>
                </div>
                <div className="tutor-preview-card__body">
                  {outcomes.length > 0 || methods.length > 0 ? (
                    <div className="tutor-preview-content">
                      {outcomes.slice(0, 2).map((oc, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#444' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="12" height="12">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{oc}</span>
                        </div>
                      ))}
                      {methods.length > 0 && (
                        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {methods.map(m => (
                            <span key={m} style={{ padding: '2px 8px', borderRadius: 20, background: '#e8f5e9', color: '#5dae61', fontSize: 11, fontWeight: 700 }}>
                              {TEACHING_METHODS.find(t => t.id === m)?.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="tutor-preview-empty">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" width="40" height="40">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <p>Your course preview will appear here as you fill in the details.</p>
                    </div>
                  )}
                </div>
              </div>

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
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post/tutor')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button
                  type="button"
                  className="cl-next-btn"
                  onClick={() => navigate('/profile/post/tutor/review')}
                >
                  Next: Review &amp; Publish
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
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
