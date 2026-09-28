'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './ReviewForm.module.css'

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  origin: z.string().min(2, 'Please enter your city and country'),
  destination: z.string().min(2, 'Please enter where you traveled'),
  quote: z.string().min(10, 'Please write a brief review'),
  _honey: z.string().max(0).optional(),
})

type FormData = z.infer<typeof schema>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ReviewForm() {
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
    if (data._honey) return
    setStatus('submitting')
    
    // Mock API call to submit the review
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    reset()
  }

  return (
    <div className={styles.wrapper}>
      {status === 'success' ? (
        <div className={styles.successMsg} role="alert" aria-live="polite">
          <div className={styles.successIcon} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className={styles.title}>Thank you!</h3>
          <p className={styles.subtitle}>
            We appreciate you taking the time to share your experience. Your review is pending approval.
          </p>
        </div>
      ) : (
        <>
          <h3 className={styles.title}>Share Your Experience</h3>
          <p className={styles.subtitle}>Let us know how your journey went.</p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input type="text" {...register('_honey')} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
            
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>Name</label>
              <input id="fullName" type="text" className={styles.input} {...register('fullName')} placeholder="Jane D." />
              {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="origin" className={styles.label}>Where are you from?</label>
              <input id="origin" type="text" className={styles.input} {...register('origin')} placeholder="New York, USA" />
              {errors.origin && <span className={styles.error}>{errors.origin.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="destination" className={styles.label}>Where did you travel?</label>
              <input id="destination" type="text" className={styles.input} {...register('destination')} placeholder="Traveled to Paris" />
              {errors.destination && <span className={styles.error}>{errors.destination.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="quote" className={styles.label}>Your Review</label>
              <textarea id="quote" className={styles.textarea} {...register('quote')} placeholder="How was your experience?" />
              {errors.quote && <span className={styles.error}>{errors.quote.message}</span>}
            </div>

            <button
              type="submit"
              className={`btn btn--primary ${styles.submitBtn}`}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
