import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Terms & Conditions | MakeYourTrip Inc.',
  description: 'Terms and conditions for using MakeYourTrip Inc. services and website.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero eyebrow="Legal" title="Terms & Conditions" />
        <section className="section" aria-label="Terms and conditions content">
          <div className="container container--narrow">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-slate)' }}>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              {[
                {
                  heading: '1. Use of This Website',
                  body: 'By accessing and using this website, you accept and agree to be bound by these terms. This website is provided for informational and inquiry purposes only.',
                },
                {
                  heading: '2. Nature of Service',
                  body: 'MakeYourTrip Inc. provides travel planning assistance and consultation services. We are a travel consultancy, not a licensed booking agent or airline. All booking and payment transactions take place independently through relevant providers.',
                },
                {
                  heading: '3. Inquiry Submissions',
                  body: 'Submitting an inquiry through our website does not constitute a booking or reservation. It initiates a consultation process. Our team will contact you to discuss available options.',
                },
                {
                  heading: '4. Accuracy of Information',
                  body: 'We make every effort to provide accurate and up-to-date information. However, travel details including flight availability, pricing, and visa requirements are subject to change. Always verify critical information with the relevant airline or authority.',
                },
                {
                  heading: '5. Limitation of Liability',
                  body: 'MakeYourTrip Inc. is not liable for any loss, damage, or inconvenience arising from travel arrangements made based on our guidance. We strongly recommend appropriate travel insurance for all international journeys.',
                },
                {
                  heading: '6. Privacy',
                  body: 'Your use of this website is also governed by our Privacy Policy. Please review it to understand how we handle your personal information.',
                },
                {
                  heading: '7. Contact',
                  body: 'For questions about these terms, please contact us at info@makeyourtripinc.com.',
                },
              ].map(({ heading, body }) => (
                <div key={heading}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', color: 'var(--color-ink)', marginBottom: 'var(--space-3)' }}>{heading}</h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--color-charcoal)', lineHeight: '1.7', maxWidth: 'none' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
