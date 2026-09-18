const http = require('http');

http.get('http://localhost:3000/catalog', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Includes <h1: ', data.includes('<h1'));
    console.log('Includes Suspense: ', data.includes('CatalogLoading') || data.includes('animate-pulse'));
    console.log('HTML snippet around h1:', data.substring(data.indexOf('Кондиционеры с установкой') - 50, data.indexOf('Кондиционеры с установкой') + 100));
  });
});
