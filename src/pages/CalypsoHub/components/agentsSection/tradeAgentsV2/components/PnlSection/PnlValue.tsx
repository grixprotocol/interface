import { Text, VStack } from '@chakra-ui/react';

import { PositionType } from '@/api';
import { Signal } from '@/api/trade-agents/types/TradeAgent';
import { PnlResult } from '@/components/OptionPriceGraph/pnlCalculator';

import { EntryValue } from './EntryValue';

const formatValue = (value: number, prefix = '', decimals = 2) =>
  `${prefix}${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;

const formatChange = (change: number) => {
  const prefix = change >= 0 ? '+' : '-';
  return formatValue(change, prefix);
};

const formatPercent = (value: number) => `${formatChange(value)}%`;

type PnlValueProps = {
  signal: Signal;
  type: 'purchase' | 'max' | 'current';
  pnlResult: PnlResult | null;
};

export const PnlValue: React.FC<PnlValueProps> = ({ signal, type, pnlResult }) => {
  if (!pnlResult?.values) {
    return (
      <Text color="white" fontSize="sm" fontWeight="semibold">
        -
      </Text>
    );
  }

  const pnlData = pnlResult.values;
  const isLong = signal.signal.position_type === PositionType.long;

  if (type === 'purchase') {
    return <EntryValue pnlData={pnlData} />;
  }

  const isMax = type === 'max';
  const perContract = pnlData.perContract;
  const total = pnlData.total;

  const price = isMax ? perContract.maxPrice : perContract.currentPrice;
  const priceChange = isMax ? perContract.maxPriceChange : perContract.currentPriceChange;
  const priceChangePercent = isMax ? perContract.maxPriceChangePercent : perContract.currentPriceChangePercent;
  const positionValue = isMax ? total.maxValue : total.currentValue;
  const valueChange = isMax ? total.maxValueChange : total.currentValueChange;

  // For short positions, we need to invert the sign of the changes since a price increase means a loss
  const adjustedValueChange = isLong ? valueChange : -valueChange;
  const adjustedPriceChangePercent = isLong ? priceChangePercent : -priceChangePercent;

  const changeColor = adjustedValueChange > 0 ? 'green.400' : adjustedValueChange < 0 ? 'red.400' : 'white';

  return (
    <VStack spacing={2} align="start">
      <VStack spacing={0} align="start" width="100%">
        <Text color="whiteAlpha.400" fontSize="2xs" textTransform="uppercase" fontWeight="semibold">
          PNL
        </Text>
        <Text color={changeColor} fontSize="md" fontWeight="bold">
          {formatChange(adjustedValueChange)} USD ({formatPercent(adjustedPriceChangePercent)})
        </Text>
      </VStack>

      <VStack spacing={0} align="start" width="100%">
        <Text color="whiteAlpha.400" fontSize="2xs" textTransform="uppercase" fontWeight="semibold">
          Position Value ({signal.signal.size} contracts)
        </Text>
        <Text color="white" fontSize="sm" fontWeight="semibold">
          ${formatValue(positionValue)}
        </Text>
      </VStack>

      <VStack spacing={0} align="start" width="100%">
        <Text color="whiteAlpha.400" fontSize="2xs" textTransform="uppercase" fontWeight="semibold">
          Price Per Contract
        </Text>
        <Text color="white" fontSize="sm">
          ${formatValue(price)} ({formatChange(priceChange)} USD)
        </Text>
      </VStack>
    </VStack>
  );
};
