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
