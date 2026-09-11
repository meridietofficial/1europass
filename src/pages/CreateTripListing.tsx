import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TRIP_TYPES = [
  'Weekend Trip', 'Day Trip', 'City Break', 'Road Trip',
  'Beach Trip', 'Hiking / Nature', 'Cultural Trip',
  'Festival / Event', 'Study Trip', 'Other',
]

const TRIP_CATEGORIES = [
  'Adventure', 'Cultural', 'Beach', 'City Break',
  'Nature & Hiking', 'Road Trip', 'Food & Drink',
  'Festival & Events', 'Budget Travel', 'Luxury', 'Other',
]

const WHO_CAN_JOIN = [
  {
    id: 'solo',
    label: 'Solo travelers welcome',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'group',
    label: 'Group trips',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'all',
    label: 'Open to all genders',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

export default function CreateTripListing() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [tripType, setTripType] = useState('')
  const [category, setCategory] = useState('')
  const [duration, setDuration] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [budget, setBudget] = useState('')
  const [meetingPoint, setMeetingPoint] = useState('')
  const [description, setDescription] = useState('')
  const [whoCanJoin, setWhoCanJoin] = useState<string[]>(['solo'])

  function toggleWho(id: string) {
    setWhoCanJoin(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    )
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
                <span>Trip</span>
              </nav>
              <h1 className="cl-hero__title">Post a Trip</h1>
              <p className="cl-hero__sub">Share your adventure and find travel buddies!</p>
            </div>

            <div className="cl-steps">
              <div className="cl-step is-active">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="1.8" width="28" height="28">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Trip Details</span>
                  <span className="cl-step__sub">Tell us about your trip.</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Photos &amp; Itinerary</span>
                  <span className="cl-step__sub">Show what students can expect.</span>
                </div>
              </div>
              <div className="cl-steps__line" />
              <div className="cl-step">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d0cfc8" strokeWidth="1.8" width="28" height="28">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; publish</span>
                  <span className="cl-step__sub">Check everything and go live.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="content-card">
          <div className="cl-body">
            <div className="cl-left">
              <div className="crl-form-body">
                <div className="crl-form-section">

                  {/* Form header */}
                  <div className="bsl-form-header">
                    <div>
                      <h2 className="bsl-form-title">Trip Details</h2>
                      <p className="bsl-form-sub">Fill in all the details to help travel buddies find your trip.</p>
                    </div>
                    <div className="bsl-form-header__illus" aria-hidden="true">
                      <svg viewBox="0 0 120 90" fill="none" width="120" height="90">
                        {/* Camper van body */}
                        <rect x="15" y="44" width="76" height="34" rx="6" fill="#5dae61" stroke="#1a1a1a" strokeWidth="1.8"/>
                        {/* Windows */}
                        <rect x="22" y="50" width="20" height="14" rx="3" fill="#c8efc8" stroke="#1a1a1a" strokeWidth="1.2"/>
                        <rect x="47" y="50" width="20" height="14" rx="3" fill="#c8efc8" stroke="#1a1a1a" strokeWidth="1.2"/>
                        {/* Cab */}
                        <rect x="72" y="52" width="16" height="12" rx="3" fill="#c8efc8" stroke="#1a1a1a" strokeWidth="1.2"/>
                        {/* Roof rack */}
                        <rect x="20" y="38" width="64" height="8" rx="2" fill="#3d8b41" stroke="#1a1a1a" strokeWidth="1.2"/>
                        <rect x="28" y="32" width="10" height="7" rx="1" fill="#f4b942"/>
                        <rect x="42" y="32" width="10" height="7" rx="1" fill="#e05252"/>
                        <rect x="56" y="32" width="10" height="7" rx="1" fill="#c8efc8"/>
                        {/* Wheels */}
                        <circle cx="33" cy="78" r="9" fill="#1a1a1a"/>
                        <circle cx="33" cy="78" r="4" fill="#888"/>
                        <circle cx="75" cy="78" r="9" fill="#1a1a1a"/>
                        <circle cx="75" cy="78" r="4" fill="#888"/>
                        {/* Headlight */}
                        <circle cx="91" cy="60" r="4" fill="#f5e642" stroke="#1a1a1a" strokeWidth="1"/>
                        {/* Road */}
                        <line x1="5" y1="88" x2="115" y2="88" stroke="#d0cfc8" strokeWidth="2.5" strokeLinecap="round"/>
                        {/* Location pin */}
                        <path d="M103 18c0 6-8 14-8 14s-8-8-8-14a8 8 0 0 1 16 0z" fill="#e05252" stroke="#1a1a1a" strokeWidth="1.2"/>
                        <circle cx="95" cy="18" r="3" fill="#fff"/>
                        {/* Stars */}
                        <text x="5" y="28" fontSize="12" fill="#f5e642">✦</text>
                        <text x="108" y="40" fontSize="9" fill="#f5e642">✦</text>
                      </svg>
                    </div>
                  </div>

                  {/* Trip Title */}
                  <div style={{ marginBottom: 18 }}>
                    <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Trip Title *
                    </h3>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="cl-input"
                        type="text"
                        placeholder="e.g. Weekend in Prague - Castles, Cafes & Good Vibes"
                        maxLength={80}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                      <span className="cl-char-count" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', marginTop: 0 }}>{title.length}/80</span>
                    </div>
                  </div>

                  {/* Destination + Trip Type */}
                  <div className="bsl-cat-row">
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        Destination *
                      </h3>
                      <div className="cl-iicon-wrap">
                        <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <input
                          className="cl-input cl-input--pl"
                          type="text"
                          placeholder="Enter city, country or region"
                          value={destination}
                          onChange={e => setDestination(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <path d="M3 7l4-4 4 4M7 3v18M21 17l-4 4-4-4M17 21V3"/>
                        </svg>
                        Trip Type *
                      </h3>
                      <div className="crp-select-wrap">
                        <select
                          className="crp-select"
                          value={tripType}
                          onChange={e => setTripType(e.target.value)}
                        >
                          <option value="">Select trip type</option>
                          {TRIP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Trip Category + Duration */}
                  <div className="bsl-cat-row">
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        Trip Category
                      </h3>
                      <div className="crp-select-wrap">
                        <select
                          className="crp-select"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                        >
                          <option value="">Select category (optional)</option>
                          {TRIP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <svg className="crp-select-arrow" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="15" height="15"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Duration
                      </h3>
                      <div className="cl-iicon-wrap">
                        <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <input
                          className="cl-input cl-input--pl"
                          type="text"
                          placeholder="e.g. 4 Days"
                          value={duration}
                          onChange={e => setDuration(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Start Date + End Date */}
                  <div className="bsl-cat-row">
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Start Date *
                      </h3>
                      <div className="cl-iicon-wrap">
                        <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <input
                          className="cl-input cl-input--pl"
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        End Date *
                      </h3>
                      <div className="cl-iicon-wrap">
                        <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <input
                          className="cl-input cl-input--pl"
                          type="date"
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget + Meeting Point */}
                  <div className="crl-location-rent-row" style={{ marginBottom: 18 }}>
                    <div className="crl-field-group">
                      <h3 className="cl-card__title" style={{ marginBottom: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        Budget (Per Person) *
                      </h3>
                      <div className="cl-euro-wrap" style={{ marginTop: 6 }}>
                        <span className="cl-euro-sym">€</span>
                        <input
                          className="cl-input cl-input--euro"
                          type="number"
                          min="0"
                          placeholder="e.g. 150"
                          value={budget}
                          onChange={e => setBudget(e.target.value)}
                        />
                      </div>
                      <p className="cl-card__sub" style={{ marginTop: 4 }}>Estimated cost per traveler.</p>
                    </div>
                    <div className="crl-field-group" style={{ flex: 1 }}>
                      <h3 className="cl-card__title" style={{ marginBottom: 0 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        Location / Meeting Point *
                      </h3>
                      <div className="cl-iicon-wrap" style={{ marginTop: 6 }}>
                        <svg className="cl-iicon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="15" height="15">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <input
                          className="cl-input cl-input--pl"
                          type="text"
                          placeholder="Where will you meet or start?"
                          value={meetingPoint}
                          onChange={e => setMeetingPoint(e.target.value)}
                        />
                      </div>
                      <p className="cl-card__sub" style={{ marginTop: 4 }}>City, station or landmark</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: 18 }}>
                    <h3 className="cl-card__title" style={{ marginBottom: 8 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                      Trip Description *
                    </h3>
                    <p className="cl-card__sub" style={{ marginBottom: 8 }}>Describe your trip, what you'll do, places to visit, and who can join.</p>
                    <textarea
                      className="cl-textarea"
                      rows={5}
                      placeholder="Tell potential travel buddies about your trip..."
                      value={description}
                      onChange={e => setDescription(e.target.value.slice(0, 1000))}
                    />
                    <div className="cl-char-count">{description.length}/1000</div>
                  </div>

                  {/* Who Can Join */}
                  <div>
                    <h3 className="cl-card__title" style={{ marginBottom: 10 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      Who Can Join *
                    </h3>
                    <div className="bsl-condition-btns">
                      {WHO_CAN_JOIN.map(w => (
                        <button
                          key={w.id}
                          type="button"
                          className={`bsl-condition-btn${whoCanJoin.includes(w.id) ? ' is-active' : ''}`}
                          onClick={() => toggleWho(w.id)}
                        >
                          {w.icon}
                          {w.label}
                          {whoCanJoin.includes(w.id) && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="cl-right" style={{ width: '320px', maxWidth: '320px', minWidth: 0 }}>

              {/* Posting a Trip is Easy */}
              <div className="cl-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="17" height="17">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                  Posting a Trip is Easy!
                </h3>
                <div className="bsl-selling-list">
                  <div className="bsl-selling-item">
                    <div className="bsl-selling-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="bsl-selling-item__title">List in seconds</p>
                      <p className="bsl-selling-item__desc">Create your trip listing in just a few steps.</p>
                    </div>
                  </div>
                  <div className="bsl-selling-item">
                    <div className="bsl-selling-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div>
                      <p className="bsl-selling-item__title">Find travel buddies</p>
                      <p className="bsl-selling-item__desc">Reach thousands of students across Europe.</p>
                    </div>
                  </div>
                  <div className="bsl-selling-item">
                    <div className="bsl-selling-item__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="18" height="18">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                      </svg>
                    </div>
                    <div>
                      <p className="bsl-selling-item__title">Travel safely</p>
                      <p className="bsl-selling-item__desc">Follow our safety tips and meet in public places.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for a Great Trip */}
              <div className="cl-card bsl-tips-card">
                <h3 className="cl-card__title" style={{ marginBottom: 14 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="2" width="17" height="17">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Tips for a Great Trip
                </h3>
                <div className="bsl-tips-list">
                  {[
                    'Choose a catchy and clear title',
                    'Add all important trip details',
                    'Be honest about budget & plans',
                    'Mention who can join',
                    'Respond to questions quickly',
                  ].map(tip => (
                    <div key={tip} className="bsl-tip-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2.5" width="14" height="14" style={{ flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
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
                    <p className="bsl-help-card__desc">Check our guidelines for posting trips.</p>
                    <button type="button" className="bsl-help-card__btn">
                      View Posting Guidelines
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                  <div className="bsl-help-card__illus" aria-hidden="true">
                    <svg viewBox="0 0 60 70" fill="none" width="56" height="56">
                      <rect x="10" y="20" width="36" height="44" rx="3" fill="#c8efc8" stroke="#1a1a1a" strokeWidth="1.5"/>
                      <path d="M18 32h20M18 39h20M18 46h12" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M40 8l6 4-4 6" stroke="#5dae61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="48" cy="10" r="3" fill="#f4b942" stroke="#1a1a1a" strokeWidth="1.2"/>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="cl-footer-bar">
            <div className="cl-footer-bar__secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="26" height="26" style={{ flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
              </svg>
              <div className="cl-footer-bar__secure-text">
                <strong>Private &amp; Secure</strong>
                <span>Your information is safe with us. We never share your contact details.</span>
              </div>
            </div>
            <div className="cl-footer-bar__right">
              <div className="cl-footer-bar__btns">
                <button type="button" className="cl-back-btn" onClick={() => navigate('/profile/post')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Back
                </button>
                <button type="button" className="cl-next-btn" onClick={() => navigate('/profile/post/trip/photos')}>
                  Next: Photos &amp; Itinerary
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
              <p className="cl-footer-bar__note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" style={{ display: 'inline', marginRight: 3 }}>
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
