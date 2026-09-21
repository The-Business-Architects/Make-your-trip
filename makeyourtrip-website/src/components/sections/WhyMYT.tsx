'use client'

import { useReveal, useStaggerReveal } from '@/lib/useReveal'
import styles from './WhyMYT.module.css'

const reasons = [
  {
    id: 'why-personalized',
    title: 'Tailored to Your Needs',
    desc: 'We don\'t offer generic packages. Every inquiry is treated individually, and our assistance is shaped around your specific travel goals.',
  },
  {
    id: 'why-international',
    title: 'International Travel Focus',
    desc: 'Our focus is on international travel — the complexity of cross-border journeys, connections, and destination planning across multiple regions.',
  },
  {
    id: 'why-human',
    title: 'Real People, Real Guidance',
    desc: 'You speak with people who understand travel — not automated systems. Our team provides hands-on assistance at every step.',
  },
  {
    id: 'why-convenient',
    title: 'Convenient Planning Process',
    desc: 'Simply tell us about your trip via our inquiry form. We\'ll review your requirements and get back to you with the guidance you need.',
  },
]

export default function WhyMYT() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>(0.1, 120)

  return (
    <section
      className={`section ${styles.section}`}
      id="why-makeyourtrip"
      aria-labelledby="why-heading"
    >
      <div className="container">
        <div className={`reveal-on-scroll ${styles.head}`} ref={headRef}>
          <p className="eyebrow">Why Us</p>
          <hr className="divider" />
          <h2 className="section-title" id="why-heading">
            Why Travelers Choose<br /><em>Personalized Assistance</em>
          </h2>
          <p className="section-subtitle">
            When planning an international journey, having the right support
            makes all the difference.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {reasons.map(({ id, title, desc }, i) => (
            <div key={id} id={id} className={`stagger-item ${styles.item}`}>
              <span className={styles.itemIndex} aria-hidden="true">
                0{i + 1}
              </span>
              <div className={styles.itemBody}>
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.itemDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
