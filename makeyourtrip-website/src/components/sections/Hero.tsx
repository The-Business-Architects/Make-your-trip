'use client'

import { useState, useEffect, useRef, useId } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Hero.module.css'

function RandomPlane() {
  const containerRef = useRef<SVGGElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const maskPathRef = useRef<SVGPathElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const id = useId()
  const maskId = `mask-${id.replace(/:/g, '')}`

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let active = true

    const animatePlane = () => {
      if (!active || !planeRef.current || !maskPathRef.current || !pathRef.current) return
      
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Determine direction
      const isLtr = Math.random() > 0.5
      const startX = isLtr ? -100 : width + 100
      const startY = Math.random() * height
      const endX = isLtr ? width + 100 : -100
      const endY = Math.random() * height
      
      const numSegments = 4
      const direction = isLtr ? 1 : -1
      const segmentWidth = (width + 200) / numSegments
      
      let d = `M ${startX} ${startY}`
      let currentX = startX
      let snakeDir = Math.random() > 0.5 ? 1 : -1

      for (let i = 0; i < numSegments; i++) {
        const nextX = startX + direction * (i + 1) * segmentWidth
        const nextY = startY // Keep a straight horizontal baseline
        
        const bumpHeight = segmentWidth * 0.5 // 50% rounded
        const cpOffsetX = segmentWidth * 0.276 // Approximation for semi-circle
        
        const cp1x = currentX + direction * cpOffsetX
        const cp1y = startY + snakeDir * bumpHeight
        
        const cp2x = nextX - direction * cpOffsetX
        const cp2y = startY + snakeDir * bumpHeight
        
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nextX} ${nextY}`
        
        currentX = nextX
        snakeDir *= -1 // Alternate curve
      }
      
      pathRef.current.setAttribute('d', d)
      maskPathRef.current.setAttribute('d', d)
      planeRef.current.style.offsetPath = `path('${d}')`
      
      const length = maskPathRef.current.getTotalLength()
      maskPathRef.current.style.strokeDasharray = `${length}`
      maskPathRef.current.style.strokeDashoffset = `${length}`
      
      const duration = length * 5 // Constant speed: 5ms per pixel (approx 200px/s)

      // Fade in container
      containerRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, fill: 'forwards' })

      const planeAnim = planeRef.current.animate([
        { offsetDistance: '0%' },
        { offsetDistance: '100%' }
      ], { duration, easing: 'linear', fill: 'forwards' })
      
      maskPathRef.current.animate([
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ], { duration, easing: 'linear', fill: 'forwards' })
      
      planeAnim.onfinish = () => {
        if (!active) return
        const fade = containerRef.current?.animate([
          { opacity: 1 }, { opacity: 0 }
        ], { duration: 1000, fill: 'forwards' })
        
        if (fade) {
          fade.onfinish = () => {
            if (active) timeoutId = setTimeout(animatePlane, Math.random() * 4000)
          }
        }
      }
    }
    
    timeoutId = setTimeout(animatePlane, Math.random() * 2000)
    
    return () => {
      active = false
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <g ref={containerRef} style={{ opacity: 0 }}>
      <defs>
        <mask id={maskId}>
          <path ref={maskPathRef} stroke="white" strokeWidth="4" fill="none" />
        </mask>
      </defs>
      <path 
        ref={pathRef} 
        stroke="rgba(255, 255, 255, 0.4)" 
        strokeWidth="1.5" 
        strokeDasharray="6 6" 
        fill="none" 
        mask={`url(#${maskId})`} 
      />
      <g ref={planeRef} style={{ offsetRotate: 'auto' }}>
        <g transform="translate(-12, -12) rotate(90, 12, 12) scale(1.2)">
           <path fill="white" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </g>
      </g>
    </g>
  )
}

function Counter({ label, sub, value, min, max, onChange }: { label: string, sub: string, value: number, min: number, max: number, onChange: (val: number) => void }) {
  return (
    <div className={styles.counter}>
      <div className={styles.counterInfo}>
        <span className={styles.counterLabel}>{label}</span>
        <span className={styles.counterSub}>{sub}</span>
      </div>
      <div className={styles.counterControls}>
        <button type="button" className={styles.counterBtn} disabled={value <= min} onClick={() => onChange(value - 1)}>-</button>
        <span className={styles.counterValue}>{value}</span>
        <button type="button" className={styles.counterBtn} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  )
}

export default function Hero() {
  const router = useRouter()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [showTravelers, setShowTravelers] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  const totalTravelers = adults + children + infants
  const travelerSummary = `${totalTravelers} Traveller${totalTravelers > 1 ? 's' : ''}`

  const selectWrapRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectWrapRef.current && !selectWrapRef.current.contains(event.target as Node)) {
        setShowTravelers(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    if (date) params.set('date', date)
    params.set('adults', adults.toString())
    if (children > 0) params.set('children', children.toString())
    if (infants > 0) params.set('infants', infants.toString())
    
    router.push(`/plan-your-trip?${params.toString()}`)
  }

  return (
    <section className={styles.hero} id="hero" aria-label="Hero — MakeYourTrip Inc.">
      {/* Animated SVG background planes and dashed lines */}
      <div className={styles.heroBg} aria-hidden="true">
        <svg width="100%" height="100%" className={styles.heroSvg} preserveAspectRatio="xMidYMid slice">
          <RandomPlane />
          <RandomPlane />
          <RandomPlane />
          <RandomPlane />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.textContent}>
            <h1 className={styles.headline}>
              Your travel,<br /><span className={styles.headlineAccent}>perfectly planned.</span>
            </h1>
          </div>

          <form className={styles.quoteForm} onSubmit={handleQuote}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>From</label>
                <input type="text" placeholder="Mumbai" value={from} onChange={e => setFrom(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>To</label>
                <input type="text" placeholder="Vancouver" value={to} onChange={e => setTo(e.target.value)} required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Departure</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Travellers</label>
                <div className={styles.selectWrap} ref={selectWrapRef}>
                  <button
                    type="button"
                    className={styles.fieldSelect}
                    onClick={() => setShowTravelers(!showTravelers)}
                    aria-expanded={showTravelers}
                    style={{ textAlign: 'left' }}
                  >
                    {travelerSummary}
                  </button>
                  <span className={styles.selectChevron} aria-hidden="true" style={{ transition: 'transform 0.2s', transform: showTravelers ? 'rotate(180deg)' : 'none' }}>▾</span>
                  
                  {showTravelers && (
                    <div className={styles.travelerPanel}>
                      <Counter label="Adults" sub="Age 12+" value={adults} min={1} max={9} onChange={setAdults} />
                      <Counter label="Children" sub="Age 2–11" value={children} min={0} max={8} onChange={setChildren} />
                      <Counter label="Infants" sub="Under 2" value={infants} min={0} max={Math.min(4, adults)} onChange={setInfants} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Enquire Now →
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
