import { OptionBoardItem } from '@/api/tradeboard/types';

export type OptionMatrixItem = {
  strikePrice: string;
  bidCalls: OptionBoardItem[];
  askCalls: OptionBoardItem[];
  bidPuts: OptionBoardItem[];
  askPuts: OptionBoardItem[];
};

export type OptionMatrixAccessor = Exclude<keyof OptionMatrixItem, 'strikePrice'>;
