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
          {title}
        </Heading>
        <Text color="gray.400" fontSize="sm">
          {description}
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
        <Text fontSize="xl" fontWeight="700" color="white">
          {apr.toFixed(2)}%
        </Text>
      </VStack>
    </SimpleGrid>

    <VStack spacing={4} align="stretch">
      <InputGroup size="lg">
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
          height="48px"
        />
        <InputRightElement width="4.5rem" h="48px">
          <Button
            h="1.75rem"
            size="sm"
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

      <HStack spacing={4}>
        {amount && needsApproval ? (
          <Button
            isLoading={isApproving}
            loadingText="Approving"
            onClick={handleApprove}
            variant="primary"
            size="lg"
            height="48px"
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
            size="lg"
            height="48px"
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
          size="lg"
          height="48px"
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
