import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FEATURED = {
  tag: 'Student Life',
  title: 'How to find affordable housing in Europe as an international student',
  excerpt: "Moving to a new country is exciting — but finding a place to stay can be stressful. Here's everything you need to know to land the perfect room without breaking the bank.",
  date: 'August 28, 2026',
  readTime: '6 min read',
  gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)',
}

const POSTS = [
  { tag: 'Tips', title: '5 things to check before signing a rental agreement', excerpt: "Don't get caught off guard. Here are the key clauses every student should look for.", date: 'Aug 20, 2026', readTime: '4 min read', gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { tag: 'Community', title: 'Real stories: Students who found their flatmate on 1 Euro Pass', excerpt: "We spoke to three students who used our platform to find roommates — here's what they said.", date: 'Aug 15, 2026', readTime: '5 min read', gradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
  { tag: 'News', title: '1 Euro Pass is now live in 30+ countries across Europe & UK', excerpt: "We're expanding fast. Check if your city is on the list and start posting today.", date: 'Aug 10, 2026', readTime: '3 min read', gradient: 'linear-gradient(135deg, #c3cfe2, #f5f7fa)' },
  { tag: 'Tips', title: 'Buy & Sell smart: how to list second-hand items students actually want', excerpt: 'Photos, pricing, descriptions — we break down what makes a listing get sold fast.', date: 'Aug 5, 2026', readTime: '4 min read', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { tag: 'Student Life', title: 'The ultimate guide to student budgeting in 2026', excerpt: "Rent, groceries, transport — here's how top students across Europe manage their money.", date: 'Jul 28, 2026', readTime: '7 min read', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { tag: 'Community', title: 'Meet the tutors: students helping students across Europe', excerpt: 'From maths to languages, our tutor community is growing. Here are their stories.', date: 'Jul 20, 2026', readTime: '5 min read', gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)' },
]

const TAGS = ['All', 'Tips', 'Student Life', 'Community', 'News']

export default function Blog() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO (cream bg) ── */}
        <div style={{ padding: '48px 54px 32px' }}>
          <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 52, color: '#1a1a1a', marginBottom: 10, lineHeight: 1.1 }}>
            Tips, stories &{' '}
            <span style={{ color: '#5dae61' }}>student life.</span>
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 500, color: '#555', maxWidth: 480 }}>
            Guides, community stories and news from across the 1 Euro Pass world.
          </p>
        </div>

        {/* ── WHITE CONTENT CARD ── */}
        <div style={{ background: '#ffffff', borderRadius: 32, margin: '0 54px 64px' }}>

          {/* Featured post */}
          <div style={{ padding: '48px 54px 40px' }}>
            <div style={{ background: FEATURED.gradient, border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '40px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 260 }}>
              <span style={{ display: 'inline-block', background: '#fff', border: '1.5px solid #1a1a1a', borderRadius: 999, padding: '4px 14px', fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 700, color: '#2a5c44', width: 'fit-content' }}>
                ⭐ Featured · {FEATURED.tag}
              </span>
              <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 32, color: '#1a1a1a', maxWidth: 640, lineHeight: 1.2 }}>{FEATURED.title}</h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#333', maxWidth: 580, lineHeight: 1.7 }}>{FEATURED.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#555' }}>{FEATURED.date}</span>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#888' }}>· {FEATURED.readTime}</span>
                <button type="button" style={{ marginLeft: 'auto', padding: '10px 24px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 12, boxShadow: '3px 3px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 18, cursor: 'pointer' }}>
                  Read article →
                </button>
              </div>
            </div>
          </div>

          {/* Filter tags */}
          <div style={{ padding: '0 54px 32px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {TAGS.map((tag, i) => (
              <button key={tag} type="button" style={{ padding: '8px 20px', background: i === 0 ? '#5dae61' : '#fffdf7', color: i === 0 ? '#fff' : '#555', border: '2.25px solid #1a1a1a', borderRadius: 999, fontFamily: 'Caveat Brush, cursive', fontSize: 18, cursor: 'pointer' }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div style={{ padding: '0 54px 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {POSTS.map((post) => (
              <div key={post.title} style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <div style={{ background: post.gradient, height: 130 }} />
                <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <span style={{ display: 'inline-block', background: '#e8f5e9', border: '1px solid #c3e6c3', borderRadius: 999, padding: '3px 12px', fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 700, color: '#2a5c44', width: 'fit-content' }}>{post.tag}</span>
                  <h3 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 20, color: '#1a1a1a', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#666', lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1.5px solid #f0ede4' }}>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 500, color: '#888' }}>{post.date}</span>
                    <span style={{ color: '#ccc' }}>·</span>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 500, color: '#888' }}>{post.readTime}</span>
                  </div>
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
