import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCategories, type Category } from '../api/categories'

const SLUG_ROUTES: Record<string, string> = {
  housing: '/housing',
  roommates: '/roommates',
  'buy-and-sell': '/buy-sell',
  'buy-sell': '/buy-sell',
  'buy_and_sell': '/buy-sell',
  'buy_sell': '/buy-sell',
  tutor: '/tutor',
  tutoring: '/tutor',
  trip: '/trip',
  trips: '/trip',
  friends: '/friends',
  friend: '/friends',
}

function categoryRoute(slug: string) {
  const normalised = slug.toLowerCase().replace(/_/g, '-')
  return SLUG_ROUTES[normalised] ?? SLUG_ROUTES[slug] ?? null
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="categories">
      <div className="container">
        <div className="categories__header">
          <h2 className="categories__title">
            Explore popular categories
            <img src="/star-icon.svg" alt="" className="categories__title-star" />
          </h2>
          <Link to="/categories" className="categories__view-all">
            View all categories →
          </Link>
        </div>

        <div className="categories__grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="category-card" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                  <div className="category-card__icon-wrap" style={{ background: '#e0ddd4' }} />
                  <div className="category-card__name" style={{ background: '#e0ddd4', color: 'transparent', borderRadius: 4 }}>Loading</div>
                </div>
              ))
            : categories.map((cat) => {
                const route = categoryRoute(cat.slug)
                return route ? (
                  <Link key={cat.id} to={route} className="category-card">
                    <div className="category-card__icon-wrap">
                      <img src={cat.icon} alt={cat.name} className="category-card__img" />
                    </div>
                    <div className="category-card__name">{cat.name}</div>
                    <div className="category-card__desc">{cat.description}</div>
                  </Link>
                ) : (
                  <div key={cat.id} className="category-card" style={{ opacity: 0.55, cursor: 'default' }}>
                    <div className="category-card__icon-wrap">
                      <img src={cat.icon} alt={cat.name} className="category-card__img" />
                    </div>
                    <div className="category-card__name">{cat.name}</div>
                    <div className="category-card__desc">{cat.description}</div>
                  </div>
                )
              })}
        </div>
      </div>
    </section>
  )
}
