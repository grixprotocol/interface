import { LineStyle } from 'lightweight-charts';
import { ReactElement } from 'react';

import { PositionType } from '@/api';

export type OptionPriceGraphProps = {
  instrumentKey: string;
  isEnabled: boolean;
  entryTimestamp?: number;
  positionType?: PositionType;
};

export type SeriesConfig = {
  name: string;
  color: string;
  lineStyle: LineStyle;
  visible: boolean;
  defaultVisible: boolean;
  isEntryPoint?: boolean;
  icon?: ReactElement;
};
