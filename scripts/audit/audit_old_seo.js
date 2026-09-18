const fs = require('fs');

const files = ['old_site_home.html', 'old_site_mdv.html', 'old_site_amston.html', 'old_site_hunberg.html', 'old_site_dahatsu.html'];

console.log('=== ANALYZING OLD SITE URLS, METRICS, SCRIPTS ===');

const allUrls = new Set();
const ymIds = new Set();
const gaIds = new Set();

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // 1. Titles, Descriptions, H1s
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  
  console.log(`\n--- File: ${file} ---`);
  console.log('Title:', titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : 'N/A');
  console.log('Desc:', descMatch ? descMatch[1].trim().replace(/\s+/g, ' ') : 'N/A');
  console.log('H1:', h1Match ? h1Match[1].trim().replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ') : 'N/A');

  // 2. All internal href links
  const hrefs = content.match(/href=["']([^"']+)["']/gi) || [];
  hrefs.forEach(h => {
    const val = h.replace(/href=["']/i, '').replace(/["']$/, '').trim();
    if (!val.startsWith('tel:') && !val.startsWith('mailto:') && !val.startsWith('javascript:') && !val.startsWith('#')) {
      allUrls.add(val);
    }
  });

  // 3. Yandex Metrika ID (ym(XXXXXX, "init" or mc.yandex.ru/watch/XXXXXX)
  const ymMatches = content.match(/ym\((\d+)|watch\/(\d+)|w\.yaCounter(\d+)/gi) || [];
  ymMatches.forEach(m => ymIds.add(m));

  // 4. Google Analytics / Tag Manager
  const gaMatches = content.match(/G-[A-Z0-9]+|UA-\d+-\d+|GTM-[A-Z0-9]+/gi) || [];
  gaMatches.forEach(m => gaIds.add(m));
});

console.log('\n=== ALL DISCOVERED INTERNAL URLS / LINKS ===');
console.log([...allUrls].sort());

console.log('\n=== YANDEX METRIKA IDS FOUND ===');
console.log([...ymIds]);

console.log('\n=== GA / GTM IDS FOUND ===');
console.log([...gaIds]);
