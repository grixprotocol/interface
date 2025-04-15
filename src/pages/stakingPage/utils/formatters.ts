/**
 * Format balance with 4 decimal places and commas for large numbers
 */
export const formatBalance = (value: string): string => {
  try {
    // Convert scientific notation to regular number
    const num = Number(value);
    if (isNaN(num)) return '0.0000';

    // If it's a large number, format it with commas
    if (num > 1000) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      });
    }

    // Otherwise just show 4 decimal places
    return num.toFixed(4);
  } catch (error) {
    return '0.0000';
  }
};
