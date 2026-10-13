'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import styles from './DestinationHighlightsSlideshow.module.css'
import type { DestinationHighlight } from '@/data/destinations'

interface DestinationHighlightsSlideshowProps {
  destinationName: string
  highlights: DestinationHighlight[]
}

export default function DestinationHighlightsSlideshow({
  destinationName,
  highlights,
}: DestinationHighlightsSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = highlights.length

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }, [total])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
  }, [total])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    const container = containerRef.current
    if (!container) return

    container.addEventListener('keydown', handleKeyDown)
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePrev, handleNext])

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (diff > 50) {
      handleNext()
    } else if (diff < -50) {
      handlePrev()
    }
    setTouchStart(null)
  }

  if (!highlights || highlights.length === 0) return null

  const current = highlights[currentIndex]

  return (
    <section id="highlights" className={styles.highlightsSection} aria-label="Top Highlights">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>Top Places to Experience in {destinationName}</h2>
          <p className={styles.sectionSubtitle}>
            Discover the celebrated cultural landmarks, panoramic viewpoints, and architectural treasures that define {destinationName}.
          </p>
        </div>

        {/* Showcase Slideshow Card */}
        <div
          ref={containerRef}
          className={styles.showcaseCard}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${destinationName} Highlights Slideshow`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Visual Side */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src={current.image}
                alt={current.alt || `${current.title} in ${destinationName}`}
                fill
                priority={currentIndex === 0}
                className={styles.highlightImg}
                sizes="(max-width: 880px) 100vw, 600px"
              />
            </div>
          </div>

          {/* Details & Controls Side */}
          <div className={styles.contentCol}>
            <div className={styles.contentInner}>
              <span className={styles.placeBadge}>Featured Attraction</span>
              <h3 className={styles.highlightTitle}>{current.title}</h3>
              <p className={styles.highlightDesc}>{current.desc}</p>
            </div>

            {/* Navigation Row */}
            <div className={styles.controlsRow}>
              <div className={styles.dotsTrack} aria-label="Highlight slide indicators">
                {highlights.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View highlight: ${item.title}`}
                  />
                ))}
              </div>

              <div className={styles.arrowButtons}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handlePrev}
                  aria-label="Previous highlight"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handleNext}
                  aria-label="Next highlight"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
