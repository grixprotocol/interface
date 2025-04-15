import { FaBitcoin, FaDollarSign, FaEthereum } from 'react-icons/fa';

import { SupportedToken } from './types';

export const tokenIconMap = {
  [SupportedToken.WETH]: <FaEthereum color="#627EEA" />,
  [SupportedToken.WBTC]: <FaBitcoin color="#F7931A" />,
  [SupportedToken.USDC]: <FaDollarSign color="#2775CA" />,
};
