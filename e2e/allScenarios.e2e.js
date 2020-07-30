import {pushSelf, SCREEN_TIMES} from './common';

async function gotoHeroDetails() {
  await waitFor(element(by.id('hero-details-0')))
      .toBeVisible()
      .withTimeout(10000);
  await element(by.id('hero-details-0')).tap();
}

describe('Benchmarks', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  async function initContext(context) {
    await waitFor(element(by.id('context')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('context')).typeText(context);
  }

  // beforeAll(async () => {
  //   await initContext('regular');
  //   await element(by.id('clear')).tap();
  // });
  describe('Component Without WebView', () => {
    describe('Push Screen N Times', () => {
      it('measure constructor', async () => {
        await pushSelf('constructor', SCREEN_TIMES);
        await element(by.id('export-constructor')).tap();
      });

      it('measure appear', async () => {
        await pushSelf('appear', SCREEN_TIMES);
        await element(by.id('export-appear')).tap();
      });

      it('measure render', async () => {
        await pushSelf('render', SCREEN_TIMES);
        await element(by.id('export-render')).tap();
      });
    });
  });

  describe('Component With WebView', () => {
    describe('Push Screen N Times', () => {
      it('measure constructor', async () => {
        await gotoHeroDetails();
        await pushSelf('constructor', SCREEN_TIMES);
        await element(by.id('export-constructor')).tap();
      });

      it('measure appear', async () => {
        await gotoHeroDetails();
        await pushSelf('appear', SCREEN_TIMES);
        await element(by.id('export-appear')).tap();
      });

      it('measure render', async () => {
        await gotoHeroDetails();
        await pushSelf('render', SCREEN_TIMES);
        await element(by.id('export-render')).tap();
      });
    });
  })

  describe('Push Screens in Alternate', () => {
    it('measure constructor', async () => {
      for (let i = 0; i < SCREEN_TIMES; i++) {
        await element(by.id('push-other-constructor')).tap();
      }
      await element(by.id('export-constructor')).tap();
    });

    it('measure appear', async () => {
      for (let i = 0; i < SCREEN_TIMES; i++) {
        await element(by.id('push-other-appear')).tap();
      }
      await element(by.id('export-appear')).tap();
    });

    it('measure render', async () => {
      for (let i = 0; i < SCREEN_TIMES; i++) {
        await element(by.id('push-other-render')).tap();
      }
      await element(by.id('export-render')).tap();
    });
  })
});
