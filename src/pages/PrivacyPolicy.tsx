import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    id: 'p1',
    num: '01',
    title: 'Who Is Responsible for Your Personal Data?',
    content: [
      'The controller responsible for the processing described in this Privacy Policy is:',
      '1 Euro Pass SIA — Registered in Latvia. Registered office: Riga, Latvia. Email: support@ieuropass.com',
      'Company registration number: [To be inserted]. VAT number: [To be inserted if applicable].',
      'For privacy-related questions or requests, contact: support@ieuropass.com',
      'If a Data Protection Officer ("DPO") is appointed or required for a particular processing activity, their contact details will be provided here. DPO contact: [To be inserted / Not applicable].',
      'The GDPR requires controllers to provide information about their identity, contact details, purposes and legal bases, recipients, transfers, retention, and applicable rights.',
    ],
  },
  {
    id: 'p2',
    num: '02',
    title: 'Who This Privacy Policy Applies To',
    content: [
      'This Privacy Policy applies to individuals who visit our website; create or maintain an account; create a profile; publish or respond to listings; communicate with other users; use Find a Friend; use Mystery Match; participate in events or meetups; browse housing or roommate opportunities; publish or respond to jobs; use tutor or local-service features; buy or sell items through the Platform; use travel or trip-related features; interact with universities, student organisations, or partners through the Platform; contact customer support; or otherwise interact with 1 Euro Pass.',
      'The Platform is intended for users aged 18 or older.',
    ],
  },
  {
    id: 'p3',
    num: '03',
    title: 'Personal Data We Collect',
    content: [
      'We collect only the information reasonably necessary for the purposes described in this Privacy Policy.',
      'Account Information — When you create an account, we may collect: name; email address; phone number; password or authentication information; date of birth or age information; profile photograph; country/city; account preferences; account status; verification status; and other information you voluntarily provide.',
      'Profile Information — Depending on the features you use, you may choose to provide: university or educational institution; field of study; student status; graduation year; languages; interests; hobbies; lifestyle preferences; housing preferences; roommate preferences; availability; preferred activities; travel preferences; professional interests; skills; tutoring qualifications; employment-related information; and other profile information.',
      'Some of this information may be visible to other Platform users depending on your privacy settings and the feature through which you provide it. You should avoid publishing sensitive personal information unless a feature specifically requires it and you understand how it will be used.',
    ],
  },
  {
    id: 'p4',
    num: '04',
    title: 'Verification Information',
    content: [
      'Where 1 Euro Pass offers student or identity verification, we may process information necessary to verify eligibility or authenticity.',
      'Depending on the verification method, this may include: university information; student identification information; verification documents; email-domain information; identity information; photographs or images submitted for verification; verification results; verification timestamps; and fraud-prevention signals.',
      'Where a third-party verification provider is used, that provider may process personal data on our behalf or as an independent controller, depending on its role.',
      'Verification does not mean that 1 Euro Pass guarantees the identity, honesty, safety, qualifications, or behaviour of another user.',
      'We will specify the applicable verification provider and the categories of information processed once the final verification system is selected.',
    ],
  },
  {
    id: 'p5',
    num: '05',
    title: 'Listings and User-Generated Content',
    content: [
      'If you create a listing, post, profile, advertisement, event, request, or other content, we may process: listing information; descriptions; photographs; videos; prices or fees; location information; availability; contact preferences; category information; messages associated with the listing; interaction statistics; and other information you choose to publish.',
      'Please remember that information you intentionally make public may be accessible to other users and potentially copied or shared outside the Platform.',
    ],
  },
  {
    id: 'p6',
    num: '06',
    title: 'Messages and Communications',
    content: [
      'If you communicate with another user through 1 Euro Pass, we may process: sender and recipient information; message content; attachments; timestamps; conversation metadata; reports associated with conversations; and information necessary to prevent abuse, fraud, spam, or other prohibited activity.',
      'We may use automated systems and, where necessary and proportionate, human review to detect violations of our Terms, Community Guidelines, or Safety Guidelines.',
      'We do not use private communications for unrelated advertising purposes.',
    ],
  },
  {
    id: 'p7',
    num: '07',
    title: 'Location Information',
    content: [
      'Certain Platform features may require location information. Depending on the feature and your device permissions, we may process: city; approximate location; selected search location; listing location; event location; travel destination; location information you voluntarily provide; and technical location-related information where permitted.',
      'We do not require continuous precise location tracking merely to use the Platform unless a particular feature explicitly requires it and you provide the necessary permission.',
      'You may control certain location permissions through your device or browser settings.',
    ],
  },
  {
    id: 'p8',
    num: '08',
    title: 'Payment and Transaction Information',
    content: [
      'When you purchase a 1 Euro Pass service, listing, credit, subscription, or other paid feature, payment information may be processed.',
      'Depending on the payment method, this may include: transaction ID; payment status; amount; currency; billing information; payment method type; invoice information; refund information; and limited payment-related information supplied by our payment provider.',
      'We generally do not store complete payment-card numbers or card security codes on our own systems.',
      'Payments may be processed by third-party payment providers. Payment provider: [To be inserted]. Their processing may be subject to their own privacy policies.',
    ],
  },
  {
    id: 'p9',
    num: '09',
    title: 'Mystery Match and AI-Based Features',
    content: [
      '1 Euro Pass may offer features such as Mystery Match, recommendation systems, compatibility suggestions, automated categorisation, or other AI-assisted functionality.',
      'To provide these features, we may process information such as: profile information; interests; preferences; location or city; activity preferences; interaction information; answers you provide to matching questions; previous matching outcomes; and other information relevant to the particular feature.',
      'AI or automated systems may analyse this information to generate recommendations or potential matches. A recommendation is not a guarantee of compatibility, safety, friendship, employment, housing suitability, or any other outcome.',
      'Where a new Mystery Match request uses 1 Euro Pass credits, the applicable credit cost will be displayed before you confirm the request.',
      'Automated decision-making — Where AI or automated processing produces an outcome that qualifies as a decision based solely on automated processing and has legal or similarly significant effects under Article 22 GDPR, we will provide the safeguards and rights required by applicable law. Depending on the feature, this may include the right to obtain human intervention; express your point of view; contest the decision; and request appropriate information about the processing.',
      'Not every recommendation or ranking constitutes an Article 22 automated decision. The applicable rights depend on the nature and effects of the particular processing.',
    ],
  },
  {
    id: 'p10',
    num: '10',
    title: 'How We Use Your Personal Data',
    content: [
      'Providing the Platform — creating and managing accounts; displaying profiles; providing listings; enabling searches; connecting users; facilitating communications; operating matching features; processing payments; providing customer support; and delivering requested services.',
      'Personalisation — recommending listings; recommending events; suggesting connections; suggesting tutors or services; personalising search results; and providing matching functionality.',
      'Safety and Trust — preventing fraud; detecting scams; preventing abuse; detecting spam; investigating reports; protecting users; enforcing our Terms and Community Guidelines; and maintaining Platform security.',
      'Legal and Regulatory Compliance — complying with legal obligations; responding to lawful requests; maintaining business records; resolving disputes; enforcing legal rights; and preventing or investigating unlawful activity.',
      'Platform Improvement — analysing usage; identifying technical problems; improving features; testing functionality; understanding user behaviour; measuring performance; and developing new Platform features.',
      'Communications — account notifications; security notifications; service announcements; transactional messages; support communications; and marketing communications where legally permitted.',
    ],
  },
  {
    id: 'p11',
    num: '11',
    title: 'Legal Bases for Processing',
    content: [
      'Under GDPR Article 6, personal-data processing must have a lawful basis. The GDPR recognises bases including consent, contractual necessity, legal obligations, vital interests, public interest, and legitimate interests.',
      'Depending on the circumstances, we may rely on the following legal bases: contract performance (to fulfil your account agreement and provide services you requested); legal obligation (where processing is required to comply with applicable law); legitimate interests (where our interests or a third party\'s interests are not overridden by your rights — for example, fraud prevention, security, and Platform improvement); and consent (where you have given explicit consent for a specific purpose, such as marketing communications or non-essential cookies).',
      'The exact legal basis may differ depending on the specific feature, jurisdiction, and circumstances. Where we rely on legitimate interests, we will consider whether those interests are overridden by your rights and freedoms.',
    ],
  },
  {
    id: 'p12',
    num: '12',
    title: 'Consent',
    content: [
      'Where we rely on consent: consent will be requested separately from other matters where appropriate; you may refuse consent; you may withdraw consent at any time; withdrawal will not affect processing that occurred before withdrawal; and withdrawing consent will not affect processing carried out on another lawful basis.',
      'For example, withdrawing marketing consent does not necessarily require us to delete your account because account information may still be required to provide the Platform.',
    ],
  },
  {
    id: 'p13',
    num: '13',
    title: 'Marketing Communications',
    content: [
      'We may send you service-related communications necessary to operate your account. These may include: security alerts; account notifications; transaction confirmations; changes to services; important policy updates; and support communications. These communications are generally not optional because they may be necessary to provide the service.',
      'Where required by law, we will obtain your consent before sending promotional marketing communications.',
      'You may unsubscribe from promotional communications at any time using the unsubscribe mechanism provided or by contacting us.',
    ],
  },
  {
    id: 'p14',
    num: '14',
    title: 'Cookies and Similar Technologies',
    content: [
      'We may use: strictly necessary cookies; preference cookies; analytics cookies; performance technologies; advertising or marketing technologies, if applicable; and similar technologies.',
      'Strictly necessary technologies may be used where required to operate the Platform. Non-essential cookies and similar technologies will be used only where permitted and, where required, after obtaining your consent.',
      'For more information, please see our separate Cookie Policy and Cookie Preference Centre.',
    ],
  },
  {
    id: 'p15',
    num: '15',
    title: 'Information We Receive From Third Parties',
    content: [
      'We may receive personal data from: authentication providers; payment providers; student-verification providers; fraud-prevention providers; analytics providers; social-login providers; universities or partner organisations where appropriate; event partners; service providers; other users; and publicly available sources where legally permitted.',
      'Where we receive personal data from a source other than you, we will provide the information required by Article 14 GDPR unless a lawful exception applies.',
    ],
  },
  {
    id: 'p16',
    num: '16',
    title: 'Who We Share Personal Data With',
    content: [
      'Service providers — such as providers of: cloud hosting; databases; authentication; email; customer support; analytics; payment processing; identity/student verification; fraud prevention; security; communications; AI/technology infrastructure; and other technical services.',
      'Other Platform users — information you intentionally publish on your profile or listing may be visible to other Platform users.',
      'Business partners — where necessary to provide a feature or service and where the disclosure is lawful.',
      'Professional advisers — including lawyers, accountants, auditors, insurers, and other professional advisers.',
      'Authorities — where disclosure is required by applicable law, lawful process, court order, regulatory requirement, or where reasonably necessary to protect rights, safety, or the Platform.',
      'We do not sell personal data as a commercial data-broker business.',
    ],
  },
  {
    id: 'p17',
    num: '17',
    title: 'Data Processors',
    content: [
      'Where third-party providers process personal data on our behalf, we seek to use providers that provide appropriate technical and organisational safeguards and enter into appropriate contractual arrangements where required.',
      'GDPR Article 28 requires processor relationships to be governed by appropriate contractual arrangements, including requirements concerning confidentiality, security, assistance with data-subject rights, and sub-processors.',
      'Our current principal processors will be listed in our internal records and, where appropriate, in a public Sub-processor List. Public sub-processor list: [To be inserted when available].',
    ],
  },
  {
    id: 'p18',
    num: '18',
    title: 'International Data Transfers',
    content: [
      'Some of our service providers may process personal data outside the European Economic Area ("EEA").',
      'Where personal data is transferred outside the EEA, we will use a transfer mechanism permitted by GDPR Chapter V, where required. Depending on the circumstances, this may include: an EU adequacy decision; Standard Contractual Clauses ("SCCs"); Binding Corporate Rules; another lawful transfer mechanism; or a GDPR-recognised derogation where applicable.',
      'Relevant safeguards can be requested by contacting: support@ieuropass.com',
      'Because our technical architecture and vendors may change, the final published policy should identify the countries and transfer mechanisms actually used by 1 Euro Pass.',
    ],
  },
  {
    id: 'p19',
    num: '19',
    title: 'Data Retention',
    content: [
      'We retain personal data only for as long as reasonably necessary for the purposes for which it was collected, unless a longer period is required by law.',
      'Retention periods depend on: the nature of the information; the purpose for which it is used; whether the account remains active; legal obligations; limitation periods; fraud-prevention requirements; dispute resolution; security requirements; and other legitimate business requirements.',
      'GDPR transparency guidance expects information about storage periods or the criteria used to determine them. These periods will be updated with our actual technical retention schedule before publication.',
    ],
  },
  {
    id: 'p20',
    num: '20',
    title: 'Account Deletion',
    content: [
      'You may request deletion of your account. Where appropriate, we will delete or anonymise personal data associated with your account.',
      'However, certain information may need to be retained where necessary to: comply with a legal obligation; establish, exercise, or defend legal claims; prevent fraud; maintain security; resolve disputes; maintain accounting records; or satisfy another lawful retention requirement.',
      'If information cannot immediately be deleted for one of these reasons, we will restrict its use to the relevant lawful purpose where required.',
    ],
  },
  {
    id: 'p21',
    num: '21',
    title: 'Your GDPR Rights',
    content: [
      'Right of access — You may request confirmation of whether we process your personal data and request access to that information.',
      'Right to rectification — You may ask us to correct inaccurate or incomplete personal data.',
      'Right to erasure — You may ask us to delete your personal data in circumstances provided by GDPR.',
      'Right to restriction — You may ask us to restrict processing in certain circumstances.',
      'Right to data portability — Where applicable, you may request personal data you provided to us in a structured, commonly used and machine-readable format and request transmission to another controller.',
      'Right to object — You may object to certain processing based on legitimate interests, including certain forms of profiling.',
      'Right to withdraw consent — Where processing is based on consent, you may withdraw consent at any time.',
      'Rights relating to automated decision-making — Where applicable, you may have rights concerning decisions based solely on automated processing, including the safeguards described in Article 22 GDPR.',
      'These rights are established and qualified by the GDPR; they are not absolute in every circumstance.',
    ],
  },
  {
    id: 'p22',
    num: '22',
    title: 'How to Exercise Your Rights',
    content: [
      'To exercise your GDPR rights, contact: support@ieuropass.com',
      'Please include: your name; email address associated with your account; the nature of your request; and any information reasonably necessary to verify your identity.',
      'We may request additional information where reasonably necessary to confirm that the request is genuinely from you.',
      'We generally respond to GDPR rights requests within one month. This period may be extended by up to two additional months where permitted by GDPR due to complexity or the number of requests.',
      'We generally do not charge a fee for exercising GDPR rights. Exceptions may apply where a request is manifestly unfounded or excessive as permitted by law.',
    ],
  },
  {
    id: 'p23',
    num: '23',
    title: 'Right to Lodge a Complaint',
    content: [
      'You have the right to lodge a complaint with a competent data-protection supervisory authority.',
      'As 1 Euro Pass is established in Latvia, the relevant Latvian supervisory authority is: Data State Inspectorate (Datu valsts inspekcija), Latvia.',
      'You may also have the right to complain to the supervisory authority in the EEA country where you live, work, or believe an infringement occurred, subject to the GDPR rules governing supervisory authorities.',
    ],
  },
  {
    id: 'p24',
    num: '24',
    title: 'Data Security',
    content: [
      'We use appropriate technical and organisational measures designed to protect personal data against: accidental loss; unauthorised access; unlawful processing; alteration; disclosure; destruction; and other security threats.',
      'Depending on the system, safeguards may include: access controls; authentication; encryption; secure transmission; logging; monitoring; backups; vulnerability management; employee confidentiality requirements; and incident-response procedures.',
      'No internet service can guarantee absolute security.',
    ],
  },
  {
    id: 'p25',
    num: '25',
    title: 'Personal Data Breaches',
    content: [
      'If a personal-data breach occurs, we will assess the incident and take the steps required by applicable law.',
      'Where GDPR requires notification to a supervisory authority or affected individuals, we will make the required notification within the applicable legal timeframe.',
    ],
  },
  {
    id: 'p26',
    num: '26',
    title: 'Sensitive and Special Category Data',
    content: [
      '1 Euro Pass does not intentionally require users to provide special-category personal data unless a particular feature has a legitimate and documented need to process such information.',
      'Special categories under GDPR include information concerning: health; racial or ethnic origin; political opinions; religious or philosophical beliefs; trade-union membership; genetic data; biometric data used for uniquely identifying a person; and sexual orientation.',
      'Users should not voluntarily publish sensitive information about themselves or others unless necessary and permitted by the relevant feature.',
      'Where we need to process special-category data, we will identify an appropriate GDPR Article 9 condition before doing so.',
    ],
  },
  {
    id: 'p27',
    num: '27',
    title: "Children's Data",
    content: [
      '1 Euro Pass is intended for people aged 18 or older. We do not knowingly design the Platform for children under 18.',
      'If we learn that we have collected personal data from an individual who does not meet our minimum age requirement, we may take steps to delete the relevant account and information, subject to applicable law.',
    ],
  },
  {
    id: 'p28',
    num: '28',
    title: 'Third-Party Links',
    content: [
      'The Platform may contain links to third-party websites, applications, services, universities, businesses, travel providers, payment providers, or other resources.',
      'We are not responsible for the privacy practices of third parties that operate independently from us.',
      'You should review the privacy policy of any third-party service before providing personal data to it.',
    ],
  },
  {
    id: 'p29',
    num: '29',
    title: 'Social Login and Third-Party Authentication',
    content: [
      'If we offer login through a third-party service such as Google, Apple, or another authentication provider, that provider may provide us with certain account information.',
      'The information we receive depends on: the provider; your account settings; your permissions; and the authentication method.',
      "The third-party provider's own privacy policy also applies to its processing.",
    ],
  },
  {
    id: 'p30',
    num: '30',
    title: 'Analytics and Product Measurement',
    content: [
      'We may use analytics tools to understand: how users interact with the Platform; which features are used; technical performance; errors; conversion rates; general usage patterns; and Platform performance.',
      'Where applicable law requires consent for analytics technologies, we will request that consent before using them.',
      'Current analytics providers: [To be inserted].',
    ],
  },
  {
    id: 'p31',
    num: '31',
    title: 'Advertising',
    content: [
      'At launch, 1 Euro Pass may or may not use advertising or third-party advertising technologies.',
      'If advertising or targeted advertising is introduced, this Privacy Policy and our Cookie Policy will be updated to explain: the relevant providers; the data used; advertising purposes; profiling involved; legal bases; consent requirements; and available opt-out mechanisms.',
    ],
  },
  {
    id: 'p32',
    num: '32',
    title: 'Profiling',
    content: [
      'We may use automated processing to personalise: search results; recommendations; listings; events; connections; content; services; and other Platform experiences.',
      'Profiling means automated processing of personal data to evaluate or predict certain aspects relating to an individual.',
      'Where profiling is subject to specific GDPR rights or restrictions, we will comply with the applicable requirements.',
    ],
  },
  {
    id: 'p33',
    num: '33',
    title: 'User-Generated Information About Other People',
    content: [
      'You must not upload or publish personal data about another person unless you have a lawful basis to do so and are permitted to provide that information.',
      'This includes: identity documents; phone numbers; private addresses; private photographs; financial information; health information; private communications; and other confidential information.',
      'Users are responsible for respecting the privacy rights of other people when using the Platform.',
    ],
  },
  {
    id: 'p34',
    num: '34',
    title: 'Business Transfers',
    content: [
      'If 1 Euro Pass undergoes a merger, acquisition, restructuring, financing, sale of assets, corporate reorganisation, or similar transaction, personal data may be transferred as part of that transaction where legally permitted.',
      'Any such transfer will remain subject to applicable data-protection requirements.',
    ],
  },
  {
    id: 'p35',
    num: '35',
    title: 'Changes to This Privacy Policy',
    content: [
      'We may update this Privacy Policy from time to time.',
      'When we make material changes, we may notify you through: the Platform; email; an account notification; a banner or similar notice; or another appropriate method.',
      'The "Last Updated" date at the top of this policy indicates when it was most recently revised.',
    ],
  },
  {
    id: 'p36',
    num: '36',
    title: 'Contact Us',
    content: [
      'For privacy questions, GDPR requests, or concerns about the processing of your personal data:',
      '1 Euro Pass SIA, Riga, Latvia. Email: support@ieuropass.com',
    ],
  },
  {
    id: 'p37',
    num: '37',
    title: 'Related Policies',
    content: [
      'This Privacy Policy should be read together with:',
      'Terms & Conditions · Cookie Policy · Cookie Preference Centre · Refund & Cancellation Policy · Community Guidelines · Safety Guidelines · AI & Mystery Match Policy · Legal Notice / Imprint · Accessibility Statement',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — 1 Euro Pass</title>
        <meta name="description" content="Read the GDPR Privacy Policy for 1 Euro Pass, the student platform for Europe & UK. Learn how we collect, use and protect your personal data." />
        <link rel="canonical" href="https://1europass.com/privacy-policy" />
      </Helmet>
      <Navbar />
      <main style={{ background: '#f5f4ed', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <div style={{ padding: '56px 64px 48px', maxWidth: 900 }}>
          <h1 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 56, color: '#1a1a1a', lineHeight: 1.05, marginBottom: 20 }}>
            Privacy <span style={{ color: '#5dae61' }}>Policy</span>
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, fontWeight: 500, color: '#555', lineHeight: 1.8, maxWidth: 660, marginBottom: 28 }}>
            This Privacy Policy explains how 1 Euro Pass SIA collects, uses, stores, shares, and otherwise processes personal data when you use our website, mobile application, and related platform features. We process personal data in accordance with the GDPR (EU) 2016/679, applicable Latvian data-protection law, and other applicable legislation.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Last Updated', value: 'To be inserted' },
              { label: 'Effective Date', value: 'To be inserted' },
              { label: 'Framework', value: 'GDPR (EU) 2016/679' },
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
            This is a business/legal draft for 1 Euro Pass SIA. Before publication, it should be reviewed by a lawyer qualified in Latvian and EU data-protection law.
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
                style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '5px 0', textDecoration: 'none' }}
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
                <h2 style={{ fontFamily: 'Caveat Brush, cursive', fontSize: 28, color: '#fff', marginBottom: 6 }}>Questions about your data?</h2>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0 }}>Reach out for privacy or GDPR requests — we respond within one month.</p>
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
