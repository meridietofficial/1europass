import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchCategories, type Category } from '../api/categories'


export default function PostListing() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {})
  }, [])

  const SLUG_MAP: Record<string, string> = {
    'buy-and-sell': 'buy-sell',
  }

  function handleSelect(slug: string) {
    navigate(`/profile/post/${SLUG_MAP[slug] ?? slug}`)
  }

  return (
    <>
      <Navbar />
      <main className="post-listing-page">
        <div className="post-listing-page__inner">
          <div className="post-listing-breadcrumb">
            <Link to="/">Home</Link>
            <span className="post-listing-breadcrumb__sep">/</span>
            <Link to="/profile">My Profile</Link>
            <span className="post-listing-breadcrumb__sep">/</span>
            <span>Post a Listing</span>
          </div>

          <div className="post-listing-header">
            <h1 className="post-listing-header__title">
              What would you like to post?
            </h1>
            <p className="post-listing-header__sub">
              Pick a category and we'll guide you through the rest. Listing for just €1.
            </p>
          </div>

          <div className="post-listing-card">
            <div className="post-listing-grid">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  className="post-cat-card"
                  style={{ '--card-bg': '#ffffff' } as React.CSSProperties}
                  onClick={() => handleSelect(cat.slug)}
                >
                  <div className="post-cat-card__img-wrap">
                    <img src={cat.icon} alt={cat.name} className="post-cat-card__img" />
                  </div>
                  <div className="post-cat-card__body">
                    <span className="post-cat-card__name">{cat.name}</span>
                    <span className="post-cat-card__desc">{cat.description}</span>
                  </div>
                  <div className="post-cat-card__arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
