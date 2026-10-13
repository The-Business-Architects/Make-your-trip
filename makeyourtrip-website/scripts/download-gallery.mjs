import fs from 'fs'
import path from 'path'
import https from 'https'

const targetDir = path.resolve('public/images/destinations')

const galleryMap = {
  // JAPAN
  'kyoto': [
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80', // Torii
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80', // Bamboo
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80', // Tea
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80'  // Pagoda
  ],
  'osaka': [
    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80', // Castle
    'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=1200&q=80', // Street food
    'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=1200&q=80', // Dotonbori
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80'  // Night
  ],
  'mount-fuji': [
    'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=80', // Fuji lake
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Landscape
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80', // Ryokan onsen
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80'  // Sunrise
  ],

  // ITALY
  'rome': [
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80', // Colosseum
    'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&q=80', // Vatican
    'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=80', // Trevi Fountain
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80'  // Pasta/Dining
  ],
  'florence': [
    'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=1200&q=80', // Duomo
    'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80', // Tuscan hills
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80', // Chianti Wine
    'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&q=80'  // Ponte Vecchio
  ],
  'venice': [
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80', // Grand canal
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80', // Gondolas
    'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=1200&q=80', // Burano colorful
    'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1200&q=80'  // St Marks
  ],
  'amalfi-coast': [
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80', // Positano cliffs
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', // Coast
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // Capri Boat
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80'  // Balcony sea view
  ],

  // UNITED KINGDOM
  'london': [
    'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1200&q=80', // Tower Bridge
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80', // Big Ben
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1200&q=80', // Red bus / street
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'  // Afternoon Tea / Dining
  ],
  'edinburgh': [
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80', // Castle
    'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=1200&q=80', // Victoria Street
    'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?w=1200&q=80', // Royal Mile
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80'  // Scotch Whisky
  ],
  'scottish-highlands': [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Highlands Loch
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80', // Glencoe drive
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=80', // Isle of Skye
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&q=80'  // Mountain valley
  ],
  'bath-cotswolds': [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80', // Georgian Crescent
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80', // Countryside lane
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // English Pub
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'  // Roman Baths
  ],

  // FRANCE
  'paris': [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80', // Eiffel Tower
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80', // Louvre Museum
    'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80', // Paris café
    'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?w=1200&q=80'  // Seine River
  ],
  'french-riviera': [
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', // Nice Promenade
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80', // Monaco Harbor
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // Yachting
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80'  // Èze village
  ],
  'provence': [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80', // Lavender bloom
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80', // Vineyard
    'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80', // Gordes stone village
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'  // Provençal château
  ],
  'bordeaux': [
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80', // Wine barrels
    'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80', // French Château
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Vine rows
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80'  // Gastronomy
  ],

  // SWITZERLAND
  'zurich': [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&q=80', // Lake Zurich
    'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1200&q=80', // Old Town
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80', // River Limmat
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80'  // Alpine train
  ],
  'lucerne': [
    'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1200&q=80', // Chapel bridge
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Mount Pilatus
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80', // Lake Steamer
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&q=80'  // Swiss chalet
  ],
  'interlaken': [
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80', // Jungfrau
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Lauterbrunnen
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80', // Grindelwald
    'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1200&q=80'  // Glacier railway
  ],
  'zermatt': [
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80', // Matterhorn
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80', // Gornergrat train
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Stellisee lake
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&q=80'  // Alpine village
  ],

  // UNITED ARAB EMIRATES
  'dubai': [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80', // Burj Khalifa
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80', // Desert Safari
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80', // Dubai Marina
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Palm Jumeirah
  ],
  'abu-dhabi': [
    'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=80', // Sheikh Zayed Mosque
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80', // Louvre dome
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80', // Desert resort
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80'  // Yas Island
  ],

  // UNITED STATES
  'new-york': [
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80', // Times Square
    'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80', // Central Park
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Brooklyn Bridge
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80'  // Manhattan skyline
  ],
  'california-coast': [
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80', // Golden Gate Bridge
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Big Sur Bixby
    'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1200&q=80', // Hollywood hills
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Santa Monica pier
  ],
  'las-vegas': [
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80', // Strip neon
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80', // Bellagio fountains
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // Celebrity dining
    'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200&q=80'  // Helicopter tour
  ],
  'grand-canyon': [
    'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200&q=80', // South Rim
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Horseshoe bend
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80', // Antelope canyon
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80'  // Desert canyon sunset
  ],

  // CANADA
  'banff': [
    'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&q=80', // Moraine Lake
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Lake Louise
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80', // Fairmont Chateau
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80'  // Icefields Parkway
  ],
  'vancouver': [
    'https://images.unsplash.com/photo-1560814304-4f05b62af116?w=1200&q=80', // Waterfront
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Stanley Park
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80', // Capilano bridge
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Sea to Sky
  ],
  'toronto': [
    'https://images.unsplash.com/photo-1507992781348-310259076fa0?w=1200&q=80', // CN Tower skyline
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Niagara Falls
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // St Lawrence Market
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80'  // Distillery district
  ],
  'montreal': [
    'https://images.unsplash.com/photo-1519214605650-76a613ee3245?w=1200&q=80', // Old Montreal
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', // Notre Dame
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // French bistro
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80'  // Mount Royal
  ],

  // GREECE
  'athens': [
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80', // Acropolis
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', // Parthenon pillars
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80', // Plaka street
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Rooftop view
  ],
  'santorini': [
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80', // Oia sunset
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', // Blue domes
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // Catamaran sailing
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80'  // Cave pool suite
  ],
  'mykonos': [
    'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80', // Windmills
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', // Little Venice
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // Beach club
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80'  // White streets
  ],
  'crete': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // Elafonisi beach
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80', // Chania harbor
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80', // Palace Knossos
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80'  // Greek taverna
  ],

  // SOUTHEAST ASIA
  'singapore': [
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80', // Marina Bay Sands
    'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=1200&q=80', // Gardens by the Bay
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80', // Hawker food
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Changi Jewel
  ],
  'bali': [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80', // Tegalalang rice
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80', // Private villa pool
    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=80', // Uluwatu temple
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'  // Beach sunset
  ]
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`))
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => {
        file.close(() => resolve())
      })
    }).on('error', reject)
  })
}

async function run() {
  const tasks = []
  for (const [slug, urls] of Object.entries(galleryMap)) {
    urls.forEach((url, i) => {
      const fileName = `${slug}-${i + 2}.jpg`
      const dest = path.join(targetDir, fileName)
      tasks.push({ slug, fileName, dest, url })
    })
  }

  console.log(`Total gallery images to process: ${tasks.length}`)
  
  // Download with concurrency limit of 5
  const concurrency = 5
  let index = 0

  async function worker() {
    while (index < tasks.length) {
      const current = tasks[index++]
      if (fs.existsSync(current.dest)) {
        console.log(`[Skipping] ${current.fileName} already exists`)
        continue
      }
      try {
        console.log(`[Downloading] ${current.fileName}...`)
        await download(current.url, current.dest)
        console.log(`[Success] ${current.fileName}`)
      } catch (err) {
        console.error(`[Error] Failed ${current.fileName}:`, err.message)
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker())
  await Promise.all(workers)
  console.log('All gallery images processed successfully!')
}

run()
