import { Text } from '@chakra-ui/react';
import React, { FocusEventHandler, forwardRef, MouseEventHandler } from 'react';

import { OPTION_ID } from '../types';

export type WheelPickerItemProps = {
  value: string;
  isSelected: boolean;
  label: string | number;
  height: number;
  color: string;
  activeColor: string;
  fontSize: number;
  onClick?: MouseEventHandler;
  onFocus?: FocusEventHandler;
};

export const WheelPickerItem = forwardRef<HTMLLIElement, WheelPickerItemProps>(
  ({ value, label, isSelected, height, color, activeColor, onClick, onFocus }, ref) => (
    <li
      role="option"
      aria-selected={isSelected}
      aria-label={label.toString()}
      ref={ref}
      id={`${OPTION_ID}${value}`}
      data-testid={`${OPTION_ID}${value}`}
      data-itemid={value}
      data-itemvalue={label}
      style={{ height }}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={0}
    >
      <Text color={isSelected ? activeColor : color} fontSize={isSelected ? 20 : 16} textAlign="center">
        {label}
      </Text>
    </li>
  )
);
