import { Badge, Box, HStack, Img, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import { FaGift } from 'react-icons/fa';

import { OrderDescription, OrderDescriptionProps } from './type';

export const getOrderDescriptions = ({
  protocolIcon,
  protocolLabel,
  availableContracts,
  amount,
  minAssetAmount,
  onAmountChange,
  totalPriceInUSD,
}: OrderDescriptionProps): OrderDescription[] => [
  {
    id: 'protocol',
    label: 'Protocol',
    column: <Img src={protocolIcon} width="24px" height="24px" bgColor="transparent" />,
    rightColumn: protocolLabel,
  },
  {
    id: 'contractSize',
    label: 'Size',
    rightColumn: availableContracts ? <Text color="whiteAlpha.600">Available: {availableContracts}</Text> : <Text></Text>,
    column: (
      <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="md" px={3} py={1}>
        <HStack spacing={2} justify="center">
          <NumberInput
            size="xs"
            variant="unstyled"
            value={amount}
            min={minAssetAmount}
            onChange={(valueString) => {
              if (!/^\d*\.?\d{0,2}$/.test(valueString)) {
                return;
              }
              onAmountChange(valueString);
            }}
          >
            <NumberInputField textAlign="center" fontSize="small" p={0} _focus={{ outline: 'none' }} />
          </NumberInput>
        </HStack>
      </Box>
    ),
  },
  {
    id: 'fee',
    label: 'Fee',
    column: (
      <Badge variant="primary" display="flex" alignItems="center" gap={1}>
        <Text as="span" textDecoration="line-through" ml={1}>
          {`$${(totalPriceInUSD * 0.01).toFixed(2)}`}
        </Text>
        <Text as="span" ml={1}>
          Free
        </Text>
        <FaGift />
      </Badge>
    ),
  },
];
