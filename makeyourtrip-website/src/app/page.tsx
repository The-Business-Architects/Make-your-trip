import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Introduction from '@/components/sections/Introduction'
import HomeBookingSection from '@/components/sections/HomeBookingSection'
import Destinations from '@/components/sections/Destinations'
import HowItWorks from '@/components/sections/HowItWorks'
import HomeFaq from '@/components/sections/HomeFaq'
import { homeFaqs } from '@/data/homeFaqs'
import Testimonials from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  title: 'MakeYourTrip Inc. | Managed International Travel Agency & Itinerary Planning',
  description:
    'MakeYourTrip Inc. helps travelers worldwide plan bespoke international journeys, book flight routes, and handle visas. Tell us where you are going — we manage the rest.',
  alternates: {
    canonical: 'https://www.makeyourtripinc.com/',
  },
  keywords: [
    'makeyourtrip',
    'make your trip inc',
    'makeyourtrip travel',
    'full service travel agency',
    'pay someone to plan my vacation',
    'hire travel agent to plan trip',
    'travel agent that does everything for you',
    'custom trip planner',
    'international travel consultancy',
    'bespoke travel planner',
    'travel agency to manage my trip',
    'travel agent that handles visas and flights',
    'personalized travel itinerary service',
    'done for you travel planning',
    'private travel concierge',
  ],
  openGraph: {
    title: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
    description:
      'Personalized international travel assistance for travelers worldwide. We manage flights, visas, ground transit, and daily routes.',
    url: 'https://www.makeyourtripinc.com',
  },
}

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'MakeYourTrip Inc. | Managed International Travel Agency & Itinerary Planning',
    url: 'https://www.makeyourtripinc.com/',
    description:
      'MakeYourTrip Inc. helps travelers worldwide plan bespoke international journeys, book flight routes, and handle visas.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'MakeYourTrip Inc.',
      url: 'https://www.makeyourtripinc.com/',
    },
    about: [
      { '@type': 'Thing', name: 'International Travel Planning' },
      { '@type': 'Thing', name: 'Custom Travel Itineraries' },
      { '@type': 'Thing', name: 'Travel Visa Assistance' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <HowItWorks />
        <Destinations />
        <Introduction />
        <HomeBookingSection />
        <HomeFaq />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
