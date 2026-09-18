const http = require('http');

const testUrls = [
  '/',
  '/catalog',
  '/installation',
  '/selection',
  '/artem',
  '/ussuriysk',
  '/catalog/mdv',
  '/catalog/amston',
  '/catalog/dahatsu',
  '/catalog/hunberg',
  '/catalog/dahatsu-legend-07'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const descMatch = data.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
        const h1Matches = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
        const canonicalMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
        
        resolve({
          url,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1].trim() : 'NONE',
          descLen: descMatch ? descMatch[1].length : 0,
          h1Count: h1Matches.length,
          h1: h1Matches.length > 0 ? h1Matches[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE',
          canonical: canonicalMatch ? canonicalMatch[1] : 'NONE'
        });
      });
    });
  });
}

(async () => {
  console.log('=== METADATA & H1 LIVE AUDIT ===');
  for (const u of testUrls) {
    const res = await checkUrl(u);
    console.log(`\nURL: ${res.url} [HTTP ${res.status}]`);
    console.log(`  Title: ${res.title}`);
    console.log(`  Desc Length: ${res.descLen} chars`);
    console.log(`  H1 (count: ${res.h1Count}): ${res.h1}`);
    console.log(`  Canonical: ${res.canonical}`);
  }
})();
