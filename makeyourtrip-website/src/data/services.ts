export interface ServiceDeliverable {
  title: string
  description: string
}

export interface ServiceWorkflowStep {
  number: string
  title: string
  description: string
}

export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceFeaturedDestination {
  slug: string
  name: string
  country: string
  image: string
}

export interface ServiceDetail {
  slug: string
  title: string
  shortTitle: string
  heroTitle: string
  heroSubtitle: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  targetKeywords: string[]
  eyebrow: string
  painPointHeading: string
  painPointParagraphs: string[]
  deliverables: ServiceDeliverable[]
  workflowSteps: ServiceWorkflowStep[]
  faqs: ServiceFAQ[]
  featuredDestinations: ServiceFeaturedDestination[]
  badgeText: string
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'custom-trip-planning',
    title: 'Custom Trip Planning',
    shortTitle: 'Trip Planning',
    heroTitle: 'Custom Trip Planning — Your Journey, Perfectly Designed',
    heroSubtitle:
      'Skip the 40 open browser tabs and vacation planning burnout. Work with a dedicated travel specialist who architects a personalized, day-by-day international itinerary tailored to your pace, budget, and travel style.',
    metaTitle: 'Custom Trip Planning & Bespoke Travel Itinerary Design | MakeYourTrip Inc.',
    metaDescription:
      'Pay someone to plan your vacation without stress. MakeYourTrip Inc. crafts tailored international itineraries, route logistics, flights, and visa guidance.',
    primaryKeyword: 'custom trip planning',
    targetKeywords: [
      'custom trip planning',
      'pay someone to plan my vacation',
      'hire travel agent to plan trip',
      'personalized travel itinerary service',
      'bespoke travel planner',
      'custom vacation planner for hire',
      'can i hire someone to plan my itinerary',
      'done for you travel planning',
    ],
    eyebrow: 'Bespoke Route Architecture',
    badgeText: '100% Tailored Routes',
    painPointHeading: 'Why Planning an International Vacation Yourself Leads to Burnout',
    painPointParagraphs: [
      'The average international traveler spends over 30 hours cross-referencing conflicting blogs, outdated transit schedules, and convoluted train timetables across dozens of open tabs. What starts as vacation excitement quickly devolves into decision fatigue and second-guessing.',
      'One overlooked rail connection, an overcrowded tourist trap, or an unrealistic daily schedule can compromise days of hard-earned vacation time. When you hire MakeYourTrip Inc. to plan your journey, you delegate that cognitive burden to an experienced specialist who knows how travel flows on the ground.',
      'We do not sell pre-packaged group tours. Every route is designed from a blank canvas around your rhythm—whether you prefer morning architectural explorations with unstructured afternoons, cultural immersion, or leisurely scenic rail journeys.',
    ],
    deliverables: [
      {
        title: 'Bespoke Day-by-Day Route Architecture',
        description:
          'Logically sequenced daily schedules balancing iconic landmarks, scenic walking corridors, and mindful rest intervals.',
      },
      {
        title: 'Daily Schedule & Activity Pacing',
        description:
          'Carefully paced daily itineraries that prevent vacation fatigue, factoring in realistic transfer times between sites.',
      },
      {
        title: 'Multi-Modal Transit & Rail Route Planning',
        description:
          'Strategic train connections, regional rail passes, public transit navigation notes, and airport transfer plans.',
      },
      {
        title: 'Seasonal Flow & Timing Optimization',
        description:
          'Strategic timing recommendations to bypass peak crowds at major sights and experience destinations during optimal daylight hours.',
      },
      {
        title: 'Neighborhood Orientation & Walking Routes',
        description:
          'Curated neighborhood walking corridors, historic districts, and scenic viewpoints free of commercial tourist traps.',
      },
      {
        title: 'Interactive Digital & Offline Itinerary Dossier',
        description:
          'A comprehensive travel dossier accessible on your smartphone offline, complete with route maps, transit instructions, and emergency contacts.',
      },
    ],
    workflowSteps: [
      {
        number: '01',
        title: 'Discovery & Travel Style Alignment',
        description:
          'We begin with a personalized inquiry to understand your ideal travel pace, cultural interests, preferred destinations, and timing.',
      },
      {
        number: '02',
        title: 'Route Concept & Itinerary Blueprint',
        description:
          'Your dedicated travel specialist architects a preliminary route outline including optimal flight pairings, city sequences, and transit plans.',
      },
      {
        number: '03',
        title: 'Refinement & Route Finalization',
        description:
          'Together we fine-tune daily activities, finalize transit schedules, assemble documentation, and prepare your comprehensive route map.',
      },
      {
        number: '04',
        title: 'Pre-Departure Briefing & 24/7 Handover',
        description:
          'You receive your complete travel dossier with day-by-day maps, train timings, flight confirmations, and direct 24/7 concierge contacts.',
      },
    ],
    faqs: [
      {
        question: 'Do you book hotels or accommodations as part of custom trip planning?',
        answer:
          'No. MakeYourTrip Inc. focuses exclusively on route architecture, itinerary planning, flight assistance, visa guidance, and 24/7 support. We do not sell or book hotel rooms, giving you complete freedom to book your preferred accommodations directly or use your own loyalty points.',
      },
      {
        question: 'How far in advance should we hire a travel planner for an international trip?',
        answer:
          'We recommend beginning 3 to 6 months in advance for peak seasonal journeys (such as cherry blossom season in Japan, summer in the Mediterranean, or European Christmas markets). However, we also routinely accommodate expedited journeys planned within 4 to 6 weeks.',
      },
      {
        question: 'Can you plan multi-city routes across several countries?',
        answer:
          'Yes. Multi-country and multi-city route planning is our core expertise. We sequence transit logically across borders to eliminate unnecessary backtracking and minimize travel fatigue.',
      },
      {
        question: 'What if we want to change parts of the itinerary while on the road?',
        answer:
          'Your itinerary is designed to be enjoyable, not rigid. Our 24/7 traveler support team is available throughout your journey. If you decide to spend an extra afternoon in a countryside village or adjust an activity, your travel manager coordinates schedule updates smoothly.',
      },
    ],
    featuredDestinations: [
      { slug: 'tokyo', name: 'Tokyo', country: 'Japan', image: '/images/destinations/tokyo.jpg' },
      { slug: 'amalfi-coast', name: 'Amalfi Coast', country: 'Italy', image: '/images/destinations/amalfi-coast.jpg' },
      { slug: 'interlaken', name: 'Swiss Alps', country: 'Switzerland', image: '/images/destinations/interlaken.jpg' },
      { slug: 'paris', name: 'Paris', country: 'France', image: '/images/destinations/paris.jpg' },
    ],
  },
  {
    slug: 'smart-flight-booking',
    title: 'Smart Flight Booking',
    shortTitle: 'Flight Booking',
    heroTitle: 'Smart Flight Booking & Multi-City Route Optimization',
    heroSubtitle:
      'International air travel should not be an exhausting gamble. We research strategic airline routings, optimized layovers, and schedule protections so you travel comfortably with zero booking anxiety.',
    metaTitle: 'Smart International Flight Booking Assistance & Route Planning | MakeYourTrip Inc.',
    metaDescription:
      'Get expert help booking international flights. MakeYourTrip Inc. coordinates multi-city routings, layover optimizations, and airline schedule protections.',
    primaryKeyword: 'international flight booking assistance',
    targetKeywords: [
      'international flight booking assistance',
      'help booking international flights',
      'multi city flight assistance',
      'flight booking agent',
      'international flight route planner',
      'travel agent flight booking assistance',
      'complex international flight itineraries',
      'flight booking travel agent',
    ],
    eyebrow: 'Air Logistics & Route Strategy',
    badgeText: 'Optimal Layover Guarantee',
    painPointHeading: 'The Frustration of Automated Flight Comparison Portals',
    painPointParagraphs: [
      'Commercial flight aggregators are engineered to display the lowest raw ticket price, frequently by stitching together perilous 45-minute international connections, inconvenient secondary airports, and restrictive third-party ticketing rules with zero customer support.',
      'A single missed connection due to unrealistic layovers can strand you overseas for 24 hours, incur hundreds in emergency costs, and derail the first days of your vacation.',
      'MakeYourTrip Inc. approaches air travel strategically. We evaluate terminal transit distances, passport control queue times at hub airports, airline interline baggage agreements, and modern aircraft seat configurations to ensure your flights are comfortable, reliable, and stress-free.',
    ],
    deliverables: [
      {
        title: 'Multi-City & Open-Jaw Route Engineering',
        description:
          'Fly into one city and out of another to eliminate redundant backtracking, saving entire days of vacation transit.',
      },
      {
        title: 'Buffer-Protected International Layovers',
        description:
          'Connections curated with realistic transfer windows for passport control, terminal changes, and luggage transit.',
      },
      {
        title: 'Airline Equipment & Cabin Class Curation',
        description:
          'Guidance on aircraft types, premium economy configurations, quiet rows, and optimal long-haul cabin comfort.',
      },
      {
        title: 'Schedule Disruption & Rebooking Assistance',
        description:
          'If an airline reschedules or delays your departure, our team steps in to identify alternative connections before lines form at the gate.',
      },
      {
        title: 'Luggage Rules & Ancillary Fee Auditing',
        description:
          'Clear itemized verification of checked baggage limits, seat selection policies, and transit terminal requirements.',
      },
      {
        title: 'Global Airline Partner Coordination',
        description:
          'Booking across leading global airline alliances ensuring seamless baggage transfers across international legs.',
      },
    ],
    workflowSteps: [
      {
        number: '01',
        title: 'Departure & Schedule Preference Analysis',
        description:
          'We review your travel dates, preferred home airports, cabin preference, and airline alliance loyalty programs.',
      },
      {
        number: '02',
        title: 'Multi-Leg Comparison & Route Proposal',
        description:
          'We generate 2 to 3 curated flight routing strategies comparing total travel duration, layover comfort, and value.',
      },
      {
        number: '03',
        title: 'Ticketing, Seat Selection & Preferences',
        description:
          'Once approved, flights are secured with confirmed seat assignments, frequent flyer number attribution, and special service requests.',
      },
      {
        number: '04',
        title: 'Flight Monitoring & Day-of-Travel Support',
        description:
          'We track your aircraft status in real time. In the event of airport weather or gate changes, your specialist is on standby.',
      },
    ],
    faqs: [
      {
        question: 'Why should I book international flights through a travel specialist instead of online portals?',
        answer:
          'Third-party automated portals provide zero assistance when an airline changes a schedule or cancels a flight—often leaving travelers on hold for hours. With MakeYourTrip Inc., you have a dedicated human specialist managing your ticket who advocates directly with airlines to protect your travel itinerary.',
      },
      {
        question: 'Can you help with open-jaw or multi-city international flights?',
        answer:
          'Yes. Multi-city routes (e.g., flying into Tokyo and departing from Osaka, or arriving in London and departing from Rome) are our specialty. This strategy eliminates hours of wasteful backtracking across foreign rail systems.',
      },
      {
        question: 'Can I earn frequent flyer miles and airline status points when you book?',
        answer:
          'Yes. All bookings are ticketed under your individual frequent flyer accounts, ensuring you accumulate all eligible tier miles, status credits, and alliance benefits.',
      },
      {
        question: 'What happens if my connection is canceled while I am at the airport?',
        answer:
          'Our 24/7 traveler support team is alerted to schedule disruptions immediately. We can identify alternative flights, coordinate re-routing, and update your transfer plans without you waiting in airport queues.',
      },
    ],
    featuredDestinations: [
      { slug: 'dubai', name: 'Dubai', country: 'UAE', image: '/images/destinations/dubai.jpg' },
      { slug: 'london', name: 'London', country: 'UK', image: '/images/destinations/london.jpg' },
      { slug: 'singapore', name: 'Singapore', country: 'Singapore', image: '/images/destinations/singapore.jpg' },
      { slug: 'rome', name: 'Rome', country: 'Italy', image: '/images/destinations/rome.jpg' },
    ],
  },
  {
    slug: 'visa-paperwork-help',
    title: 'Visa & Paperwork Help',
    shortTitle: 'Visa Assistance',
    heroTitle: 'Travel Visa Assistance & International Paperwork Guidance',
    heroSubtitle:
      'Navigate foreign consular requirements, entry visas, and border documentation without fear of rejection. We provide step-by-step guidance to ensure your travel papers are compliant and stress-free.',
    metaTitle: 'Travel Visa Assistance & International Documentation Help | MakeYourTrip Inc.',
    metaDescription:
      'Stress-free travel visa help for international travelers. MakeYourTrip Inc. provides step-by-step guidance for entry visas, passport validity, and border paperwork.',
    primaryKeyword: 'travel visa help',
    targetKeywords: [
      'travel visa help',
      'visa assistance for travel',
      'tourist visa agent',
      'travel agent that handles visas and flights',
      'international travel documentation assistance',
      'consular visa guidance travel agency',
      'passport validity requirements advice',
      'tourist visa paperwork help',
    ],
    eyebrow: 'Consular & Border Compliance',
    badgeText: 'Verified Entry Compliance',
    painPointHeading: 'Why Travel Visas and Entry Rules Cause the Most Anxiety',
    painPointParagraphs: [
      'International entry rules have grown increasingly complex. Many countries now require electronic travel authorizations (eTAs), strict biometric forms, specific passport validity buffers (often 6 months beyond departure), and proof of return transit.',
      'A minor typographical error on an online visa application or an oversight regarding transit visa rules during an international layover can result in denied boarding at check-in.',
      'MakeYourTrip Inc. removes the guesswork. We audit your passport eligibility, cross-reference your exact flight connections against embassy regulations, and walk you through every document needed for seamless border clearance.',
    ],
    deliverables: [
      {
        title: 'Country-by-Country Entry Eligibility Audit',
        description:
          'Clear verification of whether your citizenship requires an eVisa, consulate stamp, visa-on-arrival, or visa-free entry.',
      },
      {
        title: 'Step-by-Step Document Assembly Checklists',
        description:
          'Itemized checklists specifying required photo dimensions, financial proofs, itinerary formats, and travel declarations.',
      },
      {
        title: 'Pre-Submission Application Review',
        description:
          'Rigorous quality control review of your draft forms to catch clerical errors, misspellings, or missing details prior to submission.',
      },
      {
        title: 'Layover & Transit Visa Compliance Verification',
        description:
          'Audit of transfer airport regulations to confirm whether stepping outside international transit zones requires special transit papers.',
      },
      {
        title: 'Passport Validity & Blank Page Inspection',
        description:
          'Verification that your passport satisfies the destination 6-month validity rule and contains sufficient consecutive unstamped visa pages.',
      },
      {
        title: 'Customs & Health Declaration Orientation',
        description:
          'Guidance on arrival customs forms, duty-free restrictions, medication declarations, and electronic arrival cards.',
      },
    ],
    workflowSteps: [
      {
        number: '01',
        title: 'Citizenship & Travel Route Intake',
        description:
          'We review your passport nationality, destination countries, layover hubs, and overall duration of stay.',
      },
      {
        number: '02',
        title: 'Consular Requirements & Checklist Delivery',
        description:
          'We supply an exact, plain-English roadmap detailing all required documentation, embassy timelines, and official government portals.',
      },
      {
        number: '03',
        title: 'Application Audit & Review',
        description:
          'You submit draft paperwork to our travel specialists for a detailed line-by-line verification check before official filing.',
      },
      {
        number: '04',
        title: 'Approval Verification & Border Dossier Pack',
        description:
          'Once approved, we assemble your eVisas, travel documentation, itinerary details, and flight tickets into a single border clearance pack.',
      },
    ],
    faqs: [
      {
        question: 'Does MakeYourTrip Inc. guarantee that a foreign government will grant my visa?',
        answer:
          'No private agency can legally guarantee visa issuance, as approvals remain strictly at the discretion of foreign sovereign consulates. However, our rigorous application audit minimizes administrative errors, omitted documents, and formatting mistakes that cause unnecessary rejections.',
      },
      {
        question: 'Can you help with multi-country visas for European or Asian routes?',
        answer:
          'Yes. If your itinerary traverses multiple jurisdictions (such as the European Schengen Zone, the UK, or Southeast Asian nations with distinct entry laws), we map out the specific requirements for every border crossing.',
      },
      {
        question: 'What is the 6-month passport validity rule and why does it matter?',
        answer:
          'Many international destinations require that your passport remain valid for at least 6 months past your scheduled departure date. Airlines will refuse boarding if your passport expires sooner. We audit your passport expiration dates immediately upon booking.',
      },
      {
        question: 'Do you help with visas if I planned my trip independently?',
        answer:
          'Yes. We provide standalone visa documentation audits and entry guidance even if your airfare or other travel arrangements were made independently.',
      },
    ],
    featuredDestinations: [
      { slug: 'cairo', name: 'Cairo', country: 'Egypt', image: '/images/destinations/cairo.jpg' },
      { slug: 'bali', name: 'Bali', country: 'Indonesia', image: '/images/destinations/bali.jpg' },
      { slug: 'vietnam', name: 'Vietnam', country: 'Vietnam', image: '/images/destinations/hanoi.jpg' },
      { slug: 'kenya', name: 'Kenya Safari', country: 'Kenya', image: '/images/destinations/kenya.jpg' },
    ],
  },
  {
    slug: 'local-travel-advice',
    title: 'Local Travel Advice',
    shortTitle: 'Destination Advice',
    heroTitle: 'Expert Destination Guidance & Local Travel Advice',
    heroSubtitle:
      'Go beyond generic tourist traps with vetted insider insights. We equip you with destination-specific transit rules, neighborhood safety tips, cultural etiquette, and seasonal advice so you travel like an insider.',
    metaTitle: 'Expert Destination Travel Advice & Local Insider Guidance | MakeYourTrip Inc.',
    metaDescription:
      'Personalized international travel advice and local guidance. MakeYourTrip Inc. provides neighborhood tips, transit pass advice, cultural etiquette, and seasonal recommendations.',
    primaryKeyword: 'expert destination travel advice',
    targetKeywords: [
      'expert destination travel advice',
      'travel advice for international trips',
      'destination guidance travel agency',
      'personalized destination recommendations',
      'local travel advice international',
      'insider travel recommendations agency',
      'destination travel consultation',
    ],
    eyebrow: 'On-the-Ground Intelligence',
    badgeText: 'Curated Local Insights',
    painPointHeading: 'The Problem with Generic Internet Blogs and Sponsored Content',
    painPointParagraphs: [
      'Much of the travel advice found on social media and algorithmic search engines is outdated, sponsored by mass-market operators, or designed for superficial photo ops rather than genuine cultural engagement.',
      'Navigating a foreign metropolis requires nuanced local understanding: Which metro card covers suburban transfers? Which taxi apps are legitimate? How do tipping customs work? What areas are best avoided after dusk?',
      'MakeYourTrip Inc. provides grounded, honest intelligence. We share firsthand knowledge gathered from frequent on-the-ground travel and trusted local partners, preparing you to explore unfamiliar cities with poise.',
    ],
    deliverables: [
      {
        title: 'Neighborhood Character & Safety Briefings',
        description:
          'Clear orientation maps highlighting walkable districts, historic quarters, quiet residential streets, and areas requiring caution.',
      },
      {
        title: 'Public Transit & Rail Navigation Guides',
        description:
          'Plain-English instructions for buying metro cards, validating high-speed rail passes, and navigating foreign train stations.',
      },
      {
        title: 'Cultural Etiquette & Customs Protocol',
        description:
          'Guidance on temple dress codes, dining etiquette, tipping customs, photography restrictions, and polite everyday phrases.',
      },
      {
        title: 'Cash, Currency & Card Acceptance Advice',
        description:
          'Practical advice on foreign transaction fees, contactless payment penetration, and when carrying local paper currency is essential.',
      },
      {
        title: 'Connectivity, eSIM & Smartphone Setup',
        description:
          'Recommendations for reliable international roaming, digital eSIM activation, and essential local navigation apps.',
      },
      {
        title: 'Cultural Insights & Area Exploration Guidance',
        description:
          'Insider guidance on traditional neighborhood markets, artisan districts, and architectural viewpoints free of commercial tourist markups.',
      },
    ],
    workflowSteps: [
      {
        number: '01',
        title: 'Traveler Profile & Destination Discussion',
        description:
          'We evaluate your comfort level with foreign travel, language proficiency, cultural interests, and mobility considerations.',
      },
      {
        number: '02',
        title: 'Tailored Destination Dossier Assembly',
        description:
          'We create a bespoke destination guide focused specifically on the cities, regions, and neighborhoods on your itinerary.',
      },
      {
        number: '03',
        title: 'Logistics & Transit Walkthrough Consultation',
        description:
          'A pre-trip orientation explaining arrival airport transit, money exchange, and regional rail navigation.',
      },
      {
        number: '04',
        title: 'Digital Pocket Reference & Live Support',
        description:
          'Instant access to your digital advice dossier on your phone, backed by live concierge messaging if local questions arise abroad.',
      },
    ],
    faqs: [
      {
        question: 'How is your destination guidance different from reading travel blogs online?',
        answer:
          'Online blogs are often written months or years in advance and frequently monetize affiliate links. Our advice is actively maintained, tailored specifically to your exact dates, personal interests, and itinerary, and provided by seasoned travel specialists who understand current local realities.',
      },
      {
        question: 'Do you provide advice on dietary restrictions and dining customs in foreign countries?',
        answer:
          'Yes. We provide clear guidance for travelers navigating dietary preferences or restrictions, including translated cards explaining dietary needs to foreign restaurant staff.',
      },
      {
        question: 'Will your advice cover how to navigate local public transportation?',
        answer:
          'Yes. Every itinerary includes explicit transit instructions: whether to purchase specific rail cards, metro passes, or airport express tickets, complete with station transfer directions.',
      },
      {
        question: 'Do you book restaurant reservations or special event tickets?',
        answer:
          'No. We provide recommendations and guidance on where and when to visit, but we do not make private restaurant bookings or special reservations, giving you the flexibility to dine at your own pace.',
      },
    ],
    featuredDestinations: [
      { slug: 'kyoto', name: 'Kyoto', country: 'Japan', image: '/images/destinations/kyoto.jpg' },
      { slug: 'barcelona', name: 'Barcelona', country: 'Spain', image: '/images/destinations/barcelona.jpg' },
      { slug: 'reykjavik', name: 'Iceland', country: 'Iceland', image: '/images/destinations/reykjavik.jpg' },
      { slug: 'florence', name: 'Florence', country: 'Italy', image: '/images/destinations/florence.jpg' },
    ],
  },
  {
    slug: 'group-and-work-travel',
    title: 'Group & Work Travel',
    shortTitle: 'Group Travel',
    heroTitle: 'Group & Corporate Executive Travel Management',
    heroSubtitle:
      'Managing travel for multi-generational families or corporate teams requires military precision. We coordinate synchronized flights, shared transit, and group route logistics seamlessly.',
    metaTitle: 'Group & Corporate Travel Route Management | MakeYourTrip Inc.',
    metaDescription:
      'Hassle-free group and corporate travel management. MakeYourTrip Inc. coordinates synchronized flight arrivals, shared transit, and group route itineraries.',
    primaryKeyword: 'group travel planning service',
    targetKeywords: [
      'group travel planning service',
      'family vacation planner agent',
      'group travel planner for hire',
      'small business travel agent',
      'corporate executive travel management',
      'multi generation family trip planning',
      'team retreat travel coordinator',
      'group flight and route coordinator',
    ],
    eyebrow: 'Multi-Traveler Coordination',
    badgeText: 'Synchronized Group Logistics',
    painPointHeading: 'The Chaos of Coordinating Multiple Travelers and Schedules',
    painPointParagraphs: [
      'Organizing travel for 6 to 25 people across different departure cities, varying budgets, and diverse generational needs quickly turns into an administrative nightmare for the designated group organizer.',
      'Coordinating group flight arrivals within the same window, securing airport transfers, managing synchronized itineraries, and handling logistical questions across families often leads to communication breakdown and frustration.',
      'MakeYourTrip Inc. acts as your central travel coordinator. We consolidate all travel logistics into a streamlined master itinerary, handle individual flight inquiries directly, and deliver an effortless trip for the entire group.',
    ],
    deliverables: [
      {
        title: 'Synchronized Multi-City Flight Routing',
        description:
          'Carefully engineered departure times so group members traveling from separate cities touch down within the same arrival window.',
      },
      {
        title: 'Private Group Transit & Transfer Guidance',
        description:
          'Logistical coordination of shared airport transfers, rail connections, and private group coaches to move your party together seamlessly.',
      },
      {
        title: 'Group Route Alignment & Activity Pacing',
        description:
          'Structured group timelines ensuring shared milestones alongside flexible individual downtime for diverse traveler energy levels.',
      },
      {
        title: 'Split-Billing & Transparent Invoicing',
        description:
          'Clear itemized cost breakdowns allowing individual family units or corporate departments to handle billing cleanly.',
      },
      {
        title: 'Flexible Schedules for Mixed Ages & Paces',
        description:
          'Balanced itineraries with shared group gatherings paired with optional activity tiers suited for varying physical mobility levels.',
      },
      {
        title: 'Corporate Travel Route & Timeline Coordination',
        description:
          'Coordinated multi-traveler flight schedules, transfer timings, and itinerary synchronization for executive teams and corporate retreats.',
      },
    ],
    workflowSteps: [
      {
        number: '01',
        title: 'Group Organizer Alignment & Needs Assessment',
        description:
          'We meet with the group lead to establish overall headcount, travel windows, mobility preferences, and budget targets.',
      },
      {
        number: '02',
        title: 'Master Itinerary & Route Concept',
        description:
          'We present a synchronized route blueprint designed specifically to transition and guide your entire party smoothly.',
      },
      {
        number: '03',
        title: 'Individual Traveler Registration & Flights',
        description:
          'We collect passport info and flight preferences from individual participants directly, lifting the burden from the organizer.',
      },
      {
        number: '04',
        title: 'Master Travel Pack Distribution & Live Support',
        description:
          'Every traveler receives their individualized schedule within the master group itinerary, backed by 24/7 on-trip support.',
      },
    ],
    faqs: [
      {
        question: 'What is the group size you accommodate?',
        answer:
          'We specialize in groups ranging from 4 to 35 travelers—including multi-generational families, alumni groups, milestone anniversary parties, and executive leadership teams.',
      },
      {
        question: 'Can individual group members arrive on different dates or fly from different airports?',
        answer:
          'Yes. We routinely orchestrate staggered arrivals and multi-city departures, ensuring everyone connects smoothly on the ground.',
      },
      {
        question: 'Do you book hotels or event venues for group travel?',
        answer:
          'No. We coordinate the flight logistics, transit routes, synchronized itineraries, and travel documentation. We do not book hotels, villas, or private event spaces, allowing groups to select their preferred accommodations directly.',
      },
      {
        question: 'Do you offer corporate invoicing and travel receipts for business trips?',
        answer:
          'Yes. We provide consolidated, itemized corporate invoicing for business retreats and executive travel management.',
      },
    ],
    featuredDestinations: [
      { slug: 'santorini', name: 'Santorini', country: 'Greece', image: '/images/destinations/santorini.jpg' },
      { slug: 'banff', name: 'Canadian Rockies', country: 'Canada', image: '/images/destinations/banff.jpg' },
      { slug: 'lucerne', name: 'Lucerne', country: 'Switzerland', image: '/images/destinations/lucerne.jpg' },
      { slug: 'costa-rica', name: 'Costa Rica', country: 'Costa Rica', image: '/images/destinations/costa-rica.jpg' },
    ],
  },
  {
    slug: '24-7-travel-support',
    title: '24/7 Travel Support',
    shortTitle: '24/7 Support',
    heroTitle: '24/7 On-Trip Concierge Assistance & Traveler Support',
    heroSubtitle:
      'When unexpected flight disruptions, weather cancellations, or transit delays occur thousands of miles from home, you should never have to face a robotic chatbot. A dedicated travel specialist is on standby 24/7 to solve problems live.',
    metaTitle: '24/7 On-Trip Travel Support & Dedicated Concierge Helpline | MakeYourTrip Inc.',
    metaDescription:
      'Travel with complete peace of mind. MakeYourTrip Inc. provides round-the-clock live human support for flight disruptions, transit adjustments, and emergency changes abroad.',
    primaryKeyword: '24 7 travel support service',
    targetKeywords: [
      '24 7 travel support service',
      'travel concierge service',
      'travel agency 24 7 support',
      'on trip travel assistance helpline',
      'flight delay assistance travel agent',
      'human travel advisor helpline',
      'emergency international travel support',
      'live travel agent assistance abroad',
    ],
    eyebrow: 'Continuous Peace of Mind',
    badgeText: 'Live Human Helpline',
    painPointHeading: 'What Happens When Plans Go Wrong Thousands of Miles from Home?',
    painPointParagraphs: [
      'Even the most meticulously planned vacations can encounter the unpredictable: sudden airline mechanical cancellations, missed train connections due to foreign signal delays, unexpected medical emergencies, or lost baggage.',
      'Navigating these moments on your own in a foreign time zone—while waiting on hold with automated airline hotlines—creates immense stress and drains precious vacation hours.',
      'With MakeYourTrip Inc., you are never on your own. You have a direct lifeline to an attentive, professional travel manager who steps in immediately to rebook connections, coordinate with transit providers, and resolve complications in real time.',
    ],
    deliverables: [
      {
        title: 'Direct Human Specialist Access',
        description:
          'Message or phone your assigned travel specialist directly via WhatsApp or phone—no call centers, ticket queues, or automated bots.',
      },
      {
        title: 'Proactive Flight Delay & Gate Tracking',
        description:
          'We track your aircraft movements. If a delay threatens your connection, we formulate backup re-routing before your plane lands.',
      },
      {
        title: 'Transit & Transfer Connection Support',
        description:
          'Live guidance and re-routing support if flight delays disrupt scheduled airport transfers, rail connections, or travel timing.',
      },
      {
        title: 'Real-Time Route & Itinerary Adjustments',
        description:
          'Decided to adjust your daily plan, take an earlier train, or bypass a stop? We update your schedule and transit recommendations seamlessly.',
      },
      {
        title: 'Emergency Medical & Consular Guidance',
        description:
          'Immediate referral assistance finding English-speaking medical clinics, emergency pharmacy access, or consular contacts if passports are misplaced.',
      },
      {
        title: 'Post-Trip Resolution & Airline Claims Support',
        description:
          'If an airline loses luggage or incurs flight delay compensation rights under EU261 or global conventions, we assist with documentation.',
      },
    ],
    workflowSteps: [
      {
        number: '01',
        title: 'Pre-Departure Handover & Dedicated Channel Setup',
        description:
          'Before you fly, we establish a direct messaging line and provide emergency contact protocols for your journey.',
      },
      {
        number: '02',
        title: 'Active In-Transit Flight & Rail Monitoring',
        description:
          'Our operations team tracks your key transit segments in the background, alert to weather disruptions or rail schedule changes.',
      },
      {
        number: '03',
        title: 'Rapid Live Resolution When Complications Arise',
        description:
          'If a challenge occurs, message us immediately. Your specialist liaises directly with airlines or transit providers to solve it.',
      },
      {
        number: '04',
        title: 'Safe Return & Post-Travel Follow-Up',
        description:
          'We ensure your return flight leg proceeds smoothly and check in after your journey to confirm every detail went according to plan.',
      },
    ],
    faqs: [
      {
        question: 'How do I reach my travel manager while abroad?',
        answer:
          'We provide direct access via WhatsApp messaging and voice, alongside a direct phone line and dedicated support email. You communicate directly with a real travel professional who knows your itinerary intimately.',
      },
      {
        question: 'Is 24/7 support an extra fee or included in all trip planning?',
        answer:
          'Round-the-clock human travel support is included as standard with every comprehensive itinerary planned through MakeYourTrip Inc. We believe peace of mind is an essential pillar of managed travel.',
      },
      {
        question: 'What happens if our luggage is delayed or lost by the airline?',
        answer:
          'We communicate directly with the airline baggage services desk on your behalf, track the baggage claim file number, and assist with airport follow-ups until resolved.',
      },
      {
        question: 'Can you help if we misplace our passport while overseas?',
        answer:
          'Yes. We provide emergency copies of your passport and travel documents, locate the nearest home embassy or consulate, and guide you through the emergency travel certificate process.',
      },
    ],
    featuredDestinations: [
      { slug: 'tokyo', name: 'Tokyo', country: 'Japan', image: '/images/destinations/tokyo.jpg' },
      { slug: 'paris', name: 'Paris', country: 'France', image: '/images/destinations/paris.jpg' },
      { slug: 'interlaken', name: 'Swiss Alps', country: 'Switzerland', image: '/images/destinations/interlaken.jpg' },
      { slug: 'dubai', name: 'Dubai', country: 'UAE', image: '/images/destinations/dubai.jpg' },
    ],
  },
]
