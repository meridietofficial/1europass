const EXPLORE_LINKS = [
  'Browse Listings', 'Rooms', 'Jobs', 'Roommates',
  'Buy & Sell', 'Student Deals', 'Events', 'Local Services',
]

const HOW_LINKS = [
  'How 1 Euro Pass works', 'For Students', 'For Businesses',
  'Pricing', 'FAQs', 'Safety Tips',
]

const ABOUT_LINKS = [
  'About us', 'Blog', 'Press', 'Careers', 'Contact us', 'Help Center',
]


const SOCIAL = [
  {
    label: 'Instagram',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
  },
  {
    label: 'TikTok',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-4.77-4.32V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.35a8.16 8.16 0 0 0 4.77 1.52V7.42a4.85 4.85 0 0 1-1-.73z" /></svg>,
  },
  {
    label: 'Facebook',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: 'Pinterest',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.85 0 3.09-2.37 3.09-5.18 0-2.14-1.44-3.74-4.04-3.74-2.94 0-4.77 2.2-4.77 4.64 0 .84.24 1.43.62 1.89.17.2.19.28.13.51-.04.17-.14.57-.18.72-.06.23-.24.31-.44.23-1.23-.5-1.81-1.86-1.81-3.38 0-2.51 2.11-5.52 6.29-5.52 3.37 0 5.6 2.44 5.6 5.07 0 3.47-1.93 6.08-4.77 6.08-.95 0-1.85-.51-2.16-1.09l-.59 2.28c-.22.84-.8 1.89-1.19 2.53.9.27 1.85.42 2.83.42 5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>,
  },
  {
    label: 'LinkedIn',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
]

export default function Footer() {
  return (
    <footer className="footer">

      {/* ── MAIN GRID ── */}
      <div className="footer__main">

        {/* Col 1 – Brand */}
        <div className="footer__brand">
          <img src="/logo.svg" alt="1 Euro Pass" className="footer__logo" />
          <p className="footer__tagline-text">
            All the essentials students need.<br />
            One pass. Countless opportunities.<br />
            <strong>Across Europe &amp; UK.</strong>
          </p>
          <img src="/footer-city.svg" alt="" className="footer__city" />
        </div>

        {/* Col 2 – Explore */}
        <div className="footer__col">
          <div className="footer__col-header">
            <h4 className="footer__col-heading">Explore</h4>
            <img src="/heading-underline.svg" alt="" className="footer__col-underline" />
          </div>
          <ul className="footer__links">
            {EXPLORE_LINKS.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
          <div className="footer__doodle">
            <img src="/footer-heart.svg" alt="" />
          </div>
        </div>

        {/* Col 3 – How it works */}
        <div className="footer__col">
          <div className="footer__col-header">
            <h4 className="footer__col-heading">How it works</h4>
            <img src="/heading-underline.svg" alt="" className="footer__col-underline" />
          </div>
          <ul className="footer__links">
            {HOW_LINKS.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
          <div className="footer__doodle">
            <img src="/footer-bulb.svg" alt="" />
          </div>
        </div>

        {/* Col 4 – About */}
        <div className="footer__col">
          <div className="footer__col-header">
            <h4 className="footer__col-heading">About</h4>
            <img src="/heading-underline.svg" alt="" className="footer__col-underline" />
          </div>
          <ul className="footer__links">
            {ABOUT_LINKS.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
          <div className="footer__doodle">
            <img src="/footer-search.svg" alt="" />
          </div>
        </div>

        {/* Col 5 – Stay in the loop */}
        <div className="footer__loop-card">
          <h4 className="footer__loop-heading">
            Stay in the loop
            <img src="/heading-underline.svg" alt="" className="footer__loop-underline" />
          </h4>
          <p className="footer__loop-sub">Get updates on new listings, student deals &amp; more.</p>
          <input className="footer__loop-input" type="email" placeholder="Enter your email" />
          <button className="footer__loop-btn" type="button">Subscribe</button>
          <div className="footer__loop-doodle">
            <img src="/loop-doodle.svg" alt="" />
          </div>
        </div>

      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="footer__bottom-row">

        {/* Follow us */}
        <div className="footer__social">
          <h5 className="footer__bottom-heading">Follow us</h5>
          <div className="footer__social-icons">
            {SOCIAL.map((s) => (
              <a key={s.label} href="#" className="footer__social-icon" aria-label={s.label}>
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="footer__help">
          <h5 className="footer__bottom-heading">We're here to help</h5>
          <div className="footer__help-contact">
            <svg className="footer__help-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <div>
              <a href="mailto:hello@1europass.com" className="footer__help-email">hello@1europass.com</a>
              <a href="#" className="footer__help-center">Help Center</a>
            </div>
          </div>
        </div>

        {/* Get the app */}
        <div className="footer__app">
          <div className="footer__app-label">
            <h5 className="footer__bottom-heading">Get the app</h5>
            <p className="footer__app-sub">Find, connect &amp; save on the go.</p>
          </div>
          <div className="footer__app-btns">
            <a href="#" className="footer__app-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__app-btn-icon"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              <div>
                <span className="footer__app-btn-sub">Download on the</span>
                <span className="footer__app-btn-main">App Store</span>
              </div>
            </a>
            <a href="#" className="footer__app-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="footer__app-btn-icon"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-2.83-2.83L3.18 23.76zm17.16-13.3L17.5 8.72l-2.97 2.97 2.96 2.96 2.86-1.64c.81-.47.81-1.79-.01-2.55zm-17.8-9.2c-.22.26-.35.62-.35 1.07v18.34c0 .45.13.81.35 1.07l.06.06L14.63 9.5v-.3L2.48 1.2l-.06.06zM14.97 9.87l2.52 2.52-2.98 2.99-9.13-9.14 9.59 3.63z" /></svg>
              <div>
                <span className="footer__app-btn-sub">GET IT ON</span>
                <span className="footer__app-btn-main">Google Play</span>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* ── COPYRIGHT BAR ── */}
      <div className="footer__bar">
        <div className="footer__bar-copy">
          <svg className="footer__bar-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          © 2026 1 Euro Pass — Your Student Life, Simplified.
          <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
          <a href="/terms-and-conditions" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, opacity: 0.7 }}>Terms &amp; Conditions</a>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>·</span>
          <a href="/privacy-policy" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, opacity: 0.7 }}>Privacy Policy</a>
        </div>
        <img src="/footer-corner-doodle.svg" alt="" className="footer__bar-doodle" />
      </div>

    </footer>
  )
}
