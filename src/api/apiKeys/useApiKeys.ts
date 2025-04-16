import { useMutation, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { writeContract } from 'wagmi/actions';

import { config, env } from '@/config';
import { apiClient } from '@/services/apiClient';
import { normalizeAddress } from '@/utils/web3Util';
import { creditPaymentABI } from '@/web3Config/creditPayment/ABI/creditPaymentABI';
import { wagmiConfig } from '@/web3Config/reownConfig';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type ApiKey = {
  keyId: string;
  credits: number;
  isActive: boolean;
  keyValue: string;
  transactionHash: string;
  createdAt: string;
  status: PaymentStatus;
};

type ApiKeysResponse = {
  wallet_address: string;
  api_keys: ApiKey[];
};

export type CreditPrice = {
  credit: bigint;
  priceInUsd: bigint;
};

const CREDIT_PAYMENT_ADDRESS = '0x32D60b4b36230424Ef31F05724d299A3340b8250';
const USDC_ADDRESS = '0xaf88d065e77c8cc2239327c5edb3a432268e5831';

export const useGetCreditPrices = () => {
  const publicClient = usePublicClient();
  if (!publicClient) throw new Error('Public client not found');
  return useQuery({
    queryKey: ['creditPrices'],
    queryFn: async () => {
      const data = (await publicClient.readContract({
        address: normalizeAddress(CREDIT_PAYMENT_ADDRESS),
        abi: creditPaymentABI,
        functionName: 'getAllCreditPrices',
      })) as CreditPrice[];

      return data.map((price) => ({
        credits: Number(price.credit),
        priceInUsd: Number(price.priceInUsd), // USDC has 6 decimals
      }));
    },
  });
};

export const useApiKeys = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['apiKeys', address],
    queryFn: async () => {
      if (!address) return [];
      const response = await apiClient.get<ApiKeysResponse>(`${config[env].backendUrl}/apikeys`, {
        params: { wallet_address: address },
      });
      return response.data.api_keys;
    },
    enabled: !!address,
  });
};

export const useCreateApiKey = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async ({ creditAmount }: { creditAmount: number }) => {
      if (!address || !walletClient) throw new Error('Wallet not connected');
      if (!publicClient) throw new Error('Public client not found');

      // First get the new key ID from the API
      const response = await apiClient.get<{ keyId: string }>('/createapikey');
      const { keyId } = response.data;

      // Get price for the selected credit amount
      const priceInUsd = (await publicClient.readContract({
        address: normalizeAddress(CREDIT_PAYMENT_ADDRESS),
        abi: creditPaymentABI,
        functionName: 'getCreditPrice',
        args: [BigInt(creditAmount)],
      })) as bigint;

      if (priceInUsd === 0n) throw new Error('Invalid credit amount');

      // Convert USD price to USDC wei (6 decimals)
      const priceInUsdcWei = BigInt(Number(priceInUsd)) * BigInt(1_000_000);

      // Then approve USDC with wei amount
      const approveTx = await writeContract(wagmiConfig, {
        address: normalizeAddress(USDC_ADDRESS),
        abi: [
          {
            name: 'approve',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'spender', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ type: 'bool' }],
          },
        ],
        functionName: 'approve',
        args: [CREDIT_PAYMENT_ADDRESS as Address, priceInUsdcWei],
      });

      const approveReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx,
      });
      if (!approveReceipt.status) throw new Error('Approval failed');

      // Finally process payment with credit amount and keyId
      const payTx = await writeContract(wagmiConfig, {
        address: normalizeAddress(CREDIT_PAYMENT_ADDRESS),
        abi: creditPaymentABI,
        functionName: 'processPayment',
        args: [USDC_ADDRESS, BigInt(creditAmount), keyId],
      });

      const payReceipt = await publicClient.waitForTransactionReceipt({
        hash: payTx,
      });
      if (!payReceipt.status) throw new Error('Payment failed');

      // After successful payment, send POST request to initiate API payment
      await apiClient.post(`${config[env].backendUrl}/initiateapipayment`, {
        walletAddress: address,
        apiKeyId: keyId,
      });

      return payReceipt.transactionHash;
    },
  });
};

export const useRechargeApiKey = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async ({ creditAmount, keyId }: { creditAmount: number; keyId: string }) => {
      if (!address || !walletClient) throw new Error('Wallet not connected');
      if (!publicClient) throw new Error('Public client not found');

      // Get price for the selected credit amount
      const priceInUsd = (await publicClient.readContract({
        address: normalizeAddress(CREDIT_PAYMENT_ADDRESS),
        abi: creditPaymentABI,
        functionName: 'getCreditPrice',
        args: [BigInt(creditAmount)],
      })) as bigint;

      if (priceInUsd === 0n) throw new Error('Invalid credit amount');

      // Convert USD price to USDC wei (6 decimals)
      const priceInUsdcWei = BigInt(Number(priceInUsd)) * BigInt(1_000_000);

      // Then approve USDC with wei amount
      const approveTx = await writeContract(wagmiConfig, {
        address: normalizeAddress(USDC_ADDRESS),
        abi: [
          {
            name: 'approve',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'spender', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ type: 'bool' }],
          },
        ],
        functionName: 'approve',
        args: [CREDIT_PAYMENT_ADDRESS as Address, priceInUsdcWei],
      });

      const approveReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveTx,
      });
      if (!approveReceipt.status) throw new Error('Approval failed');

      // Finally process payment with credit amount and keyId
      const payTx = await writeContract(wagmiConfig, {
        address: normalizeAddress(CREDIT_PAYMENT_ADDRESS),
        abi: creditPaymentABI,
        functionName: 'processPayment',
        args: [USDC_ADDRESS, BigInt(creditAmount), keyId],
      });

      const payReceipt = await publicClient.waitForTransactionReceipt({
        hash: payTx,
      });
      if (!payReceipt.status) throw new Error('Payment failed');

      // After successful payment, send POST request to initiate API payment
      await apiClient.post(`${config[env].backendUrl}/initiateapipayment`, {
        walletAddress: address,
        apiKeyId: keyId,
      });

      return payReceipt.transactionHash;
    },
  });
};
