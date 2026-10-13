import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import FaqAccordionSection from '@/components/ui/FaqAccordionSection'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Contact MakeYourTrip Inc. | Official Phone Number, WhatsApp & Consultation',
  description:
    'Contact MakeYourTrip Inc. for expert international travel planning. Call or WhatsApp +91 95282 03267, email info@makeyourtripinc.com, or request a complimentary travel consultation.',
  alternates: {
    canonical: 'https://www.makeyourtripinc.com/contact/',
  },
  keywords: [
    'makeyourtrip contact number',
    'make your trip inc phone number',
    'makeyourtrip travel contact',
    'make your trip email',
    'hire travel agent consultation',
    'contact international travel planner',
    'makeyourtrip customer service',
    'pay someone to plan my vacation contact',
  ],
  openGraph: {
    title: 'Contact MakeYourTrip Inc. | Official Phone Number & Travel Consultation',
    description:
      'Connect with MakeYourTrip Inc. Direct phone and WhatsApp line (+91 95282 03267), email, and complimentary travel consultation.',
    url: 'https://www.makeyourtripinc.com/contact/',
  },
}

const contactFaqs = [
  {
    question: 'How quickly does MakeYourTrip Inc. respond to new inquiries?',
    answer:
      'Our travel advisory team responds to all new inquiries within 2 to 4 business hours, and guaranteed within 24 hours. For clients currently traveling abroad on an active itinerary, our 24/7 emergency concierge helpline operates around the clock with immediate response.',
  },
  {
    question: 'Is the initial travel consultation and route blueprint free?',
    answer:
      'Yes, 100%. Your initial discovery conversation and preliminary itinerary concept are completely complimentary with zero commitment. You only proceed when you are completely satisfied with the proposed route.',
  },
  {
    question: 'What details should I provide in my travel inquiry?',
    answer:
      'To help us craft the most accurate itinerary proposal, share your target destinations, estimated travel dates or season, total travelers (including any children or seniors), and preferred travel style (e.g. relaxed, cultural, multi-city rail, scenic nature).',
  },
  {
    question: 'Can I reach my travel manager via WhatsApp during my journey?',
    answer:
      'Yes. Prior to your departure, you are provided with direct WhatsApp and voice contact numbers for your assigned travel specialist. You communicate directly with a dedicated human travel advisor throughout your entire trip.',
  },
]

