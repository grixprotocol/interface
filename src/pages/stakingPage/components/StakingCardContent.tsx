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
  apr: number;
  amount: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxClick: () => void;
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
  apr,
  amount,
  handleInputChange,
  handleMaxClick,
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
      p={6}
      height="fit-content"
      border="1px solid"
      borderColor="gray.900"
      _hover={{ borderColor: 'gray.800' }}
    >
      <Flex align="center" mb={5}>
        <GrixLogo boxSize={8} mr={3} />
        <div>
          <Heading size="md" color="white" mb={1} fontWeight="600">
            <BoldGrix text={title} />
          </Heading>
          <Text color="gray.400" fontSize="sm">
            <BoldGrix text={description} />
          </Text>
        </div>
      </Flex>

      <SimpleGrid columns={2} spacing={5} mb={5}>
        <VStack align="stretch">
          <Text fontSize="sm" color="gray.500" mb={1}>
            Staked
          </Text>
          <Text fontSize="xl" fontWeight="700" color="white">
            {formatBalance(stakedAmount)}
          </Text>
        </VStack>

        <VStack align="stretch">
          <Text fontSize="sm" color="gray.500" mb={1}>
            Available to stake
          </Text>
          <Text fontSize="xl" fontWeight="700" color="white">
            {formatBalance(availableBalance)}
          </Text>
        </VStack>

        <VStack align="stretch">
          <Text fontSize="sm" color="gray.500" mb={1}>
            APR
          </Text>
          <Text fontSize="xl" fontWeight="700" color="green.200" display="flex" alignItems="center" gap={2}>
            <Text as="span" color="green.300">
              ↗
            </Text>
            {apr.toFixed(2)}%
          </Text>
        </VStack>
      </SimpleGrid>

      <HStack spacing={4}>
        <Button onClick={onStakeModalOpen} variant="primary" size="lg" height="48px">
          Stake
        </Button>
        <Button
          onClick={onUnstakeModalOpen}
          variant="secondary"
          size="lg"
          height="48px"
          color="white"
          fontWeight="bold"
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
