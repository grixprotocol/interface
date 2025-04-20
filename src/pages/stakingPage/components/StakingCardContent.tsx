import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { GrixLogo } from '@/components/commons/Logo';

import { formatBalance } from '../utils/formatters';
import { BoldGrix } from './BoldGrix';

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
}) => (
  <Box
    bg="gray.950"
    borderRadius="md"
    p={4}
    height="fit-content"
    border="1px solid"
    borderColor="gray.900"
    _hover={{ borderColor: 'gray.800' }}
  >
    <Flex align="center" mb={3}>
      <GrixLogo boxSize={6} mr={2} />
      <div>
        <Heading size="sm" color="white" mb={1} fontWeight="700" letterSpacing="-0.01em">
          <BoldGrix text={title} />
        </Heading>
        <Text color="gray.400" fontSize="sm" fontWeight="500">
          <BoldGrix text={description} />
        </Text>
      </div>
    </Flex>

    <SimpleGrid columns={2} spacing={4} mb={4}>
      <VStack align="stretch" spacing={0.5}>
        <Text fontSize="xs" color="gray.400" mb={0.5} fontWeight="500">
          Staked
        </Text>
        <Text fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
          {formatBalance(stakedAmount)}
        </Text>
      </VStack>

      <VStack align="stretch" spacing={0.5}>
        <Text fontSize="xs" color="gray.400" mb={0.5} fontWeight="500">
          Available to stake
        </Text>
        <Text fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
          {formatBalance(availableBalance)}
        </Text>
      </VStack>

      <VStack align="stretch" spacing={0.5}>
        <Text fontSize="xs" color="gray.400" mb={0.5} fontWeight="500">
          APR
        </Text>
        <Text fontSize="lg" fontWeight="700" color="white" letterSpacing="-0.01em">
          {apr.toFixed(2)}%
        </Text>
      </VStack>
    </SimpleGrid>

    <VStack spacing={3} align="stretch">
      <InputGroup size="md">
        <Input
          placeholder="Enter amount"
          value={amount}
          onChange={handleInputChange}
          type="text"
          borderRadius="md"
          borderColor="gray.700"
          color="white"
          bg="gray.900"
          _hover={{ borderColor: 'gray.600' }}
          _focus={{ borderColor: 'primary.500' }}
          height="40px"
          fontSize="sm"
        />
        <InputRightElement width="4rem" h="40px">
          <Button
            h="1.5rem"
            size="xs"
            onClick={handleMaxClick}
            variant="secondary"
            color="primary.400"
            fontSize="xs"
            mr={1}
          >
            Max
          </Button>
        </InputRightElement>
      </InputGroup>

      <HStack spacing={3}>
        {amount && needsApproval ? (
          <Button
            isLoading={isApproving}
            loadingText="Approving"
            onClick={handleApprove}
            variant="primary"
            size="md"
            height="40px"
            fontSize="sm"
            isDisabled={!isAmountValid()}
          >
            Approve
          </Button>
        ) : (
          <Button
            isLoading={isStaking}
            loadingText="Staking"
            onClick={handleStake}
            variant="primary"
            size="md"
            height="40px"
            fontSize="sm"
            isDisabled={!isAmountValid() || !amount}
          >
            Stake
          </Button>
        )}
        <Button
          isLoading={isUnstaking}
          loadingText="Unstaking"
          onClick={handleUnstake}
          variant="secondary"
          size="md"
          height="40px"
          fontSize="sm"
          isDisabled={!isUnstakeAmountValid() || !amount}
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
    </VStack>
  </Box>
);
