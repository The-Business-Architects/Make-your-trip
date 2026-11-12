# MakeYourTrip Inc. — SEO Fix & Implementation Action Plan

- **Target Site:** `https://www.makeyourtripinc.com`
- **Associated Codebase:** `makeyourtrip-website`
- **Generated:** 2026-11-12
- **Audit Basis:** [Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill)

---

## Quick Reference Implementation Matrix

| Issue ID | Area | Severity | Effort | Target File | Impact |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **FIX-01** | Technical SEO | `Critical` | Low (15 min) | `src/components/layout/Header.tsx`, `Footer.tsx` | Eliminates 100% of internal 308 redirects |
| **FIX-02** | Social / Meta | `Critical` | Low (10 min) | `src/app/page.tsx` | Fixes missing OpenGraph / Twitter cards |
| **FIX-03** | Entity & Disambiguation | `Critical` | Low (20 min) | `src/app/layout.tsx` | Protects brand entity from MakeMyTrip confusion |
| **FIX-04** | Performance & Media | `Critical` | Medium (1 hr) | `public/images/` | Reduces LCP weight by >70% |
| **FIX-05** | Technical Security | `Warning` | Low (15 min) | `public/.htaccess` | Elevates security score from 40 to 100 |
| **FIX-06** | Information Architecture | `Warning` | Medium (45 min) | `src/app/destinations/[slug]/page.tsx` | Resolves 28 orphan destination pages |
| **FIX-07** | AI Search (GEO) | `Warning` | Low (15 min) | `public/llms.txt` | Enables citations in Perplexity, Claude, ChatGPT |
| **FIX-08** | On-Page Metadata | `Warning` | Low (15 min) | Missing canonical routes & titles | Prevents duplicate indexation risks |

---

## Step-by-Step Code Fixes

### FIX-01: Fix Trailing Slashes on All Internal Links (Zero 308 Redirects)

**Problem:** `next.config.mjs` enforces `trailingSlash: true`, but navigation links use `/services`, `/about`, `/contact`, causing 308 redirect loops.

**Target File:** `src/components/layout/Header.tsx`
```tsx
// Replace:
href="/services"       -> href="/services/"
href="/destinations"   -> href="/destinations/"
href="/about"          -> href="/about/"
href="/contact"        -> href="/contact/"
href="/plan-your-trip" -> href="/plan-your-trip/"
```

**Target File:** `src/components/layout/Footer.tsx`
```tsx
// Replace:
href="/services"       -> href="/services/"
href="/destinations"   -> href="/destinations/"
href="/about"          -> href="/about/"
href="/contact"        -> href="/contact/"
href="/plan-your-trip" -> href="/plan-your-trip/"
href="/privacy-policy" -> href="/privacy-policy/"
href="/terms"          -> href="/terms/"
```

---

### FIX-02: Restore OpenGraph & Twitter Images on Homepage

**Problem:** Homepage `page.tsx` exports `openGraph` without `images`, overriding `layout.tsx` and resulting in zero preview image on social platforms.

**Target File:** `src/app/page.tsx`
```tsx
export const metadata: Metadata = {
  title: 'MakeYourTrip Inc. | Managed International Travel Agency & Itinerary Planning',
  description:
    'MakeYourTrip Inc. helps travelers worldwide plan bespoke international journeys, book flight routes, and handle visas. Tell us where you are going — we manage the rest.',
  alternates: {
    canonical: 'https://www.makeyourtripinc.com/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MakeYourTrip Inc.',
    title: 'MakeYourTrip Inc. | Premium International Travel Consultancy',
    description:
      'Personalized international travel assistance for travelers worldwide. We manage flights, visas, ground transit, and daily routes.',
    url: 'https://www.makeyourtripinc.com/',
    images: [
      {
        url: 'https://www.makeyourtripinc.com/images/hero/hero-main.jpg',
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
    images: ['https://www.makeyourtripinc.com/images/hero/hero-main.jpg'],
  },
  // ... keywords
}
```

---

### FIX-03: Entity Disambiguation Schema (`sameAs` & Multi-Type)

**Problem:** Brand needs explicit Knowledge Graph disambiguation against MakeMyTrip (MMYT).

**Target File:** `src/app/layout.tsx`
```tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'TravelAgency'],
  name: 'MakeYourTrip Inc.',
  legalName: 'MakeYourTrip Inc.',
  alternateName: ['MakeYourTrip', 'Make Your Trip Inc.'],
  url: 'https://www.makeyourtripinc.com',
  logo: 'https://www.makeyourtripinc.com/logo/MYT-LOGO.jpeg',
  image: 'https://www.makeyourtripinc.com/images/hero/hero-main.jpg',
  description:
    'MakeYourTrip Inc. is an independent bespoke international travel agency providing custom itineraries, flight route planning, and consular visa guidance worldwide.',
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
  sameAs: [
    'https://www.linkedin.com/company/makeyourtripinc',
    'https://www.crunchbase.com/organization/makeyourtrip-inc',
    'https://twitter.com/makeyourtripinc',
    'https://www.instagram.com/makeyourtripinc',
    'https://www.trustpilot.com/review/makeyourtripinc.com'
  ],
  priceRange: '$$',
  areaServed: ['Worldwide', 'United States', 'Canada', 'United Kingdom', 'Europe', 'Australia'],
  // ... rest of schema
}
```

