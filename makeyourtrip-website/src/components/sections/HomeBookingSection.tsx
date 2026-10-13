'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './HomeBookingSection.module.css'

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

export default function HomeBookingSection() {
  const router = useRouter()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [showTravelers, setShowTravelers] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  const today = new Date().toISOString().split('T')[0]
  const totalTravelers = adults + children + infants
  const travelerSummary = `${totalTravelers} Traveller${totalTravelers > 1 ? 's' : ''}`

  const selectWrapRef = useRef<HTMLDivElement>(null)

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
    if (from.trim()) params.set('from', from.trim())
    if (to.trim()) params.set('to', to.trim())
    if (date) params.set('date', date)
    params.set('adults', adults.toString())
    if (children > 0) params.set('children', children.toString())
    if (infants > 0) params.set('infants', infants.toString())

    router.push(`/plan-your-trip?${params.toString()}`)
  }

  return (
    <section
      className={`section ${styles.ctaSection}`}
      id="inquire"
      aria-label="Plan your journey"
    >
      <div className={styles.ctaBackgroundGlow} aria-hidden="true" />
      <div className="container">
        {/* Heading above the CTA form card in accent color */}
        <div className={styles.outerHeader}>
          <h2 className={styles.cardHeading}>
            Your travel, <span className={styles.accentText}>perfectly planned.</span>
          </h2>
        </div>

        {/* Prominent Highlighted CTA Form Card */}
        <div className={styles.highlightCard}>
          <form className={styles.enquireForm} onSubmit={handleSubmit}>
            <div className={styles.formGrid2x2}>
              {/* 1. FROM */}
              <div className={styles.formField}>
                <label htmlFor="cta-from" className={styles.label}>
                  From
                </label>
                <input
                  id="cta-from"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Mumbai, New York"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
              </div>

              {/* 2. TO */}
              <div className={styles.formField}>
                <label htmlFor="cta-to" className={styles.label}>
                  To
                </label>
                <input
                  id="cta-to"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Vancouver, Tokyo"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>

              {/* 3. DEPARTURE */}
              <div className={styles.formField}>
                <label htmlFor="cta-date" className={styles.label}>
                  Departure
                </label>
                <div className={styles.inputWithIcon}>
                  <input
                    id="cta-date"
                    type="date"
                    className={styles.input}
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 4. TRAVELLERS */}
              <div className={styles.formField} ref={selectWrapRef}>
                <label className={styles.label}>Travellers</label>
                <div className={styles.selectContainer}>
                  <button
                    type="button"
                    className={styles.selectButton}
                    onClick={() => setShowTravelers(!showTravelers)}
                    aria-expanded={showTravelers}
                  >
                    <span>{travelerSummary}</span>
                    <span
                      className={styles.chevron}
                      style={{
                        transform: showTravelers ? 'rotate(180deg)' : 'none',
                      }}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>

                  {showTravelers && (
                    <div className={styles.travelerDropdown}>
                      <Counter
                        label="Adults"
                        sub="Age 12+"
                        value={adults}
                        min={1}
                        max={10}
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
                        max={4}
                        onChange={setInfants}
                      />
                      <button
                        type="button"
                        className={styles.dropdownDoneBtn}
                        onClick={() => setShowTravelers(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enquire Now Button */}
            <button type="submit" className={styles.enquireButton}>
              Enquire Now →
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
