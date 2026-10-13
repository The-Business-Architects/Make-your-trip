'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './DestinationCtaSection.module.css'

interface DestinationCtaSectionProps {
  destinationName: string
  country: string
}

function Counter({
  label,
  sub,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  sub: string
  value: number
  min: number
  max: number
  onChange: (val: number) => void
}) {
  return (
    <div className={styles.counter}>
      <div className={styles.counterInfo}>
        <span className={styles.counterLabel}>{label}</span>
        <span className={styles.counterSub}>{sub}</span>
      </div>
      <div className={styles.counterControls}>
        <button
          type="button"
          className={styles.counterBtn}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          aria-label={`Decrease ${label}`}
        >
          -
        </button>
        <span className={styles.counterValue}>{value}</span>
        <button
          type="button"
          className={styles.counterBtn}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function DestinationCtaSection({
  destinationName,
  country,
}: DestinationCtaSectionProps) {
  const router = useRouter()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState(`${destinationName}, ${country}`)
  const [date, setDate] = useState('')
  const [showTravelers, setShowTravelers] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  const selectWrapRef = useRef<HTMLDivElement>(null)

  const totalTravelers = adults + children + infants
  const travelerSummary = `${totalTravelers} Traveller${totalTravelers > 1 ? 's' : ''}`

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectWrapRef.current &&
        !selectWrapRef.current.contains(event.target as Node)
      ) {
        setShowTravelers(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('destination', destinationName)
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    if (date) params.set('date', date)
    params.set('adults', adults.toString())
    if (children > 0) params.set('children', children.toString())
    if (infants > 0) params.set('infants', infants.toString())

    router.push(`/plan-your-trip?${params.toString()}`)
  }

  // Current date for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <section className={styles.ctaSection} aria-label={`Inquire about ${destinationName}`}>
      {/* Subtle decorative architectural background graphics */}
      <div className={styles.bgGraphics} aria-hidden="true">
        <div className={styles.decorCircleLeft} />
        <div className={styles.decorCircleRight} />
        <div className={styles.gridOverlay} />
      </div>

      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.headerBlock}>
            <h2 className={styles.ctaTitle}>Ready to Experience {destinationName}?</h2>
          </div>

          {/* Inquiry Quick-Search Form */}
          <form className={styles.quoteForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              {/* 1. FROM */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel} htmlFor="cta-from">
                  From
                </label>
                <div className={styles.inputWrapper}>
                  <svg
                    className={styles.inputIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 2L11 13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <input
                    id="cta-from"
                    type="text"
                    className={styles.inputField}
                    placeholder="Departure city (e.g. Mumbai, New York)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 2. TO (Auto-selected according to destination page) */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel} htmlFor="cta-to">
                  To
                </label>
                <div className={styles.inputWrapper}>
                  <svg
                    className={styles.inputIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    id="cta-to"
                    type="text"
                    className={styles.inputField}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              {/* 3. DEPARTURE */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel} htmlFor="cta-date">
                  Departure
                </label>
                <div className={styles.inputWrapper}>
                  <svg
                    className={styles.inputIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    id="cta-date"
                    type="date"
                    className={styles.inputField}
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 4. TRAVELLERS (Counter popover) */}
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Travellers</label>
                <div className={styles.selectWrap} ref={selectWrapRef}>
                  <svg
                    className={styles.selectIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <button
                    type="button"
                    className={styles.fieldSelect}
                    onClick={() => setShowTravelers(!showTravelers)}
                    aria-expanded={showTravelers}
                  >
                    <span>{travelerSummary}</span>
                    <span
                      className={styles.selectChevron}
                      style={{
                        transform: showTravelers ? 'rotate(180deg)' : 'none',
                      }}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>

                  {showTravelers && (
                    <div className={styles.travelerPanel}>
                      <Counter
                        label="Adults"
                        sub="Age 12+"
                        value={adults}
                        min={1}
                        max={9}
                        onChange={setAdults}
                      />
                      <Counter
                        label="Children"
                        sub="Age 2–11"
                        value={children}
                        min={0}
                        max={8}
                        onChange={setChildren}
                      />
                      <Counter
                        label="Infants"
                        sub="Under 2"
                        value={infants}
                        min={0}
                        max={Math.min(4, adults)}
                        onChange={setInfants}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn}>
                Inquire Now →
              </button>
            </div>
          </form>

          {/* Authentic Contact Details from Contact Page */}
          <div className={styles.contactRow}>
            <a
              href="mailto:info@makeyourtripinc.com"
              className={styles.contactLink}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>info@makeyourtripinc.com</span>
            </a>

            <a href="tel:+919528203267" className={styles.contactLink}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 9528 203 267 (WhatsApp)</span>
            </a>

            <a href="tel:+16507290130" className={styles.contactLink}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+1 (650) 729-0130 (Intl)</span>
            </a>

            <span className={styles.contactNote}>Serving Worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
