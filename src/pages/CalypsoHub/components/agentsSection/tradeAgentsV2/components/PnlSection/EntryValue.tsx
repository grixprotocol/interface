import { Text, VStack } from '@chakra-ui/react';

const formatValue = (value: number, prefix = '', decimals = 2) =>
  `${prefix}${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;

type EntryValueProps = {
  pnlData: {
    purchasePrice: number;
    perContract: {
      purchasePrice: number;
    };
  } | null;
};

export const EntryValue: React.FC<EntryValueProps> = ({ pnlData }) => {
  if (!pnlData) {
    return (
      <Text color="white" fontSize="sm" fontWeight="semibold">
        -
      </Text>
    );
  }

  return (
    <VStack spacing={1} align="start">
      <VStack spacing={0} align="start">
        <Text color="whiteAlpha.400" fontSize="2xs" textTransform="uppercase" fontWeight="semibold">
          Total Position
        </Text>
        <Text color="white" fontSize="sm" fontWeight="semibold">
          ${formatValue(pnlData.purchasePrice)}
        </Text>
      </VStack>
      <VStack spacing={0} align="start">
        <Text color="whiteAlpha.400" fontSize="2xs" textTransform="uppercase" fontWeight="semibold">
          Per Contract
        </Text>
        <Text color="whiteAlpha.600" fontSize="sm">
          ${formatValue(pnlData.perContract.purchasePrice)}
        </Text>
      </VStack>
    </VStack>
  );
};
