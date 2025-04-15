import { Badge, Button, Flex, HStack, Img, Text } from '@chakra-ui/react';

import { OptionBoardItem } from '@/api/tradeboard/types';
import { protocolsArrayData } from '@/config';

import { OptionPriceInfo } from './OptionPriceInfo';
import { PriceButton } from './PriceButton';

type OptionPriceListItemProps = {
  option: OptionBoardItem;
  isSelected: boolean;
  onSelect: (option: OptionBoardItem) => void;
  rightIcon?: React.ReactElement;
};

export const OptionPriceListItem = ({ option, isSelected, onSelect, rightIcon }: OptionPriceListItemProps) => {
  const protocol = protocolsArrayData.find((p) => p.protocolName === option.marketName);
  const isTradableOnGrix = protocol?.isExecution;

  const onListItemClick = () => {
    onSelect(option);
  };

  return (
    <>
      <Button
        data-testid="quote-price-list-item"
        w="full"
        as="li"
        variant="secondary"
        onClick={onListItemClick}
        isActive={isSelected}
        borderRadius="none"
        paddingX={3}
        cursor="pointer"
      >
        <Flex justify="space-between" w="full" align="center">
          <HStack spacing={2}>
            {rightIcon}
            <Img src={protocol?.icon} alt={protocol?.label} width="17.636px" height="17.636px" />
            <Text color="base.white">{protocol?.label ?? option.marketName}</Text>
          </HStack>
          <HStack>
            {isTradableOnGrix && (
              <Badge variant="primary" colorScheme="teal" flexDir="column" color="white" bg="transparent">
                <HStack>
                  <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M36.0395 10.6838L11.7784 10.6838V10.6888C10.0499 10.7835 8.67737 12.2151 8.67737 13.9673C8.67737 15.7807 10.1474 17.2508 11.9608 17.2508C13.6509 17.2508 15.0428 15.9738 15.2242 14.3321L32.7761 14.3321C32.9576 15.9738 34.3494 17.2508 36.0395 17.2508C37.8529 17.2508 39.323 15.7807 39.323 13.9673C39.323 12.1539 37.8529 10.6838 36.0395 10.6838Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.4333 17.2508C16.4258 17.2508 15.6091 18.0675 15.6091 19.0749V35.4922C15.6091 36.4996 16.4258 37.3163 17.4333 37.3163C18.4407 37.3163 19.2574 36.4996 19.2574 35.4922V19.0749C19.2574 18.0675 18.4407 17.2508 17.4333 17.2508Z"
                      fill="currentColor"
                    />
                    <path
                      d="M24.0002 17.2508C22.9927 17.2508 22.176 18.0675 22.176 19.0749V35.4922C22.176 36.4996 22.9927 37.3163 24.0002 37.3163C25.0076 37.3163 25.8243 36.4996 25.8243 35.4922V19.0749C25.8243 18.0675 25.0076 17.2508 24.0002 17.2508Z"
                      fill="currentColor"
                    />
                    <path
                      d="M28.7429 19.0749C28.7429 18.0675 29.5596 17.2508 30.5671 17.2508C31.5745 17.2508 32.3912 18.0675 32.3912 19.0749V35.4922C32.3912 36.4996 31.5745 37.3163 30.5671 37.3163C29.5596 37.3163 28.7429 36.4996 28.7429 35.4922V19.0749Z"
                      fill="currentColor"
                    />
                  </svg>
                  <Text>Buy with Grix</Text>
                </HStack>
              </Badge>
            )}
            <PriceButton option={option} isTradableOnGrix={isTradableOnGrix} />
          </HStack>
        </Flex>
      </Button>
      {isSelected && <OptionPriceInfo option={option} />}
    </>
  );
};
