import { Box, Text, VStack } from '@chakra-ui/react';

import { BidAskSnapshot } from '@/api/optionPriceHistory/types';
import { InstrumentType } from '@/api/trade-agents/types/shared';
import { Signal } from '@/api/trade-agents/types/TradeAgent';
import { PositionType } from '@/api/types';
import { OptionPriceGraph } from '@/components/OptionPriceGraph';

import { PnlSection } from '../PnlSection';

type PerformanceSectionProps = {
  signal: Signal;
  priceHistory: Record<string, BidAskSnapshot>;
};

export const PerformanceSection = ({ signal, priceHistory }: PerformanceSectionProps) => (
  <Box bg="whiteAlpha.50" p={4} borderRadius="lg">
    <Text fontSize="sm" fontWeight="semibold" color="white" mb={3}>
      Performance
    </Text>
    <VStack spacing={4} align="stretch">
      <PnlSection signal={signal} isEnabled />

      {signal.signal.instrument_type === InstrumentType.option && priceHistory && (
        <Box>
          <Text fontSize="xs" color="whiteAlpha.600" mb={2}>
            Price History
          </Text>
          <OptionPriceGraph
            instrumentKey={signal.signal.instrument}
            isEnabled
            entryTimestamp={new Date(signal.created_at).getTime()}
            positionType={signal.signal.position_type as PositionType}
          />
        </Box>
      )}
    </VStack>
  </Box>
);
