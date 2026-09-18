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
console.log('Searching fetch(/api/lead) in', files.length, 'files...');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('/api/lead') && !f.includes('route.ts')) {
    console.log(`\nFile: ${f}`);
    // Check catch block or fetch handling
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('fetch(') || line.includes('catch') || line.includes('setIsSuccess') || line.includes('response.ok')) {
        console.log(`  Line ${idx + 1}: ${line.trim()}`);
      }
    });
  }
});
