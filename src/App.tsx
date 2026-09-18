import { Routes, Route, useParams, Link, useLocation } from 'react-router-dom'
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
const BuySell = lazy(() => import('./pages/BuySell'))
const BuySellDetail = lazy(() => import('./pages/BuySellDetail'))
const Tutor = lazy(() => import('./pages/Tutor'))
const CreateBuySellListing = lazy(() => import('./pages/CreateBuySellListing'))
const CreateTutorListing = lazy(() => import('./pages/CreateTutorListing'))
const CreateTutorCourseDetails = lazy(() => import('./pages/CreateTutorCourseDetails'))
const CreateTutorReview = lazy(() => import('./pages/CreateTutorReview'))
const Trip = lazy(() => import('./pages/Trip'))
const Friends = lazy(() => import('./pages/Friends'))
const CreateTripListing = lazy(() => import('./pages/CreateTripListing'))
const CreateTripPhotos = lazy(() => import('./pages/CreateTripPhotos'))
const CreateTripReview = lazy(() => import('./pages/CreateTripReview'))
const BuySellPhotos = lazy(() => import('./pages/BuySellPhotos'))
const BuySellReview = lazy(() => import('./pages/BuySellReview'))
const ForBusinesses = lazy(() => import('./pages/ForBusinesses'))
const Blog = lazy(() => import('./pages/Blog'))
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
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
      <Route path="/buy-sell" element={<BuySell />} />
      <Route path="/buy-sell/:id" element={<BuySellDetail />} />
      <Route path="/tutor" element={<Tutor />} />
      <Route path="/trip" element={<Trip />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/for-businesses" element={<ForBusinesses />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/post" element={<PostListing />} />
      <Route path="/profile/post/housing" element={<CreateHousingListing />} />
      <Route path="/profile/post/housing/edit/:id" element={<CreateHousingListing />} />
      <Route path="/profile/post/housing/edit/:id/photos" element={<CreateHousingPhotos />} />
      <Route path="/profile/post/housing/edit/:id/review" element={<CreateHousingReview />} />
      <Route path="/profile/post/roommates" element={<CreateRoommateListing />} />
      <Route path="/profile/post/roommates/preferences" element={<RoommatePreferences />} />
      <Route path="/profile/post/roommates/review" element={<RoommateReview />} />
      <Route path="/profile/post/tutor" element={<CreateTutorListing />} />
      <Route path="/profile/post/tutor/course-details" element={<CreateTutorCourseDetails />} />
      <Route path="/profile/post/tutor/review" element={<CreateTutorReview />} />
      <Route path="/profile/post/trip" element={<CreateTripListing />} />
      <Route path="/profile/post/trip/photos" element={<CreateTripPhotos />} />
      <Route path="/profile/post/trip/review" element={<CreateTripReview />} />
      <Route path="/profile/post/buy-sell" element={<CreateBuySellListing />} />
      <Route path="/profile/post/buy-sell/photos" element={<BuySellPhotos />} />
      <Route path="/profile/post/buy-sell/review" element={<BuySellReview />} />
      <Route path="/profile/post/:category" element={<CategoryComingSoon />} />
    </Routes>
    </Suspense>
    </>
  )
}
