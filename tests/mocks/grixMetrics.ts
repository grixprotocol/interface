import { Page } from '@playwright/test';

export const mockGrixMetricsAPI = async (page: Page, data = {}) => {
  await page.route('**/api/grix-metrics', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        graphStatistics: {
          uniqueUserCount: 100,
          totalEthFees: '1000',
          totalNotionalValue: '1000000',
          totalTransactions: 500,
          numberOfRefundFromProtocolTransactions: 50,
          numberOfOrderLimitTransactions: 200,
          numberOfExerciseTransactions: 100,
          numberOfBuyOptionTransactions: 150,
        },
        integratedProtocolsList: ['protocol1', 'protocol2'],
        availableMarket: ['market1', 'market2', 'market3'],
        graphTokens: [
          {
            totalPurchases: 750,
            totalFeePaidByToken: 100,
          },
          {
            totalPurchases: 500,
            totalFeePaidByToken: 75,
          },
        ],
        ...data,
      }),
    });
  });
};
