import { Divider, HStack, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import { OptionBoardItem } from '@/api/tradeboard/types';
import { PNLChart } from '@/ds/PNLChart';
import { PNLChartPosition } from '@/ds/PNLChart/types';
import { formatCurrency } from '@/utils/number';

import { useTradeForm } from '../../TradeFormProvider';
import { InfoSection } from './infoSection';

export const OptionPriceInfo = ({ option }: { option: OptionBoardItem }) => {
  const { amount, asset, strikePrice, optionType, positionType } = useTradeForm();
  const [potentialPNL, setPotentialPNL] = useState(0);

  const strikePriceAsNumber = Number(strikePrice);
  const premiumAsNumber = Number(option.contractPrice);
  const amountAsNumber = Number(amount);
  const pnlPercentage = (potentialPNL / premiumAsNumber) * 100;

  const chartAttrs: PNLChartPosition = useMemo(
    () => ({
      strikePrice: strikePriceAsNumber,
      premium: premiumAsNumber,
      amount: amountAsNumber,
      optionType,
      positionType,
    }),
    [strikePriceAsNumber, premiumAsNumber, amountAsNumber, optionType, positionType]
  );
  const availableContracts = option.availableContractAmount ? Number(option.availableContractAmount).toFixed(2) : null;
  return (
    <VStack
      borderWidth={1}
      p={3}
      borderTopWidth={0}
      borderColor="primary.500"
      gap={3}
      onMouseLeave={() => setPotentialPNL(premiumAsNumber)}
    >
      <HStack w="full" h="full" justify="space-between" divider={<Divider orientation="vertical" h={8} />} gap={2}>
        {availableContracts ? (
          <InfoSection
            title="Size / Available"
            value={`${amount} / ${availableContracts} ${asset}`}
            flex={1}
            badgeValue={Number(amount) > Number(availableContracts) ? '!' : undefined}
            badgeColorScheme={Number(amount) > Number(availableContracts) ? 'warning' : undefined}
          />
        ) : (
          <InfoSection title="Size" value={`${amount} ${asset}`} flex={1} />
        )}
        <InfoSection
          title="Potential P&L"
          value={formatCurrency(Number(potentialPNL.toFixed(2)))}
          badgeValue={Math.abs(pnlPercentage) > 0.01 ? `${Number(pnlPercentage.toFixed(2))}%` : undefined}
          badgeColorScheme={pnlPercentage > 0 ? 'primary' : 'error'}
          flex={1.2}
        />
      </HStack>
      <PNLChart attributes={chartAttrs} onCursorChanged={setPotentialPNL} />
    </VStack>
  );
};
