import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, Card, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { THEME_COLORS } from '../theme';
import { CreditPackageCard } from './CreditPackageCard';

type CreditsSelectionProps = {
  isRechargingMode: boolean;
  selectedKeyId: string | null;
  selectedCredits: number;
  creditPrices: Array<{ credits: number; priceInUsd: number }>;
  isCreating: boolean;
  isRecharging: boolean;
  isConnected: boolean;
  onSelectCredits: (credits: number) => void;
  onCancelRecharge: () => void;
  onButtonClick: () => void;
  getButtonText: () => string;
};

export const CreditsSelection: React.FC<CreditsSelectionProps> = ({
  isRechargingMode,
  selectedKeyId,
  selectedCredits,
  creditPrices,
  isCreating,
  isRecharging,
  isConnected,
  onSelectCredits,
  onCancelRecharge,
  onButtonClick,
  getButtonText,
}) => (
  <Card
    className="credits-selection"
    bg={THEME_COLORS.cardBg}
    p={6}
    borderRadius="xl"
    border="1px solid"
    borderColor={THEME_COLORS.cardBorder}
    boxShadow="0 4px 20px rgba(66, 153, 225, 0.15)"
    _hover={{ boxShadow: '0 8px 30px rgba(66, 153, 225, 0.2)' }}
    transition="all 0.2s"
  >
    <VStack spacing={6} align="stretch">
      <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
        <VStack align="start" spacing={1}>
          <Text color="gray.200" fontSize="lg" fontWeight="semibold">
            {isRechargingMode ? 'Recharge credits for key' : 'Select credits package'}
          </Text>
          {isRechargingMode && selectedKeyId && (
            <Text color="teal.200" fontSize="sm" fontFamily="mono">
              Key ID: {selectedKeyId}
            </Text>
          )}
        </VStack>
        {isRechargingMode && (
          <Button size="sm" variant="outline" colorScheme="teal" leftIcon={<CloseIcon />} onClick={onCancelRecharge}>
            Cancel Recharge
          </Button>
        )}
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} px={{ base: 0, md: 2 }}>
        {creditPrices.map((option, index) => (
          <CreditPackageCard
            key={option.credits}
            credits={option.credits}
            pricePerCredit={Number((index + 1).toFixed(2))}
            isSelected={selectedCredits === option.credits}
            onClick={() => onSelectCredits(option.credits)}
          />
        ))}
      </SimpleGrid>

      <Button
        size="lg"
        colorScheme="blue"
        leftIcon={<AddIcon />}
        onClick={onButtonClick}
        isLoading={isCreating || isRecharging}
        loadingText={isRechargingMode ? 'Processing Recharge...' : 'Creating Key...'}
        isDisabled={!isConnected || selectedCredits === 0}
        mt={4}
        w={{ base: 'full', md: 'auto' }}
        alignSelf={{ base: 'stretch', md: 'flex-end' }}
      >
        {getButtonText()}
      </Button>
    </VStack>
  </Card>
);
