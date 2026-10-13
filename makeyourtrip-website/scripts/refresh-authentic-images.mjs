import fs from 'fs'
import path from 'path'
import https from 'https'
import crypto from 'crypto'

const targetDir = path.resolve('public/images/destinations')

// 1. Clean obsolete / irrelevant files
const obsoleteFiles = ['bath.jpg', 'los-angeles.jpg', 'miami.jpg']
obsoleteFiles.forEach(file => {
  const p = path.join(targetDir, file)
  if (fs.existsSync(p)) {
    fs.unlinkSync(p)
    console.log(`[Cleaned irrelevant file] ${file}`)
  }
})

// 36 sub-destinations with 5 distinct landmark topics each (180 total)
const destinationsMap = {
  // JAPAN
  'tokyo': [
    'Tokyo_Tower',
    'Senso-ji',
    'Shibuya_Crossing',
    'Shinjuku',
    'Odaiba'
  ],
  'kyoto': [
    'Kinkaku-ji',
    'Fushimi_Inari-taisha',
    'Arashiyama',
    'Gion',
    'Kiyomizu-dera'
  ],
  'osaka': [
    'Osaka_Castle',
    'Dotonbori',
    'Shinsekai',
    'Shitennō-ji',
    'Umeda_Sky_Building'
  ],
  'mount-fuji': [
    'Mount_Fuji',
    'Lake_Kawaguchi',
    'Lake_Ashi',
    'Hakone,_Kanagawa',
    'Chureito_Pagoda'
  ],

  // ITALY
  'rome': [
    'Colosseum',
    'Trevi_Fountain',
    'Pantheon,_Rome',
    'St._Peter\'s_Basilica',
    'Piazza_Navona'
  ],
  'florence': [
    'Florence_Cathedral',
    'Ponte_Vecchio',
    'Uffizi',
    'Piazzale_Michelangelo',
    'Piazza_del_Duomo,_Florence'
  ],
  'venice': [
    'Grand_Canal_(Venice)',
    'Piazza_San_Marco',
    'Doge\'s_Palace',
    'Rialto_Bridge',
    'Burano'
  ],
  'amalfi-coast': [
    'Positano',
    'Amalfi',
    'Ravello',
    'Capri',
    'Faraglioni'
  ],

  // UNITED KINGDOM
  'london': [
    'Tower_Bridge',
    'Big_Ben',
    'Buckingham_Palace',
    'Westminster_Abbey',
    'Tower_of_London'
  ],
  'edinburgh': [
    'Edinburgh_Castle',
    'Royal_Mile',
    'Palace_of_Holyroodhouse',
    'Arthur\'s_Seat',
    'Victoria_Street,_Edinburgh'
  ],
  'scottish-highlands': [
    'Glenfinnan_Viaduct',
    'Loch_Ness',
    'Glen_Coe',
    'Eilean_Donan',
    'Old_Man_of_Storr'
  ],
  'bath-cotswolds': [
    'Roman_Baths_(Bath)',
    'Royal_Crescent',
    'Castle_Combe',
    'Bibury',
    'Bath_Abbey'
  ],

  // FRANCE
  'paris': [
    'Eiffel_Tower',
    'Louvre',
    'Arc_de_Triomphe',
    'Notre-Dame_de_Paris',
    'Montmartre'
  ],
  'french-riviera': [
    'Promenade_des_Anglais',
    'Èze',
    'Monaco',
    'Monte_Carlo_Casino',
    'Cannes'
  ],
  'provence': [
    'Sénanque_Abbey',
    'Gordes',
    'Roussillon,_Vaucluse',
    'Palais_des_Papes',
    'Verdon_Gorge'
  ],
  'bordeaux': [
    'Place_de_la_Bourse,_Bordeaux',
    'Saint-Émilion',
    'Château_Margaux',
    'Dune_of_Pilat',
    'Pont_de_pierre_(Bordeaux)'
  ],

  // SWITZERLAND
  'zurich': [
    'Grossmünster',
    'Lake_Zurich',
    'Fraumünster_Church',
    'Lindenhof_(Zurich)',
    'Bahnhofstrasse'
  ],
  'lucerne': [
    'Chapel_Bridge',
    'Mount_Pilatus',
    'Lake_Lucerne',
    'Lion_Monument',
    'Mount_Rigi'
  ],
  'interlaken': [
    'Jungfraujoch',
    'Lauterbrunnen',
    'Grindelwald',
    'Lake_Brienz',
    'Harder_Kulm'
  ],
  'zermatt': [
    'Matterhorn',
    'Gornergrat',
    'Zermatt',
    'Riffelsee',
    'Klein_Matterhorn'
  ],

  // UAE
  'dubai': [
    'Burj_Khalifa',
    'Burj_Al_Arab',
    'Palm_Jumeirah',
    'Dubai_Mall',
    'Dubai_Miracle_Garden'
  ],
  'abu-dhabi': [
    'Sheikh_Zayed_Grand_Mosque',
    'Louvre_Abu_Dhabi',
    'Emirates_Palace',
    'Qasr_Al_Watan',
    'Ferrari_World_Abu_Dhabi'
  ],

  // UNITED STATES
  'new-york': [
    'Central_Park',
    'Times_Square',
    'Brooklyn_Bridge',
    'Statue_of_Liberty',
    'Empire_State_Building'
  ],
  'california-coast': [
    'Golden_Gate_Bridge',
    'Bixby_Creek_Bridge',
    'Rodeo_Drive',
    'Santa_Monica_Pier',
    'Carmel-by-the-Sea,_California'
  ],
  'las-vegas': [
    'Las_Vegas_Strip',
    'Bellagio_(resort)',
    'Hoover_Dam',
    'Fremont_Street_Experience',
    'Red_Rock_Canyon_National_Conservation_Area'
  ],
  'grand-canyon': [
    'Grand_Canyon',
    'Antelope_Canyon',
    'Horseshoe_Bend_(Arizona)',
    'Havasu_Falls',
    'Mather_Point'
  ],

  // CANADA
  'banff': [
    'Moraine_Lake',
    'Lake_Louise_(Alberta)',
    'Peyto_Lake',
    'Fairmont_Banff_Springs_Hotel',
    'Columbia_Icefield'
  ],
  'vancouver': [
    'Stanley_Park',
    'Capilano_Suspension_Bridge',
    'Granville_Island',
    'Gastown',
    'Whistler_Blackcomb'
  ],
  'toronto': [
    'CN_Tower',
    'Niagara_Falls',
    'Distillery_District',
    'Casa_Loma',
    'Toronto_Islands'
  ],
  'montreal': [
    'Notre-Dame_Basilica_(Montreal)',
    'Old_Montreal',
    'Mount_Royal',
    'Saint_Joseph\'s_Oratory',
    'Montreal_Botanical_Garden'
  ],

  // GREECE
  'athens': [
    'Parthenon',
    'Erechtheion',
    'Acropolis_Museum',
    'Temple_of_Olympian_Zeus,_Athens',
    'Plaka'
  ],
  'santorini': [
    'Oia,_Greece',
    'Fira',
    'Imerovigli',
    'Akrotiri_(prehistoric_city)',
    'Nea_Kameni'
  ],
  'mykonos': [
    'Mykonos_windmills',
    'Little_Venice,_Mykonos',
    'Delos',
    'Panagia_Paraportiani',
    'Psarrou'
  ],
  'crete': [
    'Knossos',
    'Elafonisi',
    'Chania',
    'Balos_Lagoon',
    'Rethymno'
  ],

  // SOUTHEAST ASIA
  'singapore': [
    'Marina_Bay_Sands',
    'Gardens_by_the_Bay',
    'Jewel_Changi_Airport',
    'Sentosa',
    'Chinatown,_Singapore'
  ],
  'bali': [
    'Uluwatu_Temple',
    'Tanah_Lot',
    'Tegallalang_Rice_Terraces',
    'Tirta_Empul_Temple',
    'Ubud_Monkey_Forest'
  ]
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MakeYourTripBot/2.0 (travel@makeyourtripinc.com)' } }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MakeYourTripBot/2.0 (travel@makeyourtripinc.com)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
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

async function getImageUrlForTopic(topic) {
  // Strategy 1: Direct title query with redirects
  const directUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(topic)}&prop=pageimages&pithumbsize=1280&redirects=1&format=json`
  try {
    const data = await fetchJson(directUrl)
    const pages = Object.values(data.query?.pages || {})
    for (const p of pages) {
      if (p.thumbnail?.source) {
        return p.thumbnail.source
      }
    }
  } catch {}

  // Strategy 2: Generator search query
  const cleanSearch = topic.replace(/_/g, ' ')
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(cleanSearch)}&gsrlimit=1&prop=pageimages&pithumbsize=1280&format=json`
  try {
    const data = await fetchJson(searchUrl)
    const pages = Object.values(data.query?.pages || {})
    for (const p of pages) {
      if (p.thumbnail?.source) {
        return p.thumbnail.source
      }
    }
  } catch {}

  return null
}

