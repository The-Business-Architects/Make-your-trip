import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import InquiryForm from '@/components/forms/InquiryForm'
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
          eyebrow="Get Started"
          title="Let's Plan Your Journey"
          subtitle="Tell us a little about your trip and our team will get back to you."
        />

        <section className={`section ${styles.formSection}`} aria-label="Travel inquiry form">
          <div className={`container ${styles.layout}`}>

            {/* Left: Form */}
            <div className={styles.formCol}>
              <InquiryForm />
            </div>

            {/* Right: Info sidebar */}
            <aside className={styles.sidebar} aria-label="Contact information">
              <div className={styles.sidebarCard}>
                <h2 className={styles.sidebarTitle}>What Happens Next?</h2>
                <ol className={styles.stepsList}>
                  {[
                    'We receive your inquiry and review your requirements.',
                    'A member of our team gets in touch to discuss your options.',
                    'We help you move forward with the right plan for your journey.',
                  ].map((step, i) => (
                    <li key={i} className={styles.stepsItem}>
                      <span className={styles.stepsNum} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.sidebarCard}>
                <h2 className={styles.sidebarTitle}>Prefer to Reach Us Directly?</h2>
                <address style={{ fontStyle: 'normal' }}>
                  <p className={styles.contactItem}>
                    <span className={styles.contactLabel}>Email</span>
                    <a href="mailto:info@makeyourtripinc.com" className={styles.contactLink}>
                      info@makeyourtripinc.com
                    </a>
                  </p>
                  <p className={styles.contactItem}>
                    <span className={styles.contactLabel}>Phone / WhatsApp</span>
                    <a href="tel:+18000000000" className={styles.contactLink}>
                      +1 (800) 000-0000
                    </a>
                  </p>
                </address>
              </div>

              <div className={styles.sidebarCard + ' ' + styles.sidebarCardDark}>
                <p className={styles.sidebarNote}>
                  Serving travelers across the <strong>USA, Canada, and United Kingdom.</strong>
                </p>
              </div>
            </aside>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
