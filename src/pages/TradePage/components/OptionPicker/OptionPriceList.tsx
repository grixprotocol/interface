import { ButtonGroup, Progress, Skeleton, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaExclamationTriangle } from 'react-icons/fa';

import { OptionBoardItem } from '@/api/tradeboard/types';
import { refetchInterval, useTradeboard } from '@/api/tradeboard/useTradeboard';
import { useGrixToast } from '@/components/useToast/useToast';
import { useAnalytics } from '@/services/analytics';
import { useUserAccount } from '@/utils/web3Util';

import { splitOptionsByIsTradable } from '../../helpers';
import { useTradeForm } from '../TradeFormProvider';
import { OptionPriceListItem } from './OptionPriceListItem';

type OptionPriceListProps = {
  isTradePage: boolean;
};

export const OptionPriceList = ({ isTradePage }: OptionPriceListProps) => {
  const { track } = useAnalytics();
  const {
    expirationDate,
    strikePrice,
    selectedOption,
    setSelectedOption,
    positionType,
    optionType,
    asset,
    setIsTradablePositionExists,
  } = useTradeForm();

  // Use state to track progress value
  const [progressValue, setProgressValue] = useState(0);

  const { address: userAddress } = useUserAccount();
  const { data, isLoading, isError, isFetching } = useTradeboard({
    shouldFilterExecutionProtocols: isTradePage,
    positionType,
    optionType,
    asset,
  });

  // Reset and animate progress when fetching changes
  useEffect(() => {
    if (isFetching) {
      setProgressValue(0);
    } else {
      setProgressValue(0); // Reset first

      // Start a new animation
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const newValue = Math.min(100, (elapsed / refetchInterval) * 100);
        setProgressValue(newValue);

        if (newValue < 100 && !isFetching) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isFetching]);

  const optionBoard = useMemo(() => {
    const allOptions = data?.optionBoard;
    if (!allOptions || !expirationDate || !strikePrice) return [];
    const options = allOptions[expirationDate]?.[strikePrice] ?? [];
    return options;
  }, [data, expirationDate, strikePrice]);

  const { tradableOnGrix, notTradableOnGrix } = splitOptionsByIsTradable(optionBoard);

  const isTradablePositionExists = tradableOnGrix.length > 0;
  setIsTradablePositionExists(isTradablePositionExists ? tradableOnGrix[0] : undefined);

  const grixToast = useGrixToast();

  const handleOptionSelect = (option: OptionBoardItem) => {
    track('protocol_select', {
      protocol_id: option.optionId,
      amount: option.contractPrice,
      price: option.contractPrice,
    });
    if (!userAddress) {
      return grixToast({
        title: 'Wallet Not Connected',
        description: 'To continue, you need to connect your wallet.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
    setSelectedOption(option);
    if (selectedOption === option) {
      setSelectedOption(undefined);
    }
  };

  return (
    <VStack w="full" gap={0}>
      {/* Simple progress bar with React state */}
      {!isLoading && !isError && (
        <Progress value={progressValue} w="full" borderRadius="5px" mb={1} h="2px" maxW="100%" />
      )}
      <ButtonGroup isAttached as="ul" spacing={0} flexDir="column" w="full">
        {tradableOnGrix.map((option, index) => (
          <OptionPriceListItem
            key={`tradable-${index}`}
            option={option}
            isSelected={selectedOption === option}
            onSelect={() => {
              handleOptionSelect(option);
            }}
            rightIcon={selectedOption === option ? <FaChevronDown /> : <FaChevronRight />}
          />
        ))}
        {notTradableOnGrix.map((option, index) => (
          <OptionPriceListItem
            key={`not-tradable-${index}`}
            option={option}
            isSelected={selectedOption === option}
            onSelect={() => {
              handleOptionSelect(option);
            }}
            rightIcon={selectedOption === option ? <FaChevronDown /> : <FaChevronRight />}
          />
        ))}
        {isLoading && (
          <VStack w="full" spacing={2}>
            {Array.from(Array(isLoading ? 6 : 1).keys()).map((index) => (
              <Skeleton key={index} w="full" height="40px" borderRadius="none" />
            ))}
          </VStack>
        )}
        {isError && <FaExclamationTriangle color="red.500" />}
      </ButtonGroup>
    </VStack>
  );
};
