const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('src');
console.log(`Checking ${files.length} ts/tsx files for legacy links...`);

const legacyPatterns = [
  'href="/mdv"',
  'href="/amston"',
  'href="/dahatsu"',
  'href="/hunberg"',
  'href="/catalog/brand',
  '/catalog/brand/',
  'href="/katalogh"',
  'href="/uslughi"',
  'href="/aktsii"',
  'href="/kontakty"'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  legacyPatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.log(`[ALERT] ${f} contains legacy pattern: "${pattern}"`);
    }
  });
});
console.log('Search finished.');
