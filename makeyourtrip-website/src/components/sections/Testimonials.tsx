'use client'

import { useState, useEffect } from 'react'
import { useReveal, useStaggerReveal } from '@/lib/useReveal'
import styles from './Testimonials.module.css'
import ReviewForm from '../forms/ReviewForm'

const testimonials = [
  {
    id: 'testimonial-1',
    quote: 'The team at MakeYourTrip Inc. made planning our international trip genuinely straightforward. They understood exactly what we needed and helped us navigate all the details with ease.',
    name: 'Sarah M.',
    origin: 'New York, USA',
    destination: 'Traveled to London & Paris',
  },
  {
    id: 'testimonial-2',
    quote: 'I\'ve planned international travel before and it\'s always stressful. Having personalized assistance made a real difference — I felt confident about every step of the journey.',
    name: 'James R.',
    origin: 'Toronto, Canada',
    destination: 'Traveled to Dubai',
  },
  {
    id: 'testimonial-3',
    quote: 'Quick, professional, and genuinely helpful. The inquiry process was simple and they responded with clear guidance. I\'d recommend them to anyone planning international travel.',
    name: 'Amanda L.',
    origin: 'London, UK',
    destination: 'Traveled to Singapore',
  },
]

export default function Testimonials() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>(0.1, 130)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const slider = gridRef.current
    if (!slider) return

    const interval = setInterval(() => {
      if (window.innerWidth > 900) return // Only run on mobile
      
      const maxScroll = slider.scrollWidth - slider.clientWidth
      if (maxScroll <= 0) return
      
      let nextScroll = slider.scrollLeft + slider.clientWidth
      if (nextScroll > maxScroll + 10) { // Add small buffer for rounding
        nextScroll = 0
      }
      
      slider.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [gridRef])

  const handleScroll = () => {
    if (!gridRef.current) return
    const index = Math.round(gridRef.current.scrollLeft / gridRef.current.clientWidth)
    setActiveIndex(index)
  }

  return (
    <section
      className={`section ${styles.section}`}
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className={`reveal-left ${styles.head}`} ref={headRef}>
          <p className="eyebrow">Traveler Stories</p>
          <hr className="divider" />
          <h2 className="section-title" id="testimonials-heading">
            What Our <em>Travelers Say.</em>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            Placeholder testimonials — to be updated with verified client stories.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef} onScroll={handleScroll}>
          {testimonials.map(({ id, quote, name, origin, destination }) => (
            <figure key={id} id={id} className={`stagger-item ${styles.card}`}>
              <div className={styles.quoteIcon} aria-hidden="true">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 24V14.4C0 9.6 1.6 5.73333 4.8 2.8C8 0.933333 11.7333 0 16 0V4C13.3333 4 11.2 4.8 9.6 6.4C8 8 7.2 10.4 7.2 13.6H12V24H0ZM16 24V14.4C16 9.6 17.6 5.73333 20.8 2.8C24 0.933333 27.7333 0 32 0V4C29.3333 4 27.2 4.8 25.6 6.4C24 8 23.2 10.4 23.2 13.6H28V24H16Z" fill="currentColor"/>
                </svg>
              </div>
              <blockquote className={styles.quote}>
                <p>&ldquo;{quote}&rdquo;</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.authorName}>{name}</span>
                <span className={styles.authorMeta}>{origin} · {destination}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.pagination} aria-hidden="true">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => {
                if (gridRef.current) {
                  gridRef.current.scrollTo({
                    left: gridRef.current.clientWidth * i,
                    behavior: 'smooth'
                  })
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
          <button 
            className="btn btn--secondary" 
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <div style={{ marginTop: 'var(--space-8)' }}>
            <ReviewForm />
          </div>
        )}
      </div>
    </section>
  )
}
