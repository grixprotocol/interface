import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

import { OptionBoardItem } from '@/api/tradeboard/types';
import { ReviewOrderModal } from '@/components/reviewOrder';
import { protocolsArrayData } from '@/config';
import { formatCurrency } from '@/utils/number';

import { useTradeForm } from '../TradeFormProvider';

type PriceBadgeProps = {
  option: OptionBoardItem;
  isTradableOnGrix: boolean | undefined;
};

export const PriceButton = ({ option, isTradableOnGrix }: PriceBadgeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { amount } = useTradeForm();
  const totalPriceInUSD = Number(option.contractPrice) * Number(amount);

  const usdPriceLabel = formatCurrency(Number(totalPriceInUSD).toFixed(2));

  const onActiveProtocolClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    const protocol = protocolsArrayData.find((protocol) => protocol.protocolName === option.marketName);
    if (isTradableOnGrix) {
      e.stopPropagation();
      e.preventDefault();
      onOpen();
    } else {
      window.open(protocol?.url, '_blank');
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="primaryGradient"
        onClick={onActiveProtocolClick}
        paddingX={2}
        borderRadius="16px"
        {...getBorderProps(isTradableOnGrix)}
      >
        <HStack w="full" spacing={1}>
          <Text>{usdPriceLabel}</Text>
        </HStack>
      </Button>
      {isOpen && <ReviewOrderModal isOpen={isOpen} onClose={onClose} option={option} />}
    </>
  );
};

const getBorderProps = (isTradableOnGrix: boolean | undefined) => {
  if (!isTradableOnGrix)
    return {
      borderColor: 'transparent',
      bg: 'linear-gradient(#000 0%, #000 100%) padding-box, linear-gradient(90deg, #2E90FA 0%, #15B79E 100%) border-box',
      _hover: {
        bg: 'linear-gradient(#000 0%, #000 100%) padding-box, linear-gradient(90deg, #1570EF 0%, #0E9384 100%) border-box',
      },
    };
};
