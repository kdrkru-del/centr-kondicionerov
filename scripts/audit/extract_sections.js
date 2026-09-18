const fs = require('fs');

const home = fs.readFileSync('old_site_home.html', 'utf8');

// Search for "Как мы работаем" block
const idx = home.indexOf('Как мы работаем');
if (idx !== -1) {
  const slice = home.substring(idx - 100, idx + 2500);
  console.log('--- КАК МЫ РАБОТАЕМ ---');
  console.log(slice.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Search for "Почему мы устанавливаем только свои кондиционеры"
const idx2 = home.indexOf('Почему мы устанавливаем');
if (idx2 !== -1) {
  const slice2 = home.substring(idx2 - 100, idx2 + 2500);
  console.log('\n--- ПОЧЕМУ МЫ УСТАНАВЛИВАЕМ ТОЛЬКО СВОИ КОНДИЦИОНЕРЫ ---');
  console.log(slice2.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Search for "Мы являемся сертифицированными дилерами"
const idx3 = home.indexOf('сертифицированными дилерами');
if (idx3 !== -1) {
  const slice3 = home.substring(idx3 - 100, idx3 + 1500);
  console.log('\n--- ДИЛЕРЫ / БРЕНДЫ ---');
  console.log(slice3.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}
