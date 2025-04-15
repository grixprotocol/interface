import { test, expect } from '@playwright/test';
import { TradePageDriver } from '../drivers/TradePage.driver';

test.describe('TradePage', () => {
  test('should load app and show options', async ({ page }) => {
    const driver = new TradePageDriver(page);

    await driver.goto();
    await expect(driver.getPageContent()).toBeVisible();
    await expect(driver.page.url()).toContain('/trade');

    await expect(driver.getStrikePickerItems().first()).toBeVisible();
    await expect(driver.getExpirationPickerItems().first()).toBeVisible();
    await expect(driver.getStrikeSpotValue()).toBeVisible();
    await expect(driver.getSuggestionBadge()).toBeVisible();

    await expect(driver.getQuotePriceListItem()).toBeVisible();
    await expect(driver.getQuotePricePNLGraph()).toBeVisible();
  });
});
