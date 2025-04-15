import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { erc20Abi, getAddress, parseUnits } from 'viem';
import { readContract, writeContract } from 'wagmi/actions';

import { config } from '@/config';
import { erc1155ABI } from '@/web3Config/erc1155/abis/erc1155ABI';
import { wagmiConfig } from '@/web3Config/reownConfig';

export const addressShortcut = (addressWallet: string) => {
  if (!addressWallet) return '';
  const address = `${addressWallet?.slice(0, 6)}...${addressWallet?.slice(-4)} `;
  return address;
};

export function normalizeAddress(input: string) {
  const normalized = getAddress(input);
  return normalized;
}

const spender = config.grix['Arbitrum One'].grixRouter;

export const fetchAllowance = (userAddress: `0x${string}`, tokenAddress: string) =>
  readContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(tokenAddress),
    functionName: 'allowance',
    args: [userAddress, spender],
  });
export const isApprovalSetForAll = async (
  contractAddress: `0x${string}`,
  account: `0x${string}`,
  operator: `0x${string}`
) => {
  try {
    const result = await readContract(wagmiConfig, {
      abi: erc1155ABI,
      address: normalizeAddress(contractAddress),
      functionName: 'isApprovedForAll',
      args: [account, operator], // Pass the account and operator addresses,
    });
    return result as boolean;
  } catch (error) {
    return false;
  }
};

export const approveAllowance = (amount: string, tokenAddress: string) =>
  writeContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(tokenAddress),
    functionName: 'approve',
    args: [spender, BigInt(amount)],
  });

export const usdToEth = (usdAmount: number | string, assetPrice: number) => Number(usdAmount) / assetPrice;

export const ethToUsd = (ethAmount: number | string, assetPrice: number) => Number(ethAmount) * assetPrice;

export const usdToWei = (usdAmount: number | string, assetPrice: number, decimals = 18) => {
  if (isNaN(Number(usdAmount))) return 0n;
  const ethAmount = usdToEth(usdAmount, assetPrice);

  const ethAmountString = ethAmount.toFixed(decimals);

  return parseUnits(ethAmountString, decimals);
};

export const checkBalanceOfERC1155 = async (contractAddress: string, account: `0x${string}`, tokenId: string) => {
  const balance = await readContract(wagmiConfig, {
    abi: erc1155ABI,
    address: normalizeAddress(contractAddress),
    functionName: 'balanceOf',
    args: [account, tokenId],
  });
  return BigInt(balance as bigint);
};

export const checkBalanceOfERC20 = async (contractAddress: string, account: `0x${string}`) => {
  const balance = await readContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(contractAddress),
    functionName: 'balanceOf',
    args: [account],
  });
  return BigInt(balance);
};

export const approveErc1155Allowance = (tokenAddress: string, operator: `0x${string}`) =>
  writeContract(wagmiConfig, {
    abi: erc1155ABI,
    address: normalizeAddress(tokenAddress),
    functionName: 'setApprovalForAll',
    args: [operator, true],
  });

export const useUserAccount = () => {
  const { address, isConnected, caipAddress, status, allAccounts, embeddedWalletInfo } = useAppKitAccount();
  return { address, isConnected, caipAddress, status, allAccounts, embeddedWalletInfo };
};

export const useUserNetwork = () => {
  const { chainId, switchNetwork } = useAppKitNetwork();
  return { chainId, switchNetwork };
};
