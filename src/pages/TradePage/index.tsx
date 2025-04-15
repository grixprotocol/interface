import { expirationTypes, positionTypes, supportedAssets, tradeOptionTypes } from '@/api';
import { BaseCard } from '@/components/BaseCard';
import { useSetDefaultQueryParams } from '@/hooks/queryParams';

import { TradeFormProvider } from './components/TradeFormProvider';
import { TradeForm } from './TradeForm';

export const TradePage = () => {
  useSetDefaultQueryParams('tradeType', expirationTypes);
  useSetDefaultQueryParams('optionType', tradeOptionTypes);
  useSetDefaultQueryParams('asset', supportedAssets);
  useSetDefaultQueryParams('positionType', positionTypes);

  return (
    <TradeFormProvider>
      <BaseCard maxW="460px" h="full" hover={false}>
        <TradeForm />
      </BaseCard>
    </TradeFormProvider>
  );
};
