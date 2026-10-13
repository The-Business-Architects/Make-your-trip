import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import DestinationSlideshow from '@/components/destinations/DestinationSlideshow'
import DestinationHighlightsSlideshow from '@/components/destinations/DestinationHighlightsSlideshow'
import DestinationFaqAccordion from '@/components/destinations/DestinationFaqAccordion'
import DestinationCtaSection from '@/components/destinations/DestinationCtaSection'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { destinationsData } from '@/data/destinations'
import styles from './page.module.css'

export async function generateStaticParams() {
  return destinationsData.map((d) => ({
    slug: d.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const dest = destinationsData.find((d) => d.slug === slug)
  if (!dest) return {}

  const pageTitle = `${dest.name}, ${dest.country} Travel Guide & Highlights | MakeYourTrip Inc.`
  const pageDesc = `Discover ${dest.name}, ${dest.country}. Explore top landmark highlights, suggested exploration routes, seasonal weather, and travel tips.`
  const canonicalUrl = `https://www.makeyourtripinc.com/destinations/${dest.slug}/`

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${dest.name} travel guide`,
      `visit ${dest.name}`,
      `things to do in ${dest.name}`,
      `${dest.name} itinerary`,
      `places to visit in ${dest.name}`,
      `best time to visit ${dest.name}`,
      `${dest.name} travel agency`,
      `custom ${dest.name} trip planning`,
      `${dest.country} travel`,
      ...dest.tags.map((t) => `${dest.name} ${t.toLowerCase()}`),
    ],
    openGraph: {
      title: `${dest.name}, ${dest.country} — MakeYourTrip Inc.`,
      description: dest.heroSubtitle,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: dest.image,
          width: 1200,
          height: 800,
          alt: `${dest.name}, ${dest.country} landmark vista`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dest.name}, ${dest.country} Travel Guide | MakeYourTrip Inc.`,
      description: dest.heroSubtitle,
      images: [dest.image],
    },
  }
}

export default async function SingleDestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dest = destinationsData.find((d) => d.slug === slug)

  if (!dest) {
    notFound()
  }

  const inquiryUrl = `/plan-your-trip?destination=${encodeURIComponent(dest.name)}`
  const destinationUrl = `https://www.makeyourtripinc.com/destinations/${dest.slug}/`

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
      {
        '@type': 'ListItem',
        position: 3,
        name: dest.name,
        item: destinationUrl,
      },
    ],
  }

  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description: dest.heroSubtitle,
    url: destinationUrl,
    image: `https://www.makeyourtripinc.com${dest.image}`,
    touristType: dest.tags,
    containedInPlace: {
      '@type': 'Country',
      name: dest.country,
    },
    includesAttraction: dest.highlights.map((h) => ({
      '@type': 'TouristAttraction',
      name: h.title,
      description: h.desc,
      image: `https://www.makeyourtripinc.com${h.image}`,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dest.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main id="main-content" className={styles.page}>
        
        {/* 1. LIGHT BLUE ARCHITECTURAL HEADER HERO */}
        <PageHero
          breadcrumbs={
            <>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/destinations">Destinations</Link>
              <span>/</span>
              <span>{dest.name}</span>
            </>
          }
          eyebrow={`${dest.country} • ${dest.region}`}
          title={dest.heroTitle}
          subtitle={dest.heroSubtitle}
          quickFacts={[
            {
              label: 'Ideal Duration',
              value: dest.idealDuration,
              icon: 'duration',
            },
            {
              label: 'Best Time to Visit',
              value: dest.bestSeason,
              icon: 'season',
            },
            {
              label: 'Visa Guidance',
              value: dest.visaSupport,
              icon: 'visa',
            },
          ]}
          ctaText={`Plan My ${dest.name} Trip →`}
          ctaHref={inquiryUrl}
          secondaryCtaText="Explore Highlights ↓"
          secondaryCtaHref="#highlights"
        />

        {/* 2. GLIMPSES IMAGE SLIDESHOW (EDGE-TO-EDGE ON MOBILE, SMOOTH SCROLL REVEAL) */}
        <ScrollReveal>
          <DestinationSlideshow
            destinationName={dest.name}
            gallery={dest.gallery}
          />
        </ScrollReveal>

        {/* 3. DESTINATION OVERVIEW & CHARACTER (BALANCED 2-COLUMN LAYOUT) */}
        <section id="overview" className={styles.overviewSection} aria-label="Destination Overview">
          <div className="container">
            <div className={styles.overviewGrid}>
              <ScrollReveal>
                <div className={styles.overviewLeft}>
                  <h2 className={styles.sectionHeading}>Why Travel to {dest.name}?</h2>
                  <div className={styles.tagGroup} aria-label="Destination travel themes">
                    {dest.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <div className={styles.overviewRight}>
                  {dest.overview.map((para, i) => (
                    <p key={i} className={styles.paragraph}>{para}</p>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 4. HIGHLIGHT PLACES & ATTRACTIONS (INTERACTIVE SLIDESHOW) */}
        <ScrollReveal>
          <DestinationHighlightsSlideshow
            destinationName={dest.name}
            highlights={dest.highlights}
          />
        </ScrollReveal>

        {/* 5. SUGGESTED TRAVEL ROUTE (PURE DESTINATION ITINERARY) */}
        <section id="itinerary" className={styles.itinerarySection} aria-label="Sample Itinerary">
          <div className="container">
            <ScrollReveal>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionHeading}>{dest.sampleItinerary.title}</h2>
                <p className={styles.sectionSubtitle}>
                  A thoughtfully paced day-by-day exploration sequence designed to experience the best of {dest.name} without unnecessary transit rush.
                </p>
              </div>
            </ScrollReveal>

            <div className={styles.timeline}>
              {dest.sampleItinerary.days.map((item, index) => (
                <ScrollReveal key={index} delay={index * 75}>
                  <article className={styles.dayCard}>
                    <div className={styles.dayBadgeCol}>
                      <span className={styles.dayNumber}>{item.day}</span>
                    </div>
                    <div className={styles.dayContent}>
                      <h3 className={styles.dayTitle}>{item.title}</h3>
                      <p className={styles.dayDesc}>{item.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={120}>
              <p className={styles.itineraryDisclaimer}>
                * This is an illustrative suggested route. Pacing, day allocations, and points of interest can be customized based on your preferences.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. ESSENTIAL TRAVEL FAQS (MODERN ACCORDION INTERACTION WITH SCROLL REVEALS) */}
        <DestinationFaqAccordion
          destinationName={dest.name}
          faqs={dest.faqs}
        />

        {/* 7. DEDICATED INQUIRE CTA SECTION (LIGHT ARCHITECTURAL UI + 4-FIELD FORM) */}
        <ScrollReveal>
          <DestinationCtaSection
            destinationName={dest.name}
            country={dest.country}
          />
        </ScrollReveal>

      </main>
      <Footer />
    </>
  )
}
