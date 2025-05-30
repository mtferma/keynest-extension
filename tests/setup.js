const puppeteer = require('puppeteer');
const path = require('path');

jest.setTimeout(30000);

beforeAll(async () => {
  const extensionPath = path.resolve(__dirname, '..');
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  page = await browser.newPage();
  await page.goto('chrome-extension://jjnfcamjoippelecgkcnokdikgjdlllg/popup.html');
});

afterAll(async () => {
  await browser.close();
});