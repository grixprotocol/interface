import { Box, HStack, Icon, Switch, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { FaBitcoin, FaCog, FaEthereum } from 'react-icons/fa';

import { PositionTypes, SupportedAsset, TradeOptionType, useTradeboard } from '@/api';
import { getTradeChatbotContext } from '@/components/chatbot/pageContext/tradeContext';
import { protocolsArrayData } from '@/config';
import { CurrencyDropdown, OptionButtonTab } from '@/ds';
import { useAnalytics, withAnalyticsContext } from '@/services/analytics';
import { useUserAccount } from '@/utils/web3Util';

import { ConnectButton } from '../customW3mButton';
import { TradePageChatbotBtn } from './components/chatbotBtn';
import { ExpirationDatePicker } from './components/ExpirationDatePicker';
import { OptionPriceList } from './components/OptionPicker/OptionPriceList';
import { StrikePricePicker } from './components/StrikePricePicker';
import { ProtocolSubmitButton } from './components/submitPurchaseButton';
import { SuggestionBadge } from './components/SuggestionBadge';
import { useTradeForm } from './components/TradeFormProvider';

export const TradeForm = withAnalyticsContext(({ setAnalyticsProperties }) => {
  const { address: userAddress } = useUserAccount();
  const { track } = useAnalytics();
  const {
    asset,
    onAssetChange,
    optionType,
    onOptionTypeChange,
    amount,
    onAmountChange,
    positionType,
    onPositionTypeChange,
    selectedOption,
    isTradePage,
    setIsTradePage,
    isTradablePositionExists,
    strikePrice,
    expirationDate,
  } = useTradeForm();

  const {
    data: tradeboardData,
    isLoading,
    isError,
    isFetching,
  } = useTradeboard({
    shouldFilterExecutionProtocols: isTradePage,
    positionType,
    optionType,
    asset,
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  setAnalyticsProperties({
    page_type: isTradePage ? 'trade' : 'simple_view',
    asset,
    option_type: optionType,
    position_type: positionType,
  });

  const handleOptionTypeChange = (value: TradeOptionType) => {
    track('option_type_change', { option_type: value });
    track('stage_1_option_type_change', { option_type: value });
    onOptionTypeChange(value);
  };
  const handlePositionTypeChange = (value: PositionTypes) => {
    track('position_type_change', { position_type: value });
    track('stage_1_position_type_change', { position_type: value });
    onPositionTypeChange(value);
  };
  const handleCurrencySelect = (selectedAsset: SupportedAsset) => {
    track('asset_change', { asset: selectedAsset });
    track('stage_1_asset_change', { asset: selectedAsset });
    onAssetChange(selectedAsset);
  };

  const isTradableOption = protocolsArrayData.find(
    (protocol) => protocol.protocolName === selectedOption?.marketName
  )?.isExecution;

  const chatbotContext = getTradeChatbotContext(
    positionType,
    optionType,
    asset,
    strikePrice,
    expirationDate,
    amount,
    selectedOption,
    isTradePage
  );

  return (
    <VStack spacing={6} data-testid="trade-form" w="full">
      <TradePageChatbotBtn chatbotContext={chatbotContext} tradeboardData={tradeboardData} />

      <Box w="full">
        <HStack justify="space-between" w="full" spacing={isMobile ? 2 : 4} mb={4} align="center">
          <Box w="auto">
            <OptionButtonTab
              size="md"
              onChange={handlePositionTypeChange}
              options={[
                { label: 'Buy', value: 'long' },
                {
                  label: 'Sell',
                  value: 'short',
                  isDisabled: isTradePage,
                  tooltip: 'Sell available in View Mode only',
                },
              ]}
              value={positionType}
              buttonProps={{
                fontSize: isMobile ? 'sm' : 'md',
                fontWeight: 'semibold',
                h: '40px',
                minW: isMobile ? '95px' : '100px',
                px: isMobile ? 2 : 4,
              }}
            />
          </Box>
          <Box flex={1} h="40px" display="flex" alignItems="center">
            <Box
              bg="blackAlpha.400"
              border="1px solid"
              borderColor="gray.800"
              borderRadius="8px"
              px={isMobile ? 2 : 3}
              h="full"
              w="full"
              display="flex"
              alignItems="center"
            >
              <HStack spacing={isMobile ? 1 : 2} justifyContent="space-between" w="full">
                <HStack spacing={isMobile ? 1 : 2}>
                  <Icon as={FaCog} w={isMobile ? '16px' : '20px'} h={isMobile ? '16px' : '20px'} color="gray.300" />
                  <Text fontSize="70%" fontWeight="medium" color="gray.300" whiteSpace="nowrap">
                    {isTradePage ? 'Only Grix options' : 'Show all options'}
                  </Text>
                </HStack>
                <Switch
                  isChecked={!isTradePage}
                  onChange={
                    () => setIsTradePage(false) //pass :!e.target.checked
                  }
                  size={isMobile ? 'sm' : 'md'}
                />
              </HStack>
            </Box>
          </Box>
        </HStack>

        <OptionButtonTab
          onChange={handleOptionTypeChange}
          options={[
            {
              label: positionType === 'long' ? 'Buy Call' : 'Sell Call',
              value: 'call',
            },
            {
              label: positionType === 'long' ? 'Buy Put' : 'Sell Put',
              value: 'put',
            },
          ]}
          value={optionType}
          width="full"
          buttonProps={{
            fontSize: 'md',
            fontWeight: 'semibold',
            h: '48px',
          }}
        />
      </Box>

      <CurrencyDropdown
        data-testid="currency-dropdown"
        label="Underlying"
        inputLabel="Contract Size"
        value={asset}
        onCurrencySelect={handleCurrencySelect}
        amount={amount}
        onAmountChange={onAmountChange}
        options={[
          {
            label: 'ETH',
            description: 'Ethereum',
            value: SupportedAsset.ETH,
            icon: <FaEthereum color="white" />,
          },
          { label: 'BTC', description: 'Bitcoin', value: SupportedAsset.BTC, icon: <FaBitcoin color="white" /> },
        ]}
        precision={asset === SupportedAsset.BTC ? 3 : 2}
      />
      <HStack w="full" spacing={4} h="184px">
        <ExpirationDatePicker
          tradeboardData={tradeboardData}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          w="205px"
          maxW="50%"
        />
        <StrikePricePicker
          tradeboardData={tradeboardData}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          w="205px"
          maxW="50%"
        />
      </HStack>
      <SuggestionBadge />

      <OptionPriceList isTradePage={isTradePage} />
      <Box position="sticky" bottom="0" width="100%">
        {userAddress ? (
          ((selectedOption && isTradableOption) || isTradablePositionExists) && (
            <ProtocolSubmitButton
              isTradablePositionExists={isTradablePositionExists}
              selectedOption={selectedOption}
              amountOfContracts={amount}
            />
          )
        ) : (
          <ConnectButton label="Connect wallet" w="100%" />
        )}
      </Box>
    </VStack>
  );
});
