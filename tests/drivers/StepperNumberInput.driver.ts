import { Locator } from '@playwright/test';

export class StepperNumberInputDriver {
  readonly container: Locator;

  constructor(locator: Locator) {
    this.container = locator.getByTestId('stepper-number-input');
  }

  getValue() {
    return this.container.locator('input');
  }

  getPlusButton() {
    return this.container.getByTestId('stepper-number-input-add-btn');
  }

  getMinusButton() {
    return this.container.getByTestId('stepper-number-input-subtract-btn');
  }
}
