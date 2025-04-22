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

export const useVesting = () => {
  const { address } = useAccount();
  const [isVestingModalOpen, setIsVestingModalOpen] = useState(false);
  const [vestingAllowance, setVestingAllowance] = useState('0');
  const [esGrixBalance, setEsGrixBalance] = useState('0');
  const [grixBalance, setGrixBalance] = useState('0');
  const [vestingData, setVestingData] = useState<any>(null);
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
      setVestingData(vesting);
    } catch (error) {
      console.error('Error fetching vesting data:', error);
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
        const approveTx = await approveVesting(stakingContracts.esGRIXToken.address, parsedAmount);
        // await approveTx.wait();
      }

      // Perform vesting
      const vestTx = await vestEsGs(parsedAmount);
      // await vestTx.wait();

      // Refresh data
      await fetchVestingData();
    } catch (error) {
      console.error('Error vesting:', error);
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
