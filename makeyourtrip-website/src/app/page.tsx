import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Introduction from '@/components/sections/Introduction'
import Services from '@/components/sections/Services'
import Destinations from '@/components/sections/Destinations'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyMYT from '@/components/sections/WhyMYT'
import Testimonials from '@/components/sections/Testimonials'
import BottomCTA from '@/components/sections/BottomCTA'

export const metadata: Metadata = {
  title: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
  description:
    'MakeYourTrip Inc. helps travelers across the USA, Canada, and UK plan international journeys with personalized assistance. Plan your trip today.',
  openGraph: {
    title: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
    description:
      'Personalized international travel assistance for travelers across the USA, Canada, and UK. Tell us where you\'re going — we\'ll help you plan the journey.',
    url: 'https://www.makeyourtripinc.com',
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Introduction />
        <Services />
        <Destinations />
        <HowItWorks />
        <WhyMYT />
        <Testimonials />
        <BottomCTA />
      </main>
      <Footer />
    </>
  )
}
