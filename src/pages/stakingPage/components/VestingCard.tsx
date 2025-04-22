import { Box, useDisclosure, useToast, VStack } from '@chakra-ui/react';
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
import { VestingModal } from './VestingModal';

type VestingCardProps = {
  onActionComplete?: () => void;
  userRewardData?: {
    claimable: string;
    stakedAmount: string;
    cumulativeRewards: string;
    averageStaked: string;
  } | null;
};

export const VestingCard: React.FC<VestingCardProps> = ({ onActionComplete, userRewardData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const toast = useToast();
  const [esGrixBalance, setEsGrixBalance] = useState('0');
  const [grixBalance, setGrixBalance] = useState('0');
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
    if (!address) return;

    try {
      const allowance = await checkVestingAllowance(address, stakingContracts.esGRIXToken.address);
      setNeedsApproval(allowance === 0n);
    } catch (error) {
      setNeedsApproval(true);
    }
  }, [address]);

  useEffect(() => {
    void fetchVestingData();
    const interval = setInterval(() => void fetchVestingData(), 30000);
    return () => clearInterval(interval);
  }, [fetchVestingData]);

  useEffect(() => {
    void checkAllowance();
  }, [checkAllowance]);

  useEffect(() => {
    if (!isApproving) {
      void checkAllowance();
    }
  }, [isApproving, checkAllowance]);

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

  const fetchGrixBalance = useCallback(async () => {
    if (!address) return;
    const balance = await getTokenBalance(stakingContracts.grixToken.address, address);
    setGrixBalance(balance);
  }, [address]);

  useEffect(() => {
    void fetchGrixBalance();
    const interval = setInterval(() => void fetchGrixBalance(), 15000);
    return () => clearInterval(interval);
  }, [fetchGrixBalance]);

  const handleVest = useCallback(
    async (vestAmount: string) => {
      if (!address) return;

      try {
        if (needsApproval) {
          setIsApproving(true);
          await approveVesting(stakingContracts.esGRIXToken.address, parseEther(vestAmount));
          await checkAllowance();
        } else {
          setIsVesting(true);
          await vestEsGrix(parseEther(vestAmount));
        }

        await Promise.all([fetchBalance(), fetchVestingData(true), fetchGrixBalance()]);

        toast({
          title: needsApproval ? 'Approval Successful' : 'Vesting Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        if (!needsApproval) {
          onClose();
        }
      } catch (error) {
        toast({
          title: needsApproval ? 'Approval Failed' : 'Vesting Failed',
          description: `There was an error during the ${needsApproval ? 'approval' : 'vesting'} process`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsApproving(false);
        setIsVesting(false);
      }
    },
    [address, needsApproval, fetchBalance, fetchVestingData, fetchGrixBalance, toast, onClose, checkAllowance]
  );

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

  const handleWithdraw = useCallback(async () => {
    if (!address) return;

    try {
      setIsWithdrawing(true);
      await withdrawEsGrix();
      await Promise.all([fetchBalance(), fetchVestingData(true), fetchGrixBalance()]);

      toast({
        title: 'Withdrawal Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Withdrawal Failed',
        description: 'There was an error during the withdrawal process',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsWithdrawing(false);
    }
  }, [address, fetchBalance, fetchVestingData, fetchGrixBalance, toast]);

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
          onVestClick={onOpen}
          isVesting={isVesting || isApproving}
          needsApproval={needsApproval}
          onWithdraw={() => void handleWithdraw()}
          isWithdrawing={isWithdrawing}
        />

        <VestingModal
          isOpen={isOpen}
          onClose={onClose}
          esGrixBalance={esGrixBalance}
          grixBalance={grixBalance}
          vestingAllowance={needsApproval ? '0' : '1'}
          isLoading={isVesting || isApproving}
          onVest={handleVest}
          claimableRewards={userRewardData?.claimable || '0'}
        />

        <VestingInfo />
      </VStack>
    </Box>
  );
};
