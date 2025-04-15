/* eslint-disable */
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { SupportedAsset } from '@/api';

import { useTradeForm } from '../../pages/TradePage/components/TradeFormProvider';

export type StepperNumberInput = {
  inputLabel?: string;
  value: string;
  onChange: (value: string) => void;
  onStepperClick: (value: string, action: 'plus' | 'minus') => void;
  isInputDisabled?: boolean;
  gap?: StackProps['gap'];
  formatValue?: (val: string) => string;
  parseValue?: (val: string) => string;
} & NumberInputProps;

export const StepperNumberInput = ({
  inputLabel,
  value,
  onChange,
  onStepperClick,
  isInputDisabled,
  gap,
  parseValue = (val: string) => val,
  formatValue = (val) => val,
  ...rest
}: StepperNumberInput) => {
  const handleChange = (val: string) => {
    onChange(parseValue(val));
  };
  const { asset } = useTradeForm();
  const tooltipLabel =
    'Enter the size as a number with up to two decimal places (e.g., 1.25). Use the buttons to adjust: sizes greater than 0.1 change by 0.1 per click, while sizes less than 0.1 change by 0.01. The minimum size is 0.01.';

  return (
    <HStack gap={gap} pl={4} pr={4} justify="center" data-testid="stepper-number-input">
      <IconButton
        color="gray.400"
        border="1px solid"
        borderColor="gray.500"
        isRound
        aria-label="Subtract"
        data-testid="stepper-number-input-subtract-btn"
        size="sm"
        variant="secondary"
        icon={<Icon as={MinusIcon} boxSize={2} />}
        onClick={() => onStepperClick(value, 'minus')}
      />
      <VStack gap={0}>
        <Tooltip label={tooltipLabel}>
          {inputLabel && (
            <Box color="gray.500" fontWeight="500" fontSize="12px">
              {inputLabel}
            </Box>
          )}
        </Tooltip>
        {isInputDisabled && (
          <Text pl={4} pr={4} color="base.white" fontWeight="600">
            {formatValue(value)}
          </Text>
        )}
        {!isInputDisabled && (
          <NumberInput
            size="xs"
            variant="naked"
            value={formatValue(value)}
            onChange={handleChange}
            {...rest}
            data-testid="stepper-number-input-value"
            defaultValue={1}
            min={asset === SupportedAsset.ETH ? 0.01 : 0.001}
            precision={asset === SupportedAsset.ETH ? 2 : 3}
          >
            <NumberInputField textAlign="center" placeholder="0.0" fontSize="medium" disabled={isInputDisabled} />
          </NumberInput>
        )}
      </VStack>
      <IconButton
        color="gray.400"
        border="1px solid"
        borderColor="gray.500"
        isRound
        aria-label="Add"
        data-testid="stepper-number-input-add-btn"
        size="sm"
        variant="secondary"
        icon={<Icon as={AddIcon} boxSize={2} />}
        onClick={() => onStepperClick(value, 'plus')}
      />
    </HStack>
  );
};
