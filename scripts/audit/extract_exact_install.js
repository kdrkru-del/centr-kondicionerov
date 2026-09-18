const fs = require('fs');

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

['old_site_o_kompanii.html', 'old_site_uslughi.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n================== FULL ${f} ==================`);
  console.log(clean(content).substring(0, 3000));
});
