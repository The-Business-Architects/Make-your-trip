import React from 'react'
import Link from 'next/link'
import styles from './PageHero.module.css'

export interface QuickFact {
  label: string
  value: string
  icon?: 'duration' | 'season' | 'visa' | React.ReactNode
}

interface PageHeroProps {
  breadcrumbs?: React.ReactNode
  eyebrow?: string
  title: string
  subtitle?: string
  quickFacts?: QuickFact[]
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  children?: React.ReactNode
  className?: string
}

function renderFactIcon(icon?: 'duration' | 'season' | 'visa' | React.ReactNode) {
  if (React.isValidElement(icon)) return icon

  if (icon === 'duration') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  }

  if (icon === 'season') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }

  if (icon === 'visa') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
    </svg>
  )
}

export default function PageHero({
  breadcrumbs,
  title,
  subtitle,
  quickFacts,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  children,
  className = '',
}: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${className}`} aria-label={`Header: ${title}`}>
      {/* Background Graphic: Check Grid Pattern */}
      <div className={styles.checkPattern} aria-hidden="true" />

      {/* Ambient soft blue glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Left-Aligned Breadcrumb Bar */}
      {breadcrumbs && (
        <div className={styles.breadcrumbBar}>
          <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
            {breadcrumbs}
          </nav>
        </div>
      )}

      {/* Centered Structured Content */}
      <div className={styles.inner}>
        {/* Title */}
        <h1 className={styles.title}>{title}</h1>

        {/* Subtitle */}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* Structured Quick-Facts Strip */}
        {quickFacts && quickFacts.length > 0 && (
          <div className={styles.factsStrip}>
            {quickFacts.map((fact, index) => (
              <div key={index} className={styles.factItem}>
                <div className={styles.factIcon} aria-hidden="true">
                  {renderFactIcon(fact.icon)}
                </div>
                <div className={styles.factContent}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        {ctaText && ctaHref && (
          <div className={styles.ctaRow}>
            <Link href={ctaHref} className={styles.ctaBtnPrimary}>
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaHref && (
              <Link href={secondaryCtaHref} className={styles.ctaBtnSecondary}>
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}

        {/* Custom Children */}
        {children && <div className={styles.customContent}>{children}</div>}
      </div>
    </section>
  )
}
