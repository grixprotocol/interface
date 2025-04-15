import { ExpiryShort } from './types';

export const parseExpiryShort = (dateStr: ExpiryShort): number => {
  const year = `20${dateStr.substring(5)}`;
  const monthStr = dateStr.substring(2, 5);
  const day = dateStr.substring(0, 2);
  const month = new Date(`${monthStr} 1, 2000`).getMonth() + 1;
  const monthPadded = month.toString().padStart(2, '0');
  const dateTimeString = `${year}-${monthPadded}-${day}T08:00:00Z`;
  return Date.parse(dateTimeString);
};

export const formatExpiryShort = (timestamp: number): ExpiryShort => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}${month}${year}` as ExpiryShort;
};
