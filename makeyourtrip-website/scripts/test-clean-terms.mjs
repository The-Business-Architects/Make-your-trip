import fs from 'fs';
import path from 'path';

const bannedWords = ['36 destinations', 'curated', '36 hubs'];
let violations = 0;

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        scan(full);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')) {
      const c = fs.readFileSync(full, 'utf-8');
      bannedWords.forEach((term) => {
        const regex = new RegExp(`\\\\b${term}\\\\b`, 'gi');
        const matches = c.match(regex);
        if (matches) {
          console.error(`[Violation] "${term}" in ${full}`);
          violations++;
        }
      });
      // Check for emoji
      const emojiMatch = c.match(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u);
      if (emojiMatch) {
        console.error(`[Violation] Emoji "${emojiMatch[0]}" in ${full}`);
        violations++;
      }
    }
  }
}

scan('src');
console.log(`Scan finished. Total violations: ${violations}`);
if (violations > 0) process.exit(1);
