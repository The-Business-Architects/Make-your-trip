import styles from './PageHero.module.css'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className={styles.hero} aria-label={`Page header: ${title}`}>
      <div className={`container ${styles.inner}`}>
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  )
}
