import { Link } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { TableRow } from './mdParser';

const columnHelper = createColumnHelper<TableRow>();

const DEFAULT_DATA: TableRow[] = [];
export const useIntegrationsTable = ({ data = DEFAULT_DATA }: { data?: TableRow[] }) => {
  const columns = useMemo(() => {
    if (!data?.length) return [];
    const [firstRow] = data;

    return Object.keys(firstRow).map((key, index) =>
      columnHelper.accessor(key, {
        cell: (info) => {
          const { text, link } = info.cell.row.original[key];
          return link ? (
            <>
              <Link href={link} isExternal _hover={{ textDecoration: 'none' }}>
                {text}
              </Link>
            </>
          ) : (
            text
          );
        },
        enablePinning: index === 0,
      })
    );
  }, [data]);

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enablePinning: true,
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        left: ['Protocol Name'],
      },
    },
  });
};
