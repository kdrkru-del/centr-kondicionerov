const fs = require('fs');

function clean(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

['old_site_o_kompanii.html', 'old_site_uslughi.html', 'old_site_mdvprom.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n================== ${f} ==================`);
  const bodyMatch = content.match(/<body[\s\S]*?<\/body>/i);
  if (bodyMatch) {
    const text = clean(bodyMatch[0]);
    console.log(text.substring(0, 1000));
  }
});
