import {pushSelf, SCREEN_TIMES} from "./common";

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
  //   await initContext('regular');
  //   await element(by.id('clear')).tap();
  // });

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
