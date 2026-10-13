'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import styles from './DestinationFaqAccordion.module.css'
import type { DestinationFAQ } from '@/data/destinations'

interface DestinationFaqAccordionProps {
  destinationName: string
  faqs: DestinationFAQ[]
}

export default function DestinationFaqAccordion({
  destinationName,
  faqs,
}: DestinationFaqAccordionProps) {
  // First item open by default
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <section id="faqs" className={styles.faqSection} aria-label="Travel FAQs">
      <div className="container">
        <div className={styles.faqContainer}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <h2 className={styles.heading}>
                Frequently Asked Questions About Traveling to {destinationName}
              </h2>
              <p className={styles.subheading}>
                Key travel considerations covering entry visas, seasonal weather, recommended duration, local transit, and etiquette.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.accordionList} role="region" aria-label="Frequently Asked Questions">
            {faqs.map((faq, index) => {
              const isOpen = openIndices.includes(index)
              const answerId = `faq-answer-${destinationName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`

              return (
                <ScrollReveal key={index} delay={index * 60}>
                  <article
                    className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.triggerButton}
                      onClick={() => toggleIndex(index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <div className={styles.questionLeft}>
                        <h3 className={styles.questionText}>{faq.question}</h3>
                      </div>

                      <span className={styles.chevronWrapper} aria-hidden="true">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={answerId}
                      className={`${styles.answerCollapse} ${isOpen ? styles.answerCollapseOpen : ''}`}
                      role="region"
                    >
                      <div className={styles.answerInner}>
                        <div className={styles.answerContent}>
                          <p className={styles.answerText}>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Contextual help strip */}
          <ScrollReveal delay={120}>
            <div className={styles.faqFooterHelp}>
              <div className={styles.footerHelpText}>
                <span className={styles.footerHelpIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                <span>Have specific questions regarding flights, custom dates, or group size for {destinationName}?</span>
              </div>
              <Link
                href={`/plan-your-trip?destination=${encodeURIComponent(destinationName)}`}
                className={styles.footerHelpLink}
              >
                <span>Ask Our Travel Specialists →</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
