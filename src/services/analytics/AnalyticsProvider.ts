import { createContext } from 'react';

const noop = () => undefined;

type AnalyticsContextType = {
  setGlobalProperties: (properties?: Record<string, unknown>) => void;
  getGlobalProperties: () => Record<string, unknown>;
};

export const AnalyticsContext = createContext<AnalyticsContextType>({
  setGlobalProperties: noop,
  getGlobalProperties: () => ({}),
});
