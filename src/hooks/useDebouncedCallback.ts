import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncedCallback = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  delay = 500
): ((...args: Parameters<T>) => void) => {
  const timeout = useRef<number>();
  const cb = useRef(callback);

  // Update the callback via a ref to always call the latest version
  useEffect(() => {
    cb.current = callback;
  }, [callback]);

  // Cleanup pending timeouts when unmounting.
  useEffect(() => () => clearTimeout(timeout.current), []);

  return useCallback(
    (...args) => {
      clearTimeout(timeout.current);
      // https://github.com/Microsoft/TypeScript/issues/30128#issuecomment-651877225
      timeout.current = window.setTimeout(() => {
        cb.current(...args);
      }, delay);
    },
    [delay]
  );
};
