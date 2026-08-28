import { Routes, Route, useParams, Link } from 'react-router-dom'
import Home from './pages/Home'
import AllCategories from './pages/AllCategories'
import Housing from './pages/Housing'
import HousingDetail from './pages/HousingDetail'
import Profile from './pages/Profile'
import PostListing from './pages/PostListing'
import CreateHousingListing from './pages/CreateHousingListing'
import CreateHousingPhotos from './pages/CreateHousingPhotos'
import CreateHousingReview from './pages/CreateHousingReview'
import CreateRoommateListing from './pages/CreateRoommateListing'
import RoommatePreferences from './pages/RoommatePreferences'
import RoommateReview from './pages/RoommateReview'
import CreateBuySellListing from './pages/CreateBuySellListing'
import BuySellPhotos from './pages/BuySellPhotos'
import BuySellReview from './pages/BuySellReview'
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<AllCategories />} />
      <Route path="/housing" element={<Housing />} />
      <Route path="/housing/:id" element={<HousingDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/post" element={<PostListing />} />
      <Route path="/profile/post/housing" element={<CreateHousingListing />} />
      <Route path="/profile/post/housing/photos" element={<CreateHousingPhotos />} />
      <Route path="/profile/post/housing/review" element={<CreateHousingReview />} />
      <Route path="/profile/post/roommates" element={<CreateRoommateListing />} />
      <Route path="/profile/post/roommates/preferences" element={<RoommatePreferences />} />
      <Route path="/profile/post/roommates/review" element={<RoommateReview />} />
      <Route path="/profile/post/buy-sell" element={<CreateBuySellListing />} />
      <Route path="/profile/post/buy-sell/photos" element={<BuySellPhotos />} />
      <Route path="/profile/post/buy-sell/review" element={<BuySellReview />} />
      <Route path="/profile/post/:category" element={<CategoryComingSoon />} />
    </Routes>
  )
}
