import { Box, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { FaChartLine } from 'react-icons/fa';

import { Signal } from '@/api/trade-agents/types/TradeAgent';

import { MetricBox } from '../metrixBox';

export const AnalysisMetrics = ({ signal }: { signal: Signal }) => (
  <Box bg="whiteAlpha.100" borderRadius="lg" p={4} borderLeft="4px" borderLeftColor="blue.400">
    <HStack spacing={2} mb={3}>
      <Icon as={FaChartLine} color="blue.400" />
      <Text fontSize="sm" fontWeight="semibold" color="white">
        Strategy Analysis
      </Text>
    </HStack>

    <Text
      fontSize="sm"
      color="whiteAlpha.900"
      lineHeight="1.6"
      mb={4}
      sx={{
        '& strong': {
          color: 'blue.200',
          fontWeight: 'semibold',
        },
      }}
    >
      {signal.signal.reason}
    </Text>

    {/* Analysis Metrics */}
    <SimpleGrid columns={3} gap={4} pt={3} borderTop="1px" borderTopColor="whiteAlpha.200">
      <MetricBox label="Confidence" value={`${signal.signal.confidence || 'N/A'}%`} valueColor="green.300" />
      <MetricBox label="Time Frame" value={signal.signal.time_frame || 'Short Term'} valueColor="white" />
      <MetricBox
        label="Risk Level"
        value={signal.signal.risk_level || 'Medium'}
        valueColor={signal.signal.risk_level === 'high' ? 'red.300' : 'yellow.300'}
      />
    </SimpleGrid>
  </Box>
);
