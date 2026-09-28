import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import HowItWorks from '@/components/sections/HowItWorks'
import BottomCTA from '@/components/sections/BottomCTA'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Travel Services | International Travel Assistance',
  description: 'MakeYourTrip Inc. offers personalized international travel assistance including flight guidance, trip planning, destination support, and business travel.',
}

const services = [
  { id: 'page-svc-flights',    title: 'International Flights',      desc: 'We help you navigate international flight options across major routes. Wherever you\'re traveling from, we\'ll guide you through available options and help you understand what to look for.', icon: '✈' },
  { id: 'page-svc-planning',   title: 'Personalized Trip Planning', desc: 'Tell us your destination, dates, and preferences — we\'ll help you build an itinerary that works for your schedule and needs. No templates. No one-size-fits-all packages.', icon: '📋' },
  { id: 'page-svc-guidance',   title: 'Destination Guidance',       desc: 'Understanding a destination before you travel makes all the difference. We provide context on key destinations to help you plan intelligently and travel with confidence.', icon: '🗺' },
  { id: 'page-svc-family',     title: 'Family & Group Travel',      desc: 'Coordinating travel for multiple people adds layers of complexity. We help families and groups manage the logistics of international travel — from flight coordination to travel timing.', icon: '👨‍👩‍👧‍👦' },
  { id: 'page-svc-business',   title: 'Business Travel',            desc: 'Professionals need reliable, efficient travel planning. We support business travelers with time-sensitive, accurate assistance to keep journeys on schedule.', icon: '💼' },
  { id: 'page-svc-assistance', title: 'General Travel Assistance',  desc: 'Sometimes you just need a reliable point of contact for your travel questions. We\'re available to assist with any stage of your international journey planning.', icon: '🤝' },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="What We Do"
          title="Travel Support Built Around Your Journey"
          subtitle="Every service we provide is designed to make international travel planning clearer, simpler, and more confident."
        />

        <section className={`section ${styles.servicesSection}`} aria-label="Services detail">
          <div className="container">
            <div className={styles.servicesList}>
              {services.map(({ id, title, desc }, i) => (
                <div key={id} id={id} className={styles.serviceRow}>
                  <div className={styles.serviceNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className={styles.serviceContent}>
                    <h2 className={styles.serviceTitle}>{title}</h2>
                    <p className={styles.serviceDesc}>{desc}</p>
                  </div>
                  <div className={styles.serviceAction}>
                    <Link href="/plan-your-trip" className="btn btn--secondary">
                      Inquire →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <BottomCTA />
      </main>
      <Footer />
    </>
  )
}
