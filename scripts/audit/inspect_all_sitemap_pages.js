const fs = require('fs');

const allPages = [
  { name: 'home', file: 'old_site_home.html', url: '/' },
  { name: 'mdv', file: 'old_site_mdv.html', url: '/mdv' },
  { name: 'amston', file: 'old_site_amston.html', url: '/amston' },
  { name: 'hunberg', file: 'old_site_hunberg.html', url: '/hunberg' },
  { name: 'dahatsu', file: 'old_site_dahatsu.html', url: '/dahatsu' },
  { name: 'katalogh', file: 'old_site_katalogh.html', url: '/katalogh' },
  { name: 'kontakty', file: 'old_site_kontakty.html', url: '/kontakty' },
  { name: 'uslughi', file: 'old_site_uslughi.html', url: '/uslughi' },
  { name: 'aktsii', file: 'old_site_aktsii.html', url: '/aktsii' },
  { name: 'o_kompanii', file: 'old_site_o_kompanii.html', url: '/o_kompanii' },
  { name: 'novosti', file: 'old_site_novosti.html', url: '/novosti' },
  { name: 'mdvprom', file: 'old_site_mdvprom.html', url: '/mdvprom' }
];

allPages.forEach(p => {
  if (!fs.existsSync(p.file)) return;
  const content = fs.readFileSync(p.file, 'utf8');
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Matches = (content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

  console.log(`\n========================================`);
  console.log(`URL: ${p.url} (File: ${p.file})`);
  console.log(`Title: ${titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : 'N/A'}`);
  console.log(`Description: ${descMatch ? descMatch[1].trim().replace(/\s+/g, ' ') : 'N/A'}`);
  console.log(`H1: ${h1Match ? h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'N/A'}`);
  console.log(`H2s:`, h2Matches.slice(0, 4));
});
