/* eslint-disable max-lines */
import { createPublicClient, createWalletClient, erc20Abi, formatEther, http } from 'viem';
import { readContract, waitForTransaction, writeContract } from 'wagmi/actions';

import { normalizeAddress } from '@/utils/web3Util';

import { wagmiConfig } from '../reownConfig';
import { rewardDistributorAbi, rewardTrackerAbi, stakingRouterAbi, vesterAbi } from './abis';
import { stakingContracts } from './config';

// Add this helper at the top of the file
const toHexAddress = (address: string): `0x${string}` => address as `0x${string}`;

// Initialize clients
export const publicClient = createPublicClient({
  chain: wagmiConfig.chains[0],
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: wagmiConfig.chains[0],
  transport: http(),
});

// Check staking allowance
export const checkStakingAllowance = async (owner: string, token: string) => {
  const allowance = await readContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(token),
    functionName: 'allowance',
    args: [toHexAddress(owner), normalizeAddress(stakingContracts.rewardTracker.address)],
  });

  return allowance;
};

// Approve staking
export const approveStaking = async (token: string, amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(token),
    functionName: 'approve',
    args: [normalizeAddress(stakingContracts.rewardTracker.address), amount],
  });

// Stake GRIX tokens
export const stakeGRIX = async (amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'stakeGrix',
    args: [amount],
  });

// Stake EsGs tokens
export const stakeEsGRIX = async (amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'stakeEsGrix',
    args: [amount],
  });

// Unstake EsGs tokens
export const unstakeEsGRIX = async (amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'unstakeEsGrix',
    args: [amount],
  });

// Claim rewards
export const claim = async (shouldClaimRewards: boolean, shouldClaimFee: boolean, shouldClaimVesting: boolean) =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'claim',
    args: [shouldClaimRewards, shouldClaimFee, shouldClaimVesting],
  });

// Vest EsGs tokens
export const vestEsGRIX = async (amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'vestEsGrix',
    args: [amount],
  });

// Get core tracker information
export const getCoreTracker = async () =>
  (await readContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'coreTracker',
  })) as {
    rewardTracker: string;
    rewardDistributor: string;
    loanRewardTracker: string;
    loanRewardDistributor: string;
    bonusTracker: string;
    bonusDistributor: string;
    feeTracker: string;
    feeDistributor: string;
    vester: string;
    loanVester: string;
  };
const getCumulativeRewards = async (address: string) => {
  const cumulativeRewards = await readContract(wagmiConfig, {
    abi: rewardTrackerAbi,
    address: normalizeAddress(stakingContracts.rewardTracker.address),
    functionName: 'cumulativeRewards',
    args: [address],
  });
  return cumulativeRewards;
};
// Get user reward tracker data
export const getUserRewardTrackerData = async (address: string) => {
  if (!address) return null;

  try {
    const claimable = await readContract(wagmiConfig, {
      abi: rewardTrackerAbi,
      address: normalizeAddress(stakingContracts.rewardTracker.address),
      functionName: 'claimable',
      args: [address],
    });

    const stakedAmount = await readContract(wagmiConfig, {
      abi: rewardTrackerAbi,
      address: normalizeAddress(stakingContracts.rewardTracker.address),
      functionName: 'stakedAmounts',
      args: [address],
    });

    const cumulativeRewards = await getCumulativeRewards(address);

    const averageStaked = await readContract(wagmiConfig, {
      abi: rewardTrackerAbi,
      address: normalizeAddress(stakingContracts.rewardTracker.address),
      functionName: 'averageStakedAmounts',
      args: [address],
    });

    return {
      claimable: formatEther(claimable as bigint),
      stakedAmount: formatEther(stakedAmount as bigint),
      cumulativeRewards: formatEther(cumulativeRewards as bigint),
      averageStaked: formatEther(averageStaked as bigint),
    };
  } catch (error) {
    return null;
  }
};

