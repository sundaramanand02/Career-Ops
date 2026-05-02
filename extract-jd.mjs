import { chromium } from 'playwright';

async function extractJD(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text);
  await browser.close();
}

extractJD(process.argv[2]);
