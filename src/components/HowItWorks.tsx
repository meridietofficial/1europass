import { Fragment } from 'react'

interface Step {
  num: number
  img: string
  name: string
  desc: string
}

const STEPS: Step[] = [
  { num: 1, img: '/step-browse.png', name: 'Browse', desc: 'Search listings\nacross Europe & UK' },
  { num: 2, img: '/step-post.png', name: 'Post', desc: 'List anything\nfor just €1' },
  { num: 3, img: '/step-connect.png', name: 'Connect', desc: 'Chat & connect\nwith others' },
  { num: 4, img: '/step-deal.png', name: 'Deal', desc: 'Close the deal\n& get it done!' },
]

const FEATURES = [
  'Unlimited browsing',
  'Post unlimited listings',
  'Get contact of 5 deals/month',
  'Verified student badge',
  'Exclusive student deals',
  'Cancel anytime',
]

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container how-it-works__inner">
        <div className="how-it-works__left">
          <h2 className="how-it-works__title">How 1 Euro Pass works</h2>

          <div className="how-it-works__steps">
            {STEPS.map((step, i) => (
              <Fragment key={step.num}>
                <div className="how-it-works__step">
                  <div className="how-it-works__step-icon-wrap">
                    <img
                      src={step.img}
                      alt={step.name}
                      className="how-it-works__step-img"
                    />
                    <div className="how-it-works__step-badge">{step.num}</div>
                  </div>
                  <div className="how-it-works__step-name">{step.name}</div>
                  <div className="how-it-works__step-desc">
                    {step.desc.split('\n').map((line, j) => (
                      <span key={j}>
                        {line}
                        {j === 0 ? <br /> : ''}
                      </span>
                    ))}
                  </div>
                </div>
                {i < STEPS.length - 1 && <div className="how-it-works__arrow">→</div>}
              </Fragment>
            ))}
          </div>

          <div className="how-it-works__tagline">
            <span className="how-it-works__tagline-icon">♡</span>
            Made for students. Trusted by thousands.
          </div>
        </div>

        <div className="how-it-works__pricing">
          <div className="pricing__coin">1</div>
          <div className="pricing__title">All this for</div>
          <div>
            <span className="pricing__price">€1</span>
            <span className="pricing__price-sub"> /month</span>
          </div>

          <div className="pricing__features">
            {FEATURES.map((f) => (
              <div key={f} className="pricing__feature">
                <div className="pricing__check">✓</div>
                {f}
              </div>
            ))}
          </div>

          <button className="pricing__cta" type="button">
            <span>🎓</span>
            Get 1 Euro Pass Now &rsaquo;
          </button>
        </div>
      </div>
    </section>
  )
}
