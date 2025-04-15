import { useMemo } from 'react';

import { useTradeForm } from '../components/TradeFormProvider';

function convertTimestampToFormattedDate(timestamp: string): string {
  const date = new Date(Number(timestamp) * 1000); // Convert seconds to milliseconds
  const year = date.getUTCFullYear().toString();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

type QuotePrice = {
  id: string;
  contractPrice: string;
  contractAmount: string;
};

export const useProtocolExternalURL = () => {
  const { asset, expirationDate } = useTradeForm();
  const urlMap: Record<string, string | undefined> = useMemo(
    () => ({
      synquote: 'https://app.synquote.com/trade/ETH?chain=arbitrum',
      derive: `https://derive.xyz/options/${asset}?ref=grix&expiry=${convertTimestampToFormattedDate(expirationDate)}`,
      aevo: 'https://app.aevo.xyz/r/Quickest-Tall-Shaw',
      rysk: `https://app.rysk.finance/options?expiry=${expirationDate}`,
      premia: 'https://vxref.me/49ZFozb',
      hegic: 'https://www.hegic.co/app#/arbitrum/trade/new',
      moby: 'https://app.moby.trade/',
      panoptic: 'https://beta.panoptic.xyz/',
      sdx: 'https://app.sdx.markets/trade',
      dopex: 'https://www.stryke.xyz/en/trade/arbitrum/WETH-USDC',
      thetanuts: 'https://app.thetanuts.finance/Trade',
      optionblitz: 'https://app.optionblitz.co/trading',
      ithaca: 'https://app.ithacaprotocol.io/trading/dynamic-option-strategies',
      zomma: 'https://app.zomma.pro/en/main/trade/ETH-USDC',
    }),
    [asset, expirationDate]
  );

  return {
    isExternal: (quoteId: QuotePrice['id']) => urlMap[quoteId],
    openExternalURL: (quoteId: QuotePrice['id']) => {
      const urlToOpen = urlMap[quoteId];
      window.open(urlToOpen, '_blank');
    },
  };
};
