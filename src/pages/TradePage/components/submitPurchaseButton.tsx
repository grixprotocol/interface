import { Box, Button, useDisclosure } from '@chakra-ui/react';

import { OptionBoardItem } from '@/api/tradeboard/types';
import { ReviewOrderModal } from '@/components/reviewOrder';
import { protocolsArrayData } from '@/config';
import { useIsBigScreen } from '@/hooks/useIsBigScreen';

type ProtocolSubmitButtonProps = {
  selectedOption: OptionBoardItem | undefined;
  amountOfContracts: string;
  isTradablePositionExists: OptionBoardItem | undefined;
};

export const ProtocolSubmitButton = ({
  selectedOption,
  amountOfContracts,
  isTradablePositionExists,
}: ProtocolSubmitButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isBigScreen = useIsBigScreen();

  if (selectedOption) {
    const isSelectedOptionTradable = protocolsArrayData.find(
      (protocol) => protocol.protocolName === selectedOption.marketName
    )?.isExecution;
    if (!isSelectedOptionTradable) return null;
  }

  const option = selectedOption || isTradablePositionExists;

  if (!option) return null;

  const totalPriceInUSD = option ? Number(option.contractPrice) * Number(amountOfContracts) : 0;

  return (
    <Box position="sticky" bottom={isBigScreen ? '1vh' : '3vh'} w="100%">
      <Box width="100%" p={0}>
        <Button border="none" variant="primaryGradient" width="100%" maxWidth="430px" onClick={onOpen}>
          {`Buy $${Number(totalPriceInUSD).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </Button>
      </Box>
      {isOpen && <ReviewOrderModal isOpen={isOpen} onClose={onClose} option={option} />}
    </Box>
  );
};
