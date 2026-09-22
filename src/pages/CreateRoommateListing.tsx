import { useState, useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { createRoommateListing, fetchRoommateListing, updateRoommateListing } from '../api/roommate'
import { useToast } from '../context/ToastContext'

const ROOM_TYPES = [
  {
    id: 'private',
    label: 'Private Room',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" /><path d="M9 12V9" />
      </svg>
    ),
  },
  {
    id: 'shared',
    label: 'Shared Room',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
        <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
        <circle cx="8" cy="6.5" r="1" /><circle cx="16" cy="6.5" r="1" />
      </svg>
    ),
  },
]

const BILL_ITEMS = ['electricity', 'water', 'heating', 'internet', 'gas', 'other'] as const
type BillKey = (typeof BILL_ITEMS)[number]

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
  'The information provided is accurate.',
  'The photos represent the current condition of the property.',
  'I agree to the 1 Euro Pass housing terms.',
] as const
type DeclKey = (typeof OWNER_DECLARATIONS)[number]

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
  address: {
    road?: string
    house_number?: string
    quarter?: string
    suburb?: string
    borough?: string
    postcode?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    county?: string
    state?: string
    region?: string
    province?: string
    country?: string
  }
}

export default function CreateRoommateListing() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { id: editId } = useParams<{ id: string }>()
  const isEdit = Boolean(editId)

  const [loadingDraft, setLoadingDraft] = useState(isEdit)
  const [title, setTitle] = useState('')
  const [intent, setIntent] = useState<'have-room' | 'need-room'>('have-room')
  const [roomType, setRoomType] = useState('private')
  const [furnished, setFurnished] = useState('')
  const [bills, setBills] = useState<Record<BillKey, boolean>>({
    electricity: false, water: false, heating: false, internet: false, gas: false, other: false,
  })
  const [billOtherSpec, setBillOtherSpec] = useState('')
  const [rent, setRent] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [size, setSize] = useState('')
  const [utilitiesIncluded, setUtilitiesIncluded] = useState<boolean | null>(null)
  const [availableNow, setAvailableNow] = useState(true)
  const [availableDate, setAvailableDate] = useState('')
  const [genderPref, setGenderPref] = useState('Anyone')
  const [description, setDescription] = useState('')
  const [pets, setPets] = useState<boolean | null>(null)
  const [smoking, setSmoking] = useState<boolean | null>(null)
  const [ageMin, setAgeMin] = useState('')
  const [ageMax, setAgeMax] = useState('')
  const [housemates, setHousemates] = useState('')
  const [useProfilePhone, setUseProfilePhone] = useState(true)
  const [phoneCode, setPhoneCode] = useState('+31')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [shaking, setShaking] = useState<Set<string>>(new Set())
  const [ownerDecl, setOwnerDecl] = useState<Record<DeclKey, boolean>>(
    Object.fromEntries(OWNER_DECLARATIONS.map(d => [d, false])) as Record<DeclKey, boolean>
  )
  function toggleOwnerDecl(decl: DeclKey) {
    setOwnerDecl(prev => ({ ...prev, [decl]: !prev[decl] }))
  }
  const [nearbyUnivName, setNearbyUnivName] = useState('')
  const [nearbyPlaces, setNearbyPlaces] = useState<Record<string, boolean>>(
    () => Object.fromEntries(NEARBY_AMENITIES.map(a => [a.id, false]))
  )
  function toggleNearbyPlace(id: string) { setNearbyPlaces(prev => ({ ...prev, [id]: !prev[id] })) }

  const titleRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const rentRef = useRef<HTMLInputElement>(null)
  const budgetMinRef = useRef<HTMLInputElement>(null)
  const budgetMaxRef = useRef<HTMLInputElement>(null)
  const sizeRef = useRef<HTMLInputElement>(null)
  const utilitiesRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  function triggerShake(fields: string[]) {
    setShaking(new Set())
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setShaking(new Set(fields))
      setTimeout(() => setShaking(new Set()), 2500)
    }))
  }
  const sh = (key: string) => shaking.has(key) ? ' is-shake' : ''

  // Location
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [streetAddress, setStreetAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [stateRegion, setStateRegion] = useState('')
  const [country, setCountry] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editId) return
    fetchRoommateListing(editId).then(d => {
      const str = (k: string) => (d[k] as string) ?? ''
      const num = (k: string) => d[k] != null ? String(d[k]) : ''
      const bool = (k: string): boolean | null => d[k] == null ? null : Boolean(d[k])
      setTitle(str('title'))
      setIntent((str('intent') as 'have-room' | 'need-room') || 'have-room')
      setRoomType(str('room_type') || 'private')
      setDescription(str('description'))
      setStreetAddress(str('street_address'))
      setApartment(str('apartment_floor'))
      setPostalCode(str('postal_code'))
      setCity(str('city'))
      setStateRegion(str('state_region'))
      setCountry(str('country'))
      setLat(d.latitude != null ? Number(d.latitude) : null)
      setLng(d.longitude != null ? Number(d.longitude) : null)
      const parts = [str('street_address'), str('postal_code'), str('city'), str('state_region'), str('country')].filter(Boolean)
      if (parts.length) setSearchQuery(parts.join(', '))
      setRent(num('rent'))
      setBudgetMin(num('budget_min'))
      setBudgetMax(num('budget_max'))
      setSize(num('size_sqm'))
      setUtilitiesIncluded(bool('utilities_included'))
      setBills({
        electricity: Boolean(d.included_electricity),
        water: Boolean(d.included_water),
        heating: Boolean(d.included_heating),
        internet: Boolean(d.included_internet),
        gas: Boolean(d.included_gas),
        other: Boolean(d.included_other),
      })
      setBillOtherSpec(str('included_other_spec'))
      setAvailableNow(d.available_now !== 0)
      setAvailableDate(str('available_date'))
      setUseProfilePhone(d.use_profile_phone !== 0)
      setPhoneCode(str('phone_code') || '+31')
      setPhone(str('phone_number'))
      setFurnished(str('furnished'))
      setPets(bool('pets_allowed'))
      setSmoking(bool('smoking_allowed'))
      setGenderPref(str('gender_preference') || 'Anyone')
      setHousemates(str('housemates'))
      setAgeMin(num('age_min'))
      setAgeMax(num('age_max'))
      setNearbyUnivName(str('nearby_university'))
      setNearbyPlaces({
        supermarket: Boolean(d.nearby_supermarket),
        metro: Boolean(d.nearby_metro),
        bus_stop: Boolean(d.nearby_bus_stop),
        train_station: Boolean(d.nearby_train_station),
        university: Boolean(d.nearby_university_flag),
        hospital: Boolean(d.nearby_hospital),
        gym: Boolean(d.nearby_gym),
        cafe: Boolean(d.nearby_cafe),
        restaurant: Boolean(d.nearby_restaurant),
      })
      setOwnerDecl({
        'The information provided is accurate.': Boolean(d.decl_info_accurate),
        'The photos represent the current condition of the property.': Boolean(d.decl_photos_current),
        'I agree to the 1 Euro Pass housing terms.': Boolean(d.decl_agreed_terms),
      })
    }).catch(() => showToast('Failed to load listing.', 'error'))
      .finally(() => setLoadingDraft(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId])

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
    const road = [a.house_number, a.road].filter(Boolean).join(' ')
    const resolvedCity = a.city || a.town || a.village || a.municipality || a.borough || a.suburb || ''
    const resolvedState = a.state || a.county || a.region || a.province || resolvedCity
    setStreetAddress(road || item.display_name.split(',')[0])
    setCity(resolvedCity)
    setPostalCode(a.postcode || '')
    setStateRegion(resolvedState)
    setCountry(a.country || '')
    setLat(parseFloat(item.lat))
    setLng(parseFloat(item.lon))
    setSearchQuery(item.display_name)
    setShowSuggestions(false)
    setSuggestions([])
  }

  function toggleBill(key: BillKey) {
    setBills(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function buildPayload() {
    return {
      title: title.trim(),
      intent,
      room_type: roomType as 'private' | 'shared',
      description: description || undefined,
      street_address: streetAddress || undefined,
      apartment_floor: apartment || undefined,
      postal_code: postalCode || undefined,
      city: city || undefined,
      state_region: stateRegion || undefined,
      country: country || undefined,
      latitude: lat,
      longitude: lng,
      rent: intent === 'have-room' ? (rent ? Number(rent) : null) : null,
      budget_min: intent === 'need-room' ? (budgetMin ? Number(budgetMin) : null) : null,
      budget_max: intent === 'need-room' ? (budgetMax ? Number(budgetMax) : null) : null,
      size_sqm: intent === 'have-room' ? (size ? Number(size) : null) : null,
      utilities_included: intent === 'have-room' ? utilitiesIncluded : null,
      included_electricity: bills.electricity,
      included_water: bills.water,
      included_heating: bills.heating,
      included_internet: bills.internet,
      included_gas: bills.gas,
      included_other: bills.other,
      included_other_spec: billOtherSpec || undefined,
      available_now: availableNow,
      available_date: !availableNow ? availableDate : undefined,
      use_profile_phone: useProfilePhone,
      phone_code: !useProfilePhone ? phoneCode : undefined,
      phone_number: !useProfilePhone ? phone : undefined,
      furnished: furnished || undefined,
      pets_allowed: pets,
      smoking_allowed: smoking,
      gender_preference: genderPref || undefined,
      housemates: intent === 'have-room' ? (housemates || undefined) : undefined,
      age_min: intent === 'have-room' ? (ageMin ? Number(ageMin) : null) : null,
      age_max: intent === 'have-room' ? (ageMax ? Number(ageMax) : null) : null,
      nearby_supermarket: intent === 'have-room' ? nearbyPlaces.supermarket : undefined,
      nearby_metro: intent === 'have-room' ? nearbyPlaces.metro : undefined,
      nearby_bus_stop: intent === 'have-room' ? nearbyPlaces.bus_stop : undefined,
      nearby_train_station: intent === 'have-room' ? nearbyPlaces.train_station : undefined,
      nearby_university_flag: intent === 'have-room' ? nearbyPlaces.university : undefined,
      nearby_hospital: intent === 'have-room' ? nearbyPlaces.hospital : undefined,
      nearby_gym: intent === 'have-room' ? nearbyPlaces.gym : undefined,
      nearby_cafe: intent === 'have-room' ? nearbyPlaces.cafe : undefined,
      nearby_restaurant: intent === 'have-room' ? nearbyPlaces.restaurant : undefined,
      nearby_university: intent === 'have-room' ? (nearbyUnivName || undefined) : undefined,
      decl_info_accurate: ownerDecl['The information provided is accurate.'],
      decl_photos_current: ownerDecl['The photos represent the current condition of the property.'],
      decl_agreed_terms: ownerDecl['I agree to the 1 Euro Pass housing terms.'],
    }
  }

  function validateDraft() {
    if (!title.trim()) {
      triggerShake(['title'])
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  function validate() {
    const empty: string[] = []
    if (!title.trim()) empty.push('title')
    if (!city.trim()) empty.push('location')
    if (intent === 'have-room') {
      if (!rent || Number(rent) <= 0) empty.push('rent')
      if (!size || Number(size) <= 0) empty.push('size')
      if (utilitiesIncluded === null) empty.push('utilities')
    } else {
      if (!budgetMax || Number(budgetMax) <= 0) empty.push('budgetMax')
      if (budgetMin && budgetMax && Number(budgetMin) >= Number(budgetMax)) empty.push('budgetMin')
    }
    if (!description.trim()) empty.push('description')
    if (!OWNER_DECLARATIONS.every(d => ownerDecl[d])) empty.push('declaration')
    if (empty.length > 0) {
      triggerShake(empty)
      const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
        title: titleRef, location: locationRef, rent: rentRef, budgetMin: budgetMinRef, budgetMax: budgetMaxRef, size: sizeRef, utilities: utilitiesRef, description: descriptionRef,
      }
      refMap[empty[0]]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  async function handleSaveDraft() {
    if (!validateDraft()) return
    setSubmitting(true)
    try {
      if (isEdit && editId) {
        await updateRoommateListing(editId, buildPayload())
        showToast('Listing updated successfully!', 'success')
      } else {
        const id = await createRoommateListing(buildPayload())
        sessionStorage.setItem('roommate_draft_id', id)
        showToast('Draft saved successfully!', 'success')
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Something went wrong. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleNext() {
    if (!validate()) return
    setSubmitting(true)
    try {
      if (isEdit && editId) {
        await updateRoommateListing(editId, buildPayload())
        navigate(`/profile/post/roommates/edit/${editId}/preferences`)
      } else {
        const id = await createRoommateListing(buildPayload())
        navigate(`/profile/post/roommates/edit/${id}/preferences`)
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Something went wrong. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingDraft) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 15 }}>
        Loading listing...
      </div>
      <Footer />
    </>
  )

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
              <p className="cl-hero__sub">List your room and connect with students across Europe.</p>
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
                  <span className="cl-step__label">Profile &amp; Photos</span>
                  <span className="cl-step__sub">Share your profile &amp; add photos</span>
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

              {/* Listing Title */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Listing Title *
                </h3>
                <p className="cl-card__sub">Give your listing a clear headline that students will see first.</p>
                <input
                  ref={titleRef}
                  className={`cl-input${sh('title')}`}
                  type="text"
                  placeholder="e.g. Bright private room near UvA, bills included"
                  maxLength={80}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <div className="cl-char-count">{title.length}/80</div>
                {shaking.has('title') && (
                  <p className="cl-field-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Please enter a listing title
                  </p>
                )}
              </div>

              {/* I want to… (Intent) */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                  I want to… *
                </h3>
                <p className="cl-card__sub">Let students know what you're offering.</p>
                <div className="crl-intent-grid">
                  <button
                    type="button"
                    className={`crl-intent-card${intent === 'have-room' ? ' is-active' : ''}`}
                    onClick={() => setIntent('have-room')}
                  >
                    <div className="crl-intent-card__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="36" height="36">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div className="crl-intent-card__body">
                      <span className="crl-intent-card__title">I Have a Room</span>
                      <span className="crl-intent-card__desc">I have a room and I'm looking for a roommate.</span>
                    </div>
                    {intent === 'have-room' && (
                      <span className="crl-intent-card__check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    className={`crl-intent-card${intent === 'need-room' ? ' is-active' : ''}`}
                    onClick={() => setIntent('need-room')}
                  >
                    <div className="crl-intent-card__icon crl-intent-card__icon--alt">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="36" height="36">
                        <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                      </svg>
                    </div>
                    <div className="crl-intent-card__body">
                      <span className="crl-intent-card__title">I Need a Room</span>
                      <span className="crl-intent-card__desc">I'm new and looking for a room with a roommate.</span>
                    </div>
                    {intent === 'need-room' && (
                      <span className="crl-intent-card__check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Room Type */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M2 12h20v6H2z" /><path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
                  </svg>
                  Room Type *
                </h3>
                <p className="cl-card__sub">What type of room are you sharing?</p>
                <div className="prop-type-grid">
                  {ROOM_TYPES.map(rt => (
                    <button
                      key={rt.id}
                      type="button"
                      className={`prop-type-btn${roomType === rt.id ? ' is-active' : ''}`}
                      onClick={() => setRoomType(rt.id)}
                    >
                      <span className="prop-type-btn__icon">{rt.icon}</span>
                      <span className="prop-type-btn__label">{rt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div ref={locationRef} style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  Location *
                </h3>
                <p className="cl-card__sub">Search for your city or neighbourhood — the map will fill in automatically.</p>

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
                      className={`cl-input cl-input--pl${sh('location')}`}
                      type="text"
                      placeholder="Search for your address, city or area..."
                      value={searchQuery}
                      onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true) }}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      autoComplete="off"
                      style={{ paddingRight: searchQuery ? 38 : 12 }}
                    />
                    {searchQuery && (
                      <button className="cl-input-clear" type="button" onClick={() => {
                        setSearchQuery(''); setSuggestions([]); setShowSuggestions(false)
                        setLat(null); setLng(null); setStreetAddress(''); setApartment('')
                        setPostalCode(''); setCity(''); setStateRegion(''); setCountry('')
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

                {intent === 'have-room' && <div className="cl-map" style={{ height: 220, marginTop: 14 }}>
                  <iframe
                    className="cl-map-frame"
                    title="Room location"
                    src={
                      lat !== null && lng !== null
                        ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008},${lat - 0.008},${lng + 0.008},${lat + 0.008}&layer=mapnik&marker=${lat},${lng}`
                        : `https://www.openstreetmap.org/export/embed.html?bbox=77.494,28.4644,77.514,28.4844&layer=mapnik&marker=28.4744,77.504`
                    }
                    allowFullScreen
                  />
                </div>}

                {intent === 'have-room' && <div className={`cl-address-card${lat !== null ? ' is-filled' : ''}`}>
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
                        onChange={e => setStreetAddress(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">Floor / Apt</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. 2nd floor, Apt 4"
                        value={apartment}
                        onChange={e => setApartment(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">Postal Code</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. 1011 AB"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">City</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">State / Region</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. North Holland"
                        value={stateRegion}
                        onChange={e => setStateRegion(e.target.value)}
                      />
                    </div>
                    <div className="cl-address-field">
                      <label className="cl-label">Country</label>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
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
                </div>}
                {shaking.has('location') && (
                  <p className="cl-field-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Please select a location
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Pricing *
                </h3>
                {intent === 'have-room' ? (
                  <div className="cl-pricing-row">
                    <div className="cl-pricing-field">
                      <label className="cl-label">Monthly Rent *</label>
                      <div className="cl-euro-wrap">
                        <span className="cl-euro-sym">€</span>
                        <input ref={rentRef} className={`cl-input cl-input--euro${sh('rent')}`} type="number" min="0" placeholder="650" value={rent} onChange={e => setRent(e.target.value)} />
                      </div>
                      {shaking.has('rent') && (
                        <p className="cl-field-error">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          Please enter the monthly rent
                        </p>
                      )}
                    </div>
                    <div className="cl-pricing-field">
                      <label className="cl-label">Size (m²) *</label>
                      <div className="cl-euro-wrap">
                        <span className="cl-euro-sym" style={{ fontSize: 10, width: 28 }}>m²</span>
                        <input ref={sizeRef} className={`cl-input cl-input--euro${sh('size')}`} type="number" min="0" placeholder="30" value={size} onChange={(e) => setSize(e.target.value)} />
                      </div>
                      {shaking.has('size') && (
                        <p className="cl-field-error">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          Please enter the size
                        </p>
                      )}
                    </div>
                    <div ref={utilitiesRef} className="cl-pricing-field">
                      <label className="cl-label">Utilities included? *</label>
                      <div className={`cl-yn-row${sh('utilities')}`}>
                        <button type="button" className={`cl-yn-btn cl-yn-btn--lg${utilitiesIncluded === true ? ' is-active' : ''}`} onClick={() => setUtilitiesIncluded(utilitiesIncluded === true ? null : true)}>Yes</button>
                        <button type="button" className={`cl-yn-btn cl-yn-btn--lg${utilitiesIncluded === false ? ' is-active' : ''}`} onClick={() => setUtilitiesIncluded(utilitiesIncluded === false ? null : false)}>No</button>
                      </div>
                      {shaking.has('utilities') && (
                        <p className="cl-field-error">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          Please select Yes or No
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="cl-pricing-row">
                    <div className="cl-pricing-field">
                      <label className="cl-label">My Budget (per month) *</label>
                      <p className="cl-card__sub" style={{ marginBottom: 6 }}>Monthly budget range you can afford</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="cl-euro-wrap" style={{ flex: 1 }}>
                          <span className="cl-euro-sym">€</span>
                          <input ref={budgetMinRef} className={`cl-input cl-input--euro${sh('budgetMin')}`} type="number" min="0" placeholder="Min" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} />
                        </div>
                        <span style={{ color: '#aaa', fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 600 }}>–</span>
                        <div className="cl-euro-wrap" style={{ flex: 1 }}>
                          <span className="cl-euro-sym">€</span>
                          <input ref={budgetMaxRef} className={`cl-input cl-input--euro${sh('budgetMax')}`} type="number" min="0" placeholder="Max" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} />
                        </div>
                      </div>
                      {shaking.has('budgetMax') && (
                        <p className="cl-field-error">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          Please enter your maximum budget
                        </p>
                      )}
                      {shaking.has('budgetMin') && (
                        <p className="cl-field-error">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          Minimum must be less than maximum
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {utilitiesIncluded === true && <div className="cl-included-box">
                  <p className="cl-included-box__title">What's included in the rent?</p>
                  <div className="cl-included-grid">
                    {BILL_ITEMS.map(item => (
                      <label key={item} className="cl-checkbox">
                        <input type="checkbox" checked={bills[item]} onChange={() => toggleBill(item)} />
                        <span className="cl-checkbox__box" />
                        <span className="cl-checkbox__label">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                      </label>
                    ))}
                    {bills.other && (
                      <input
                        className="cl-input cl-input--sm"
                        style={{ gridColumn: 'span 2' }}
                        type="text"
                        placeholder="Please specify..."
                        value={billOtherSpec}
                        onChange={e => setBillOtherSpec(e.target.value)}
                      />
                    )}
                  </div>
                </div>}
              </div>

              {/* Description */}
              <div style={{ marginBottom: 2, padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Description *
                </h3>
                <p className="cl-card__sub">Describe the room, the flat, the vibe, and what kind of roommate you're looking for.</p>
                <textarea
                  ref={descriptionRef}
                  className={`cl-textarea${sh('description')}`}
                  rows={5}
                  placeholder="e.g. Cosy private room in a 3-bedroom flat. We're two students who enjoy cooking and keeping things tidy. Looking for someone friendly and respectful..."
                  value={description}
                  onChange={e => setDescription(e.target.value.slice(0, 500))}
                />
                <div className="cl-char-count">{description.length}/500</div>
                {shaking.has('description') && (
                  <p className="cl-field-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Please add a description
                  </p>
                )}
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
                  {intent === 'need-room' ? 'Can Move From *' : 'Available From *'}
                </h3>
                <div className="cl-radio-stack" style={{ flexDirection: 'row', gap: 48 }}>
                  <label className="cl-radio">
                    <input type="radio" name="crl-avail" checked={availableNow} onChange={() => setAvailableNow(true)} />
                    <span className="cl-radio__dot" /><span>{intent === 'need-room' ? 'Can move immediately' : 'Available immediately'}</span>
                  </label>
                  <label className="cl-radio">
                    <input type="radio" name="crl-avail" checked={!availableNow} onChange={() => setAvailableNow(false)} />
                    <span className="cl-radio__dot" /><span>Choose Date</span>
                  </label>
                </div>
                {!availableNow && (
                  <div className="cl-iicon-wrap" style={{ marginTop: 8 }}>
                    <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input className="cl-input cl-input--pl" type="date" style={{ textTransform: 'uppercase' }} value={availableDate} onChange={e => setAvailableDate(e.target.value)} />
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
                <div className="cl-radio-stack" style={{ flexDirection: 'row', gap: 48, marginBottom: 12 }}>
                  <label className="cl-radio">
                    <input type="radio" name="crl-phone" checked={useProfilePhone} onChange={() => setUseProfilePhone(true)} />
                    <span className="cl-radio__dot" /><span>Same as profile</span>
                  </label>
                  <label className="cl-radio">
                    <input type="radio" name="crl-phone" checked={!useProfilePhone} onChange={() => setUseProfilePhone(false)} />
                    <span className="cl-radio__dot" /><span>Different number</span>
                  </label>
                </div>
                {!useProfilePhone && (
                  <div className="cl-phone-row">
                    <input className="cl-input cl-input--code" type="text" value={phoneCode} onChange={e => setPhoneCode(e.target.value)} />
                    <input className="cl-input" style={{ flex: 1 }} type="tel" placeholder="6 12345678" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                )}
                <div className="cl-phone-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="28" height="28" style={{ flexShrink: 0 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <p>Your phone number is never shown publicly. Students contact you through in-app chat first.</p>
                </div>
              </div>

              {/* Optional Details */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  More Details *
                </h3>
                <p className="cl-card__sub">Help students know what to expect.</p>

                <div className="cl-opt-list">
                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M4 11h16" />
                      </svg>
                      Furnishing
                    </div>
                    <div className="cl-toggle-grp">
                      {['Fully', 'Partially', 'Unfurnished'].map(v => (
                        <button key={v} type="button" className={`cl-tog${furnished === v ? ' is-on' : ''}`} onClick={() => setFurnished(furnished === v ? '' : v)}>{v}</button>
                      ))}
                    </div>
                  </div>

                  <div className="cl-opt-row">
                    <div className="cl-opt-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                        <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                      </svg>
                      {intent === 'need-room' ? 'I Have a Pet' : 'Pets Allowed'}
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
                      {intent === 'need-room' ? 'I Smoke' : 'Smoking Allowed'}
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
                      {['Anyone', 'Male', 'Female'].map(v => (
                        <button key={v} type="button" className={`cl-tog${genderPref === v ? ' is-on' : ''}`} onClick={() => setGenderPref(genderPref === v ? '' : v)}>{v}</button>
                      ))}
                    </div>
                  </div>

                  {intent === 'have-room' && (
                    <div className="cl-opt-row">
                      <div className="cl-opt-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Current Housemates
                      </div>
                      <div className="cl-toggle-grp">
                        {['Just me', '1', '2', '3+'].map(v => (
                          <button key={v} type="button" className={`cl-tog${housemates === v ? ' is-on' : ''}`} onClick={() => setHousemates(housemates === v ? '' : v)}>{v}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {intent === 'have-room' && (
                    <div className="cl-opt-row">
                      <div className="cl-opt-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17">
                          <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                        </svg>
                        Roommate Age Range
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input type="text" inputMode="numeric" placeholder="Min" value={ageMin} onChange={e => setAgeMin(e.target.value.replace(/\D/g, ''))} style={{ width: 76, height: 32, padding: '0 10px', border: '1.5px solid #d0cfc8', borderRadius: 8, background: '#FBF9F4', fontFamily: 'Nunito, sans-serif', fontSize: 12.5, fontWeight: 600, color: 'var(--text-dark)', textAlign: 'center', outline: 'none' }} />
                        <span style={{ color: '#aaa', fontSize: 13 }}>–</span>
                        <input type="text" inputMode="numeric" placeholder="Max" value={ageMax} onChange={e => setAgeMax(e.target.value.replace(/\D/g, ''))} style={{ width: 76, height: 32, padding: '0 10px', border: '1.5px solid #d0cfc8', borderRadius: 8, background: '#FBF9F4', fontFamily: 'Nunito, sans-serif', fontSize: 12.5, fontWeight: 600, color: 'var(--text-dark)', textAlign: 'center', outline: 'none' }} />
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Nearby Places */}
              {intent === 'have-room' && <div style={{ padding: '8px 20px' }}>
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
              </div>}

              {/* Safety & Verification */}
              <div style={{ padding: '8px 20px' }}>
                <h3 className="cl-card__title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Safety &amp; Verification
                </h3>
                <p className="cl-card__sub">Declaration — required to publish</p>
                <div className="cl-decl-list">
                  {OWNER_DECLARATIONS.map(decl => (
                    <label key={decl} className="cl-checkbox cl-checkbox--decl">
                      <input type="checkbox" checked={ownerDecl[decl]} onChange={() => toggleOwnerDecl(decl)} />
                      <span className="cl-checkbox__box" />
                      <span className="cl-checkbox__label">{decl}</span>
                    </label>
                  ))}
                </div>
                {shaking.has('declaration') && (
                  <p className="cl-field-error" style={{ marginTop: 8 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Please confirm all declarations before publishing
                  </p>
                )}
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
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button type="button" className="cl-next-btn" style={{ background: '#fff', color: '#1a1a1a', borderColor: '#1a1a1a' }} onClick={handleSaveDraft} disabled={submitting}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save as Draft
                </button>
                <button type="button" className="cl-next-btn" onClick={handleNext} disabled={submitting}>
                  {submitting ? 'Saving...' : 'Next'}
                  {!submitting && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="cl-footer-bar__note">Save as draft anytime — payment of €1 to publish</p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
