/**
 * Format balance with 2 decimal places and commas for large numbers
 */
export const formatBalance = (value: string): string => {
  try {
    // Convert scientific notation to regular number
    const num = Number(value);
    if (isNaN(num)) return '0.00';

    // Format with 2 decimal places and commas for large numbers
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    return '0.00';
  }
};
