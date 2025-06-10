import { Box, Button, Flex, Heading, HStack, SimpleGrid, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';

import { GrixLogo } from '@/components/commons/Logo';

import { formatBalance } from '../utils/formatters';
import { BoldGrix } from './BoldGrix';
import { StakeUnstakeModal } from './StakeUnstakeModal';

type StakingCardContentProps = {
  title: string;
  description: string;
  stakedAmount: string;
  availableBalance: string;
  totalStakedInProtocol: string;
  grixPrice: number | null;
  apr: number;
  amount: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  needsApproval: boolean;
  isApproving: boolean;
  handleApprove: () => void;
  isAmountValid: () => boolean;
  isUnstakeAmountValid: () => boolean;
  isStaking: boolean;
  handleStake: () => void;
  isUnstaking: boolean;
  handleUnstake: () => void;
  type: 'gx' | 'esgx';
  clearAmount: () => void;
};

export const StakingCardContent: React.FC<StakingCardContentProps> = ({
  title,
  description,
  stakedAmount,
  availableBalance,
  totalStakedInProtocol,
  grixPrice,
  apr,
  amount,
  handleInputChange,
  needsApproval,
  isApproving,
  handleApprove,
  isAmountValid,
  isUnstakeAmountValid,
  isStaking,
  handleStake,
  isUnstaking,
  handleUnstake,
  type,
  clearAmount,
}) => {
  const { isOpen: isStakeModalOpen, onOpen: onStakeModalOpen, onClose: onStakeModalClose } = useDisclosure();
  const { isOpen: isUnstakeModalOpen, onOpen: onUnstakeModalOpen, onClose: onUnstakeModalClose } = useDisclosure();

  const tokenSymbol = type === 'esgx' ? 'esGRIX' : 'GRIX';

  const handleStakeModalClose = () => {
    clearAmount();
    onStakeModalClose();
  };

  const handleUnstakeModalClose = () => {
    clearAmount();
    onUnstakeModalClose();
  };

  return (
    <Box
      bg="gray.950"
      borderRadius="lg"
      p={5}
      height="fit-content"
      border="1px solid"
      borderColor="gray.900"
      _hover={{ borderColor: 'gray.800' }}
    >
      <Flex align="center" mb={4}>
        <GrixLogo boxSize={7} mr={3} />
        <div>
          <Heading size="sm" color="white" mb={1} fontWeight="600">
            <BoldGrix text={title} />
          </Heading>
          <Text color="gray.400" fontSize="xs">
            <BoldGrix text={description} />
          </Text>
        </div>
      </Flex>

      <SimpleGrid columns={2} spacing={4} mb={5}>
        <VStack align="stretch">
          <Text fontSize="xs" color="gray.500" mb={1}>
            Staked
          </Text>
          <Text fontSize="lg" fontWeight="600" color="white">
            {formatBalance(stakedAmount)}
          </Text>
        </VStack>

        <VStack align="stretch">
          <Text fontSize="xs" color="gray.500" mb={1}>
            Available to stake
          </Text>
          <Text fontSize="lg" fontWeight="600" color="white">
            {formatBalance(availableBalance)}
          </Text>
        </VStack>

        <VStack align="stretch">
          <Text fontSize="xs" color="gray.500" mb={1}>
            APR
          </Text>
          <Text fontSize="lg" fontWeight="600" color="green.200" display="flex" alignItems="center" gap={1}>
            <Text as="span" color="green.300" fontSize="sm">
              ↗
            </Text>
            {apr.toFixed(2)}%
          </Text>
        </VStack>

        <VStack align="stretch">
          <Text fontSize="xs" color="gray.500" mb={1}>
            Total Staked
          </Text>
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="lg" fontWeight="600" color="white">
              {Number(totalStakedInProtocol).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            {grixPrice && Number(totalStakedInProtocol) > 0 && (
              <Text fontSize="xs" color="green.300" fontWeight="500">
                ($
                {(Number(totalStakedInProtocol) * grixPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                )
              </Text>
            )}
          </VStack>
        </VStack>
      </SimpleGrid>

      <HStack spacing={3}>
        <Button onClick={onStakeModalOpen} variant="primary" size="md" height="40px" fontSize="sm">
          Stake
        </Button>
        <Button
          onClick={onUnstakeModalOpen}
          variant="secondary"
          size="md"
          height="40px"
          fontSize="sm"
          color="white"
          fontWeight="600"
          borderColor="gray.600"
          _hover={{
            bg: 'gray.800',
            borderColor: 'gray.500',
          }}
          _active={{
            bg: 'gray.700',
            borderColor: 'primary.500',
          }}
        >
          Unstake
        </Button>
      </HStack>

      <StakeUnstakeModal
        isOpen={isStakeModalOpen}
        onClose={handleStakeModalClose}
        mode="stake"
        title={`Stake ${tokenSymbol}`}
        amount={amount}
        handleInputChange={handleInputChange}
        needsApproval={needsApproval}
        isApproving={isApproving}
        handleApprove={handleApprove}
        isAmountValid={isAmountValid}
        isLoading={isStaking}
        onSubmit={handleStake}
        availableAmount={availableBalance}
        tokenType={type}
      />

      <StakeUnstakeModal
        isOpen={isUnstakeModalOpen}
        onClose={handleUnstakeModalClose}
        mode="unstake"
        title={`Unstake ${tokenSymbol}`}
        amount={amount}
        handleInputChange={handleInputChange}
        needsApproval={false}
        isApproving={false}
        handleApprove={() => {}}
        isAmountValid={isUnstakeAmountValid}
        isLoading={isUnstaking}
        onSubmit={handleUnstake}
        availableAmount={stakedAmount}
        tokenType={type}
      />
    </Box>
  );
};
