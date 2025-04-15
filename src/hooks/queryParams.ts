import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSetDefaultQueryParams = <T extends string>(queryParamKey: string, values: readonly T[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const qpParam = searchParams.get(queryParamKey);
    if (!qpParam || !values.includes(qpParam as T)) {
      searchParams.set(queryParamKey, values[0]);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, queryParamKey, values]);
};

export const useQueryParameter = <T>(qpStr: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setValue = (value: T) => {
    searchParams.set(qpStr, String(value));
    setSearchParams(searchParams);
  };

  return [searchParams.get(qpStr) as T, setValue] as const;
};
