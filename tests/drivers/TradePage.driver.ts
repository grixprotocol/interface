import { Page } from '@playwright/test';

import { ExpirationType, PositionTypes, SupportedAsset, TradeOptionType } from '@/api/types';

import { CurrencyDropdownDriver } from './CurrencyDropdown.driver';
import { WheelPickerDriver } from './WheelPicker.driver';

export class TradePageDriver {
  readonly page: Page;
  readonly currencyDropdownDriver: CurrencyDropdownDriver;

  constructor(page: Page) {
    this.page = page;
    this.currencyDropdownDriver = new CurrencyDropdownDriver(this.getPageContent());
  }

  async goto({
    asset,
    optionType,
    tradeType,
    positionType,
  }: {
    asset?: SupportedAsset;
    optionType?: TradeOptionType;
    tradeType?: ExpirationType;
    positionType?: PositionTypes;
  } = {}) {
    const queryParams = new URLSearchParams();
    if (asset) queryParams.set('asset', asset);
    if (optionType) queryParams.set('optionType', optionType.toString());
    if (tradeType) queryParams.set('tradeType', tradeType);
    if (positionType) queryParams.set('positionType', positionType);

    // Navigate directly to the trade page URL
    await this.page.goto(`/trade?${queryParams.toString()}`);

    // Wait for navigation to complete and page to be stable
    await this.page.waitForLoadState('networkidle');

    // Ensure the trade page content is visible before proceeding
    await this.page.waitForSelector('[data-testid="trade-form"]', {
      state: 'visible',
      timeout: 30000,
    });
  }

  getPageContent() {
    return this.page.getByTestId('trade-form');
  }

  getStrikeSpotValue() {
    return this.page.getByTestId('strike-price-picker').getByTestId('spot-value');
  }

  getStrikePickerItems() {
    const wheelPickerDriver = new WheelPickerDriver(this.page.getByTestId('strike-price-picker'));
    return wheelPickerDriver.getItems();
  }

  getExpirationPickerItems() {
    const wheelPickerDriver = new WheelPickerDriver(this.page.getByTestId('expiration-date-picker'));
    return wheelPickerDriver.getItems();
  }

  getQuotePriceListItem() {
    return this.page.getByTestId('quote-price-list-item');
  }

  getQuotePricePNLGraph() {
    return this.page.locator('.recharts-responsive-container');
  }

  getAssetValue() {
    return this.currencyDropdownDriver.getSelectedOption();
  }

  getSuggestionBadge() {
    return this.page.getByTestId('suggestion-badge');
  }
}
