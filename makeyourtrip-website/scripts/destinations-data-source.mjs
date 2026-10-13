// scripts/destinations-data-source.mjs
// All 36 destinations with authentic landmark data (5 per destination),
// 3-4 highlights with images, purified travel itineraries, and minimum 5 FAQs per destination.

export const destinationsMaster = [
  // --- JAPAN ---
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    heroTitle: 'Experience Tokyo: Ultra-Modern Energy & Timeless Tradition',
    heroSubtitle: 'From neon-lit Shibuya crossings to peaceful Asakusa shrines and world-class gastronomy, discover the contrasting layers of Japan\'s dynamic capital.',
    idealDuration: '5–7 Days',
    bestSeason: 'March–May & October–November',
    visaSupport: 'eVisa & Consulate Documentation Guidance',
    overview: [
      'Tokyo is a dynamic metropolis where futuristic skyscrapers and neon-lit avenues coexist seamlessly with centuries-old temples and quiet neighborhood shrines. Each distinct district functions almost like its own city, from the fashion runways of Harajuku and Ginza to the electronic hubs of Akihabara.',
      'Beyond its cutting-edge architecture and efficient transit, Tokyo is celebrated as the world\'s premier culinary capital, boasting more Michelin stars than any other city alongside humble ramen alleys, tranquil tea houses, and scenic waterfront promenades.'
    ],
    tags: ['City Life', 'Michelin Dining', 'Modern Culture', 'Shopping', 'Historic Temples'],
    gallery: [
      { src: '/images/destinations/tokyo.jpg', name: 'Tokyo Tower', caption: 'The iconic 333-meter communications and observation tower in Minato, offering sweeping views across the metropolis to Mount Fuji.', alt: 'Tokyo Tower illuminated against the Tokyo skyline' },
      { src: '/images/destinations/tokyo-2.jpg', name: 'Senso-ji Temple', caption: 'Tokyo\'s oldest and most significant Buddhist temple in Asakusa, founded in 645 AD and framed by the famous Kaminarimon Thunder Gate.', alt: 'Historic Senso-ji temple with giant red paper lantern in Asakusa Tokyo' },
      { src: '/images/destinations/tokyo-3.jpg', name: 'Shibuya Crossing', caption: 'The world\'s busiest pedestrian scramble crossing, surrounded by towering multimedia screens and pulsating city energy.', alt: 'Pedestrians traversing the iconic Shibuya scramble crossing at dusk' },
      { src: '/images/destinations/tokyo-4.jpg', name: 'Shinjuku District', caption: 'A towering forest of neon skyscrapers, bustling railway concourses, and the atmospheric alleyways of Omoide Yokocho.', alt: 'Vibrant neon street scene in the Shinjuku district of Tokyo' },
      { src: '/images/destinations/tokyo-5.jpg', name: 'Odaiba Waterfront', caption: 'A high-tech entertainment and leisure district on an artificial island in Tokyo Bay, offering views of the Rainbow Bridge.', alt: 'Odaiba waterfront promenade with view of Rainbow Bridge in Tokyo' }
    ],
    highlights: [
      { title: 'Senso-ji & Historic Asakusa', desc: 'Wander through the Thunder Gate and down Nakamise-dori shopping street to Tokyo\'s most revered ancient Buddhist sanctuary.', image: '/images/destinations/tokyo-2.jpg', alt: 'Historic Senso-ji temple in Asakusa' },
      { title: 'Shibuya Scramble & Sky Deck', desc: 'Experience the electric pulse of the city from street level before taking in 360-degree open-air views from Shibuya Sky.', image: '/images/destinations/tokyo-3.jpg', alt: 'Shibuya scramble crossing pedestrian view' },
      { title: 'Tokyo Tower & Skyline Views', desc: 'Admire the landmark mid-century tower and enjoy panoramic cityscapes extending all the way to Mount Fuji on clear mornings.', image: '/images/destinations/tokyo.jpg', alt: 'Tokyo Tower landmark view' },
      { title: 'Shinjuku & Omoide Yokocho', desc: 'Contrast Tokyo\'s modern administrative skyline with the intimate, lantern-lit dining alleys serving yakitori and craft beers.', image: '/images/destinations/tokyo-4.jpg', alt: 'Neon streets of Shinjuku' }
    ],
    sampleItinerary: {
      title: 'The 5-Day Essential Tokyo Exploration',
      days: [
        { day: 'Day 1', title: 'Arrival & Shibuya Skyline', description: 'Arrive in Tokyo, settle into your central hotel, and take an evening stroll through Shibuya Crossing before ascending Shibuya Sky for panoramic night views.' },
        { day: 'Day 2', title: 'Old Tokyo & Historic Asakusa', description: 'Explore ancient Senso-ji temple and Nakamise-dori in the morning, followed by a scenic Sumida River water bus cruise to the landscaped Hamarikyu Gardens.' },
        { day: 'Day 3', title: 'Modern Art & High Fashion', description: 'Immerse in futuristic digital art installations at teamLab Planets in Toyosu, followed by afternoon architecture and boutique shopping along Ginza\'s grand boulevard.' },
        { day: 'Day 4', title: 'Tsukiji Flavors & Shinjuku Nightlife', description: 'Sample fresh seafood, matcha treats, and tamagoyaki at Tsukiji Outer Market, then spend the evening exploring Shinjuku\'s vibrant entertainment quarters.' },
        { day: 'Day 5', title: 'Meiji Shrine & Harajuku Culture', description: 'Walk through the forested pathways of Meiji Jingu shrine before discovering contemporary street style on Takeshita Street and tree-lined Omotesando avenue.' }
      ]
    },
    faqs: [
      { question: 'Do I need a visa to travel to Tokyo, Japan?', answer: 'Citizens from over 65 countries—including the United States, United Kingdom, Canada, Australia, and EU member states—enjoy visa-free entry to Japan for tourism stays up to 90 days. Travelers holding passports from countries requiring an entry visa can apply through Japan\'s official eVisa system or their local Japanese consulate with standard itinerary documentation.' },
      { question: 'When is the best time of year to visit Tokyo?', answer: 'Spring (late March through April) offers iconic cherry blossoms and pleasant temperatures around 16°C–20°C. Autumn (October through November) brings crisp, clear days with stunning fall foliage in Tokyo\'s public parks. Winter is generally sunny and dry, while summer (July–August) is hot and humid with lively evening street festivals.' },
      { question: 'How many days are recommended to see Tokyo?', answer: 'A stay of 5 to 7 days is ideal to explore Tokyo\'s major districts—such as Shinjuku, Shibuya, Asakusa, Ginza, and Ueno—without feeling rushed, while allowing time for a day trip to Mount Fuji, Kamakura, or Nikko.' },
      { question: 'How do travelers get around Tokyo efficiently?', answer: 'Tokyo possesses one of the world\'s cleanest, most punctual transit networks. The JR Yamanote loop line connects major hubs, while the Tokyo Metro and Toei subway networks reach every neighborhood. Visitors should pick up a rechargeable IC card (Suica or Pasmo) or digital smartphone card for frictionless tap-and-go travel.' },
      { question: 'What payment methods and etiquette should visitors know?', answer: 'Credit cards and mobile payments (Apple Pay, contactless IC cards) are widely accepted across department stores, hotels, and convenience stores, though carrying cash (Japanese Yen) remains essential for traditional shrines, small ramen shops, and vending machines. Tipping is not customary in Japan and can cause confusion; excellent service is considered the standard.' }
    ],
    image: '/images/destinations/tokyo.jpg'
  },
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    heroTitle: 'Discover Kyoto: Temples, Ryokans & Serene Gardens',
    heroSubtitle: 'Step into Japan\'s historic imperial heart, where moss-covered Zen temples, lantern-lit geisha districts, and bamboo groves flourish.',
    idealDuration: '4–6 Days',
    bestSeason: 'April (Cherry Blossoms) & November (Autumn Foliage)',
    visaSupport: 'Japan Entry Visa Guidance Included',
    overview: [
      'Kyoto served as the imperial capital of Japan for over a thousand years, from 794 to 1868. Today, it remains the spiritual center of traditional Japanese culture, preserving more than 1,600 historic Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage monuments.',
      'From the iconic vermilion gates of Fushimi Inari climbing sacred Mount Inari to the quiet bamboo groves of Arashiyama and the preserved wooden machiya townhouses of Gion, Kyoto provides an unforgettable window into classical Japanese aesthetics, architecture, and mindfulness.'
    ],
    tags: ['Ancient Temples', 'Traditional Ryokan', 'Zen Gardens', 'Tea Ceremony', 'UNESCO Heritage'],
    gallery: [
      { src: '/images/destinations/kyoto.jpg', name: 'Kinkaku-ji (Golden Pavilion)', caption: 'A Zen Buddhist temple whose top two floors are completely covered in pure gold leaf, reflected gracefully in the mirror pond Kyōko-chi.', alt: 'Kinkaku-ji Golden Pavilion temple reflecting in mirror pond in Kyoto' },
      { src: '/images/destinations/kyoto-2.jpg', name: 'Fushimi Inari-taisha', caption: 'The head Shinto shrine of Inari, famous for its mesmerizing pathway of over 10,000 vibrant vermilion torii gates winding up Mount Inari.', alt: 'Vermilion torii gates winding through forest at Fushimi Inari shrine in Kyoto' },
      { src: '/images/destinations/kyoto-3.jpg', name: 'Arashiyama Bamboo Grove', caption: 'A towering natural forest of soaring green bamboo stalks where sunlight filters gently through rustling canopies.', alt: 'Sunlight filtering through towering bamboo stalks at Arashiyama Kyoto' },
      { src: '/images/destinations/kyoto-4.jpg', name: 'Gion Historic District', caption: 'Kyoto\'s most famous entertainment district, characterized by preserved 17th-century wooden machiya merchant houses and teahouses.', alt: 'Traditional wooden machiya houses on paved lane in Gion Kyoto' },
      { src: '/images/destinations/kyoto-5.jpg', name: 'Kiyomizu-dera Temple', caption: 'An ancient temple perched on Mount Otowa, celebrated for its massive wooden stage built without a single nail overlooking maple-clad valleys.', alt: 'Wooden terrace stage of Kiyomizu-dera temple overlooking Kyoto hillside' }
    ],
    highlights: [
      { title: 'Fushimi Inari Torii Gate Trail', desc: 'Walk beneath thousands of vivid vermilion torii gates curving through sacred mountain woodlands, best enjoyed in the peaceful morning light.', image: '/images/destinations/kyoto-2.jpg', alt: 'Torii gates at Fushimi Inari shrine' },
      { title: 'Arashiyama Bamboo Grove & Tenryu-ji', desc: 'Experience the mystical canopy of towering green bamboo and tour the adjoining UNESCO World Heritage Zen garden of Tenryu-ji.', image: '/images/destinations/kyoto-3.jpg', alt: 'Towering green bamboo grove in Arashiyama' },
      { title: 'Kinkaku-ji (Golden Pavilion)', desc: 'Marvel at the shimmering gold-leaf sanctuary reflecting in tranquil pond waters surrounded by classical Japanese pines.', image: '/images/destinations/kyoto.jpg', alt: 'Golden Pavilion temple in Kyoto' },
      { title: 'Gion\'s Historic Machiya Streets', desc: 'Wander along the stone-paved Shirakawa Canal and Hanamikoji Street, where traditional lantern-lit teahouses preserve geiko culture.', image: '/images/destinations/kyoto-4.jpg', alt: 'Preserved historic streets of Gion' }
    ],
    sampleItinerary: {
      title: 'The 4-Day Cultural Immersion in Kyoto',
      days: [
        { day: 'Day 1', title: 'Arrival via Shinkansen & Gion Evening', description: 'Arrive via bullet train, check into your traditional ryokan, and enjoy an evening walking tour of the lantern-lit Gion district.' },
        { day: 'Day 2', title: 'Golden Pavilion & Zen Meditation', description: 'Visit Kinkaku-ji early to witness the sun reflecting off the gold leaf, followed by quiet contemplation at Ryoan-ji\'s famous 15-stone Zen dry landscape garden.' },
        { day: 'Day 3', title: 'Fushimi Inari & Traditional Tea Ceremony', description: 'Hike through the thousands of torii gates at Fushimi Inari at dawn, followed by an authentic Uji matcha ceremony and a visit to Kiyomizu-dera.' },
        { day: 'Day 4', title: 'Arashiyama & Scenic Sagano Train', description: 'Morning exploration of Arashiyama Bamboo Grove, Tenryu-ji temple, and a scenic ride on the Sagano romantic train along the Hozu River.' }
      ]
    },
    faqs: [
      { question: 'What is the best way to travel from Tokyo to Kyoto?', answer: 'The Tokaido Shinkansen (high-speed bullet train) connects Tokyo Station to Kyoto Station in just 2 hours and 15 minutes on the Nozomi service. Trains depart every few minutes, offering comfortable seating, luggage storage, and views of Mount Fuji on the right side when traveling west.' },
      { question: 'When is the best season to see cherry blossoms or autumn leaves in Kyoto?', answer: 'Cherry blossoms generally bloom between late March and early April, transforming canal banks like the Philosopher\'s Path into pink tunnels. Autumn foliage peaks in mid-to-late November, illuminating temples like Tofuku-ji, Kiyomizu-dera, and Eikando with brilliant crimson and amber maple canopies.' },
      { question: 'How many days should I budget for Kyoto?', answer: 'At least 3 to 4 full days are recommended to see Kyoto\'s primary temple zones—Eastern Kyoto (Higashiyama), Western Kyoto (Arashiyama), and Northern Kyoto—at an enjoyable pace without rushing through sacred sites.' },
      { question: 'How do travelers navigate public transportation in Kyoto?', answer: 'Kyoto is well-served by a combination of municipal subways, regional rail lines (JR, Hankyu, Keihan), and an extensive city bus network. Digital IC cards (Suica, Pasmo, Icoca) work seamlessly on all lines. Rental bicycles and walking are also popular in flat districts like Higashiyama.' },
      { question: 'What etiquette should visitors observe at temples and historic districts?', answer: 'Visitors should speak quietly, remove footwear when entering wooden temple halls, avoid photographing geiko or maiko on private streets in Gion, and refrain from eating or drinking while walking through sacred temple grounds.' }
    ],
    image: '/images/destinations/kyoto.jpg'
  },
  {
    slug: 'osaka',
    name: 'Osaka',
    country: 'Japan',
    region: 'Asia',
    heroTitle: 'Osaka: Japan\'s Vibrant Street-Food & Entertainment Capital',
    heroSubtitle: 'Immerse yourself in Dotonbori neon, world-famous culinary street culture, ancient castles, and energetic local hospitality.',
    idealDuration: '3–4 Days',
    bestSeason: 'March–May & September–November',
    visaSupport: 'Japan Entry Visa Guidance Included',
    overview: [
      'Affectionately known as "Tenka no Daidokoro" (the Nation\'s Kitchen), Osaka is renowned across Japan for its outgoing locals, infectious laughter, and unrivaled street gastronomy. The city\'s motto, "kuidaore" (eat until you drop), perfectly captures its culinary obsession with takoyaki, okonomiyaki, and kushikatsu.',
      'Beyond the kinetic energy of Dotonbori and the retro charm of Shinsekai, Osaka boasts a rich historical legacy centered around the grand 16th-century Osaka Castle, alongside contemporary architectural marvels like the Umeda Sky Building and Shitennō-ji, Japan\'s oldest officially administered Buddhist temple.'
    ],
    tags: ['Street Food', 'Nightlife', 'Osaka Castle', 'Shopping', 'Architecture'],
    gallery: [
      { src: '/images/destinations/osaka.jpg', name: 'Osaka Castle', caption: 'The majestic 16th-century fortress featuring tiered turrets, massive granite moat walls, and extensive cherry blossom parklands.', alt: 'Osaka Castle stone fortress surrounded by moat and parkland' },
      { src: '/images/destinations/osaka-2.jpg', name: 'Dotonbori Canal', caption: 'The vibrant heart of Osaka nightlife, famous for massive mechanical crab signs, neon reflections, and the iconic Glico Running Man.', alt: 'Dotonbori canal with giant neon advertising signs reflected on water' },
      { src: '/images/destinations/osaka-3.jpg', name: 'Shinsekai District', caption: 'A nostalgic early-20th-century retro neighborhood crowned by the Tsutenkaku Tower and lined with bustling kushikatsu skewer restaurants.', alt: 'Retro Tsutenkaku Tower rising above lively Shinsekai street in Osaka' },
      { src: '/images/destinations/osaka-4.jpg', name: 'Shitennō-ji Temple', caption: 'One of Japan\'s oldest Buddhist temples, founded in 593 AD by Prince Shotoku, featuring a five-story pagoda and peaceful pond.', alt: 'Five-story pagoda at ancient Shitennō-ji Buddhist temple in Osaka' },
      { src: '/images/destinations/osaka-5.jpg', name: 'Umeda Sky Building', caption: 'A striking 173-meter twin-tower skyscraper connected at the top by a circular Floating Garden Observatory offering 360-degree city views.', alt: 'Futuristic Umeda Sky Building with circular sky observatory in Osaka' }
    ],
    highlights: [
      { title: 'Dotonbori Culinary Canal Walk', desc: 'Taste piping-hot takoyaki octopus balls and savory okonomiyaki pancakes beneath the famous neon billboards of Dotonbori.', image: '/images/destinations/osaka-2.jpg', alt: 'Dotonbori canal neon street view' },
      { title: 'Osaka Castle & Surrounding Moats', desc: 'Tour the eight-story castle museum to learn about samurai unification history and stroll the expansive Nishinomaru Garden.', image: '/images/destinations/osaka.jpg', alt: 'Osaka Castle ramparts and turrets' },
      { title: 'Shinsekai & Tsutenkaku Tower', desc: 'Step into the colorful, nostalgic showa-era atmosphere of Shinsekai and sample crispy golden kushikatsu skewers.', image: '/images/destinations/osaka-3.jpg', alt: 'Shinsekai district with Tsutenkaku Tower' },
      { title: 'Umeda Sky Floating Observatory', desc: 'Ride the open-air glass escalators suspended between towers to experience panoramic sunset views across Osaka Bay.', image: '/images/destinations/osaka-5.jpg', alt: 'Umeda Sky Building observation deck' }
    ],
    sampleItinerary: {
      title: 'The 3-Day Osaka Culinary & Cultural Sprint',
      days: [
        { day: 'Day 1', title: 'Arrival & Dotonbori Evening Eats', description: 'Check into your hotel in Namba or Umeda. Dive straight into an evening street food safari through Dotonbori to taste takoyaki and okonomiyaki.' },
        { day: 'Day 2', title: 'Osaka Castle & Shinsekai District', description: 'Tour the grand Osaka Castle museum, followed by afternoon retro vibes and kushikatsu in the historic Shinsekai district.' },
        { day: 'Day 3', title: 'Nara Day Excursion & Umeda Views', description: 'Short scenic train ride to Nara to meet the bow-trained deer and view Todai-ji temple, returning for evening views from Umeda Sky Building.' }
      ]
    },
    faqs: [
      { question: 'How close is Osaka to Kyoto, and can they be combined?', answer: 'Osaka and Kyoto are exceptionally close neighbors, located just 15 minutes apart by Shinkansen bullet train or 30 minutes via the JR Special Rapid train. Many travelers use Osaka as a lively evening base while taking daytime excursions to Kyoto, Kobe, and Nara.' },
      { question: 'What is Osaka\'s signature food that visitors must try?', answer: 'Osaka is celebrated as Japan\'s street-food capital. Must-try specialties include Takoyaki (crispy battered balls filled with octopus), Okonomiyaki (savory shredded cabbage pancakes cooked on flat griddles), Kushikatsu (deep-fried skewered meats and vegetables), and Kitsune Udon.' },
      { question: 'When is the best season to visit Osaka?', answer: 'Spring (March to May) features cherry blossoms around Osaka Castle Park and mild temperatures. Autumn (October to November) offers dry, sunny weather and vibrant foliage. Summers are hot and humid, but host the famous Tenjin Matsuri festival in late July.' },
      { question: 'What is the best way to travel around Osaka?', answer: 'The Osaka Metro (subway) network is fast, convenient, and connects all major sightseeing districts including Namba, Umeda, Tennoji, and Osakako. The JR Osaka Loop Line also circles the central core. Rechargeable IC cards (Suica, Pasmo, Icoca) work on all lines.' },
      { question: 'Do I need cash in Osaka street markets?', answer: 'While major shopping centers and chain stores readily take international credit cards, cash (Japanese Yen) is strongly recommended for independent street stalls in Dotonbori, Kuromon Ichiba Market, and traditional neighborhood izakayas.' }
    ],
    image: '/images/destinations/osaka.jpg'
  },
  {
    slug: 'mount-fuji',
    name: 'Mount Fuji & Hakone',
    country: 'Japan',
    region: 'Asia',
    heroTitle: 'Mount Fuji & Hakone: Alpine Hot Springs & Sacred Vistas',
    heroSubtitle: 'Breathtaking volcanic landscapes, Lake Ashi pirate boat cruises, alpine ropeways, and rejuvenating hot-spring onsen retreats.',
    idealDuration: '2–3 Days',
    bestSeason: 'November–February (Clearest Fuji Views)',
    visaSupport: 'Japan Entry Visa Guidance Included',
    overview: [
      'Rising gracefully to 3,776 meters, Mount Fuji (Fuji-san) is Japan\'s highest mountain, an enduring sacred symbol, and a UNESCO World Heritage cultural site celebrated by poets and artists for centuries. Its almost perfectly symmetrical volcanic cone forms one of the most recognizable horizons on Earth.',
      'The neighboring Fuji-Hakone-Izu National Park provides the ultimate alpine gateway. Travelers can cruise across the mirror-like waters of Lake Ashi, ride scenic cable cars across active sulfurous volcanic vents at Owakudani, and unwind in mineral-rich thermal onsen baths at traditional Japanese ryokans.'
    ],
    tags: ['Sacred Peaks', 'Onsen Hot Springs', 'Lake Cruises', 'Scenic Cable Cars', 'Nature'],
    gallery: [
      { src: '/images/destinations/mount-fuji.jpg', name: 'Mount Fuji Peak', caption: 'Japan\'s sacred 3,776-meter volcanic cone, rising majestic and snow-capped above lush surrounding alpine lakes and forests.', alt: 'Snow-capped peak of Mount Fuji against clear blue alpine sky' },
      { src: '/images/destinations/mount-fuji-2.jpg', name: 'Lake Kawaguchi', caption: 'The most accessible of the Fuji Five Lakes, offering famous postcard reflections of Fuji\'s northern face across serene waters.', alt: 'Lake Kawaguchi with Mount Fuji reflected on the tranquil water surface' },
      { src: '/images/destinations/mount-fuji-3.jpg', name: 'Lake Ashi (Hakone)', caption: 'A scenic crater lake formed over 3,000 years ago, renowned for pirate sightseeing ships and the floating red torii gate of Hakone Shrine.', alt: 'Red torii gate of Hakone shrine standing in the water of Lake Ashi' },
      { src: '/images/destinations/mount-fuji-4.jpg', name: 'Hakone Valley & Onsens', caption: 'A mountainous volcanic valley famous for soothing thermal hot springs, steaming Owakudani sulfur vents, and modern sculpture parks.', alt: 'Steaming thermal volcanic landscape in the mountains of Hakone' },
      { src: '/images/destinations/mount-fuji-5.jpg', name: 'Chureito Pagoda', caption: 'A five-story red pagoda perched on a hillside in Fujiyoshida, creating one of Japan\'s most iconic visual viewpoints framing Mount Fuji.', alt: 'Red Chureito Pagoda with Mount Fuji and cherry blossoms in background' }
    ],
    highlights: [
      { title: 'Lake Ashi Sightseeing Cruise', desc: 'Glide across deep crater waters aboard a scenic sightseeing ship, taking in vistas of Mount Fuji and Hakone Shrine\'s floating torii gate.', image: '/images/destinations/mount-fuji-3.jpg', alt: 'Lake Ashi pirate ship cruise with Mount Fuji' },
      { title: 'Chureito Pagoda Overlook', desc: 'Climb the 398 steps at Arakurayama Sengen Park to photograph the iconic red pagoda with Mount Fuji reigning in the background.', image: '/images/destinations/mount-fuji-5.jpg', alt: 'Chureito Pagoda framing Mount Fuji' },
      { title: 'Owakudani Volcanic Valley Ropeway', desc: 'Soar above steaming geothermal fumaroles on the Hakone Ropeway and taste the legendary black eggs boiled in sulfur mineral waters.', image: '/images/destinations/mount-fuji-4.jpg', alt: 'Hakone Ropeway over Owakudani valley' },
      { title: 'Fuji Reflections at Lake Kawaguchi', desc: 'Walk along the northern shores of Lake Kawaguchi to admire pristine reflections of the volcanic cone framed by seasonal maple or cherry trees.', image: '/images/destinations/mount-fuji-2.jpg', alt: 'Lake Kawaguchi scenic shoreline' }
    ],
    sampleItinerary: {
      title: 'The 2-Day Hakone & Mount Fuji Scenic Escape',
      days: [
        { day: 'Day 1', title: 'Romancecar Train & Lake Ashi Cruise', description: 'Take the scenic Odakyu Romancecar from Tokyo to Hakone. Cruise across Lake Ashi, visit Hakone Shrine, and check into an authentic hot spring ryokan.' },
        { day: 'Day 2', title: 'Hakone Ropeway & Open-Air Museum', description: 'Ascend Owakudani valley via cable car, visit the Hakone Open-Air sculpture museum, and admire northern Fuji panoramas before returning to Tokyo or traveling onwards to Kyoto.' }
      ]
    },
    faqs: [
      { question: 'When is Mount Fuji most clearly visible?', answer: 'Mount Fuji is notoriously shy during summer due to humidity and cloud cover. The highest visibility occurs from November through February, when cold, crisp, and dry winter weather provides clear blue skies and a dramatic snowcap.' },
      { question: 'How do travelers reach Hakone and Mount Fuji from Tokyo?', answer: 'Hakone is easily reached via the Odakyu Romancecar express train from Shinjuku Station to Hakone-Yumoto in about 85 minutes. Lake Kawaguchi can be reached via the JR Chuo Line and Fujikyu Railway (Fuji Excursion direct train) in just under two hours.' },
      { question: 'Can visitors hike Mount Fuji?', answer: 'The official climbing season for Mount Fuji is restricted to the summer months, strictly from early July to early September, when mountain huts are open and trails are free of snow. Climbing outside this season requires advanced mountaineering permits and is discouraged for casual tourists.' },
      { question: 'What is the Hakone Freepass and is it worth getting?', answer: 'The Hakone Freepass is highly recommended. It covers round-trip transit from Tokyo (or within Hakone) and grants unlimited rides on the Hakone Tozan Railway, cable car, ropeway, Lake Ashi sightseeing cruise, and local Tozan buses for 2 or 3 consecutive days.' },
      { question: 'What should visitors know about traditional onsen hot spring etiquette?', answer: 'Traditional Japanese onsens require bathers to wash and rinse thoroughly before entering the communal thermal pools. Bathing suits are not permitted in the water. While some modern spas allow small tattoos with waterproof patches, traditional onsens may require booking a private bath (kashikiri) if you have ink.' }
    ],
    image: '/images/destinations/mount-fuji.jpg'
  }
];
