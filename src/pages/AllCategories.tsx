import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Category {
  name: string
  desc: string
  img: string
}

const ALL_CATEGORIES: Category[] = [
  { name: 'Housing',        desc: 'Rooms, flats\n& apartments',             img: '/cat-housing.png' },
  { name: 'Jobs',           desc: 'Part-time, full-time\n& internships',     img: '/cat-jobs.png' },
  { name: 'Roommates',      desc: 'Find or become\na roommate',              img: '/cat-roommates.png' },
  { name: 'Buy & Sell',     desc: 'Furniture, bikes,\nbooks & more',         img: '/cat-buysell.png' },
  { name: 'Restaurants',    desc: 'Food, cafés\n& takeaway',                 img: '/cat-restaurants.png' },
  { name: 'Gyms & Fitness', desc: 'Gyms, yoga &\nfitness studios',           img: '/cat-gyms.png' },
  { name: 'Events',         desc: 'Parties, workshops\n& activities',        img: '/cat-events.png' },
  { name: 'Local Services', desc: 'Laundry, printing,\nrepair & more',       img: '/cat-services.png' },
  { name: 'Student Deals',  desc: 'Exclusive discounts\nfor students',       img: '/cat-buysell.png' },
  { name: 'Transportation', desc: 'Bikes, scooters\n& car sharing',          img: '/cat-services.png' },
  { name: 'Tutoring',       desc: 'Study help &\nlanguage lessons',          img: '/cat-jobs.png' },
  { name: 'Entertainment',  desc: 'Cinemas, clubs\n& activities',            img: '/cat-events.png' },
]

const CATEGORY_ROUTES: Record<string, string> = {
  'Housing':    '/housing',
  'Roommates':  '/roommates',
  'Buy & Sell': '/buy-sell',
  'Tutoring':   '/tutor',
}

export default function AllCategories() {
  const navigate = useNavigate()

  return (
    <>
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
          <div className="allcat__cat-grid">
            {ALL_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => CATEGORY_ROUTES[cat.name] && navigate(CATEGORY_ROUTES[cat.name])}
              >
                <div className="category-card__icon-wrap">
                  <img src={cat.img} alt={cat.name} className="category-card__img" />
                </div>
                <div className="category-card__name">{cat.name}</div>
                <div className="category-card__desc">
                  {cat.desc.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 ? <br /> : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
