const fs = require('fs');

const home = fs.readFileSync('old_site_home.html', 'utf8');

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// 1. All steps in "Как мы работаем"
const idxSteps = home.indexOf('Как мы работаем');
if (idxSteps !== -1) {
  console.log('=== FULL "КАК МЫ РАБОТАЕМ" ===');
  console.log(clean(home.substring(idxSteps, idxSteps + 3500)));
}

// 2. Full "Почему мы устанавливаем только свои кондиционеры?"
const idxWhy = home.indexOf('Почему мы устанавливаем');
if (idxWhy !== -1) {
  console.log('\n=== FULL "ПОЧЕМУ МЫ УСТАНАВЛИВАЕМ" ===');
  console.log(clean(home.substring(idxWhy, idxWhy + 2000)));
}

// 3. Dahatsu page prices and installation
const dahatsu = fs.readFileSync('old_site_dahatsu.html', 'utf8');
const idxDah = dahatsu.indexOf('Цены на товары и услуги');
if (idxDah !== -1) {
  console.log('\n=== DAHATSU PRICES SECTION ===');
  console.log(clean(dahatsu.substring(idxDah, idxDah + 2500)));
}
