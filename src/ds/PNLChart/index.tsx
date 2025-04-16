import { useMemo } from 'react';
import { Area, ComposedChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';

import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

import { gradientsComponent } from './components/gradientsComponent';
import { referenceLinesComponent } from './components/referenceLinesComponent';
import { textComponent } from './components/textComponent';
import { tooltipComponent } from './components/tooltipComponent';
import { generateGraphData } from './generateGraphData';
import { GraphData, PNLChartProps } from './types';

export const PNLChart = ({ attributes, onCursorChanged, containerProps }: PNLChartProps) => {
  const isCall = attributes.optionType === 'call';
  const isLong = attributes.positionType === 'long';
  const graphData: GraphData = useMemo(() => generateGraphData(attributes), [attributes]);

  const debouncedCursorChanged = useDebouncedCallback(onCursorChanged ?? (() => {}), 10);
  const handleMouseMove = (event: CategoricalChartState) => {
    const pnl = (event?.activePayload?.[0]?.payload?.pnl ?? 0) as number; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    debouncedCursorChanged(pnl);
  };

  return (
    <ResponsiveContainer width="100%" height={200} {...containerProps}>
      <ComposedChart data={graphData.dataPoints} margin={{ top: 0, left: 0, right: 0, bottom: 0 }} onMouseMove={handleMouseMove}>
        <XAxis dataKey="assetPrice" hide />
        <YAxis dataKey="pnl" domain={[-graphData.semiRange, graphData.semiRange]} allowDataOverflow hide />
        {gradientsComponent(isCall, isLong)}
        {referenceLinesComponent(graphData)}
        <Area type="monotone" dataKey="pnl" fill="url(#colorArea)" stroke="url(#colorLine)" baseValue={0} />
        {textComponent(isCall, isLong)}
        {tooltipComponent()}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
