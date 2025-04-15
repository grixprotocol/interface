import { Box } from '@chakra-ui/react';
import { Tooltip, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { formatWithCommas } from '@/utils/number';

type CustomPayload = {
  assetPrice: number;
};

const tooltipContent = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.length) {
    const customPayload = payload[0].payload as CustomPayload;
    const formattedStrikePrice = formatWithCommas(Math.floor(customPayload.assetPrice)) ?? null;
    return (
      <Box bgColor="base.black" borderWidth={1} borderColor="gray.800" p={2} color="base.white">
        {formattedStrikePrice} USDC
      </Box>
    );
  }

  return null;
};

export const tooltipComponent = () => <Tooltip content={tooltipContent} />;
