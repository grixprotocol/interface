import { Box } from '@chakra-ui/react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';

import { Strategy } from '../../types';
import { getTypeColor } from './designGetters';

export const StrategyMetricsChart = ({ strategy }: { strategy: Strategy }) => {
  const chartData = [
    { metric: 'Risk', value: strategy.metrics.risk },
    { metric: 'Complexity', value: strategy.metrics.complexity },
    { metric: 'Profit Potential', value: strategy.metrics.profitPotential },
    { metric: 'Time Commitment', value: strategy.metrics.timeCommitment },
    { metric: 'Capital Required', value: strategy.metrics.capitalRequired },
  ];

  return (
    <Box h="300px" w="100%" mt={4}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: 'white', fontSize: 12 }} />
          <Radar
            name={strategy.name}
            dataKey="value"
            stroke={`var(--chakra-colors-${strategy.type}-400)`}
            fill={`var(--chakra-colors-${getTypeColor(strategy.type)}-400)`}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};
