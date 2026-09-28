'use client'

import { useEffect, useState } from 'react'
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
    desc: 'Guidance on international flight options across major routes worldwide.',
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
    id: 'svc-visa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Visa Assistance',
    desc: 'Guidance on visa requirements and assistance with application processes for your destination.',
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
  const [activeIndex, setActiveIndex] = useState(0)

  // Mobile automatic swipe carousel
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 768) return

    const timer = setInterval(() => {
      const container = gridRef.current
      if (!container) return

      const scrollLeft = container.scrollLeft
      const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
      const gap = parseInt(window.getComputedStyle(container).gap) || 0
      const nextScroll = scrollLeft + cardWidth + gap

      if (nextScroll >= container.scrollWidth - container.clientWidth - 10) {
        // Back to start
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Scroll to next
        container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' })
      }
    }, 3500) // 3.5s per slide

    return () => clearInterval(timer)
  }, [gridRef])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined' || window.innerWidth > 768) return
    const container = e.currentTarget
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
    const gap = parseInt(window.getComputedStyle(container).gap) || 0
    if (cardWidth === 0) return
    
    const index = Math.round(container.scrollLeft / (cardWidth + gap))
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  const handleDotClick = (index: number) => {
    const container = gridRef.current
    if (!container) return
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 0
    const gap = parseInt(window.getComputedStyle(container).gap) || 0
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' })
    setActiveIndex(index)
  }

  return (
    <section className={`section section--stone ${styles.section}`} id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className={`reveal-left ${styles.head}`} ref={headRef}>
          <p className="eyebrow">What We Do</p>
          <hr className="divider" />
          <h2 className="section-title" id="services-heading">
            Travel Support Built Around<br /><em>Your Journey.</em>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            Every journey is different. We provide the assistance you need to plan yours — whatever form that takes.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef} onScroll={handleScroll}>
          {services.map(({ id, icon, title, desc }) => (
            <article key={id} id={id} className={`stagger-item ${styles.card}`}>
              <div className={styles.cardIcon}>{icon}</div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
              <div className={styles.cardArrow} aria-hidden="true">→</div>
            </article>
          ))}
        </div>

        {/* Mobile Pagination */}
        <div className={styles.pagination} aria-hidden="true">
          {services.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles['dot--active'] : ''}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
