import type { Metadata } from 'next'
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
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Let's Plan Your Journey"
          className={styles.compactHero}
        >
          <div className={styles.heroContactBlock}>
            <p className={styles.heroContactTitle}>Prefer to Reach Us Directly?</p>
            <div className={styles.heroContactGrid}>
              <a href="tel:+910000000000" className={styles.heroContactItem}>
                <span className={styles.heroContactLabel}>India</span>
                <span className={styles.heroContactLink}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91 000 000 0000
                </span>
              </a>
              <div className={styles.heroContactDivider} aria-hidden="true" />
              <a href="tel:+18000000000" className={styles.heroContactItem}>
                <span className={styles.heroContactLabel}>International</span>
                <span className={styles.heroContactLink}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +1 (800) 000-0000
                </span>
              </a>
            </div>
          </div>
        </PageHero>

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
