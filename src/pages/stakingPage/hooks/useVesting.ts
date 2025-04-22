import { useCallback, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';

import { stakingContracts } from '@/web3Config/staking/config';
import {
  approveVesting,
  checkVestingAllowance,
  getTokenBalance,
  getVestingData,
  vestEsGs,
} from '@/web3Config/staking/hooks';

type VestingData = {
  claimable: string;
  totalVested: string;
  maxVestableAmount: string;
};

export const useVesting = () => {
  const { address } = useAccount();
  const [isVestingModalOpen, setIsVestingModalOpen] = useState(false);
  const [vestingAllowance, setVestingAllowance] = useState('0');
  const [esGrixBalance, setEsGrixBalance] = useState('0');
  const [grixBalance, setGrixBalance] = useState('0');
  const [vestingData, setVestingData] = useState<VestingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVestingData = useCallback(async () => {
    if (!address) return;

    try {
      const [allowance, esGrixBal, grixBal, vesting] = await Promise.all([
        checkVestingAllowance(address, stakingContracts.esGRIXToken.address),
        getTokenBalance(stakingContracts.esGRIXToken.address, address),
        getTokenBalance(stakingContracts.grixToken.address, address),
        getVestingData(address),
      ]);

      setVestingAllowance(allowance.toString());
      setEsGrixBalance(esGrixBal);
      setGrixBalance(grixBal);
      setVestingData(vesting as VestingData);
    } catch (error) {
      setVestingData(null);
      throw error;
    }
  }, [address]);

  useEffect(() => {
    void fetchVestingData();
  }, [fetchVestingData]);

  const handleVest = async (amount: string) => {
    if (!address || !amount) return;

    setIsLoading(true);
    try {
      const parsedAmount = parseEther(amount);

      // Check if approval is needed
      if (BigInt(vestingAllowance) < parsedAmount) {
        await approveVesting(stakingContracts.esGRIXToken.address, parsedAmount);
      }

      // Perform vesting
      await vestEsGs(parsedAmount);

      // Refresh data
      await fetchVestingData();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isVestingModalOpen,
    setIsVestingModalOpen,
    vestingAllowance,
    esGrixBalance,
    grixBalance,
    vestingData,
    isLoading,
    handleVest,
    fetchVestingData,
  };
};
