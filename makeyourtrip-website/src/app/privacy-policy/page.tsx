import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import styles from '../terms/page.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy | MakeYourTrip Inc.',
  description: 'Privacy Policy for MakeYourTrip Inc. — how we collect, use, and protect your personal information.',
}

const sections = [
  {
    heading: '1. Information We Collect',
    body: 'We collect information you provide when submitting a travel inquiry, including your name, email address, phone number, country of residence, and travel details. We do not collect payment information.',
  },
  {
    heading: '2. How We Use Your Information',
    body: 'The information you provide is used solely to respond to your travel inquiry and provide personalized travel assistance. We do not sell, share, or distribute your personal information to third parties without your consent.',
  },
  {
    heading: '3. Data Security',
    body: 'We take reasonable precautions to protect your personal information. Inquiry submissions are transmitted securely and stored only as long as necessary to process your request.',
  },
  {
    heading: '4. Cookies',
    body: 'Our website may use basic cookies for functionality purposes. We do not use tracking cookies or third-party advertising cookies.',
  },
  {
    heading: '5. Your Rights',
    body: 'You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, contact us at info@makeyourtripinc.com.',
  },
  {
    heading: '6. Contact',
    body: 'For privacy-related questions, please contact us at info@makeyourtripinc.com.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero eyebrow="Legal" title="Privacy Policy" />
        <section className={`section ${styles.legalSection}`} aria-label="Privacy policy content">
          <div className="container container--narrow">
            <p className={styles.lastUpdated}>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className={styles.sectionsList}>
              {sections.map(({ heading, body }) => (
                <div key={heading} className={styles.legalItem}>
                  <h2 className={styles.legalHeading}>{heading}</h2>
                  <p className={styles.legalBody}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