// Add this new function to check token balance
export const getTokenBalance = async (tokenAddress: string, userAddress: string) => {
  try {
    const balance = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: normalizeAddress(tokenAddress),
      functionName: 'balanceOf',
      args: [toHexAddress(userAddress)],
    });

    return formatEther(balance);
  } catch (error) {
    return '0';
  }
};

// Add new function to get user's staked amount for GRIX
export const getStakedAmount = async (userAddress: string) => {
  try {
    const stakedAmount = await readContract(wagmiConfig, {
      abi: rewardTrackerAbi,
      address: normalizeAddress(stakingContracts.rewardTracker.address),
      functionName: 'depositBalances',
      args: [userAddress as `0x${string}`, stakingContracts.grixToken.address],
    });
    return formatEther(stakedAmount as bigint);
  } catch (error) {
    return '0';
  }
};

// Update the getEsGrixStakedAmount function to correctly fetch esGRIX staked amount
export const getEsGrixStakedAmount = async (userAddress: string) => {
  try {
    const stakedAmount = await readContract(wagmiConfig, {
      abi: rewardTrackerAbi,
      address: normalizeAddress(stakingContracts.rewardTracker.address),
      functionName: 'depositBalances',
      args: [userAddress as `0x${string}`, stakingContracts.esGRIXToken.address],
    });
    return formatEther(stakedAmount as bigint);
  } catch (error) {
    return '0';
  }
};
const getTokenPerInterval = async () => {
  // Get tokens per interval from the reward distributor
  const rewardDistributorAddress = stakingContracts.rewardDistributor.address;

  const tokensPerInterval = await readContract(wagmiConfig, {
    abi: rewardDistributorAbi,
    address: normalizeAddress(rewardDistributorAddress),
    functionName: 'tokensPerInterval',
    args: [],
  });

  return tokensPerInterval;
};

// Add function to get reward rate
export const getRewardRate = async () => {
  // Use the direct reward distributor address from stakingContracts
  const rewardDistributorAddress = stakingContracts.rewardDistributor.address;

  // Get tokens per interval from the reward distributor
  const tokensPerInterval = await getTokenPerInterval();

  // Also get the paused status to ensure rewards are active
  const isPaused = await readContract(wagmiConfig, {
    abi: rewardDistributorAbi,
    address: normalizeAddress(rewardDistributorAddress),
    functionName: 'paused',
    args: [],
  });

  if (isPaused) {
    return 0n;
  }

  return tokensPerInterval;
};

export const getTotalStaked = async (userAddress: string) => {
  try {
    const totalGrixStaked = await getStakedAmount(userAddress);

    const totalEsGrixStaked = await getEsGrixStakedAmount(userAddress);

    // Convert string values to BigInt and sum
    return BigInt(Math.floor(Number(totalGrixStaked) * 1e18)) + BigInt(Math.floor(Number(totalEsGrixStaked) * 1e18));
  } catch (error) {
    return 0n;
  }
};
//Staking APR Formula = (ETH rewards + esGS emissions annualized) / (Total GS + esGS staked) * 100
export const calculateAPR = async () => {
  // Get total staked amount using totalSupply from the reward tracker
  const totalStaked = await readContract(wagmiConfig, {
    abi: rewardTrackerAbi,
    address: normalizeAddress(stakingContracts.rewardTracker.address),
    functionName: 'totalSupply',
    args: [],
  });

  if (totalStaked === 0n) return 0;

  // Get ETH reward rate from rewardDistributor
  const ethRewardRate = await getTokenPerInterval();

  // Get esGrix emission rate (assuming it's from the reward distributor as well)
  const esGrixRewardRate = await getTokenPerInterval();

  // Calculate annual rewards (seconds in a year * tokens per interval)
  const SECONDS_PER_YEAR = 365n * 24n * 60n * 60n;
  const annualEthRewards = ethRewardRate * SECONDS_PER_YEAR;
  const annualEsGrixRewards = esGrixRewardRate * SECONDS_PER_YEAR;
  const totalAnnualRewards = annualEthRewards + annualEsGrixRewards;

  // Calculate APR: (totalAnnualRewards / totalStaked) * 100
  const apr = (totalAnnualRewards * 100n) / (totalStaked as bigint);

  return Number(apr);
};
// Add vesting allowance check
export const checkVestingAllowance = async (owner: string, token: string) => {
  const allowance = await readContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(token),
    functionName: 'allowance',
    args: [owner as `0x${string}`, normalizeAddress(stakingContracts.vester.address)],
  });

  return allowance;
};

