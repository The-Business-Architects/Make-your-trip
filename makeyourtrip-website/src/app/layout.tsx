import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import '@/styles/globals.css'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.makeyourtripinc.com'),
  title: {
    default: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
    template: '%s | MakeYourTrip Inc.',
  },
  description:
    'MakeYourTrip Inc. helps travelers worldwide plan international journeys with personalized assistance. Tell us where you\'re going — we\'ll help you get there.',
  keywords: [
    'international travel consultancy',
    'travel planning worldwide',
    'travel assistance worldwide',
    'personalized travel advisor',
    'flight planning help',
    'MakeYourTrip Inc.',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.makeyourtripinc.com',
    siteName: 'MakeYourTrip Inc.',
    title: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
    description:
      'Personalized international travel assistance for travelers worldwide.',
    images: [
      {
        url: '/images/hero/hero-main.jpg',
        width: 1400,
        height: 788,
        alt: 'MakeYourTrip Inc. — Premium International Travel Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
    description:
      'Personalized international travel assistance for travelers worldwide.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/logo/MYT-LOGO.jpeg' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/logo/MYT-LOGO.jpeg',
    apple: '/logo/MYT-LOGO.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'MakeYourTrip Inc.',
    alternateName: ['MakeYourTrip', 'Make Your Trip Inc.'],
    url: 'https://www.makeyourtripinc.com',
    logo: 'https://www.makeyourtripinc.com/logo/MYT-LOGO.jpeg',
    image: 'https://www.makeyourtripinc.com/images/hero/hero-main.jpg',
    description:
      'MakeYourTrip Inc. provides bespoke international travel planning, customized itineraries, flight arrangements, and visa guidance worldwide.',
    telephone: '+1-650-729-0130',
    email: 'info@makeyourtripinc.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2108 N ST #7740',
      addressLocality: 'Sacramento',
      addressRegion: 'CA',
      postalCode: '95816',
      addressCountry: 'US',
    },
    priceRange: '$$',
    areaServed: [
      'Worldwide',
      'United States',
      'Canada',
      'United Kingdom',
      'Europe',
      'Australia',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'International Travel Planning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Itinerary Planning & Route Architecture',
            description: 'Personalized day-by-day international travel route planning tailored to individual preferences.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Smart Flight Booking & Layover Optimization',
            description: 'Strategic international flight routing, multi-city connection assistance, and schedule protection.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Travel Visa Guidance & Paperwork Assistance',
            description: 'End-to-end tourist visa documentation, application reviews, and consular guidance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Destination Guidance & Local Travel Advice',
            description: 'Curated neighborhood navigation, transit pass instructions, cultural etiquette, and seasonal guidance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Group & Corporate Travel Route Management',
            description: 'Synchronized multi-traveler flight schedules, shared group transfers, and master route coordination.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '24/7 Human On-Trip Concierge Support',
            description: 'Round-the-clock live travel advisor helpline for flight disruptions, transit delays, and route changes.',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${dmSerif.variable} ${manrope.variable}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