const contactItems = [
  {
    label: 'Corporate Headquarters',
    value: '2108 N ST #7740, Sacramento, CA, 95816, USA',
    href: undefined,
    subtext: 'MakeYourTrip Inc. Registered Office — Sacramento, California.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Telephone (Direct & International)',
    value: '+91 95282 03267',
    href: 'tel:+919528203267',
    subtext: 'Available for international travel consultations & client support.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp Quick Chat',
    value: '+91 95282 03267',
    href: 'https://wa.me/919528203267',
    subtext: 'Direct instant messaging with our travel management desk.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    label: 'Official Advisory Email',
    value: 'info@makeyourtripinc.com',
    href: 'mailto:info@makeyourtripinc.com',
    subtext: 'Send detailed journey briefs, flight preferences, or inquiries.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Service Coverage & Availability',
    value: 'Worldwide Assistance (24/7 Helpline)',
    href: undefined,
    subtext: 'Advisory services provided to travelers globally across all time zones.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact MakeYourTrip Inc.',
    description:
      'Contact information and travel consultation desk for MakeYourTrip Inc.',
    url: 'https://www.makeyourtripinc.com/contact/',
    mainEntity: {
      '@type': 'Organization',
      name: 'MakeYourTrip Inc.',
      url: 'https://www.makeyourtripinc.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2108 N ST #7740',
        addressLocality: 'Sacramento',
        addressRegion: 'CA',
        postalCode: '95816',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+919528203267',
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        email: 'info@makeyourtripinc.com',
        areaServed: 'Worldwide',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      },
    },
  }

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
        name: 'Contact Us',
        item: 'https://www.makeyourtripinc.com/contact/',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main id="main-content">
        {/* Page Hero with Left-aligned Breadcrumbs */}
        <PageHero
          breadcrumbs={
            <>
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Contact</span>
            </>
          }
          eyebrow="Direct Travel Advisory Desk"
          title="Connect with a Dedicated Travel Specialist"
          subtitle="Whether you have an upcoming trip to plan or need advice on international flight routes and visa paperwork, our team is directly accessible."
          ctaText="Submit Online Inquiry"
          ctaHref="/plan-your-trip"
          secondaryCtaText="Call Now / WhatsApp"
          secondaryCtaHref="tel:+919528203267"
        />

        {/* Contact Section */}
        <section className={`section ${styles.contactSection}`} aria-label="Contact details">
          <div className="container">
            <div className={styles.contactGrid}>

              {/* Direct Info Column */}
              <div className={styles.infoCol}>
                <p className="eyebrow">Direct Communication</p>
                <hr className="divider" />
                <h2 className={styles.infoHeading}>
                  Speak to a <em>Real Person.</em>
                </h2>
                <p className={styles.infoSubtext}>
                  We believe personal travel requires human attention. Reach out through any of our direct channels below, and an experienced travel manager will assist you promptly.
                </p>

                <address className={styles.contactItems} style={{ fontStyle: 'normal' }}>
                  {contactItems.map(({ label, value, href, subtext, icon }) => (
                    <div key={label} className={styles.contactItem}>
                      <span className={styles.contactIcon} aria-hidden="true">{icon}</span>
                      <div className={styles.contactItemText}>
                        <span className={styles.contactLabel}>{label}</span>
                        {href ? (
                          <a href={href} className={styles.contactValue}>{value}</a>
                        ) : (
                          <span className={styles.contactValue}>{value}</span>
                        )}
                        {subtext && <p className={styles.contactSubtext}>{subtext}</p>}
                      </div>
                    </div>
                  ))}
                </address>
              </div>

              {/* Consultation Inquiry Card */}
              <div className={styles.ctaCard}>
                <div className={styles.ctaCardInner}>
                  <p className="eyebrow" style={{ color: '#93c5fd', marginBottom: 0 }}>Start Your Journey</p>
                  <h3 className={styles.ctaHeading}>
                    Request a Custom <em>Route Blueprint.</em>
                  </h3>
                  <p className={styles.ctaText}>
                    Share your destinations, estimated travel window, and preferred pacing. We will prepare a personalized journey outline with zero obligation.
                  </p>

                  <ul className={styles.ctaBullets}>
                    <li className={styles.ctaBulletItem}>
                      <span className={styles.ctaBulletIcon} aria-hidden="true">✓</span>
                      <span>100% complimentary initial routing consultation</span>
                    </li>
                    <li className={styles.ctaBulletItem}>
                      <span className={styles.ctaBulletIcon} aria-hidden="true">✓</span>
                      <span>Detailed day-by-day pace and transit recommendations</span>
                    </li>
                    <li className={styles.ctaBulletItem}>
                      <span className={styles.ctaBulletIcon} aria-hidden="true">✓</span>
                      <span>Flight connection audits and visa requirement roadmaps</span>
                    </li>
                  </ul>

                  <div style={{ marginTop: 'var(--space-2)' }}>
                    <Link href="/plan-your-trip" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Complete Travel Inquiry Form →
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Pre-Inquiry FAQ Section */}
        <FaqAccordionSection
          id="contact-faqs"
          eyebrow="Pre-Consultation Questions"
          heading={
            <>
              Common Questions Before <em>Reaching Out.</em>
            </>
          }
          subheading="Quick answers regarding our response times, complimentary consultations, and communication protocols."
          faqs={contactFaqs}
        />
      </main>
      <Footer />
    </>
  )
}
