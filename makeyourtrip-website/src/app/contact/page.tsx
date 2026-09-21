import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Contact Us | MakeYourTrip Inc.',
  description: 'Get in touch with MakeYourTrip Inc. for personalized international travel assistance. Serving the USA, Canada, and UK.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="Get in Touch"
          title="Contact Us"
          subtitle="We're here to help with your international travel planning."
        />

        <section className="section" aria-label="Contact details">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'flex-start' }}>

              {/* Contact info */}
              <div>
                <p className="eyebrow">Reach Us</p>
                <hr className="divider" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', color: 'var(--color-ink)', marginBottom: 'var(--space-8)', lineHeight: 'var(--leading-snug)' }}>
                  We&apos;d Love to Hear From You
                </h2>
                <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                  {[
                    { label: 'Email', value: 'info@makeyourtripinc.com', href: 'mailto:info@makeyourtripinc.com' },
                    { label: 'Phone / WhatsApp', value: '+1 (800) 000-0000', href: 'tel:+18000000000' },
                    { label: 'Serving', value: 'USA · Canada · United Kingdom', href: null },
                  ].map(({ label, value, href }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-slate)' }}>{label}</span>
                      {href ? (
                        <a href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xl)', color: 'var(--color-ink)', textDecoration: 'none' }}>{value}</a>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xl)', color: 'var(--color-ink)' }}>{value}</span>
                      )}
                    </div>
                  ))}
                </address>
              </div>

              {/* CTA card */}
              <div style={{
                background: 'var(--color-ink)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-12)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}>
                <p className="eyebrow eyebrow--light">Preferred Method</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', color: 'white', lineHeight: 'var(--leading-snug)' }}>
                  Ready to Plan Your Journey?
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', maxWidth: '40ch' }}>
                  The fastest way to get assistance is through our inquiry form. Share your trip details and we&apos;ll respond promptly.
                </p>
                <Link href="/plan-your-trip" className="btn btn--accent btn--lg" id="contact-plan-cta">
                  Plan My Trip →
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
