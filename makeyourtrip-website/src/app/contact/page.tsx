import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Contact Us | MakeYourTrip Inc.',
  description: 'Get in touch with MakeYourTrip Inc. for personalized international travel assistance worldwide.',
}

const contactItems = [
  {
    label: 'Email',
    value: 'info@makeyourtripinc.com',
    href: 'mailto:info@makeyourtripinc.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'India Phone / WhatsApp',
    value: '+91 9528 203 267',
    href: 'tel:+919528203267',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'International Phone',
    value: '+1 (650) 729-0130',
    href: 'tel:+16507290130',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Assistance Timings',
    value: 'Mon - Fri, Working Hours',
    href: null,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Serving',
    value: 'Worldwide',
    href: null,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Get in Touch"
          title="Contact Us"
          subtitle="We're here to help with your international travel planning."
        />

        <section className={`section ${styles.contactSection}`} aria-label="Contact details">
          <div className="container">
            <div className={styles.contactGrid}>

              {/* Contact info column */}
              <div className={styles.infoCol}>
                <p className="eyebrow">Reach Us</p>
                <hr className="divider" />
                <h2 className={styles.infoHeading}>
                  We&apos;d Love to Hear From You
                </h2>
                <p className={styles.infoSubtext}>
                  Our team is available to assist with any aspect of your international journey. Reach out directly, or use the inquiry form to get started.
                </p>
                <address className={styles.contactItems} style={{ fontStyle: 'normal' }}>
                  {contactItems.map(({ label, value, href, icon }) => (
                    <div key={label} className={styles.contactItem}>
                      <span className={styles.contactIcon} aria-hidden="true">{icon}</span>
                      <div className={styles.contactItemText}>
                        <span className={styles.contactLabel}>{label}</span>
                        {href ? (
                          <a href={href} className={styles.contactValue}>{value}</a>
                        ) : (
                          <span className={styles.contactValue}>{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </address>
              </div>

              {/* CTA card */}
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardInner}>
                  <p className="eyebrow eyebrow--light">Preferred Method</p>
                  <h2 className={styles.ctaHeading}>
                    Ready to Plan Your Journey?
                  </h2>
                  <p className={styles.ctaText}>
                    The fastest way to get assistance is through our inquiry form. Share your trip details and we&apos;ll respond promptly.
                  </p>
                  <Link href="/plan-your-trip" className="btn btn--accent btn--lg" id="contact-plan-cta">
                    Plan My Trip →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
