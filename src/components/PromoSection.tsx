const BIZ_FEATURES = [
  { img: '/biz-promote.png',   text: 'Promote your\nbusiness\nto millions' },
  { img: '/biz-advertise.png', text: 'Affordable\nadvertising\nstarting at €1' },
  { img: '/biz-sales.png',     text: 'Increase sales\n& brand\nvisibility' },
]

const STATS = [
  { num: '50K+', label: 'Students' },
  { num: '20K+', label: 'Listings' },
  { num: '1M+',  label: 'Monthly Views' },
  { num: '100+', label: 'Cities' },
  { num: '8',    label: 'Countries' },
]

export default function PromoSection() {
  return (
    <section className="promo">
      <div className="section-inner">

        {/* ── For Businesses bar ── */}
        <div className="promo__biz">
          <div className="promo__biz-info">
            <h3 className="promo__biz-title">For Businesses</h3>
            <p className="promo__biz-sub">
              Reach international students<br />where they are.
            </p>
          </div>

          <div className="promo__biz-features">
            {BIZ_FEATURES.map((f) => (
              <div key={f.img} className="promo__biz-feature">
                <img src={f.img} alt="" className="promo__biz-icon" />
                <span>
                  {f.text.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>

          <button className="promo__biz-cta" type="button">Advertise Now</button>

          <img src="/biz-store.png" alt="" className="promo__biz-illustration" />
        </div>

        {/* ── Bottom row ── */}
        <div className="promo__bottom">

          {/* Community card */}
          <div className="promo__community">
            <div className="promo__community-content">
              <h3 className="promo__community-title">Join our community</h3>
              <p className="promo__community-desc">
                Connect with students, share experiences<br />& make new friends.
              </p>
              <button className="promo__community-btn" type="button">Join Community</button>
            </div>
            <img src="/community-people.png" alt="" className="promo__community-img" />
          </div>

          {/* Stats */}
          <div className="promo__stats">
            {STATS.map(({ num, label }) => (
              <div key={label} className="promo__stat">
                <span className="promo__stat-num">{num}</span>
                <span className="promo__stat-label">{label}</span>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="promo__testimonial">
            <img src="/quote-marks.png" alt="" className="promo__quote-mark" />
            <p className="promo__quote-text">
              Found my perfect room<br />and a part-time job in<br />just 3 days!
            </p>
            <p className="promo__quote-attr">- Anika, Berlin</p>
            <img src="/star-doodle.png" alt="" className="promo__testimonial-star" />
            <div className="promo__avatar" />
          </div>

        </div>
      </div>
    </section>
  )
}
