const http = require('http');

http.get('http://localhost:3000/catalog/non-existing-product-xyz', (res) => {
  console.log('Status code for random slug:', res.statusCode);
  res.resume();
});
