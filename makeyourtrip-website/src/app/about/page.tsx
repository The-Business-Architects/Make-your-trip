import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'
import BottomCTA from '@/components/sections/BottomCTA'

export const metadata: Metadata = {
  title: 'About Us | MakeYourTrip Inc.',
  description: 'MakeYourTrip Inc. is a premium international travel consultancy serving travelers across the USA, Canada, and UK. Learn about our values and approach.',
}

const values = [
  { id: 'val-personal', title: 'Personal', desc: 'We treat every inquiry as individual. Your journey is unique, and our assistance reflects that.' },
  { id: 'val-clear',    title: 'Clear',    desc: 'We communicate with clarity. No jargon, no confusion — just straightforward guidance.' },
  { id: 'val-reliable', title: 'Reliable', desc: 'You can count on us to follow through. We take your travel seriously.' },
  { id: 'val-human',    title: 'Human',    desc: 'We\'re real people helping real travelers. No bots, no automated responses.' },
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
        <section className="section" aria-labelledby="about-story-heading">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
              <div>
                <p className="eyebrow">Our Story</p>
                <hr className="divider" />
                <h2 id="about-story-heading" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-5xl)', color: 'var(--color-ink)', marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-tight)' }}>
                  Built for Travelers Who Need Real Guidance
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--color-charcoal)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
                  MakeYourTrip Inc. was founded to solve a common problem: international travel planning is complicated, and the tools available online often create more confusion than clarity.
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--color-charcoal)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
                  We serve travelers across the USA, Canada, and UK who are planning international journeys — and who want a trusted, human point of contact to help them navigate the process with confidence.
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--color-charcoal)', lineHeight: '1.7', marginBottom: 'var(--space-8)' }}>
                  We don&apos;t replace the journey — we help you plan it properly.
                </p>
                <Link href="/plan-your-trip" className="btn btn--primary" id="about-cta">
                  Plan My Trip →
                </Link>
              </div>
              <div style={{ position: 'relative', height: '520px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <Image
                  src="/images/misc/about-intro.jpg"
                  alt="A traveler planning their journey in a premium hotel lounge"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="section section--stone" aria-labelledby="values-heading">
          <div className="container">
            <div style={{ marginBottom: 'var(--space-12)' }}>
              <p className="eyebrow">Our Values</p>
              <h2 id="values-heading" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-5xl)', color: 'var(--color-ink)', lineHeight: 'var(--leading-tight)' }}>
                How We Work
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)' }}>
              {values.map(({ id, title, desc }) => (
                <div key={id} id={id} style={{
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-8) var(--space-6)',
                }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', color: 'var(--color-ink)', marginBottom: 'var(--space-4)', fontStyle: 'italic' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-slate)', lineHeight: '1.7', maxWidth: 'none' }}>{desc}</p>
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
