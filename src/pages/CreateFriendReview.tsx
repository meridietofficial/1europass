import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { apiPost, apiPut, apiPatch } from '../api/client'
import { ENDPOINTS } from '../api/endpoints'

interface Step1Data {
  title: string
  lookingFor: string
  ageMin: number
  ageMax: number
}

interface Step2Data {
  vibes: string[]
  interests: string[]
  bio: string
}

const INTEREST_LABELS: Record<string, string> = {
  travel: 'Travel', study: 'Study buddy', sports: 'Sports', music: 'Music',
  art: 'Art', gaming: 'Gaming', fitness: 'Fitness', food: 'Food & Cafes',
  photo: 'Photography', movies: 'Movies', events: 'Events', language: 'Language exchange',
  reading: 'Reading', hiking: 'Hiking', cycling: 'Cycling', volunteer: 'Volunteering',
  cooking: 'Cooking', dancing: 'Dancing', yoga: 'Yoga / Meditation', tech: 'Tech / Coding',
  boardgames: 'Board games', anime: 'Anime / Manga', fashion: 'Fashion', nature: 'Nature / Outdoors',
  other: 'Other',
}

export default function CreateFriendReview() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [step1, setStep1] = useState<Step1Data | null>(null)
  const [step2, setStep2] = useState<Step2Data | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const s1 = sessionStorage.getItem('friend_step1')
    const s2 = sessionStorage.getItem('friend_step2')
    if (s1) setStep1(JSON.parse(s1))
    if (s2) setStep2(JSON.parse(s2))
  }, [])

  const title = step1?.title ?? ''
  const lookingFor = step1?.lookingFor ?? '—'
  const ageMin = step1?.ageMin ?? 18
  const ageMax = step1?.ageMax ?? 30
  const interestList = step2?.interests ?? []
  const interestLabels = interestList.map(id => INTEREST_LABELS[id] ?? id)
  const displayInterests = interestLabels.length > 5
    ? interestLabels.slice(0, 5).join(', ') + `, +${interestLabels.length - 5} MORE`
    : interestLabels.join(', ')
  const bio = step2?.bio ?? ''

  function clearSession() {
    sessionStorage.removeItem('friend_step1')
    sessionStorage.removeItem('friend_step2')
  }

  async function submitListing(publish: boolean) {
    if (submitting) return
    setSubmitting(true)
    try {
      const body = {
        title:       step1?.title ?? '',
        looking_for: step1?.lookingFor ?? 'Anyone',
        age_min:     step1?.ageMin ?? 18,
        age_max:     step1?.ageMax ?? 30,
        vibes:       step2?.vibes ?? [],
        interests:   step2?.interests ?? [],
        bio:         step2?.bio ?? '',
      }

      let listingId: string
      if (id) {
        await apiPut(ENDPOINTS.friend.update(id), body)
        listingId = id
      } else {
        const res = await apiPost<{ success: boolean; data: { id: string } }>(
          ENDPOINTS.friend.create, body,
        )
        listingId = res.data.id
      }

      if (publish) {
        await apiPatch(ENDPOINTS.friend.status(listingId), { status: 'pending' })
      }

      clearSession()
      navigate('/profile#listings')
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleSaveDraft()  { submitListing(false) }
  function handlePublish()    { submitListing(true) }

  return (
    <>
      <Navbar />
      <main className="create-listing-page">

        {/* ── Hero / Steps ── */}
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
                <span>Find a Friend</span>
              </nav>
              <h1 className="cl-hero__title">Create Friend listing</h1>
              <p className="cl-hero__sub">3 easy steps to help you find your people</p>
            </div>

            <div className="cl-steps">
              {/* Step 1 — done */}
              <div className="cl-step cl-step--done">
                <div className="cl-step__circle">1</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-basic-info.svg" width="36" height="36" alt="About you" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">About you</span>
                  <span className="cl-step__sub">Tell us about yourself</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />

              {/* Step 2 — done */}
              <div className="cl-step cl-step--done">
                <div className="cl-step__circle">2</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-photos.svg" width="36" height="36" alt="Your vibe & interests" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Your vibe &amp; interests</span>
                  <span className="cl-step__sub">What are you looking for?</span>
                </div>
              </div>
              <div className="cl-steps__line cl-steps__line--done" />

              {/* Step 3 — active */}
              <div className="cl-step is-active">
                <div className="cl-step__circle">3</div>
                <div className="cl-step__icon-wrap">
                  <img src="/step-review.svg" width="36" height="36" alt="Review & Publish" />
                </div>
                <div className="cl-step__info">
                  <span className="cl-step__label">Review &amp; publish</span>
                  <span className="cl-step__sub">Check everything and go live.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content card ── */}
        <div className="content-card">
          <div className="cl-body">

            {/* ── Left column ── */}
            <div className="cl-left">
              <div style={{ padding: '0 20px 20px' }}>

                {/* Review header row */}
                <div className="fr-review-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="fr-review-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                    </div>
                    <div>
                      <div className="fr-review-title">Review Your Listing</div>
                      <div className="fr-review-sub">Please check all details before publishing. You can go back to edit if needed.</div>
                    </div>
                  </div>
                  <button className="fr-edit-all-btn" onClick={() => navigate(id ? `/profile/post/friend/edit/${id}` : '/profile/post/friend')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit All
                  </button>
                </div>

                {/* Review rows */}
                <div className="fr-review-rows">

                  {/* Title */}
                  <div className="fr-review-row">
                    <div className="fr-review-row__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                    </div>
                    <div className="fr-review-row__body">
                      <div className="fr-review-row__label">
                        Listing Title
                        <button className="fr-edit-link" onClick={() => navigate(id ? `/profile/post/friend/edit/${id}` : '/profile/post/friend')}>Edit</button>
                      </div>
                      <div className="fr-review-row__value">{title || '—'}</div>
                    </div>
                  </div>

                  {/* Looking for */}
                  <div className="fr-review-row">
                    <div className="fr-review-row__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div className="fr-review-row__body">
                      <div className="fr-review-row__label">
                        Looking for
                        <button className="fr-edit-link" onClick={() => navigate(id ? `/profile/post/friend/edit/${id}` : '/profile/post/friend')}>Edit</button>
                      </div>
                      <div className="fr-review-row__value">{lookingFor.toUpperCase()} {lookingFor === 'Anyone' ? '(NO PREFERENCE)' : ''}</div>
                    </div>
                  </div>

                  {/* Preferred age range */}
                  <div className="fr-review-row">
                    <div className="fr-review-row__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </div>
                    <div className="fr-review-row__body">
                      <div className="fr-review-row__label">
                        Preferred age range
                        <button className="fr-edit-link" onClick={() => navigate(id ? `/profile/post/friend/edit/${id}` : '/profile/post/friend')}>Edit</button>
                      </div>
                      <div className="fr-review-row__value">{ageMin} – {ageMax === 30 ? '30+' : ageMax}</div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="fr-review-row">
                    <div className="fr-review-row__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v7l10 5 10-5V8"/>
                      </svg>
                    </div>
                    <div className="fr-review-row__body">
                      <div className="fr-review-row__label">
                        Interests
                        <button className="fr-edit-link" onClick={() => navigate(id ? `/profile/post/friend/edit/${id}/vibe` : '/profile/post/friend/vibe')}>Edit</button>
                      </div>
                      <div className="fr-review-row__value">
                        {displayInterests || '—'}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="fr-review-row" style={{ borderBottom: 'none' }}>
                    <div className="fr-review-row__icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                      </svg>
                    </div>
                    <div className="fr-review-row__body">
                      <div className="fr-review-row__label">
                        Description
                        <button className="fr-edit-link" onClick={() => navigate(id ? `/profile/post/friend/edit/${id}/vibe` : '/profile/post/friend/vibe')}>Edit</button>
                      </div>
                      <div className="fr-review-row__value">{bio ? bio.toUpperCase() : '—'}</div>
                    </div>
                  </div>

                </div>

                {/* Profile shared notice */}
                <div className="fr-profile-shared-box">
                  <div className="fr-profile-shared-box__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="20" height="20">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="fr-profile-shared-box__title">Your profile details will be shared</div>
                    <div className="fr-profile-shared-box__sub">
                      Potential friends will be able to see your name, photo, location, and language. This helps them decide if you're a good match.
                      <span> <a href="/profile/edit" className="fr-profile-shared-box__link">Update your profile →</a></span>
                    </div>
                  </div>
                </div>

                {/* Privacy box */}
                <div className="fr-privacy-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <div>
                    <div className="fr-privacy-title">Your Privacy is Protected</div>
                    <div className="fr-privacy-sub">Your phone number will never be shown publicly.</div>
                    <div className="fr-privacy-sub">Students will contact you through in-app chat first.</div>
                  </div>
                </div>


              </div>
            </div>{/* end cl-left */}

            {/* ── Right sidebar ── */}
            <aside className="cl-right">

              {/* You're almost live! */}
              <div className="fr-almost-live">
                <div className="fr-almost-live__header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#2a8a3d" strokeWidth="2" width="20" height="20">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div>
                    <div className="fr-almost-live__title">You're almost live!</div>
                    <div className="fr-almost-live__sub">Here's what happens next:</div>
                  </div>
                </div>
                <div className="fr-next-steps">
                  <div className="fr-next-step">
                    <div className="fr-next-step__num">1.</div>
                    <div>
                      <div className="fr-next-step__title">We'll review your listing</div>
                      <div className="fr-next-step__sub">Our team will check it to keep the community safe and authentic.</div>
                    </div>
                  </div>
                  <div className="fr-next-step">
                    <div className="fr-next-step__num">2.</div>
                    <div>
                      <div className="fr-next-step__title">You'll get an email</div>
                      <div className="fr-next-step__sub">Once approved, we'll send you a confirmation and your listing goes live.</div>
                    </div>
                  </div>
                  <div className="fr-next-step">
                    <div className="fr-next-step__num">3.</div>
                    <div>
                      <div className="fr-next-step__title">Start connecting!</div>
                      <div className="fr-next-step__sub">Students can discover you and send you messages.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe & trusted */}
              <div className="fr-safe-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#5dae61" strokeWidth="2" width="22" height="22" style={{ flexShrink: 0 }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                  <div>
                    <div className="fr-safe-title">Safe &amp; trusted</div>
                    <div className="fr-safe-sub">We never share your personal information. You're in control.</div>
                  </div>
                </div>
              </div>


            </aside>

          </div>

          {/* Thank you banner */}
          <div className="fr-thankyou-banner">
            <div className="fr-thankyou-left">
              <div className="fr-thankyou-title">Thank you for being part of 1 Euro Pass!</div>
              <div className="fr-thankyou-sub">You're one step closer to amazing friendships.</div>
              <div className="fr-thankyou-sub">We can't wait to see the connections you make!</div>
            </div>
            <div className="fr-thankyou-right">Good Friends<br />Brighter Days!</div>
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
                <button type="button" className="cl-back-btn" disabled={submitting} onClick={() => navigate(id ? `/profile/post/friend/edit/${id}/vibe` : '/profile/post/friend/vibe')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back
                </button>
                <button type="button" className="cl-back-btn" disabled={submitting} onClick={handleSaveDraft}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                  {submitting ? 'Saving…' : 'Save as Draft'}
                </button>
                <button type="button" className="rv-publish-btn" disabled={submitting} onClick={handlePublish}>
                  {submitting ? 'Publishing…' : 'Publish Listing'}
                  {!submitting && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>
              <p className="cl-footer-bar__note">One-time payment of €1 to publish</p>
            </div>
          </div>

        </div>{/* end content-card */}

      </main>
      <Footer />
    </>
  )
}
