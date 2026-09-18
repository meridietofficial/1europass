import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    id: 's1',
    num: '01',
    title: 'About 1 Euro Pass',
    content: [
      '1 Euro Pass is a student-focused digital platform designed to help students discover and connect with opportunities, services and other students.',
      'Depending on availability, the Platform may include: Housing, Roommates, Find a Friend, Mystery Match, Trips, Events and meetups, Jobs, Campus communities, Tutors and learning, Buy & Sell, Restaurants, Student deals, Local services, and other student-focused services and opportunities.',
      '1 Euro Pass may provide search, discovery, communication, matching, listing, recommendation and other technology-enabled services.',
      'Unless expressly stated otherwise, 1 Euro Pass is a platform provider and facilitator, not the underlying provider of a third-party product or service. For example, a housing listing does not mean that 1 Euro Pass is the landlord; a job listing does not mean that 1 Euro Pass is the employer; and a trip listing does not mean that 1 Euro Pass is the travel organiser.',
    ],
  },
  {
    id: 's2',
    num: '02',
    title: 'Eligibility',
    content: [
      'You must be 18 years of age or older to use 1 Euro Pass.',
      'By using the Platform, you confirm that: you are at least 18 years old; you have the legal capacity to enter into these Terms; information you provide is accurate and not misleading; you will maintain the accuracy of your account information; and you will comply with applicable laws and these Terms.',
      'We may request reasonable information to verify your identity, student status or other information where verification is necessary for a particular service.',
      'Verification does not constitute a guarantee that a person, listing, organisation or service is safe, genuine, suitable or trustworthy.',
    ],
  },
  {
    id: 's3',
    num: '03',
    title: 'Your Account',
    content: [
      'Some Platform features require an account.',
      'You are responsible for: providing accurate information; maintaining the security of your login credentials; keeping your account information up to date; and preventing unauthorised use of your account.',
      'You must not: share your account with another person; sell or transfer your account; create an account for another person without authorisation; impersonate another individual or organisation; or create fraudulent or deceptive accounts.',
      'You must notify us promptly if you believe your account has been compromised.',
    ],
  },
  {
    id: 's4',
    num: '04',
    title: 'Student Verification',
    content: [
      'Certain features may allow or require users to verify their student status or identity.',
      'Verification methods may include information relating to: university or educational institution; student status; email address; identity; and other information reasonably necessary for verification.',
      'The specific information collected and the purposes for which it is processed are described in our Privacy Policy.',
      'Verification is intended to support trust and safety. It does not guarantee the behaviour, identity, financial reliability, qualifications or intentions of another user.',
    ],
  },
  {
    id: 's5',
    num: '05',
    title: 'User Profiles and Listings',
    content: [
      'Users may create profiles and listings on the Platform.',
      'You are responsible for ensuring that information you publish is: accurate; current; lawful; not misleading; and relevant to the listing or profile.',
      'You must not create listings for something that you do not have the legal right or authority to offer.',
      'You must not deliberately conceal important information or use misleading photographs, descriptions, prices or identities.',
      'We may remove or restrict content that we reasonably believe violates these Terms or applicable law.',
    ],
  },
  {
    id: 's6',
    num: '06',
    title: 'User-Generated Content',
    content: [
      'Users may submit: profile information; photographs; listing descriptions; messages; reviews; comments; event information; trip information; and other content.',
      'You retain ownership of intellectual-property rights that you hold in your content.',
      'By submitting content to the Platform, you grant 1 Euro Pass a non-exclusive, worldwide, royalty-free licence to host, store, reproduce, format, display and distribute that content only to the extent reasonably necessary to operate, provide, maintain, promote and improve the Platform, subject to applicable law.',
      'You remain responsible for ensuring that you have the necessary rights and permissions to submit the content.',
      "You must not upload another person's personal information, photographs or other protected material without an appropriate legal basis or permission where required.",
    ],
  },
  {
    id: 's7',
    num: '07',
    title: 'Prohibited Content and Conduct',
    content: [
      'You must not use the Platform to engage in fraud and deception, including: creating fake profiles; impersonating another person; providing deliberately false information; conducting scams or fraudulent transactions; or manipulating reviews or ratings.',
      'You must not engage in harassment and abuse, including: threatening or harassing another person; stalking or intimidating users; repeatedly contacting someone after they have asked you to stop; or engaging in abusive or discriminatory conduct.',
      'You must not facilitate illegal activity, including: offering illegal goods or services; distributing unlawful content; or facilitating fraud, money laundering or other unlawful activity.',
      'You must not abuse the Platform, including: scraping or harvesting user information without authorisation; circumventing Platform fees; interfering with Platform security; introducing malware; attempting unauthorised access; using bots or automated systems to abuse the Platform; or reverse engineering or attacking Platform systems.',
      'We may take appropriate action when prohibited conduct is identified or reported.',
    ],
  },
  {
    id: 's8',
    num: '08',
    title: 'Housing',
    content: [
      'Housing information may be supplied by landlords, tenants, agents, students or other users.',
      '1 Euro Pass does not generally act as: landlord; tenant; property manager; estate agent; or guarantor.',
      'Users should independently verify: property ownership or authority to rent; availability; rental price; deposit requirements; contract terms; identity of the other party; property condition; and applicable local legal requirements.',
      'Do not transfer money, deposits or personal documents solely because a listing appears on 1 Euro Pass.',
      'Any rental agreement is generally between the relevant parties.',
    ],
  },
  {
    id: 's9',
    num: '09',
    title: 'Roommates',
    content: [
      'Roommate profiles and listings are created by users.',
      'Users are responsible for evaluating whether another person is suitable for their living arrangements.',
      'Information about lifestyle, preferences, university, course, location or other characteristics may be supplied by users and may not always be accurate.',
      '1 Euro Pass does not guarantee that two users will be compatible as roommates.',
    ],
  },
  {
    id: 's10',
    num: '10',
    title: 'Find a Friend',
    content: [
      'Find a Friend allows users to discover other students based on information and preferences provided through the Platform.',
      'Users are responsible for their own interactions.',
      "You must respect another user's boundaries and stop communicating when requested.",
      'Users should avoid sharing sensitive personal information with people they have only recently met online.',
    ],
  },
  {
    id: 's11',
    num: '11',
    title: 'Mystery Match',
    content: [
      'Mystery Match may use automated and AI-assisted systems to identify potential student connections.',
      'A new Mystery Match request may require the use of €0.20 in 1 Euro Pass credit, where that price is displayed before confirmation.',
      'AI matching is a recommendation service. It does not guarantee: compatibility; friendship; successful communication; safety; a particular outcome; or accuracy of every recommendation.',
      'Users remain responsible for deciding whether and how to communicate with another person.',
      'We may provide reporting, blocking and other safety functionality.',
      'Additional information about AI processing and Mystery Match is provided in our AI & Mystery Match Policy and Privacy Policy.',
    ],
  },
  {
    id: 's12',
    num: '12',
    title: 'Messaging',
    content: [
      'The Platform may provide messaging and communication features.',
      'You must use these features responsibly.',
      'You must not use Platform messaging to: harass users; threaten users; send spam; conduct scams; request passwords or financial credentials; distribute malicious files or links; or distribute unlawful content.',
      'Where appropriate, users may report or block another user.',
      'We may process information associated with reports, abuse investigations and Platform security in accordance with applicable law and our Privacy Policy.',
    ],
  },
  {
    id: 's13',
    num: '13',
    title: 'Jobs',
    content: [
      'Job listings may be provided by employers, organisations or users.',
      '1 Euro Pass is generally not the employer and does not guarantee: that a job exists; that a position remains available; salary; working conditions; employer conduct; employment outcomes; or work-authorisation eligibility.',
      'Users are responsible for verifying employment details and complying with applicable employment, immigration and work-authorisation requirements.',
    ],
  },
  {
    id: 's14',
    num: '14',
    title: 'Trips and Events',
    content: [
      'Trips, meetups and events may be organised by users or third parties.',
      'Unless expressly stated otherwise, 1 Euro Pass is not the travel operator or event organiser.',
      'Users are responsible for independently considering: travel documents; visas; insurance; transportation; accommodation; event conditions; cancellation arrangements; and personal safety.',
      'Participation in any trip, meetup or event is undertaken at the user\'s own discretion and subject to applicable law.',
    ],
  },
  {
    id: 's15',
    num: '15',
    title: 'Buy & Sell',
    content: [
      'Users may offer items for sale through the Platform.',
      'Unless expressly stated otherwise, 1 Euro Pass does not take ownership of those items.',
      'Buyers and sellers are responsible for: item descriptions; condition; ownership; pricing; payment arrangements; collection or delivery; and compliance with applicable law.',
      'Users must not list prohibited or unlawful goods.',
      'We recommend that users conduct in-person exchanges in appropriate public locations and take reasonable safety precautions.',
    ],
  },
  {
    id: 's16',
    num: '16',
    title: 'Tutors and Local Services',
    content: [
      'Tutors and service providers may independently offer services through the Platform.',
      'Unless expressly stated otherwise, 1 Euro Pass does not guarantee: qualifications; professional registration; experience; availability; service quality; or results.',
      'Users should independently verify qualifications and agree on terms before engaging a provider.',
    ],
  },
  {
    id: 's17',
    num: '17',
    title: 'University and Campus Services',
    content: [
      'University and campus pages may contain information submitted by universities, student organisations, businesses or users.',
      'A university or institution appearing on the Platform does not necessarily mean that the institution endorses 1 Euro Pass or every piece of content associated with its page.',
      'Where a verified status or badge is provided, it represents the verification performed by 1 Euro Pass and does not constitute an unconditional guarantee of the account or its content.',
    ],
  },
  {
    id: 's18',
    num: '18',
    title: 'Platform Fees',
    content: [
      '1 Euro Pass may charge fees for selected Platform services. These may include: listing fees; credit purchases or usage; subscriptions, where introduced; and other clearly disclosed Platform fees.',
      'The applicable price will be shown before the user confirms a paid service.',
      'Mystery Match: where applicable, one new Mystery Match request = €0.20 credit. The applicable credit requirement will be displayed before the user confirms the request.',
      '1 Euro Pass does not generally collect payments belonging to third-party providers. For example, unless expressly stated otherwise, 1 Euro Pass does not collect: rent; housing deposits; marketplace purchase prices; tutor fees; travel payments; or event organiser payments.',
      'Third-party payment providers may process payments for 1 Euro Pass services.',
    ],
  },
  {
    id: 's19',
    num: '19',
    title: 'Taxes',
    content: [
      'Prices displayed on the Platform will identify applicable taxes or charges where required by applicable law.',
      'Users remain responsible for any taxes or reporting obligations that apply to transactions or income they receive through their activities on the Platform.',
    ],
  },
  {
    id: 's20',
    num: '20',
    title: 'Cancellation and Refunds',
    content: [
      'Our Refund & Cancellation Policy sets out the applicable rules for Platform fees, credits and other paid services.',
      'Where EU or national consumer law provides mandatory cancellation, withdrawal or refund rights, those rights will apply.',
      'For digital services that begin immediately after purchase, applicable legal exceptions to withdrawal rights may apply where the statutory requirements are satisfied.',
      'Nothing in these Terms is intended to exclude mandatory consumer rights.',
    ],
  },
  {
    id: 's21',
    num: '21',
    title: 'Safety',
    content: [
      'Users should exercise reasonable caution when interacting with people they meet through 1 Euro Pass.',
      'In particular: do not send money to strangers without appropriate verification; do not share passwords; avoid sharing unnecessary sensitive information; meet new contacts in appropriate public locations; tell someone you trust where you are going; report suspicious behaviour; and use blocking tools where appropriate.',
      '1 Euro Pass cannot guarantee the conduct of individual users.',
    ],
  },
  {
    id: 's22',
    num: '22',
    title: 'Reporting',
    content: [
      'Users may report accounts, listings, messages or other content that they believe violate these Terms or applicable law.',
      'Reports may concern: fraud; fake profiles; harassment; unsafe behaviour; prohibited content; suspicious listings; privacy concerns; and security issues.',
      'We may investigate reports and take appropriate action. Such action may include: content removal; warnings; feature restrictions; account suspension; account termination; and referral to appropriate authorities where legally required or appropriate.',
    ],
  },
  {
    id: 's23',
    num: '23',
    title: 'Intellectual Property',
    content: [
      'The 1 Euro Pass name, logo, trademarks, software, platform design, original illustrations, text, graphics and other proprietary materials are owned by or licensed to 1 Euro Pass SIA, unless otherwise indicated.',
      'You must not reproduce, modify, distribute, sell, licence or commercially exploit our proprietary materials without permission.',
      'Nothing in these Terms transfers ownership of 1 Euro Pass intellectual property to you.',
    ],
  },
  {
    id: 's24',
    num: '24',
    title: 'Privacy and Data Protection',
    content: [
      '1 Euro Pass processes personal data in accordance with applicable data-protection law, including the EU General Data Protection Regulation (GDPR) where applicable.',
      'Our Privacy Policy explains: what personal data we collect; why we collect it; our legal bases for processing; how information is used; data retention; recipients and processors; international transfers; cookies and similar technologies; profiling and AI-assisted processing; and applicable data-protection rights.',
      'These Terms should be read together with our Privacy Policy.',
    ],
  },
  {
    id: 's25',
    num: '25',
    title: 'Your Data Protection Rights',
    content: [
      'Subject to applicable law and the conditions of the GDPR, you may have rights including: access to your personal data; rectification of inaccurate data; erasure; restriction of processing; data portability; objection to certain processing; withdrawal of consent where processing is based on consent; and rights concerning certain automated decision-making and profiling.',
      'You can contact: support@ieuropass.com',
      'We will handle valid requests in accordance with applicable data-protection law. Where required under GDPR, requests will generally be addressed within one month, subject to applicable extensions and exceptions.',
      'You may also have the right to lodge a complaint with a competent supervisory authority.',
    ],
  },
  {
    id: 's26',
    num: '26',
    title: 'Automated Decision-Making and AI',
    content: [
      'Some Platform functions may use automated processing, recommendation systems or artificial intelligence.',
      'We will provide information about relevant processing in our Privacy Policy and, where appropriate, our AI & Mystery Match Policy.',
      'Where applicable GDPR provisions concerning solely automated decision-making with legal or similarly significant effects apply, we will respect the rights provided by applicable law.',
      'AI-generated recommendations may be inaccurate and should not be treated as professional, legal, financial, medical or safety advice.',
    ],
  },
  {
    id: 's27',
    num: '27',
    title: 'Third-Party Services',
    content: [
      'The Platform may use or link to third-party services, including payment providers, mapping services, analytics providers, communication services and other technology providers.',
      'Third-party services may have separate terms and privacy policies.',
      '1 Euro Pass is not responsible for third-party services except where responsibility cannot legally be excluded.',
    ],
  },
  {
    id: 's28',
    num: '28',
    title: 'Platform Availability',
    content: [
      'We aim to provide a reliable service but cannot guarantee that the Platform will always be available.',
      'The Platform may occasionally be unavailable because of: maintenance; technical problems; security incidents; network failures; third-party service interruptions; and circumstances beyond our reasonable control.',
    ],
  },
  {
    id: 's29',
    num: '29',
    title: 'Account Suspension and Termination',
    content: [
      'We may suspend or terminate an account where reasonably necessary to: enforce these Terms; protect users; prevent fraud; investigate abuse; protect Platform security; comply with legal obligations; and respond to serious violations.',
      'Where required by applicable law, we will provide appropriate information or explanation concerning such action.',
      'You may stop using the Platform at any time.',
      'Account deletion is subject to applicable legal, security, financial and record-retention requirements.',
    ],
  },
  {
    id: 's30',
    num: '30',
    title: 'Disclaimers',
    content: [
      'To the maximum extent permitted by applicable law, 1 Euro Pass does not guarantee: the accuracy of every user profile; the accuracy of every listing; the availability of a property; compatibility between users; the conduct of another user; employment outcomes; trip or event outcomes; the quality of third-party services; the accuracy of AI recommendations; or uninterrupted Platform availability.',
      'Nothing in these Terms excludes or limits rights or liability that cannot legally be excluded or limited under applicable EU or Latvian law.',
    ],
  },
  {
    id: 's31',
    num: '31',
    title: 'Liability',
    content: [
      'To the maximum extent permitted by applicable law, 1 Euro Pass SIA will not be liable for losses arising solely from arrangements or interactions between users or between users and independent third-party providers.',
      'Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by law.',
      'In particular, these Terms do not affect mandatory consumer rights or any statutory liability that cannot legally be limited.',
    ],
  },
  {
    id: 's32',
    num: '32',
    title: 'Changes to the Platform',
    content: [
      'We may modify, suspend or discontinue Platform features where reasonably necessary.',
      'Changes may occur because of: technical developments; security requirements; regulatory requirements; changes in user needs; and introduction or removal of services.',
      'Where required, we will provide appropriate notice concerning material changes.',
    ],
  },
  {
    id: 's33',
    num: '33',
    title: 'Changes to These Terms',
    content: [
      'We may update these Terms from time to time.',
      'When material changes are made, we will provide appropriate notice where required by law.',
      'The Last Updated date at the beginning of these Terms will indicate the latest version.',
      'Your continued use of the Platform after the effective date of updated Terms may constitute acceptance where legally permitted.',
    ],
  },
  {
    id: 's34',
    num: '34',
    title: 'Governing Law and Consumer Rights',
    content: [
      'These Terms are governed by the laws applicable in Latvia, subject to mandatory provisions of applicable EU and national law.',
      'If you are a consumer residing in another EU/EEA country, these Terms are not intended to deprive you of mandatory consumer protections that apply to you.',
      'Before commencing formal proceedings, we encourage users to contact us so that we can attempt to resolve the matter.',
      'Nothing in this section limits any mandatory right you may have to bring a claim before a competent court or to use a legally available consumer dispute-resolution mechanism.',
    ],
  },
  {
    id: 's35',
    num: '35',
    title: 'Data Protection Complaints',
    content: [
      'If you believe that your personal data has been processed unlawfully, you may contact us first: support@ieuropass.com',
      'You may also lodge a complaint with a competent data-protection supervisory authority.',
      'For 1 Euro Pass SIA, the relevant Latvian supervisory authority is: Data State Inspectorate (Datu valsts inspekcija), Latvia.',
      'Your GDPR rights to lodge a complaint with a supervisory authority remain unaffected.',
    ],
  },
  {
    id: 's36',
    num: '36',
    title: 'Contact',
    content: [
      'For questions about these Terms: 1 Euro Pass SIA, Riga, Latvia. Email: support@ieuropass.com',
      'For privacy and GDPR matters: support@ieuropass.com — Subject: Data Protection / GDPR Request',
    ],
  },
  {
    id: 's37',
    num: '37',
    title: 'Related Policies',
    content: [
      'The following policies form part of the broader 1 Euro Pass legal and trust framework:',
      'Privacy Policy · Cookie Policy · Cookie Preferences · Refund & Cancellation Policy · Community Guidelines · Safety Guidelines · AI & Mystery Match Policy · Legal Notice / Imprint',
      'Where applicable, the relevant policy will provide additional rules for the particular service.',
    ],
  },
]

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — 1 Euro Pass</title>
        <meta name="description" content="Read the Terms & Conditions for using 1 Euro Pass, the student platform for Europe & UK. Registered in Latvia as 1 Euro Pass SIA." />
        <link rel="canonical" href="https://1europass.com/terms-and-conditions" />
      </Helmet>
      <Navbar />
      <main style={{ background: '#f5f4ed', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <div style={{ padding: '56px 64px 48px', maxWidth: 900 }}>
          <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 56, color: '#1a1a1a', lineHeight: 1.05, marginBottom: 20 }}>
            Terms &amp; <span style={{ color: '#5dae61' }}>Conditions</span>
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 500, color: '#555', lineHeight: 1.8, maxWidth: 640, marginBottom: 28 }}>
            These Terms govern your access to and use of the 1 Euro Pass website, mobile applications, platform, marketplace and related services (the "Platform"). By creating an account or using the Platform, you agree to these Terms.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Effective Date', value: 'To be inserted' },
              { label: 'Last Updated', value: 'To be inserted' },
              { label: 'Entity', value: '1 Euro Pass SIA, Riga, Latvia' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5dae61', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── NOTICE ── */}
        <div style={{ margin: '0 64px 40px', background: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16, marginTop: 1 }}>⚠️</span>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 500, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
            This is a business/legal draft for 1 Euro Pass SIA. Before publication, it should be reviewed by a lawyer qualified in Latvian and EU law.
          </p>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{ display: 'flex', gap: 0, margin: '0 64px 80px', alignItems: 'flex-start' }}>

          {/* Sticky TOC sidebar */}
          <div style={{ width: 220, flexShrink: 0, position: 'sticky', top: 90, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', paddingRight: 24 }}>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: 14 }}>Contents</div>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8,
                  padding: '5px 0',
                  textDecoration: 'none',
                  borderBottom: 'none',
                }}
              >
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 700, color: '#5dae61', minWidth: 20, flexShrink: 0 }}>{s.num}</span>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, fontWeight: 600, color: '#555', lineHeight: 1.4 }}>{s.title}</span>
              </a>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {SECTIONS.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: '36px 40px',
                  marginBottom: idx < SECTIONS.length - 1 ? 16 : 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 15, color: '#5dae61', flexShrink: 0 }}>{section.num}.</span>
                  <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 26, color: '#1a1a1a', lineHeight: 1.15, margin: 0 }}>
                    {section.title}
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {section.content.map((para, i) => (
                    <p key={i} style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: '#444', lineHeight: 1.85, margin: 0 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Contact CTA */}
            <div style={{ marginTop: 24, background: '#5dae61', border: '2.25px solid #1a1a1a', borderRadius: 20, boxShadow: '4px 4px 0 #1a1a1a', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 28, color: '#fff', marginBottom: 6 }}>Questions about these Terms?</h2>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0 }}>We're here to help — reach out any time.</p>
              </div>
              <a
                href="mailto:support@ieuropass.com"
                style={{ flexShrink: 0, padding: '11px 26px', background: '#fff', color: '#5dae61', border: '2px solid #1a1a1a', borderRadius: 12, boxShadow: '3px 3px 0 #1a1a1a', fontFamily: 'Caveat Brush, cursive', fontSize: 19, textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                Contact us →
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
