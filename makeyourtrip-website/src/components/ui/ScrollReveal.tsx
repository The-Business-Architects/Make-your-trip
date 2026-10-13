'use client'

import React, { useEffect, useRef, useState, ElementType } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number // in ms
  as?: ElementType
  style?: React.CSSProperties
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
  style: customStyle,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If intersection observer not supported, immediately show
    if (!('IntersectionObserver' in window)) {
      requestAnimationFrame(() => setIsVisible(true))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...customStyle,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  )
}
