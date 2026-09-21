'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReveal } from '@/lib/useReveal'
import styles from './EditorialCTA.module.css'

export default function EditorialCTA() {
  const sectionRef = useReveal<HTMLElement>(0.2)

  return (
    <section
      className={`reveal-on-scroll ${styles.section}`}
      ref={sectionRef}
      id="editorial-cta"
      aria-labelledby="editorial-cta-heading"
    >
      {/* Background image */}
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/images/misc/editorial-cta.jpg"
          alt="A lone traveler on a dramatic mountain road at dusk"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          loading="lazy"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <p className="eyebrow eyebrow--light">Start Your Journey</p>
          <h2 className={styles.headline} id="editorial-cta-heading">
            From Where You Are<br />
            <em>To Where You Want To Be.</em>
          </h2>
          <p className={styles.sub}>
            International travel starts with a single step. Let us help you take it.
          </p>
          <Link
            href="/plan-your-trip"
            className={`btn btn--ghost btn--lg ${styles.cta}`}
            id="editorial-cta-btn"
          >
            Start Planning
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
