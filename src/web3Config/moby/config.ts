import { erc1155ABI } from '../erc1155/abis/erc1155ABI';
import { mobyPositionManagerABI } from './abis/mobyPositionManagerABI';
import { mobySettleManagerABI } from './abis/mobySettleManagerABI';

export const mobyContracts = {
  mobyNFTManager: {
    eth: '0x601AAf9F290aFF7750B8087999526f50166deBA1', // ETH-specific contract address
    btc: '0x8c0c4a7aDCC5961003D5ec7CF395f9E70E1D1249', // BTC-specific contract address
    abi: erc1155ABI,
  },
  mobyPositionManager: {
    address: '0xaf5AB7cCBBFE28576EAa9Fc9183FE1E0078B284c',
    abi: mobyPositionManagerABI,
  },
  mobySettleManager: {
    address: '0xb96e7891a0A131c7DF90A22a434E49209528fB7c',
    abi: mobySettleManagerABI,
  },
};
