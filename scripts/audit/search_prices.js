const fs = require('fs');
const path = require('path');

const targetPrices = ['18000', '29000', '32900', '33000', '35000', '42000', '48000'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = walk('src');
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  targetPrices.forEach(price => {
    if (content.includes(price)) {
      console.log(`File: ${file} contains "${price}"`);
    }
  });
});
