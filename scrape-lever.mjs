import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://jobs.lever.co/palantir/4314646005', { waitUntil: 'domcontentloaded' });
  const content = await page.innerText('body');
  console.log(content);
  await browser.close();
})();
