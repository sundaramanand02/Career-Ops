import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instahyre.com/jobs-at-razorpay/', { waitUntil: 'domcontentloaded' });
  
  // Wait a bit for JS to render the jobs
  await page.waitForTimeout(2000);
  
  // Extract job links
  const links = await page.$$eval('a', as => as.map(a => ({ text: a.innerText, href: a.href })));
  const target = links.find(l => l.text.includes('SDE') && l.text.includes('Backend') && l.text.includes('Razorpay'));
  
  if (target) {
    console.log('Found URL:', target.href);
    await page.goto(target.href, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const text = await page.evaluate(() => document.body.innerText);
    console.log('---JD_START---');
    console.log(text);
    console.log('---JD_END---');
  } else {
    console.log('Target job not found on the page. Available links with "SDE" or "Backend":');
    console.log(links.filter(l => l.text.includes('SDE') || l.text.includes('Backend') || l.text.includes('Engineer')));
  }
  
  await browser.close();
})();
