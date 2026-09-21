'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReveal, useStaggerReveal } from '@/lib/useReveal'
import styles from './Destinations.module.css'

const destinations = [
  { id: 'dest-new-york',    name: 'New York',    country: 'USA',       img: '/images/destinations/new-york.jpg',    size: 'large' },
  { id: 'dest-london',      name: 'London',      country: 'UK',        img: '/images/destinations/london.jpg',       size: 'medium' },
  { id: 'dest-dubai',       name: 'Dubai',       country: 'UAE',       img: '/images/destinations/dubai.jpg',        size: 'medium' },
  { id: 'dest-paris',       name: 'Paris',       country: 'France',    img: '/images/destinations/paris.jpg',        size: 'medium' },
  { id: 'dest-singapore',   name: 'Singapore',   country: 'Singapore', img: '/images/destinations/singapore.jpg',    size: 'medium' },
  { id: 'dest-los-angeles', name: 'Los Angeles', country: 'USA',       img: '/images/destinations/los-angeles.jpg', size: 'small' },
  { id: 'dest-miami',       name: 'Miami',       country: 'USA',       img: '/images/destinations/miami.jpg',        size: 'small' },
  { id: 'dest-toronto',     name: 'Toronto',     country: 'Canada',    img: '/images/destinations/toronto.jpg',      size: 'small' },
]

export default function Destinations() {
  const headRef = useReveal<HTMLDivElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>(0.06, 80)

  return (
    <section className={`section ${styles.section}`} id="destinations" aria-labelledby="dest-heading">
      <div className="container container--wide">
        <div className={`reveal-on-scroll ${styles.head}`} ref={headRef}>
          <p className="eyebrow">Explore the World</p>
          <h2 className="section-title" id="dest-heading">Where Will You Go Next?</h2>
          <p className="section-subtitle">
            From iconic cities to emerging destinations — wherever you&apos;re headed,
            we help you plan the journey with confidence.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {destinations.map(({ id, name, country, img, size }) => (
            <Link
              key={id}
              href="/plan-your-trip"
              id={id}
              className={`stagger-item ${styles.card} ${styles[`card--${size}`]}`}
              aria-label={`Plan a trip to ${name}, ${country}`}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={img}
                  alt={`${name}, ${country} — travel destination`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className={styles.img}
                />
              </div>
              <div className={styles.overlay} aria-hidden="true" />
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.country}>{country}</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </div>
                <h3 className={styles.name}>{name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className={`text-center ${styles.viewAll}`}>
          <Link href="/destinations" className="btn btn--secondary" id="dest-view-all">
            View All Destinations
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
