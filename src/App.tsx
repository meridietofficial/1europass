import { Routes, Route, Navigate, useParams, Link, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const Home = lazy(() => import('./pages/Home'))
const AllCategories = lazy(() => import('./pages/AllCategories'))
const Housing = lazy(() => import('./pages/Housing'))
const HousingDetail = lazy(() => import('./pages/HousingDetail'))
const Profile = lazy(() => import('./pages/Profile'))
const PostListing = lazy(() => import('./pages/PostListing'))
const CreateHousingListing = lazy(() => import('./pages/CreateHousingListing'))
const CreateHousingPhotos = lazy(() => import('./pages/CreateHousingPhotos'))
const CreateHousingReview = lazy(() => import('./pages/CreateHousingReview'))
const CreateRoommateListing = lazy(() => import('./pages/CreateRoommateListing'))
const RoommatePreferences = lazy(() => import('./pages/RoommatePreferences'))
const RoommateReview = lazy(() => import('./pages/RoommateReview'))
const Roommates = lazy(() => import('./pages/Roommates'))
const RoommateDetail = lazy(() => import('./pages/RoommateDetail'))
const BuySell = lazy(() => import('./pages/BuySell'))
const BuySellDetail = lazy(() => import('./pages/BuySellDetail'))
const TeachAndCoach = lazy(() => import('./pages/TeachAndCoach'))
const TeachAndCoachDetail = lazy(() => import('./pages/TeachAndCoachDetail'))
const CreateBuySellListing = lazy(() => import('./pages/CreateBuySellListing'))
const CreateTeachAndCoachListing = lazy(() => import('./pages/CreateTeachAndCoachListing'))
const CreateTeachAndCoachCourseDetails = lazy(() => import('./pages/CreateTeachAndCoachCourseDetails'))
const CreateTeachAndCoachReview = lazy(() => import('./pages/CreateTeachAndCoachReview'))
const Trip = lazy(() => import('./pages/Trip'))
const TripDetail = lazy(() => import('./pages/TripDetail'))
const Friends = lazy(() => import('./pages/Friends'))
const FriendsDetail = lazy(() => import('./pages/FriendsDetail'))
const CreateTripListing = lazy(() => import('./pages/CreateTripListing'))
const CreateTripPhotos = lazy(() => import('./pages/CreateTripPhotos'))
const CreateTripReview = lazy(() => import('./pages/CreateTripReview'))
const BuySellPhotos = lazy(() => import('./pages/BuySellPhotos'))
const BuySellReview = lazy(() => import('./pages/BuySellReview'))
const CreateFriendListing = lazy(() => import('./pages/CreateFriendListing'))
const CreateFriendVibe = lazy(() => import('./pages/CreateFriendVibe'))
const CreateFriendReview = lazy(() => import('./pages/CreateFriendReview'))
const ForBusinesses = lazy(() => import('./pages/ForBusinesses'))
const Blog = lazy(() => import('./pages/Blog'))
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function CategoryComingSoon() {
  const { category } = useParams()
  const name = category
    ? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'This category'

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: '60px 24px', background: '#f5f4ed' }}>
        <div style={{ fontSize: 48 }}>🚧</div>
        <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 32, color: '#1a1a1a' }}>{name} listings — coming soon!</h2>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#888', maxWidth: 360, textAlign: 'center' }}>
          We're building the form for this category. Housing is available now — try posting there!
        </p>
        <Link to="/profile/post" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 28px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 14, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 18, textDecoration: 'none' }}>
          ← Back to categories
        </Link>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<AllCategories />} />
      <Route path="/housing" element={<Housing />} />
      <Route path="/housing/:id" element={<HousingDetail />} />
      <Route path="/roommates" element={<Roommates />} />
      <Route path="/roommates/:id" element={<RoommateDetail />} />
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/buy-sell/:id" element={<BuySellDetail />} />
      <Route path="/teach-and-coach" element={<TeachAndCoach />} />
      <Route path="/teach-and-coach/:id" element={<TeachAndCoachDetail />} />
      <Route path="/trip" element={<Trip />} />
      <Route path="/trip/:id" element={<TripDetail />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/friends/:id" element={<FriendsDetail />} />
      <Route path="/for-businesses" element={<ForBusinesses />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/post" element={<PostListing />} />
      <Route path="/profile/post/housing" element={<CreateHousingListing />} />
      <Route path="/profile/post/housing/edit/:id" element={<CreateHousingListing />} />
      <Route path="/profile/post/housing/edit/:id/photos" element={<CreateHousingPhotos />} />
      <Route path="/profile/post/housing/edit/:id/review" element={<CreateHousingReview />} />
      <Route path="/profile/post/roommates" element={<CreateRoommateListing />} />
      <Route path="/profile/post/roommates/edit/:id" element={<CreateRoommateListing />} />
      <Route path="/profile/post/roommates/edit/:id/preferences" element={<RoommatePreferences />} />
      <Route path="/profile/post/roommates/edit/:id/review" element={<RoommateReview />} />
      <Route path="/tutor" element={<Navigate to="/teach-and-coach" replace />} />
      <Route path="/profile/post/tutor" element={<Navigate to="/profile/post/teach-and-coach" replace />} />
      <Route path="/profile/post/tutor/course-details" element={<Navigate to="/profile/post/teach-and-coach/course-details" replace />} />
      <Route path="/profile/post/tutor/review" element={<Navigate to="/profile/post/teach-and-coach/review" replace />} />
      <Route path="/profile/post/teach-and-coach" element={<CreateTeachAndCoachListing />} />
      <Route path="/profile/post/teach-and-coach/course-details" element={<CreateTeachAndCoachCourseDetails />} />
      <Route path="/profile/post/teach-and-coach/review" element={<CreateTeachAndCoachReview />} />
      <Route path="/profile/post/trip" element={<CreateTripListing />} />
      <Route path="/profile/post/trip/edit/:id" element={<CreateTripListing />} />
      <Route path="/profile/post/trip/edit/:id/photos" element={<CreateTripPhotos />} />
      <Route path="/profile/post/trip/edit/:id/review" element={<CreateTripReview />} />
      <Route path="/profile/post/buy-sell" element={<CreateBuySellListing />} />
      <Route path="/profile/post/buy-sell/edit/:id" element={<CreateBuySellListing />} />
      <Route path="/profile/post/buy-sell/edit/:id/photos" element={<BuySellPhotos />} />
      <Route path="/profile/post/buy-sell/edit/:id/review" element={<BuySellReview />} />
      <Route path="/profile/post/buy-sell/:id/photos" element={<BuySellPhotos />} />
      <Route path="/profile/post/buy-sell/:id/review" element={<BuySellReview />} />
      <Route path="/profile/post/friend" element={<CreateFriendListing />} />
      <Route path="/profile/post/friend/vibe" element={<CreateFriendVibe />} />
      <Route path="/profile/post/friend/review" element={<CreateFriendReview />} />
      <Route path="/profile/post/friend/edit/:id" element={<CreateFriendListing />} />
      <Route path="/profile/post/friend/edit/:id/vibe" element={<CreateFriendVibe />} />
      <Route path="/profile/post/friend/edit/:id/review" element={<CreateFriendReview />} />
      <Route path="/profile/post/:category" element={<CategoryComingSoon />} />
    </Routes>
    </Suspense>
    </>
  )
}
