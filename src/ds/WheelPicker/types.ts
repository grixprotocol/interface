import { RefObject } from 'react';

export const OPTION_ID = 'wheel-picker-option-';

export type PickerItemRef = { [key: string]: RefObject<HTMLLIElement> };

export type PickerData = {
  value: string;
  label: string | number;
};
