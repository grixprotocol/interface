import { Box, Center, Divider, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect } from 'react';

import { TradeOptionType } from '@/api';
import { OptionButtonTab } from '@/ds';

export const TableHeader = ({
  positionType,
  optionType,
  onOptionTypeChange,
}: {
  positionType: 'long' | 'short';
  optionType: TradeOptionType;
  onOptionTypeChange: (value: TradeOptionType) => void;
}) => {
  const isSmallScreen = useBreakpointValue({
    base: false,
    sm: true,
    md: false,
  });

  useEffect(() => {
    if (!optionType) {
      onOptionTypeChange('call');
    }
  }, [optionType, onOptionTypeChange]);

  if (isSmallScreen) {
    return (
      <Box mb={4} width="full">
        <OptionButtonTab
          onChange={onOptionTypeChange}
          options={[
            {
              label: positionType === 'long' ? 'Buy Call' : 'Sell Call',
              value: 'call',
            },
            {
              label: positionType === 'long' ? 'Buy Put' : 'Sell Put',
              value: 'put',
            },
          ]}
          value={optionType}
          width="full"
        />
      </Box>
    );
  }

  return (
    <HStack
      divider={<Divider orientation="vertical" h={8} />}
      color="gray.700"
      fontWeight="bold"
      borderWidth={1}
      borderColor="gray.600"
      w="full"
      borderTopRadius="md"
    >
      <Center flex={1} p={1}>
        Call
      </Center>
      <Center flex={1} p={1}>
        Put
      </Center>
    </HStack>
  );
};
