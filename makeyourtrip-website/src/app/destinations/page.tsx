import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import BottomCTA from '@/components/sections/BottomCTA'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Destinations | International Travel Destinations',
  description: 'Explore international destinations across the Americas, Europe, Asia, and the Middle East. MakeYourTrip Inc. helps you plan your journey.',
}

const destinations = [
  { id: 'page-dest-new-york',    name: 'New York',    country: 'USA',       region: 'Americas',     img: '/images/destinations/new-york.jpg',    desc: 'The ultimate American city — iconic skyline, world-class culture, and endless energy.' },
  { id: 'page-dest-los-angeles', name: 'Los Angeles', country: 'USA',       region: 'Americas',     img: '/images/destinations/los-angeles.jpg', desc: 'Sun, culture, and opportunity — the city of dreams across Southern California.' },
  { id: 'page-dest-miami',       name: 'Miami',       country: 'USA',       region: 'Americas',     img: '/images/destinations/miami.jpg',        desc: 'Art Deco beaches, vibrant nightlife, and a gateway to Latin America.' },
  { id: 'page-dest-toronto',     name: 'Toronto',     country: 'Canada',    region: 'Americas',     img: '/images/destinations/toronto.jpg',      desc: "Canada's largest city — multicultural, modern, and welcoming to travelers worldwide." },
  { id: 'page-dest-london',      name: 'London',      country: 'UK',        region: 'Europe',       img: '/images/destinations/london.jpg',       desc: 'A global capital steeped in history, culture, and world-class hospitality.' },
  { id: 'page-dest-paris',       name: 'Paris',       country: 'France',    region: 'Europe',       img: '/images/destinations/paris.jpg',        desc: 'Iconic boulevards, world-renowned cuisine, and an atmosphere unlike anywhere else.' },
  { id: 'page-dest-dubai',       name: 'Dubai',       country: 'UAE',       region: 'Middle East',  img: '/images/destinations/dubai.jpg',        desc: 'A modern marvel — luxury, architecture, and a gateway between East and West.' },
  { id: 'page-dest-singapore',   name: 'Singapore',   country: 'Singapore', region: 'Asia',         img: '/images/destinations/singapore.jpg',    desc: 'A world-class hub — efficient, sophisticated, and perfectly positioned in Southeast Asia.' },
]

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Explore the World"
          title="Where Will You Go Next?"
          subtitle="Browse our key destinations — wherever you're headed, we help you plan the journey."
        />

        <section className="section" aria-label="Destinations grid">
          <div className="container container--wide">
            <div className={styles.grid}>
              {destinations.map(({ id, name, country, img, desc }) => (
                <Link
                  key={id}
                  id={id}
                  href="/plan-your-trip"
                  aria-label={`Plan a trip to ${name}, ${country}`}
                  className={styles.card}
                >
                  <article>
                    <div className={styles.imgWrap}>
                      <Image
                        src={img}
                        alt={`${name}, ${country}`}
                        fill
                        className={styles.img}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.content}>
                      <p className={styles.country}>{country}</p>
                      <h2 className={styles.title}>{name}</h2>
                      <p className={styles.desc}>{desc}</p>
                      <span className={styles.cta}>Plan This Trip →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BottomCTA />
      </main>
      <Footer />
    </>
  )
}
