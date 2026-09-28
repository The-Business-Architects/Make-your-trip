import type { Metadata } from 'next'
import '@/styles/globals.css'

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
    icon: '/logo/MYT-LOGO.jpeg',
    apple: '/logo/MYT-LOGO.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  )
}
