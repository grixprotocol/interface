import { useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

import { AssetPriceResponse } from '@/types/api';
import { stakingContracts } from '@/web3Config/staking/config';
import {
  approveStaking,
  calculateAPR,
  checkStakingAllowance,
  getEsGrixStakedAmount,
  getStakedAmount,
  getTokenBalance,
  getTotalEsGrixStaked,
  getTotalGrixStaked,
  stakeEsGRIX,
  stakeGRIX,
  unstakeEsGRIX,
  unstakeGs,
} from '@/web3Config/staking/hooks';

import { StakingCardContent } from './StakingCardContent';

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
  const [totalStakedInProtocol, setTotalStakedInProtocol] = useState('0');
  const [grixPrice, setGrixPrice] = useState<number | null>(null);
  const [apr, setApr] = useState(0);
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
    const calculatedAPR = await calculateAPR();
    setApr(calculatedAPR);
  }, []);

  const fetchTotalStaked = useCallback(async () => {
    try {
      if (type === 'gx') {
        const total = await getTotalGrixStaked();
        setTotalStakedInProtocol(total);
      } else {
        const total = await getTotalEsGrixStaked();
        setTotalStakedInProtocol(total);
      }
    } catch (error) {
      setTotalStakedInProtocol('0');
    }
  }, [type]);

  const fetchGrixPrice = useCallback(async () => {
    try {
      const res = await fetch('https://z61hgkwkn8.execute-api.us-east-1.amazonaws.com/dev/assetprice?asset=GRIX', {
        headers: {
          'x-api-key': import.meta.env.VITE_GRIX_API_KEY,
          origin: 'https://app.grix.finance',
        },
      });
      const json = (await res.json()) as AssetPriceResponse;
      const price = json.assetPrice;
      setGrixPrice(price);
    } catch {
      setGrixPrice(null);
    }
  }, []);

  useEffect(() => {
    void fetchBalance();
    void fetchStakedAmount();
    void fetchAPR();
    void fetchTotalStaked();
    void fetchGrixPrice();

    const interval = setInterval(() => {
      void fetchBalance();
      void fetchStakedAmount();
      void fetchAPR();
      void fetchTotalStaked();
      void fetchGrixPrice();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchBalance, fetchStakedAmount, fetchAPR, fetchTotalStaked, fetchGrixPrice, refreshTrigger]);

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
      setNeedsApproval(true);
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

  const clearAmount = () => {
    setAmount('');
  };

  const refreshAllData = useCallback(
    async (triggerParentRefresh = true) => {
      await Promise.all([fetchBalance(), fetchStakedAmount(), fetchAPR(), fetchTotalStaked(), fetchGrixPrice()]);
      if (triggerParentRefresh) {
        onActionComplete();
      }
    },
    [fetchBalance, fetchStakedAmount, fetchAPR, fetchTotalStaked, fetchGrixPrice, onActionComplete]
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

    try {
      setIsStaking(true);
      const amountBigInt = parseEther(amount);

      if (type === 'gx') {
        await stakeGRIX(amountBigInt);
      } else {
        await stakeEsGRIX(amountBigInt);
      }

      showToast('Staking Successful', 'Your tokens have been staked', 'success');
      setAmount('');
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
      setIsUnstaking(true);
      const amountBigInt = parseEther(amount);

      if (type === 'gx') {
        await unstakeGs(amountBigInt);
      } else {
        await unstakeEsGRIX(amountBigInt);
      }

      showToast('Unstaking Successful', 'Your tokens have been unstaked', 'success');
      setAmount('');
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
      totalStakedInProtocol={totalStakedInProtocol}
      grixPrice={grixPrice}
      apr={apr}
      amount={amount}
      handleInputChange={handleInputChange}
      needsApproval={needsApproval}
      isApproving={isApproving}
      handleApprove={() => void handleApprove()}
      isAmountValid={isAmountValid}
      isUnstakeAmountValid={isUnstakeAmountValid}
      isStaking={isStaking}
      handleStake={() => void handleStake()}
      isUnstaking={isUnstaking}
      handleUnstake={() => void handleUnstake()}
      type={type}
      clearAmount={clearAmount}
    />
  );
};
