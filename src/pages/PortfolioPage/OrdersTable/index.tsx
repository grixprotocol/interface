import { Box } from '@chakra-ui/react';
import { ColumnDef, ExpandedState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { UserRequest } from '@/api';
import { Table } from '@/ds';
import { ProcedureDisplay } from '@/ds/procedureDisplay';

export const OrdersTable = ({
  columns,
  data,
  defaultExpanded = false,
}: {
  columns: ColumnDef<UserRequest>[];
  data: UserRequest[];
  defaultExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  // Set rows to expanded based on defaultExpanded prop and when data changes
  useEffect(() => {
    if (defaultExpanded) {
      const expandedRows = data.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {} as Record<string | number, boolean>);
      setExpanded(expandedRows);
    } else {
      setExpanded({});
    }
  }, [data, defaultExpanded]);

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getRowCanExpand(row) {
      const rowData = row.original;
      return Object.keys(rowData.procedure.steps).length > 0;
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      table={table}
      customExpandedRow={CustomExpandedRow}
      tdProps={{ py: 2 }}
      sx={{
        'th, td': {
          textAlign: 'center',
        },
      }}
    />
  );
};

const CustomExpandedRow = (rowData: UserRequest) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <ProcedureDisplay procedure={rowData.procedure} />
  </Box>
);
