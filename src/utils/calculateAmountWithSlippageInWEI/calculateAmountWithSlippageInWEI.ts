import { parseUnits } from 'viem';

import { SlippageCalculationParams } from './type';

export const calculateAmountWithSlippageInWEI = ({
  rawAmount,
  slippagePercentage,
  decimals,
  assetPriceInUsd,
}: SlippageCalculationParams) => {
  const rawAmountNumber = Number(rawAmount);
  if (rawAmountNumber <= 0) {
    return '0';
  }
  const mobyFee = '60000000000000';
  const mobyFeeInEth = Number(mobyFee) / 1e18; // Convert moby fee to ETH

  const slippagePercentagePlus = slippagePercentage + 15;

  const slippageAmount = rawAmountNumber * (slippagePercentagePlus / 100);

  const amountWithSlippage = rawAmountNumber + slippageAmount;

  const amountInToken = amountWithSlippage / assetPriceInUsd;

  // Add mobyFeeInEth to the amount
  const amountWithSlippageAndFeeInEth = amountInToken + mobyFeeInEth;

  const formattedAmountInToken = amountWithSlippageAndFeeInEth.toFixed(6);

  const amountWithSlippageInWEI = parseUnits(formattedAmountInToken, decimals);

  return amountWithSlippageInWEI.toString();
};