// Add approve for vesting
export const approveVesting = async (token: string, amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: erc20Abi,
    address: normalizeAddress(token),
    functionName: 'approve',
    args: [normalizeAddress(stakingContracts.vester.address), amount],
  });

const getClaimable = async (address: `0x${string}`) => {
  const claimable = await readContract(wagmiConfig, {
    abi: vesterAbi,
    address: normalizeAddress(stakingContracts.vester.address),
    functionName: 'claimable',
    args: [address],
  });
  return claimable;
};

// Get vesting data
export const getVestingData = async (address: `0x${string}`) => {
  try {
    const [claimable, totalVested, maxVestableAmount] = await Promise.all([
      getClaimable(address),
      readContract(wagmiConfig, {
        abi: vesterAbi,
        address: normalizeAddress(stakingContracts.vester.address),
        functionName: 'getVestedAmount',
        args: [address],
      }),
      readContract(wagmiConfig, {
        abi: vesterAbi,
        address: normalizeAddress(stakingContracts.vester.address),
        functionName: 'getMaxVestableAmount',
        args: [address],
      }),
    ]);

    return {
      claimable: formatEther(claimable as bigint),
      totalVested: formatEther(totalVested as bigint),
      maxVestableAmount: formatEther(maxVestableAmount as bigint),
    };
  } catch (error) {
    return null;
  }
};

// Unstake GRIX tokens
export const unstakeGs = async (amount: bigint) =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'unstakeGrix',
    args: [amount],
  });

// Withdraw function for vesting (no amount parameter needed)
export const withdrawEsGs = async () =>
  await writeContract(wagmiConfig, {
    abi: stakingRouterAbi,
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    functionName: 'withdrawEsGrix',
    args: [], // withdrawEsGrix takes no arguments in the contract
  });

export const compound = async (address: `0x${string}`) => {
  const result = await writeContract(wagmiConfig, {
    address: normalizeAddress(stakingContracts.grixStakingRouter.address),
    abi: stakingRouterAbi,
    functionName: 'compound',
    args: [],
  });

  await waitForTransaction(wagmiConfig, {
    hash: result,
  });

  // Refresh all data after successful compound
  return await refreshAllData(address);
};

// Get user staking data
export const getStakingData = async (address: `0x${string}`) => {
  try {
    const [rewardData, stakedAmount, esGrixStaked] = await Promise.all([
      getUserRewardTrackerData(address),
      getStakedAmount(address),
      getEsGrixStakedAmount(address),
    ]);

    return {
      ...rewardData,
      stakedAmount,
      esGrixStaked,
    };
  } catch (error) {
    return null;
  }
};

// Helper function to refresh all balances and data
export const refreshAllData = async (address: `0x${string}`) => {
  const [stakingData, vestingData] = await Promise.all([getStakingData(address), getVestingData(address)]);
  return { stakingData, vestingData };
};

// Get last vesting time for a user
export const getLastVestingTime = async (userAddress: string) => {
  try {
    const lastVestingTime = await readContract(wagmiConfig, {
      abi: vesterAbi,
      address: normalizeAddress(stakingContracts.vester.address),
      functionName: 'lastVestingTimes',
      args: [userAddress as `0x${string}`],
    });

    return lastVestingTime as bigint;
  } catch (error) {
    return 0n;
  }
};

// Get vesting duration
export const getVestingDuration = async () => {
  try {
    const duration = await readContract(wagmiConfig, {
      abi: vesterAbi,
      address: normalizeAddress(stakingContracts.vester.address),
      functionName: 'vestingDuration',
      args: [],
    });
    return duration as bigint;
  } catch (error) {
    return 0n;
  }
};
