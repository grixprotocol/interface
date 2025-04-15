import { useCallback, useContext } from 'react';

import { analytics } from './analytics';
import { AnalyticsContext } from './AnalyticsProvider';

export const useAnalytics = () => {
  const { getGlobalProperties } = useContext(AnalyticsContext);

  const track = useCallback(
    (name: string, props?: Record<string, unknown>) => {
      const globalProps = getGlobalProperties();

      return analytics.track(name, {
        ...globalProps,
        ...props,
        timestamp: new Date().toISOString(),
      });
    },
    [getGlobalProperties]
  );

  return { track };
};

export const useIdentify = () => analytics.identify;
