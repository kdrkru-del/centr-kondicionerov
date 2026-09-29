const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1680x1050', width: 1680, height: 1050 },
  { name: '1600x900', width: 1600, height: 900 },
  { name: '1536x864', width: 1536, height: 864 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1280x720', width: 1280, height: 720 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '430x932', width: 430, height: 932 },
  { name: '414x896', width: 414, height: 896 },
  { name: '390x844', width: 390, height: 844 },
  { name: '375x812', width: 375, height: 812 },
  { name: '360x800', width: 360, height: 800 },
];

const PAGES = [
  '/',
  '/catalog',
  '/installation',
  '/selection',
  '/catalog/mdv',
  '/catalog/amston',
  '/catalog/dahatsu',
  '/catalog/hunberg',
  '/catalog/dahatsu-legend-07',
  '/catalog/amston-reykjavik-ash-07',
  '/catalog/mdv-aurora-on-off',
  '/catalog/hunberg-ac-07nb'
];

async function runAudit() {
  const browser = await chromium.launch();
  const screenshotDir = path.join(__dirname, '..', 'audit_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('=== STARTING DEEP RESPONSIVE AUDIT ===\n');

  let allPassed = true;

  // 1. Audit Home First Screen & CTA visibility across required desktop viewports
  console.log('--- AUDITING HERO FIRST SCREEN & CTA VISIBILITY ---');
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    // Check overflow
    const overflowData = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const offenders = [...document.querySelectorAll('*')].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.right > clientW + 1 || rect.left < -1;
      }).map(el => ({ tag: el.tagName, class: el.className, id: el.id, right: Math.round(el.getBoundingClientRect().right) }));
      return { scrollW, clientW, diff: scrollW - clientW, offenders: offenders.slice(0, 3) };
    });

    // Check CTA positions relative to viewport height
    const ctaData = await page.evaluate((vpHeight) => {
      const ctaBtn = document.querySelector('section button, section a[href="/catalog"]');
      const allHeroCtas = [...document.querySelectorAll('section button, section a')].filter(el => 
        el.innerText && (el.innerText.includes('Подобрать кондиционер') || el.innerText.includes('Смотреть каталог'))
      );
      if (allHeroCtas.length === 0) return { found: false };
      const boxes = allHeroCtas.map(el => {
        const r = el.getBoundingClientRect();
        return { text: el.innerText.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), visible: r.bottom <= vpHeight };
      });
      return { found: true, boxes };
    }, vp.height);

    const hasOverflow = overflowData.diff > 0;
    if (hasOverflow) {
      allPassed = false;
      console.error(`[OVERFLOW] ${vp.name}: scrollW=${overflowData.scrollW}, clientW=${overflowData.clientW}, diff=${overflowData.diff}`);
      console.error('Offenders:', overflowData.offenders);
    } else {
      console.log(`[PASS OVERFLOW] ${vp.name}: diff=0px`);
    }

    if (ctaData.found) {
      const allVisible = ctaData.boxes.every(b => b.visible);
      console.log(`[CTA CHECK] ${vp.name} (H:${vp.height}px): ` + ctaData.boxes.map(b => `"${b.text}" bottom=${b.bottom}px (${b.visible ? 'VISIBLE' : 'BELOW FOLD'})`).join(' | '));
      if (!allVisible && vp.width >= 1024) {
        allPassed = false;
        console.error(`[FAIL CTA FOLD] CTA buttons are below viewport fold on ${vp.name}!`);
      }
    }

    // Save screenshots for crucial viewports
    if (['1920x1080', '1536x864', '1366x768', '1280x800', '1280x720', '390x844'].includes(vp.name)) {
      await page.screenshot({ path: path.join(screenshotDir, `home_${vp.name}.png`) });
    }

    await page.close();
  }

  // 2. Audit all other key pages across mobile, tablet, laptop, desktop
  console.log('\n--- AUDITING ALL OTHER PAGES FOR HORIZONTAL OVERFLOW ---');
  const sampleVps = [
    { name: 'desktop_1920', width: 1920, height: 1080 },
    { name: 'laptop_1366', width: 1366, height: 768 },
    { name: 'laptop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'mobile_360', width: 360, height: 800 }
  ];

  for (const pagePath of PAGES) {
    for (const vp of sampleVps) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`http://localhost:3000${pagePath}`, { waitUntil: 'networkidle' });
      const diff = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (diff > 0) {
        allPassed = false;
        const offenders = await page.evaluate(() => {
          const clientW = document.documentElement.clientWidth;
          return [...document.querySelectorAll('*')].filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.right > clientW + 1 || rect.left < -1;
          }).map(el => ({ tag: el.tagName, class: el.className, id: el.id, right: Math.round(el.getBoundingClientRect().right) })).slice(0, 3);
        });
        console.error(`[OVERFLOW] ${pagePath} on ${vp.name}: diff=+${diff}px, offenders:`, offenders);
      }
      await page.close();
    }
    console.log(`[PAGE OK] ${pagePath} checked across 6 viewports`);
  }

  await browser.close();
  console.log(`\n=== AUDIT COMPLETE: ${allPassed ? 'ALL TESTS PASSED PERFECTLY!' : 'FAILURES DETECTED'} ===`);
}

runAudit().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
