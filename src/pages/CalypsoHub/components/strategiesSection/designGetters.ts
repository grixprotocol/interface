import {
  FaArrowDown,
  FaArrowsAltH,
  FaArrowUp,
  FaBolt,
  FaChartLine,
  FaExchangeAlt,
  FaPercentage,
  FaShieldAlt,
} from 'react-icons/fa';

import { Strategy } from '../../types';

export const getTypeColor = (type: Strategy['type']) => {
  switch (type) {
    case 'income':
      return 'green';
    case 'protection':
      return 'blue';
    case 'growth':
      return 'purple';
    default:
      return 'gray';
  }
};

export const getTypeIcon = (type: Strategy['type']) => {
  switch (type) {
    case 'income':
      return FaPercentage;
    case 'protection':
      return FaShieldAlt;
    case 'growth':
      return FaChartLine;
    default:
      return FaExchangeAlt;
  }
};

export const getMarketConditionColor = (condition: string) => {
  if (condition.includes('Bullish')) return 'green.400';
  if (condition.includes('Bearish')) return 'red.400';
  if (condition.includes('Volatility')) return 'purple.400';
  if (condition.includes('Range')) return 'blue.400';
  if (condition.includes('Sideways')) return 'yellow.400';
  return 'gray.400';
};

export const getMarketConditionIcon = (condition: string) => {
  if (condition.includes('Bullish')) return FaArrowUp;
  if (condition.includes('Bearish')) return FaArrowDown;
  if (condition.includes('Volatility')) return FaBolt;
  if (condition.includes('Range')) return FaExchangeAlt;
  if (condition.includes('Sideways')) return FaArrowsAltH;
  return FaChartLine;
};
