'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import styles from './InquiryForm.module.css'

// ── Validation schema ────────────────────────────────────────
const schema = z.object({
  fullName:    z.string().min(2, 'Please enter your full name'),
  email:       z.string().email('Please enter a valid email address'),
  phone:       z.string().min(7, 'Please enter a valid phone number'),
  country:     z.string().min(2, 'Please enter your country'),
  destination: z.string().min(2, 'Please enter a destination'),
  departure:   z.string().min(2, 'Please enter your departure city'),
  travelDate:  z.string().min(1, 'Please select a travel date'),
  returnDate:  z.string().optional(),
  travelers:   z.string().min(1, 'Please select number of travelers'),
  travelType:  z.enum(['leisure', 'family', 'business', 'group', 'other'] as const, {
    error: 'Please select a travel type',
  }),
  requirements: z.string().optional(),
  // Honeypot — must be empty
  _honey:      z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// ── EmailJS config (set in .env.local) ──────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

export default function InquiryForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    // Honeypot check
    if (data._honey) return

    setStatus('submitting')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:     data.fullName,
          from_email:    data.email,
          phone:         data.phone,
          country:       data.country,
          destination:   data.destination,
          departure:     data.departure,
          travel_date:   data.travelDate,
          return_date:   data.returnDate ?? 'Not specified',
          travelers:     data.travelers,
          travel_type:   data.travelType,
          requirements:  data.requirements ?? 'None',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.wrapper}>
      {status === 'success' ? (
        <div className={styles.successMsg} role="alert" aria-live="polite">
          <div className={styles.successIcon} aria-hidden="true">✓</div>
          <h3 className={styles.successTitle}>Inquiry Received</h3>
          <p className={styles.successText}>
            Thank you for reaching out. Our team will review your inquiry and get back to you shortly.
          </p>
          <button
            className="btn btn--secondary"
            onClick={() => setStatus('idle')}
            id="form-submit-another"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Travel inquiry form"
          id="inquiry-form"
        >
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            {...register('_honey')}
            tabIndex={-1}
            aria-hidden="true"
            style={{ display: 'none' }}
          />

          {/* ─── Contact Information ──────────────────── */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Contact Information</legend>
            <div className={styles.fieldsGrid}>

              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  className="form-input"
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <span id="fullName-error" className="form-error" role="alert">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone / WhatsApp *</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+1 000 000 0000"
                  autoComplete="tel"
                  aria-required="true"
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  {...register('phone')}
                />
                {errors.phone && (
                  <span id="phone-error" className="form-error" role="alert">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="country" className="form-label">Country *</label>
                <input
                  id="country"
                  type="text"
                  className="form-input"
                  placeholder="USA / Canada / UK"
                  autoComplete="country-name"
                  aria-required="true"
                  aria-describedby={errors.country ? 'country-error' : undefined}
                  {...register('country')}
                />
                {errors.country && (
                  <span id="country-error" className="form-error" role="alert">
                    {errors.country.message}
                  </span>
                )}
              </div>

            </div>
          </fieldset>

          {/* ─── Trip Details ─────────────────────────── */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Trip Details</legend>
            <div className={styles.fieldsGrid}>

              <div className="form-group">
                <label htmlFor="destination" className="form-label">Destination *</label>
                <input
                  id="destination"
                  type="text"
                  className="form-input"
                  placeholder="Where are you travelling to?"
                  aria-required="true"
                  aria-describedby={errors.destination ? 'destination-error' : undefined}
                  {...register('destination')}
                />
                {errors.destination && (
                  <span id="destination-error" className="form-error" role="alert">
                    {errors.destination.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="departure" className="form-label">Departure City *</label>
                <input
                  id="departure"
                  type="text"
                  className="form-input"
                  placeholder="Where are you flying from?"
                  aria-required="true"
                  aria-describedby={errors.departure ? 'departure-error' : undefined}
                  {...register('departure')}
                />
                {errors.departure && (
                  <span id="departure-error" className="form-error" role="alert">
                    {errors.departure.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="travelDate" className="form-label">Travel Date *</label>
                <input
                  id="travelDate"
                  type="date"
                  className="form-input"
                  aria-required="true"
                  aria-describedby={errors.travelDate ? 'travelDate-error' : undefined}
                  {...register('travelDate')}
                />
                {errors.travelDate && (
                  <span id="travelDate-error" className="form-error" role="alert">
                    {errors.travelDate.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="returnDate" className="form-label">Return Date</label>
                <input
                  id="returnDate"
                  type="date"
                  className="form-input"
                  {...register('returnDate')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="travelers" className="form-label">Number of Travelers *</label>
                <div className="form-select-wrapper">
                  <select
                    id="travelers"
                    className="form-select"
                    aria-required="true"
                    aria-describedby={errors.travelers ? 'travelers-error' : undefined}
                    {...register('travelers')}
                  >
                    <option value="">Select</option>
                    {['1', '2', '3', '4', '5', '6–10', '10+'].map(n => (
                      <option key={n} value={n}>{n} traveler{n === '1' ? '' : 's'}</option>
                    ))}
                  </select>
                </div>
                {errors.travelers && (
                  <span id="travelers-error" className="form-error" role="alert">
                    {errors.travelers.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="travelType" className="form-label">Travel Type *</label>
                <div className="form-select-wrapper">
                  <select
                    id="travelType"
                    className="form-select"
                    aria-required="true"
                    aria-describedby={errors.travelType ? 'travelType-error' : undefined}
                    {...register('travelType')}
                  >
                    <option value="">Select type</option>
                    <option value="leisure">Leisure</option>
                    <option value="family">Family</option>
                    <option value="business">Business</option>
                    <option value="group">Group</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.travelType && (
                  <span id="travelType-error" className="form-error" role="alert">
                    {errors.travelType.message}
                  </span>
                )}
              </div>

            </div>

            {/* Additional Requirements — full width */}
            <div className={`form-group ${styles.fullWidth}`}>
              <label htmlFor="requirements" className="form-label">Additional Requirements</label>
              <textarea
                id="requirements"
                className="form-textarea"
                rows={5}
                placeholder="Any specific requirements, preferences, or questions you'd like to share..."
                {...register('requirements')}
              />
            </div>

          </fieldset>

          {/* ─── Submit ──────────────────────────────── */}
          {status === 'error' && (
            <div className={styles.errorMsg} role="alert" aria-live="assertive">
              <p>
                Something went wrong. Please try again or email us directly at{' '}
                <a href="mailto:info@makeyourtripinc.com">info@makeyourtripinc.com</a>.
              </p>
            </div>
          )}

          <div className={styles.submitRow}>
            <button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={status === 'submitting'}
              id="form-submit-btn"
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Send My Inquiry'}
              {status !== 'submitting' && (
                <span className="btn-arrow" aria-hidden="true">→</span>
              )}
            </button>
            <p className={styles.disclaimer}>
              We respect your privacy. Your information is used solely to assist with your travel inquiry.
            </p>
          </div>

        </form>
      )}
    </div>
  )
}
