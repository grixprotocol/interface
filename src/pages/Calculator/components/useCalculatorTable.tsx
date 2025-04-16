import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Input, Select } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { PNLChartPosition } from '@/ds/PNLChart/types';

const columnHelper = createColumnHelper<PNLChartPosition>();

export const useCalculatorTable = ({
  data,
  onChange,
  onRemoveRow,
}: {
  data: PNLChartPosition[];
  onChange: (index: number, { field, value }: { field: string; value: string | number }) => void;
  onRemoveRow: (index: number) => void;
}) => {
  const createInputAccessor = useCallback(
    (field: keyof PNLChartPosition, header: string) =>
      columnHelper.accessor(field, {
        cell: (info) => {
          const { [field]: value } = info.cell.row.original;
          return (
            <Input
              value={value}
              variant="outline"
              borderColor="gray.600"
              placeholder={header}
              onChange={(event) => {
                onChange(info.cell.row.index, {
                  field,
                  value: Number(event.target.value),
                });
              }}
            />
          );
        },
        header,
      }),
    [onChange]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('optionType', {
        header: 'Option type',
        cell: (info) => {
          const { optionType } = info.cell.row.original;
          return (
            <Select
              value={optionType}
              borderColor="gray.600"
              onChange={(event) => {
                onChange(info.cell.row.index, {
                  field: 'optionType',
                  value: event.target.value,
                });
              }}
            >
              <option value="call">Call</option>
              <option value="put">Put</option>
            </Select>
          );
        },
      }),
      createInputAccessor('amount', 'Amount'),
      createInputAccessor('strikePrice', 'Strike price'),
      createInputAccessor('premium', 'Premium'),
      columnHelper.display({
        cell: (info) => (
          <IconButton onClick={() => onRemoveRow(info.cell.row.index)} aria-label="Remove" icon={<CloseIcon />} />
        ),
        header: 'Remove',
      }),
    ],
    [createInputAccessor, onRemoveRow, onChange]
  );

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
};
