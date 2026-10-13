import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import FaqAccordionSection from '@/components/ui/FaqAccordionSection'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About MakeYourTrip Inc. | Managed International Travel Agency & Consultancy',
  description:
    'Learn about MakeYourTrip Inc., a premier international travel consultancy. We replace automated booking portals with dedicated human travel managers for custom routes, flights, and visas.',
  alternates: {
    canonical: 'https://www.makeyourtripinc.com/about/',
  },
  keywords: [
    'makeyourtrip',
    'make your trip inc',
    'make your trip agency',
    'about makeyourtrip',
    'full service travel agency',
    'personal travel agent for international travel',
    'hire travel agent to plan trip',
    'travel agent that does everything for you',
    'international travel consultancy',
    'private travel concierge',
    'done for you travel planning',
  ],
  openGraph: {
    title: 'About MakeYourTrip Inc. | Managed International Travel Agency & Consultancy',
    description:
      'Personalized international travel planning with zero automated algorithms. Meet MakeYourTrip Inc. — your dedicated partner for custom routes, flights, and visas.',
    url: 'https://www.makeyourtripinc.com/about/',
  },
}

const aboutFaqs = [
  {
    question: 'How does MakeYourTrip Inc. differ from mass-market portals like MakeMyTrip or Expedia?',
    answer:
      'MakeYourTrip Inc. is an independent, boutique travel consultancy offering dedicated 1-on-1 human advisory services rather than an automated self-serve ticket aggregator. When you work with MakeYourTrip Inc., you do not deal with automated chatbots or rigid booking algorithms. A dedicated travel manager designs your day-by-day route, coordinates flights, audits visa compliance, and supports you live 24/7 throughout your journey.',
  },
  {
    question: 'Why should I hire a personal travel agent instead of planning the trip myself?',
    answer:
      'The average international journey requires over 30 hours of cross-referencing disjointed blogs, navigating multi-city rail schedules, and deciphering foreign visa protocols. One missed connection or ambiguous consular requirement can derail days of hard-earned vacation. By delegating logistics to MakeYourTrip Inc., you eliminate planning burnout and travel with complete peace of mind.',
  },
  {
    question: 'What specific travel logistics does MakeYourTrip Inc. manage?',
    answer:
      'We manage bespoke day-by-day route architecture, international flight routing and connection protections, tourist visa documentation and consular audits, multi-modal ground transit guidance, and 24/7 on-trip emergency support. We do not sell or book hotel rooms, leaving you complete freedom to book your preferred accommodations directly or redeem your personal loyalty points.',
  },
  {
    question: 'How does your travel consultation and pricing work?',
    answer:
      'Our initial consultation and preliminary route proposal are completely complimentary with zero commitment. Once you review and approve the travel blueprint, we present a transparent, itemized quote with zero hidden booking surcharges.',
  },
  {
    question: 'Do you provide live assistance while we are traveling abroad?',
    answer:
      'Yes. Every journey planned through MakeYourTrip Inc. includes 24/7 live human assistance via dedicated WhatsApp and telephone channels. If an airline reschedules your departure or train timing shifts, your dedicated specialist steps in immediately to rebook connections and coordinate transit.',
  },
]

