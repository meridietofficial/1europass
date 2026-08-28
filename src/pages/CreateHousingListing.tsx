import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PROPERTY_TYPES = [
  {
    id: 'apartment',
    label: 'Apartment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20M8 9v12M16 9v12" />
      </svg>
    ),
  },
  {
    id: 'house',
    label: 'House',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'studio',
    label: 'Studio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
        <path d="M7 17h10" />
      </svg>
    ),
  },
  {
    id: 'villa',
    label: 'Villa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M3 12l9-8 9 8v9H3z" />
        <path d="M3 12h18M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'room',
    label: 'Room',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 21V3M3 12h5" />
        <circle cx="6.5" cy="12" r="1" />
      </svg>
    ),
  },
  {
    id: 'student-residence',
    label: 'Student Residence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M12 3L2 8l10 5 10-5-10-5z" />
        <path d="M6 13v6M18 13v6M4 19h16" />
      </svg>
    ),
  },
]

const BEDROOM_OPTIONS = [
  { value: 'Studio', label: 'Studio', sub: 'Open plan' },
  { value: '1 Bed', label: '1 Bed', sub: '1 bedroom' },
  { value: '2 Bed', label: '2 Bed', sub: '2 bedrooms' },
  { value: '3 Bed', label: '3 Bed', sub: '3 bedrooms' },
  { value: '4 Bed', label: '4 Bed', sub: '4 bedrooms' },
] as const
const LAUNDRY_OPTIONS = ['In-unit', 'Shared', 'None'] as const
const FLOOR_OPTIONS = ['Ground', '1st', '2nd', '3rd', '4th', '5th+'] as const
const INCLUDED_ITEMS = ['electricity', 'water', 'heating', 'internet', 'gas', 'other'] as const
type IncludedKey = (typeof INCLUDED_ITEMS)[number]

const NEARBY_AMENITIES = [
  { id: 'supermarket', emoji: '🛒', label: 'Supermarket' },
  { id: 'metro', emoji: '🚇', label: 'Metro' },
  { id: 'bus_stop', emoji: '🚌', label: 'Bus stop' },
  { id: 'train_station', emoji: '🚆', label: 'Train station' },
  { id: 'university', emoji: '🏫', label: 'University' },
  { id: 'hospital', emoji: '🏥', label: 'Hospital' },
  { id: 'gym', emoji: '🏋️', label: 'Gym' },
  { id: 'cafe', emoji: '☕', label: 'Cafes' },
  { id: 'restaurant', emoji: '🍽️', label: 'Restaurants' },
] as const


const OWNER_DECLARATIONS = [
  'I confirm that I have the legal right to rent this property.',
  'The information provided is accurate.',
  'The photos represent the current condition of the property.',
  'I agree to the 1 Euro Pass housing terms.',
] as const

const VIEWING_OPTIONS = ['In-person', 'Virtual', 'Both'] as const

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
  address: {
    road?: string
    house_number?: string
    postcode?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    state?: string
    country?: string
  }
}

