const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  ['базов', 'стандартн', 'трасс', 'кронштейн', 'вакуум', 'доплат', '10 минут', 'политик', 'конфиденц', 'персональн'].forEach(term => {
    const regex = new RegExp(`([^.\n\r<>{};]{0,40}${term}[^.\n\r<>{};]{0,40})`, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      console.log(`[${f}] "${term}" matches:`, matches.slice(0, 3));
    }
  });
});
