const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  // We test on screen width 1536 (user full screen resolution) and 1228 (125% zoom or windowed)
  for (const w of [1200, 1228, 1280, 1366, 1440, 1536]) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('https://центр-кондиционеров.рф', { waitUntil: 'networkidle' });
    const cta = await page.$('header button:has-text("Консультация")');
    let ctaRight = null;
    if (cta) {
      const box = await cta.boundingBox();
      ctaRight = box ? Math.round(box.x + box.width) : null;
    }
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`w=${w}: scrollWidth=${scrollW}, ctaRight=${ctaRight}, cutOff=${ctaRight ? ctaRight > w : 'no'}`);
    await page.close();
  }
  await browser.close();
})();
