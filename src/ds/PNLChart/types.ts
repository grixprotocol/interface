import { ResponsiveContainerProps } from 'recharts';

import { PositionTypes, TradeOptionType } from '@/api';

export type PNLChartProps = {
  attributes: PNLChartPosition;
  onCursorChanged?: (value: number) => void;
  containerProps?: Partial<ResponsiveContainerProps>;
};

export type PNLChartPosition = {
  strikePrice: number;
  optionType: TradeOptionType;
  premium: number;
  amount: number;
  positionType?: PositionTypes;
};

export type DataPoint = {
  assetPrice: number;
  pnl: number;
};

export type GraphData = {
  dataPoints: DataPoint[];
  semiRange: number;
  breakEvenPrice: number;
  strikePrice: number;
};
