import { OptionBoardItem } from '@/api/tradeboard/types';
import { protocolsArrayData } from '@/config';

export const splitOptionsByIsTradable = (optionBoard: OptionBoardItem[]) => {
  const tradableOnGrix: OptionBoardItem[] = [];
  const notTradableOnGrix: OptionBoardItem[] = [];

  optionBoard.forEach((option) => {
    // Find matching protocol in protocolsArrayData
    const protocol = protocolsArrayData.find((p) => p.protocolName.toLowerCase() === option.marketName.toLowerCase());

    if (protocol?.isExecution) {
      tradableOnGrix.push(option);
    } else {
      notTradableOnGrix.push(option);
    }
  });

  return { tradableOnGrix, notTradableOnGrix };
};
