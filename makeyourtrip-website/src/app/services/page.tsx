import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import HowItWorks from '@/components/sections/HowItWorks'
import FaqAccordionSection from '@/components/ui/FaqAccordionSection'
import { servicesData } from '@/data/services'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Managed International Travel Services | MakeYourTrip Inc.',
  },
  description:
    'Explore our comprehensive travel services: custom trip planning, smart flight booking, visa paperwork help, destination advice, group travel, and 24/7 on-trip support.',
  alternates: {
    canonical: 'https://www.makeyourtripinc.com/services/',
  },
  keywords: [
    'makeyourtrip services',
    'international travel management services',
    'custom trip planning',
    'international flight booking assistance',
    'travel visa help',
    'expert destination travel advice',
    'group travel planning service',
    '24 7 travel support service',
  ],
}

const serviceIcons: Record<string, React.ReactNode> = {
  'custom-trip-planning': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  'smart-flight-booking': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13"/>
      <path d="M22 2L15 22 11 13 2 9l20-7z"/>
    </svg>
  ),
  'visa-paperwork-help': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'local-travel-advice': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'group-and-work-travel': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  '24-7-travel-support': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
}

const servicesFaqs = [
  {
    question: 'Can I bundle all of these travel services into a single managed journey?',
    answer:
      'Yes, absolutely. Most of our clients prefer our comprehensive managed travel package, which combines custom route architecture, flight layover optimization, visa documentation audits, destination transit guides, and 24/7 on-trip assistance under one dedicated travel manager.',
  },
  {
    question: 'Can I hire MakeYourTrip Inc. for standalone services (e.g. flight booking or visa help only)?',
    answer:
      'Yes. If you have already mapped out your journey but need expert flight routing, visa paperwork reviews, or group travel synchronization, you can hire our specialists specifically for the individual service you require.',
  },
  {
    question: 'Do you book hotels or accommodations as part of your services?',
    answer:
      'No. MakeYourTrip Inc. focuses strictly on route architecture, flight routing, visa compliance, local transit navigation, and 24/7 traveler support. We do not sell hotel inventory, giving you complete freedom to book your preferred accommodations directly or redeem personal credit card points.',
  },
  {
    question: 'How do quotes work and is the initial consultation free?',
    answer:
      'Our initial discovery conversation and preliminary itinerary concept are 100% complimentary with zero obligation. Once you review and approve the travel blueprint, we present a transparent, itemized quote with no hidden booking surcharges.',
  },
]

export default function ServicesPage() {
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
        name: 'Travel Services',
        item: 'https://www.makeyourtripinc.com/services/',
      },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MakeYourTrip Inc. Travel Management Services',
    itemListElement: servicesData.map((service, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: service.title,
      url: `https://www.makeyourtripinc.com/services/${service.slug}/`,
      description: service.heroSubtitle,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: servicesFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbsNode = (
    <>
      <Link href="/">Home</Link>
      <span>/</span>
      <span>Travel Services</span>
    </>
  )

  const quickFacts = [
    {
      label: 'Planning Model',
      value: '100% Tailored Routes',
      icon: 'duration' as const,
    },
    {
      label: 'Advisory Mode',
      value: 'Dedicated Personal Specialist',
      icon: 'season' as const,
    },
    {
      label: 'Traveler Lifeline',
      value: '24/7 Live Human Helpline',
      icon: 'visa' as const,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main id="main-content">
        {/* Page Hero with Left-aligned Breadcrumbs & Quick Facts */}
        <PageHero
          breadcrumbs={breadcrumbsNode}
          eyebrow="Our Core Capabilities"
          title="Comprehensive Managed Travel Services"
          subtitle="From custom itinerary design and flight layover optimization to visa paperwork and 24/7 on-trip assistance — discover how MakeYourTrip Inc. manages your journey."
          quickFacts={quickFacts}
          ctaText="Start Your Trip Plan"
          ctaHref="/plan-your-trip"
        />

        {/* Services Showcase Grid */}
        <section className={`section ${styles.servicesSection}`} aria-label="Services roster">
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="eyebrow">Service Breakdown</p>
              <hr className="divider" />
              <h2 className={styles.sectionHeading}>
                Designed for Clarity, Built for <em>Flawless Execution.</em>
              </h2>
              <p className={styles.sectionSubtitle}>
                Select an individual service to view detailed deliverables, workflows, and transparent inclusions.
              </p>
            </div>

            <div className={styles.grid}>
              {servicesData.map((service, i) => (
                <article key={service.slug} id={service.slug} className={styles.card}>
                  {/* Top Bar */}
                  <div className={styles.cardTop}>
                    <div className={styles.cardTopLeft}>
                      <div className={styles.cardIcon} aria-hidden="true">
                        {serviceIcons[service.slug] || serviceIcons['custom-trip-planning']}
                      </div>
                      <span className={styles.cardNum}>SERVICE {String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span className={styles.badgePill}>{service.badgeText}</span>
                  </div>

                  {/* Body Text */}
                  <div className={styles.cardBody}>
                    <p className={styles.cardEyebrow}>{service.eyebrow}</p>
                    <h3 className={styles.cardTitle}>
                      <Link href={`/services/${service.slug}/`}>
                        {service.title}
                      </Link>
                    </h3>
                    <p className={styles.cardDesc}>{service.heroSubtitle}</p>
                  </div>

                  {/* Key Deliverables Bullet Points */}
                  <div className={styles.deliverablesBox}>
                    <p className={styles.deliverablesLabel}>Key Deliverables Handled:</p>
                    <ul className={styles.deliverablesList}>
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className={styles.deliverableItem}>
                          <span className={styles.checkIcon} aria-hidden="true">✓</span>
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link Button */}
                  <div className={styles.cardAction}>
                    <Link href={`/services/${service.slug}/`} className={styles.exploreBtn}>
                      <span>Explore Service Details</span>
                      <span className={styles.exploreBtnArrow} aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Scope Callout Banner */}
        <section className={styles.scopeSection} aria-label="Service scope notice">
          <div className="container">
            <div className={styles.scopeBox}>
              <div className={styles.scopeText}>
                <p className="eyebrow" style={{ marginBottom: 0 }}>Transparent Planning Model</p>
                <h3 className={styles.scopeHeading}>
                  We Engineer the Complex Logistics — <em>You Keep Complete Booking Freedom.</em>
                </h3>
                <p className={styles.scopeDesc}>
                  MakeYourTrip Inc. specializes exclusively in route architecture, air routing, consular visa compliance, and 24/7 on-trip assistance. We do not sell or lock you into pre-selected hotel blocks, leaving you 100% free to choose your preferred accommodations directly or redeem your credit card reward points.
                </p>
              </div>
              <div>
                <Link href="/plan-your-trip" className="btn btn--primary" style={{ whiteSpace: 'nowrap' }}>
                  Plan Your Journey →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Process Section */}
        <HowItWorks />

        {/* Category FAQ Accordion */}
        <FaqAccordionSection
          id="services-faqs"
          eyebrow="Category Questions"
          heading={
            <>
              Frequently Asked Questions About <em>Our Services.</em>
            </>
          }
          subheading="Learn how our planning process works, how services can be combined, and how we protect your journey."
          faqs={servicesFaqs}
        />
      </main>
      <Footer />
    </>
  )
}
