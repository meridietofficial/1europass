import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchCategories, type Category } from '../api/categories'

const SLUG_ROUTES: Record<string, string> = {
  housing: '/housing',
  roommates: '/roommates',
  'buy-and-sell': '/buy-sell',
  tutor: '/tutor',
  trip: '/trip',
}

function categoryRoute(slug: string) {
  return SLUG_ROUTES[slug] ?? `/profile/post/${slug}`
}

export default function AllCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>All Categories — 1 Euro Pass</title>
        <meta name="description" content="Browse all student categories on 1 Euro Pass: housing, roommates, buy & sell, tutors, trips, friends and more across Europe & UK." />
        <link rel="canonical" href="https://1europass.com/categories" />
      </Helmet>
      <Navbar />
      <main className="allcat">
        <div className="allcat__hero">
          <p className="allcat__breadcrumb">
            <Link to="/">← Home</Link> / All Categories
          </p>
          <h1 className="allcat__title">All Categories</h1>
          <p className="allcat__subtitle">Browse everything available for students across Europe &amp; UK</p>
        </div>

        <div className="allcat__content-card">
          {error ? (
            <div style={{ textAlign: 'center', padding: '60px 24px', fontFamily: 'Poppins, sans-serif', color: '#888' }}>
              Failed to load categories. Please try again later.
            </div>
          ) : (
            <div className="allcat__cat-grid">
              {loading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="category-card" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                      <div className="category-card__icon-wrap" style={{ background: '#e0ddd4' }} />
                      <div className="category-card__name" style={{ background: '#e0ddd4', color: 'transparent', borderRadius: 4 }}>Loading</div>
                    </div>
                  ))
                : categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={categoryRoute(cat.slug)}
                      className="category-card"
                    >
                      <div className="category-card__icon-wrap">
                        <img src={cat.icon} alt={cat.name} className="category-card__img" />
                      </div>
                      <div className="category-card__name">{cat.name}</div>
                      <div className="category-card__desc">{cat.description}</div>
                    </Link>
                  ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
