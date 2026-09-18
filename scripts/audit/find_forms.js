const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const forms = content.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log(`\nFile ${f}: found ${forms.length} forms`);
  forms.forEach((form, idx) => {
    const text = form.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`  Form ${idx + 1}: ${text.substring(0, 300)}`);
  });
});
