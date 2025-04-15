import { Locator } from '@playwright/test';

export class WheelPickerDriver {
  readonly container: Locator;

  constructor(locator: Locator) {
    this.container = locator.getByTestId('wheel-picker');
  }

  getItems() {
    return this.container.locator('li');
  }
}
