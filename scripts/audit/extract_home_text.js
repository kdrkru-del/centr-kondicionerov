const fs = require('fs');

const home = fs.readFileSync('old_site_home.html', 'utf8');

// Find all text blocks in body
const stripped = home
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ');

fs.writeFileSync('home_plain_text.txt', stripped, 'utf8');
console.log('Plain text saved. Length:', stripped.length);

// Let us inspect lines
const lines = stripped.split(/(?<=[.!?])\s+/);
console.log('Total sentences:', lines.length);

const keywords = ['гарант', 'монтаж', 'установ', 'выезд', 'оплат', 'скидк', 'доплат', 'минут', 'под ключ', 'базов', 'стандарт', 'договор', 'владивосток', 'уссурийск', 'артем', 'артём', 'час'];

keywords.forEach(kw => {
  const found = lines.filter(l => l.toLowerCase().includes(kw));
  console.log(`\n--- Keyword: "${kw}" (${found.length}) ---`);
  [...new Set(found)].slice(0, 5).forEach(f => console.log(' * ' + f.trim()));
});
