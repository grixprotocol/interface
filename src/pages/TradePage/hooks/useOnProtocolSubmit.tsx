import { CheckCircleIcon } from '@chakra-ui/icons';
import { Icon, ToastId, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance, useSwitchChain } from 'wagmi';

import { SupportedToken, tokenToAssetMap, useAssetPrice } from '@/api';
import { OptionBoardItem } from '@/api/tradeboard/types';
import { useGrixToast } from '@/components/useToast/useToast';
import { config } from '@/config';
import { ToastBox } from '@/ds/ToastBox';
import { useAnalytics } from '@/services/analytics';
import { isTransactionEnabled } from '@/utils/transactions';
import { usdToWei, useUserAccount, useUserNetwork } from '@/utils/web3Util';

import { useExecuteProtocolRequest } from './useExecuteProtocolRequest';
import { useProtocolExternalURL } from './useProtocolExternalURL';
type SubmitResponseBody = {
  message: string;
};
type SubmitResponse = {
  statusCode: number;
  body: string;
};

export const useOnProtocolSubmit = ({ token }: { token: SupportedToken }) => {
  const { track } = useAnalytics();
  const toast = useToast();
  const grixToast = useGrixToast();
  const navigate = useNavigate();
  const { openExternalURL, isExternal } = useProtocolExternalURL();
  const { data: assetPrice } = useAssetPrice(tokenToAssetMap[token]);
  const toastIdRef = useRef<ToastId>();
  const { address: userAddress } = useUserAccount();
  const { chainId } = useUserNetwork();
  const { mutateAsync: submit, isPending: isMutating } = useExecuteProtocolRequest({
    userAddress: userAddress as `0x${string}`,
    token,
  });
  const { switchChain } = useSwitchChain();
  const { data: balanceResult } = useBalance({
    address: userAddress as `0x${string}`,
    chainId: chainId as number,
    token: config.networks.Arbitrum[token],
  });

  const onSubmit = async (option: OptionBoardItem, totalPriceInUSD: number) => {
    if (!userAddress || !assetPrice || !balanceResult) return;

    track('protocol_submit', {
      protocol_id: option.optionId,
      amount: option.contractPrice,
      price: option.contractPrice,
    });

    if (isExternal(option.marketName) && (!isTransactionEnabled(option.marketName) || option.priceType === 'bid')) {
      return openExternalURL(option.marketName);
    }

    if (!isTransactionEnabled(option.marketName)) {
      throw new Error('Transactions are not enabled for this protocol');
    }

    const { chainId: arbitrumChainId } = config.networks.Arbitrum;

    if (chainId !== arbitrumChainId) {
      switchChain?.({ chainId: arbitrumChainId });
      return;
    }
    const weiPrice = usdToWei(totalPriceInUSD, assetPrice, balanceResult.decimals);
    if (balanceResult.value < weiPrice) {
      return grixToast({
        title: 'Insufficient WETH Balance',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }

    const response: SubmitResponse = (await submit({
      slippage: '5',
      option,
      totalPriceInUSD,
      assetPrice,
    })) as SubmitResponse;

    if (response && response.statusCode === 200) {
      toastIdRef.current = toast({
        position: 'top-right',
        duration: 6000,
        render: () => (
          <ToastBox
            icon={<Icon as={CheckCircleIcon} color="primary.200" boxSize={6} />}
            title="Intent submitted"
            description="Order submitted! It's now in the solvers queue."
            buttonProps={{
              variant: 'secondary',
              size: 'md',
              bgColor: 'primary.500',
              color: 'white.950',
              children: 'My Orders',
              onClick: () => {
                track('click_navigateToOrders_toast');
                if (toastIdRef.current) {
                  toast.close(toastIdRef.current);
                }
                navigate('/orders?positionsTableType=Positions&ordersTableType=LiveOrders');
              },
            }}
          />
        ),
      });
    } else if (response && response.statusCode !== 200) {
      const parsedResponse = JSON.parse(response.body) as SubmitResponseBody;
      const errorMessage = parsedResponse.message;
      return grixToast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { onSubmit, isLoading: isMutating, isDisabled: !balanceResult || !assetPrice };
};
