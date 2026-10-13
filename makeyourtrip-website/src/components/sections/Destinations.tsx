'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Destinations.module.css'

interface FeaturedDestination {
  id: string
  slug: string
  name: string
  country: string
  img: string
  tagline: string
  duration: string
  bestSeason: string
  visaSupport: string
  highlights: string[]
}

const featuredDestinations: FeaturedDestination[] = [
  {
    id: 'dest-tokyo',
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    img: '/images/destinations/tokyo.jpg',
    tagline: 'Futuristic metropolis steeped in ancient traditions and Michelin gastronomy.',
    duration: '5–7 Days',
    bestSeason: 'Mar–May & Oct–Nov',
    visaSupport: 'eVisa & Doc Prep',
    highlights: ['Shibuya Crossing & Shinjuku', 'Historic Asakusa Senso-ji', 'Omakase Dining & Outer Markets'],
  },
  {
    id: 'dest-paris',
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    img: '/images/destinations/paris.jpg',
    tagline: 'The iconic city of light, world-class art galleries, and romantic river promenades.',
    duration: '4–6 Days',
    bestSeason: 'Apr–Jun & Sep–Nov',
    visaSupport: 'Schengen Visa Guidance',
    highlights: ['Eiffel Tower & Seine Cruise', 'The Louvre & Historic Quarters', 'Montmartre Hidden Alleys'],
  },
  {
    id: 'dest-rome',
    slug: 'rome',
    name: 'Rome',
    country: 'Italy',
    img: '/images/destinations/rome.jpg',
    tagline: 'An open-air living museum where millennial antiquities meet vibrant piazzas.',
    duration: '4–5 Days',
    bestSeason: 'Apr–May & Sep–Oct',
    visaSupport: 'Schengen Visa Guidance',
    highlights: ['Colosseum & Roman Forum', 'Vatican Museums & Basilica', 'Trastevere Culinary Tastings'],
  },
  {
    id: 'dest-amalfi-coast',
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    img: '/images/destinations/amalfi-coast.jpg',
    tagline: 'Dramatic cliffside villages, azure Tyrrhenian waters, and coastal luxury.',
    duration: '4–6 Days',
    bestSeason: 'May–Oct',
    visaSupport: 'Schengen Visa Guidance',
    highlights: ['Positano Pastel Clifftops', 'Capri Private Boat Excursion', 'Ravello Scenic Clifftop Gardens'],
  },
  {
    id: 'dest-interlaken',
    slug: 'interlaken',
    name: 'Swiss Alps (Interlaken)',
    country: 'Switzerland',
    img: '/images/destinations/interlaken.jpg',
    tagline: 'Majestic glacier peaks, scenic panoramic trains, and crystal-clear alpine lakes.',
    duration: '5–7 Days',
    bestSeason: 'Jun–Sep & Dec–Mar',
    visaSupport: 'Schengen Visa Guidance',
    highlights: ['Jungfraujoch Top of Europe', 'Panoramic GoldenPass Train', 'Lake Brienz & Thun Cruises'],
  },
  {
    id: 'dest-dubai',
    slug: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    img: '/images/destinations/dubai.jpg',
    tagline: 'Ultra-modern skyscrapers, luxury desert sanctuaries, and futuristic architecture.',
    duration: '4–6 Days',
    bestSeason: 'Nov–Mar',
    visaSupport: 'Pre-Approved UAE Visa',
    highlights: ['Burj Khalifa & Downtown', 'Luxury Desert Conservation Safari', 'Marina Yacht Experiences'],
  },
]

