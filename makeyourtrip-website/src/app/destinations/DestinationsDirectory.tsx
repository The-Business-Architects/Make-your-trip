'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destinationsData } from '@/data/destinations'
import styles from './page.module.css'

type RegionFilter = 'All' | 'Europe' | 'Asia' | 'Americas' | 'Middle East'

const regions: RegionFilter[] = ['All', 'Europe', 'Asia', 'Americas', 'Middle East']

export default function DestinationsDirectory() {
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('All')

  const filtered = activeRegion === 'All'
    ? destinationsData
    : destinationsData.filter((d) => d.region === activeRegion)

  return (
    <div>
      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '3rem'
      }}>
        {regions.map((region) => {
          const count = region === 'All'
            ? destinationsData.length
            : destinationsData.filter((d) => d.region === region).length

          const isActive = activeRegion === region

          return (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: isActive ? 'var(--color-primary)' : 'var(--color-bg-primary)',
                color: isActive ? '#ffffff' : 'var(--color-ink)',
                fontWeight: 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{region}</span>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '9999px',
                background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-stone-soft)',
                color: isActive ? '#ffffff' : 'var(--color-slate)'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid of Destination Cards */}
      <div className={styles.grid}>
        {filtered.map((dest) => (
          <Link
            key={dest.slug}
            id={`dest-${dest.slug}`}
            href={`/destinations/${dest.slug}/`}
            aria-label={`Explore custom travel to ${dest.name}, ${dest.country}`}
            className={styles.card}
          >
            <article>
              <div className={styles.imgWrap}>
                <Image
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country} — MakeYourTrip Inc.`}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className={styles.content}>
                <p className={styles.country}>{dest.country} • {dest.region}</p>
                <h2 className={styles.title}>{dest.name}</h2>
                <p className={styles.desc}>{dest.heroSubtitle}</p>
                <span className={styles.cta}>Explore Itinerary & Planning →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
