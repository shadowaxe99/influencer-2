const puppeteer = require('puppeteer');

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setViewport({width: 1200, height: 800});
  await page.keyboard.press('Enter');
  await page.screenshot({path: 'screenshot.png', fullPage: true});
  await browser.close();
}

takeScreenshot('https://elysium-experience.vercel.app');