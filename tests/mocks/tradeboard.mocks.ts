import { Page } from '@playwright/test';

import { TradeboardResponse } from '@/api/tradeboard/types';

export const mockTradeboardAPI = async (page: Page, { tradeboard }: { tradeboard: TradeboardResponse }) => {
  await page.route('*/**/tradeboard*', async (route) => {
    await route.fulfill({
      json: tradeboard,
    });
  });
};
