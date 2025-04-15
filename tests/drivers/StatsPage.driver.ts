import { Page } from '@playwright/test';

export class StatsPageDriver {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('/stats');
  }

  getPageContent() {
    return this.page.locator('text=Grix protocol stats');
  }

  getNotionalVolume() {
    return this.page.locator('text=Notional Volume').first();
  }

  getUniqueUsers() {
    return this.page.locator('text=Unique users').first();
  }

  getProtocolsIntegrated() {
    return this.page.locator('text=Options protocols integrated').first();
  }

  getMarketsIntegrated() {
    return this.page.locator('text=Options markets integrated').first();
  }

  getTradeButton() {
    return this.page.locator('button:has-text("Trade")').first();
  }

  getIntegrationsButton() {
    return this.page.locator('button:has-text("View All Integrations")').first();
  }
}
