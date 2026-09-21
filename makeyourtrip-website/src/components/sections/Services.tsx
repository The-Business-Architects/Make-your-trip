'use client'

import { useReveal, useStaggerReveal } from '@/lib/useReveal'
import styles from './Services.module.css'

const services = [
  {
    id: 'svc-flights',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13"/>
        <path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    ),
    title: 'International Flights',
    desc: 'Guidance on international flight options across major routes from the USA, Canada, and UK to destinations worldwide.',
  },
  {
    id: 'svc-planning',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Personalized Trip Planning',
    desc: 'End-to-end trip planning assistance tailored to your destinations, dates, preferences, and travel style.',
  },
  {
    id: 'svc-destinations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Destination Guidance',
    desc: 'Information and guidance on key international destinations to help you make informed decisions about where to go.',
  },
  {
    id: 'svc-family',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Family & Group Travel',
    desc: 'Coordinating travel for families and groups requires careful planning. We help simplify the logistics for everyone.',
  },
  {
    id: 'svc-business',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: 'Business Travel',
    desc: 'Time-sensitive, reliable travel planning assistance for professionals who need efficiency and consistency.',
  },
  {
    id: 'svc-assistance',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Travel Assistance',
    desc: 'General travel support for your journey — from departure city to your destination, we\'re here to help.',
  },
]

export default function Services() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>(0.08, 100)

  return (
    <section className={`section section--stone ${styles.section}`} id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className={`text-center reveal-on-scroll ${styles.head}`} ref={headRef}>
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title" id="services-heading">
            Travel Support Built Around<br />Your Journey
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            Every journey is different. We provide the assistance you need to plan yours — whatever form that takes.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {services.map(({ id, icon, title, desc }) => (
            <article key={id} id={id} className={`stagger-item ${styles.card}`}>
              <div className={styles.cardIcon}>{icon}</div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
              <div className={styles.cardArrow} aria-hidden="true">→</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
