'use client'

import { useStaggerReveal } from '@/lib/useReveal'
import styles from './HowItWorks.module.css'

interface StepItem {
  id: string
  number: string
  tag: string
  title: string
  desc: string
  highlights: string[]
  iconSvg: React.ReactNode
}

const steps: StepItem[] = [
  {
    id: 'step-1',
    number: '01',
    tag: 'Consultation & Discovery',
    title: 'Share Your Travel Vision',
    desc: 'Tell us where you want to go, your ideal dates, travel style, and specific expectations. We take the time to understand your journey before suggesting anything.',
    highlights: ['Trip preferences & pacing', 'Target budget & timeline', 'Special transit requests'],
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
  {
    id: 'step-2',
    number: '02',
    tag: 'Custom Architecture',
    title: 'We Craft Your Itinerary & Logistics',
    desc: 'Our destination specialists design a bespoke day-by-day plan with vetted international flights, scenic ground transfers, and official visa preparation.',
    highlights: ['Day-by-day routed plan', 'Optimal flight connections', 'Clear visa documentation list'],
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: 'step-3',
    number: '03',
    tag: 'Seamless Departure & Care',
    title: 'Travel With 24/7 Human Support',
    desc: 'Receive your complete, organized travel kit. As you explore, your dedicated trip planner remains on standby via WhatsApp or phone for immediate real-time help.',
    highlights: ['Organized digital travel dossier', 'Real-time schedule tracking', 'Dedicated personal assistance'],
    iconSvg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const stepsRef = useStaggerReveal<HTMLDivElement>(0.1, 120)

  return (
    <section
      className={`section ${styles.section}`}
      id="how-it-works"
      aria-labelledby="hiw-heading"
    >
      {/* Subtle decorative background accents */}
      <div className={styles.bgDecoration} aria-hidden="true">
        <div className={styles.radialGlow} />
        <div className={styles.gridOverlay} />
      </div>

      <div className="container">
        {/* Section Heading only (No badge, no description) */}
        <div className={styles.head}>
          <h2 className="section-title" id="hiw-heading">
            From Initial Idea to <em>Seamless Journey.</em>
          </h2>
        </div>

        {/* 3 Step Cards Grid */}
        <div className={styles.steps} ref={stepsRef}>
          {steps.map(({ id, number, tag, title, desc, highlights, iconSvg }) => (
            <div key={id} id={id} className={`stagger-item ${styles.stepCard}`}>
              {/* Card top bar with step number & icon */}
              <div className={styles.cardHeader}>
                <span className={styles.stepNum}>{number}</span>
                <div className={styles.iconBox} aria-hidden="true">
                  {iconSvg}
                </div>
              </div>

              {/* Step Category Tag */}
              <span className={styles.stepTag}>{tag}</span>

              {/* Title & Description */}
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{desc}</p>

              {/* Key Deliverables / Highlights list */}
              <ul className={styles.highlightsList}>
                {highlights.map((h, hIdx) => (
                  <li key={hIdx} className={styles.highlightItem}>
                    <svg
                      className={styles.checkIcon}
                      width="16"
                      height="16"
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
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Subtle card bottom accent line */}
              <div className={styles.cardBottomBar} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
