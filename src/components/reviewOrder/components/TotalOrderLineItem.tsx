import { Box, HStack, NumberInput, NumberInputField } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { OptionQuote, SupportedAsset, SupportedToken, tokenDecimals, tokenToAssetMap, useAssetPrice } from '@/api';
import { tokenIconMap } from '@/api/tokenIconMap';
import { OptionBoardItem } from '@/api/tradeboard/types';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { OptionsAssetDropdown } from '@/pages/OptionsMatrixPage/components/OptionsAssetDropdown';
import { useTradeForm } from '@/pages/TradePage/components/TradeFormProvider';
import { ethToUsd, usdToEth } from '@/utils/web3Util';

import { ReviewOrderLineItem } from './ReviewOrderLineItem';

export const TotalOrderLineItem = ({
  option,
  payWithToken,
  onPayWithTokenChanged,
  optionQuote,
  totalPriceInUSD,
  onAmountChange,
}: {
  option: OptionBoardItem;
  payWithToken: SupportedToken;
  onPayWithTokenChanged: (token: SupportedToken) => void;
  optionQuote: OptionQuote;
  totalPriceInUSD: number;
  onAmountChange: (amount: string) => void;
  minUsdAmount: number;
  allowMinimum: boolean;
}) => {
  const { asset: underlyingAsset } = useTradeForm();
  const { data: assetPrice } = useAssetPrice(tokenToAssetMap[payWithToken]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (assetPrice && totalPriceInUSD) {
      const tokenAmount = usdToEth(totalPriceInUSD, assetPrice);
      setInputValue(tokenAmount.toFixed(tokenDecimals[payWithToken]));
    }
  }, [totalPriceInUSD, assetPrice, payWithToken]);

  const debouncedAmountChange = useDebouncedCallback((value: string) => {
    if (!assetPrice) return;

    const amountInToken = parseFloat(value);
    const amountInUSD = ethToUsd(amountInToken, assetPrice);
    const contractAmount = amountInUSD / Number(option.contractPrice);
    const roundingAmount = underlyingAsset === SupportedAsset.ETH ? 2 : 3;
    const roundedContractAmount = Math.round(contractAmount * 10 ** roundingAmount) / 10 ** roundingAmount;
    onAmountChange(roundedContractAmount.toString());
  }, 500);

  const handleTokenAmountChange = (value: string) => {
    setInputValue(value);
    debouncedAmountChange(value);
  };

  return (
    <ReviewOrderLineItem
      label={
        <OptionsAssetDropdown
          value={payWithToken}
          onCurrencySelect={onPayWithTokenChanged}
          options={
            optionQuote?.prices.map((price) => ({
              value: price.token,
              label: price.token,
              icon: tokenIconMap[price.token],
              description: price.token,
            })) ?? []
          }
        />
      }
      column={
        <Box border="1px solid" borderColor="whiteAlpha.300" borderRadius="md" px={3} py={1}>
          <HStack spacing={2} justify="space-between">
            <Box
              borderRadius="50%"
              bg="rgba(0, 0, 0, 0.4)"
              p="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="14px"
              boxShadow="0px 0px 12px rgba(255, 255, 255, 0.1)"
            >
              {tokenIconMap[payWithToken]}
            </Box>
            <NumberInput
              size="xs"
              variant="unstyled"
              value={inputValue}
              min={0}
              precision={tokenDecimals[payWithToken]}
              onChange={handleTokenAmountChange}
            >
              <NumberInputField textAlign="right" fontSize="small" p={0} _focus={{ outline: 'none' }} />
            </NumberInput>
          </HStack>
        </Box>
      }
      // rightColumn={<Text fontSize="sm">{usdValue}</Text>}
    />
  );
};
