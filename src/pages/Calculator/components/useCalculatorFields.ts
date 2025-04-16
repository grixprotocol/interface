import { useCallback, useState } from 'react';

import { PNLChartPosition } from '@/ds/PNLChart/types';

const emptyRow: PNLChartPosition = {
  amount: 1,
  optionType: 'call',
  premium: 42,
  strikePrice: 3500,
};

export const useCalculatorFields = () => {
  const [fields, setFields] = useState<PNLChartPosition[]>([{ ...emptyRow }]);

  const addRow = useCallback(() => {
    setFields((prev) => [...prev, { ...emptyRow }]);
  }, []);

  const removeRow = useCallback((index: number) => {
    setFields((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const onChange = useCallback((index: number, { field, value }: { field: string; value: number | string }) => {
    setFields((prev) => {
      const newFields = [...prev];
      newFields[index] = { ...newFields[index], [field]: value };
      return newFields;
    });
  }, []);

  return { fields, addRow, removeRow, onChange };
};
