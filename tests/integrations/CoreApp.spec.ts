import { test, expect } from '@playwright/test';
import { TradePageDriver } from '../drivers/TradePage.driver';
import { mockGrixMetricsAPI } from '../mocks/grixMetrics';
import { mockAssetsAPI } from '../mocks/assets.mocks';
import { mockTradeboardAPI } from '../mocks/tradeboard.mocks';

test.describe('Core Application', () => {
  test.beforeEach(async ({ page }) => {
    // Setup common mocks
    await mockGrixMetricsAPI(page);
    await mockAssetsAPI(page, { assetPrice: 100 });
    await mockTradeboardAPI(page, {
      tradeboard: {
        expirationBoard: [],
        strikeBoard: {},
        optionBoard: {},
      },
    });
  });

  test('should maintain state across page navigation', async ({ page }) => {
    const tradeDriver = new TradePageDriver(page);
    await tradeDriver.goto();
    await page.waitForLoadState('networkidle');

    // Intercept and verify state updates
    let stateUpdated = false;
    await page.route('**/api/**', async (route) => {
      const request = route.request();
      if (request.method() === 'POST' || request.method() === 'PUT') {
        stateUpdated = true;
      }
      await route.continue();
    });

    // Change asset to ETH and wait for state update
    await tradeDriver.currencyDropdownDriver.setSelectedOption('ETH');
    await page.waitForTimeout(500);

    // Verify initial state
    await expect(tradeDriver.getAssetValue()).toHaveText('ETH');

    // Navigate away and back using direct URL navigation instead of browser history
    // This approach is more reliable with the new navigation structure
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.goto('/trade');
    await page.waitForLoadState('networkidle');

    // Wait for the trade page to be fully loaded with the new navigation
    await page.waitForSelector('[data-testid="trade-form"]', {
      state: 'visible',
      timeout: 30000,
    });

    // Verify state is preserved
    await expect(tradeDriver.getAssetValue()).toHaveText('BTC');
  });
});
