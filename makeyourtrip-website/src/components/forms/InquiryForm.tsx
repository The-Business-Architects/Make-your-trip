'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import styles from './InquiryForm.module.css'

type JourneyType = 'one-way' | 'return' | 'multi-destination'

const legSchema = z.object({
  from: z.string().min(2, 'Required'),
  to:   z.string().min(2, 'Required'),
  date: z.string().min(1, 'Required'),
})

const schema = z.object({
  journeyType:  z.enum(['one-way', 'return', 'multi-destination'] as const),
  legs:         z.array(legSchema).min(1),
  returnDate:   z.string().optional(),
  adults:       z.number().min(1, 'At least 1 adult required').max(9),
  children:     z.number().min(0).max(8),
  infants:      z.number().min(0).max(4),
  travelClass:  z.enum(['economy', 'premium-economy', 'business', 'first'] as const),
  fullName:     z.string().min(2, 'Please enter your full name'),
  email:        z.string().email('Please enter a valid email'),
  phone:        z.string().min(7, 'Please enter a valid phone number'),
  country:      z.string().min(2, 'Please enter your country'),
  requirements: z.string().optional(),
  _honey:       z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

const JOURNEY_OPTIONS: { value: JourneyType; label: string }[] = [
  { value: 'one-way',           label: 'One Way' },
  { value: 'return',            label: 'Return' },
  { value: 'multi-destination', label: 'Multi-Destination' },
]

const CLASS_OPTIONS: { value: 'economy' | 'premium-economy' | 'business' | 'first'; label: string }[] = [
  { value: 'economy',         label: 'Economy' },
  { value: 'premium-economy', label: 'Premium Economy' },
  { value: 'business',        label: 'Business' },
  { value: 'first',           label: 'First' },
]

function Counter({
  label, sub, value, min, max,
  onChange,
}: {
  label: string; sub: string; value: number; min: number; max: number
  onChange: (v: number) => void
}) {
  return (
    <div className={styles.counter}>
      <div className={styles.counterInfo}>
        <span className={styles.counterLabel}>{label}</span>
        <span className={styles.counterSub}>{sub}</span>
      </div>
      <div className={styles.counterControls}>
        <button type="button" className={styles.counterBtn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label}`}>−</button>
        <span className={styles.counterValue}>{value}</span>
        <button type="button" className={styles.counterBtn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  )
}

export default function InquiryForm() {
  const searchParams = useSearchParams()
  const initialFrom = searchParams.get('from') || ''
  const initialTo = searchParams.get('to') || ''
  const initialDate = searchParams.get('date') || ''
  const initialAdults = searchParams.get('adults') ? parseInt(searchParams.get('adults') as string) : 1
  const initialChildren = searchParams.get('children') ? parseInt(searchParams.get('children') as string) : 0
  const initialInfants = searchParams.get('infants') ? parseInt(searchParams.get('infants') as string) : 0

  const [status, setStatus] = useState<FormStatus>('idle')
  const [journeyType, setJourneyType] = useState<JourneyType>('one-way')
  const [showTravelers, setShowTravelers] = useState(false)
  const [showClassOptions, setShowClassOptions] = useState(false)
  
  const classDropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (classDropdownRef.current && !classDropdownRef.current.contains(event.target as Node)) {
        setShowClassOptions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      journeyType: 'one-way',
      legs: [{ 
        from: initialFrom, 
        to: initialTo, 
        date: initialDate 
      }],
      adults: initialAdults || 1,
      children: initialChildren || 0,
      infants: initialInfants || 0,
      travelClass: 'economy',
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'legs' })

  const adults   = watch('adults')
  const children = watch('children')
  const infants  = watch('infants')
  const travelClass = watch('travelClass')
  
  const travelerSummary = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`

  const handleJourneyChange = (type: JourneyType) => {
    setJourneyType(type)
    setValue('journeyType', type)
    if (type !== 'multi-destination') {
      while (fields.length > 1) remove(fields.length - 1)
    } else if (fields.length < 2) {
      append({ from: '', to: '', date: '' })
    }
  }

  const onSubmit = async (data: FormData) => {
    if (data._honey) return
    setStatus('submitting')
    try {
      const legsText = data.legs
        .map((l, i) => `Leg ${i + 1}: ${l.from} → ${l.to} on ${l.date}`)
        .join('\n')
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          journey_type: data.journeyType,
          legs: legsText,
          return_date: data.returnDate ?? 'N/A',
          adults: data.adults,
          children: data.children,
          infants: data.infants,
          travel_class: data.travelClass,
          from_name: data.fullName,
          from_email: data.email,
          phone: data.phone,
          country: data.country,
          requirements: data.requirements ?? 'None',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      reset()
      setJourneyType('one-way')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successState} role="alert" aria-live="polite">
        <h2 className={styles.successTitle}>What Happens Next?</h2>
        <ul className={styles.stepsList}>
          <li className={styles.stepsItem}>
            <span className={styles.stepsNum}>01</span>
            <p>We receive your inquiry and review your requirements.</p>
          </li>
          <li className={styles.stepsItem}>
            <span className={styles.stepsNum}>02</span>
            <p>A member of our team gets in touch to discuss your options.</p>
          </li>
          <li className={styles.stepsItem}>
            <span className={styles.stepsNum}>03</span>
            <p>We help you move forward with the right plan for your journey.</p>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Travel inquiry form"
      id="inquiry-form"
    >
      {/* Honeypot */}
      <input type="text" {...register('_honey')} tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />

      {/* ── Part 1: Trip Details ──────────────────────────── */}
      <div className={styles.part}>
        <p className={styles.partTitle}>Trip Details</p>

        {/* Journey type radio pills */}
        <div className={styles.pillGroup} role="group" aria-label="Journey type">
          {JOURNEY_OPTIONS.map(({ value, label }) => (
            <label key={value} className={`${styles.pill} ${journeyType === value ? styles.pillActive : ''}`}>
              <input
                type="radio"
                name="journeyType"
                value={value}
                checked={journeyType === value}
                onChange={() => handleJourneyChange(value)}
                className={styles.srOnly}
              />
              {label}
            </label>
          ))}
        </div>

        {/* Legs */}
        <div className={styles.legsStack}>
          {fields.map((field, i) => (
            <div key={field.id} className={styles.legBlock}>
              {journeyType === 'multi-destination' && (
                <div className={styles.legMeta}>
                  <span className={styles.legIndex}>Stop {i + 1}</span>
                  {i > 0 && (
                    <button type="button" className={styles.removeBtn} onClick={() => remove(i)} aria-label="Remove stop">
                      Remove
                    </button>
                  )}
                </div>
              )}
              <div className={styles.fieldsRow}>
                {/* From */}
                <div className={styles.fieldCell}>
                  <label htmlFor={`legs.${i}.from`} className={styles.fieldLabel}>From</label>
                  <input
                    id={`legs.${i}.from`}
                    type="text"
                    className={`${styles.fieldInput} ${errors.legs?.[i]?.from ? styles.fieldInputError : ''}`}
                    placeholder="Departure city"
                    {...register(`legs.${i}.from`)}
                  />
                  {errors.legs?.[i]?.from && <span className={styles.fieldError}>{errors.legs[i]?.from?.message}</span>}
                </div>

                <div className={styles.fieldDivider} aria-hidden="true" />

                {/* To */}
                <div className={styles.fieldCell}>
                  <label htmlFor={`legs.${i}.to`} className={styles.fieldLabel}>To</label>
                  <input
                    id={`legs.${i}.to`}
                    type="text"
                    className={`${styles.fieldInput} ${errors.legs?.[i]?.to ? styles.fieldInputError : ''}`}
                    placeholder="Destination city"
                    {...register(`legs.${i}.to`)}
                  />
                  {errors.legs?.[i]?.to && <span className={styles.fieldError}>{errors.legs[i]?.to?.message}</span>}
                </div>

                <div className={styles.fieldDivider} aria-hidden="true" />

                {/* Departure date */}
                <div className={styles.fieldCell}>
                  <label htmlFor={`legs.${i}.date`} className={styles.fieldLabel}>Departure</label>
                  <input
                    id={`legs.${i}.date`}
                    type="date"
                    className={`${styles.fieldInput} ${errors.legs?.[i]?.date ? styles.fieldInputError : ''}`}
                    {...register(`legs.${i}.date`)}
                  />
                  {errors.legs?.[i]?.date && <span className={styles.fieldError}>{errors.legs[i]?.date?.message}</span>}
                </div>

                {/* Return date — only show on first leg for return journey */}
                {journeyType === 'return' && i === 0 && (
                  <>
                    <div className={styles.fieldDivider} aria-hidden="true" />
                    <div className={styles.fieldCell}>
                      <label htmlFor="returnDate" className={styles.fieldLabel}>Return</label>
                      <input
                        id="returnDate"
                        type="date"
                        className={styles.fieldInput}
                        {...register('returnDate')}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add stop */}
        {journeyType === 'multi-destination' && fields.length < 5 && (
          <button
            type="button"
            className={styles.addStopBtn}
            onClick={() => append({ from: '', to: '', date: '' })}
          >
            + Add another stop
          </button>
        )}

        {/* Travelers + Class row */}
        <div className={styles.twoCol}>
          <div className={styles.fieldCell} style={{ position: 'relative' }}>
            <label htmlFor="travelers-btn" className={styles.fieldLabel}>Travellers</label>
            <div className={styles.selectWrap}>
              <button
                type="button"
                id="travelers-btn"
                className={styles.fieldSelect}
                onClick={() => setShowTravelers(!showTravelers)}
                aria-expanded={showTravelers}
                style={{ textAlign: 'left' }}
              >
                {travelerSummary}
              </button>
              <span className={styles.selectChevron} aria-hidden="true" style={{ transition: 'transform 0.2s', transform: showTravelers ? 'rotate(180deg)' : 'none' }}>▾</span>
            </div>
            
            {showTravelers && (
              <div className={styles.travelerPanel}>
                <Counter label="Adults"   sub="Age 12+"    value={adults}   min={1} max={9} onChange={v => setValue('adults', v)} />
                <Counter label="Children" sub="Age 2–11"   value={children} min={0} max={8} onChange={v => setValue('children', v)} />
                <Counter label="Infants"  sub="Under 2"    value={infants}  min={0} max={Math.min(4, adults)} onChange={v => setValue('infants', v)} />
              </div>
            )}
            {errors.adults && <span className={styles.fieldError}>{errors.adults.message}</span>}
          </div>

          <div className={styles.fieldCell} ref={classDropdownRef} style={{ position: 'relative' }}>
            <label htmlFor="travelClassBtn" className={styles.fieldLabel}>Travel Class</label>
            <div className={styles.selectWrap}>
              <button
                type="button"
                id="travelClassBtn"
                className={styles.fieldSelect}
                onClick={() => setShowClassOptions(!showClassOptions)}
                aria-expanded={showClassOptions}
                style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}
              >
                {CLASS_OPTIONS.find(c => c.value === travelClass)?.label || 'Select class'}
              </button>
              <span className={styles.selectChevron} aria-hidden="true" style={{ transition: 'transform 0.2s', transform: showClassOptions ? 'rotate(180deg)' : 'none' }}>▾</span>
            </div>
            {showClassOptions && (
              <div className={styles.travelerPanel} style={{ zIndex: 10 }}>
                {CLASS_OPTIONS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    className={`${styles.classOptionBtn} ${travelClass === c.value ? styles.classOptionActive : ''}`}
                    onClick={() => {
                      setValue('travelClass', c.value, { shouldValidate: true })
                      setShowClassOptions(false)
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            {errors.travelClass && <span className={styles.fieldError}>{errors.travelClass.message}</span>}
          </div>
        </div>
      </div>

      {/* ── Part 2: Contact Details ───────────────────────── */}
      <div className={styles.part}>
        <p className={styles.partTitle}>Contact Details</p>

        <div className={styles.twoCol}>
          <div className={styles.fieldCell}>
            <label htmlFor="fullName" className={styles.fieldLabel}>Full Name *</label>
            <input id="fullName" type="text" className={`${styles.fieldInput} ${errors.fullName ? styles.fieldInputError : ''}`} placeholder="Your full name" autoComplete="name" {...register('fullName')} />
            {errors.fullName && <span className={styles.fieldError}>{errors.fullName.message}</span>}
          </div>

          <div className={styles.fieldCell}>
            <label htmlFor="email" className={styles.fieldLabel}>Email Address *</label>
            <input id="email" type="email" className={`${styles.fieldInput} ${errors.email ? styles.fieldInputError : ''}`} placeholder="your@email.com" autoComplete="email" {...register('email')} />
            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
          </div>

          <div className={styles.fieldCell}>
            <label htmlFor="phone" className={styles.fieldLabel}>Phone / WhatsApp *</label>
            <input id="phone" type="tel" className={`${styles.fieldInput} ${errors.phone ? styles.fieldInputError : ''}`} placeholder="+1 000 000 0000" autoComplete="tel" {...register('phone')} />
            {errors.phone && <span className={styles.fieldError}>{errors.phone.message}</span>}
          </div>

          <div className={styles.fieldCell}>
            <label htmlFor="country" className={styles.fieldLabel}>Country *</label>
            <input id="country" type="text" className={`${styles.fieldInput} ${errors.country ? styles.fieldInputError : ''}`} placeholder="Country of residence" autoComplete="country-name" {...register('country')} />
            {errors.country && <span className={styles.fieldError}>{errors.country.message}</span>}
          </div>
        </div>

        <div className={styles.fieldCell}>
          <label htmlFor="requirements" className={styles.fieldLabel}>
            Special Requests <span className={styles.optional}>— optional</span>
          </label>
          <textarea
            id="requirements"
            className={styles.fieldTextarea}
            rows={3}
            placeholder="Meal preferences, accessibility needs, specific airlines, or any other notes…"
            {...register('requirements')}
          />
        </div>
      </div>

      {/* ── Error ────────────────────────────────────────── */}
      {status === 'error' && (
        <div className={styles.errorMsg} role="alert">
          <p>Something went wrong. Please email us at{' '}
            <a href="mailto:info@makeyourtripinc.com">info@makeyourtripinc.com</a>.
          </p>
        </div>
      )}

      {/* ── Submit ───────────────────────────────────────── */}
      <div className={styles.submitRow}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={status === 'submitting'}
          id="form-submit-btn"
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Send My Inquiry →'}
        </button>
        <p className={styles.disclaimer}>
          We respect your privacy. Your details are used solely for your travel inquiry.
        </p>
      </div>
    </form>
  )
}
