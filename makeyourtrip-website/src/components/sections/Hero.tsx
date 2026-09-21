'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // Subtle Ken Burns zoom on hero image
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    // Trigger animation via class after mount
    const timer = setTimeout(() => {
      hero.classList.add(styles['hero--loaded'])
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      id="hero"
      aria-label="Hero — MakeYourTrip Inc."
    >
      {/* Background image */}
      <div className={styles.heroImg} aria-hidden="true">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Coastal city skyline at golden hour — representing international travel"
          fill
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
          className={styles.heroImgEl}
        />
      </div>

      {/* Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.eyebrowBadge}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>Personalized Travel Assistance</span>
          </div>
          <h1 className={styles.headline}>
            Your Journey Begins <em>With the Right Plan.</em>
          </h1>
          <p className={styles.subheadline}>
            From international flights to personalized travel assistance,
            MakeYourTrip Inc. helps you plan your journey with confidence.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/plan-your-trip" className={`btn btn--accent btn--lg ${styles.primaryCta}`} id="hero-primary-cta">
              Plan My Trip
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/destinations" className={`btn btn--ghost ${styles.secondaryCta}`} id="hero-secondary-cta">
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
      </div>
    </section>
  )
}
