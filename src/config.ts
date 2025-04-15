/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import aevoLogo from './components/commons/svgLogs/aevoSVG.svg';
import deribitLogo from './components/commons/svgLogs/deribitSVG.svg';
import deriveLogo from './components/commons/svgLogs/deriveSVG.svg';
import ithacaLogo from './components/commons/svgLogs/IthacaSVG.svg';
import mobyLogo from './components/commons/svgLogs/mobySVG.svg';
import premiaLogo from './components/commons/svgLogs/premiaSVG.svg';
import zommaLogo from './components/commons/svgLogs/zommaSVG.svg';

export type Environment = 'debug' | 'dev' | 'staging' | 'main';

export const config = {
  appName: 'Grix',
  projectId: import.meta.env.PROJECTID,
  supportedProtocols: [],
  networks: {
    Arbitrum: {
      chainId: 42161,
      name: 'Arbitrum',
      WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' as const,
      WBTC: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f' as const,
      USDC: '0xaf88d065e77c8cc2239327c5edb3a432268e5831' as const,
    },
    ArbitrumGoerli: {
      chainId: 421613,
      name: 'Arbitrum Goerli',
    },
  },
  derive: {
    optionMarket: {
      'Arbitrum One': {
        ETHOptionMarket: '0x919E5e0C096002cb8a21397D724C4e3EbE77bC15',
        ETHOptionMarketToken: '0xe485155ce647157624C5E2A41db45A9CC88098c3',
        DeriveQuoter: '0x23236b4c7772636b5224df56Be8168A2f42df31C',
      },
      'Arbitrum Goerli': {
        ETHOptionMarket: '0x8642aeb73f4bf85c2bc542918d7f9e64eaaac152',
        ETHOptionMarketToken: '0x1D2cb155E7Ed3f3ee64cD75deA90735c38F53bAc',
        DeriveQuoter: '',
      },
    },
  },
  grix: {
    'Arbitrum One': {
      optionSwapExecutor: '0xd9C937c4AB98857BB97A292c6b1c8ddD8F574649' as const,
      dynamicOperationsExecuter: '0xdfdb6001284ab80b7f0952ea2c06570f9d4ffe72' as const,
      grixNavigator: '0x94c138e09a6a29b6f1f661c480ed7e89b50c9f13' as const,
      grixRouter: '0xC4729457AFCD18fa0F712374DcfE4420a9f3f7c2' as const,
    },
  },
  WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  WBTC: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
  nativeUSDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  bridgeUSDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  network: 'Arbitrum One',
  debug: {
    backendUrl: 'http://localhost:3000/dev',
    apiKey: 'd41d8cd98f00b204e9800998ecf8427e',
    quoteAsset: 'USDC',
    payWithToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    deriveContractAddress: '0x3Fd178DBe9c49955f2DED8f54377b302815b7b51',
  },
  dev: {
    backendUrl: 'https://z61hgkwkn8.execute-api.us-east-1.amazonaws.com/dev', //temp, change to https://internal-api-dev.grix.finance
    apiKey: 'y95lhJK9hk2LOeiLQkVux2ojtoj6H4Me2c6kafRT2',
    quoteAsset: 'USDC',
    payWithToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    deriveContractAddress: '0x3Fd178DBe9c49955f2DED8f54377b302815b7b51',
  },
  staging: {
    backendUrl: 'https://lncvmllp9f.execute-api.us-east-1.amazonaws.com/staging',
    apiKey: '',
    quoteAsset: 'USDC',
    payWithToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    deriveContractAddress: '0x3Fd178DBe9c49955f2DED8f54377b302815b7b51',
  },
  main: {
    backendUrl: '',
    apiKey: '',
    quoteAsset: 'USDC',
    payWithToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    deriveContractAddress: '0x3Fd178DBe9c49955f2DED8f54377b302815b7b51',
  },
};

export const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const OptionType = {
  CALL: 'call',
  PUT: 'put',
};

export const DECIMAL_PLACES_18 = 18;
export const DECIMAL_PLACES_8 = 8;
export const VITE_FUUL_API_KEY = import.meta.env.VITE_FUUL_API_KEY;

export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const getEnv = (): Environment => {
  const env = import.meta.env.VITE_ENV;
  if (!env || !['debug', 'dev', 'staging', 'main'].includes(env)) {
    return 'dev'; // Default to dev if not set or invalid
  }
  return env as Environment;
};

export const env: Environment = getEnv();

export const getIsWhitelistedMode = (): boolean => {
  const whitelistMode = import.meta.env.VITE_WHITELIST_MODE;
  if (whitelistMode === 'false') {
    return false;
  }
  //Return false to cancel whitelist mode
  return false;
};

