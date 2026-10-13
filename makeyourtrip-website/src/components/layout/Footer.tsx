import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services',     label: 'Travel Services' },
  { href: '/about',        label: 'About Us' },
  { href: '/contact',      label: 'Contact' },
  { href: '/plan-your-trip', label: 'Plan My Trip' },
]

const serviceLinks = [
  { href: '/services/custom-trip-planning', label: 'Custom Trip Planning' },
  { href: '/services/smart-flight-booking', label: 'Smart Flight Booking' },
  { href: '/services/visa-paperwork-help', label: 'Visa & Paperwork Help' },
  { href: '/services/local-travel-advice', label: 'Local Travel Advice' },
  { href: '/services/group-and-work-travel', label: 'Group & Work Travel' },
  { href: '/services/24-7-travel-support', label: '24/7 Travel Support' },
]

interface FooterProps {
  hideCta?: boolean
}

export default function Footer({ hideCta = false }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo" id="site-footer">
      {/* ─── Integrated CTA Section (Same Dark Background) ─── */}
      {!hideCta && (
        <div className={styles.ctaBlock} id="footer-cta">
          <div className={styles.inner}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaText}>
                <p className="eyebrow eyebrow--light" style={{ marginBottom: 'var(--space-2)' }}>Ready to Travel?</p>
                <h2 className={styles.ctaHeading}>
                  Planning Your Next <em>Journey?</em>
                </h2>
                <p className={styles.ctaSub}>
                  Tell us where you&apos;re going and what you need.
                  We&apos;ll help you take the next step.
                </p>
              </div>

              <div className={styles.ctaActions}>
                <Link href="/plan-your-trip" className={styles.planBtn} id="footer-plan-cta">
                  <span>Plan My Trip</span>
                  <span className={styles.btnArrow} aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className={styles.contactBtn} id="footer-contact-cta">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <hr className={styles.ctaDivider} />
        </div>
      )}

      {/* ─── Main Footer Columns ─── */}
      <div className={styles.mainFooter}>
        <div className={styles.inner}>
          <div className={styles.grid}>

            {/* Brand column */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logoWrap} aria-label="MakeYourTrip Inc. — Home">
                <Image
                  src="/logo/MYT-LOGO.jpeg"
                  alt="MakeYourTrip Inc. logo"
                  width={52}
                  height={52}
                  className={styles.logoImg}
                />
                <span className={styles.logoText}>
                  <span className={styles.logoName}>MakeYourTrip Inc.</span>
                  <span className={styles.logoTagline}>Your Global Ticket Partner</span>
                </span>
              </Link>
              <p className={styles.brandDesc}>
                Personalized international travel assistance for travelers worldwide.
                Tell us where you&apos;re going — we&apos;ll help you plan the journey.
              </p>

              {/* Social links */}
              <div className={styles.socialRow} aria-label="Social media links">
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label="MakeYourTrip Inc. on Facebook"
                  rel="noopener noreferrer"
                  target="_blank"
                >f</a>
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label="MakeYourTrip Inc. on Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >in</a>
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label="MakeYourTrip Inc. on X / Twitter"
                  rel="noopener noreferrer"
                  target="_blank"
                >𝕏</a>
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label="MakeYourTrip Inc. on LinkedIn"
                  rel="noopener noreferrer"
                  target="_blank"
                >in</a>
              </div>
            </div>

            {/* Navigation column */}
            <div className={styles.col}>
              <p className={styles.colTitle}>Navigation</p>
              <nav aria-label="Footer navigation">
                <ul className={styles.navList}>
                  {navLinks.map(({ href, label }) => (
                    <li key={label}>
                      <Link href={href} className={styles.navLink}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Services column */}
            <div className={styles.col}>
              <p className={styles.colTitle}>Services</p>
              <nav aria-label="Footer services">
                <ul className={styles.navList}>
                  {serviceLinks.map(({ href, label }) => (
                    <li key={label}>
                      <Link href={href} className={styles.navLink}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact column */}
            <div className={styles.col}>
              <p className={styles.colTitle}>Contact</p>
              <address className={styles.contactList} style={{ fontStyle: 'normal' }}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Headquarters</span>
                  <span className={styles.contactValue}>
                    2108 N ST #7740<br />
                    Sacramento, CA, 95816, USA
                  </span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a
                    href="mailto:info@makeyourtripinc.com"
                    className={styles.contactValue}
                  >info@makeyourtripinc.com</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Phone (India / WhatsApp)</span>
                  <a
                    href="tel:+919528203267"
                    className={styles.contactValue}
                  >+91 9528 203 267</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Phone (Intl)</span>
                  <a
                    href="tel:+16507290130"
                    className={styles.contactValue}
                  >+1 (650) 729-0130</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Service Scope</span>
                  <span className={styles.contactValue}>Worldwide (24/7 Helpline)</span>
                </div>
              </address>
            </div>

          </div>

          {/* Bottom bar */}
          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © {year} MakeYourTrip Inc. All rights reserved.
            </p>
            <nav className={styles.legalLinks} aria-label="Legal links">
              <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
              <Link href="/terms"          className={styles.legalLink}>Terms & Conditions</Link>
              <Link href="/contact"        className={styles.legalLink}>Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
