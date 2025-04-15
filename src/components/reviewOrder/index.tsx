import { Badge, Box, Button, Divider, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useBalance } from 'wagmi';

import { SupportedAsset, tokenToAssetMap, useAssetPrice, useGrixConfig } from '@/api';
import { OptionBoardItem } from '@/api/tradeboard/types';
import { config, protocolsArrayData } from '@/config';
import { GenericModal } from '@/ds';
import { useTradeForm } from '@/pages/TradePage/components/TradeFormProvider';
import { useOnProtocolSubmit } from '@/pages/TradePage/hooks/useOnProtocolSubmit';
import { useAnalytics } from '@/services/analytics';
import { calculateTotalPriceWithFee } from '@/utils/feeCalculations';
import { usdToWei, useUserAccount, useUserNetwork } from '@/utils/web3Util';

import { PointsAnimation } from '../animations/PointsAnimation';
import { useGrixToast } from '../useToast/useToast';
import { ReviewOrderLineItem } from './components/ReviewOrderLineItem';
import { TotalOrderLineItem } from './components/TotalOrderLineItem';
import { getOrderDescriptions } from './constants';
import { useOrderToken } from './hooks/useOrderToken';

export const ReviewOrderModal = ({
  isOpen,
  onClose,
  option,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  option: OptionBoardItem;
}) => {
  const [isArbitrum, setIsArbitrum] = useState(false);
  const { asset: underlyingAsset, amount, onAmountChange } = useTradeForm();
  const availableContracts = option.availableContractAmount ? Number(option.availableContractAmount).toFixed(3) : null;
  const { track } = useAnalytics();
  const {
    token: payWithToken,
    setToken: setPayWithToken,
    optionQuote,
    isLoading: isLoadingQuote,
  } = useOrderToken(option);
  const { chainId } = useUserNetwork();
  const { address: userAddress } = useUserAccount();
  const { onSubmit, isLoading, isDisabled } = useOnProtocolSubmit({ token: payWithToken });
  const { data: balanceResult } = useBalance({
    address: userAddress as `0x${string}`,
    chainId: chainId as number,
    token: config.networks.Arbitrum[payWithToken],
  });
  const grixToast = useGrixToast();
  const { data: configs } = useGrixConfig();
  const { FEE_PERCENTAGE } = configs;
  useEffect(() => {
    setIsArbitrum(chainId === 42161);
  }, [chainId]);

  const { data: assetPrice } = useAssetPrice(underlyingAsset);
  const { data: tokenAssetPrice } = useAssetPrice(tokenToAssetMap[payWithToken]);

  const totalPriceInUSD = Number(option.contractPrice) * Number(amount);
  const totalPriceWithFeeUSD = calculateTotalPriceWithFee(totalPriceInUSD, FEE_PERCENTAGE);
  const points = assetPrice && Number(amount) ? ((assetPrice * Number(amount)) / 10).toFixed(0) : '0';
  const totalTokenPrice = tokenAssetPrice
    ? usdToWei(totalPriceWithFeeUSD, tokenAssetPrice, balanceResult?.decimals)
    : 0n;

  const userHasFunds = balanceResult && balanceResult.value >= totalTokenPrice;
  const actionLabel = option.positionType === 'long' ? 'Buy' : 'Sell';
  const optionTypeLabel = option.optionType === 'call' ? 'Call' : 'Put';

  const { icon: protocolIcon, label: protocolLabel } =
    protocolsArrayData.find((protocol) => protocol.protocolName === option.marketName) ?? {};

  const minAssetAmount = Math.max(underlyingAsset === SupportedAsset.BTC ? 0.001 : 0.01, Number(amount));
  const minUsdAmount = Math.max(0.4, minAssetAmount * Number(option.contractPrice));

  const urlParams = new URLSearchParams(window.location.search);
  const allowMinimum = urlParams.get('allowMinimum') === 'true';

  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ top: 0, left: 0 });

  const handlePrimaryAction = async () => {
    const button = document.querySelector('[data-testid="buy-button"]');
    if (button) {
      const rect = button.getBoundingClientRect();
      setAnimationPosition({
        top: rect.top - 60,
        left: rect.left + rect.width / 2,
      });
    }

    setShowPointsAnimation(true);

    setTimeout(() => {
      setShowPointsAnimation(false);
    }, 2500);

    if (!allowMinimum) {
      if (totalPriceWithFeeUSD < minUsdAmount) {
        grixToast({
          title: 'Minimum order size is $0.4',
          description: 'Please increase the amount to place the order',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (Number(amount) < minAssetAmount) {
        grixToast({
          title: 'Minimum order size is 0.01',
          description: 'Please increase the amount to place the order',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }
    if (!isArbitrum) {
      grixToast({
        title: 'Trading is currently available only on Arbitrum',
        description: 'Please switch to Arbitrum to place the order',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (Number(amount) > Number(availableContracts) && option.marketName === 'moby') {
      grixToast({
        title: 'Not enough contracts available',
        description: 'Please reduce the amount to place the order',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    track('click_buy', {
      premium: totalPriceInUSD,
      contract_size: amount,
      notional_volume: Number(amount) * Number(assetPrice),
    });
    await onSubmit(option, totalPriceWithFeeUSD);
    onClose();
  };

  const handleMaxClick = () => {
    if (balanceResult && tokenAssetPrice) {
      const maxUsdValue = Number(balanceResult.formatted) * tokenAssetPrice;
      const maxAmount = (maxUsdValue / Number(option.contractPrice)).toFixed(2);
      onAmountChange(maxAmount);
    }
  };

  const renderTitle = () => {
    const { asset, expirationDate, strikePrice, optionType } = option;
    const dateLabel = format(Number(expirationDate) * 1000, 'MMM dd').replace(' ', '');
    const strikeLabel = parseFloat(strikePrice);
    const typeLabel = optionType === 'call' ? 'C' : 'P';

    return `${asset}-${dateLabel}-${strikeLabel}-${typeLabel}`;
  };

  const descriptions = getOrderDescriptions({
    protocolIcon,
    protocolLabel,
    availableContracts,
    amount,
    minAssetAmount,
    onAmountChange,
    totalPriceInUSD: totalPriceWithFeeUSD,
  });

  const modalBody = (
    <VStack divider={<Divider borderColor="gray.700" />} color="base.white" fontSize={14}>
      <HStack w="full">
        <Flex>
          <Badge variant={option.optionType === 'call' ? 'primary' : 'primaryError'}>
            {actionLabel} {optionTypeLabel}
          </Badge>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <Text fontSize={18}>{renderTitle()}</Text>
        </Flex>
      </HStack>
      {descriptions.map((description) => (
        <ReviewOrderLineItem key={description.id} {...description} />
      ))}
      {optionQuote ? (
        <VStack w="full" spacing={2}>
          <HStack w="full" justify="space-between" align="center">
            <Text fontSize="sm" color="whiteAlpha.600">
              Pay
            </Text>
            <Flex flex={1} justify="center">
              <HStack spacing={3}>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Balance: {Number(balanceResult?.formatted ?? '0').toFixed(3)}
                </Text>
                <Text
                  as="span"
                  fontSize="xs"
                  color="primary.500"
                  cursor="pointer"
                  onClick={handleMaxClick}
                  _hover={{ textDecoration: 'underline' }}
                >
                  MAX
                </Text>
              </HStack>
            </Flex>
          </HStack>

          <TotalOrderLineItem
            option={option}
            payWithToken={payWithToken}
            onPayWithTokenChanged={setPayWithToken}
            optionQuote={optionQuote}
            totalPriceInUSD={totalPriceWithFeeUSD}
            onAmountChange={onAmountChange}
            minUsdAmount={minUsdAmount}
            allowMinimum={allowMinimum}
          />

          <Button
            variant="primaryGradient"
            height="44px"
            borderRadius="full"
            w="full"
            px={4}
            onClick={() => void handlePrimaryAction()}
            isDisabled={isDisabled || !userHasFunds || isLoadingQuote}
            isLoading={isLoading}
            data-testid="buy-button"
          >
            <Text fontSize="sm" noOfLines={1}>
              {chainId === 42161
                ? userHasFunds
                  ? `${actionLabel} $${Number(totalPriceInUSD).toFixed(2)}`
                  : 'Insufficient funds'
                : 'Trading is currently available only on Arbitrum'}
            </Text>
          </Button>
        </VStack>
      ) : (
        <Spinner size="md" />
      )}
    </VStack>
  );

  return (
    <>
      <GenericModal isOpen={isOpen} onClose={onClose} header="Review order" body={modalBody} size="520px" />

      {showPointsAnimation && (
        <Box
          position="fixed"
          top={animationPosition.top}
          left={animationPosition.left}
          transform="translate(-50%, -50%)"
          zIndex={2000}
          pointerEvents="none"
        >
          <PointsAnimation points={points} />
        </Box>
      )}
    </>
  );
};
