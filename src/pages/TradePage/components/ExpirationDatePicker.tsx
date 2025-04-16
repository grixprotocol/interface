import { FlexProps, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { TradeboardResponse } from '@/api/tradeboard/types';
import { Card, ItemsModal, OptionsContainer, WheelPicker } from '@/ds';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { useAnalytics } from '@/services/analytics/useAnalytics';
import { findNearestUpcomingDate, formatTimestampToDate, getRemainingTime } from '@/utils/dateUtil';

import { useTradeForm } from './TradeFormProvider';

type ExpirationDatePickerProps = FlexProps & {
  tradeboardData: TradeboardResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
};

export const ExpirationDatePicker = ({
  tradeboardData,
  isLoading,
  isError,
  isFetching,
  ...props
}: ExpirationDatePickerProps) => {
  const { expirationDate, onExpirationDateChange } = useTradeForm();
  const { isOpen: isModalOpen, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
  const [value, setValue] = useState(expirationDate);
  const { track } = useAnalytics();

  const expirationArray = tradeboardData?.expirationBoard;

  useSelectDefaultExpirationDate(expirationArray);

  const options = useMemo(
    () =>
      expirationArray?.map((date) => ({
        value: date,
        label: format(Number(date) * 1000, 'dd MMM, yyyy'),
        tooltip: formatTimestampToDate(Number(date), true),
      })) ?? [],
    [expirationArray]
  );

  const debouncedOnChange = useDebouncedCallback(onExpirationDateChange, 200);
  const onChange = (value: string) => {
    track('stage_1_choose_expiration', { expiration: value });
    setValue(value);
    debouncedOnChange(value);
  };

  return (
    <Card h="full" {...props} data-testid="expiration-date-picker">
      <OptionsContainer
        title="Expiration"
        onHeaderClick={onOpenModal}
        description={{
          title: 'Expires In:',
          value: expirationDate ? getRemainingTime(expirationDate) : '',
        }}
        isLoading={isLoading || isFetching}
        isError={isError}
      >
        {expirationDate && options && (
          <WheelPicker value={value} options={options} height={100} itemHeight={32} onChange={onChange} />
        )}
      </OptionsContainer>
      <ItemsModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onSelection={onChange}
        title="Expiration"
        items={options}
        value={expirationDate}
      />
    </Card>
  );
};

const useSelectDefaultExpirationDate = (expirationDateOptions?: string[]) => {
  const { expirationDate, onExpirationDateChange } = useTradeForm();

  useEffect(() => {
    if (!expirationDate && expirationDateOptions) {
      onExpirationDateChange(findNearestUpcomingDate(expirationDateOptions) ?? expirationDateOptions[0]);
    }
  }, [expirationDateOptions, expirationDate, onExpirationDateChange]);
};
