import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { GrixLogo } from '@/components/commons/Logo';

import { formatBalance } from '../utils/formatters';

type StakeUnstakeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'stake' | 'unstake';
  title: string;
  amount: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  needsApproval: boolean;
  isApproving: boolean;
  handleApprove: () => void;
  isAmountValid: () => boolean;
  isLoading: boolean;
  onSubmit: () => void;
  availableAmount: string;
  tokenType: 'gx' | 'esgx';
};

export const StakeUnstakeModal: React.FC<StakeUnstakeModalProps> = ({
  isOpen,
  onClose,
  mode,
  title,
  amount,
  handleInputChange,
  needsApproval,
  isApproving,
  handleApprove,
  isAmountValid,
  isLoading,
  onSubmit,
  availableAmount,
  tokenType,
}) => {
  const isStakeMode = mode === 'stake';
  const isEsGrix = tokenType === 'esgx';

  const hasBalance = useMemo(() => {
    try {
      const balance = Number(availableAmount);
      return balance > 0.000001; // Consider very small amounts as no balance
    } catch {
      return false;
    }
  }, [availableAmount]);

  const handlePercentageClick = (percentage: number) => {
    if (!hasBalance) return;

    if (percentage === 100) {
      // Use exact available amount without any calculations
      const event = {
        target: { value: availableAmount },
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(event);
      return;
    }

    // For other percentages, use string manipulation to maintain precision

    const baseAmount = availableAmount.replace('.', '');
    const decimals = availableAmount.split('.')[1]?.length || 0;
    const multiplier = BigInt(percentage);
    const result = (BigInt(baseAmount) * multiplier) / BigInt(100);

    let valueStr = result.toString();
    if (decimals > 0) {
      const padded = valueStr.padStart(decimals + 1, '0');
      valueStr = `${padded.slice(0, -decimals)}.${padded.slice(-decimals)}`;
    }

    const event = {
      target: { value: valueStr },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(event);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(2px)" />
      <ModalContent bg="#0D0F12" maxW="400px">
        <Box px={6} py={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text color="white" fontSize="sm" fontWeight="600">
              {title}
            </Text>
            <ModalCloseButton position="static" color="gray.400" />
          </Flex>

          <VStack spacing={4} align="stretch">
            <Text color="gray.500" fontSize="xs" mb={1}>
              {isStakeMode ? 'Stake Amount' : 'Unstake Amount'}
            </Text>

            <Box bg="#161A1E" borderRadius="xl" p={4}>
              <Flex align="center" justify="space-between">
                <HStack spacing={3}>
                  <Box bg="#1E2328" p={2} borderRadius="lg">
                    <GrixLogo boxSize="24px" />
                  </Box>
                  <Text color="white" fontSize="sm" fontWeight="600">
                    {isEsGrix ? 'esGRIX' : 'GRIX'}
                  </Text>
                </HStack>
                <Input
                  placeholder="Enter Amount"
                  value={Number(amount) ? Number(amount).toFixed(3) : amount}
                  onChange={handleInputChange}
                  variant="unstyled"
                  textAlign="right"
                  color="white"
                  fontSize="sm"
                  width="auto"
                />
              </Flex>
            </Box>

            <Flex justify="space-between" align="center">
              <Text color="gray.500" fontSize="xs">
                {isStakeMode ? 'Available balance' : 'Staked balance'}
              </Text>
              <Text color="white" fontSize="sm">
                {formatBalance(availableAmount)} {isEsGrix ? 'esGRIX' : 'GRIX'}
              </Text>
            </Flex>

            <HStack spacing={2}>
              {[25, 50, 75, 100].map((percentage) => (
                <Button
                  key={percentage}
                  onClick={() => handlePercentageClick(percentage)}
                  variant="outline"
                  bg="gray.800"
                  color="gray.300"
                  borderColor="gray.600"
                  size="sm"
                  flex={1}
                  height="32px"
                  fontSize="xs"
                  fontWeight="500"
                  isDisabled={!hasBalance}
                  _hover={{
                    bg: hasBalance ? 'gray.700' : 'gray.800',
                    borderColor: hasBalance ? 'gray.500' : 'gray.600',
                    color: hasBalance ? 'white' : 'gray.300',
                    transform: hasBalance ? 'translateY(-1px)' : 'none',
                    boxShadow: hasBalance ? 'sm' : 'none',
                  }}
                  _active={{
                    bg: hasBalance ? 'gray.600' : 'gray.800',
                    transform: hasBalance ? 'translateY(0)' : 'none',
                  }}
                  _disabled={{
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    _hover: {
                      bg: 'gray.800',
                      borderColor: 'gray.600',
                      color: 'gray.300',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                  transition="all 0.2s"
                >
                  {percentage}%
                </Button>
              ))}
            </HStack>

            {!isStakeMode && (
              <Box bg="#161A1E" p={4} borderRadius="xl">
                <Flex align="center" gap={2}>
                  <Box as="span" color="#3B82F6" fontSize="lg">
                    ⓘ
                  </Box>
                  <Text color="#3B82F6" fontSize="xs">
                    You might not be able to unstake your desired {isEsGrix ? 'esGRIX' : 'GRIX'} if there is an active
                    vesting position.
                  </Text>
                </Flex>
              </Box>
            )}

            <Box mt={2}>
              {amount && needsApproval && isStakeMode ? (
                <Button
                  isLoading={isApproving}
                  loadingText="Approving"
                  onClick={handleApprove}
                  variant="solid"
                  bg="teal.500"
                  color="white"
                  size="md"
                  width="full"
                  height="40px"
                  fontSize="sm"
                  fontWeight="500"
                  isDisabled={!isAmountValid()}
                  _hover={{
                    bg: 'teal.600',
                    transform: 'translateY(-1px)',
                    boxShadow: 'md',
                  }}
                  _active={{
                    bg: 'teal.700',
                    transform: 'translateY(0)',
                  }}
                  _disabled={{
                    bg: 'gray.700',
                    color: 'gray.500',
                    cursor: 'not-allowed',
                    _hover: {
                      bg: 'gray.700',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                  transition="all 0.2s"
                >
                  Approve
                </Button>
              ) : (
                <Button
                  isLoading={isLoading}
                  loadingText={isStakeMode ? 'Staking' : 'Unstaking'}
                  onClick={onSubmit}
                  variant="solid"
                  bg="teal.500"
                  color="white"
                  size="md"
                  width="full"
                  height="40px"
                  fontSize="sm"
                  fontWeight="500"
                  isDisabled={!isAmountValid() || !amount}
                  _hover={{
                    bg: 'teal.600',
                    transform: 'translateY(-1px)',
                    boxShadow: 'md',
                  }}
                  _active={{
                    bg: 'teal.700',
                    transform: 'translateY(0)',
                  }}
                  _disabled={{
                    bg: 'gray.700',
                    color: 'gray.500',
                    cursor: 'not-allowed',
                    _hover: {
                      bg: 'gray.700',
                      transform: 'none',
                      boxShadow: 'none',
                    },
                  }}
                  transition="all 0.2s"
                >
                  {isStakeMode ? 'Stake' : 'Unstake'}
                </Button>
              )}
            </Box>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};
