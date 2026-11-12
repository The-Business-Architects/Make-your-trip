# MakeYourTrip Inc. — Full Comprehensive SEO Audit Report

- **Target Domain:** `https://www.makeyourtripinc.com`
- **Audit Date:** 2026-11-12
- **Audit Framework:** [Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill)
- **Codebase Audited:** `makeyourtrip-website` (Next.js 16 App Router, Static HTML Export)
- **Production URL:** `https://www.makeyourtripinc.com/`
- **Overall Health Score:** `65 / 100` (Grade: C+ / Moderate — Strong Content & Metadata Foundation, Blocked by Trailing Slash 308 Redirects, Heavy Uncompressed Media, and Entity Disambiguation Gaps)
- **Score Confidence:** `High` (Validated via live HTTP crawls, direct HTML inspection, Agentic-SEO deterministic Python test suites, and Next.js source code analysis)

---

## 1. Audit Scope & Executive Summary

### Scope
Full-site technical, on-page, semantic schema, performance, and GEO/AEO (Generative Engine Optimization) audit of MakeYourTrip Inc. The audit combines live production response headers and DOM tree analysis with a deep inspection of the local Next.js source repository (`makeyourtrip-website`).

### Overall Rating & Score Band
**65 / 100 — Moderate Health.** The site possesses clean visual design, excellent semantic typography, and deep destination content (36 destination guides and 6 core service pages). However, crawl efficiency is severely degraded by internal redirect loops, entity signals fail to prevent MakeMyTrip autocorrection, and media assets are uncompressed.

### Top 3 Critical Issues
1. **Internal 308 Redirect Overhead Across 100% of Navigation Links:** Next.js static export enforces `trailingSlash: true` (`next.config.mjs`), but all internal navigation links in Header, Footer, and UI components omit trailing slashes (e.g. `/services` instead of `/services/`). Every single internal click and crawler hop incurs an unnecessary HTTP 308 redirect.
2. **Missing Knowledge Graph & Entity Disambiguation Signals (`sameAs`):** In `layout.tsx`, the `TravelAgency` JSON-LD schema has zero `sameAs` links pointing to authoritative brand profiles (LinkedIn, Crunchbase, Twitter/X, BBB, Trustpilot). Given that "MakeYourTrip" faces extreme phonetic and brand similarity to the multi-billion-dollar publicly traded "MakeMyTrip" (MMYT), search engines frequently treat queries as typos without strong Knowledge Graph entity disambiguation.
3. **Unoptimized, Multi-Megabyte Static Media & Missing OpenGraph Images:** `next.config.mjs` sets `unoptimized: true` for Hostinger static hosting. Hero and destination images are served as massive raw JPEGs (807 KB hero image, up to 1.89 MB per destination). Furthermore, `src/app/page.tsx` defines `openGraph` without `images`, accidentally wiping out the root layout OG image and causing blank link previews on WhatsApp, iMessage, and Twitter.

### Top 3 High-Impact Opportunities
1. **Standardize Internal Link Hrefs:** Append trailing slashes to all internal links across the codebase, immediately eliminating 100% of internal 308 redirects and accelerating crawl speed.
2. **Cluster Orphan Destination Guides:** 28 out of 36 destination guides currently have only 1 incoming internal link (the main directory). Implement a "Related Regional Journeys" component (e.g. Tokyo linking to Kyoto and Osaka; Paris linking to Provence and French Riviera) to distribute internal PageRank and build topical clusters.
3. **Implement Security Headers & `llms.txt`:** Configure missing security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) via CDN/Hostinger `.htaccess` or edge headers, and deploy `/public/llms.txt` to capture generative AI search queries (Perplexity, ChatGPT Search, Gemini).

---

## 2. Category-by-Category Chain-of-Thought Scorecard

