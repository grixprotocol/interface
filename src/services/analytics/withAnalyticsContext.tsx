import { ComponentType, useContext, useMemo, useRef } from 'react';

import { AnalyticsContext } from './AnalyticsProvider';
import { forwardRef, HTMLTag } from './types';

export type WithAnalyticsContextProps = {
  setAnalyticsProperties: (properties?: Record<string, unknown>) => void;
};

export function withAnalyticsContext<T, S extends HTMLTag = 'div'>(UI: ComponentType<T & WithAnalyticsContextProps>) {
  const AnalyticsWrapper = forwardRef<T, S>((props: Omit<T, 'setAnalyticsProperties'>, ref) => {
    const { getGlobalProperties } = useContext(AnalyticsContext);
    const propsRef = useRef({});

    const value = useMemo(
      () => ({
        setGlobalProperties: (properties?: Record<string, unknown>) => {
          propsRef.current = { ...propsRef.current, ...properties };
        },
        getGlobalProperties: () => ({
          ...getGlobalProperties(),
          ...propsRef.current,
        }),
      }),
      [getGlobalProperties]
    );

    return (
      <AnalyticsContext.Provider value={value}>
        <UI {...(props as T)} setAnalyticsProperties={value.setGlobalProperties} ref={ref} />
      </AnalyticsContext.Provider>
    );
  });

  return AnalyticsWrapper;
}
