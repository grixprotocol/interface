import { Box } from '@chakra-ui/react';
import { CowSwapWidgetParams, createCowSwapWidget, TradeType } from '@cowprotocol/widget-lib';
import { useEffect, useMemo } from 'react';

import { layoutConstants } from '@/configDesign';

export const CowswapWidget = () => {
  const params: CowSwapWidgetParams = useMemo(
    () => ({
      appCode: 'Grix',
      width: '100%',
      height: '640px',
      chainId: 42161,
      tokenLists: ['https://files.cow.fi/tokens/CoinGecko.json', 'https://files.cow.fi/tokens/CowSwap.json'],
      tradeType: TradeType.SWAP,
      sell: {
        asset: 'USDC',
        amount: '0',
      },
      buy: {
        asset: 'WETH',
        amount: '0',
      },
      enabledTradeTypes: [TradeType.SWAP],
      theme: 'dark',
      standaloneMode: true,
      disableToastMessages: false,
      disableProgressBar: false,
      images: {},
      sounds: {},
      customTokens: [],
    }),
    []
  );

  useEffect(() => {
    const widgetContainer = document.getElementById('cowswap-widget');

    createCowSwapWidget(widgetContainer as HTMLElement, {
      params,
    });
  }, [params]);

  return (
    <Box
      backgroundColor="black"
      id="cowswap-widget"
      style={{
        width: '100%',
        height: '100vh',
        minHeight: layoutConstants.mainContentHeight,
        marginTop: '-120px',
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    />
  );
};
