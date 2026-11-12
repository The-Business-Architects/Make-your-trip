// Google Analytics 4 (GA4) & Google Tag Utility

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-T1ZTPF270H'
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NWLQ8FH4'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (
  action: string,
  params: Record<string, string | number | boolean | undefined> = {}
) => {
  if (typeof window !== 'undefined') {
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', action, params)
    } else if (Array.isArray((window as any).dataLayer)) {
      ;(window as any).dataLayer.push({
        event: action,
        ...params,
      })
    }
  }
}
