import { useEffect, useRef } from 'react'

export default function ReachSection() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('is-visible')
          void el.offsetWidth // force reflow to restart animations
          el.classList.add('is-visible')
        } else {
          el.classList.remove('is-visible')
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="reach">
      <div className="section-inner reach__inner">

        {/* Left */}
        <div className="reach__left">
          <h2 className="reach__heading">
            Just 1 Euro can<br />
            <span className="reach__heading-accent">reach millions!</span>
          </h2>
          <ul className="reach__list">
            <li>Your listing is seen by thousands of students across Europe &amp; UK.</li>
            <li>More views, more contacts, more opportunities.</li>
            <li>Small price, huge impact.</li>
          </ul>
          <button className="reach__cta" type="button">Post Your Listing for €1</button>
        </div>

        {/* Middle — Map */}
        <div className="reach__map">
          <img src="/europe-map.svg" alt="Europe map" className="reach__map-img" />
        </div>

        {/* Right — Stats card */}
        <div className="reach__card" ref={cardRef}>
          <img src="/reach-card-doodle.svg" alt="" className="reach__card-doodle" />
          <h3 className="reach__card-title">
            <span className="reach__card-title-l1">List once.</span>
            <span className="reach__card-title-l2">Get seen everywhere.</span>
          </h3>
          <div className="reach__stats">
            <div className="reach__stat">
              <div className="reach__stat-icon">
                <i className="fas fa-house" />
              </div>
              <div>
                <div className="reach__stat-name">1 Listing</div>
                <div className="reach__stat-desc">Reach across Europe &amp; UK</div>
              </div>
            </div>
            <div className="reach__stat">
              <div className="reach__stat-icon">
                <i className="fas fa-user-group" />
              </div>
              <div>
                <div className="reach__stat-name">5 Contacts</div>
                <div className="reach__stat-desc">Open 5 contacts with 1 listing</div>
              </div>
            </div>
            <div className="reach__stat">
              <div className="reach__stat-icon">
                <i className="fas fa-eye" />
              </div>
              <div>
                <div className="reach__stat-name">1 Million+</div>
                <div className="reach__stat-desc">Potential students can see you</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
