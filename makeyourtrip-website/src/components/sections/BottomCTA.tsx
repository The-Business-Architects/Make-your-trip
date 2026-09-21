'use client'

import Link from 'next/link'
import { useReveal } from '@/lib/useReveal'
import styles from './BottomCTA.module.css'

export default function BottomCTA() {
  const ref = useReveal<HTMLElement>(0.2)

  return (
    <section
      className={`section--dark reveal-on-scroll ${styles.section}`}
      ref={ref}
      id="bottom-cta"
      aria-labelledby="bottom-cta-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.textBlock}>
          <p className="eyebrow eyebrow--light">Ready to Travel?</p>
          <h2 className={styles.heading} id="bottom-cta-heading">
            Planning Your Next Journey?
          </h2>
          <p className={styles.sub}>
            Tell us where you&apos;re going and what you need.
            We&apos;ll help you take the next step.
          </p>
        </div>
        <div className={styles.ctaGroup}>
          <Link href="/plan-your-trip" className="btn btn--accent btn--lg" id="bottom-plan-cta">
            Plan My Trip
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/contact" className="btn btn--ghost" id="bottom-contact-cta">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
