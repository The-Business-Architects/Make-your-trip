'use client'

import { useEffect, useRef, RefObject } from 'react'

/**
 * useReveal — triggers CSS-based fade-up animation when element enters viewport.
 * Adds 'revealed' class to the referenced element on intersection.
 */
export function useReveal<T extends HTMLElement>(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px'
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

/**
 * useStaggerReveal — applies staggered reveal to children of a container.
 * Adds 'revealed' class to children sequentially on intersection.
 */
export function useStaggerReveal<T extends HTMLElement>(
  threshold = 0.1,
  delay = 100
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('revealed')
            }, i * delay)
          })
          observer.unobserve(container)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [threshold, delay])

  return ref
}
