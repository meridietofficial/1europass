import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CONTACT_CARDS = [
  {
    icon: '✉️',
    title: 'Email us',
    desc: 'For general questions and support',
    value: 'hello@1europass.com',
    href: 'mailto:hello@1europass.com',
  },
  {
    icon: '💬',
    title: 'Live chat',
    desc: 'Mon–Fri, 9am–6pm CET',
    value: 'Start a chat',
    href: '#',
  },
  {
    icon: '📍',
    title: 'Headquarters',
    desc: 'Come say hi',
    value: 'Berlin, Germany',
    href: '#',
  },
]

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    color: '#1a1a1a',
    background: '#fffdf7',
    border: '2px solid #1a1a1a',
    borderRadius: 12,
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — 1 Euro Pass</title>
        <meta name="description" content="Get in touch with the 1 Euro Pass team. We're here to help students across Europe and the UK." />
        <link rel="canonical" href="https://1europass.com/contact" />
      </Helmet>
      <Navbar />
      <main>

        {/* Hero */}
        <div style={{ padding: '48px 54px 40px' }}>
          <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 52, color: '#1a1a1a', lineHeight: 1.1, marginBottom: 14 }}>
            Get in <span style={{ color: '#5dae61' }}>touch.</span>
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 500, color: '#40493e', lineHeight: 1.8, maxWidth: 520 }}>
            Have a question, feedback, or just want to say hi? We'd love to hear from you. Our team typically replies within 24 hours.
          </p>
        </div>

        {/* Content card */}
        <div style={{ background: '#ffffff', borderRadius: 32, margin: '0 54px 64px' }}>

          {/* Contact cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '40px 54px', borderBottom: '1.5px solid #f0ede4', gap: 20 }}>
            {CONTACT_CARDS.map((card) => (
              <a
                key={card.title}
                href={card.href}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 8, background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, padding: '26px 24px', boxShadow: '4px 4px 0 #1a1a1a' }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{card.icon}</div>
                <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 22, color: '#1a1a1a' }}>{card.title}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#888' }}>{card.desc}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700, color: '#5dae61', marginTop: 4 }}>{card.value}</div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div style={{ padding: '56px 54px' }}>
            <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 34, color: '#1a1a1a', marginBottom: 32 }}>Send us a message</h2>

            {submitted ? (
              <div style={{ background: '#fffdf7', border: '2.25px solid #1a1a1a', borderRadius: 22, boxShadow: '4px 4px 0 #1a1a1a', padding: '48px 40px', textAlign: 'center', maxWidth: 520 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <div style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 28, color: '#5dae61', marginBottom: 10 }}>Message sent!</div>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#555', lineHeight: 1.8 }}>
                  Thanks for reaching out, {form.name.split(' ')[0] || 'there'}. We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>Full name</label>
                    <input
                      style={inputStyle}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>Email address</label>
                    <input
                      style={inputStyle}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle} required>
                    <option value="">Select a topic…</option>
                    <option>General question</option>
                    <option>Account or login issue</option>
                    <option>Listing problem</option>
                    <option>Payment or billing</option>
                    <option>Partnership or press</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>Message</label>
                  <textarea
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind…"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    style={{ padding: '12px 32px', background: '#5dae61', color: '#fff', border: '2px solid #1a1a1a', borderRadius: 14, boxShadow: '4px 4px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 20, cursor: 'pointer' }}
                  >
                    Send message →
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
