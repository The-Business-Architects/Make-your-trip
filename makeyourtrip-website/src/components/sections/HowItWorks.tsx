'use client'

import { useReveal, useStaggerReveal } from '@/lib/useReveal'
import styles from './HowItWorks.module.css'

const steps = [
  {
    id: 'step-1',
    number: '01',
    title: 'Tell Us About Your Trip',
    desc: 'Share your destination, dates, and preferences. We handle the complex logistics.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'We Help Plan Your Options',
    desc: 'Our experts craft a bespoke itinerary perfectly tailored to your travel style.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Move Forward With Confidence',
    desc: 'Review your curated options and embark on your journey with complete peace of mind.',
  },
]

export default function HowItWorks() {
  const headRef = useReveal<HTMLDivElement>()
  const stepsRef = useStaggerReveal<HTMLDivElement>(0.1, 150)

  return (
    <section
      className={`section section--dark ${styles.section}`}
      id="how-it-works"
      aria-labelledby="hiw-heading"
    >
      <div className="container">
        <div className={`reveal-left ${styles.head}`} ref={headRef}>
          <p className="eyebrow eyebrow--light">How It Works</p>
          <hr className="divider divider--light" />
          <h2 className="section-title section-title--light" id="hiw-heading">
            Three Steps to<br /><em>Your Next Journey.</em>
          </h2>
        </div>

        <div className={styles.steps} ref={stepsRef}>
          {steps.map(({ id, number, title, desc }, i) => (
            <div key={id} id={id} className={`stagger-item ${styles.step}`}>
              <div className={styles.stepNumber} aria-hidden="true">{number}</div>
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
