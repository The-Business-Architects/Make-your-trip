import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import DestinationsDirectory from './DestinationsDirectory'

export const metadata: Metadata = {
  title: 'Destinations | International Journeys & Itineraries',
  description: 'Explore premier destinations across Europe, Asia, the Americas, and the Middle East. MakeYourTrip Inc. manages your full international itinerary.',
}

export default function DestinationsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.makeyourtripinc.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Destinations',
        item: 'https://www.makeyourtripinc.com/destinations/',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main id="main-content">
        <PageHero
          breadcrumbs={
            <>
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Destinations</span>
            </>
          }
          eyebrow="Explore the World"
          title="Where Will You Go Next?"
          subtitle="Browse international travel destinations, sample itineraries, and complete journey logistics handled by our team."
          ctaText="Plan Your Trip"
          ctaHref="/plan-your-trip"
        />

        <section className="section" aria-label="Destinations catalog">
          <div className="container container--wide">
            <DestinationsDirectory />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
