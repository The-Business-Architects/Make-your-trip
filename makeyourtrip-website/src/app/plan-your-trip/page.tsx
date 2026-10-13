import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import InquiryForm from '@/components/forms/InquiryForm'
import { Suspense } from 'react'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Plan My Trip | Let\'s Plan Your Journey',
  description:
    'Tell us about your international trip and our team will get back to you with personalized travel assistance. Fill out our simple inquiry form.',
  openGraph: {
    title: 'Plan My Trip | MakeYourTrip Inc.',
    description: 'Tell us about your trip and our team will get back to you with personalized travel assistance.',
    url: 'https://www.makeyourtripinc.com/plan-your-trip',
  },
}

export default function PlanYourTripPage() {
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
        name: 'Plan Your Trip',
        item: 'https://www.makeyourtripinc.com/plan-your-trip/',
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
              <span>Plan Your Trip</span>
            </>
          }
          eyebrow="Travel Consultation"
          title="Let's Plan Your Journey"
          className={styles.compactHero}
        />

        <section className={`section ${styles.formSection}`} aria-label="Travel inquiry form">
          <div className={`container ${styles.layout}`}>
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading form...</div>}>
              <InquiryForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
