export function formatWithCommas(number: number | string | null): string {
  if (number === null) {
    return '';
  }

  const numericValue = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(numericValue)) {
    return '';
  }

  return numericValue.toLocaleString(undefined, { minimumFractionDigits: 0 });
}

export function strikePriceFormat(number: number | string | null): string {
  if (number === null) {
    return '';
  }

  const numericValue = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(numericValue)) {
    return '';
  }

  return numericValue.toLocaleString(undefined, { minimumFractionDigits: 0 });
}

export const formatCurrency = (value: number | string) => `$${formatWithCommas(value)}`;

export const formatNumberWithSuffix = (num: number) => {
  if (num < 1000) return num.toString();

  const suffixes = ['k', 'm', 'b', 't'];
  const factor = 1000;

  let exponent = Math.floor(Math.log10(Math.abs(num)) / 3);
  exponent = Math.min(exponent, suffixes.length);

  const scaledNumber = num / Math.pow(factor, exponent);
  const formattedNumber = scaledNumber.toFixed(1).replace(/\.0$/, '');

  return `${formattedNumber}${suffixes[exponent - 1] || ''}`;
};

export const formatPriceDisplay = (price: string) => {
  //converting 1,000 to 1k 2,300 to 2.3k etc...
  let formattedNumber = `$${price}`;

  const numPrice = parseFloat(price);
  if (numPrice >= 1000) {
    formattedNumber = `$${(numPrice / 1000).toFixed(3)}`;
  }
  return formattedNumber;
};

export const ordinalSuffix = (num: number) => {
  const j = num % 10;
  const k = num % 100;

  if (j === 1 && k !== 11) {
    return num + 'st';
  }
  if (j === 2 && k !== 12) {
    return num + 'nd';
  }
  if (j === 3 && k !== 13) {
    return num + 'rd';
  }
  return num + 'th';
};
