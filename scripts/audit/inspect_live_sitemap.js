const http = require('http');

http.get('http://localhost:3000/sitemap.xml', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const locs = data.match(/<loc>([\s\S]*?)<\/loc>/g) || [];
    console.log(`Total URLs in sitemap.xml: ${locs.length}`);
    locs.forEach((loc, i) => {
      console.log(`  ${i + 1}. ${loc.replace(/<\/?loc>/g, '')}`);
    });
  });
});
