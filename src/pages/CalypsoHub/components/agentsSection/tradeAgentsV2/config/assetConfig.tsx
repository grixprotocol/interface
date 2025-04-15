import { SiBitcoin, SiEthereum } from 'react-icons/si';

import { UnderlyingAsset } from '@/api/types';

export const assetConfig: Record<UnderlyingAsset, { icon: React.ReactElement; label: string }> = {
  [UnderlyingAsset.BTC]: {
    icon: <SiBitcoin color="#F7931A" />,
    label: 'BTC',
  },
  [UnderlyingAsset.ETH]: {
    icon: <SiEthereum color="#627EEA" />,
    label: 'ETH',
  },
};
