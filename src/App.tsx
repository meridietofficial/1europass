import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AllCategories from './pages/AllCategories'
import Housing from './pages/Housing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<AllCategories />} />
      <Route path="/housing" element={<Housing />} />
    </Routes>
  )
}
