import { erc20Abi } from 'viem';

import { rewardDistributorAbi, rewardTrackerAbi, stakingRouterAbi, vesterAbi } from './abis';

// {
//     loanTrackerDeployer: '0xF5311DB6Cd16351170C2b97c889Fa1d4a6A37D46',
//     rewardTrackerDeployer: '0x50Db289c3B97ce9eDc57972cAa460B5aFE37cA61',
//     feeTrackerDeployer: '0x9c10169fd757835726F68D8349583Aa96686911f',
//     rewardDistributorDeployer: '0x72109c25fA0d6E46A5CE896a806AD03C5b18237d',
//     bonusDistributorDeployer: '0x54d19F4500DB884A2CF4E8006252e0E06052285c',
//     vesterDeployer: '0x7B53Ba2B2D19a4D914a7cfb659FAAfbef2a36a1D',
//     vesterNoReserveDeployer: '0x7Ae10335663232E6813A5603D06978361b8467Cf'
//   }

export const stakingContracts = {
  grixStakingRouter: {
    address: '0x5A02eC15ED1E78D5fd6dBe9b7945f086B358559c',
    abi: stakingRouterAbi,
  },
  rewardTracker: {
    address: '0xE0F2EA821A3310C4E252B4262d74dFb29AdbCb72',
    abi: rewardTrackerAbi,
  },
  bonusTracker: {
    address: '0x6aC161a29F5aB6394D3AE1EbEfef477a7C1F1744',
    abi: rewardTrackerAbi,
  },
  // feeTracker: {
  //   address: '0xEaC60879C18beD61749dBed219a40Ed2fc86F694',
  //   abi: feeTrackerAbi,
  // },
  rewardDistributor: {
    address: '0x11Ac9D20aDa680Ce922EE12A532E3f371150402B',
    abi: rewardDistributorAbi,
  },
  // bonusDistributor: {
  //   address: '0x38Abbc12f303bd31B1240f6098BF5667953F1D7e',
  //   abi: bonusDistributorAbi,
  // },
  vester: {
    address: '0x64BfA97349CD90B2b8Fb089c582004cE494C5FeA',
    abi: vesterAbi,
  },
  grixToken: {
    address: '0x812F2D5Ff6088ed7A655567dBcDf0d42cf07ca38',
    abi: erc20Abi,
  },
  esGRIXToken: {
    address: '0xa95Fc08228667dfd6D99C832B92409D29d8328d9',
    abi: erc20Abi,
  },
  esGRIXbToken: {
    address: '0x6Db8cE48D9832a3eC37C09052883429d15854808',
    abi: erc20Abi,
  },
  bnGRIXToken: {
    address: '0xd37E5cd09301a4576Ef72a10090ABb7Be91396c0',
    abi: erc20Abi,
  },
};
