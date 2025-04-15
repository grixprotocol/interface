import { Locator } from '@playwright/test';

import { StepperNumberInputDriver } from './StepperNumberInput.driver';

export class CurrencyDropdownDriver {
  readonly container: Locator;
  readonly stepperDriver: StepperNumberInputDriver;

  constructor(locator: Locator) {
    this.container = locator.getByTestId('currency-dropdown');
    this.stepperDriver = new StepperNumberInputDriver(locator);
  }

  getSelectedOption() {
    return this.container.getByTestId('selected-option');
  }

  async setSelectedOption(value: string) {
    await this.container.getByTestId('currency-dropdown-menu-button').click();
    await this.container.getByTestId(`currency-dropdown-option-${value}`).click();
  }

  getStepperValue() {
    return this.stepperDriver.getValue();
  }

  clickAddButton() {
    return this.stepperDriver.getPlusButton().click();
  }

  clickMinusButton() {
    return this.stepperDriver.getMinusButton().click();
  }
}
