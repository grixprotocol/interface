import { useEffect, useState } from 'react';

export const useDebouncedValue = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value, setDebouncedValue]);

  return debouncedValue;
};
