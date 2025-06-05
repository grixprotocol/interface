import { useCallback, useEffect, useState } from 'react';
import { erc20Abi, formatEther, parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';

import { normalizeAddress } from '@/utils/web3Util';
import { wagmiConfig } from '@/web3Config/reownConfig';
import { stakingContracts } from '@/web3Config/staking/config';
import {
  approveVesting,
  checkVestingAllowance,
  getTokenBalance,
  getVestingData,
  vestEsGRIX,
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
  const [totalStaked, setTotalStaked] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTotalStaked = useCallback(async () => {
    try {
      // Get total GRIX tokens staked in the vester contract
      const balance = await readContract(wagmiConfig, {
        abi: erc20Abi,
        address: normalizeAddress(stakingContracts.grixToken.address),
        functionName: 'balanceOf',
        args: [normalizeAddress(stakingContracts.rewardTracker.address)],
      });

      const amount = formatEther(balance);
      setTotalStaked(amount);
    } catch (error) {
      setTotalStaked('0');
    }
  }, []);

  const fetchVestingData = useCallback(async () => {
    if (!address) return;

    try {
      const [allowance, esGrixBal, grixBal, vesting] = await Promise.all([
        checkVestingAllowance(address, stakingContracts.esGRIXToken.address),
        getTokenBalance(stakingContracts.esGRIXToken.address, address),
        getTokenBalance(stakingContracts.grixToken.address, address),
        getVestingData(address),
        fetchTotalStaked(),
      ]);

      setVestingAllowance(allowance.toString());
      setEsGrixBalance(esGrixBal);
      setGrixBalance(grixBal);
      setVestingData(vesting as VestingData);
    } catch (error) {
      setVestingData(null);
      throw error;
    }
  }, [address, fetchTotalStaked]);

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
      await vestEsGRIX(parsedAmount);

      // Refresh data
      await fetchVestingData();
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
    totalStaked,
    isLoading,
    handleVest,
    fetchVestingData,
  };
};
