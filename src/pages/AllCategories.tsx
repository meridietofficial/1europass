import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Category {
  name: string
  desc: string
  img: string
  accent: string
  bg: string
}

const ALL_CATEGORIES: Category[] = [
  { name: 'Housing',        desc: 'Rooms, flats & apartments',           img: '/cat-housing.png',    accent: '#F97316', bg: '#FFF4ED' },
  { name: 'Jobs',           desc: 'Part-time, full-time & internships',   img: '/cat-jobs.png',       accent: '#16A34A', bg: '#F0FDF4' },
  { name: 'Roommates',      desc: 'Find or become a roommate',            img: '/cat-roommates.png',  accent: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Buy & Sell',     desc: 'Furniture, bikes, books & more',       img: '/cat-buysell.png',    accent: '#9333EA', bg: '#FAF5FF' },
  { name: 'Restaurants',    desc: 'Food, cafés & takeaway',               img: '/cat-restaurants.png',accent: '#E11D48', bg: '#FFF1F2' },
  { name: 'Gyms & Fitness', desc: 'Gyms, yoga & fitness studios',         img: '/cat-gyms.png',       accent: '#0D9488', bg: '#F0FDFA' },
  { name: 'Events',         desc: 'Parties, workshops & activities',      img: '/cat-events.png',     accent: '#D97706', bg: '#FFFBEB' },
  { name: 'Local Services', desc: 'Laundry, printing, repair & more',     img: '/cat-services.png',   accent: '#0284C7', bg: '#F0F9FF' },
  { name: 'Student Deals',  desc: 'Exclusive discounts for students',     img: '/cat-buysell.png',    accent: '#DB2777', bg: '#FDF2F8' },
  { name: 'Transportation', desc: 'Bikes, scooters & car sharing',        img: '/cat-services.png',   accent: '#2563EB', bg: '#EFF6FF' },
  { name: 'Tutoring',       desc: 'Study help & language lessons',        img: '/cat-jobs.png',       accent: '#65A30D', bg: '#F7FEE7' },
  { name: 'Entertainment',  desc: 'Cinemas, clubs & activities',          img: '/cat-events.png',     accent: '#7C3AED', bg: '#F5F3FF' },
]

const CATEGORY_ROUTES: Record<string, string> = {
  'Housing': '/housing',
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
          <div className="allcat__grid">
            {ALL_CATEGORIES.map((cat, i) => (
              <div
                key={cat.name}
                className="allcat__card"
                onClick={() => CATEGORY_ROUTES[cat.name] && navigate(CATEGORY_ROUTES[cat.name])}
                style={{
                  '--accent': cat.accent,
                  '--bg': cat.bg,
                  animationDelay: `${i * 60}ms`,
                } as React.CSSProperties}
              >
                <div className="allcat__card-icon-area">
                  <div className="allcat__card-icon-ring">
                    <img src={cat.img} alt={cat.name} className="allcat__card-img" />
                  </div>
                </div>
                <div className="allcat__card-content">
                  <h3 className="allcat__card-name">{cat.name}</h3>
                  <p className="allcat__card-desc">{cat.desc}</p>
                  <span className="allcat__card-cta">Browse →</span>
                </div>
                <div className="allcat__card-bar" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