async function run() {
  console.log('--- STARTING AUTHENTIC LANDMARK IMAGE REFRESH FOR 36 DESTINATIONS ---')
  const entries = Object.entries(destinationsMap)
  let downloadedCount = 0
  let skippedCount = 0
  let failedCount = 0

  for (const [slug, topics] of entries) {
    console.log(`\nProcessing destination: ${slug} (5 topics)`)
    for (let idx = 0; idx < topics.length; idx++) {
      const topic = topics[idx]
      const fileSuffix = idx === 0 ? '' : `-${idx + 1}`
      const fileName = `${slug}${fileSuffix}.jpg`
      const dest = path.join(targetDir, fileName)

      try {
        const thumbUrl = await getImageUrlForTopic(topic)
        if (thumbUrl) {
          await downloadFile(thumbUrl, dest)
          const stats = fs.statSync(dest)
          console.log(`  [OK] ${fileName} (${Math.round(stats.size / 1024)} KB) <= ${topic}`)
          downloadedCount++
        } else {
          console.warn(`  [MISSING URL] ${fileName} for ${topic}`)
          failedCount++
        }
      } catch (err) {
        console.error(`  [ERR] ${fileName} (${topic}): ${err.message}`)
        failedCount++
      }

      // Small delay between requests to be polite
      await new Promise(r => setTimeout(r, 150))
    }
  }

  console.log(`\nDownload summary: ${downloadedCount} downloaded, ${failedCount} failed`)

  // --- DUPLICATE & INTEGRITY AUDIT ---
  console.log('\n--- EXECUTING MD5 INTEGRITY AND DUPLICATE AUDIT ---')
  const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.jpg'))
  const hashes = {}
  const duplicates = {}

  for (const f of files) {
    const buf = fs.readFileSync(path.join(targetDir, f))
    const hash = crypto.createHash('md5').update(buf).digest('hex')
    if (!hashes[hash]) {
      hashes[hash] = [f]
    } else {
      hashes[hash].push(f)
      duplicates[hash] = hashes[hash]
    }
  }

  const dupGroups = Object.keys(duplicates)
  if (dupGroups.length === 0) {
    console.log(`SUCCESS: All ${files.length} images are unique with 0 duplicates!`)
  } else {
    console.warn(`WARNING: Found ${dupGroups.length} duplicate hash groups:`)
    for (const [h, list] of Object.entries(duplicates)) {
      console.warn(`  Hash ${h}: ${list.join(', ')}`)
    }
  }

  // Check expected count
  const expectedTotal = 36 * 5
  console.log(`Total destination images present: ${files.length} / ${expectedTotal}`)
}

run()
