const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  ['минут', 'скрыт', 'доплат', 'базов', 'политик'].forEach(word => {
    const idx = content.indexOf(word);
    if (idx !== -1) {
      console.log(`Found "${word}" in ${f} at index ${idx}: ${content.substring(idx - 50, idx + 50)}`);
    } else {
      console.log(`Not found "${word}" in ${f}`);
    }
  });
});
