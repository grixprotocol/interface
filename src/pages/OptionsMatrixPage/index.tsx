import { Box, Center, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

import { SupportedAsset, supportedAssets, useAssetPrice } from '@/api';
import { protocolsArrayData } from '@/config';
import { layoutConstants } from '@/configDesign';
import { Table } from '@/ds';
import { USDCIcon } from '@/ds/Icons/USDCIcon';
import { useSetDefaultQueryParams } from '@/hooks/queryParams';
import { formatCurrency, formatWithCommas } from '@/utils/number';

import { TradeFormProvider, useTradeForm } from '../TradePage/components/TradeFormProvider';
import { ExpirationSelector } from './components/ExpirationSelector';
import { OptionsAssetDropdown } from './components/OptionsAssetDropdown';
import { ProtocolFilters } from './components/ProtocolFilters';
import { TableHeader } from './components/TableHeader';
import { useExpirations } from './hooks/useExpirations';
import { useOptionsMatrix } from './hooks/useOptionsMatrix';
import { useOptionsMatrixTable } from './hooks/useOptionsMatrixTable';
import { OptionMatrixAccessor, OptionMatrixItem } from './types';

const tradeType = 'vanilla';
const positionType = 'long';

type ItemSelection = {
  item: OptionMatrixItem;
  accessor: OptionMatrixAccessor;
};

const OptionsMatrixList = () => {
  useSetDefaultQueryParams('asset', supportedAssets);
  const { asset, onAssetChange, optionType, onOptionTypeChange, expirationDate, onExpirationDateChange } = useTradeForm();

  const [_selectedItem, setSelectedItem] = useState<ItemSelection | undefined>(undefined);
  const [filteredProtocols, setFilteredProtocols] = useState<string[]>(protocolsArrayData.map((p) => p.protocolName));
  const { expirationDates = [], isLoading } = useExpirations({
    protocols: filteredProtocols,
  });
  const { data: assetPriceUSD } = useAssetPrice(asset);

  const { data } = useOptionsMatrix({
    asset,
    expirationDate,
    protocols: filteredProtocols,
  });
  const table = useOptionsMatrixTable({
    data,
    optionType,
    onItemSelection: setSelectedItem,
    assetPriceUSD,
  });

  const scrolledToIndicator = useRef(false);
  if (isLoading) scrolledToIndicator.current = false;
  const CurrentPriceIndicator = useCallback(
    () => (
      <Center
        ref={(el) => {
          if (!scrolledToIndicator.current) el?.scrollIntoView({ behavior: 'smooth' });
          scrolledToIndicator.current = true;
        }}
      >
        <Box fontWeight="bold" color="base.black" bgColor="gray.600" w="fit-content" px={5} py={1} borderRadius={4}>
          Spot: {assetPriceUSD ? formatCurrency(assetPriceUSD) : null}
        </Box>
      </Center>
    ),
    [assetPriceUSD, scrolledToIndicator]
  );

  return (
    <VStack w="full" gap={3} align="flex-start" bgColor="base.black">
      <HStack w="full" justify="space-between" align="center" flexWrap={['wrap', 'wrap', 'nowrap']}>
        <OptionsAssetDropdown
          value={asset}
          onCurrencySelect={onAssetChange}
          options={[
            {
              label: 'ETH',
              description: 'Ethereum',
              value: SupportedAsset.ETH,
              icon: <FaEthereum color="white" />,
            },
            {
              label: 'BTC',
              description: 'Bitcoin',
              value: SupportedAsset.BTC,
              icon: <FaBitcoin color="white" />,
            },
          ]}
        />
        <HStack>
          <Text color="gray.500" fontSize="sm">
            Spot:
          </Text>
          <Box bgColor="base.white" borderRadius="full" p={1}>
            <Icon as={USDCIcon} boxSize={6} color="blue.700" />
          </Box>
          <Text color="base.white" fontSize="sm" fontWeight="medium">
            {formatWithCommas(parseFloat(String(assetPriceUSD) || '0').toFixed(2))}
          </Text>
        </HStack>
        <ExpirationSelector
          tradeType={tradeType}
          expirationDates={expirationDates}
          expirationDate={expirationDate}
          setExpirationDate={onExpirationDateChange}
          isLoading={isLoading}
        />
      </HStack>

      <ProtocolFilters filters={filteredProtocols} onFilterChanged={setFilteredProtocols} />

      <TableHeader positionType={positionType} optionType={optionType} onOptionTypeChange={onOptionTypeChange} />

      <Table
        borderWidth={1}
        height={`calc(${layoutConstants.mainContentHeight} - 300px)`}
        table={table}
        tableProps={{ size: 'md' }}
        thProps={{
          py: 0,
          position: 'sticky',
          top: 0,
          backgroundColor: 'base.black',
          zIndex: 1,
        }}
        tdProps={{ py: 0 }}
        borderColor="gray.600"
        w="100%"
        borderTopWidth={0}
        customExpandedRow={CurrentPriceIndicator}
        maxH="100%"
        overflowY="auto"
        borderBottomRadius="md"
      />
    </VStack>
  );
};

export const OptionsMatrixPage = () => (
  <TradeFormProvider>
    <OptionsMatrixList />
  </TradeFormProvider>
);
