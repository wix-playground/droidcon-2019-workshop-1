const SCREEN_TIMES = 20;

async function gotoHeroDetails() {
  await waitFor(element(by.id('hero-details-0')))
      .toBeVisible()
      .withTimeout(10000);
  await element(by.id('hero-details-0')).tap();
}

function wait(time = 4000) {
  return new Promise((res) => {
    setTimeout(() => res(), time)
  })
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

  beforeAll(async () => {
    await initContext('webview');
    await element(by.id('clear')).tap();
  });

  describe('Push Screen N Times', () => {
    it('measure constructor', async () => {
      await gotoHeroDetails();
      for (let i = 0; i < SCREEN_TIMES; i++) {
        await element(by.id('push-self-constructor')).tap();
      }
      await element(by.id('export-constructor')).tap();
    });

    it('measure appear', async () => {
      await gotoHeroDetails();
      for (let i = 0; i < SCREEN_TIMES; i++) {
        await element(by.id('push-self-appear')).tap();
      }
      await element(by.id('export-appear')).tap();
    });

    it('measure render', async () => {
      await gotoHeroDetails();
      for (let i = 0; i < SCREEN_TIMES; i++) {
        await element(by.id('push-self-render')).tap();
      }
      await element(by.id('export-render')).tap();
    });
  });
});
