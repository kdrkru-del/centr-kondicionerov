const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=================== FILE: ${f} ===================`);
  
  // Find all h1, h2, h3, h4
  const headings = content.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
  console.log('--- HEADINGS ---');
  headings.forEach(h => {
    const text = h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(' * ' + text);
  });
});
