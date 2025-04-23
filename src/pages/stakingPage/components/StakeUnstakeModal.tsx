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
  handleMaxClick: () => void;
  needsApproval: boolean;
  isApproving: boolean;
  handleApprove: () => void;
  isAmountValid: () => boolean;
  isLoading: boolean;
  onSubmit: () => void;
  availableAmount: string;
  tokenSymbol: string;
  tokenType: 'gx' | 'esgx';
};

export const StakeUnstakeModal: React.FC<StakeUnstakeModalProps> = ({
  isOpen,
  onClose,
  mode,
  title,
  amount,
  handleInputChange,
  handleMaxClick,
  needsApproval,
  isApproving,
  handleApprove,
  isAmountValid,
  isLoading,
  onSubmit,
  availableAmount,
  tokenSymbol,
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
    try {
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
    } catch (error) {
      console.error('Error calculating percentage:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(2px)" />
      <ModalContent bg="#0D0F12" maxW="400px">
        <Box px={6} py={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text color="white" fontSize="xl" fontWeight="600">
              {title}
            </Text>
            <ModalCloseButton position="static" color="gray.400" />
          </Flex>

          <VStack spacing={4} align="stretch">
            <Text color="gray.500" fontSize="md" mb={1}>
              {isStakeMode ? 'Stake Amount' : 'Unstake Amount'}
            </Text>

            <Box bg="#161A1E" borderRadius="xl" p={4}>
              <Flex align="center" justify="space-between">
                <HStack spacing={3}>
                  <Box bg="#1E2328" p={2} borderRadius="lg">
                    <GrixLogo boxSize="24px" />
                  </Box>
                  <Text color="white" fontSize="lg" fontWeight="600">
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
                  fontSize="lg"
                  width="auto"
                />
              </Flex>
            </Box>

            <Flex justify="space-between" align="center">
              <Text color="gray.500" fontSize="md">
                {isStakeMode ? 'Available balance' : 'Staked balance'}
              </Text>
              <Text color="white" fontSize="md">
                {formatBalance(availableAmount)} {isEsGrix ? 'esGRIX' : 'GRIX'}
              </Text>
            </Flex>

            <HStack spacing={2}>
              {[25, 50, 75, 100].map((percentage) => (
                <Button
                  key={percentage}
                  onClick={() => handlePercentageClick(percentage)}
                  bg="#1E2328"
                  color="white"
                  size="md"
                  flex={1}
                  isDisabled={!hasBalance}
                  opacity={hasBalance ? 1 : 0.5}
                  _hover={{ bg: hasBalance ? '#2A3038' : '#1E2328' }}
                  _active={{ bg: hasBalance ? '#2A3038' : '#1E2328' }}
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
                  <Text color="#3B82F6" fontSize="sm">
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
                  bg="#2F6C60"
                  color="white"
                  size="lg"
                  width="full"
                  height="48px"
                  fontSize="sm"
                  isDisabled={!isAmountValid()}
                  _hover={{ bg: '#2A5F54' }}
                  _active={{ bg: '#264F46' }}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  isLoading={isLoading}
                  loadingText={isStakeMode ? 'Staking' : 'Unstaking'}
                  onClick={onSubmit}
                  bg="#2F6C60"
                  color="white"
                  size="lg"
                  width="full"
                  height="48px"
                  fontSize="sm"
                  isDisabled={!isAmountValid() || !amount}
                  _hover={{ bg: '#2A5F54' }}
                  _active={{ bg: '#264F46' }}
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
