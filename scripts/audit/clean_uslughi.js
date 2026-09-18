const fs = require('fs');

const content = fs.readFileSync('old_site_uslughi.html', 'utf8');

// Strip tags and scripts
const text = content
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ');

console.log('=== USLUGHI TEXT ===');
console.log(text.substring(0, 2500));
