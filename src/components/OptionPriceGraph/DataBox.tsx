import { Box, Flex, Grid, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { OptionType, PositionType } from '@/api';
import { Quote } from '@/api/optionPriceHistory/types';
import { protocolsArrayData } from '@/config';
import { calculateGreeks } from '@/utils/optionGreeks';
import { extractOptionKey } from '@/utils/optionKey/extractOptionKey';

export type DataBoxProps = {
  title: string;
  optionKey: string;
  hoveredData?: {
    bestBid?: Quote;
    bestAsk?: Quote;
    underlying_price?: number;
    risk_free_rate?: string;
  };
  borderColor: string;
  icon?: ReactElement;
  positionType?: PositionType;
};

export const DataBox: React.FC<DataBoxProps> = ({ title, hoveredData, borderColor, icon, optionKey, positionType }) => {
  const quote = positionType === PositionType.short ? hoveredData?.bestBid : hoveredData?.bestAsk;
  const protocol = quote ? protocolsArrayData.find((p) => p.protocolName === quote.protocol) : undefined;
  const impliedVolatility = quote?.implied_volatility ? parseFloat(quote.implied_volatility) : undefined;
  const riskFreeRate = hoveredData?.risk_free_rate ? parseFloat(hoveredData.risk_free_rate) : undefined;
  const underlyingPrice = hoveredData?.underlying_price;
  const { strike, expiry, optionType } = extractOptionKey(optionKey);
  let greeks;
  if (underlyingPrice && riskFreeRate && impliedVolatility) {
    greeks = calculateGreeks({
      underlyingPrice,
      strikePrice: strike,
      riskFreeRate,
      impliedVolatility,
      expiryTimestamp: expiry,
      isCall: optionType === OptionType.call,
    });
  }

  return (
    <Box
      p={4}
      bg="whiteAlpha.50"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      minWidth="240px"
      height="auto"
      backdropFilter="blur(10px)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <VStack align="flex-start" spacing={4} height="100%">
        <HStack spacing={2} width="100%" mb={2}>
          {icon}
          <Text color="white" fontSize="md" fontWeight="semibold">
            {title}
          </Text>
        </HStack>

        <Grid templateColumns="1fr 1fr 1fr" gap={2} width="100%" pb={2} borderBottom="1px solid" borderColor="whiteAlpha.200">
          <HStack>
            {protocol && <Image src={protocol.icon} alt={protocol.label} width="20px" height="20px" borderRadius="full" />}
            <Text color={quote ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm" fontWeight="medium" isTruncated>
              {quote ? protocol?.label || quote.protocol : '-'}
            </Text>
          </HStack>

          <Text color={quote ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm" textAlign="center">
            {quote ? `$${quote.price.toFixed(2)}` : '-'}
          </Text>

          <Text color={quote ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm" textAlign="right">
            {quote ? (quote.liquidity ? `${parseFloat(quote.liquidity).toFixed(2)} contracts` : '-') : '-'}
          </Text>
        </Grid>

        <Grid templateColumns="repeat(5, 1fr)" gap={2} width="100%">
          <Flex justify="start" alignItems="center" gap={1}>
            <Text color="whiteAlpha.700" fontSize="sm">
              IV:
            </Text>
            <Text color={quote ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm">
              {quote?.implied_volatility ? `${parseFloat(quote.implied_volatility).toFixed(5)}%` : '-'}
            </Text>
          </Flex>

          <Flex justify="start" alignItems="center" gap={1}>
            <Text color="whiteAlpha.700" fontSize="sm">
              Δ:
            </Text>
            <Text color={greeks ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm">
              {greeks ? greeks.delta.toFixed(5) : '-'}
            </Text>
          </Flex>

          <Flex justify="start" alignItems="center" gap={1}>
            <Text color="whiteAlpha.700" fontSize="sm">
              Γ:
            </Text>
            <Text color={greeks ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm">
              {greeks ? greeks.gamma.toFixed(5) : '-'}
            </Text>
          </Flex>

          <Flex justify="start" alignItems="center" gap={1}>
            <Text color="whiteAlpha.700" fontSize="sm">
              Θ:
            </Text>
            <Text color={greeks ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm">
              {greeks ? greeks.theta.toFixed(5) : '-'}
            </Text>
          </Flex>

          <Flex justify="start" alignItems="center" gap={1}>
            <Text color="whiteAlpha.700" fontSize="sm">
              V:
            </Text>
            <Text color={greeks ? 'whiteAlpha.900' : 'whiteAlpha.600'} fontSize="sm">
              {greeks ? greeks.vega.toFixed(5) : '-'}
            </Text>
          </Flex>
        </Grid>
      </VStack>
    </Box>
  );
};