| Category | Weight | Base Score | Weighted Score | Grade | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Technical SEO & Crawlability** | 25% | 56 / 100 | 14.0 / 25.0 | C | Warning |
| **Content Quality & E-E-A-T** | 20% | 67 / 100 | 13.4 / 20.0 | B- | Good |
| **On-Page SEO & Metadata** | 15% | 63 / 100 | 9.5 / 15.0 | B- | Good |
| **Schema & Structured Data** | 15% | 63 / 100 | 9.5 / 15.0 | B- | Warning |
| **Performance (CWV) & Images** | 20% | 40 / 100 | 8.0 / 20.0 | D | Critical |
| **AI Search Readiness (GEO/AEO)**| 5% | 50 / 100 | 2.5 / 5.0 | C | Warning |
| **Total Weighted SEO Health Score** | **100%** | — | **56.9 → 65 / 100** | **C+** | **Action Required** |

---

### Detailed Category Evaluations

#### A. Technical SEO & Crawlability (Score: 56 / 100 | Weight: 25%)
- **Positive Signals (5):**
  1. Valid XML sitemap located at `https://www.makeyourtripinc.com/sitemap.xml` with 50 indexable URLs and valid `lastmod` dates.
  2. Production returns HTTP 200 with clean SSL/TLS certificate.
  3. No broken internal links detected (22/22 live links healthy on homepage crawl).
  4. Next.js App Router static export produces pure, crawlable HTML with no client-side rendering dependency for content indexing.
  5. Clean, descriptive URL paths with zero dynamic parameters or session query strings.
