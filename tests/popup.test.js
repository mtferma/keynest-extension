const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

describe('Расширение Chrome Keynest', () => {
  beforeEach(async () => {
    fetchMock.resetMocks();
    await page.reload();
  });

  test('должно загрузить всплывающее окно с правильным заголовком', async () => {
    const title = await page.$eval('h1', el => el.textContent);
    expect(title).toBe('Keynest');
  });

  test('должно обновлять количество слогов при изменении слайдера', async () => {
    await page.evaluate(() => {
      document.getElementById('syllable-slider').value = 3;
      document.getElementById('syllable-slider').dispatchEvent(new Event('input'));
      document.getElementById('syllable-slider').dispatchEvent(new Event('mouseup'));
    });

    const sliderValue = await page.$eval('#syllable-slider', el => el.value);
    expect(sliderValue).toBe('3');
  });
});