import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

interface Props {
  name: string
}

export default function CategoryComingSoon({ name }: Props) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: '60px 24px', background: '#f5f4ed' }}>
        <div style={{ fontSize: 48 }}>🚧</div>
        <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 32, color: '#1a1a1a', textAlign: 'center' }}>{name} — coming soon!</h2>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#888', maxWidth: 360, textAlign: 'center' }}>
          We're working on this category. Check back soon!
        </p>
        <Link to="/categories" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 28px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 14, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 18, textDecoration: 'none' }}>
          ← Back to categories
        </Link>
      </main>
      <Footer />
    </>
  )
}