---

### FIX-04: Compress Heavy Media Assets to WebP

**Problem:** `hero-main.jpg` is 807 KB; destination images range between 1.0 MB - 1.89 MB.

**Actions:**
1. Batch convert high-resolution `.jpg` images to modern `.webp` with 80% quality (reducing file size by 75-85% with zero perceptible visual degradation).
2. For Next.js static export:
   ```bash
   # Using ffmpeg, imagemagick, or squoosh-cli:
   cwebp -q 80 public/images/hero/hero-main.jpg -o public/images/hero/hero-main.webp
   ```
3. Update image references in `src/components/sections/Hero.tsx` and `src/data/destinations.ts` to reference the optimized `.webp` assets.

---

### FIX-05: Configure Security Headers (.htaccess for Hostinger)

**Problem:** Server does not transmit modern security headers, scoring 40/100.

**Target File:** `makeyourtrip-website/public/.htaccess`
```apache
<IfModule mod_headers.c>
  # Enforce HTTPS HSTS for 1 year
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  # Prevent clickjacking
  Header always set X-Frame-Options "SAMEORIGIN"
  # Prevent MIME sniffing
  Header always set X-Content-Type-Options "nosniff"
  # Modern referrer policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  # Restrict sensitive browser features
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
```

---

### FIX-06: Add Related Destination Links (Cure 28 Orphan Pages)

**Problem:** 28 destination guides are near-orphans with only 1 incoming link.

**Target File:** `src/app/destinations/[slug]/page.tsx`
Add a dynamic `RelatedDestinations` section near the bottom of each destination page linking to 3-4 other destinations within the same continent/region:
```tsx
// In SingleDestinationPage component:
const relatedDestinations = destinationsData
  .filter((d) => d.region === dest.region && d.slug !== dest.slug)
  .slice(0, 3)

// Render:
<section className={styles.relatedSection} aria-label="Related Destinations">
  <div className="container">
    <h3>Explore More Journeys in {dest.region}</h3>
    <div className={styles.relatedGrid}>
      {relatedDestinations.map((related) => (
        <Link key={related.slug} href={`/destinations/${related.slug}/`}>
          <h4>{related.name}, {related.country}</h4>
          <p>{related.heroSubtitle}</p>
        </Link>
      ))}
    </div>
  </div>
</section>
```

---

### FIX-07: Add `public/llms.txt` for Generative AI Search (GEO / AEO)

**Problem:** AI search crawlers have no dedicated structured documentation of site offerings.

**Target File:** `makeyourtrip-website/public/llms.txt`
```markdown
# MakeYourTrip Inc.

> Independent boutique international travel agency & itinerary route architects.

- Official Website: https://www.makeyourtripinc.com/
- Legal Entity: MakeYourTrip Inc. (Sacramento, CA, USA)
- Primary Helpline: +1 (650) 729-0130 | WhatsApp: +91 9528 203 267
- Email: info@makeyourtripinc.com

## Note on Disambiguation
MakeYourTrip Inc. is a private personalized travel advisory consultancy and is not affiliated with the public OTA booking engine MakeMyTrip. We do not provide automated booking widgets; our specialists design end-to-end bespoke journeys, multi-city flight connections, and consular visa guidance.

## Core Services
- Custom Trip Planning: https://www.makeyourtripinc.com/services/custom-trip-planning/
- Smart Flight Booking: https://www.makeyourtripinc.com/services/smart-flight-booking/
- Visa & Paperwork Help: https://www.makeyourtripinc.com/services/visa-paperwork-help/
- Local Travel Advice: https://www.makeyourtripinc.com/services/local-travel-advice/
- Group & Corporate Travel: https://www.makeyourtripinc.com/services/group-and-work-travel/
- 24/7 Travel Helpline: https://www.makeyourtripinc.com/services/24-7-travel-support/

## Top Destination Guides
- Tokyo: https://www.makeyourtripinc.com/destinations/tokyo/
- Kyoto: https://www.makeyourtripinc.com/destinations/kyoto/
- Paris: https://www.makeyourtripinc.com/destinations/paris/
- Rome: https://www.makeyourtripinc.com/destinations/rome/
- Swiss Alps: https://www.makeyourtripinc.com/destinations/interlaken/
```

---

### FIX-08: Add Missing Canonicals & Deploy `robots.txt`

1. **Add Canonicals to Missing Pages:**
   - `/destinations/page.tsx`:
     ```tsx
     alternates: { canonical: 'https://www.makeyourtripinc.com/destinations/' }
     ```
   - `/plan-your-trip/page.tsx`:
     ```tsx
     alternates: { canonical: 'https://www.makeyourtripinc.com/plan-your-trip/' }
     ```
   - `/privacy-policy/page.tsx`:
     ```tsx
     alternates: { canonical: 'https://www.makeyourtripinc.com/privacy-policy/' }
     ```
   - `/terms/page.tsx`:
     ```tsx
     alternates: { canonical: 'https://www.makeyourtripinc.com/terms/' }
     ```

2. **Deploy Updated `public/robots.txt`:**
   Ensure production receives the disallow rules:
   ```txt
   User-agent: *
   Allow: /
   Disallow: /admin/
   Disallow: /api/

   Sitemap: https://www.makeyourtripinc.com/sitemap.xml
   ```
