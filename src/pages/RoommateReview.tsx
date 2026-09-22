import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { apiGet, apiPatch } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface RoommateListing {
  id: string
  title: string
  status: string
  intent: string
  room_type: string
  description: string | null
  street_address: string | null
  apartment_floor: string | null
  postal_code: string | null
  city: string | null
  state_region: string | null
  country: string | null
  rent: number | null
  budget_max: number | null
  size_sqm: number | null
  utilities_included: number | null
  available_now: number
  available_date: string | null
  furnished: string | null
  pets_allowed: number | null
  smoking_allowed: number | null
  gender_preference: string | null
  housemates: string | null
  age_min: number | null
  age_max: number | null
  included_electricity: number
  included_water: number
  included_heating: number
  included_internet: number
  included_gas: number
  included_other: number
  included_other_spec: string | null
  nearby_supermarket: number
  nearby_metro: number
  nearby_bus_stop: number
  nearby_train_station: number
  nearby_university_flag: number
  nearby_hospital: number
  nearby_gym: number
  nearby_cafe: number
  nearby_restaurant: number
  nearby_university: string | null
  decl_info_accurate: number
  decl_photos_current: number
  decl_agreed_terms: number
  share_profile: number
  photos: { id: number; url: string; sort_order: number }[]
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const HOW_IT_WORKS = [
  'Students will find your listing',
  'They will send you a chat request',
  'You chat in-app and decide',
  'Share contact only after mutual consent',
]

const PHOTO_PREVIEW_COUNT = 3

function EditBtn({ to }: { to: string }) {
  const navigate = useNavigate()
  return (
    <button type="button" className="crv-edit-btn" onClick={() => navigate(to)}>Edit</button>
  )
}

function ReviewRow({ icon, title, editTo, children, last }: {
  icon: React.ReactNode
  title: string
  editTo: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className={`crv-row${last ? ' crv-row--last' : ''}`}>
      <div className="crv-row__icon">{icon}</div>
      <div className="crv-row__content">
        <div className="crv-row__head">
          <h3 className="crv-row__title">{title}</h3>
          <EditBtn to={editTo} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default function RoommateReview() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<RoommateListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    if (!id) return
    apiGet<{ success: boolean; data: RoommateListing }>(ENDPOINTS.roommates.get(id))
      .then(res => setListing(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  async function handlePublish() {
    if (!id) return
    setPublishing(true)
    try {
      await apiPatch(ENDPOINTS.roommates.status(id), { status: 'active' })
      navigate('/profile#listings')
    } catch {
      alert('Failed to publish. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  const step1Route = id ? `/profile/post/roommates/edit/${id}` : '/profile/post/roommates'
  const step2Route = id ? `/profile/post/roommates/edit/${id}/preferences` : '/profile/post/roommates'

  const isNeedRoom = listing?.intent === 'need-room'

  const photos = listing?.photos ?? []
  const visiblePhotos = photos.slice(0, PHOTO_PREVIEW_COUNT)
  const extraPhotos = photos.length - PHOTO_PREVIEW_COUNT

  const includedBills = listing ? [
    listing.included_electricity && 'Electricity',
    listing.included_water && 'Water',
    listing.included_heating && 'Heating',
    listing.included_internet && 'Wi-Fi',
    listing.included_gas && 'Gas',
    listing.included_other && (listing.included_other_spec || 'Other'),
  ].filter(Boolean) as string[] : []

  const nearbyPlaces = listing ? [
    listing.nearby_supermarket && '🛒 Supermarket',
    listing.nearby_metro && '🚇 Metro',
    listing.nearby_bus_stop && '🚌 Bus stop',
    listing.nearby_train_station && '🚆 Train station',
    listing.nearby_university_flag && '🏫 University',
    listing.nearby_hospital && '🏥 Hospital',
    listing.nearby_gym && '🏋️ Gym',
    listing.nearby_cafe && '☕ Cafes',
    listing.nearby_restaurant && '🍽️ Restaurants',
  ].filter(Boolean) as string[] : []

  const declarations = listing ? [
    listing.decl_info_accurate && 'The information provided is accurate.',
    listing.decl_photos_current && 'The photos represent the current condition of the property.',
    listing.decl_agreed_terms && 'I agree to the 1 Euro Pass housing terms.',
  ].filter(Boolean) as string[] : []

  const priceDisplay = isNeedRoom
    ? (listing?.budget_max ? `Budget up to €${listing.budget_max}/month` : null)
    : (listing?.rent ? `€${listing.rent}/month` : null)

  const availabilityDisplay = listing?.available_now
    ? (isNeedRoom ? 'Can move immediately' : 'Available immediately')
    : listing?.available_date ? `${isNeedRoom ? 'Can move from' : 'Available from'} ${formatDate(listing.available_date)}` : null

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: 15 }}>
        Loading listing…
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main className="create-listing-page create-listing-page--roommates">

        <section className="cl-hero">
          <div className="cl-hero__inner">
            <div className="cl-hero__content">
              <nav className="cl-breadcrumb">
                <Link to="/">Home</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile">My Profile</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post">Post a Listing</Link><span className="cl-breadcrumb__sep">/</span>
                <Link to="/profile/post/roommates">Roommates</Link><span className="cl-breadcrumb__sep">/</span>
                <span>Review &amp; Publish</span>
              </nav>
              <h1 className="cl-hero__title">Create a new listing</h1>
              <p className="cl-hero__sub">List your place and connect with students across Europe.</p>
            </div>
            <div className="cl-steps">
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Basic Info</span>
                  <span className="cl-step__sub">What are you renting?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step">
                <div className="cl-step__circle cl-step__circle--done">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" width="13" height="13"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21a8 8 0 0 0-5-7.39" />
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label" style={{ color: '#888' }}>Preferences</span>
                  <span className="cl-step__sub">Make your listing stand out</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />
              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
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

              <div style={{ padding: '8px 20px' }}>
                <div className="crv-review-header">
                  <div>
                    <h2 className="crv-review-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      Review Your Listing
                    </h2>
                    <p className="crv-review-sub">Please check all details before publishing. You can go back to edit if needed.</p>
                  </div>
                  <button type="button" className="crv-edit-all-btn" onClick={() => navigate(step1Route)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit All
                  </button>
                </div>
              </div>

              <div style={{ padding: '0 20px' }} className="crv-sections">

                {/* Listing Title */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
                  title="Listing Title"
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">{listing?.title || '—'}</p>
                </ReviewRow>

                {/* Intent */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>}
                  title="What I want to do"
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">
                    {listing?.intent === 'have-room' ? 'I Have a Room' : listing?.intent === 'need-room' ? 'I Need a Room' : '—'}
                  </p>
                </ReviewRow>

                {/* Room Details */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                  title="Room Details"
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">
                    {[
                      listing?.room_type === 'private' ? 'Private Room' : listing?.room_type === 'shared' ? 'Shared Room' : null,
                      listing?.size_sqm && !isNeedRoom ? `${listing.size_sqm} m²` : null,
                      listing?.housemates && !isNeedRoom ? `${listing.housemates} housemate(s)` : null,
                    ].filter(Boolean).join(' • ') || '—'}
                  </p>
                  {!isNeedRoom && (listing?.street_address || listing?.city) && (
                    <p className="crv-row__detail">
                      {[
                        listing?.street_address,
                        listing?.apartment_floor ? `Floor ${listing.apartment_floor}` : null,
                        listing?.city,
                        listing?.postal_code,
                        listing?.country,
                      ].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {isNeedRoom && (listing?.city || listing?.country) && (
                    <p className="crv-row__detail">
                      {[listing?.city, listing?.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                  <p className="crv-row__detail">
                    {[
                      listing?.gender_preference ? `Gender preference: ${listing.gender_preference}` : null,
                      listing?.age_min && listing?.age_max && !isNeedRoom ? `Age: ${listing.age_min}–${listing.age_max}` : null,
                    ].filter(Boolean).join(' • ') || null}
                  </p>
                </ReviewRow>

                {/* Pricing & Availability */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
                  title={isNeedRoom ? 'Budget & Availability' : 'Pricing & Availability'}
                  editTo={step1Route}
                >
                  <p className="crv-row__detail">
                    {[priceDisplay, availabilityDisplay].filter(Boolean).join(' • ') || '—'}
                  </p>
                  {!isNeedRoom && listing?.utilities_included != null && (
                    <p className="crv-row__detail">Utilities: {listing.utilities_included ? 'Included' : 'Not included'}</p>
                  )}
                </ReviewRow>

                {/* Furnishing & Bills — have-room only */}
                {!isNeedRoom && (
                  <ReviewRow
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3M2 11v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M4 11h16" /></svg>}
                    title="Furnishing &amp; Bills"
                    editTo={step1Route}
                  >
                    {listing?.furnished && <p className="crv-row__detail">{listing.furnished} Furnished</p>}
                    {includedBills.length > 0 && (
                      <div className="crv-tags-wrap" style={{ marginTop: 4 }}>
                        {includedBills.map(tag => (
                          <span key={tag} className="crv-tag">{tag} included</span>
                        ))}
                      </div>
                    )}
                    {!listing?.furnished && includedBills.length === 0 && <p className="crv-row__detail">—</p>}
                  </ReviewRow>
                )}

                {/* Description */}
                {listing?.description && (
                  <ReviewRow
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>}
                    title="Description"
                    editTo={step1Route}
                  >
                    <p className="crv-row__detail">{listing.description}</p>
                  </ReviewRow>
                )}

                {/* Preferences */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>}
                  title="Preferences"
                  editTo={step1Route}
                >
                  {(listing?.pets_allowed != null || listing?.smoking_allowed != null || (isNeedRoom && listing?.furnished)) ? (
                    <div className="crv-tags-wrap">
                      {listing?.pets_allowed != null && (
                        <span className="crv-tag">{isNeedRoom ? (listing.pets_allowed ? 'I have a pet' : 'No pets') : (listing.pets_allowed ? 'Pets allowed' : 'No pets')}</span>
                      )}
                      {listing?.smoking_allowed != null && (
                        <span className="crv-tag">{isNeedRoom ? (listing.smoking_allowed ? 'I smoke' : 'Non-smoker') : (listing.smoking_allowed ? 'Smoking allowed' : 'No smoking')}</span>
                      )}
                      {isNeedRoom && listing?.furnished && <span className="crv-tag">{listing.furnished} furnished</span>}
                    </div>
                  ) : (
                    <p className="crv-row__detail">—</p>
                  )}
                </ReviewRow>

                {/* Nearby Places — have-room only */}
                {!isNeedRoom && (
                  <ReviewRow
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                    title="Nearby Places"
                    editTo={step1Route}
                  >
                    {listing?.nearby_university && <p className="crv-row__detail">🏫 {listing.nearby_university}</p>}
                    {nearbyPlaces.length > 0 ? (
                      <div className="crv-tags-wrap" style={{ marginTop: 4 }}>
                        {nearbyPlaces.map(tag => <span key={tag} className="crv-tag">{tag}</span>)}
                      </div>
                    ) : !listing?.nearby_university ? (
                      <p className="crv-row__detail">—</p>
                    ) : null}
                  </ReviewRow>
                )}

                {/* Photos — have-room only */}
                {!isNeedRoom && (
                  <ReviewRow
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>}
                    title="Photos"
                    editTo={step2Route}
                  >
                    {visiblePhotos.length > 0 ? (
                      <div className="crv-photos-row">
                        {visiblePhotos.map((p, i) => (
                          <img key={i} src={p.url} alt={`Photo ${i + 1}`} className="crv-photo-thumb" />
                        ))}
                        {extraPhotos > 0 && <div className="crv-photo-more">+{extraPhotos}</div>}
                      </div>
                    ) : (
                      <p className="crv-row__detail" style={{ color: '#aaa' }}>No photos added yet</p>
                    )}
                  </ReviewRow>
                )}

                {/* Share Profile */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                  title="Share Profile"
                  editTo={step2Route}
                >
                  {listing?.share_profile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
                      <p className="crv-row__detail" style={{ margin: 0, color: '#2e7d32' }}>Profile shared with this listing</p>
                    </div>
                  ) : (
                    <p className="crv-row__detail" style={{ color: '#888' }}>Not sharing profile</p>
                  )}
                </ReviewRow>

                {/* Declarations */}
                <ReviewRow
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
                  title="Declaration"
                  editTo={step1Route}
                  last
                >
                  {declarations.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                      {declarations.map(d => (
                        <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="13" height="13" style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12" /></svg>
                          <p className="crv-row__detail" style={{ margin: 0 }}>{d}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="crv-row__detail" style={{ color: '#e05252' }}>No declarations confirmed yet</p>
                  )}
                </ReviewRow>

              </div>



            </div>

            {/* Right Column — Preview Card */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>
              <div className="cl-card crl-preview-card">
                <h3 className="cl-card__title" style={{ marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  Listing Preview
                </h3>
                <div className="crl-preview">
                  <div className="crl-preview__img-wrap">
                    <img src={photos[0]?.url ?? 'https://via.placeholder.com/400x240?text=No+Photo'} alt="Room preview" className="crl-preview__img" />
                    <button type="button" className="crl-preview__heart" aria-label="Save">
                      <svg viewBox="0 0 24 24" fill="#e05252" stroke="#e05252" strokeWidth="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  </div>
                  <div className="crl-preview__body">
                    <div className="crl-preview__title">{listing?.title ?? '—'}</div>
                    <div className="crl-preview__price">
                      {isNeedRoom
                        ? (listing?.budget_max ? <>Budget up to €{listing.budget_max}<span>/month</span></> : '—')
                        : (listing?.rent ? <>€{listing.rent}<span>/month</span></> : '—')}
                    </div>
                    <div className="crl-preview__location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {[listing?.city, listing?.country].filter(Boolean).join(', ') || '—'}
                    </div>
                    <div className="crl-preview__tags">
                      {listing?.furnished && <span className="crl-preview__tag">{listing.furnished}</span>}
                      {listing?.included_internet ? <span className="crl-preview__tag">Wi-Fi</span> : null}
                      {listing?.size_sqm && !isNeedRoom ? <span className="crl-preview__tag">{listing.size_sqm} m²</span> : null}
                      {listing?.room_type && <span className="crl-preview__tag">{listing.room_type === 'private' ? 'Private Room' : 'Shared Room'}</span>}
                    </div>
                    <div className="crl-preview__avail">
                      {availabilityDisplay}
                    </div>
                  </div>
                </div>
              </div>

              <div className="cl-card crv-how-card">
                <img src="/how-it-works.svg" alt="How it works" style={{ width: '100%', display: 'block', marginBottom: 12 }} />
                <h4 className="crv-how__title">How it works after publishing?</h4>
                <ul className="crv-how__list">
                  {HOW_IT_WORKS.map(item => (
                    <li key={item} className="crv-how__item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
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
                <button type="button" className="cl-back-btn" onClick={() => navigate(step2Route)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" style={{ background: '#2a8a3d' }} onClick={handlePublish} disabled={publishing}>
                  {publishing ? 'Publishing…' : 'Publish listing'}
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
