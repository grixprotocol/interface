import { test, expect } from '@playwright/test';
import { TradePageDriver } from '../drivers/TradePage.driver';
import { mockAssetsAPI, mockTradeboardAPI } from '../mocks';
import { SupportedAsset, UnderlyingAsset } from '@/api/types';

test.describe('TradePage', () => {
  test.beforeEach(async ({ page }) => {
    await mockAssetsAPI(page, { assetPrice: 100 });
    await mockTradeboardAPI(page, {
      tradeboard: {
        expirationBoard: ['1939928400000'],
        strikeBoard: {
          '1939928400000': ['2400.00'],
        },
        optionBoard: {
          '1939928400000': {
            '2400.00': [
              {
                optionId: 1,
                contractPrice: '100',
                marketName: 'derive',
                strikePrice: '200.00',
                expirationDate: new Date().getTime(),
                optionType: 'call',
                positionType: 'long',
                priceType: 'ask',
                asset: UnderlyingAsset.BTC,
                availableContractAmount: '5',
              },
            ],
          },
        },
      },
    });
  });

  test('should render trade page on index', async ({ page }) => {
    const driver = new TradePageDriver(page);

    await driver.goto();
    await expect(driver.getPageContent()).toBeVisible();
    await expect(driver.page.url()).toContain('/trade');
  });

  test('should render strike spot', async ({ page }) => {
    await mockAssetsAPI(page, { assetPrice: 123 });

    const driver = new TradePageDriver(page);
    await driver.goto();
    await expect(driver.getStrikeSpotValue()).toHaveText('$123');
  });

  /* test('should render protocol list and graph on mount', async ({ page }) => {
    const driver = new TradePageDriver(page);
    await driver.goto();

    await expect(driver.getQuotePriceListItem()).toBeVisible();
  });*/

  test('should change underlying asset from dropdown', async ({ page }) => {
    const driver = new TradePageDriver(page);
    await driver.goto();

    await expect(driver.getAssetValue()).toHaveText('BTC');

    await driver.currencyDropdownDriver.setSelectedOption('ETH');

    await expect(driver.getAssetValue()).toHaveText('ETH');
  });

  test.describe('URL Query params', () => {
    test('should show default form values without QP', async ({ page }) => {
      const driver = new TradePageDriver(page);
      await driver.goto();

      await expect(driver.getAssetValue()).toHaveText('BTC');
    });
    test('should set underlying asset based on asset QP', async ({ page }) => {
      const driver = new TradePageDriver(page);
      await driver.goto({ asset: SupportedAsset.ETH });

      await expect(driver.getAssetValue()).toHaveText('ETH');
    });
  });
});
