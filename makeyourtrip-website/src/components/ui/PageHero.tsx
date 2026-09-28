import styles from './PageHero.module.css'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}

export default function PageHero({ eyebrow, title, subtitle, children, className = '' }: PageHeroProps) {
  return (
    <section className={`${styles.hero} ${className}`} aria-label={`Page header: ${title}`}>
      {/* Cinematic overlay */}
      <div className={styles.overlay} aria-hidden="true" />
      {/* Subtle grid texture */}
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.textContent}>
          {eyebrow && (
            <p className="eyebrow eyebrow--light">{eyebrow}</p>
          )}
          <div className={styles.divider} aria-hidden="true" />
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {children && (
          <div className={styles.extraContent}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
