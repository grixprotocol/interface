import { useMutation } from '@tanstack/react-query';
import { useBalance } from 'wagmi';

import { SupportedToken, tokenToAssetMap, useAssetPrice, useCreateUserRequest } from '@/api';
import { OptionBoardItem } from '@/api/tradeboard/types';
import { config } from '@/config';
import { useAnalytics } from '@/services/analytics';
import { calculateAmountWithSlippageInWEI } from '@/utils/calculateAmountWithSlippageInWEI/calculateAmountWithSlippageInWEI';
import { getSignatureExpired } from '@/utils/dateUtil';
import { handlePositionSignMessage } from '@/utils/signMessageWagmi';
import { approveAllowance, fetchAllowance, useUserNetwork } from '@/utils/web3Util';

import { useTradeForm } from '../components/TradeFormProvider';

export const useExecuteProtocolRequest = ({ userAddress, token }: { userAddress?: `0x${string}`; token: SupportedToken }) => {
  const { amount, asset } = useTradeForm();
  const { mutateAsync: createUserRequest } = useCreateUserRequest();
  const { chainId } = useUserNetwork();

  const { isLoading: isLoadingAssetPrice } = useAssetPrice(tokenToAssetMap[token]);
  const { data: underlyingAssetPrice } = useAssetPrice(asset);
  const { data: balanceRes, isLoading: isLoadingBalance } = useBalance({
    address: userAddress,
    token: config.networks.Arbitrum[token],
    chainId: chainId as number,
  });
  const { track } = useAnalytics();

  return useMutation({
    mutationFn: async ({
      slippage,
      option,
      totalPriceInUSD,
      assetPrice,
    }: {
      slippage: string;
      option: OptionBoardItem;
      totalPriceInUSD: number;
      assetPrice: number;
    }) => {
      if (!userAddress) {
        throw new Error('User address is not defined');
      }

      if (isLoadingAssetPrice || isLoadingBalance) {
        throw new Error('Data is still loading');
      }

      if (!assetPrice) {
        throw new Error('Asset price is not available');
      }

      if (!balanceRes) {
        throw new Error('Balance data is not available');
      }

      const trackingStats = {
        asset,
        premium: totalPriceInUSD,
        contract_size: amount,
        notional_volume: Number(amount) * Number(underlyingAssetPrice),
      };

      const tokenAddress = config.networks.Arbitrum[token];
      const slippagePrecent = Number(slippage);

      const amountWithSlippageInWEI = calculateAmountWithSlippageInWEI({
        rawAmount: totalPriceInUSD.toString(),
        slippagePercentage: slippagePrecent,
        decimals: balanceRes.decimals,
        assetPriceInUsd: assetPrice,
      });

      const allowanceInWei = await fetchAllowance(userAddress, tokenAddress);
      if (allowanceInWei < Number(amountWithSlippageInWEI)) {
        const approval = await approveAllowance(amountWithSlippageInWEI.toString(), tokenAddress);
        if (approval) {
          track('stage_3_approve_click', trackingStats);
        }
      }
      const signatureExpired = getSignatureExpired();
      const { userSignature, signedMessage } = await handlePositionSignMessage(
        totalPriceInUSD.toString(),
        option.marketName,
        userAddress,
        signatureExpired,
        asset,
        option.expirationDate,
        option.strikePrice,
        option.optionType,
        amount
      );

      if (userSignature) {
        track('stage_4_confirm_signature', trackingStats);
      }

      const createUserResponse = await createUserRequest({
        expiration: String(option.expirationDate),
        isCall: option.optionType === 'call',
        strikePrice: option.strikePrice,
        contractsAmount: amount,
        baseAsset: asset,
        selectedProtocol: option.marketName,
        signatureExpired,
        addressWallet: userAddress,
        userSignature,
        slippage,
        signedMessage,
        optionId: String(option.optionId),
        payWithAddress: tokenAddress,
        totalPriceInUSD,
        grixFee: {
          usdFee: 0,
          payWithTokenFee: 0,
        },
      });

      return createUserResponse;
    },
  });
};
