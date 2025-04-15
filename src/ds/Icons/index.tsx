import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

import { SupportedAsset } from '@/api';

export const SupportedAssetIcons: Record<SupportedAsset, IconType> = {
  [SupportedAsset.BTC]: FaBitcoin,
  [SupportedAsset.ETH]: FaEthereum,
  [SupportedAsset.USDC]: FaEthereum,
  [SupportedAsset.USDCE]: FaEthereum,
};

export * from './USDCIcon';
