const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

console.log('=== SEARCHING OLD SITE CONTENT ===');

const terms = [
  '76-11-61', '761161', '205-56-62', '2055662', '706-11-61', '7061161',
  'whatsapp', 'wa.me', 'telegram', 't.me', '@', 'gmail.com', 'mail',
  'без выходных', '8:00', '21:00', 'режим работы', 'график',
  '10 минут', 'минут',
  'скрытых', 'доплат', 'платежей',
  'базов', 'стандартн', 'монтаж', 'установк',
  'трасс', 'кронштейн', 'вакуум', 'дренаж', 'бурен',
  'надёжн', 'надежн',
  'выезд в день', 'в день обращения',
  'предоплат', 'после выполнения', 'по факту', 'после установки',
  'гаранти', '4 года', '3 года', '5 лет',
  'политик', 'персональн'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  console.log(`\n>>> File: ${file} (length: ${content.length})`);
  
  // Extract all tel: and mailto: and wa.me and t.me
  const links = content.match(/href=["'](tel:[^"']+|mailto:[^"']+|https?:\/\/(?:wa\.me|t\.me)[^"']+)["']/gi) || [];
  const uniqueLinks = [...new Set(links)];
  console.log('  Contact links:', uniqueLinks);

  // Search specific terms
  terms.forEach(term => {
    const regex = new RegExp(`([^.\n\r<>{};]{0,50}${term}[^.\n\r<>{};]{0,50})`, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      const sample = matches.slice(0, 3).map(m => m.trim().replace(/\s+/g, ' '));
      console.log(`  Term "${term}" found (${matches.length} matches):`, sample);
    }
  });
});
