import { useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

import { stakingContracts } from '@/web3Config/staking/config';
import {
  approveStaking,
  calculateAPR,
  checkStakingAllowance,
  getEsGrixStakedAmount,
  getStakedAmount,
  getTokenBalance,
  stakeEsGs,
  stakeGs,
  unstakeEsGs,
  unstakeGs,
} from '@/web3Config/staking/hooks';

import { StakingCardContent } from './StakingCardContent.js';

type StakingCardProps = {
  title: string;
  description: string;
  type: 'gx' | 'esgx';
  refreshTrigger: number;
  onActionComplete: () => void;
};

export const StakingCard: React.FC<StakingCardProps> = ({
  title,
  description,
  type,
  refreshTrigger,
  onActionComplete,
}) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(true);
  const [availableBalance, setAvailableBalance] = useState('0');
  const [stakedAmount, setStakedAmount] = useState('0');
  const [apr, setApr] = useState(0);
  const [_showError, setShowError] = useState(false);
  const toast = useToast();
  const tokenAddress = type === 'gx' ? stakingContracts.grixToken.address : stakingContracts.esGRIXToken.address;

  const showToast = useCallback(
    (title: string, description: string, status: 'success' | 'error') => {
      toast({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );

  const fetchStakedAmount = useCallback(async () => {
    if (!address) return;

    try {
      if (type === 'esgx') {
        const staked = await getEsGrixStakedAmount(address);
        setStakedAmount(staked);
      } else {
        const staked = await getStakedAmount(address);
        setStakedAmount(staked);
      }
    } catch (error) {
      setStakedAmount('0');
    }
  }, [address, type]);

  const fetchBalance = useCallback(async () => {
    if (!address) return;
    try {
      const balance = await getTokenBalance(tokenAddress, address);
      setAvailableBalance(balance);
    } catch (error) {
      setAvailableBalance('0');
    }
  }, [address, tokenAddress]);

  const fetchAPR = useCallback(async () => {
    if (!address) return;
    const calculatedAPR = await calculateAPR(address);
    setApr(calculatedAPR);
  }, [address]);

  useEffect(() => {
    void fetchBalance();
    void fetchStakedAmount();
    void fetchAPR();

    const interval = setInterval(() => {
      void fetchBalance();
      void fetchStakedAmount();
      void fetchAPR();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchBalance, fetchStakedAmount, fetchAPR, refreshTrigger]);

  const handleMaxClick = () => {
    if (type === 'esgx') {
      setAmount(stakedAmount);
    } else {
      setAmount(availableBalance);
    }
  };

  const isAmountValid = useCallback(() => {
    if (!amount) return false;
    try {
      const inputAmount = Number(amount);
      const maxAmount = Number(availableBalance);
      return inputAmount > 0 && inputAmount <= maxAmount;
    } catch {
      return false;
    }
  }, [amount, availableBalance]);

  const isUnstakeAmountValid = useCallback(() => {
    if (!amount) return false;
    try {
      const inputAmount = Number(amount);
      const maxStaked = Number(stakedAmount);
      return inputAmount > 0 && inputAmount <= maxStaked;
    } catch {
      return false;
    }
  }, [amount, stakedAmount]);

  const checkTokenAllowance = useCallback(async () => {
    if (!address) return;

    try {
      const allowance = await checkStakingAllowance(address, tokenAddress);
      const amountBigInt = amount ? parseEther(amount) : 0n;
      setNeedsApproval(allowance < amountBigInt);
    } catch (error) {
      setNeedsApproval(true); // Default to needing approval on error
    }
  }, [address, amount, tokenAddress]);

  useEffect(() => {
    void checkTokenAllowance();
  }, [checkTokenAllowance]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setAmount(value);
    }
  };

  const refreshAllData = useCallback(
    async (triggerParentRefresh = true) => {
      await Promise.all([fetchBalance(), fetchStakedAmount(), fetchAPR()]);
      if (triggerParentRefresh) {
        onActionComplete();
      }
    },
    [fetchBalance, fetchStakedAmount, fetchAPR, onActionComplete]
  );

  useEffect(() => {
    if (refreshTrigger > 0) {
      void refreshAllData(false);
    }
  }, [refreshTrigger, refreshAllData]);

  const handleApprove = async () => {
    if (!amount || !address) return;

    try {
      setIsApproving(true);
      const amountBigInt = parseEther(amount);
      await approveStaking(tokenAddress, amountBigInt);

      showToast('Approval Successful', 'You can now stake your tokens', 'success');

      setNeedsApproval(false);
      await refreshAllData();
    } catch (error) {
      showToast('Approval Failed', 'There was an error approving your tokens', 'error');
    } finally {
      setIsApproving(false);
    }
  };

  const handleStake = async () => {
    if (!amount || !address) return;

    if (!isAmountValid()) {
      showToast('Invalid Amount', 'Amount exceeds available balance', 'error');
      setShowError(true);
      return;
    }

    try {
      setIsStaking(true);
      const amountBigInt = parseEther(amount);

      if (type === 'gx') {
        await stakeGs(amountBigInt);
      } else {
        await stakeEsGs(amountBigInt);
      }

      showToast('Staking Successful', 'Your tokens have been staked', 'success');

      setAmount('');
      setShowError(false);
      await refreshAllData();
    } catch (error) {
      showToast('Staking Failed', 'There was an error staking your tokens', 'error');
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!amount || !address) return;

    try {
      const currentStaked = type === 'gx' ? await getStakedAmount(address) : await getEsGrixStakedAmount(address);

      if (Number(amount) > Number(currentStaked)) {
        showToast('Invalid Amount', 'Amount exceeds staked balance', 'error');
        setShowError(true);
        return;
      }

      setIsUnstaking(true);
      const amountBigInt = parseEther(amount);

      if (type === 'gx') {
        await unstakeGs(amountBigInt);
      } else {
        await unstakeEsGs(amountBigInt);
      }

      showToast('Unstaking Successful', 'Your tokens have been unstaked', 'success');

      setAmount('');
      setShowError(false);
      await refreshAllData();
    } catch (error) {
      showToast('Unstaking Failed', 'There was an error unstaking your tokens', 'error');
    } finally {
      setIsUnstaking(false);
    }
  };

  return (
    <StakingCardContent
      title={title}
      description={description}
      stakedAmount={stakedAmount}
      availableBalance={availableBalance}
      apr={apr}
      amount={amount}
      handleInputChange={handleInputChange}
      handleMaxClick={handleMaxClick}
      needsApproval={needsApproval}
      isApproving={isApproving}
      handleApprove={() => void handleApprove()}
      isAmountValid={isAmountValid}
      isUnstakeAmountValid={isUnstakeAmountValid}
      isStaking={isStaking}
      handleStake={() => void handleStake()}
      isUnstaking={isUnstaking}
      handleUnstake={() => void handleUnstake()}
    />
  );
};
