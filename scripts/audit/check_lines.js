const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=== FILE: ${f} ===`);
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('базов') || line.includes('стандартн') || line.includes('доплат') || line.includes('минут') || line.includes('политик')) {
      console.log(`  Line ${idx}: ${line.trim().substring(0, 120)}`);
    }
  });
});
