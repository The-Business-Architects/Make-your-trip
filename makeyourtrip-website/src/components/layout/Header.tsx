'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

interface ServiceDropdownItem {
  href: string
  label: string
  desc: string
}

interface DestinationDropdownItem {
  href: string
  label: string
  desc: string
}

const serviceItems: ServiceDropdownItem[] = [
  {
    href: '/services/custom-trip-planning',
    label: 'Custom Trip Planning',
    desc: 'Bespoke daily route architecture & personal itinerary pacing',
  },
  {
    href: '/services/smart-flight-booking',
    label: 'Smart Flight Booking',
    desc: 'Strategic routing, connection safety & ticketing management',
  },
  {
    href: '/services/visa-paperwork-help',
    label: 'Visa & Paperwork Help',
    desc: 'Step-by-step consular guidance & entry document verification',
  },
  {
    href: '/services/local-travel-advice',
    label: 'Local Travel Advice',
    desc: 'Practical transit navigation, etiquette & neighborhood safety',
  },
  {
    href: '/services/group-and-work-travel',
    label: 'Group & Work Travel',
    desc: 'Multi-traveler coordination, corporate retreats & family journeys',
  },
  {
    href: '/services/24-7-travel-support',
    label: '24/7 Travel Support',
    desc: 'Round-the-clock live human helpline for disruptions & rebookings',
  },
]

