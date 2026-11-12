// Google Tag (gtm.js) & Google Analytics 4 (GA4) Utility

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NWLQ8FH4'
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    if (GA_MEASUREMENT_ID) {
      ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    } else {
      ;(window as any).gtag('event', 'page_view', {
        page_path: url,
      })
    }
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
