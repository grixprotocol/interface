import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Icon, Img, Text } from '@chakra-ui/react';
import React from 'react';

import { PriceType } from '@/api';
import { OptionBoardItem } from '@/api/tradeboard/types';
import { protocolsArrayData } from '@/config';
import { formatCurrency } from '@/utils/number';

import { OptionMatrixAccessor, OptionMatrixItem } from '../types';

type StrikeOptionTableCellProps = {
  boardItem: OptionBoardItem;
  matrixItem: OptionMatrixItem;
  type: PriceType;
  accessor: OptionMatrixAccessor;
  onItemClick?: (item: OptionMatrixItem) => void;
};
export const StrikeOptionTableCell = ({
  boardItem,
  matrixItem,
  type,
  accessor,
  onItemClick,
}: StrikeOptionTableCellProps) => {
  const icon = protocolsArrayData.find((protocol) => protocol.protocolName === boardItem.marketName)?.icon;

  const hasMultipleOptions = matrixItem[accessor].length > 1;

  return (
    <Button
      variant="unstyled"
      onClick={() => onItemClick?.(matrixItem)}
      p={4} // Add padding for more height
      h="60px" // Ensure a consistent minimum height for rows
    >
      <HStack gap={2} spacing={3}>
        {renderIcon(icon)}
        <Text
          fontSize="18px" // Increase font size
          color={type === 'ask' ? '#ff1a6c' : 'primary.500'}
          fontWeight="bold" // Make text bolder for better readability
        >
          {formatCurrency(boardItem.contractPrice)}
        </Text>
        {hasMultipleOptions ? (
          <Box>
            <Icon as={ChevronDownIcon} boxSize={6} color="gray.600" />
          </Box>
        ) : null}
      </HStack>
    </Button>
  );
};

const renderIcon = (icon: React.ReactNode) => {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return (
      <Img
        src={icon}
        width="30px" // Increase icon size
        height="30px"
        borderRadius="50%"
        border="1px solid"
        borderColor="gray.700"
        p={1}
        m={1}
      />
    );
  }

  return (
    <Box
      borderRadius="50%"
      bgColor="gray.800"
      p="12px" // Increase padding for better visual balance
      border="1px solid"
      borderColor="gray.700"
    >
      {icon}
    </Box>
  );
};
