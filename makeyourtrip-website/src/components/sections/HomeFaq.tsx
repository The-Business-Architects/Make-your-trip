'use client'

import { useState } from 'react'
import Link from 'next/link'
import { homeFaqs } from '@/data/homeFaqs'
import styles from './HomeFaq.module.css'

export default function HomeFaq() {
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <section className={`section ${styles.section}`} id="faq" aria-labelledby="home-faq-heading">
      <div className="container">
        <div className={styles.head}>
          <h2 className="section-title" id="home-faq-heading">
            Frequently Asked <em>Questions.</em>
          </h2>
        </div>

        <div className={styles.accordionList} role="region" aria-label="Frequently Asked Questions List">
          {homeFaqs.map((faq, index) => {
            const isOpen = openIndices.includes(index)
            const answerId = `home-faq-answer-${index}`

            return (
              <article
                key={index}
                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.triggerButton}
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.chevronWrapper} aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={answerId}
                  className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : ''}`}
                  role="region"
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{faq.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className={styles.footerHelp}>
          <p className={styles.footerHelpText}>
            Have a custom travel route or specific question in mind?
          </p>
          <Link href="/plan-your-trip" className="btn btn--primary">
            Plan Your Journey With Us →
          </Link>
        </div>
      </div>
    </section>
  )
}
