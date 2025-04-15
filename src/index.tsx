import { ChakraProvider } from '@chakra-ui/react';
import { arbitrum, solana } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useSignMessage, WagmiProvider } from 'wagmi';

import { theme } from '@/ds/theme';
import { useAnalytics, withAnalyticsContext } from '@/services/analytics';
import { usePageTracking } from '@/services/analytics/usePageTracking';
import { fuulInit, sendPageView, sendWalletConnected } from '@/utils/FuulSDK/FuulFunctions';
import { useUserAccount } from '@/utils/web3Util';
import { metadata, projectId, solanaWeb3JsAdapter, wagmiAdapter } from '@/web3Config/reownConfig';

import { App } from './App';
import { ChatbotProvider } from './components/chatbot/ChatbotProvider';
import { ErrorBoundary } from './components/errors/ErrorBoundary';
import { GlobalErrorProvider } from './components/errors/GlobalErrorContext';
import reportWebVitals from './reportWebVitals';

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks: [arbitrum, solana],
  metadata,
  projectId,
  features: {
    email: false,
    socials: false,
    analytics: true,
    swaps: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#FFFFFF',
    '--w3m-color-mix-strength': 5,
    '--w3m-border-radius-master': '2px',
  },
});

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 2000,
    },
  },
});

// Analytics component to handle all tracking functionality
const Analytics = withAnalyticsContext(({ setAnalyticsProperties }) => {
  const location = useLocation();
  const { address, status } = useUserAccount();
  const { signMessageAsync } = useSignMessage();
  const { track } = useAnalytics();

  usePageTracking();

  // Initialize Google Analytics
  useEffect(() => {
    const hostname = window.location.hostname;
    let gaMeasurementId;

    switch (hostname) {
      case 'devapp.grix.finance':
        gaMeasurementId = 'G-78TZPDNQCR';
        break;
      case 'app.grix.finance':
        gaMeasurementId = 'G-9E3B1VQHRQ';
        break;
      case 'v0.grix.finance':
        gaMeasurementId = 'G-9D6W7TZ78E';
        break;
      default:
        gaMeasurementId = 'DEFAULT_GA_MEASUREMENT_ID';
        break;
    }

    if (gaMeasurementId) {
      ReactGA.initialize(gaMeasurementId);
      ReactGA.send('pageview');
    }
  }, []);

  // Track page views
  useEffect(() => {
    void sendPageView(location.pathname);
  }, [location]);

  // Handle wallet connection and affiliate links
  useEffect(() => {
    const handleAffiliateLink = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const affiliateLink = urlParams.has('af');

      if (address && affiliateLink && signMessageAsync) {
        const message = `I accepted the affiliate link: ${urlParams.get('af')}`;
        const signature = await signMessageAsync({ message });
        void sendWalletConnected(address, signature, message);
      }
    };

    if (address && status === 'connected') {
      track('wallet_connected', { wallet_address: address });
      void handleAffiliateLink();
    }
  }, [address, signMessageAsync, status, track]);

  // Set analytics properties
  useEffect(() => {
    if (setAnalyticsProperties) {
      setAnalyticsProperties({ wallet_address: address });
    }
  }, [address, setAnalyticsProperties]);

  return null; // This component doesn't render anything
});

// Initialize analytics and monitoring
fuulInit();
reportWebVitals();

// Initialize root
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render app with all providers
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <GlobalErrorProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                <ChatbotProvider>
                  <Router>
                    <Analytics />
                    <App />
                  </Router>
                </ChatbotProvider>
              </WagmiProvider>
            </ChakraProvider>
          </QueryClientProvider>
        </GlobalErrorProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
