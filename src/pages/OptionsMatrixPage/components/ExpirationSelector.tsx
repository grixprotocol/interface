import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, Text, Tooltip, useDisclosure, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';

import { ExpirationType } from '@/api';
import { ItemsModal } from '@/ds';
import { formatDateByTradeType, formatTimestampToDate, getRemainingTime } from '@/utils/dateUtil';

type ExpirationSelectorProps = {
  expirationDate: string;
  setExpirationDate: (date: string) => void;
  expirationDates: string[];
  tradeType: ExpirationType;
  isLoading: boolean;
};

export const ExpirationSelector = ({ expirationDate, setExpirationDate, expirationDates, tradeType }: ExpirationSelectorProps) => {
  const { isOpen: isModalOpen, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);

  const options = useMemo(
    () =>
      expirationDates?.map((date) => ({
        value: date,
        label: formatDateByTradeType(tradeType, date),
        tooltip: formatTimestampToDate(Number(date), true),
      })) ?? [],
    [tradeType, expirationDates]
  );

  const remainingTime = expirationDate ? getRemainingTime(expirationDate) : '';
  const formattedDate = expirationDate ? format(Number(expirationDate) * 1000, 'dd MMM yyyy') : '';

  return (
    <HStack pos="relative" justify="space-between" w="full" spacing={0}>
      <Box
        as="button"
        w="full"
        onClick={onOpenModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        borderRadius={10}
        borderWidth={1}
        borderColor={isHovered || isModalOpen ? 'primary.500' : 'gray.600'}
        transition="all 0.2s"
        _hover={{
          borderColor: 'primary.500',
          bg: 'whiteAlpha.50',
        }}
        px={1}
      >
        <HStack justify="space-between" w="full" h="full">
          <HStack padding={2} spacing={3}>
            <Box p="8px" transition="all 0.2s">
              {expirationDate && (
                <Text color="gray.500" fontSize="12px" fontWeight="500">
                  Expires in
                </Text>
              )}
            </Box>
            <VStack alignItems="flex-start" spacing={0}>
              <Tooltip label="Time until expiration" placement="top">
                <HStack spacing={2} align="flex-start">
                  <Text fontSize="16px" fontWeight="700" color="base.white">
                    {remainingTime ? remainingTime : 'Select date'}
                  </Text>
                  {remainingTime && (
                    <Text fontSize="16px" fontWeight="500" color="gray.500">
                      {formattedDate}
                    </Text>
                  )}
                </HStack>
              </Tooltip>
            </VStack>
          </HStack>
          <Icon as={ChevronDownIcon} boxSize={5} color="gray.400" mr={1} />
        </HStack>
      </Box>

      <ItemsModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onSelection={setExpirationDate}
        title="Select Expiration Date"
        items={options}
        value={expirationDate}
      />
    </HStack>
  );
};
