const fs = require('fs');

const home = fs.readFileSync('old_site_home.html', 'utf8');

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const idxWhy = home.indexOf('Почему мы устанавливаем');
if (idxWhy !== -1) {
  console.log(clean(home.substring(idxWhy, idxWhy + 6000)));
}
