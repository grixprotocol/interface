import { differenceInDays, differenceInMilliseconds, differenceInMinutes, format } from 'date-fns';

import { ExpirationType } from '@/api/types';

export const msValues = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

export const formatTimestampToDate = (timestamp: number, includeTime: boolean = false): string => {
  const date = new Date(Number(timestamp) * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
  const year = date.getFullYear();

  let result = `${day}/${month}/${year}`;

  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    result += ` ${hours}:${minutes}`;
  }

  return result;
};

export const getRemainingTime = (endDate: string) => {
  const now = new Date().getTime();
  const end = new Date(Number(endDate) * 1000).getTime();
  const distance = end - now;

  if (distance < 0) {
    return 'Expired';
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

export const formatISOStringToDate = (isoDateString: string, includeTime: boolean = false): string => {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
  const year = date.getUTCFullYear();

  let result = `${day}/${month}/${year}`;

  if (includeTime) {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    result += ` ${hours}:${minutes}`;
  }

  return result;
};

export function findNearestUpcomingDate(timestamps: string[]) {
  const timestampsInMS = timestamps.map((timestamp) => Number(timestamp) * 1000);
  const now = new Date();

  if (timestampsInMS.length === 0) return null;

  let nearestDate = timestampsInMS[0];
  let smallestDifference = differenceInMilliseconds(nearestDate, now);

  timestampsInMS.forEach((date) => {
    const difference = differenceInMilliseconds(date, now);

    if (difference < smallestDifference) {
      smallestDifference = difference;
      nearestDate = date;
    }
  });

  return String(nearestDate / 1000);
}

export const formatDateByTradeType = (tradeType: ExpirationType, date: string) => {
  switch (tradeType) {
    case '24hrs': {
      const hoursToExpiry = Number(date) / 3600;
      const result = hoursToExpiry > 24 ? `${hoursToExpiry / 24}d` : `${hoursToExpiry}h`;
      return result;
    }
    case 'vanilla':
      return format(Number(date) * 1000, 'dd MMM yyyy');
  }
};

export const formatDaysDifference = (...params: Parameters<typeof differenceInDays>) => {
  const diff = differenceInDays(...params);

  if (diff === 0) return '';
  if (diff === 1) return `${diff} day`;

  return `${diff} days`;
};

export const formatTimeDifference = (...params: Parameters<typeof differenceInMinutes>) => {
  const pluralize = (value: number, unit: string) => (value === 1 ? unit : `${unit}s`);
  const mins = differenceInMinutes(...params);

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  const hoursFormatted = hours > 0 ? `${hours} ${pluralize(hours, 'hour')}` : '';
  const minutesFormatted = minutes > 0 ? `${minutes} ${pluralize(minutes, 'minute')}` : '';

  return `${hoursFormatted} ${minutesFormatted}`.trim();
};

export const getSignatureExpired = (): string => {
  const newDate = new Date();
  newDate.setMinutes(newDate.getMinutes() + 15);
  return newDate.toISOString();
};

/**
 * Formats a duration given in milliseconds into a human-readable string.
 * The format includes months, days, hours, and minutes, as applicable.
 *
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} A formatted string representing the duration.
 */
export const formatDuration = (ms: number): string => {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;

  let result = '';
  if (months > 0) {
    result += `${months}mo `;
  }
  if (remainingDays > 0) {
    result += `${remainingDays}d `;
  }
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0) {
    result += `${minutes}m`;
  }

  return result.trim();
};

export const formatDate = (date: string | number | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
