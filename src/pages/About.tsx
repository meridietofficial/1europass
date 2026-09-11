import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const STATS = [
  { value: '1M+', label: 'Students across Europe & UK' },
  { value: '30+', label: 'Countries covered' },
  { value: '€1', label: 'To list anything' },
  { value: '2024', label: 'Founded by students' },
]

const VALUES = [
  { icon: '🎓', title: 'Students first', desc: "Every decision we make starts with one question: does this make student life easier? If not, we don't build it." },
  { icon: '🌍', title: 'Borderless community', desc: 'We believe students across Europe and the UK deserve one simple platform — not 30 different local sites.' },
  { icon: '💚', title: 'Radically affordable', desc: "Students are on tight budgets. That's why everything on 1 Euro Pass costs just €1 — no surprises, ever." },
  { icon: '🔒', title: 'Safety & trust', desc: 'Verified profiles, transparent reviews, and a dedicated support team keep our community safe and real.' },
]

const TEAM = [
  { name: 'Manish', role: 'Co-founder & CEO', gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { name: 'Sofia', role: 'Co-founder & CPO', gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
  { name: 'Leon', role: 'Head of Engineering', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { name: 'Priya', role: 'Head of Growth', gradient: 'linear-gradient(135deg, #c3cfe2, #f5f7fa)' },
]

export default function About() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO (cream bg) ── */}
        <div style={{ padding: '48px 54px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 460px', maxWidth: 580 }}>
            <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 52, color: '#1a1a1a', lineHeight: 1.1, marginBottom: 18 }}>
              Built by students,<br />
              <span style={{ color: '#5dae61' }}>for students.</span>
            </h1>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 500, color: '#40493e', lineHeight: 1.8, maxWidth: 480 }}>
              1 Euro Pass started because we were frustrated. Finding a room, selling a bike, connecting with a tutor — it all cost too much and took too long. So we built something better.
            </p>
          </div>
          <div style={{ flex: '1 1 280px', maxWidth: 340, background: '#fff', border: '2.25px solid #1a1a1a', borderRadius: 27, boxShadow: '4px 4px 0 #1a1a1a', padding: '36px 32px' }}>
            <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 26, color: '#5dae61', marginBottom: 14 }}>Our mission</div>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#40493e', lineHeight: 1.8 }}>
              To give every student in Europe and the UK access to affordable housing, services, and community — all for the price of a coffee.
            </p>
            <div style={{ marginTop: 20, fontFamily: 'Caveat Brush, cursive', fontSize: 18, color: '#888' }}>— The 1 Euro Pass Team</div>
          </div>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div style={{ background: '#ffffff', borderRadius: 32, margin: '0 54px 64px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '40px 54px', borderBottom: '1.5px solid #f0ede4' }}>
            {STATS.map((s, i) => (
              <div key={s.value} style={{ textAlign: 'center', borderRight: i < 3 ? '1.5px solid #f0ede4' : 'none' }}>
                <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 48, color: '#5dae61', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#6b7280', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Our story */}
          <div style={{ padding: '56px 54px', display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 360px' }}>
              <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 24 }}>Our story</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'We were students ourselves — juggling rent, textbooks, part-time jobs and a social life on a shoestring budget.',
                  'We noticed the same problem across every city in Europe: too many platforms, too many fees, and nothing designed with students in mind.',
                  'In 2024, we launched 1 Euro Pass with a simple idea — one platform, one price, all the essentials a student needs.',
                  "Today, over a million students across 30+ countries use 1 Euro Pass every month. And we're just getting started.",
                ].map((para, i) => (
                  <p key={i} style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#555', lineHeight: 1.8 }}>{para}</p>
                ))}
              </div>
            </div>
            <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { year: '2024', event: 'Founded in Berlin by two international students' },
                { year: '2025', event: 'Expanded to 15 countries across Europe' },
                { year: '2026', event: '1 million students — and counting' },
              ].map((item) => (
                <div key={item.year} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 16, boxShadow: '3px 3px 0 #1a1a1a', padding: '18px 22px' }}>
                  <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 24, color: '#5dae61', flexShrink: 0 }}>{item.year}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#444', lineHeight: 1.6 }}>{item.event}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div style={{ padding: '0 54px 56px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 32 }}>What we stand for</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {VALUES.map((v) => (
                <div key={v.title} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '26px 24px', display: 'flex', gap: 18 }}>
                  <div style={{ width: 50, height: 50, background: '#e8f5e9', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{v.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a', marginBottom: 8 }}>{v.title}</div>
                    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#666', lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div style={{ padding: '0 54px 56px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 32 }}>Meet the team</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {TEAM.map((member) => (
                <div key={member.name} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, overflow: 'hidden', textAlign: 'center' }}>
                  <div style={{ background: member.gradient, height: 110 }} />
                  <div style={{ padding: '14px 16px 22px' }}>
                    <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a', marginBottom: 4 }}>{member.name}</div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#888' }}>{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA banner */}
          <div style={{ margin: '0 54px 56px', background: '#5dae61', border: '2.25px solid #1a1a1a', borderRadius: 22, boxShadow: '4px 4px 0 #1a1a1a', padding: '48px 40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 36, color: '#fff', marginBottom: 10 }}>Want to be part of the story?</h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>Join our team or partner with us to reach students across Europe and the UK.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/careers" style={{ padding: '12px 28px', background: '#fff', color: '#5dae61', border: '2px solid #1a1a1a', borderRadius: 14, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20 }}>View open roles →</a>
              <a href="mailto:hello@1europass.com" style={{ padding: '12px 28px', background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 14, fontFamily: 'Caveat Brush, cursive', fontSize: 20 }}>Get in touch</a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
