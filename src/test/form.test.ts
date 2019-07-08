import faker from 'faker';
import puppeteer from 'puppeteer';
import logger from '../core/logger';

const APP = 'https://infra.akirymedia.com/test/login';
const PROFILE = 'https://infra.akirymedia.com/test/profile';
const UPLOAD = 'https://infra.akirymedia.com/test/profile/videos/upload';
const INVITATIONS = 'https://infra.akirymedia.com/test/invitation-artist';
let invalidString: string = 'aasdasdasdasdasdasdaadADAdADaADASDADADASSDADADADASDASDADASSDASSDA' +
  'SSDASDASDASDASDASDASDASADASSDASDASDASDASDASDASDASDASDASDASDASDASDASAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'login12344',
  message: faker.random.words(),
};
//User Curator Jane
const jane = {
  name: 'Jane Doe',
  email: 'me@janeroe.com',
  password: 'jane1234',
};

//User Artist John
const john = {
  name: 'John Doe',
  email: 'john@mrdoe.com',
  password: 'john1234',
};


//Email
let email: string;


let page: any;
let browser: any;
const width = 900;
const height = 900;


beforeAll(async () => {
  jest.setTimeout(100 * 1000);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  logger.info('Testes Ortvi');
  await page.goto(APP, {
    timeout: 5 * 30000,
    waitUntil: 'domcontentloaded',
  });
});


//Cases


