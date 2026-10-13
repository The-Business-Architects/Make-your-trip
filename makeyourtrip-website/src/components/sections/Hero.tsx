'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

interface FeaturedDestination {
  slug: string
  name: string
  country: string
  region: string
  image: string
  tagline: string
}

const featuredDestinations: FeaturedDestination[] = [
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    image: '/images/destinations/tokyo.jpg',
    tagline: 'Ultra-Modern Energy & Heritage',
  },
  {
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    image: '/images/destinations/amalfi-coast.jpg',
    tagline: 'Cliffside Mediterranean Charm',
  },
  {
    slug: 'interlaken',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    image: '/images/destinations/interlaken.jpg',
    tagline: 'Scenic Alpine Rail & Glaciers',
  },
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    image: '/images/destinations/paris.jpg',
    tagline: 'Art, Architecture & Gastronomy',
  },
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    image: '/images/destinations/kyoto.jpg',
    tagline: 'Ancient Shrines & Zen Gardens',
  },
  {
    slug: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    image: '/images/destinations/santorini.jpg',
    tagline: 'Caldera Sunsets & Aegean Views',
  },
  {
    slug: 'banff',
    name: 'Banff & Rockies',
    country: 'Canada',
    region: 'Americas',
    image: '/images/destinations/banff.jpg',
    tagline: 'Glacial Lakes & Mountain Lodges',
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    image: '/images/destinations/dubai.jpg',
    tagline: 'Skyline Architecture & Desert Safaris',
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const total = featuredDestinations.length

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Automated slider timer: advances smoothly every 3.8s, pauses on hover/touch
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(handleNext, 3800)
    return () => clearInterval(interval)
  }, [isPaused, handleNext])

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className={styles.hero} id="hero" aria-label="Hero — MakeYourTrip Inc.">
      <div className={styles.heroContainer}>
        
        {/* 1. MULTI-IMAGE AUTOMATION SLIDER (On mobile: top, edge-to-edge full width) */}
        <div
          className={styles.sliderSection}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-label="Featured destinations slider"
        >
          <div className={styles.sliderViewport}>
            <div
              className={styles.sliderTrack}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {featuredDestinations.map((dest, idx) => {
                const isActive = idx === currentIndex
                return (
                  <article
                    key={dest.slug}
                    className={`${styles.slideCard} ${isActive ? styles.slideCardActive : ''}`}
                    aria-hidden={!isActive}
                  >
                    <div className={styles.slideImageWrap}>
                      <Image
                        src={dest.image}
                        alt={`${dest.name}, ${dest.country} scenic landmark view`}
                        fill
                        sizes="(max-width: 900px) 100vw, 55vw"
                        priority={idx === 0}
                        className={styles.slideImage}
                      />
                      <div className={styles.slideOverlay} aria-hidden="true" />

                      <div className={styles.slideBottomContent}>
                        <h2 className={styles.slideTitle}>{dest.name}</h2>
                        <p className={styles.slideTagline}>{dest.tagline}</p>
                        <Link
                          href={`/destinations/${dest.slug}/`}
                          className={styles.slideLink}
                        >
                          Explore Guide →
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* 2. TEXT CONTENT & ACTION (On mobile: positioned cleanly below the image) */}
        <div className={styles.textContent}>
          <h1 className={styles.headline}>
            Your travel,<br />
            <span className={styles.headlineAccent}>perfectly planned.</span>
          </h1>

          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>100% Tailored Routes</span>
            </div>
            <span className={styles.trustDivider} aria-hidden="true">•</span>
            <div className={styles.trustItem}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Visa & Paperwork Help</span>
            </div>
            <span className={styles.trustDivider} aria-hidden="true">•</span>
            <div className={`${styles.trustItem} ${styles.trustItemCenter}`}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>24/7 Human Assistance</span>
            </div>
          </div>

          <div className={styles.heroCtas}>
            <Link href="/plan-your-trip" className={styles.planTripBtn} id="hero-plan-trip">
              <span>Plan Your Trip</span>
              <svg
                className={styles.planTripArrow}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
