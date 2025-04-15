// Fee configuration
// export const FEE_PERCENTAGE = 0.01; // 1%
export const MAX_FEE_USD = 1; // 1 USD cap

/**
 * Calculates fee in USD with 1 USD cap
 * @param priceUSD - Price in USD
 * @returns Fee amount in USD
 */
const calculateFeeUSD = (priceUSD: number, feePercentage: number): number => {
  const calculatedFee = priceUSD * feePercentage;
  return Math.min(calculatedFee, MAX_FEE_USD);
};

/**
 * Calculates total price including fee
 * @param priceUSD - Base price in USD
 * @returns Total price including fee in USD
 */
export const calculateTotalPriceWithFee = (priceUSD: number, feePercentage: number): number => {
  const fee = calculateFeeUSD(priceUSD, feePercentage);
  return priceUSD + fee;
};
