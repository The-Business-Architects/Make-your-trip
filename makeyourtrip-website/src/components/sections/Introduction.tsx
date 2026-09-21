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
          <p className="eyebrow">About Us</p>
          <hr className="divider" />
          <h2 className={styles.heading} id="intro-heading">
            Travel Planning,<br /><em>Made Personal.</em>
          </h2>
          <p className={styles.body}>
            International travel can be complicated — different airlines, visa requirements,
            connections, and logistics that vary by destination. MakeYourTrip Inc. simplifies
            that process by providing personalized travel assistance tailored to your specific journey.
          </p>
          <p className={styles.body} style={{ marginTop: 'var(--space-4)' }}>
            Whether you&apos;re traveling for leisure, business, or with your family,
            we&apos;re here to guide you through the planning process with clarity and care.
            No booking portals. No automated systems. Just real, human assistance.
          </p>
          <Link href="/about" className={`btn btn--secondary ${styles.cta}`} id="intro-learn-more">
            Learn More About Us
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Image side */}
        <div
          className={`reveal-right reveal-image ${styles.imageSide}`}
          ref={imageRef}
          aria-hidden="true"
        >
          <Image
            src="/images/misc/about-intro.jpg"
            alt="A traveler planning their journey in a premium hotel lounge"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className={styles.imageOverlay} aria-hidden="true" />
        </div>

      </div>
    </section>
  )
}
