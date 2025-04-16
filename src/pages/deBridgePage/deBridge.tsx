import { Box, Flex, Spinner } from '@chakra-ui/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { deBridgeScriptSrc } from '@/config';
import { LoadingContainer } from '@/ds';

type DeBridge = {
  widget: (config: object) => void;
};

// Use type assertion to access custom properties on the window object
const deBridgeWindow = window as Window & {
  deBridge?: DeBridge;
};

// Create a lazy-loaded inner component that handles the actual deBridge functionality
const DeBridgeContent = () => {
  const location = useLocation();
  const isInitialized = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = deBridgeScriptSrc;
    script.async = true;

    const initializeWidget = () => {
      if (deBridgeWindow.deBridge && !isInitialized.current) {
        deBridgeWindow.deBridge.widget({
          v: '1',
          element: 'grixWidget',
          title: '',
          description: '',
          width: '600',
          height: '800',
          r: '23117',
          affiliateFeePercent: '0.1',
          affiliateFeeRecipient: '0xE3De31f59d055267edF868Ce4FdB78d3D4B29354',
          supportedChains: {
            inputChains: {
              '1': [''],
              '10': 'all',
              '56': 'all',
              '137': 'all',
              '8453': 'all',
              '42161': 'all',
              '43114': 'all',
              '59144': 'all',
              '7565164': 'all',
              '245022934': 'all',
            },
            outputChains: {
              '1': 'all',
              '10': 'all',
              '56': 'all',
              '137': 'all',
              '8453': 'all',
              '42161': ['0x912ce59144191c1204e64559fe8253a0e49e6548'],
              '43114': 'all',
              '59144': 'all',
              '7565164': 'all',
              '245022934': 'all',
            },
          },
          inputChain: 1,
          outputChain: 42161,
          inputCurrency: '',
          outputCurrency: '',
          address: '',
          showSwapTransfer: true,
          amount: '',
          outputAmount: '',
          isAmountFromNotModifiable: false,
          isAmountToNotModifiable: false,
          lang: 'en',
          mode: 'deswap',
          isEnableCalldata: false,
          styles:
            'eyJhcHBCYWNrZ3JvdW5kIjoiIzAwMDAwMCIsImFwcEFjY2VudEJnIjoiIzAwMDAwMCIsImJhZGdlIjoiIzY5NTc1NyIsImJvcmRlclJhZGl1cyI6MTAsImZvcm1Db250cm9sQmciOiIjMDcwMjAyIiwiZHJvcGRvd25CZyI6IiMwNzAyMDIiLCJwcmltYXJ5IjoiIzJlZDNiNyIsInN1Y2Vzc2MiOiIjMmVkM2I3IiwiZm9udEZhbWlseSI6IlBvcHBpbnMiLCJwcmltYXJ5QnRuQmciOiIjMkVEM0I3Iiwic2Vjb25kYXJ5QnRuQmciOiIiLCJsaWdodEJ0bkJnIjoiIn0=',
          theme: 'dark',
          isHideLogo: false,
          logo: 'https://app.grix.finance/assets/GrixLogo-798f86ab.svg',
        });
        isInitialized.current = true;
        setLoading(false);
      }
    };

    document.body.appendChild(script);
    script.onload = initializeWidget;

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      isInitialized.current = false;
      setLoading(true);
    };
  }, [location]);

  return (
    <Flex minH="100vh" align="center" justify="center" position="relative" width="100%" background="black">
      {loading && (
        <Spinner size="xl" position="absolute" left="50%" top="50%" transform="translate(-50%, -50%)" color="white" />
      )}
      <Box id="grixWidget" height="90%"></Box>
    </Flex>
  );
};

// Export the main component with Suspense
export const DeBridgePage = () => (
  <Suspense fallback={<LoadingContainer />}>
    <DeBridgeContent />
  </Suspense>
);
