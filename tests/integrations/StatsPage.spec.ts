/*
import { test, expect } from '@playwright/test';
import { StatsPageDriver } from '../drivers/StatsPage.driver';
import { mockGrixMetricsAPI } from '../mocks/grixMetrics';

const VISUAL_DELAY = 1000; // 1 second delay for visual feedback

test.describe('StatsPage', () => {
  test.beforeEach(async ({ page }) => {
    await mockGrixMetricsAPI(page);
  });

  test('should render stats page with header', async ({ page, browserName }) => {
    const driver = new StatsPageDriver(page);
    await driver.goto();
    await expect(driver.getPageContent()).toBeVisible();
    await expect(page.url()).toContain('/stats');

    // Add delay in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }
  });

  test('should display correct metrics from API', async ({ page, browserName }) => {
    const driver = new StatsPageDriver(page);
    await driver.goto();

    await expect(driver.getNotionalVolume()).toBeVisible();
    await expect(driver.getUniqueUsers()).toBeVisible();
    await expect(driver.getProtocolsIntegrated()).toBeVisible();
    await expect(driver.getMarketsIntegrated()).toBeVisible();

    // Add delay in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }
  });

  test('should navigate to trade page when clicking trade button', async ({ page, browserName }) => {
    const driver = new StatsPageDriver(page);
    await driver.goto();

    // Add delay before click in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }

    await driver.getTradeButton().click();
    await expect(page.url()).toContain('/trade');

    // Add delay after navigation in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }
  });

  test('should navigate to integrations page when clicking view all integrations', async ({ page, browserName }) => {
    const driver = new StatsPageDriver(page);
    await driver.goto();

    // Add delay before click in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }

    await driver.getIntegrationsButton().click();
    await expect(page.url()).toContain('/integrations');

    // Add delay after navigation in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }
  });

  test('should handle API error gracefully', async ({ page, browserName }) => {
    await page.route(/api/grix-metrics', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    const driver = new StatsPageDriver(page);
    await driver.goto();

    // Should still render the page structure
    await expect(driver.getPageContent()).toBeVisible();
    // Loading states should be visible for metrics
    await expect(page.locator('dl').filter({ hasText: 'Loading...Notional Volume' })).toBeVisible();
    await expect(page.locator('dl').filter({ hasText: 'Loading...Unique users' })).toBeVisible();

    // Add delay in headed mode
    if (process.env.PWTEST_CLI_HEADED) {
      await page.waitForTimeout(VISUAL_DELAY);
    }
  });
});
*/
