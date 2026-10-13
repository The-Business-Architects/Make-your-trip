import fs from 'fs'
import path from 'path'
import https from 'https'

const images = [
  { slug: 'kyoto', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80' },
  { slug: 'osaka', url: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1200&q=80' },
  { slug: 'mount-fuji', url: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=1200&q=80' },
  { slug: 'rome', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80' },
  { slug: 'florence', url: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&q=80' },
  { slug: 'venice', url: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1200&q=80' },
  { slug: 'amalfi-coast', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80' },
  { slug: 'edinburgh', url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80' },
  { slug: 'scottish-highlands', url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=80' },
  { slug: 'bath', url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80' },
  { slug: 'french-riviera', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80' },
  { slug: 'provence', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80' },
  { slug: 'bordeaux', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80' },
  { slug: 'zurich', url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&q=80' },
  { slug: 'lucerne', url: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1200&q=80' },
  { slug: 'interlaken', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80' },
  { slug: 'zermatt', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80' },
  { slug: 'abu-dhabi', url: 'https://images.unsplash.com/photo-1512632570417-a6096a607374?w=1200&q=80' },
  { slug: 'las-vegas', url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80' },
  { slug: 'grand-canyon', url: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200&q=80' },
  { slug: 'banff', url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&q=80' },
  { slug: 'vancouver', url: 'https://images.unsplash.com/photo-1559511260-66a65e09b245?w=1200&q=80' },
  { slug: 'montreal', url: 'https://images.unsplash.com/photo-1519178173574-e8b263375836?w=1200&q=80' },
  { slug: 'athens', url: 'https://images.unsplash.com/photo-1555993539-1732b37996c0?w=1200&q=80' },
  { slug: 'santorini', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80' },
  { slug: 'mykonos', url: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80' },
  { slug: 'crete', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80' },
  { slug: 'bali', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80' },
]

const targetDir = path.resolve('public/images/destinations')

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
  console.log(`Starting download of ${images.length} images...`)
  for (const item of images) {
    const dest = path.join(targetDir, `${item.slug}.jpg`)
    if (fs.existsSync(dest)) {
      console.log(`[Skipping] ${item.slug}.jpg already exists`)
      continue
    }
    try {
      console.log(`[Downloading] ${item.slug}.jpg...`)
      await download(item.url, dest)
      console.log(`[Success] ${item.slug}.jpg`)
    } catch (err) {
      console.error(`[Error] Failed to download ${item.slug}:`, err.message)
    }
  }
  console.log('Finished downloading images!')
}

run()
