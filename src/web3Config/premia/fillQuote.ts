import { UseToastOptions } from '@chakra-ui/react';
import { OrderbookQuote, QuoteOB } from '@premia/v3-sdk';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

import { useGrixToast } from '@/components/useToast/useToast';
import { PREMIA_KEY } from '@/config';
import { checkBalanceOfERC1155 } from '@/utils/web3Util';
import { wagmiConfig } from '@/web3Config/reownConfig';

import { PoolTradeABI } from './abi/poolTradeABI';
import { HandlePremiaFillQuoteParams, TokenType } from './types';

export type CloseOrSettleResponse = {
  txHash: string;
};

const handleFillQuoteTransaction = async (
  poolAddress: string,
  functionName: string,
  args: unknown[],
  setIsActionBtnLoading: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      optionTokenId: string;
    }>
  >
) => {
  setIsActionBtnLoading({ state: true, optionTokenId: poolAddress });

  try {
    const tx = await writeContract(wagmiConfig, {
      abi: PoolTradeABI,
      address: poolAddress as `0x${string}`,
      functionName,
      args,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      confirmations: 1,
      hash: tx,
    });

    return { txHash: tx };
  } catch (error) {
    throw new Error(error as string);
  } finally {
    setIsActionBtnLoading({ state: false, optionTokenId: '' });
  }
};

const displayToast = (
  grixToast: (options: UseToastOptions) => void,
  title: string,
  description: string,
  status: 'error' | 'warning' | 'info'
) => {
  grixToast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
  });
};

export const fetchPoolQuery = async (
  poolAddress: string,
  userAddress: `0x${string}`,
  fillSize: string
): Promise<OrderbookQuote | null> => {
  const requestObject = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': import.meta.env.VITE_PREMIA_KEY,
    },
    body: null,
  };
  const url = `https://orderbook.premia.finance/quotes?poolAddress=${poolAddress}&size=${fillSize}&side=bid&taker=${userAddress}&chainId=42161`;
  const response = await fetch(url, {
    ...requestObject,
  });
  const data: OrderbookQuote[] = (await response.json()) as OrderbookQuote[];
  if (data.length > 0) {
    const poolDeadline = data[0].deadline; // The timestamp you want to check
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const isValidPoolQuote = poolDeadline > currentTimestamp;
    return isValidPoolQuote ? data[0] : null;
  }

  return null;
};

export const useFillQuote = () => {
  const grixToast = useGrixToast();

  const handlePremiaFillQuote = async ({
    poolAddress,
    fillSize,
    userAddress,
    setIsActionBtnLoading,
    isExpired,
  }: HandlePremiaFillQuoteParams): Promise<CloseOrSettleResponse | undefined> => {
    if (fillSize === 0n) {
      displayToast(grixToast, 'NFT balance is 0', '', 'error');
      return;
    }

    if (isExpired) {
      return handleFillQuoteTransaction(poolAddress, 'exercise', [], setIsActionBtnLoading);
    }

    const poolQuote: OrderbookQuote | null = await fetchPoolQuery(poolAddress, userAddress, fillSize.toString());

    if (!poolQuote) {
      displayToast(
        grixToast,
        'Pool quote not found',
        'Please try again later, or you could try creating a limit order to sell your position or depositing it into a range order (via Premia dApp).',
        'warning'
      );
      return;
    }

    const quoteOB: QuoteOB = {
      provider: poolQuote.provider,
      taker: poolQuote.taker,
      price: BigInt(poolQuote.price),
      size: BigInt(poolQuote.size),
      isBuy: poolQuote.isBuy,
      deadline: BigInt(poolQuote.deadline),
      salt: BigInt(poolQuote.salt),
    };

    const signedQuote = {
      r: poolQuote.signature.r,
      s: poolQuote.signature.s,
      v: poolQuote.signature.v,
    };

    const fillQuoteArgs = [quoteOB, fillSize, signedQuote, '0x0000000000000000000000000000000000000000'];
    return handleFillQuoteTransaction(poolAddress, 'fillQuoteOB', fillQuoteArgs, setIsActionBtnLoading);
  };

  const premiaPositionBalance = async (poolAddress: `0x${string}`, userAddress: `0x${string}`, isShort: boolean) => {
    const tokenId = isShort ? TokenType.SHORT : TokenType.LONG;
    return await checkBalanceOfERC1155(poolAddress, userAddress, tokenId.toString());
  };

  return { handlePremiaFillQuote, premiaPositionBalance };
};
