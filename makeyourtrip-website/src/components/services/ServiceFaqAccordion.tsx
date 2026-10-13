'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './ServiceFaqAccordion.module.css'
import type { ServiceFAQ } from '@/data/services'

interface ServiceFaqAccordionProps {
  serviceTitle: string
  faqs: ServiceFAQ[]
}

export default function ServiceFaqAccordion({
  serviceTitle,
  faqs,
}: ServiceFaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <section id="service-faqs" className={styles.faqSection} aria-label={`${serviceTitle} FAQs`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className="eyebrow">Frequently Asked Questions</p>
          <hr className="divider" />
          <h2 className={styles.heading}>
            Common Questions About <em>{serviceTitle}</em>
          </h2>
          <p className={styles.subheading}>
            Clear answers covering our personalized planning process, service inclusions, transparent quotes, and live support.
          </p>
        </div>

        <div className={styles.accordionList} role="region" aria-label="Frequently Asked Questions">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index)
            const answerId = `service-faq-answer-${index}`

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
            Ready to discuss your upcoming international journey with our specialists?
          </p>
          <Link href="/plan-your-trip" className="btn btn--primary">
            Request a Free Route Proposal →
          </Link>
        </div>
      </div>
    </section>
  )
}
