import { PositionTypes, PriceType, TradeOptionType, UnderlyingAsset } from '@/api/types';

export type TradeboardQueryFilters = {
  protocols: string;
  asset: string;
  positionType?: PositionTypes;
  optionType?: TradeOptionType;
};

export type TradeboardResponse = {
  expirationBoard: string[];
  strikeBoard: Strikeboard;
  optionBoard: Optionboard;
};

export type Strikeboard = {
  [expiryTimestamp: string]: string[];
};

export type Optionboard = {
  [expiryTimestamp: string]:
    | {
        [strikePrice: string]: OptionBoardItem[] | undefined;
      }
    | undefined;
};

export type OptionBoardItem = {
  optionId: number;
  marketName: string;
  strikePrice: string;
  expirationDate: number;
  optionType: TradeOptionType;
  positionType: PositionTypes;
  priceType: PriceType;
  contractPrice: string; //normalized for 1 contract
  availableContractAmount: string | null;
  asset: UnderlyingAsset;
};
