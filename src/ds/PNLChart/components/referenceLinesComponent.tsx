import { ReferenceLine } from 'recharts';

import { colors } from '@/ds/theme';

import { DataPoint, GraphData } from '../types';

export const referenceLinesComponent = (graphData: GraphData) => {
  const strikeCoordinate: DataPoint | undefined = graphData.dataPoints.find((point) => point.assetPrice === graphData.strikePrice);
  if (!strikeCoordinate) {
    return null;
  }
  return (
    <>
      <ReferenceLine stroke={colors.gray[800]} y={0} />
    </>
  );
};
