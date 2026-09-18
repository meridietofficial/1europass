import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const STATS = [
  { value: '1M+', label: 'Students reached' },
  { value: '30+', label: 'Countries covered' },
  { value: '50K+', label: 'Active listings/month' },
  { value: '€1', label: 'To get started' },
]

const OFFERINGS = [
  { icon: '💼', title: 'Post Job Listings', desc: 'Hire motivated students for part-time, internship, or full-time roles across Europe.' },
  { icon: '🎓', title: 'Offer Student Deals', desc: 'Promote exclusive discounts to thousands of verified students across Europe and the UK.' },
  { icon: '📢', title: 'Advertise Services', desc: 'Put your business in front of students who need exactly what you offer.' },
  { icon: '⭐', title: 'Sponsored Listings', desc: 'Boost your visibility with sponsored placement at the top of category pages.' },
]

const STEPS = [
  { num: 1, title: 'Create an account', desc: 'Sign up as a business in minutes — no lengthy approval process.' },
  { num: 2, title: 'Choose your plan', desc: 'Pick the option that fits your goal, from a single listing to a full campaign.' },
  { num: 3, title: 'Reach students instantly', desc: 'Your listing goes live across Europe & UK immediately.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '€9',
    per: '/month',
    features: ['1 active listing', 'Standard visibility', 'Email support', 'Basic analytics'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '€29',
    per: '/month',
    features: ['5 active listings', 'Boosted visibility', 'Priority support', 'Full analytics', 'Student deal badge'],
    cta: 'Start Growing',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    per: '',
    features: ['Unlimited listings', 'Sponsored placement', 'Dedicated account manager', 'Custom integrations', 'API access'],
    cta: 'Contact Us',
    highlight: false,
  },
]

export default function ForBusinesses() {
  return (
    <>
      <Helmet>
        <title>For Businesses — Reach Students Across Europe — 1 Euro Pass</title>
        <meta name="description" content="Advertise to 1M+ students across Europe & UK. List your business, restaurant, gym or service on 1 Euro Pass and reach international students." />
        <link rel="canonical" href="https://1europass.com/for-businesses" />
      </Helmet>
      <Navbar />
      <main>

        {/* ── HERO (cream bg) ── */}
        <div style={{ padding: '48px 54px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 480px', maxWidth: 600 }}>
              <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 56, lineHeight: 1.1, color: '#1a1a1a', marginBottom: 20 }}>
                Reach millions of students{' '}
                <span style={{ color: '#5dae61', position: 'relative', display: 'inline-block' }}>
                  across Europe.
                  <img src="/underline.svg" alt="" style={{ position: 'absolute', bottom: -4, left: 0, width: '100%' }} />
                </span>
              </h1>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 16, fontWeight: 500, color: '#40493e', lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
                Partner with 1 Euro Pass to connect your business with over a million verified students. Post jobs, offer deals, and advertise services — all in one place.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 66, padding: '16px 32px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 16, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20, cursor: 'pointer' }}>
                  🚀 Get Started
                </button>
                <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 66, padding: '16px 32px', background: '#fff', color: '#1a1a1a', border: '2px solid #1a1a1a', borderRadius: 16, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20, cursor: 'pointer' }}>
                  📞 Talk to us
                </button>
              </div>
            </div>

            <div style={{ flex: '1 1 280px', maxWidth: 340, background: '#fff', border: '2.25px solid #1a1a1a', borderRadius: 27, boxShadow: '4px 4px 0 #1a1a1a', padding: '32px 28px' }}>
              <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a', marginBottom: 20 }}>Why businesses choose us</div>
              {['✅ Verified student audience', '✅ 30+ countries, one platform', '✅ Affordable & transparent pricing', '✅ Easy self-serve dashboard', '✅ Real-time analytics'].map((item) => (
                <div key={item} style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#333', marginBottom: 12 }}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div style={{ background: '#ffffff', borderRadius: 32, margin: '0 54px 64px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderBottom: '1.5px solid #f0ede4', padding: '40px 54px' }}>
            {STATS.map((s, i) => (
              <div key={s.value} style={{ textAlign: 'center', borderRight: i < 3 ? '1.5px solid #f0ede4' : 'none' }}>
                <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 48, color: '#5dae61', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#6b7280', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* What you can do */}
          <div style={{ padding: '56px 54px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 8 }}>What you can do with 1 Euro Pass</h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#888', marginBottom: 36 }}>Everything your business needs to connect with the student market.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {OFFERINGS.map((o) => (
                <div key={o.title} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '28px 24px', display: 'flex', gap: 18 }}>
                  <div style={{ width: 52, height: 52, background: '#fff', border: '1.5px solid #e0ddd4', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{o.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a', marginBottom: 8 }}>{o.title}</div>
                    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#666', lineHeight: 1.6 }}>{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div style={{ padding: '0 54px 56px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 36 }}>How it works for businesses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {STEPS.map((step) => (
                <div key={step.num} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '32px 24px', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, background: '#5dae61', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat Brush, cursive', fontSize: 24, margin: '0 auto 20px', border: '2px solid #1a1a1a', boxShadow: '2px 2px 0 #1a1a1a' }}>{step.num}</div>
                  <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a', marginBottom: 10 }}>{step.title}</div>
                  <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#666', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div style={{ padding: '0 54px 56px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 8 }}>Simple, honest pricing</h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#888', marginBottom: 36 }}>No hidden fees. No long-term contracts. Cancel anytime.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {PLANS.map((plan) => (
                <div key={plan.name} style={{ background: plan.highlight ? '#5dae61' : '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '32px 24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {plan.highlight && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#f4842c', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 999, padding: '3px 16px', fontFamily: 'Caveat Brush, cursive', fontSize: 14, whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 24, color: plan.highlight ? '#fff' : '#1a1a1a', marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 44, color: plan.highlight ? '#fff' : '#1a1a1a' }}>{plan.price}</span>
                    {plan.per && <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#888' }}>{plan.per}</span>}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                    {plan.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: plan.highlight ? 'rgba(255,255,255,0.9)' : '#444' }}>
                        <span style={{ color: plan.highlight ? '#d4fc79' : '#5dae61', fontWeight: 700 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <button type="button" style={{ padding: '12px 24px', background: plan.highlight ? '#fff' : '#5dae61', color: plan.highlight ? '#5dae61' : '#fff', border: '2.25px solid #1a1a1a', borderRadius: 14, boxShadow: '3px 3px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20, cursor: 'pointer', width: '100%' }}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA banner */}
          <div style={{ margin: '0 54px 56px', background: '#5dae61', border: '2.25px solid #1a1a1a', borderRadius: 22, boxShadow: '4px 4px 0 #1a1a1a', padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 36, color: '#fff', marginBottom: 10 }}>Ready to reach millions of students?</h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.8)', maxWidth: 440 }}>Join hundreds of businesses already growing with 1 Euro Pass.</p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexShrink: 0, flexWrap: 'wrap' }}>
              <button type="button" style={{ padding: '12px 28px', background: '#fff', color: '#5dae61', border: '2px solid #1a1a1a', borderRadius: 14, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20, cursor: 'pointer' }}>🚀 Get Started</button>
              <button type="button" style={{ padding: '12px 28px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', borderRadius: 14, fontFamily: 'Caveat Brush, cursive', fontSize: 20, cursor: 'pointer' }}>📩 Contact Us</button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