export default function CreateHousingListing() {
  const navigate = useNavigate()
  const [propType, setPropType] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [rent, setRent] = useState('')
  const [deposit, setDeposit] = useState('')
  const [utilitiesIncluded, setUtilitiesIncluded] = useState<boolean | null>(null)
  const [included, setIncluded] = useState<Record<IncludedKey, boolean>>({
    electricity: false, water: false, heating: false, internet: false, gas: false, other: false,
  })
  const [otherSpec, setOtherSpec] = useState('')
  const [availableNow, setAvailableNow] = useState(true)
  const [availableDate, setAvailableDate] = useState('')
  const [phoneCode, setPhoneCode] = useState('+31')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [furnished, setFurnished] = useState('')
  const [parking, setParking] = useState<boolean | null>(null)
  const [pets, setPets] = useState<boolean | null>(null)
  const [smoking, setSmoking] = useState<boolean | null>(null)
  const [gender, setGender] = useState('')
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [customBedrooms, setCustomBedrooms] = useState('')
  const [size, setSize] = useState('')
  const [floor, setFloor] = useState('')
  const [elevator, setElevator] = useState<boolean | null>(null)
  const [balcony, setBalcony] = useState<boolean | null>(null)
  const [laundry, setLaundry] = useState('')
  const [currentTenants, setCurrentTenants] = useState('')
  const [nearbyUnivName, setNearbyUnivName] = useState('')
  const [nearbyPlaces, setNearbyPlaces] = useState<Record<string, boolean>>(
    () => Object.fromEntries(NEARBY_AMENITIES.map(a => [a.id, false]))
  )
  const [ownerDecl, setOwnerDecl] = useState<Record<string, boolean>>(
    () => Object.fromEntries(OWNER_DECLARATIONS.map(k => [k, false]))
  )
  const [postalCode, setPostalCode] = useState('')
  const [viewingOption, setViewingOption] = useState('')
  const [autoTranslate, setAutoTranslate] = useState(true)
  const [useProfilePhone, setUseProfilePhone] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)

  // Location search state
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [streetAddress, setStreetAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [stateRegion, setStateRegion] = useState('')
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
    const timer = setTimeout(() => fetchSuggestions(searchQuery), 400)
    return () => clearTimeout(timer)
  }, [searchQuery, fetchSuggestions])

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
    const road = [a.road, a.house_number].filter(Boolean).join(' ')
    setStreetAddress(road || item.display_name.split(',')[0])
    setCity(a.city || a.town || a.village || a.municipality || '')
    setPostalCode(a.postcode || '')
    setStateRegion(a.state || '')
    setCountry(a.country || '')
    setLat(parseFloat(item.lat))
    setLng(parseFloat(item.lon))
    setSearchQuery(item.display_name.split(',').slice(0, 2).join(','))
    setShowSuggestions(false)
    setSuggestions([])
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    setPhotos((prev) => [...prev, ...files])
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setPhotos((prev) => [...prev, ...files])
    e.target.value = ''
  }

  const photoProgress = Math.min(100, Math.round((photos.length / 6) * 100))

  function toggleIncluded(key: IncludedKey) {
    setIncluded((prev) => ({ ...prev, [key]: !prev[key] }))
  }
  function toggleNearbyPlace(id: string) { setNearbyPlaces(prev => ({ ...prev, [id]: !prev[id] })) }
