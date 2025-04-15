import React, { useContext, useState } from 'react';

import { OptionBoardItem } from '@/api/tradeboard/types';
import { PositionTypes, SupportedAsset, TradeOptionType } from '@/api/types';
import { useQueryParameter } from '@/hooks/queryParams';

type TradeFormContextType = {
  isTradePage: boolean;
  setIsTradePage: (value: boolean) => void;
  optionType: TradeOptionType;
  onOptionTypeChange: (value: TradeOptionType) => void;
  expirationDate: string;
  onExpirationDateChange: (value: string) => void;
  strikePrice: string;
  setStrikePrice: (value: string) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  asset: SupportedAsset;
  onAssetChange: (value: SupportedAsset) => void;
  selectedOption: OptionBoardItem | undefined;
  setSelectedOption: (value?: OptionBoardItem) => void;
  positionType: PositionTypes;
  onPositionTypeChange: (value: PositionTypes) => void;
  isTradablePositionExists: OptionBoardItem | undefined;
  setIsTradablePositionExists: (value: OptionBoardItem | undefined) => void;
};

const TradeFormContext = React.createContext<TradeFormContextType | null>(null);

export const TradeFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [optionType, setOptionType] = useQueryParameter<TradeOptionType>('optionType');
  const [positionType, setPositionType] = useQueryParameter<PositionTypes>('positionType');
  const [asset, setAsset] = useQueryParameter<SupportedAsset>('asset');
  const [expirationDate, setExpirationDate] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [amount, setAmount] = useState('1.00');
  const [selectedOption, setSelectedOption] = useState<OptionBoardItem | undefined>(undefined);
  const [isTradePage, setIsTradePage] = useState(false);
  const [isTradablePositionExists, setIsTradablePositionExists] = useState<OptionBoardItem | undefined>(undefined);

  return (
    <TradeFormContext.Provider
      value={{
        optionType,
        onOptionTypeChange: setOptionType,
        expirationDate,
        onExpirationDateChange: setExpirationDate,
        strikePrice,
        setStrikePrice,
        amount,
        onAmountChange: setAmount,
        asset,
        onAssetChange: setAsset,
        selectedOption,
        setSelectedOption,
        positionType,
        onPositionTypeChange: setPositionType,
        isTradePage,
        setIsTradePage,
        isTradablePositionExists,
        setIsTradablePositionExists,
      }}
    >
      {children}
    </TradeFormContext.Provider>
  );
};

export const useTradeForm = () => {
  const context = useContext(TradeFormContext);
  if (context === null) {
    throw new Error('useTradeForm must be used within a TradeFormProvider');
  }

  return context;
};
