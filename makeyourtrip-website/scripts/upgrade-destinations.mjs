// scripts/upgrade-destinations.mjs
import fs from 'fs';
import path from 'path';

// Load landmark definitions and build rich destination objects
import { destinationsMaster } from './destinations-data-source.mjs';

console.log('Loaded destinationsMaster:', destinationsMaster.length);

const outputFilePath = path.resolve('src/data/destinations.ts');

const fileHeader = `export interface LandmarkGalleryItem {
  src: string
  name: string
  caption: string
  alt: string
}

export interface DestinationHighlight {
  title: string
  desc: string
  image: string
  alt: string
}

export interface ItineraryDay {
  day: string
  title: string
  description: string
}

export interface DestinationFAQ {
  question: string
  answer: string
}

export interface Destination {
  slug: string
  name: string
  country: string
  region: 'Europe' | 'Asia' | 'Americas' | 'Middle East'
  heroTitle: string
  heroSubtitle: string
  idealDuration: string
  bestSeason: string
  visaSupport: string
  overview: string[]
  tags: string[]
  gallery: LandmarkGalleryItem[]
  highlights: DestinationHighlight[]
  sampleItinerary: {
    title: string
    days: ItineraryDay[]
  }
  faqs: DestinationFAQ[]
  image: string
}

export function getDestinationGallery(slug: string): string[] {
  return [
    \`/images/destinations/\${slug}.jpg\`,
    \`/images/destinations/\${slug}-2.jpg\`,
    \`/images/destinations/\${slug}-3.jpg\`,
    \`/images/destinations/\${slug}-4.jpg\`,
    \`/images/destinations/\${slug}-5.jpg\`,
  ]
}

export const destinationsData: Destination[] = `;

const fileContent = fileHeader + JSON.stringify(destinationsMaster, null, 2) + '\n';

fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
console.log('Successfully wrote upgraded destinationsData to src/data/destinations.ts');
