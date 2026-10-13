import fs from 'fs';

const content = fs.readFileSync('src/data/destinations.ts', 'utf-8');
const prefix = 'export const destinationsData: Destination[] = ';
const idx = content.indexOf(prefix);
if (idx !== -1) {
  const jsonStr = content.slice(idx + prefix.length).trim();
  const data = JSON.parse(jsonStr);
  console.log(`Successfully parsed destinationsData! Total: ${data.length}`);
  
  let issues = 0;
  data.forEach((d) => {
    if (d.gallery.length !== 5) {
      console.log(`${d.slug} has ${d.gallery.length} gallery items`);
      issues++;
    }
    if (d.faqs.length < 5) {
      console.log(`${d.slug} has only ${d.faqs.length} FAQs`);
      issues++;
    }
    if (d.highlights.length < 3) {
      console.log(`${d.slug} has only ${d.highlights.length} highlights`);
      issues++;
    }
  });
  console.log(`Validation completed. Issues: ${issues}`);
} else {
  console.log('Prefix not found');
}
