import 'jest';

import {
  defineFeature,
  loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./feature/features/routeDetails.feature');
const puppeteer = require('puppeteer')
let browser = null;
let page = null;

defineFeature(feature, test => {

  beforeEach(async () => {
    jest.setTimeout(1200000);
  });

  test('Quiero ver los detalles de una ruta', ({ given, when,and, then }) => {
    
    given('Soy un usuario intentando ver los detalles de una ruta', async () => {
        browser = await puppeteer.launch({
            headless: false
          })
        
          page = await browser.newPage()
          await page.goto("http://localhost:3000/#/login", {
            waitUntil: 'networkidle2'
          });
    
          
          await page.waitForSelector(".sc-EHOje.cffgrt");
          await page.type(".sc-EHOje.cffgrt", "https://fakeadri.solid.community/profile/card#me");
    
          await page.evaluate(() => {
            let btns = [...document.querySelectorAll("button")];
            btns.forEach(function (btn) {
              if (btn.innerText == "Iniciar sesión"){
                btn.click();
              }
                
            });
          });
    
          await page.waitForNavigation({
            waitUntil: 'networkidle2'
          });
    
          await page.waitForSelector("[id='username']", {visible: true});
          await page.type("[id='username']", "fakeAdri");
    
          await page.waitFor(500);
          await page.waitForSelector("[id='password']", {visible: true});
          await page.type("[id='password']", "9FakeAdri9*", {visible: true});
    
          await page.waitFor(500);
    
          await page.evaluate(() => {
            let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
            btns.forEach(function (btn) {
              if (btn.innerText == "Log In")
                btn.click();
            });
          });
    
          await page.waitForNavigation({
            waitUntil: 'networkidle2'
          });
    
          expect(page.url()).toBe("http://localhost:3000/#/welcome")

    });

    when('abro la página de detalles', async () => {
        await page.goto("http://localhost:3000/#/route-details?routeId=https://fakeadri.solid.community/public/viade/2053335278.ttl", {
          waitUntil: 'networkidle2'
        });

    });

    then('veo los detalles', async () => {
        await page.waitFor(1000);
        await page.waitForSelector("[id='tituloRuta']", {visible: true});
        await page.waitForSelector("[id='tituloHito']", {visible: true});
        await page.waitForSelector("[id='hitos']", {visible: true});
      });
  });
});