export const projectId = config.projectId;

export const protocolsPortfolioUrlMap: { [key: string]: string } = {
  'synquote-100': 'https://app.synquote.com/portfolio',
  'derive-100': 'https://www.derive.xyz/history',
  'aevo-100': 'https://app.aevo.xyz/portfolio',
  'rysk-100': 'https://app.rysk.finance/dashboard',
  'premia-100': 'https://app.premia.blue/portfolio',
  'hegic-100': 'https://www.hegic.co/app#/arbitrum/trade/new',
  'moby-100': 'https://app.moby.trade/',
  'panoptic-100': 'https://beta.panoptic.xyz/',
  'sdx-100': 'https://app.sdx.markets/portfolio',
  'dopex-100': 'https://www.stryke.xyz/en/trade/arbitrum/ARB-USDC',
  'thetanuts-100': 'https://app.thetanuts.finance/Trade',
  'optionblitz-100': 'https://app.optionblitz.co/trading',
  'ithaca-100': 'https://app.ithacaprotocol.io/dashboard/trading',
  'zomma-100': 'https://app.zomma.pro/en/main/trade/ETH-USDC',
};

export type ProtocolObject = {
  protocolName: string;
  icon: string;
  label: string;
  url: string;
  isExecution?: boolean;
  isZeroDay?: boolean;
};

export const protocolsArrayData: ProtocolObject[] = [
  {
    protocolName: 'derive',
    icon: deriveLogo,
    label: 'Derive',
    url: 'https://www.derive.xyz',
  },
  // {
  //   protocolName: 'rysk',
  //   icon: ryskLogo,
  //   label: 'Rysk',
  //   url: 'https://app.rysk.finance',
  // },
  // {
  //   protocolName: 'synquote',
  //   icon: synquoteLogo,
  //   label: 'Synquote',
  //   url: 'https://app.synquote.com',
  // },
  {
    protocolName: 'aevo',
    icon: aevoLogo,
    label: 'Aevo',
    url: 'https://app.aevo.xyz',
  },
  {
    protocolName: 'premia',
    icon: premiaLogo,
    label: 'Premia',
    isExecution: true,
    url: 'https://app.premia.blue',
  },
  // {
  //   protocolName: 'hegic',
  //   icon: hegicLogo,
  //   label: 'Hegic',
  //   url: 'https://www.hegic.co',
  // },
  {
    protocolName: 'moby',
    icon: mobyLogo,
    label: 'Moby',
    isExecution: false,
    url: 'https://app.moby.trade/',
  },
  // {
  //   protocolName: 'sdx',
  //   icon: sdxLogo,
  //   label: 'SDX',
  //   url: 'https://app.sdx.markets',
  // },
  // {
  //   protocolName: 'stryke',
  //   icon: strykeLogo,
  //   label: 'Stryke',
  //   isZeroDay: true,
  //   url: 'https://www.stryke.xyz/en',
  // },
  // {
  //   protocolName: 'thetanuts',
  //   icon: thetanutsLogo,
  //   label: 'Thetanuts',
  //   url: 'https://app.thetanuts.finance',
  // },
  // {
  //   protocolName: 'optionBlitz',
  //   icon: optionBlitzLogo,
  //   label: 'OptionBlitz',
  //   url: 'https://app.optionblitz.co',
  // },
  {
    protocolName: 'ithaca',
    icon: ithacaLogo,
    label: 'Ithaca',
    url: 'https://app.ithacaprotocol.io',
  },
  // {
  //   protocolName: 'dopex',
  //   icon: strykeLogo,
  //   label: 'Stryke',
  //   url: 'https://www.stryke.xyz/en',
  // },
  {
    protocolName: 'zomma',
    icon: zommaLogo,
    label: 'Zomma',
    url: 'https://www.zomma.pro',
  },
  {
    protocolName: 'deribit',
    icon: deribitLogo,
    label: 'Deribit',
    url: 'https://www.deribit.com',
  },
];

export const zeroDayExpirationArray = ['3600', '7200', '21600', '43200', '86400', '604800'];

export const deBridgeScriptSrc = 'https://app.debridge.finance/assets/scripts/widget.js';

export const WBTC_Address = '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f';

export const PREMIA_KEY = 'grix_3ZkT6qWxydnaWLZArWMjE3jm';

export const grixLogoUrl =
  'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f697066732e696f2f697066732f516d52556977584b515a624d445766587a567833594c4c5a6852436d4a744c376a75557a5148437a795559427454';
