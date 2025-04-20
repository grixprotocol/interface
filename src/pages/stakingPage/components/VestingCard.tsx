import { Box, Button, HStack, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

import { stakingContracts } from '@/web3Config/staking/config';
import {
  approveVesting,
  checkVestingAllowance,
  getLastVestingTime,
  getTokenBalance,
  getVestingData,
  getVestingDuration,
  vestEsGs as vestEsGrix,
  withdrawEsGs as withdrawEsGrix,
} from '@/web3Config/staking/hooks';

import { VestingHeader } from './VestingComponents/VestingHeader';
import { VestingInfo } from './VestingComponents/VestingInfo';
import { VestingStats } from './VestingComponents/VestingStats';

type VestingCardProps = {
  onActionComplete?: () => void;
};

export const VestingCard: React.FC<VestingCardProps> = ({ onActionComplete }) => {
  const { address } = useAccount();
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [esGrixBalance, setEsGrixBalance] = useState('0');
  const [isApproving, setIsApproving] = useState(false);
  const [isVesting, setIsVesting] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(true);
  const [lastVestingTime, setLastVestingTime] = useState<bigint | null>(null);
  const [vestingDuration, setVestingDuration] = useState<bigint | null>(null);
  const [vestingData, setVestingData] = useState<{
    claimable: string;
    totalVested: string;
    maxVestableAmount: string;
  } | null>(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const fetchVestingData = useCallback(
    async (triggerParentRefresh = false) => {
      if (!address) return;
      const [data, lastTime, duration] = await Promise.all([
        getVestingData(address),
        getLastVestingTime(address),
        getVestingDuration(),
      ]);
      setVestingData(data);
      setLastVestingTime(lastTime);
      setVestingDuration(duration);

      if (triggerParentRefresh && onActionComplete) {
        onActionComplete();
      }
    },
    [address, onActionComplete]
  );

  const checkAllowance = useCallback(async () => {
    if (!address || !amount) return;

    try {
      const allowance = await checkVestingAllowance(address, stakingContracts.esGRIXToken.address);
      const amountBigInt = parseEther(amount);
      setNeedsApproval(allowance < amountBigInt);
    } catch (error) {
      setNeedsApproval(true);
    }
  }, [address, amount]);

  useEffect(() => {
    void fetchVestingData();
    const interval = setInterval(() => void fetchVestingData(), 30000);
    return () => clearInterval(interval);
  }, [fetchVestingData]);

  useEffect(() => {
    void checkAllowance();
  }, [checkAllowance]);

  const fetchBalance = useCallback(async () => {
    if (!address) return;
    const balance = await getTokenBalance(stakingContracts.esGRIXToken.address, address);
    setEsGrixBalance(balance);
  }, [address]);

  useEffect(() => {
    void fetchBalance();
    const interval = setInterval(() => void fetchBalance(), 15000);
    return () => clearInterval(interval);
  }, [fetchBalance]);

  const handleAction = useCallback(
    async (action: 'approve' | 'vest' | 'withdraw') => {
      if (!address || (!amount && action !== 'withdraw')) return;

      const actions = {
        approve: async () => {
          setIsApproving(true);
          await approveVesting(stakingContracts.esGRIXToken.address, parseEther(amount));
          setNeedsApproval(false);
        },
        vest: async () => {
          setIsVesting(true);
          await vestEsGrix(parseEther(amount));
          setAmount('');
        },
        withdraw: async () => {
          setIsWithdrawing(true);
          await withdrawEsGrix();
        },
      };

      try {
        await actions[action]();
        await Promise.all([fetchBalance(), fetchVestingData(true)]);

        if (onActionComplete) {
          onActionComplete();
        }

        toast({
          title: `${action.charAt(0).toUpperCase() + action.slice(1)} Successful`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
          description: `There was an error during the ${action} process`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        if (action === 'approve') setIsApproving(false);
        if (action === 'vest') setIsVesting(false);
        if (action === 'withdraw') setIsWithdrawing(false);
      }
    },
    [address, amount, fetchVestingData, toast, fetchBalance, onActionComplete]
  );

  const handleMaxClick = useCallback(async () => {
    await fetchBalance();
    await fetchVestingData();
    setAmount(esGrixBalance);
  }, [esGrixBalance, fetchVestingData, fetchBalance]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Calculate remaining days and progress
  const calculateVestingProgress = useCallback(() => {
    if (!lastVestingTime || !vestingDuration || !vestingData || parseFloat(vestingData.totalVested) === 0) {
      return {
        remainingDays: 0,
        progress: 0,
        isVesting: false,
      };
    }

    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    const timePassed = currentTime - lastVestingTime;
    const remainingTime = vestingDuration > timePassed ? vestingDuration - timePassed : 0n;
    const remainingDays = Number(remainingTime) / (24 * 60 * 60);
    const progress = Number((timePassed * 100n) / vestingDuration);

    return {
      remainingDays: Math.ceil(remainingDays),
      progress: Math.min(100, progress),
      isVesting: true,
    };
  }, [lastVestingTime, vestingDuration, vestingData]);

  return (
    <Box
      bg="gray.950"
      borderRadius="lg"
      p={6}
      border="1px solid"
      borderColor="gray.900"
      _hover={{ borderColor: 'gray.800' }}
    >
      <VestingHeader />

      <VStack spacing={6} align="stretch">
        <VestingStats
          vestingData={
            vestingData && {
              ...vestingData,
              esGrixBalance,
              lastVestingTime: lastVestingTime || undefined,
              vestingProgress: calculateVestingProgress(),
            }
          }
        />
        <VestingInfo />

        <VStack spacing={4} align="stretch">
          <InputGroup size="lg">
            <Input
              placeholder="Enter esGrix amount"
              value={amount}
              onChange={handleAmountChange}
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
                onClick={(e) => {
                  e.preventDefault();
                  void handleMaxClick();
                }}
                h="1.75rem"
                size="sm"
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
            {needsApproval && amount ? (
              <Button
                onClick={() => void handleAction('approve')}
                isLoading={isApproving}
                loadingText="Approving"
                variant="primary"
                size="lg"
                height="48px"
                flex="1"
                isDisabled={!amount}
              >
                Approve
              </Button>
            ) : (
              <Button
                onClick={() => void handleAction('vest')}
                isLoading={isVesting}
                loadingText="Vesting"
                variant="primary"
                size="lg"
                height="48px"
                flex="1"
                isDisabled={!amount}
              >
                Vest
              </Button>
            )}

            <Button
              onClick={() => void handleAction('withdraw')}
              isLoading={isWithdrawing}
              loadingText="Withdrawing"
              variant="secondary"
              size="lg"
              height="48px"
              flex="1"
              isDisabled={!vestingData || parseFloat(vestingData.claimable) <= 0}
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
              Withdraw
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
