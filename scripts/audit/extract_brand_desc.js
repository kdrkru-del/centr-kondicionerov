const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=================== FILE: ${f} ===================`);
  
  // Find all paragraphs or div texts mentioning brands
  const brandRegex = /(MDV|Amston|Hunberg|Dahatsu)[^<>\n\r]{10,200}/gi;
  const matches = content.match(brandRegex) || [];
  [...new Set(matches)].slice(0, 10).forEach(m => console.log(' * ' + m.trim()));
});
