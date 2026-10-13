'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReveal } from '@/lib/useReveal'
import styles from './Introduction.module.css'

export default function Introduction() {
  const textRef  = useReveal<HTMLDivElement>()
  const imageRef = useReveal<HTMLDivElement>(0.2)

  return (
    <section className={`section ${styles.section}`} id="introduction" aria-labelledby="intro-heading">
      <div className={`container ${styles.inner}`}>

        {/* Text side */}
        <div className={`reveal-left ${styles.textSide}`} ref={textRef}>
          <h2 className={styles.heading} id="intro-heading">
            Personalized Travel Planning,<br /><em>Engineered Around You.</em>
          </h2>
          <p className={styles.body}>
            International travel planning can quickly turn overwhelming: comparing dozens of fragmented booking sites, deciphering complex foreign visa guidelines, and coordinating intricate rail and flight connections. MakeYourTrip Inc. takes that weight off your shoulders.
          </p>
          <p className={styles.body}>
            We replace generic algorithms and robotic call centers with dedicated human travel designers. From custom day-by-day itineraries and verified international flights to complete tourist visa assistance, we manage every detail so you can focus entirely on the journey.
          </p>

          {/* Value Highlights */}
          <div className={styles.features}>
            <span className={styles.feature}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Dedicated Personal Agent
            </span>
            <span className={styles.feature}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Custom Route Architecture
            </span>
            <span className={styles.feature}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              24/7 Global On-Trip Support
            </span>
          </div>

          <Link href="/about" className={`btn btn--secondary ${styles.cta}`} id="intro-learn-more">
            Learn More About Our Story
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Image side */}
        <div
          className={`reveal-right reveal-image ${styles.imageSide}`}
          ref={imageRef}
        >
          <Image
            src="/images/misc/travel-journey-plan.jpg"
            alt="Handcrafted travel itinerary journal with passport, boarding passes, camera, and world map"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 50vw"
            loading="lazy"
          />
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>

      </div>
    </section>
  )
}
