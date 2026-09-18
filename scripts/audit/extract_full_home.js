const fs = require('fs');

const home = fs.readFileSync('old_site_home.html', 'utf8');

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const idxSteps = home.indexOf('Как мы работаем');
if (idxSteps !== -1) {
  console.log(clean(home.substring(idxSteps, idxSteps + 15000)));
}
