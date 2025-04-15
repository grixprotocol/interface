import { isAddress } from 'viem';

export const isValidEvmAddress = (evmAddress: string): boolean => isAddress(evmAddress);
