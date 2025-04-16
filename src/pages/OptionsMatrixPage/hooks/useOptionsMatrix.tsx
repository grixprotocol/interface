import { useCallback } from 'react';

import { SupportedAsset } from '@/api';
import { TradeboardResponse } from '@/api/tradeboard/types';

import { OptionMatrixItem } from '../types';
import { useFetchOptions } from './useFetchOptions';

export const useOptionsMatrix = ({
  asset,
  expirationDate,
  protocols,
}: {
  asset: SupportedAsset;
  expirationDate: string;
  protocols: string[];
}) => {
  const select = useCallback(
    (tradeboard: TradeboardResponse) => transformOptionBoard(tradeboard, expirationDate),
    [expirationDate]
  );

  return useFetchOptions({ asset, protocols }, { select });
};

const transformOptionBoard = (tradeboard: TradeboardResponse, expirationDate: string): OptionMatrixItem[] => {
  const optionboard = tradeboard.optionBoard[expirationDate];
  const boardItems: OptionMatrixItem[] = [];

  for (const strikePrice in optionboard) {
    const optionItems = optionboard[strikePrice];

    if (!optionItems || optionItems.length === 0) continue;

    const boardItem: OptionMatrixItem = {
      strikePrice,
      bidCalls: [],
      askCalls: [],
      bidPuts: [],
      askPuts: [],
    };

    optionItems.forEach((item) => {
      if (item.optionType === 'call') {
        if (item.positionType === 'short') {
          boardItem.bidCalls.push(item);
        } else if (item.positionType === 'long') {
          boardItem.askCalls.push(item);
        }
      } else if (item.optionType === 'put') {
        if (item.positionType === 'short') {
          boardItem.bidPuts.push(item);
        } else if (item.positionType === 'long') {
          boardItem.askPuts.push(item);
        }
      }
    });

    boardItem.bidCalls.sort((a, b) => parseFloat(b.contractPrice) - parseFloat(a.contractPrice));
    boardItem.bidPuts.sort((a, b) => parseFloat(b.contractPrice) - parseFloat(a.contractPrice));

    boardItem.askCalls.sort((a, b) => parseFloat(a.contractPrice) - parseFloat(b.contractPrice));
    boardItem.askPuts.sort((a, b) => parseFloat(a.contractPrice) - parseFloat(b.contractPrice));

    boardItems.push(boardItem);
  }

  return boardItems;
};
