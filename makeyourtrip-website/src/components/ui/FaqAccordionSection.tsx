'use client'

import { useState } from 'react'
import styles from './FaqAccordionSection.module.css'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionSectionProps {
  id?: string
  eyebrow?: string
  heading: React.ReactNode
  subheading?: string
  faqs: FaqItem[]
}

export default function FaqAccordionSection({
  id = 'faq-section',
  eyebrow = 'Frequently Asked Questions',
  heading,
  subheading,
  faqs,
}: FaqAccordionSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <section id={id} className={styles.faqSection} aria-label="Frequently Asked Questions">
      <div className="container">
        <div className={styles.sectionHeader}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <hr className="divider" />
          <h2 className={styles.heading}>{heading}</h2>
          {subheading && <p className={styles.subheading}>{subheading}</p>}
        </div>

        <div className={styles.accordionList} role="region" aria-label="FAQ Accordion">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index)
            const answerId = `${id}-answer-${index}`

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
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
      </div>
    </section>
  )
}
