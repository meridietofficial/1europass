import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Category {
  slug: string
  name: string
  desc: string
  img: string
  color: string
}

const CATEGORIES: Category[] = [
  { slug: 'housing', name: 'Housing', desc: 'Rooms, flats & apartments', img: '/cat-housing.png', color: '#e8f5e9' },
  { slug: 'jobs', name: 'Jobs', desc: 'Part-time, full-time & internships', img: '/cat-jobs.png', color: '#fff8e1' },
  { slug: 'roommates', name: 'Roommates', desc: 'Find or become a roommate', img: '/cat-roommates.png', color: '#fce4ec' },
  { slug: 'buy-sell', name: 'Buy & Sell', desc: 'Furniture, bikes, books & more', img: '/cat-buysell.png', color: '#e3f2fd' },
  { slug: 'restaurants', name: 'Restaurants', desc: 'Food, cafés & takeaway', img: '/cat-restaurants.png', color: '#fff3e0' },
  { slug: 'gyms', name: 'Gyms & Fitness', desc: 'Gyms, yoga & fitness studios', img: '/cat-gyms.png', color: '#f3e5f5' },
  { slug: 'events', name: 'Events', desc: 'Parties, workshops & activities', img: '/cat-events.png', color: '#e0f7fa' },
  { slug: 'services', name: 'Local Services', desc: 'Laundry, printing, repair & more', img: '/cat-services.png', color: '#e8eaf6' },
  { slug: 'tutor', name: 'Tutor', desc: 'Academic help & study support', img: '/cat-tutor.svg', color: '#fffde7' },
  { slug: 'friend', name: 'Friend', desc: 'Meet like-minded friends', img: '/cat-friend.svg', color: '#fbe9e7' },
]

export default function PostListing() {
  const navigate = useNavigate()

  function handleSelect(slug: string) {
    navigate(`/profile/post/${slug}`)
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

          <div className="post-listing-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className="post-cat-card"
                style={{ '--card-bg': cat.color } as React.CSSProperties}
                onClick={() => handleSelect(cat.slug)}
              >
                <div className="post-cat-card__img-wrap">
                  <img src={cat.img} alt={cat.name} className="post-cat-card__img" />
                </div>
                <div className="post-cat-card__body">
                  <span className="post-cat-card__name">{cat.name}</span>
                  <span className="post-cat-card__desc">{cat.desc}</span>
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
      </main>
      <Footer />
    </>
  )
}
