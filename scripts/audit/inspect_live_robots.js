const http = require('http');

http.get('http://localhost:3000/robots.txt', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('=== ROBOTS.TXT CONTENT ===');
    console.log(data);
  });
});
