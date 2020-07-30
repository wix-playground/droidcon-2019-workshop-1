import {SCREEN_TIMES} from "./common";

describe('Component With WebView', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  async function initContext(context) {
    await waitFor(element(by.id('context')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('context')).typeText(context);
  }

  beforeAll(async () => {
    await initContext('alternate');
    await element(by.id('clear')).tap();
  });

  describe.only('Push Screens in Alternate', () => {
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
  });
});
