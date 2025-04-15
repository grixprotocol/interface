import { Page } from '@playwright/test';

import { AssetPriceGetResponse } from '../../src/api';

export const mockAssetsAPI = async (page: Page, response: AssetPriceGetResponse) => {
  await page.route('*/**/assetprice*', async (route) => {
    await route.fulfill({ json: response });
  });
};
