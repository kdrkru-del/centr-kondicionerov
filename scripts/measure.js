const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1228, height: 700 } });
  await page.goto('https://центр-кондиционеров.рф', { waitUntil: 'networkidle' });
  const data = await page.evaluate(() => {
    const header = document.querySelector('header > div');
    const logo = header.children[0];
    const nav = header.children[1];
    const contacts = header.children[2];
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), w: Math.round(r.width), right: Math.round(r.right) };
    };
    return {
      windowWidth: window.innerWidth,
      header: rect(header),
      logo: rect(logo),
      nav: rect(nav),
      contacts: rect(contacts),
      scrollWidth: document.documentElement.scrollWidth
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await page.screenshot({ path: 'current_view.png' });
  await browser.close();
})();
