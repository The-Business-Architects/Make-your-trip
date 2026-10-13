import fs from 'fs';
import path from 'path';

const goldColors = ['#c9a84c', '#dba92e', '#8f6812', '--color-accent'];
let violations = 0;

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        scan(full);
      }
    } else if (f.endsWith('.css') || f.endsWith('.tsx') || f.endsWith('.ts')) {
      const c = fs.readFileSync(full, 'utf-8');
      const lines = c.split('\n');
      lines.forEach((line, idx) => {
        // Look for color properties with gold values
        if (line.includes('color:') || line.includes('color :')) {
          goldColors.forEach((gc) => {
            if (line.includes(gc)) {
              console.error(`[Gold Text Violation] ${full}:${idx + 1} -> ${line.trim()}`);
              violations++;
            }
          });
        }
      });
    }
  }
}

scan('src');
console.log(`Gold text scan finished. Total violations: ${violations}`);
if (violations > 0) process.exit(1);
