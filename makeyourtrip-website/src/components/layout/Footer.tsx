import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services',     label: 'Travel Services' },
  { href: '/about',        label: 'About' },
  { href: '/contact',      label: 'Contact' },
  { href: '/plan-your-trip', label: 'Plan My Trip' },
]

const serviceLinks = [
  { href: '/services', label: 'International Flights' },
  { href: '/services', label: 'Trip Planning' },
  { href: '/services', label: 'Destination Guidance' },
  { href: '/services', label: 'Family & Group Travel' },
  { href: '/services', label: 'Business Travel' },
  { href: '/services', label: 'Travel Assistance' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo" id="site-footer">
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* Brand column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrap} aria-label="MakeYourTrip Inc. — Home">
              <Image
                src="/logo/MYT-LOGO.jpeg"
                alt="MakeYourTrip Inc. logo"
                width={56}
                height={56}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>
                <span className={styles.logoName}>MakeYourTrip Inc.</span>
                <span className={styles.logoTagline}>Your Global Ticket Partner</span>
              </span>
            </Link>
            <p className={styles.brandDesc}>
              Personalized international travel assistance for travelers across the USA, Canada, and UK.
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
                <span className={styles.contactLabel}>Email</span>
                <a
                  href="mailto:info@makeyourtripinc.com"
                  className={styles.contactValue}
                >info@makeyourtripinc.com</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone / WhatsApp</span>
                <a
                  href="tel:+18000000000"
                  className={styles.contactValue}
                >+1 (800) 000-0000</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Serving</span>
                <span className={styles.contactValue}>USA · Canada · United Kingdom</span>
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
    </footer>
  )
}