export default function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const current = featuredDestinations[currentIndex]

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredDestinations.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredDestinations.length) % featuredDestinations.length)
  }, [])

  // Auto-advance slideshow every 5 seconds when not paused by user
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, nextSlide])

  return (
    <section className={`section ${styles.section}`} id="destinations" aria-labelledby="dest-heading">
      <div className={styles.sectionInner}>
        {/* Editorial Left Header */}
        <div className={`container container--wide ${styles.headWrap}`}>
          <div className={styles.head}>
            <h2 className="section-title" id="dest-heading">
              Featured Destinations for <em>Your Next Journey.</em>
            </h2>
          </div>
        </div>

        {/* Slideshow Showcase: Clean, no badges, no number counters */}
        <div className={styles.showcaseOuter}>
          <div
            className={styles.slideshowContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            aria-roledescription="carousel"
            aria-label="Featured destinations automatic slideshow"
          >
            {/* Visual Slide Display with Overlay Left & Right Buttons */}
            <div className={styles.slideDisplay}>
              {/* Background Images */}
              <div className={styles.imageWrapper}>
                {featuredDestinations.map((dest, idx) => {
                  const isActive = idx === currentIndex
                  return (
                    <div
                      key={dest.id}
                      className={`${styles.imageSlide} ${isActive ? styles.imageSlideActive : ''}`}
                      aria-hidden={!isActive}
                    >
                      <Image
                        src={dest.img}
                        alt={`${dest.name}, ${dest.country} — international travel destination`}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 900px) 100vw, 55vw"
                        className={styles.slideImg}
                      />
                      <div className={styles.imageOverlay} />
                    </div>
                  )
                })}
              </div>

              {/* In-Image Left & Right Navigation Buttons */}
              <button
                type="button"
                onClick={prevSlide}
                className={`${styles.imageNavBtn} ${styles.imageNavPrev}`}
                aria-label="Previous destination"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className={`${styles.imageNavBtn} ${styles.imageNavNext}`}
                aria-label="Next destination"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* In-Image Destination Name & Country */}
              <div className={styles.overlayBottom}>
                <span className={styles.countryText}>{current.country}</span>
                <h3 className={styles.destinationTitle}>{current.name}</h3>
              </div>
            </div>

            {/* Destination Details & Highlights Panel */}
            <div className={styles.detailsPanel}>
              <div className={styles.panelHeader}>
                <span className={styles.detailEyebrow}>Destination Overview</span>
                <h4 className={styles.panelTitle}>{current.name}, {current.country}</h4>
                <p className={styles.tagline}>{current.tagline}</p>
              </div>

              {/* Mobile Combined Feature Row: Recommended Stay & Highlights side-by-side */}
              <div className={styles.infoRowContainer}>
                {/* Stay Column */}
                <div className={styles.stayMetaCol}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Recommended Stay</span>
                    <span className={styles.metaValue}>{current.duration}</span>
                  </div>
                  <div className={`${styles.metaItem} ${styles.hideOnMobileExtra}`}>
                    <span className={styles.metaLabel}>Best Season</span>
                    <span className={styles.metaValue}>{current.bestSeason}</span>
                  </div>
                  <div className={`${styles.metaItem} ${styles.hideOnMobileExtra}`}>
                    <span className={styles.metaLabel}>Visa Guidance</span>
                    <span className={styles.metaValue}>{current.visaSupport}</span>
                  </div>
                </div>

                {/* Highlights Column */}
                <div className={styles.highlightsCol}>
                  <span className={styles.highlightsLabel}>Key Highlights</span>
                  <ul className={styles.highlightsList}>
                    {current.highlights.map((item, i) => (
                      <li key={i} className={styles.highlightItem}>
                        <svg
                          className={styles.checkIcon}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className={styles.highlightText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Extra logistics displayed cleanly as minimal rows */}
              <div className={styles.mobileExtraLogistics}>
                <div className={styles.metaSimpleRow}>
                  <span className={styles.metaSimpleLabel}>Best Season:</span>
                  <span className={styles.metaSimpleValue}>{current.bestSeason}</span>
                </div>
                <div className={styles.metaSimpleRow}>
                  <span className={styles.metaSimpleLabel}>Visa Guidance:</span>
                  <span className={styles.metaSimpleValue}>{current.visaSupport}</span>
                </div>
              </div>

              {/* Slide Action Buttons: Both in a single row */}
              <div className={styles.panelActions}>
                <Link
                  href={`/destinations/${current.slug}/`}
                  className={`btn btn--primary ${styles.actionBtn}`}
                  id={`explore-${current.slug}`}
                >
                  Know More
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/plan-your-trip"
                  className={`btn btn--secondary ${styles.actionBtn}`}
                >
                  Plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className={`text-center ${styles.viewAll}`}>
          <Link href="/destinations" className="btn btn--secondary" id="dest-view-all">
            Explore All Destinations
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
