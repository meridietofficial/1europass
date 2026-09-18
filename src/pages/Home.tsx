import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import HowItWorks from '../components/HowItWorks'
import ReachSection from '../components/ReachSection'
import PromoSection from '../components/PromoSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>1 Euro Pass — Everything for Student Life in Europe</title>
        <meta name="description" content="Find student housing, roommates, tutors, buy & sell items, trips and more across Europe & UK. Built for international students." />
        <link rel="canonical" href="https://1europass.com/" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <div className="content-card">
          <Categories />
          <HowItWorks />
          <ReachSection />
          <PromoSection />
        </div>
      </main>
      <Footer />
    </>
  )
}
