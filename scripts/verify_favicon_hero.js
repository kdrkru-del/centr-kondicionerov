const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const icons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('link[rel*="icon"]')).map(el => ({
      rel: el.rel,
      href: el.href,
      type: el.type,
      sizes: el.getAttribute('sizes')
    }));
  });
  console.log('FAVICONS IN DOM:', JSON.stringify(icons, null, 2));

  const heroImage = await page.evaluate(() => {
    const img = document.querySelector('section img');
    return {
      src: img ? img.src : null,
      naturalWidth: img ? img.naturalWidth : null,
      naturalHeight: img ? img.naturalHeight : null,
      clientWidth: img ? img.clientWidth : null,
      clientHeight: img ? img.clientHeight : null,
      visible: !!img && img.naturalWidth > 0
    };
  });
  console.log('HERO IMAGE:', JSON.stringify(heroImage, null, 2));

  if (!fs.existsSync('audit_screenshots')) {
    fs.mkdirSync('audit_screenshots');
  }

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: 'audit_screenshots/hero_restored_1920x1080.png', clip: { x: 0, y: 0, width: 1920, height: 800 } });

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.screenshot({ path: 'audit_screenshots/hero_restored_1366x768.png', clip: { x: 0, y: 0, width: 1366, height: 768 } });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'audit_screenshots/hero_restored_390x844.png', clip: { x: 0, y: 0, width: 390, height: 900 } });

  console.log('Screenshots saved successfully!');
  await browser.close();
})();
