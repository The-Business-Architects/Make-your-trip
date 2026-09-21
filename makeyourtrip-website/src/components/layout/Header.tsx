'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services',     label: 'Travel Services' },
  { href: '/about',        label: 'About' },
  { href: '/contact',      label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  // Determine if this page has a transparent hero (only homepage)
  const isHeroPage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const headerClass = [
    styles.header,
    isHeroPage && !scrolled ? styles['header--transparent'] : styles['header--scrolled'],
  ].filter(Boolean).join(' ')

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
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={styles.navLink}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
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

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles['mobileMenu--open'] : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation links">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.mobileNavLink}
              aria-current={pathname === href ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
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
