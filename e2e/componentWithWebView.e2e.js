import {pushSelf, SCREEN_TIMES} from "./common";

async function gotoHeroDetails() {
  await waitFor(element(by.id('hero-details-0')))
      .toBeVisible()
      .withTimeout(10000);
  await element(by.id('hero-details-0')).tap();
}

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

  // beforeAll(async () => {
  //   await initContext('webview');
  //   await element(by.id('clear')).tap();
  // });

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

});
