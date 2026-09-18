const http = require('http');

http.get('http://localhost:3000/compare', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const robotsMeta = data.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    console.log('/compare robots meta tag:', robotsMeta ? robotsMeta[1] : 'NOT FOUND');
  });
});
