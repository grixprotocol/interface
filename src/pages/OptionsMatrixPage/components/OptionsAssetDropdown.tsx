import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToken,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

type Option<T extends string> = {
  value: T;
  label: string;
  description: string;
  icon?: React.ReactNode;
  price?: number;
};

export type OptionsAssetDropdownProps<T extends string> = {
  value: Option<T>['value'];
  options: Option<T>[];
  onCurrencySelect: (value: Option<T>['value']) => void;
};

export const OptionsAssetDropdown = <T extends string>({
  options,
  value,
  onCurrencySelect,
}: OptionsAssetDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  // Get theme colors
  const [primaryColor] = useToken('colors', ['primary.500']);

  return (
    <HStack pos="relative" justify="space-between" w="full" spacing={0}>
      <Menu matchWidth gutter={0} isOpen={isOpen} onClose={() => setIsOpen(false)} strategy="fixed">
        <MenuButton
          w="full"
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          borderRadius={10}
          borderWidth={1}
          borderColor={isHovered || isOpen ? 'primary.500' : 'gray.600'}
          borderBottomRadius={isOpen ? 0 : undefined}
          borderBottomWidth={isOpen ? 0 : undefined}
          transition="all 0.2s"
          px={1}
        >
          <HStack justify="space-between" w="full" h="full">
            <HStack padding={2} spacing={3}>
              <Box
                borderRadius="50%"
                bgColor="gray.800"
                p="8px"
                border="1px solid"
                borderColor={isHovered || isOpen ? primaryColor : 'gray.600'}
                transition="all 0.2s"
              >
                {selectedOption?.icon}
              </Box>
              <VStack alignItems="flex-start" spacing={0}>
                {selectedOption && (
                  <Tooltip label="Click to change asset" placement="top">
                    <HStack spacing={1}>
                      <Text fontSize="16px" fontWeight="700" color="base.white">
                        {selectedOption.label}
                      </Text>
                    </HStack>
                  </Tooltip>
                )}
              </VStack>
            </HStack>
            <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} boxSize={5} color="gray.400" mr={1} />
          </HStack>
        </MenuButton>
        <MenuList backgroundColor="base.black" borderTopRadius={0} borderTopWidth={isOpen ? 1 : undefined}>
          {options.map((option, index) => (
            <React.Fragment key={option.value}>
              <MenuItem backgroundColor="base.black" onClick={() => onCurrencySelect(option.value)}>
                <HStack spacing="4" w="full">
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
    </HStack>
  );
};

const DropdownIcon = ({ icon }: { icon?: React.ReactNode }) => (
  <Box borderRadius="50%" bgColor="gray.800" p="6px" border="1px solid">
    {icon}
  </Box>
);
