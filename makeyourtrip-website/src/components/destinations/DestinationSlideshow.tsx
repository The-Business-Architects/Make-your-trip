'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import styles from './DestinationSlideshow.module.css'
import type { LandmarkGalleryItem } from '@/data/destinations'

interface DestinationSlideshowProps {
  destinationName: string
  gallery: LandmarkGalleryItem[]
}

export default function DestinationSlideshow({
  destinationName,
  gallery,
}: DestinationSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = gallery.length

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

  if (!gallery || gallery.length === 0) return null

  const currentItem = gallery[currentIndex]

  return (
    <section
      className={styles.slideshowSection}
      aria-label={`Visual Glimpses of ${destinationName}`}
    >
      {/* 1. Header is container-aligned */}
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.heading}>Glimpses of {destinationName}</h2>
          <p className={styles.subheading}>
            Iconic landmarks, architectural wonders, and scenic landscapes defining the character of {destinationName}.
          </p>
        </div>
      </div>

      {/* 2. Visual Glimpse Stage: Full width on mobile (no card look, edge-to-edge), centered on desktop */}
      <div className={styles.carouselWrapper}>
        <div
          ref={containerRef}
          className={styles.carouselContainer}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label={`${destinationName} Landmark Carousel`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Visual Frame (Edge-to-Edge on mobile) */}
          <div className={styles.imageStage}>
            <Image
              src={currentItem.src}
              alt={currentItem.alt || `${currentItem.name} in ${destinationName}`}
              fill
              priority={currentIndex === 0}
              className={styles.slideImage}
              sizes="(max-width: 768px) 100vw, 1120px"
            />

            {/* Desktop-only subtle overlay & caption */}
            <div className={styles.desktopOverlay} />
            <div className={styles.desktopCaption}>
              <div className={styles.landmarkTag}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Landmark Feature</span>
              </div>
              <h3 className={styles.landmarkTitle}>{currentItem.name}</h3>
              <p className={styles.landmarkDescription}>{currentItem.caption}</p>
            </div>

            {/* Desktop Navigation Arrows on Stage */}
            <button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrev}
              aria-label="Previous landmark photo"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="Next landmark photo"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Mobile Information Panel (Clean typography, zero card borders, zero shadows) */}
          <div className={styles.mobileCaptionCard}>
            <div className={styles.landmarkTag}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Landmark Feature</span>
            </div>
            <h3 className={styles.mobileLandmarkTitle}>{currentItem.name}</h3>
            <p className={styles.mobileLandmarkDesc}>{currentItem.caption}</p>

            {/* Mobile Navigation & Dots Controls Bar */}
            <div className={styles.mobileControlsBar}>
              <button
                type="button"
                className={styles.mobileNavBtn}
                onClick={handlePrev}
                aria-label="Previous landmark photo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className={styles.dotsTrack} aria-label="Photo slide indicators">
                {gallery.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View ${item.name}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className={styles.mobileNavBtn}
                onClick={handleNext}
                aria-label="Next landmark photo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