const destinationContinentItems: DestinationDropdownItem[] = [
  {
    href: '/destinations?region=Europe',
    label: 'Europe',
    desc: 'Paris, Rome, Amalfi Coast, Swiss Alps, London & more',
  },
  {
    href: '/destinations?region=Asia',
    label: 'Asia',
    desc: 'Tokyo, Kyoto, Osaka, Bali, Bangkok, Singapore & more',
  },
  {
    href: '/destinations?region=Americas',
    label: 'Americas',
    desc: 'New York, Banff, Costa Rica, Rio de Janeiro & more',
  },
  {
    href: '/destinations?region=Middle%20East',
    label: 'Middle East',
    desc: 'Dubai, Abu Dhabi, Petra, Doha, Muscat & more',
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [destinationsOpen, setDestinationsOpen] = useState(false)

  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false)

  const pathname = usePathname()
  const isHeroPage = pathname === '/'

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const destinationsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  const prevPathnameRef = useRef(pathname)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname
      setMenuOpen(false)
      setServicesOpen(false)
      setDestinationsOpen(false)
      setMobileServicesOpen(false)
      setMobileDestinationsOpen(false)
    }
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Hover handlers with debounce for desktop dropdowns
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
    setServicesOpen(true)
    setDestinationsOpen(false)
  }

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 150)
  }

  const handleDestinationsEnter = () => {
    if (destinationsTimeoutRef.current) clearTimeout(destinationsTimeoutRef.current)
    setDestinationsOpen(true)
    setServicesOpen(false)
  }

  const handleDestinationsLeave = () => {
    destinationsTimeoutRef.current = setTimeout(() => {
      setDestinationsOpen(false)
    }, 150)
  }

  const headerClass = [
    styles.header,
    isHeroPage && !scrolled ? styles['header--transparent'] : styles['header--scrolled'],
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header className={headerClass} role="banner">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="MakeYourTrip Inc. — Home">
            <Image
              src="/logo/MYT-LOGO.jpeg"
              alt="MakeYourTrip Inc. logo"
              width={52}
              height={52}
              className={styles.logoImg}
              priority
            />
            <span className={styles.logoText}>
              <span className={styles.logoName}>MakeYourTrip Inc.</span>
              <span className={styles.logoTagline}>Your Global Ticket Partner</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.nav} aria-label="Main navigation">
            <Link
              href="/"
              className={styles.navLink}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>

            {/* Destinations Dropdown (Continents) */}
            <div
              className={styles.dropdownWrap}
              onMouseEnter={handleDestinationsEnter}
              onMouseLeave={handleDestinationsLeave}
            >
              <Link
                href="/destinations"
                className={`${styles.navLink} ${styles.dropdownTrigger} ${
                  pathname.startsWith('/destinations') ? styles.navLinkActive : ''
                }`}
                aria-expanded={destinationsOpen}
                aria-haspopup="true"
              >
                <span>Destinations</span>
                <svg
                  className={`${styles.caret} ${destinationsOpen ? styles.caretOpen : ''}`}
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
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </Link>

              {destinationsOpen && (
                <div className={`${styles.dropdownMenu} ${styles.dropdownMenuDestinations}`}>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownHeading}>Explore Continents</span>
                    <Link href="/destinations" className={styles.dropdownViewAll}>
                      All 36+ Destinations →
                    </Link>
                  </div>
                  <div className={styles.dropdownGridContinents}>
                    {destinationContinentItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.dropdownItem}
                      >
                        <span className={styles.dropdownItemTitle}>{item.label}</span>
                        <span className={styles.dropdownItemDesc}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Travel Services Dropdown (6 Services) */}
            <div
              className={styles.dropdownWrap}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link
                href="/services"
                className={`${styles.navLink} ${styles.dropdownTrigger} ${
                  pathname.startsWith('/services') ? styles.navLinkActive : ''
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Travel Services</span>
                <svg
                  className={`${styles.caret} ${servicesOpen ? styles.caretOpen : ''}`}
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
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </Link>

              {servicesOpen && (
                <div className={`${styles.dropdownMenu} ${styles.dropdownMenuServices}`}>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownHeading}>Our Travel Services</span>
                    <Link href="/services" className={styles.dropdownViewAll}>
                      Services Hub →
                    </Link>
                  </div>
                  <div className={styles.dropdownGridServices}>
                    {serviceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.dropdownItem}
                      >
                        <span className={styles.dropdownItemTitle}>{item.label}</span>
                        <span className={styles.dropdownItemDesc}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={styles.navLink}
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={styles.navLink}
              aria-current={pathname === '/contact' ? 'page' : undefined}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <Link href="/plan-your-trip" className={styles.navCta} id="header-cta">
            Plan My Trip
            <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles['hamburger--open'] : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="hamburger-btn"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      {/* Mobile menu with accordions */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles['mobileMenu--open'] : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation links">
          <Link
            href="/"
            className={styles.mobileNavLink}
            aria-current={pathname === '/' ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span>Home</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Mobile Destinations with accordion for Continents */}
          <div className={styles.mobileAccordionGroup}>
            <div className={styles.mobileAccordionHeader}>
              <Link
                href="/destinations"
                className={styles.mobileAccordionTitleLink}
                onClick={() => setMenuOpen(false)}
              >
                Destinations
              </Link>
              <button
                type="button"
                className={styles.mobileAccordionToggle}
                onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)}
                aria-expanded={mobileDestinationsOpen}
                aria-label="Toggle continents list"
              >
                <svg
                  className={`${styles.mobileCaret} ${mobileDestinationsOpen ? styles.mobileCaretOpen : ''}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {mobileDestinationsOpen && (
              <div className={styles.mobileSubList}>
                {destinationContinentItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileSubLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className={styles.mobileSubDesc}>{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Travel Services with accordion for 6 Services */}
          <div className={styles.mobileAccordionGroup}>
            <div className={styles.mobileAccordionHeader}>
              <Link
                href="/services"
                className={styles.mobileAccordionTitleLink}
                onClick={() => setMenuOpen(false)}
              >
                Travel Services
              </Link>
              <button
                type="button"
                className={styles.mobileAccordionToggle}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
                aria-label="Toggle services list"
              >
                <svg
                  className={`${styles.mobileCaret} ${mobileServicesOpen ? styles.mobileCaretOpen : ''}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {mobileServicesOpen && (
              <div className={styles.mobileSubList}>
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileSubLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className={styles.mobileSubDesc}>{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={styles.mobileNavLink}
            aria-current={pathname === '/about' ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span>About</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/contact"
            className={styles.mobileNavLink}
            aria-current={pathname === '/contact' ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span>Contact</span>
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <Link
          href="/plan-your-trip"
          className={styles.mobileCta}
          id="mobile-plan-cta"
          onClick={() => setMenuOpen(false)}
        >
          Plan My Trip →
        </Link>
      </div>
    </>
  )
}
