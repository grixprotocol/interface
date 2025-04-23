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
import { WithdrawModal } from './WithdrawModal';

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
  const { isOpen: isVestingOpen, onOpen: onVestingOpen, onClose: onVestingClose } = useDisclosure();
  const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onClose: onWithdrawClose } = useDisclosure();
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
      if (!address || !vestAmount || parseFloat(vestAmount) <= 0) return;

      const amountToVest = parseEther(vestAmount);
      setIsVesting(true); // Start loading

      try {
        // Step 1: Handle Approval if needed
        if (needsApproval) {
          try {
            console.log('Attempting approval...');
            await approveVesting(stakingContracts.esGRIXToken.address, amountToVest);
            console.log('Approval successful.');
            // Approval succeeded, proceed to vesting. Do NOT close modal here.
          } catch (approvalError) {
            console.error('Approval failed:', approvalError);
            toast({
              title: 'Approval Failed',
              description: 'Could not approve esGRIX spending. Please try again.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            setIsVesting(false); // Stop loading on approval failure
            return; // Exit the function, modal stays open
          }
        }

        // Step 2: Perform Vesting (runs if approval wasn't needed or succeeded)
        try {
          console.log('Attempting vesting...');
          await vestEsGrix(amountToVest);
          console.log('Vesting successful.');

          // Vesting succeeded: Fetch data, show success toast, THEN close modal
          await Promise.all([fetchBalance(), fetchVestingData(true), fetchGrixBalance()]);

          toast({
            title: 'Vesting Successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          onVestingClose(); // Close modal ONLY after successful vesting
        } catch (vestingError) {
          console.error('Vesting failed:', vestingError);
          toast({
            title: 'Vesting Failed',
            description: 'Could not complete the vesting process. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          // Do not close modal on vesting failure, allow user to retry if desired.
          // Loading state will be turned off in finally block.
        }
      } catch (error) {
        // Catch unexpected errors during the process
        console.error('Unexpected error during vesting process:', error);
        toast({
          title: 'Vesting Error',
          description: 'An unexpected error occurred. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        // Ensure loading state is turned off and allowance is re-checked
        setIsVesting(false);
        void checkAllowance(); // Update approval status for next time
      }
    },
    // Dependencies now only need needsApproval, not the setter for it mid-function
    [address, needsApproval, fetchBalance, fetchVestingData, fetchGrixBalance, toast, onVestingClose, checkAllowance]
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
      onWithdrawClose();
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
  }, [address, fetchBalance, fetchVestingData, fetchGrixBalance, toast, onWithdrawClose]);

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
          onVestClick={onVestingOpen}
          isVesting={isVesting || isApproving}
          needsApproval={needsApproval}
          onWithdraw={onWithdrawOpen}
          isWithdrawing={isWithdrawing}
        />

        <VestingModal
          isOpen={isVestingOpen}
          onClose={onVestingClose}
          esGrixBalance={esGrixBalance}
          grixBalance={grixBalance}
          isLoading={isVesting || isApproving}
          onVest={handleVest}
          claimableRewards={userRewardData?.claimable || '0'}
        />

        <WithdrawModal
          isOpen={isWithdrawOpen}
          onClose={onWithdrawClose}
          onWithdraw={() => void handleWithdraw()}
          isLoading={isWithdrawing}
          claimableGS={vestingData?.claimable || '0'}
          vestingAmount={vestingData?.totalVested || '0'}
          totalReserved={
            vestingData ? (parseFloat(vestingData.claimable) + parseFloat(vestingData.totalVested)).toString() : '0'
          }
        />

        <VestingInfo />
      </VStack>
    </Box>
  );
};