const values = [
  {
    id: 'val-human',
    index: '01',
    title: '100% Dedicated Human Advisory',
    desc: 'You work directly with a dedicated travel manager who knows your personal pacing and priorities — zero automated bots or generic call centers.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'val-custom',
    index: '02',
    title: 'Custom Route Architecture',
    desc: 'Every itinerary is designed from a blank canvas. We never sell inflexible pre-packaged group tours or mass-market tourist itineraries.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
      </svg>
    ),
  },
  {
    id: 'val-clarity',
    index: '03',
    title: 'Transparent Pricing & Quotes',
    desc: 'Completely clear, itemized quotes with zero hidden markups or surprise fees. Initial consultations and route blueprints are always complimentary.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  },
  {
    id: 'val-lifeline',
    index: '04',
    title: '24/7 Real-Time Traveler Lifeline',
    desc: 'Flight delayed? Terminal changed? Your personal advisor is on standby around the clock to rebook connections and solve disruptions live.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About MakeYourTrip Inc.',
    description:
      'MakeYourTrip Inc. is a bespoke international travel consultancy providing tailored itinerary architecture, flight route optimization, visa paperwork guidance, and 24/7 human travel support.',
    url: 'https://www.makeyourtripinc.com/about/',
    mainEntity: {
      '@type': 'Organization',
      name: 'MakeYourTrip Inc.',
      legalName: 'MakeYourTrip Inc.',
      url: 'https://www.makeyourtripinc.com',
      logo: 'https://www.makeyourtripinc.com/images/brand/logo.svg',
      telephone: '+919528203267',
      email: 'info@makeyourtripinc.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2108 N ST #7740',
        addressLocality: 'Sacramento',
        addressRegion: 'CA',
        postalCode: '95816',
        addressCountry: 'US',
      },
      foundingDate: '2024',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Worldwide',
      },
      knowsAbout: [
        'International Route Architecture',
        'Custom Travel Itinerary Planning',
        'Flight Layover Optimization',
        'Tourist Visa Guidance',
        '24/7 Emergency Traveler Assistance',
      ],
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
        name: 'About Us',
        item: 'https://www.makeyourtripinc.com/about/',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: aboutFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
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
              <span>About Us</span>
            </>
          }
          eyebrow="Our Story & Philosophy"
          title="A Managed Travel Agency Built Around Real People"
          subtitle="We founded MakeYourTrip Inc. to take the cognitive burnout out of international travel. Bespoke route planning, smart flight logistics, and zero robotic call centers."
          ctaText="Plan Your Journey"
          ctaHref="/plan-your-trip"
          secondaryCtaText="Explore Services"
          secondaryCtaHref="/services"
        />

        {/* Story Section */}
        <section className={`section ${styles.storySection}`} aria-labelledby="about-story-heading">
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyText}>
                <p className="eyebrow">Why We Exist</p>
                <hr className="divider" />
                <h2 id="about-story-heading" className={styles.storyHeading}>
                  Travel Planning Reimagined for <em>Modern Travelers.</em>
                </h2>
                <p className={styles.bodyText}>
                  International travel is supposed to be invigorating. Yet for most people, the planning phase quickly devolves into an exhausting ordeal: juggling dozens of browser tabs, deciphering opaque visa guidelines, and worrying about risky airport connections.
                </p>
                <p className={styles.bodyText}>
                  Modern travel apps have automated booking, but they have completely eliminated human accountability. When a flight is canceled or foreign transit schedules change, automated customer service leaves travelers stranded on hold for hours.
                </p>
                <p className={styles.bodyText}>
                  <strong>MakeYourTrip Inc.</strong> bridges that gap. We combine deep route intelligence with personal human care. Whether you are navigating complex multi-country rail connections across Europe or coordinating international paperwork, you have an experienced specialist managing the details behind the scenes.
                </p>
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <Link href="/plan-your-trip" className="btn btn--primary" id="about-cta">
                    Start Your Trip Consultation →
                  </Link>
                </div>
              </div>

              <div className={styles.storyImgWrap}>
                <Image
                  src="/images/misc/travel-journey-plan.jpg"
                  alt="Curated travel itinerary journal with passport, flight boarding passes, and world map"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 960px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className={styles.storyImgOverlay} aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* How We Compare Section */}
        <section className={`section ${styles.diffSection}`} aria-labelledby="diff-heading">
          <div className="container">
            <div className={styles.diffHead}>
              <p className="eyebrow">The Difference</p>
              <hr className="divider" />
              <h2 id="diff-heading" className={styles.diffHeading}>
                How MakeYourTrip Inc. Compares to <em>Standard Booking Apps.</em>
              </h2>
              <p className={styles.diffSubtitle}>
                See why discerning travelers choose dedicated managed travel over algorithmic online aggregators.
              </p>
            </div>

            <div className={styles.diffGrid}>
              {/* Other portals card */}
              <div className={styles.diffCard}>
                <div className={styles.diffCardHeader}>
                  <h3 className={styles.diffCardTitle}>Algorithmic Booking Portals</h3>
                  <span className={`${styles.diffCardTag} ${styles.tagOther}`}>Mass Market OTAs</span>
                </div>
                <ul className={styles.diffList}>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCross} aria-hidden="true">✕</span>
                    <span>Automated chatbots and overseas offshore call centers with long hold times.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCross} aria-hidden="true">✕</span>
                    <span>Stitches together risky 45-minute layovers to display the lowest raw price.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCross} aria-hidden="true">✕</span>
                    <span>Zero assistance with destination visa paperwork, customs rules, or entry forms.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCross} aria-hidden="true">✕</span>
                    <span>Leaves you completely on your own when an airline cancels or delays your connection.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCross} aria-hidden="true">✕</span>
                    <span>Generic, cookie-cutter recommendations driven by affiliate sponsorships.</span>
                  </li>
                </ul>
              </div>

              {/* MakeYourTrip Inc card */}
              <div className={`${styles.diffCard} ${styles.diffCardUs}`}>
                <div className={styles.diffCardHeader}>
                  <h3 className={styles.diffCardTitle}>MakeYourTrip Inc.</h3>
                  <span className={`${styles.diffCardTag} ${styles.tagUs}`}>Managed Travel</span>
                </div>
                <ul className={styles.diffList}>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCheck} aria-hidden="true">✓</span>
                    <span>A dedicated personal travel manager accessible directly on WhatsApp and phone.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCheck} aria-hidden="true">✓</span>
                    <span>Buffer-protected flight itineraries engineered for realistic terminal transit.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCheck} aria-hidden="true">✓</span>
                    <span>Complete consular visa audits, document checklists, and application reviews.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCheck} aria-hidden="true">✓</span>
                    <span>Proactive 24/7 flight tracking and instant live rebooking support abroad.</span>
                  </li>
                  <li className={styles.diffItem}>
                    <span className={styles.diffBulletCheck} aria-hidden="true">✓</span>
                    <span>100% bespoke day-by-day itineraries tailored to your individual rhythm and pace.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values / Principles */}
        <section className={`section ${styles.valuesSection}`} aria-labelledby="values-heading">
          <div className="container">
            <div className={styles.valuesHead}>
              <p className="eyebrow">Our Principles</p>
              <h2 id="values-heading" className={styles.valuesHeading}>
                How We Deliver <em>Uncompromising Quality.</em>
              </h2>
              <p className={styles.valuesSubtitle}>
                Four foundational commitments that guide every travel itinerary we build.
              </p>
            </div>
            <div className={styles.valuesGrid}>
              {values.map(({ id, index, icon, title, desc }) => (
                <div key={id} id={id} className={styles.valueCard}>
                  <span className={styles.valueIndex} aria-hidden="true">Step {index}</span>
                  <div className={styles.valueIcon} aria-hidden="true">{icon}</div>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqAccordionSection
          id="about-faqs"
          eyebrow="Common Inquiries"
          heading={
            <>
              Frequently Asked Questions About <em>MakeYourTrip Inc.</em>
            </>
          }
          subheading="Everything you need to know about our company, planning process, and traveler commitments."
          faqs={aboutFaqs}
        />
      </main>
      <Footer />
    </>
  )
}