//FN01
describe('Test FN01 - Login', () => {

  test('CT02 - Login Com Email Incorreto', async () => {
    logger.info('CT02');
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.click('input[name=email]');
    await page.type('input[name=email]', lead.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', lead.password);
    const [button] = await page.$x('//button[contains(., \'LOGIN\')]');
    if (button) {
      await button.click();
    }
    await page.waitForSelector('.mat-snack-bar-container');
  }, 40 * 1000);


  test('CT03 - Login Com Senha Incorreta', async () => {
    logger.info('CT03');
    await page.reload();
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.click('input[name=email]');
    await page.type('input[name=email]', jane.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', lead.password);
    const [button] = await page.$x('//button[contains(., \'LOGIN\')]');
    if (button) {
      await button.click();
    }
    await page.waitForSelector('.mat-snack-bar-container');
  }, 40 * 1000);


  test('CT01 - Login Correto', async () => {
    logger.info('CT01');
    await page.reload();
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.click('input[name=email]');
    await page.type('input[name=email]', jane.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', jane.password);
    const [button] = await page.$x('//button[contains(., \'LOGIN\')]');
    if (button) {
      await button.click();
    }
    await page.waitForSelector('app-home-page');
  }, 40 * 1000);
});


//FN02
describe('Test FN02 - Subscribe To Information', () => {
  email = lead.email;
  test('CT04 - Inscrição Com Email Valido', async () => {
    logger.info('CT04');
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.waitForSelector('.subscribe-btn');
    await page.click('.subscribe-btn');
    await page.waitForSelector('.mat-card');
    const box = await page.$('div.box');
    const emailInput = await box.$('input[name="email"]');
    await emailInput.type(email);
    const [buttonSend] = await page.$x('//button[contains(., "SEND")]');
    if (buttonSend) {
      await buttonSend.click();
    }
    await page.waitForSelector('.alert-body');
  }, 40 * 1000);

  test('CT05 - Inscrição Com Email Invalido', async () => {
    logger.info('CT05');
    await page.reload();
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.waitForSelector('.subscribe-btn');
    await page.click('.subscribe-btn');
    await page.waitForSelector('.mat-card');
    const box = await page.$('div.box');
    const emailInput = await box.$('input[name="email"]');
    await emailInput.type('login123.com');
    const [buttonSend] = await page.$x('//button[contains(., "SEND")]');
    if (buttonSend) {
      await buttonSend.click();
    }
    await page.$('div.ng-star-inserted');
  }, 40 * 1000);

  test('CT06 - Inscrição Reenviando Email', async () => {
    logger.info('CT06');
    await page.reload();
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.waitForSelector('.subscribe-btn');
    await page.click('.subscribe-btn');
    await page.waitForSelector('.mat-card');
    const box = await page.$('div.box');
    const emailInput = await box.$('input[name="email"]');
    await emailInput.type(email);
    const [buttonSend] = await page.$x('//button[contains(., "SEND")]');
    if (buttonSend) {
      await buttonSend.click();
    }
    await page.waitForSelector('.mat-snack-bar-container');
  }, 40 * 1000);
});


//FN03

describe('Test FN03 - Edit Profile', () => {
  beforeEach(async () => {
    logger.info('CT01');
    await page.reload();
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.click('input[name=email]');
    await page.type('input[name=email]', jane.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', jane.password);
    const [button] = await page.$x('//button[contains(., \'LOGIN\')]');
    if (button) {
      await button.click();
    }
    await page.waitForSelector('app-home-page');
    await page.goto(PROFILE, {
      timeout: 5 * 30000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector('mat-tab-group',
      {
        visible: true,
      });
  });

  test('CT07 - Editar Perfil', async () => {
    logger.info('CT07');
    await page.waitForSelector('app-editable-profile', {
      visible: true,
      timeout: 3 * 3000,
    });
    const profile = await page.$('app-editable-profile');
    await page.waitForSelector('div.information-box', {
      visible: true,
      timeout: 3 * 3000,
    });
    const divInfo = await profile.$('div.information-box');
    const [editBtn] = await divInfo.$x('//button[contains(., "EDIT")]');
    await editBtn.click();
    await page.waitForSelector('div.profile-box-right.col-xs.padding-reset.ng-star-inserted', {
      visible: true,
      timeout: 3 * 3000,
    });
    const form = await page.$('div.profile-box-right.col-xs.padding-reset.ng-star-inserted');
    const info = await form.$('div.information-box');
    const divName = await info.$('div.div-inpt');
    const nameInput = await divName.$('input');
    await nameInput.type('Jane New Name');
    const cityInput = await info.$('input[placeholder="City"]');
    await cityInput.type('New York');
    const selectCountry = await info.$('select[id="categoryType"]');
    await selectCountry.click();
    await page.select('#categoryType', 'Brazil');
    const [buttonSave] = await info.$x('//button[contains(., "SAVE")]');
    if (buttonSave) {
      await buttonSave.click();
    }
  }, 40 * 1000);

  test('CT08 - Editar Perfil - Invalido', async () => {
    logger.info('CT08');
    page.reload();
    await page.waitForSelector('app-editable-profile', {
      visible: true,
      timeout: 3 * 3000,
    });
    const profile = await page.$('app-editable-profile');
    await page.waitForSelector('div.information-box', {
      visible: true,
      timeout: 3 * 3000,
    });
    const divInfo = await profile.$('div.information-box');
    const [editBtn] = await divInfo.$x('//button[contains(., "EDIT")]');
    await editBtn.click();
    await page.waitForSelector('div.profile-box-right.col-xs.padding-reset.ng-star-inserted', {
      visible: true,
      timeout: 3 * 3000,
    });
    const form = await page.$('div.profile-box-right.col-xs.padding-reset.ng-star-inserted');
    const info = await form.$('div.information-box');
    const divName = await info.$('div.div-inpt');
    const nameInput = await divName.$('input');
    await nameInput.type(invalidString);
    const cityInput = await info.$('input[placeholder="City"]');
    await cityInput.type(invalidString);
    const [buttonSave] = await info.$x('//button[contains(., "SAVE")]');
    if (buttonSave) {
      await buttonSave.click();
    }

  }, 40 * 1000);
});


//FN04

describe('Test FN04 - Upload Video', () => {
  beforeEach(async () => {
    logger.info('CT01');
    await page.reload();
    await page.waitForSelector('form', {
      visible: true,
    });
    await page.click('input[name=email]');
    await page.type('input[name=email]', john.email);
    await page.click('input[name=password]');
    await page.type('input[name=password]', john.password);
    const [button] = await page.$x('//button[contains(., \'LOGIN\')]');
    if (button) {
      await button.click();
    }
    await page.waitForSelector('app-home-page');
    await page.goto(UPLOAD, {
      timeout: 5 * 30000,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector('app-upload-video-art',
      {
        visible: true,
      });
    await page.waitForSelector('app-guide-upload',
      {
        visible: true,
      });
    const [buttonOk] = await page.$x('//button[contains(., \'OK\')]');
    if (buttonOk) {
      await buttonOk.click();
    }
  });

  test('CT09 - Upload sem Informações', async () => {
    logger.info('CT09');
    await page.waitForSelector('app-upload-video-art', {
      visible: true,
      timeout: 3 * 3000,
    });
    await page.$('div.form-upload-video');

    await page.$x('//button[contains(., \'CHOOSE FILE\')]');
    const input = await page.$('input[type="file"]');
    await input.uploadFile('src/test/Flowers - 7924.mp4');
    const inputTitle = await page.$('input[placeholder="Title"]');
    await inputTitle.type('Ai desgraça');
    await page.select('#categoryType', 'Video');

    const [buttonReview] = await page.$x('//button[contains(., \'REVIEW\')]');
    await buttonReview.click();
    await page.waitForSelector('div.errorBoxBoundary');

  }, 40 * 1000);


  test('CT10 - Upload Com Informações', async () => {
    logger.info('CT09');
    await page.waitForSelector('app-upload-video-art', {
      visible: true,
      timeout: 3 * 3000,
    });
    await page.$('div.form-upload-video');
    await page.$x('//button[contains(., \'CHOOSE FILE\')]');
    const input = await page.$('input[type="file"]');
    await input.uploadFile('src/test/Flowers - 7924.mp4');
    const inputTitle = await page.$('input[placeholder="Title"]');
    await inputTitle.type('Ai desgraça');
    await page.select('#categoryType', 'Video');
    await page.select('#categoryType', '2016');
    const [buttonReview] = await page.$x('//button[contains(., \'REVIEW\')]');
    await buttonReview.click();
    await page.waitForSelector('app-approve-work-art'); //APPROVE WORK

  }, 40 * 1000);
  
});
