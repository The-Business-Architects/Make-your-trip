'use client'

import Link from 'next/link'
import { useReveal, useStaggerReveal } from '@/lib/useReveal'
import styles from './Services.module.css'

const services = [
  {
    id: 'svc-planning',
    slug: 'custom-trip-planning',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Custom Trip Planning',
    desc: 'Tailored day-by-day route architecture, transit pacing, and maps built around your rhythm.',
  },
  {
    id: 'svc-flights',
    slug: 'smart-flight-booking',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13"/>
        <path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    ),
    title: 'Smart Flight Booking',
    desc: 'Optimized air routes, protected connections, and luggage auditing for seamless long-haul transit.',
  },
  {
    id: 'svc-visa',
    slug: 'visa-paperwork-help',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Visa & Paperwork Help',
    desc: 'Step-by-step consular guidance, form reviews, and entry compliance without stress.',
  },
  {
    id: 'svc-destinations',
    slug: 'local-travel-advice',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Local Travel Advice',
    desc: 'Practical transit navigation, cultural etiquette, and neighborhood safety intelligence.',
  },
  {
    id: 'svc-group',
    slug: 'group-and-work-travel',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: 'Group & Work Travel',
    desc: 'Synchronized multi-city flights, coordinated transfers, and master group itineraries.',
  },
  {
    id: 'svc-assistance',
    slug: '24-7-travel-support',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: '24/7 Travel Support',
    desc: 'Round-the-clock live human helpline for flight disruptions, transit delays, and route adjustments.',
  },
]

export default function Services() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>(0.06, 80)

  return (
    <section className={`section section--stone ${styles.section}`} id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className={`reveal-left ${styles.head}`} ref={headRef}>
          <h2 className="section-title" id="services-heading">
            Travel Support Built Around <em>Your Journey.</em>
          </h2>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {services.map(({ id, slug, icon, title, desc }) => (
            <Link
              key={id}
              id={id}
              href={`/services/${slug}/`}
              className={`stagger-item ${styles.card}`}
              aria-label={`Learn more about our ${title} service`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{icon}</div>
                <h3 className={styles.cardTitle}>{title}</h3>
              </div>
              <p className={styles.cardDesc}>{desc}</p>
              <div className={styles.cardArrow} aria-hidden="true">
                <span>Explore Service</span>
                <span className={styles.arrowIcon}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