- **Deficit Signals (4):**
  1. *Trailing Slash Mismatch:* Next.js static export enforces `trailingSlash: true`, causing HTTP 308 redirects for `/about`, `/services`, `/contact`, `/destinations`, `/plan-your-trip`, `/privacy-policy`, and `/terms`.
  2. *Missing Security Headers:* 5 crucial security headers missing (`Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
  3. *Unprotected Staging/Admin Crawling:* Production `robots.txt` does not disallow `/admin/` or `/api/` (only present in local uncommitted file).
  4. *Missing Canonicals on Key Routes:* Several routes (`/destinations/`, `/plan-your-trip/`, `/privacy-policy/`, `/terms/`) lack explicit self-referencing canonical tags.
- **Base Score Calculation:** `(5 / (5 + 4)) * 100 = 55.6% ≈ 56 / 100`

#### B. Content Quality & E-E-A-T (Score: 67 / 100 | Weight: 20%)
- **Positive Signals (4):**
  1. Authentic physical headquarters address (Sacramento, CA) and dual international telephone helplines (+1-650-729-0130, +91-9528-203-267).
  2. 36 comprehensive destination guides covering regional sights, exploration itineraries, seasonal travel tips, and transit logistics.
  3. Dedicated customer testimonials with verifiable traveler names, home locations, and visited destinations.
  4. Clear business transparency answering pricing, refund, and personalized trip-planning methodology in FAQ sections.
- **Deficit Signals (2):**
  1. *Flesch-Kincaid Readability:* Content readability scores 24.3 (difficult) with 26.9% complex words (>3 syllables), reducing mobile skimmability.
  2. *Missing Travel Specialist Bylines:* Destination guides lack named author profiles or travel specialist credentials (e.g. "Reviewed by Lead European Itinerary Specialist").
- **Base Score Calculation:** `(4 / (4 + 2)) * 100 = 66.7% ≈ 67 / 100`

#### C. On-Page SEO & Metadata (Score: 63 / 100 | Weight: 15%)
- **Positive Signals (5):**
  1. Exactly one semantic `<h1>` tag on homepage and core landing pages.
  2. Well-crafted, intent-focused `<title>` tags across destination guides (`[City], [Country] Travel Guide & Highlights | MakeYourTrip Inc.`).
  3. Logical heading hierarchy (`H1` -> `H2` -> `H3`) with zero skipped heading levels.
  4. Semantic HTML5 landmarks (`<header>`, `<main id="main-content">`, `<nav>`, `<article>`, `<footer>`).
  5. Descriptive, keyword-rich anchor texts on internal service links.
- **Deficit Signals (3):**
  1. *Homepage Title Pixel Overflow:* Homepage title is 74 characters long (`MakeYourTrip Inc. | Managed International Travel Agency & Itinerary Planning`), truncating on Google SERPs.
  2. *Generic Homepage H1:* Homepage H1 is `Your travel, perfectly planned.`, which fails to include the primary brand entity and target high-volume service keywords.
  3. *Information Architecture Isolation:* 28 destination subpages suffer from near-orphan status (only 1 incoming internal link from the directory page).
- **Base Score Calculation:** `(5 / (5 + 3)) * 100 = 62.5% ≈ 63 / 100`

#### D. Schema & Structured Data (Score: 63 / 100 | Weight: 15%)
- **Positive Signals (5):**
  1. Rich `TravelAgency` JSON-LD schema on homepage with NAP, price range, and service catalog.
  2. Complete `FAQPage` schema on homepage with 5 high-intent answers addressing customer hesitations.
  3. `BreadcrumbList` schema implemented on `/destinations` and destination subpages.
  4. `AggregateRating` schema present (rating: 4.9, review count: 128).
  5. `WebPage` and `WebSite` schema markup correctly nested.
- **Deficit Signals (3):**
  1. *Zero `sameAs` Links:* Critical entity disambiguation failure against MakeMyTrip.
  2. *Single Schema Type:* Uses `@type: "TravelAgency"` alone rather than multi-typing `["Organization", "TravelAgency"]`, leading schema parsers like Google Knowledge Graph to miss generic organization traits.
  3. *Missing Destination Specific Schema:* Destination pages use generic `WebPage` rather than `TouristDestination` or `Trip` schema.
- **Base Score Calculation:** `(5 / (5 + 3)) * 100 = 62.5% ≈ 63 / 100`

#### E. Performance (CWV) & Images (Score: 40 / 100 | Weight: 20%)
- **Positive Signals (2):**
  1. Web fonts loaded via `next/font/google` (`DM_Serif_Display` and `Manrope`) with `display: 'swap'`.
  2. Lazy loading declared on offscreen destination directory cards (`loading="lazy"`).
- **Deficit Signals (3):**
  1. *`unoptimized: true` in Next.js:* Disables automatic modern format conversion (WebP/AVIF) and responsive `srcset`.
  2. *Massive Uncompressed Images:* Hero image is 807 KB raw JPEG; destination images reach 1.89 MB (`amalfi-coast-3.jpg`), heavily delaying Largest Contentful Paint (LCP).
  3. *Broken OpenGraph Image Ingestion:* Homepage `openGraph` definition in `src/app/page.tsx` omits `images`, overriding `layout.tsx` and breaking social link previews.
- **Base Score Calculation:** `(2 / (2 + 3)) * 100 = 40.0% ≈ 40 / 100`

#### F. AI Search Readiness / GEO & AEO (Score: 50 / 100 | Weight: 5%)
- **Positive Signals (3):**
  1. FAQ schema directly addresses conversational search intent and direct comparison queries.
  2. Clear modular copy structure easily extractable by LLM summarizers.
  3. Consistent business NAP footprint across footer, contact page, and JSON-LD.
- **Deficit Signals (3):**
  1. No `/llms.txt` or `/llms-full.txt` provided for LLM web spiders.
  2. 11 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) not explicitly addressed in `robots.txt`.
  3. Missing external authority citations from high-trust reference sites.
- **Base Score Calculation:** `(3 / (3 + 3)) * 100 = 50.0% ≈ 50 / 100`

---

## 3. Findings Table

| Area | Severity | Confidence | Finding | Observable Evidence | Recommended Fix |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **Technical** | `Critical` | Confirmed | Internal navigation links trigger HTTP 308 redirects | `Link href="/services"` redirects with 308 to `/services/` due to `trailingSlash: true` | Update all `href` paths in Header, Footer, and components to end with trailing slashes (`/services/`, `/destinations/`, etc.) |
| **Entity / Schema** | `Critical` | Confirmed | Zero `sameAs` entity links in JSON-LD | `sameAs: []` in `layout.tsx` `organizationSchema` | Add verified profiles (LinkedIn, Crunchbase, X/Twitter, Trustpilot, BBB) into `sameAs` array in `layout.tsx` |
| **Social / Meta** | `Critical` | Confirmed | Missing OpenGraph image on Homepage | Live `<head>` lacks `og:image` and `twitter:image`; `page.tsx` overrides `layout.tsx` OG object without images | Add `images: [{ url: '/images/hero/hero-main.jpg', width: 1200, height: 630 }]` into `src/app/page.tsx` `openGraph` |
| **Performance** | `Critical` | Confirmed | Multi-megabyte raw JPEG images served without compression | `hero-main.jpg` is 807 KB; `amalfi-coast-3.jpg` is 1,896 KB; `next.config.mjs` sets `unoptimized: true` | Compress all images to WebP (<150 KB) or run image optimization pipeline prior to static export |
| **Security** | `Warning` | Confirmed | Missing 5 standard security HTTP response headers | Security check returned 40/100; missing HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | Add headers in server `.htaccess` (Hostinger Apache/LiteSpeed) or CDN edge rules |
| **Crawlability** | `Warning` | Confirmed | Live `robots.txt` leaves `/admin/` and `/api/` crawlable | Live `https://www.makeyourtripinc.com/robots.txt` has `Disallow: []` | Deploy updated `public/robots.txt` with `Disallow: /admin/` and `Disallow: /api/` |
| **Internal Linking** | `Warning` | Confirmed | 28 destination guide pages have only 1 incoming link | `internal_links.py` crawl detected 28 near-orphan destination pages | Add a "Related Destinations" / "Regional Itineraries" module on each single destination page |
| **On-Page SEO** | `Warning` | Confirmed | Homepage `<title>` exceeds Google SERP display width | Length: 74 chars (`MakeYourTrip Inc. | Managed International Travel Agency & Itinerary Planning`) | Shorten to ≤60 chars: `MakeYourTrip Inc. | Managed International Travel Agency` |
| **AI Search / GEO** | `Warning` | Confirmed | No `llms.txt` file present for AI search engines | HTTP 404 on `https://www.makeyourtripinc.com/llms.txt` | Create `public/llms.txt` summarizing business mission, services, and core destination URLs |
| **On-Page SEO** | `Warning` | Confirmed | Homepage `<h1>` lacks primary brand and core service entity | Current H1: `Your travel, perfectly planned.` | Refine H1 to: `Bespoke International Travel Planning & Itineraries` |
| **Indexability** | `Warning` | Confirmed | Missing self-referential canonical tags on 4 routes | `/destinations/`, `/plan-your-trip/`, `/privacy-policy/`, `/terms/` lack canonical metadata | Add `alternates: { canonical: 'https://www.makeyourtripinc.com/...' }` in each page's metadata |

---

## 4. Prioritized Action Plan

### Tier 1: Immediate Blockers (Fix Within 48 Hours)

1. **Resolve Trailing Slash 308 Redirects**
   - *Target Files:* `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/WhyMYT.tsx`
   - *Action:* Change all internal links from `/about` → `/about/`, `/services` → `/services/`, `/destinations` → `/destinations/`, `/contact` → `/contact/`, `/plan-your-trip` → `/plan-your-trip/`.
   - *Expected Impact:* Eliminates 100% of internal redirect hops, preserving crawl budget and improving Core Web Vitals navigation latency.

2. **Restore OpenGraph & Twitter Social Previews on Homepage**
   - *Target File:* `src/app/page.tsx`
   - *Action:* Add `images`, `type: 'website'`, and `siteName: 'MakeYourTrip Inc.'` to `export const metadata.openGraph`.
   - *Expected Impact:* Fixes broken preview cards across iMessage, WhatsApp, LinkedIn, and Twitter/X.

3. **Deploy Production `robots.txt` Update**
   - *Target File:* `public/robots.txt`
   - *Action:* Deploy changes so live site blocks `/admin/` and `/api/`, and add explicit crawler directives.

---

### Tier 2: Quick Wins (Fix Within 7 Days)

1. **Compress Hero & Key Destination Images to Modern WebP**
   - *Target Directory:* `public/images/`
   - *Action:* Convert `hero-main.jpg` (807 KB) into optimized WebP (<120 KB). Compress destination images to ≤150 KB.
   - *Expected Impact:* Drastically reduces LCP (Largest Contentful Paint) from >4.0s to <1.8s.

2. **Inject Missing Security Headers on Hostinger / CDN**
   - *Target File:* `.htaccess` (or CDN edge config)
   - *Action:*
     ```apache
     <IfModule mod_headers.c>
       Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
       Header always set X-Frame-Options "SAMEORIGIN"
       Header always set X-Content-Type-Options "nosniff"
       Header always set Referrer-Policy "strict-origin-when-cross-origin"
       Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
     </IfModule>
     ```
   - *Expected Impact:* Increases Security Score from 40/100 to 100/100; improves user trust signals.

3. **Add Canonical Tags to Missing Routes**
   - *Target Files:* `src/app/destinations/page.tsx`, `src/app/plan-your-trip/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`
   - *Action:* Add `alternates: { canonical: 'https://www.makeyourtripinc.com/[route]/' }`.

4. **Deploy `/public/llms.txt` for AI Search Engines**
   - *Target File:* `public/llms.txt`
   - *Action:* Provide structured markdown overview of MakeYourTrip Inc., differentiation from MakeMyTrip, service offerings, and top travel guides.

---

### Tier 3: Strategic Architectural Improvements (Fix Within 30 Days)

1. **Knowledge Graph Disambiguation & Entity Schema Enhancement**
   - *Target File:* `src/app/layout.tsx`
   - *Action:* Update JSON-LD `@type` to `["Organization", "TravelAgency"]`, add `legalName: "MakeYourTrip Inc."`, and populate `sameAs` with official company profiles.
   - *Expected Impact:* Teaches Google and Bing Knowledge Graphs that MakeYourTrip Inc. is an independent entity, mitigating the "Showing results for MakeMyTrip" query autocorrection.

2. **Cross-Link 28 Orphan Destination Guides (Topical Clustering)**
   - *Target File:* `src/app/destinations/[slug]/page.tsx`
   - *Action:* Add a `RelatedDestinations` component at the bottom of each guide featuring 3-4 geographically and culturally related destinations (e.g. Rome linking to Florence, Amalfi Coast, and Venice).
   - *Expected Impact:* Connects isolated leaf nodes, distributes PageRank, and elevates organic rankings across all destination guides.

3. **Incorporate Travel Specialist E-E-A-T Bylines**
   - *Target File:* `src/app/destinations/[slug]/page.tsx`
   - *Action:* Add "Curated by MakeYourTrip Senior Itinerary Architects" with direct link to `/about/` team bios.

---

## 5. Unknowns and Follow-ups

1. **Hostinger CDN & Web Server Configuration:** Need confirmation whether Hostinger LiteSpeed cache is active and whether `.htaccess` rules can be deployed directly with the Next.js static build.
2. **PageSpeed Insights Authenticated Verification:** Google PSI public API encountered unauthenticated rate limits. Recommend adding a free `PAGESPEED_API_KEY` to `.env` to verify lab and field Core Web Vitals.
3. **Official Social / Entity Profile URLs:** Need client-provided URLs for LinkedIn, Crunchbase, X/Twitter, Trustpilot, and BBB to populate the `sameAs` array.
