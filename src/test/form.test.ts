import faker from 'faker';
import puppeteer from 'puppeteer';

const APP = 'https://infra.akirymedia.com/test/login';


const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'login12344',
  message: faker.random.words(),
};

let page: any;
let browser: any;
const width = 1200;
const height = 1200;


beforeAll(async () => {
  jest.setTimeout(5 * 60 * 1000);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(APP);
  await page.waitForSelector('form');
});

// afterAll(() => {
//   browser.close();
// });


describe('Contact form', () => {

  test('lead can submit a contact request', async () => {
    await page.waitForSelector('input[name=email]');
    await page.click('input[name=email]');
    await page.type('input[name=email]', lead.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', lead.password);
    await page.click('button[class=login-btn]');
    await page.waitForSelector('.mat-snack-bar-container');
  }, 120 * 1000);
});
