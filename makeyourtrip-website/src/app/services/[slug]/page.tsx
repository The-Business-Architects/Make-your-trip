import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import ServiceFaqAccordion from '@/components/services/ServiceFaqAccordion'
import { servicesData } from '@/data/services'
import styles from './page.module.css'

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)
  if (!service) return {}

  const canonicalUrl = `https://www.makeyourtripinc.com/services/${service.slug}/`

  return {
    title: {
      absolute: service.metaTitle,
    },
    description: service.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      service.primaryKeyword,
      ...service.targetKeywords,
      'makeyourtrip inc',
      'managed travel agency',
    ],
    openGraph: {
      title: `${service.title} | MakeYourTrip Inc.`,
      description: service.heroSubtitle,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: service.featuredDestinations[0]?.image || '/images/hero/hero-main.jpg',
          width: 1200,
          height: 800,
          alt: `${service.title} — MakeYourTrip Inc.`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | MakeYourTrip Inc.`,
      description: service.heroSubtitle,
      images: [service.featuredDestinations[0]?.image || '/images/hero/hero-main.jpg'],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.primaryKeyword,
    description: service.heroSubtitle,
    provider: {
      '@type': 'TravelAgency',
      name: 'MakeYourTrip Inc.',
      url: 'https://www.makeyourtripinc.com',
      telephone: '+1-650-729-0130',
      email: 'info@makeyourtripinc.com',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: d.title,
          description: d.description,
        },
      })),
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
        name: 'Travel Services',
        item: 'https://www.makeyourtripinc.com/services/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://www.makeyourtripinc.com/services/${service.slug}/`,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
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
      <Link href="/services">Services</Link>
      <span>/</span>
      <span>{service.shortTitle}</span>
    </>
  )

  const quickFacts = [
    {
      label: 'Specialty Scope',
      value: service.badgeText,
      icon: 'duration' as const,
    },
    {
      label: 'Service Mode',
      value: 'Dedicated Personal Specialist',
      icon: 'season' as const,
    },
    {
      label: 'Client Support',
      value: '24/7 Live Human Helpline',
      icon: 'visa' as const,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
        {/* 1. Page Hero */}
        <PageHero
          breadcrumbs={breadcrumbsNode}
          eyebrow={service.eyebrow}
          title={service.heroTitle}
          subtitle={service.heroSubtitle}
          quickFacts={quickFacts}
          ctaText="Request Consultation"
          ctaHref="/plan-your-trip"
        />

        {/* 2. Core Problem / Solution Section */}
        <section className={`section ${styles.problemSection}`} aria-labelledby="problem-heading">
          <div className="container">
            <div className={styles.problemInner}>
              <div className={styles.problemText}>
                <p className="eyebrow">The MakeYourTrip Difference</p>
                <hr className="divider" />
                <h2 className={styles.problemHeading} id="problem-heading">
                  {service.painPointHeading}
                </h2>
                {service.painPointParagraphs.map((para, i) => (
                  <p key={i} className={styles.problemPara}>{para}</p>
                ))}
              </div>
              <div className={styles.problemCard}>
                <div className={styles.problemCardHeader}>
                  <span className={styles.problemCardBadge}>Why Delegate to Us</span>
                  <h3 className={styles.problemCardTitle}>End-to-End Managed Clarity</h3>
                </div>
                <ul className={styles.problemList}>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Zero booking portals or chatbot loops</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Transparent quotes with no hidden fees</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Direct line to your personal travel manager</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Continuous on-trip assistance from start to return</span>
                  </li>
                </ul>
                <Link href="/plan-your-trip" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Start With a Free Route Inquiry →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Deliverables Grid: "What We Handle For You" */}
        <section className={`section ${styles.deliverablesSection}`} aria-labelledby="deliverables-heading">
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="eyebrow">Service Deliverables</p>
              <hr className="divider" />
              <h2 className="section-title" id="deliverables-heading">
                What We Handle <em>For You.</em>
              </h2>
              <p className="section-subtitle">
                A thorough breakdown of the exact planning and logistics managed under our {service.title} service.
              </p>
            </div>

            <div className={styles.deliverablesGrid}>
              {service.deliverables.map((item, idx) => (
                <article key={idx} className={styles.deliverableCard}>
                  <div className={styles.deliverableIconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.deliverableTitle}>{item.title}</h3>
                  <p className={styles.deliverableDesc}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Workflow Section: Step-by-Step Execution */}
        <section className={`section section--dark ${styles.workflowSection}`} aria-labelledby="workflow-heading">
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="eyebrow eyebrow--light">Our Process</p>
              <hr className="divider divider--light" />
              <h2 className="section-title section-title--light" id="workflow-heading">
                How It Works: <em>Four Steps to Departure.</em>
              </h2>
            </div>

            <div className={styles.workflowGrid}>
              {service.workflowSteps.map((step, idx) => (
                <div key={idx} className={styles.workflowCard}>
                  <div className={styles.workflowNumber} aria-hidden="true">{step.number}</div>
                  <h3 className={styles.workflowTitle}>{step.title}</h3>
                  <p className={styles.workflowDesc}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Destination Spotlight */}
        <section className={`section ${styles.destinationsSection}`} aria-labelledby="service-dest-heading">
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className="eyebrow">Worldwide Reach</p>
              <hr className="divider" />
              <h2 className="section-title" id="service-dest-heading">
                Popular Destinations for <em>{service.title}</em>
              </h2>
              <p className="section-subtitle">
                Explore a selection of global destinations where travelers frequently utilize our bespoke {service.title.toLowerCase()} service.
              </p>
            </div>

            <div className={styles.destinationsGrid}>
              {service.featuredDestinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}/`}
                  className={styles.destinationCard}
                >
                  <div className={styles.destImageWrap}>
                    <Image
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country} landmark view`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.destImage}
                    />
                    <div className={styles.destOverlay} aria-hidden="true" />
                    <div className={styles.destContent}>
                      <span className={styles.destCountry}>{dest.country}</span>
                      <h3 className={styles.destName}>{dest.name}</h3>
                      <span className={styles.destLinkText}>Explore Guide →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Service-Specific FAQs */}
        <ServiceFaqAccordion
          serviceTitle={service.title}
          faqs={service.faqs}
        />
      </main>

      <Footer />
    </>
  )
}
