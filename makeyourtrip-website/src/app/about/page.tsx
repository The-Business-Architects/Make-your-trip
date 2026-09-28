import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import BottomCTA from '@/components/sections/BottomCTA'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Us | MakeYourTrip Inc.',
  description: 'MakeYourTrip Inc. is a premium international travel consultancy providing worldwide services. Learn about our values and approach.',
}

const values = [
  {
    id: 'val-personal',
    icon: '✦',
    title: 'Personal',
    desc: 'We treat every inquiry as individual. Your journey is unique, and our assistance reflects that.',
  },
  {
    id: 'val-clear',
    icon: '◈',
    title: 'Clear',
    desc: 'We communicate with clarity. No jargon, no confusion — just straightforward guidance.',
  },
  {
    id: 'val-reliable',
    icon: '◉',
    title: 'Reliable',
    desc: 'You can count on us to follow through. We take your travel seriously.',
  },
  {
    id: 'val-human',
    icon: '❋',
    title: 'Human',
    desc: 'We\'re real people helping real travelers. No bots, no automated responses.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Who We Are"
          title="A Travel Partner You Can Trust"
          subtitle="MakeYourTrip Inc. is built around one purpose — making international travel planning simpler and more personal."
        />

        {/* Story section */}
        <section className={`section ${styles.storySection}`} aria-labelledby="about-story-heading">
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyText}>
                <p className="eyebrow">Our Story</p>
                <hr className="divider" />
                <h2 id="about-story-heading" className={styles.storyHeading}>
                  Built for Travelers Who Need Real Guidance
                </h2>
                <p className={styles.bodyText}>
                  MakeYourTrip Inc. was founded to solve a common problem: international travel planning is complicated, and the tools available online often create more confusion than clarity.
                </p>
                <p className={styles.bodyText}>
                  We provide worldwide services for travelers who are planning international journeys — and who want a trusted, human point of contact to help them navigate the process with confidence.
                </p>
                <p className={styles.bodyText} style={{ marginBottom: 'var(--space-8)' }}>
                  We don&apos;t replace the journey — we help you plan it properly.
                </p>
                <Link href="/plan-your-trip" className="btn btn--primary" id="about-cta">
                  Plan My Trip →
                </Link>
              </div>

              <div className={styles.storyImgWrap}>
                <Image
                  src="/images/misc/about-intro.jpg"
                  alt="A traveler planning their journey in a premium hotel lounge"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className={styles.storyImgOverlay} aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className={`section ${styles.valuesSection}`} aria-labelledby="values-heading">
          <div className="container">
            <div className={styles.valuesHead}>
              <p className="eyebrow">Our Values</p>
              <h2 id="values-heading" className={styles.valuesHeading}>How We Work</h2>
              <p className={styles.valuesSubtitle}>
                Four principles that shape every interaction we have with our travelers.
              </p>
            </div>
            <div className={styles.valuesGrid}>
              {values.map(({ id, icon, title, desc }, i) => (
                <div key={id} id={id} className={styles.valueCard}>
                  <span className={styles.valueIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.valueIcon} aria-hidden="true">{icon}</span>
                  <h3 className={styles.valueTitle}>{title}</h3>
                  <p className={styles.valueDesc}>{desc}</p>
                </div>
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
