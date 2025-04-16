import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useAnalytics } from '@/services/analytics/useAnalytics';

import { StepperNumberInput } from '../StepperNumberInput';

type Option<T extends string> = {
  value: T;
  label: string;
  description: string;
  icon?: React.ReactNode;
};

export type CurrencyDropdownProps<T extends string> = {
  label: string;
  value: Option<T>['value'];
  options: Option<T>[];
  onCurrencySelect: (value: Option<T>['value']) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  inputLabel: string;
  precision?: number;
};

export const CurrencyDropdown = <T extends string>({
  options,
  value,
  label,
  amount,
  onAmountChange,
  onCurrencySelect,
  inputLabel,
  precision = 2,
}: CurrencyDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const { track } = useAnalytics();

  const handleContractSizeChange = (value: string) => {
    track('stage_1_contract_size_change', { amount: value });
    onAmountChange(value);
  };

  const handleStepperClick = (value: string, action: 'plus' | 'minus') => {
    const numberValue = Number(value);
    const amountToChange =
      action === 'plus'
        ? numberValue < 1 && numberValue >= 0.1
          ? 0.1
          : numberValue < 0.1
          ? 0.01
          : 1
        : numberValue <= 1
        ? numberValue > 0.1
          ? -0.1
          : -0.01
        : -1;
    handleContractSizeChange(Math.max(numberValue + amountToChange, 0.01).toFixed(2));
  };

  const rightSide = (
    <VStack
      align="center"
      justify="center"
      borderColor="gray.700"
      borderWidth={1}
      borderRightRadius="6px"
      h="80px"
      borderLeftWidth={0}
      flex={1}
      gap={0}
    >
      <StepperNumberInput
        inputLabel={inputLabel}
        value={amount}
        onChange={handleContractSizeChange}
        onStepperClick={handleStepperClick}
        precision={precision}
        gap={0}
        min={0}
      />
    </VStack>
  );

  return (
    <HStack pos="relative" justify="space-between" w="100%" spacing={0} data-testid="currency-dropdown">
      <Menu matchWidth gutter={0} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton
          h="80px"
          data-testid="currency-dropdown-menu-button"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          w={isOpen ? '100%' : '50%'}
          borderRadius="6px"
          borderBottomRadius={isOpen ? 0 : undefined}
          borderRightRadius={isOpen ? undefined : 0}
          borderColor="gray.700"
          borderWidth={1}
        >
          <HStack justify="space-between" w="100%" h="full">
            <HStack padding={4}>
              <DropdownIcon icon={selectedOption?.icon} />
              <VStack alignItems="flex-start" spacing={0}>
                <Box color="gray.500" fontWeight="500" fontSize="12px">
                  {label}
                </Box>
                {selectedOption ? (
                  <HStack spacing={1}>
                    <Box fontSize="16px" fontWeight="700" color="base.white" data-testid="selected-option">
                      {selectedOption.label}
                    </Box>
                    {!isOpen && <Icon as={ChevronDownIcon} boxSize={5} color="gray.400" />}
                  </HStack>
                ) : null}
              </VStack>
            </HStack>
            {isOpen && <Icon as={ChevronUpIcon} boxSize={5} color="gray.400" mr={4} />}
          </HStack>
        </MenuButton>
        <MenuList backgroundColor="base.black" borderColor="gray.700" borderTopRadius={0} borderTop={isOpen ? 0 : undefined}>
          {options.map((option, index) => (
            <React.Fragment key={option.value}>
              <MenuItem
                backgroundColor="base.black"
                p={4}
                onClick={() => onCurrencySelect(option.value)}
                data-testid={`currency-dropdown-option-${option.value}`}
              >
                <HStack spacing="4" w="100%">
                  <DropdownIcon icon={option.icon} />
                  <VStack align="flex-start" fontWeight="bold" flex="1" spacing={0}>
                    <Box color="gray.500" fontWeight="500" fontSize="12px">
                      {option.description}
                    </Box>
                    <Box fontSize="16px" fontWeight="700" color="base.white">
                      {option.label}
                    </Box>
                  </VStack>
                  {option.value === value && <Icon as={CheckCircleIcon} color="primary.400" />}
                </HStack>
              </MenuItem>
              {index < options.length - 1 && <MenuDivider />}
            </React.Fragment>
          ))}
        </MenuList>
      </Menu>
      {!isOpen && rightSide}
    </HStack>
  );
};

const DropdownIcon = ({ icon }: { icon?: React.ReactNode }) => (
  <Box borderRadius="50%" bgColor="gray.800" p="10px" border="1px solid">
    {icon}
  </Box>
);
