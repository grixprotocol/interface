import { UnorderedList } from '@chakra-ui/react';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { useHandleKeyboard } from '../hooks/useHandleKeyboard';
import { useObserver } from '../hooks/useObserver';
import { OPTION_ID, PickerData } from '../types';
import { WheelPickerItem } from './WheelPickerItem';

const calculateSpaceHeight = (height: number, itemHeight: number): number => {
  const limit = height / itemHeight / 2 - 0.5;
  return itemHeight * limit;
};

export type WheelPickerProps = {
  options: PickerData[];
  value: string;
  onChange: (value: string) => void;
  height: number;
  itemHeight: number;
  titleID?: string;
  titleText?: string;
  required?: boolean;
  width?: number;
};

export const WheelPicker = forwardRef<WheelPickerRef, WheelPickerProps>(
  ({ options, value, onChange, height, itemHeight, titleID, titleText, width, required }, ref) => {
    const [controlledValue, setControlledValue] = useState(value);
    const handleChange = useCallback(
      (value: string) => {
        setControlledValue(value);
        onChange(value);
      },
      [onChange]
    );
    const { onKeyUp, onKeyPress } = useHandleKeyboard(itemHeight);
    const { root, refs, onFocus } = useObserver(options, value, itemHeight, handleChange);
    const styles = useMemo(
      () => ({
        color: '#ffffff40',
        activeColor: '#fff',
        fontSize: 16,
        width: width ?? '100%',
      }),
      [width]
    );

    const spaceHeight = useMemo(() => calculateSpaceHeight(height, itemHeight), [itemHeight, height]);

    useEffect(() => {
      if (value !== controlledValue) {
        setControlledValue(value);
        const newValueOffsetTop = refs[value].current?.offsetTop;
        if (newValueOffsetTop && root.current) {
          root.current.scrollTo(0, newValueOffsetTop - spaceHeight);
        }
      }
    }, [controlledValue, value, refs, root, spaceHeight]);

    const handleOnClick = useCallback(
      (e: React.MouseEvent<HTMLLIElement>) => {
        if (root.current) {
          root.current.scrollTo(0, e.currentTarget.offsetTop - spaceHeight);
        }
      },
      [root, spaceHeight]
    );

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          root.current && root.current.focus();
        },
        blur: () => {
          root.current && root.current.blur();
        },
      }),
      [root]
    );

    return (
      <UnorderedList
        tabIndex={0}
        role="listbox"
        aria-labelledby={titleID}
        aria-label={titleText}
        aria-required={required}
        data-testid="wheel-picker"
        aria-activedescendant={`${OPTION_ID}${value}`}
        ref={root}
        height={height}
        width="full"
        onKeyUp={onKeyUp}
        onKeyDown={onKeyPress}
        overflowY="scroll"
        willChange="transform"
        m={0}
      >
        <div style={{ height: spaceHeight }} />
        {options.map((item) => (
          <WheelPickerItem
            key={item.value}
            {...item}
            {...styles}
            height={itemHeight}
            isSelected={value === item.value}
            onClick={handleOnClick}
            onFocus={onFocus}
            ref={refs[item.value]}
          />
        ))}
        <div style={{ height: spaceHeight }} />
      </UnorderedList>
    );
  }
);

export type WheelPickerRef = {
  focus: () => void;
  blur: () => void;
};