function toggleOwnerDecl(k: string) { setOwnerDecl(prev => ({ ...prev, [k]: !prev[k] })) }

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

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
                <span>Housing</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">List your place and connect with students across Europe.</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step is-active">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-basic-info.svg" width="36" height="36" alt="Basic Info" />
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
                  <img src="/step-photos.svg" width="36" height="36" alt="Photos" />
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
                  <img src="/step-review.svg" width="36" height="36" alt="Review & Publish" />
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

              {/* Listing Title — no card box */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Listing Title *
                </h3>
                <p className="cl-card__sub">Give your listing a clear, descriptive title.</p>
                <input
                  className="cl-input"
                  type="text"
                  placeholder="e.g. Bright private room near university, bills included"
                  maxLength={80}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="cl-char-count">{title.length}/80</div>
              </div>

              {/* Property Type — no card box */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M8 9v12M16 9v12" />
                  </svg>
                  Property Type *
                </h3>
                <p className="cl-card__sub">What type of property are you listing?</p>
                <div className="prop-type-grid">
                  {PROPERTY_TYPES.map((pt) => (
                    <button
                      key={pt.id}
                      type="button"
                      className={`prop-type-btn${propType === pt.id ? ' is-active' : ''}`}
                      onClick={() => setPropType(pt.id)}
                    >
                      <span className="prop-type-btn__icon">{pt.icon}</span>
                      <span className="prop-type-btn__label">{pt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms & Bathroom — no card box */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
                  </svg>
                  Property Configuration *
                </h3>
                <p className="cl-card__sub">Select the size that best describes your property.</p>
                <div className="prop-config-grid">
                  {BEDROOM_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`prop-config-btn${bedrooms === opt.value ? ' is-active' : ''}`}
                      onClick={() => { setBedrooms(bedrooms === opt.value ? '' : opt.value); setCustomBedrooms('') }}
                    >
                      <span className="prop-config-btn__label">{opt.label}</span>
                      <span className="prop-config-btn__sub">{opt.sub}</span>
                    </button>
                  ))}
                  <label className={`prop-config-btn prop-config-btn--input${customBedrooms ? ' is-active' : ''}`}>
                    <span className="prop-config-input-wrap">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11" className="prop-config-edit-icon">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      <input
                        className="prop-config-input"
                        type="number"
                        min="1"
                        placeholder="0"
                        value={customBedrooms}
                        onChange={e => { setCustomBedrooms(e.target.value); setBedrooms(e.target.value ? `${e.target.value} Bed` : '') }}
                      />
                    </span>
                    <span className="prop-config-btn__sub">Custom</span>
                  </label>
                </div>
              </div>

              {/* Location & Address */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  Location &amp; Address *
                </h3>
                <p className="cl-card__sub">Search for your property address — the map and details will fill in automatically.</p>

                {/* Search with autocomplete */}
                <div className="cl-location-search" ref={searchRef}>
                  <div className="cl-iicon-wrap">
                    {searchLoading ? (
                      <svg className="cl-iicon cl-iicon--spin" viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    ) : (
                      <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      </svg>
                    )}
                    <input
                      className="cl-input cl-input--pl"
                      type="text"
                      placeholder="Search for your address, city or area..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true) }}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      autoComplete="off"
                    />
                    {searchQuery && (
                      <button className="cl-input-clear" type="button" onClick={() => {
                        setSearchQuery(''); setSuggestions([]); setShowSuggestions(false)
                        setLat(null); setLng(null); setStreetAddress(''); setCity(''); setPostalCode(''); setStateRegion(''); setCountry('')
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
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

                {/* Map */}
                <div className="cl-map" style={{ height: 220, marginTop: 14 }}>
                  <iframe
                    className="cl-map-frame"
                    title="Property location"
                    src={
                      lat !== null && lng !== null
                        ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008},${lat - 0.008},${lng + 0.008},${lat + 0.008}&layer=mapnik&marker=${lat},${lng}`
                        : `https://www.openstreetmap.org/export/embed.html?bbox=77.494,28.4644,77.514,28.4844&layer=mapnik&marker=28.4744,77.504`
                    }
                    allowFullScreen
                  />
                </div>

                {/* Address details card */}
                <div className={`cl-address-card${lat !== null ? ' is-filled' : ''}`}>
                  <div className="cl-address-card__header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="15" height="15">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>Property Address Details</span>
                  </div>

                  <div className="cl-address-grid">
                    <div className="cl-address-field">
                      <label className="cl-label">Street Address</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="Street name and number"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">Floor / Apt</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. 2nd floor, Apt 4"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">Postal Code</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. 1011 AB"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">City</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">State / Region</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. North Holland"
                        value={stateRegion}
                        onChange={(e) => setStateRegion(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">Country</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="cl-coords-row">
                    <div className="cl-coord">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="13" height="13">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span className="cl-coord__label">Latitude</span>
                      <span className="cl-coord__value">{lat !== null ? lat.toFixed(6) : '—'}</span>
                    </div>
                    <div className="cl-coord">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="13" height="13">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="2" x2="12" y2="22" /><path d="M2 12a15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1-10 4 15.3 15.3 0 0 1-10-4z" />
                      </svg>
                      <span className="cl-coord__label">Longitude</span>
                      <span className="cl-coord__value">{lng !== null ? lng.toFixed(6) : '—'}</span>
                    </div>
                    {lat !== null && (
                      <div className="cl-coord cl-coord--pin">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="13" height="13">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Location confirmed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing — no card box */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Pricing *
                </h3>
                <div className="cl-pricing-row">
                  <div className="cl-pricing-field">
                    <label className="cl-label">Rent (per month) *</label>
                    <div className="cl-euro-wrap">
                      <span className="cl-euro-sym">€</span>
                      <input className="cl-input cl-input--euro" type="number" min="0" placeholder="600" value={rent} onChange={(e) => setRent(e.target.value)} />
                    </div>
                  </div>
                  <div className="cl-pricing-field">
                    <label className="cl-label">Deposit *</label>
                    <div className="cl-euro-wrap">
                      <span className="cl-euro-sym">€</span>
                      <input className="cl-input cl-input--euro" type="number" min="0" placeholder="690" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                    </div>
                  </div>
                  <div className="cl-pricing-field">
                    <label className="cl-label">Size (m²)</label>
                    <div className="cl-euro-wrap">
                      <span className="cl-euro-sym" style={{ fontSize: 10, width: 28 }}>m²</span>
                      <input className="cl-input cl-input--euro" type="number" min="0" placeholder="30" value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>
                  </div>
                  <div className="cl-pricing-field">
                    <label className="cl-label">Utilities included?</label>
                    <div className="cl-yn-row">
                      <button type="button" className={`cl-yn-btn cl-yn-btn--lg${utilitiesIncluded === true ? ' is-active' : ''}`} onClick={() => setUtilitiesIncluded(utilitiesIncluded === true ? null : true)}>Yes</button>
                      <button type="button" className={`cl-yn-btn cl-yn-btn--lg${utilitiesIncluded === false ? ' is-active' : ''}`} onClick={() => setUtilitiesIncluded(utilitiesIncluded === false ? null : false)}>No</button>
                    </div>
                  </div>
                </div>
                <div className="cl-included-box">
                  <p className="cl-included-box__title">What's included in the rent?</p>
                  <div className="cl-included-grid">
                    {INCLUDED_ITEMS.map((item) => (
                      <label key={item} className="cl-checkbox">
                        <input type="checkbox" checked={included[item]} onChange={() => toggleIncluded(item)} />
                        <span className="cl-checkbox__box" />
                        <span className="cl-checkbox__label">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                      </label>
                    ))}
                    {included.other && (
                      <input
                        className="cl-input cl-input--sm"
                        style={{ gridColumn: 'span 2' }}
                        type="text"
                        placeholder="Please specify..."
                        value={otherSpec}
                        onChange={(e) => setOtherSpec(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Available From + Phone */}
              {/* Description */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Description *
                </h3>
                <p className="cl-card__sub">Describe your property in detail.</p>
                <textarea
                  className="cl-textarea"
                  rows={5}
                  placeholder="Describe your property. Mention nearby metro, supermarkets, university, furniture, house rules and anything students should know."
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                />
                <div className="cl-char-count">{description.length}/500</div>
              </div>

            </div>

            {/* ─── Right Column ─── */}
            <div className="cl-right">

              {/* Available From */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Available From *
                </h3>
                <div className="cl-radio-stack" style={{ flexDirection: 'row', gap: 48 }}>
                  <label className="cl-radio">
                    <input type="radio" name="avail" checked={availableNow} onChange={() => setAvailableNow(true)} />
                    <span className="cl-radio__dot" />
                    <span>Available immediately</span>
                  </label>
                  <label className="cl-radio">
                    <input type="radio" name="avail" checked={!availableNow} onChange={() => setAvailableNow(false)} />
                    <span className="cl-radio__dot" />
                    <span>Choose Date</span>
                  </label>
                </div>
                {!availableNow && (
                  <div className="cl-iicon-wrap" style={{ marginTop: 8 }}>
                    <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input className="cl-input cl-input--pl" type="date" value={availableDate} onChange={(e) => setAvailableDate(e.target.value)} />
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Phone Number *
                </h3>
                <p className="cl-card__sub">Only shared after mutual consent</p>
                <div className="cl-radio-stack" style={{ flexDirection: 'row', gap: 88, marginBottom: 12 }}>
                  <label className="cl-radio">
                    <input type="radio" name="phoneSource" checked={useProfilePhone} onChange={() => setUseProfilePhone(true)} />
                    <span className="cl-radio__dot" />
                    <span>Same as profile</span>
                  </label>
                  <label className="cl-radio">
                    <input type="radio" name="phoneSource" checked={!useProfilePhone} onChange={() => setUseProfilePhone(false)} />
                    <span className="cl-radio__dot" />
                    <span>Different number</span>
                  </label>
                </div>
                {!useProfilePhone && (
                  <div className="cl-phone-row">
                    <input className="cl-input cl-input--code" type="text" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} />
                    <input className="cl-input" style={{ flex: 1 }} type="tel" placeholder="6 12345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                )}
                <div className="cl-phone-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="28" height="28" style={{ flexShrink: 0 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <p>Your phone number is never shown publicly. Students will contact you through in-app chat first. You decide when to share your number.</p>
                </div>
              </div>

              {/* Optional Details */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Optional Details
                </h3>
                <p className="cl-card__sub">These details help students find your listing easily.</p>

                <div className="cl-opt-list">

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M4 11h16" />
                      </svg>
                      Furnishing
                    </div>
                    <div className="cl-toggle-grp">
                      {['Fully furnished', 'Partially furnished', 'Unfurnished'].map((v) => (
                        <button key={v} type="button" className={`cl-tog${furnished === v ? ' is-on' : ''}`} onClick={() => setFurnished(furnished === v ? '' : v)}>{v}</button>
                      ))}
                    </div>
                  </div>

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                      </svg>
                      Parking
                    </div>
                    <div className="cl-yn-row">
                      <button type="button" className={`cl-yn-btn${parking === true ? ' is-active' : ''}`} onClick={() => setParking(parking === true ? null : true)}>Yes</button>
                      <button type="button" className={`cl-yn-btn${parking === false ? ' is-active' : ''}`} onClick={() => setParking(parking === false ? null : false)}>No</button>
                    </div>
                  </div>

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87" />
                      </svg>
                      Pets Allowed
                    </div>
                    <div className="cl-yn-row">
                      <button type="button" className={`cl-yn-btn${pets === true ? ' is-active' : ''}`} onClick={() => setPets(pets === true ? null : true)}>Yes</button>
                      <button type="button" className={`cl-yn-btn${pets === false ? ' is-active' : ''}`} onClick={() => setPets(pets === false ? null : false)}>No</button>
                    </div>
                  </div>

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <path d="M18 12H2v4h16v-4zM22 12h-3v4h3v-4z" /><path d="M7 12V8a5 5 0 0 1 10 0" />
                      </svg>
                      Smoking Allowed
                    </div>
                    <div className="cl-yn-row">
                      <button type="button" className={`cl-yn-btn${smoking === true ? ' is-active' : ''}`} onClick={() => setSmoking(smoking === true ? null : true)}>Yes</button>
                      <button type="button" className={`cl-yn-btn${smoking === false ? ' is-active' : ''}`} onClick={() => setSmoking(smoking === false ? null : false)}>No</button>
                    </div>
                  </div>

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                      Gender Preference
                    </div>
                    <div className="cl-toggle-grp">
                      {['Any', 'Male Only', 'Female Only'].map((v) => (
                        <button key={v} type="button" className={`cl-tog${gender === v ? ' is-on' : ''}`} onClick={() => setGender(gender === v ? '' : v)}>{v}</button>
                      ))}
                    </div>
                  </div>

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="15" x2="15" y2="15" /><circle cx="12" cy="12" r="1" />
                      </svg>
                      Elevator
                    </div>
                    <div className="cl-yn-row">
                      <button type="button" className={`cl-yn-btn${elevator === true ? ' is-active' : ''}`} onClick={() => setElevator(elevator === true ? null : true)}>Yes</button>
                      <button type="button" className={`cl-yn-btn${elevator === false ? ' is-active' : ''}`} onClick={() => setElevator(elevator === false ? null : false)}>No</button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Nearby Places */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  Nearby Places
                </h3>
                <div className="cl-nearby-univ">
                  <h4 className="cl-furn-section__title">Nearby University / College</h4>
                  <input
                    className="cl-input"
                    type="text"
                    placeholder="University name (optional)"
                    value={nearbyUnivName}
                    onChange={(e) => setNearbyUnivName(e.target.value)}
                  />
                </div>
                <h4 className="cl-furn-section__title" style={{ marginTop: 16 }}>Nearby</h4>
                <div className="cl-nearby-grid">
                  {NEARBY_AMENITIES.map(a => (
                    <label key={a.id} className="cl-checkbox">
                      <input type="checkbox" checked={nearbyPlaces[a.id]} onChange={() => toggleNearbyPlace(a.id)} />
                      <span className="cl-checkbox__box" />
                      <span className="cl-checkbox__label">{a.emoji} {a.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Safety & Verification */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Safety &amp; Verification
                </h3>
                <p className="cl-card__sub">Owner declaration — required to publish</p>
                <div className="cl-decl-list">
                  {OWNER_DECLARATIONS.map(decl => (
                    <label key={decl} className="cl-checkbox cl-checkbox--decl">
                      <input type="checkbox" checked={ownerDecl[decl]} onChange={() => toggleOwnerDecl(decl)} />
                      <span className="cl-checkbox__box" />
                      <span className="cl-checkbox__label">{decl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Save as Draft */}
              <div className="cl-card cl-card--draft">
                <div className="cl-draft">
                  <div>
                    <h4 className="cl-draft__title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="16" height="16">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                      </svg>
                      Save as Draft
                    </h4>
                    <p className="cl-draft__sub">You can save and continue later.</p>
                  </div>
                  <button type="button" className="cl-draft__btn">Save Draft</button>
                </div>
              </div>

              {/* Auto Translate — commented out for now */}
              {/* <div className="cl-card cl-card--translate">
                <div className="cl-translate">
                  <div className="cl-translate__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="cl-translate__body">
                    <h4 className="cl-translate__title">Auto Translate</h4>
                    <p className="cl-translate__sub">Your listing will be automatically translated to 15+ languages to reach more students.</p>
                  </div>
                  <label className="cl-switch">
                    <input type="checkbox" checked={autoTranslate} onChange={(e) => setAutoTranslate(e.target.checked)} />
                    <span className="cl-switch__track" />
                  </label>
                </div>
              </div> */}

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
              <button type="button" className="cl-next-btn" onClick={() => navigate('/profile/post/housing/photos')}>
                Next: Add Photos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <p className="cl-footer-bar__note">Or skip — payment of €1 to publish</p>
            </div>
          </div>

        </div>{/* end content-card */}

      </main>
      <Footer />
    </>
  )
}
