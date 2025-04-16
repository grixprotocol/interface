import { Flex, HStack, Icon, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FaBitcoin, FaQuestionCircle } from 'react-icons/fa';

import { PointsContainer, TradeButton } from '../utils';

export const TradeAndEarn = ({ isBigScreen }: { isBigScreen: boolean }) => (
  <PointsContainer h={isBigScreen ? '130px' : '170px'}>
    <HStack w="full" spacing={5} py={2} overflow="auto">
      <Icon as={FaBitcoin} boxSize={6} mt={1} color="#f7931a" transition="transform 0.2s" _hover={{ transform: 'scale(1.1)' }} />
      <VStack alignItems="flex-start" flex={1} spacing={3}>
        <HStack spacing={2} alignItems="center">
          <PointsContainer.Title>Trade & Earn</PointsContainer.Title>
          <Tooltip label="Start trading now to earn points" aria-label="Trade info" placement="top" hasArrow bg="gray.700">
            <Flex>
              <Icon
                as={FaQuestionCircle}
                boxSize={4}
                color="gray.400"
                transition="color 0.2s"
                _hover={{ color: 'gray.200' }}
                cursor="help"
              />
            </Flex>
          </Tooltip>
        </HStack>
        <HStack spacing={3} alignItems="center">
          <Text fontSize="sm" color="gray.300" letterSpacing="0.2px">
            Trade and earn{' '}
            <Text as="span" color="primary.500" fontWeight="600">
              100 points
            </Text>{' '}
            for every{' '}
            <Text as="span" color="primary.500" fontWeight="600">
              $1,000
            </Text>{' '}
            in notional volume
          </Text>
          <Tooltip
            label="Notional volume is the total dollar value (contracts × spot price)"
            aria-label="Volume explanation"
            placement="top"
            hasArrow
            openDelay={200}
            bg="gray.700"
            color="white"
            fontSize="sm"
            borderRadius="md"
            px={3}
            py={2}
          >
            <Flex>
              <Icon
                as={FaQuestionCircle}
                boxSize={3.5}
                color="gray.400"
                transition="color 0.2s"
                _hover={{ color: 'gray.200' }}
                cursor="help"
              />
            </Flex>
          </Tooltip>
        </HStack>
      </VStack>
      <Flex alignItems="center" h="full" transition="all 0.2s" _hover={{ transform: 'translateY(-1px)' }}>
        <TradeButton />
      </Flex>
    </HStack>
  </PointsContainer>
);
