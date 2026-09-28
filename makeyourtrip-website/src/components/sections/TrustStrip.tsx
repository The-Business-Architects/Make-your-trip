'use client'

import { useStaggerReveal } from '@/lib/useReveal'
import styles from './TrustStrip.module.css'

const trustItems = [
  {
    id: 'trust-personalized',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Personalized Assistance',
    desc: 'Travel support tailored specifically to your journey.',
  },
  {
    id: 'trust-global',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Travel Expertise',
    desc: 'Support for international travel planning across key destinations.',
  },
  {
    id: 'trust-human',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Human Support',
    desc: 'Real assistance when your journey matters most.',
  },
  {
    id: 'trust-simple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: 'Simple Inquiry Process',
    desc: 'Tell us what you need and we\'ll help with the next step.',
  },
]

export default function TrustStrip() {
  const stripRef = useStaggerReveal<HTMLDivElement>(0.1, 120)

  return (
    <section className={`section--sm ${styles.section}`} aria-labelledby="trust-heading">
      <div className="container">
        <div className={styles.grid} ref={stripRef}>
          {trustItems.map(({ id, icon, title, desc }) => (
            <div key={id} id={id} className={`stagger-item ${styles.item}`}>
              <div className={styles.iconWrap} aria-hidden="true">
                {icon}
              </div>
              <div className={styles.itemText}>
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
