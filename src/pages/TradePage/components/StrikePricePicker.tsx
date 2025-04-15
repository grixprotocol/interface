import { FlexProps, useDisclosure } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { useAssetPrice } from '@/api';
import { TradeboardResponse } from '@/api/tradeboard/types';
import { protocolsArrayData } from '@/config';
import { Card, ItemsModal, OptionsContainer, WheelPicker } from '@/ds';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { useAnalytics } from '@/services/analytics';
import { formatPriceDisplay, formatWithCommas, strikePriceFormat } from '@/utils/number';

import { useTradeForm } from './TradeFormProvider';

type StrikePricePickerProps = FlexProps & {
  tradeboardData: TradeboardResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
};

export const StrikePricePicker = ({
  tradeboardData,
  isLoading,
  isError,
  isFetching,
  ...props
}: StrikePricePickerProps) => {
  const { track } = useAnalytics();
  const { isOpen: isModalOpen, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
  const { strikePrice, setStrikePrice, expirationDate, asset } = useTradeForm();
  const { data: assetPriceUSD, isLoading: isLoadingAssetPrice } = useAssetPrice(asset);
  const [value, setValue] = useState(strikePrice);

  useEffect(() => {
    if (tradeboardData) {
      selectInitialStrikePrice(tradeboardData, expirationDate, setStrikePrice);
    }
  }, [tradeboardData, expirationDate, setStrikePrice]);

  useEffect(() => {
    // Update local value when strikePrice changes from outside
    setValue(strikePrice);
  }, [strikePrice]);

  const options = useMemo(() => {
    const allStrikePrices = tradeboardData?.strikeBoard;
    const strikeBoard = allStrikePrices?.[expirationDate || Object.keys(allStrikePrices)[0]];
    const mappedData =
      strikeBoard?.map((strikePrice) => ({
        value: strikePrice,
        label: formatPriceDisplay(strikePriceFormat(strikePrice)),
      })) ?? [];
    return mappedData;
  }, [tradeboardData, expirationDate]);

  const furthestStrikePrice = options.length ? options[options.length - 1].value : undefined;

  const modalOptions = useMemo(
    () =>
      options.map((option) => ({
        label: option.label,
        value: option.value,
        badge:
          furthestStrikePrice === option.value && assetPriceUSD
            ? `Spot ${formatPriceDisplay(formatWithCommas(assetPriceUSD))}`
            : undefined,
      })),
    [options, furthestStrikePrice, assetPriceUSD]
  );

  const debouncedSetStrikePrice = useDebouncedCallback(setStrikePrice, 200);

  const onChange = (value: string) => {
    track('stage_1_choose_strike', { strike: value });
    setValue(value);
    debouncedSetStrikePrice(value);
  };

  return (
    <Card h="full" {...props} data-testid="strike-price-picker">
      <OptionsContainer
        title="Strike"
        onHeaderClick={onOpenModal}
        description={
          assetPriceUSD
            ? {
                title: `Spot:`,
                value: `$${formatWithCommas(parseFloat(String(assetPriceUSD) || '0').toFixed(2))}`,
                dataTestId: 'spot-value',
              }
            : undefined
        }
        isLoading={isLoading || isLoadingAssetPrice || isFetching}
        isError={isError}
      >
        {options && strikePrice && (
          <WheelPicker value={value} options={options} height={100} itemHeight={32} onChange={onChange} />
        )}
      </OptionsContainer>
      <ItemsModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onSelection={onChange}
        title="Strike"
        items={modalOptions}
        value={value}
      />
    </Card>
  );
};

const selectInitialStrikePrice = (
  data: TradeboardResponse,
  expirationDate: string,
  setStrikePrice: (strikePrice: string) => void
) => {
  let longestLength = 0;
  let isFoundStrikePriceWithExecutionProtocol = false;
  const optionsArrayAtSelectedExpiry = data?.optionBoard[expirationDate || Object.keys(data?.optionBoard || {})[0]];
  if (optionsArrayAtSelectedExpiry) {
    // Find strike prices with execution protocols and count total options
    Object.keys(optionsArrayAtSelectedExpiry).forEach((strikePrice) => {
      const optionsArray = optionsArrayAtSelectedExpiry[strikePrice] || [];
      const hasExecutionProtocol = optionsArray.some((option) => {
        const protocol = protocolsArrayData.find((p) => p.protocolName === option.marketName);
        return protocol?.isExecution === true;
      });

      if (hasExecutionProtocol) {
        isFoundStrikePriceWithExecutionProtocol = true;
        const length = optionsArray.length;
        if (length > longestLength) {
          longestLength = length;
          setStrikePrice(strikePrice);
        }
      }
    });

    if (!isFoundStrikePriceWithExecutionProtocol) {
      // Reset longestLength for non-execution protocol search
      longestLength = 0;
      Object.keys(optionsArrayAtSelectedExpiry).forEach((strikePrice) => {
        const length = optionsArrayAtSelectedExpiry[strikePrice]?.length || 0;
        if (length > longestLength) {
          longestLength = length;
          setStrikePrice(strikePrice);
        }
      });
    }
  }
};
