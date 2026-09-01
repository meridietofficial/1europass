import { Link } from 'react-router-dom'

interface Category {
  name: string
  desc: string
  img: string
  to?: string
}

const CATEGORIES: Category[] = [
  { name: 'Housing',       desc: 'Rooms, flats\n& apartments',          img: '/cat-housing.png',    to: '/housing' },
  { name: 'Roommates',     desc: 'Find or become\na roommate',           img: '/cat-roommates.png',  to: '/roommates' },
  { name: 'Buy & Sell',    desc: 'Furniture, bikes,\nbooks & more',      img: '/cat-buysell.png',    to: '/buy-sell' },
  { name: 'Tutor',         desc: 'Academic help\n& Study Support',       img: '/cat-tutor.svg',      to: '/tutor' },
  { name: 'Jobs',          desc: 'Part-time, full-time\n& internships',  img: '/cat-jobs.png' },
  { name: 'Restaurants',   desc: 'Food, cafés\n& takeaway',              img: '/cat-restaurants.png' },
  { name: 'Gyms & Fitness',desc: 'Gyms, yoga &\nfitness studios',        img: '/cat-gyms.png' },
  { name: 'Events',        desc: 'Parties, workshops\n& activities',     img: '/cat-events.png' },
  { name: 'Local Services',desc: 'Laundry, printing,\nrepair & more',    img: '/cat-services.png' },
  { name: 'Friend',        desc: 'Meet like-minded\nfriends',            img: '/cat-friend.svg' },
]

export default function Categories() {
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
          {CATEGORIES.map((cat) =>
            cat.to ? (
              <Link key={cat.name} to={cat.to} className="category-card">
                <div className="category-card__icon-wrap">
                  <img src={cat.img} alt={cat.name} className="category-card__img" />
                </div>
                <div className="category-card__name">{cat.name}</div>
                <div className="category-card__desc">
                  {cat.desc.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
                  ))}
                </div>
              </Link>
            ) : (
              <div key={cat.name} className="category-card">
                <div className="category-card__icon-wrap">
                  <img src={cat.img} alt={cat.name} className="category-card__img" />
                </div>
                <div className="category-card__name">{cat.name}</div>
                <div className="category-card__desc">
                  {cat.desc.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
