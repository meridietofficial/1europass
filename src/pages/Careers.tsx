import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ROLES = [
  { title: 'Full-Stack Engineer', team: 'Engineering', location: 'Remote · Europe', type: 'Full-time', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { title: 'Product Designer', team: 'Design', location: 'Remote · Europe', type: 'Full-time', gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
  { title: 'Growth Marketing Manager', team: 'Growth', location: 'Remote · Europe', type: 'Full-time', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { title: 'Student Community Lead', team: 'Community', location: 'Remote · Europe & UK', type: 'Part-time', gradient: 'linear-gradient(135deg, #c3cfe2, #f5f7fa)' },
  { title: 'Customer Support Specialist', team: 'Operations', location: 'Remote · Anywhere', type: 'Full-time', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { title: 'Campus Ambassador', team: 'Community', location: 'On-campus · Europe & UK', type: 'Internship', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
]

const PERKS = [
  { icon: '🌍', title: 'Fully remote', desc: 'Work from anywhere in Europe and the UK.' },
  { icon: '📚', title: 'Learning budget', desc: '€1,000/year for courses, books and conferences.' },
  { icon: '🏖️', title: 'Flexible holidays', desc: 'Unlimited paid time off — seriously.' },
  { icon: '💸', title: 'Competitive pay', desc: 'Market-rate salaries with equity for full-time roles.' },
  { icon: '🎓', title: 'Student mindset', desc: 'We never stop learning. Curiosity is celebrated here.' },
  { icon: '🤝', title: 'Diverse team', desc: '15+ nationalities. Every voice matters.' },
]

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  'Full-time':  { bg: '#e8f5e9', color: '#2a5c44' },
  'Part-time':  { bg: '#fff8e1', color: '#b45309' },
  'Internship': { bg: '#e3f2fd', color: '#1565c0' },
}

export default function Careers() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO (cream bg) ── */}
        <div style={{ padding: '48px 54px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 460px', maxWidth: 600 }}>
            <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 52, color: '#1a1a1a', lineHeight: 1.1, marginBottom: 18 }}>
              Help us build the{' '}
              <span style={{ color: '#5dae61' }}>student platform</span>{' '}
              for Europe.
            </h1>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 500, color: '#40493e', lineHeight: 1.8, maxWidth: 500, marginBottom: 32 }}>
              We're a small, fast-moving team on a mission to make student life easier. If you care about impact and love building things, we want to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#open-roles" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 66, padding: '16px 32px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 16, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20 }}>
                See open roles ↓
              </a>
              <a href="mailto:careers@1europass.com" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 66, padding: '16px 32px', background: '#fff', color: '#1a1a1a', border: '2px solid #1a1a1a', borderRadius: 16, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20 }}>
                Send us your CV
              </a>
            </div>
          </div>

          <div style={{ flex: '1 1 260px', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[{ num: `${ROLES.length}`, label: 'Open positions' }, { num: '15+', label: 'Nationalities on our team' }, { num: '100%', label: 'Remote-friendly' }].map((item) => (
              <div key={item.label} style={{ background: '#fff', border: '2.25px solid #1a1a1a', borderRadius: 16, boxShadow: '3px 3px 0 #1a1a1a', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 36, color: '#5dae61', flexShrink: 0 }}>{item.num}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#555' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div style={{ background: '#ffffff', borderRadius: 32, margin: '0 54px 64px' }}>

          {/* Perks */}
          <div style={{ padding: '56px 54px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 32 }}>Why work with us?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {PERKS.map((perk) => (
                <div key={perk.title} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: 30 }}>{perk.icon}</div>
                  <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a' }}>{perk.title}</div>
                  <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#666', lineHeight: 1.6 }}>{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open roles */}
          <div id="open-roles" style={{ padding: '0 54px 56px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 6 }}>Open roles</h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#888', marginBottom: 32 }}>{ROLES.length} positions · All remote unless stated</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ROLES.map((role) => (
                <div key={role.title} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 18, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <div style={{ width: 44, height: 44, background: role.gradient, borderRadius: 12, border: '1.5px solid #e0ddd4', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a' }}>{role.title}</div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 500, color: '#888', marginTop: 2 }}>{role.team} · {role.location}</div>
                  </div>
                  <span style={{ padding: '4px 14px', background: TYPE_COLORS[role.type]?.bg ?? '#f5f4ed', border: '1.5px solid #e0ddd4', borderRadius: 999, fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700, color: TYPE_COLORS[role.type]?.color ?? '#444' }}>
                    {role.type}
                  </span>
                  <button type="button" style={{ padding: '10px 22px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 12, boxShadow: '3px 3px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>
                    Apply →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA banner */}
          <div style={{ margin: '0 54px 56px', background: '#5dae61', border: '2.25px solid #1a1a1a', borderRadius: 22, boxShadow: '4px 4px 0 #1a1a1a', padding: '48px 40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 36, color: '#fff', marginBottom: 10 }}>Don't see the right role?</h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>
              We're always on the lookout for great people. Send us your CV and tell us how you'd like to contribute.
            </p>
            <a href="mailto:careers@1europass.com" style={{ display: 'inline-block', padding: '12px 32px', background: '#fff', color: '#5dae61', border: '2px solid #1a1a1a', borderRadius: 14, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20 }}>
              📩 careers@1europass.com
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
