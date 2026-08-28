import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ROOM_TYPES = [
  {
    id: 'private',
    label: 'Private Room',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" /><path d="M9 12V9" />
      </svg>
    ),
  },
  {
    id: 'shared',
    label: 'Shared Room',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
        <circle cx="8" cy="6.5" r="1" /><circle cx="16" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    id: 'entire',
    label: 'Entire Place',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

const FURNISHING_OPTIONS = ['Fully Furnished', 'Partially Furnished', 'Unfurnished']
const MIN_STAY_OPTIONS = ['Month-to-month', '3 Months', '6 Months', '1 Year+']
const GENDER_OPTIONS = ['Anyone', 'Male', 'Female Only']
const BILL_ITEMS = ['Wi-Fi', 'Electricity', 'Heating', 'Water', 'Gas'] as const
type BillKey = (typeof BILL_ITEMS)[number]
const PHOTO_ROOM_LABELS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Common Area', 'Other']

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
  address: {
    road?: string
    house_number?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
  }
}

interface PhotoItem {
  file: File
  preview: string
  label: string
}

export default function CreateRoommateListing() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [intent, setIntent] = useState<'have-room' | 'need-room'>('have-room')
  const [roomType, setRoomType] = useState('private')
  const [furnished, setFurnished] = useState('')
  const [bills, setBills] = useState<Record<BillKey, boolean>>({
    'Wi-Fi': false, Electricity: false, Heating: false, Water: false, Gas: false,
  })
  const [location, setLocation] = useState('')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [rentMin, setRentMin] = useState('')
  const [rentMax, setRentMax] = useState('')
  const [availableDate, setAvailableDate] = useState('')
  const [minStay, setMinStay] = useState('')
  const [genderPref, setGenderPref] = useState('Anyone')
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setSuggestions([]); return }
    setSearchLoading(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=5`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data: NominatimResult[] = await res.json()
      setSuggestions(data)
      setShowSuggestions(true)
    } catch { setSuggestions([]) }
    finally { setSearchLoading(false) }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(location), 400)
    return () => clearTimeout(timer)
  }, [location, fetchSuggestions])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function selectSuggestion(item: NominatimResult) {
    const a = item.address
    const city = a.city || a.town || a.village || a.municipality || ''
    setLocation(city ? `${city}, ${item.display_name.split(',').slice(-1)[0].trim()}` : item.display_name.split(',').slice(0, 2).join(',').trim())
    setShowSuggestions(false)
    setSuggestions([])
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const newPhotos: PhotoItem[] = files.map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      label: PHOTO_ROOM_LABELS[photos.length + i] ?? 'Other',
    }))
    setPhotos(prev => [...prev, ...newPhotos])
    e.target.value = ''
  }

  function removePhoto(idx: number) {
    setPhotos(prev => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }

  function toggleBill(key: BillKey) {
    setBills(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const photoCount = photos.length
  const photoProgress = Math.min(100, Math.round((photoCount / 6) * 100))
  const previewTitle = roomType === 'entire' ? 'Entire Apartment Available' : roomType === 'shared' ? 'Room in Shared Flat' : 'Room in Shared Apartment'
  const previewLocation = location || 'De Pijp, Amsterdam'

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
                <span>Roommates</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">List your place and connect with students across Europe.</p>
            </div>
            <div className="cl-steps">
              <div className="cl-step is-active">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Basic Info</span>
                  <span className="cl-step__sub">What are you renting?</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21a8 8 0 0 0-5-7.39" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Preferences</span>
                  <span className="cl-step__sub">Make your listing stand out</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
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
              <div className="crl-form-body">

                {/* ── 1. Intent ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                    </svg>
                    I want to… *
                  </h3>
                  <div className="crl-intent-grid">
                    <button type="button" className={`crl-intent-card${intent === 'have-room' ? ' is-active' : ''}`} onClick={() => setIntent('have-room')}>
                      <div className="crl-intent-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="36" height="36">
                          <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" />
                          <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                      </div>
                      <div className="crl-intent-card__body">
                        <span className="crl-intent-card__title">I Have a Room</span>
                        <span className="crl-intent-card__desc">I have a room and looking for a roommate.</span>
                      </div>
                      {intent === 'have-room' && <span className="crl-intent-card__check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg></span>}
                    </button>
                    <button type="button" className={`crl-intent-card${intent === 'need-room' ? ' is-active' : ''}`} onClick={() => setIntent('need-room')}>
                      <div className="crl-intent-card__icon crl-intent-card__icon--alt">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="36" height="36">
                          <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                        </svg>
                      </div>
                      <div className="crl-intent-card__body">
                        <span className="crl-intent-card__title">I Need a Roommate</span>
                        <span className="crl-intent-card__desc">I'm looking for someone to rent a place with.</span>
                      </div>
                      {intent === 'need-room' && <span className="crl-intent-card__check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg></span>}
                    </button>
                  </div>
                </div>

                {/* ── 2. Room / Flat Type ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
                    </svg>
                    Room / Flat Type *
                  </h3>
                  <div className="crl-room-type-grid">
                    {ROOM_TYPES.map(rt => (
                      <button key={rt.id} type="button" className={`crl-room-type-btn${roomType === rt.id ? ' is-active' : ''}`} onClick={() => setRoomType(rt.id)}>
                        <span className="crl-room-type-btn__icon">{rt.icon}</span>
                        <span className="crl-room-type-btn__label">{rt.label}</span>
                        {roomType === rt.id && <span className="crl-room-type-btn__check"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="11" height="11"><polyline points="20 6 9 17 4 12" /></svg></span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── 3. Location & Pricing ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    Location &amp; Pricing
                  </h3>

                  <label className="cl-label">Location *</label>
                  <div className="cl-location-search" ref={searchRef} style={{ marginTop: 6 }}>
                    <div className="cl-iicon-wrap">
                      {searchLoading
                        ? <svg className="cl-iicon cl-iicon--spin" viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                        : <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      }
                      <input
                        className="cl-input cl-input--pl"
                        type="text"
                        placeholder="e.g. City center, near university..."
                        value={location}
                        onChange={e => { setLocation(e.target.value); setShowSuggestions(true) }}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        autoComplete="off"
                      />
                      {location && (
                        <button className="cl-input-clear" type="button" onClick={() => { setLocation(''); setSuggestions([]); setShowSuggestions(false) }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="cl-suggestions">
                        {suggestions.map((s, i) => (
                          <li key={i} className="cl-suggestion-item" onMouseDown={() => selectSuggestion(s)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="13" height="13" style={{ flexShrink: 0, marginTop: 2 }}>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{s.display_name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="crl-location-rent-row" style={{ marginTop: 18 }}>
                    <div className="crl-field-group">
                      <label className="cl-label">Monthly Rent (€) *</label>
                      <div className="crl-rent-range">
                        <div className="cl-euro-wrap" style={{ flex: 1 }}>
                          <span className="cl-euro-sym">€</span>
                          <input className="cl-input cl-input--euro" type="number" min="0" placeholder="Min" value={rentMin} onChange={e => setRentMin(e.target.value)} />
                        </div>
                        <span className="crl-rent-range__dash">–</span>
                        <div className="cl-euro-wrap" style={{ flex: 1 }}>
                          <span className="cl-euro-sym">€</span>
                          <input className="cl-input cl-input--euro" type="number" min="0" placeholder="Max" value={rentMax} onChange={e => setRentMax(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className="crl-field-group" style={{ flex: 1 }}>
                      <label className="cl-label">Furnishing *</label>
                      <div className="crl-gender-btns">
                        {FURNISHING_OPTIONS.map(opt => (
                          <button key={opt} type="button" className={`crl-gender-btn${furnished === opt ? ' is-active' : ''}`} onClick={() => setFurnished(furnished === opt ? '' : opt)}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <label className="cl-label" style={{ marginBottom: 8, display: 'block' }}>Bills Included in Rent</label>
                    <div className="crl-bills-grid">
                      {BILL_ITEMS.map(item => (
                        <label key={item} className="cl-checkbox">
                          <input type="checkbox" checked={bills[item]} onChange={() => toggleBill(item)} />
                          <span className="cl-checkbox__box" />
                          <span className="cl-checkbox__label">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── 4. Availability & Preferences ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Availability &amp; Preferences
                  </h3>

                  <div className="crl-location-rent-row">
                    <div className="crl-field-group" style={{ flex: 1 }}>
                      <label className="cl-label">Available From *</label>
                      <div className="cl-iicon-wrap">
                        <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <input className="cl-input cl-input--pl" type="date" value={availableDate} onChange={e => setAvailableDate(e.target.value)} />
                      </div>
                    </div>
                    <div className="crl-field-group" style={{ flex: 1 }}>
                      <label className="cl-label">Minimum Stay</label>
                      <div className="crl-gender-btns" style={{ flexWrap: 'wrap' }}>
                        {MIN_STAY_OPTIONS.map(opt => (
                          <button key={opt} type="button" className={`crl-gender-btn${minStay === opt ? ' is-active' : ''}`} onClick={() => setMinStay(minStay === opt ? '' : opt)}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <label className="cl-label" style={{ marginBottom: 8, display: 'block' }}>Roommate Gender Preference</label>
                    <div className="crl-gender-btns">
                      {GENDER_OPTIONS.map(opt => (
                        <button key={opt} type="button" className={`crl-gender-btn${genderPref === opt ? ' is-active' : ''}`} onClick={() => setGenderPref(genderPref === opt ? '' : opt)}>
                          {opt}
                          {genderPref === opt && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" style={{ marginLeft: 4 }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── 5. Listing Title ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Listing Title *
                  </h3>
                  <p className="cl-card__sub">Give your listing a clear headline that students will see first.</p>
                  <input
                    className="cl-input"
                    type="text"
                    placeholder="e.g. Bright private room near UvA, bills included"
                    maxLength={80}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <div className="cl-char-count">{title.length}/80</div>
                </div>

                {/* ── 6. Photos ── */}
                <div className="crl-form-section">
                  <h3 className="cl-card__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                    Add Photos *
                  </h3>
                  <p className="cl-card__sub">Show students what your space looks like.</p>

                  {photoCount > 0 && (
                    <div className="crl-quality-badge">
                      <div className="crl-quality-badge__left">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        <span className="crl-quality-badge__title">Photo Quality</span>
                      </div>
                      <div className="crl-quality-badge__stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} viewBox="0 0 24 24" fill={i < Math.round((photoCount / 6) * 5) ? '#f4b942' : 'none'} stroke="#f4b942" strokeWidth="2" width="16" height="16">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="crl-quality-badge__count">{photoCount} / 6 Photos Added</span>
                      <div className="crl-quality-badge__bar">
                        <div className="crl-quality-badge__fill" style={{ width: `${photoProgress}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="crl-photo-grid">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="crl-photo-item">
                        <div className="crl-photo-item__img-wrap">
                          <img src={photo.preview} alt={photo.label} className="crl-photo-item__img" />
                          <button type="button" className="crl-photo-item__remove" onClick={() => removePhoto(idx)} aria-label="Remove photo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11"><path d="M18 6 6 18M6 6l12 12" /></svg>
                          </button>
                        </div>
                        <span className="crl-photo-item__label">{photo.label}</span>
                      </div>
                    ))}
                    {photos.length < 6 && (
                      <button type="button" className="crl-photo-add" onClick={() => fileRef.current?.click()}>
                        <div className="crl-photo-add__icon-wrap">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="28" height="28">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                        <span className="crl-photo-add__text">Add Photo</span>
                        <span className="crl-photo-add__sub">Recommended</span>
                      </button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileChange} />
                </div>

              </div>
            </div>

            {/* Right Column */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>
              <div className="cl-card crl-preview-card">
                <h3 className="cl-card__title" style={{ marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  Listing Preview
                </h3>
                <div className="crl-preview">
                  <div className="crl-preview__img-wrap">
                    {photos.length > 0
                      ? <img src={photos[0].preview} alt="Preview" className="crl-preview__img" />
                      : <div className="crl-preview__img-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.5" width="40" height="40"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg><span>Your photo will appear here</span></div>
                    }
                    <button type="button" className="crl-preview__heart" aria-label="Save">
                      <svg viewBox="0 0 24 24" fill="#e05252" stroke="#e05252" strokeWidth="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  </div>
                  <div className="crl-preview__body">
                    <div className="crl-preview__title">{title || previewTitle}</div>
                    <div className="crl-preview__price">{rentMin ? `€${rentMin}` : '€650'}<span>/month</span></div>
                    <div className="crl-preview__location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {previewLocation}
                    </div>
                    <div className="crl-preview__tags">
                      {furnished && <span className="crl-preview__tag">{furnished.replace(' Furnished', '')}</span>}
                      {bills['Wi-Fi'] && <span className="crl-preview__tag">Wi-Fi</span>}
                      {bills['Electricity'] && <span className="crl-preview__tag">Bills incl.</span>}
                      {!furnished && !bills['Wi-Fi'] && <span className="crl-preview__tag">Furnished</span>}
                      {!bills['Wi-Fi'] && !bills['Electricity'] && <span className="crl-preview__tag">Wi-Fi</span>}
                    </div>
                    <div className="crl-preview__avail">
                      Available from {availableDate ? new Date(availableDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : '15 June'}
                    </div>
                    <div className="crl-preview__host">
                      <div className="crl-preview__avatar">A</div>
                      <div className="crl-preview__host-info">
                        <span className="crl-preview__host-name">Anna</span>
                        <span className="crl-preview__host-badge">Verified host</span>
                      </div>
                      <button type="button" className="crl-preview__details-link">View details <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cl-card crl-tip-card">
                <div className="crl-tip">
                  <div className="crl-tip__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f4b942" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span className="crl-tip__sparkles">✨</span>
                  </div>
                  <p className="crl-tip__text">Tip</p>
                  <p className="crl-tip__desc">Add clear details to get better matches faster!</p>
                </div>
              </div>

              <div className="cl-card cl-card--draft">
                <div className="cl-draft">
                  <div>
                    <h4 className="cl-draft__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="16" height="16"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                      Save as Draft
                    </h4>
                    <p className="cl-draft__sub">You can save and continue later.</p>
                  </div>
                  <button type="button" className="cl-draft__btn">Save Draft</button>
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
              <button type="button" className="cl-next-btn" onClick={() => navigate('/profile/post/roommates/preferences')}>
                Next: Preferences
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
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
