import {
  Box,
  Flex,
  Table as ChakraTable,
  TableCellProps,
  TableColumnHeaderProps,
  TableContainer,
  TableContainerProps,
  TableProps as ChakraTableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender, RowData, Table as TanstackTable } from '@tanstack/react-table';
import React from 'react';

export type TableProps<T> = TableContainerProps & {
  table: TanstackTable<T>;
  tableProps?: ChakraTableProps;
  thProps?: TableColumnHeaderProps;
  tdProps?: TableCellProps;
  customExpandedRow?: (data: T) => React.ReactNode;
};
import { ChevronRightIcon } from '@chakra-ui/icons'; // Import icons for expanding rows

export const Table = <TData extends RowData>({ table, tableProps, thProps, tdProps, customExpandedRow, ...rest }: TableProps<TData>) => (
  <TableContainer w="full" borderTopWidth={1} borderColor="gray.900" {...rest}>
    <ChakraTable size="lg" {...tableProps}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th
                key={header.id}
                color="gray.300"
                width={header.column.getSize() || `${100 / table.getVisibleLeafColumns().length}%`}
                {...thProps}
              >
                <Box display="flex" justifyContent="center">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Box>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <Tr onClick={row.getCanExpand() ? () => row.toggleExpanded() : undefined} color="base.white">
              {row.getVisibleCells().map((cell, index) => (
                <Td key={cell.id} width={cell.column.getSize() || `${100 / table.getVisibleLeafColumns().length}%`} {...tdProps}>
                  {index === 0 && (
                    <Flex alignItems="center" ml="-3">
                      {row.getCanExpand() && (
                        <Box
                          mr="4"
                          cursor="pointer"
                          borderRadius="full"
                          border="1px solid"
                          borderColor="gray.700"
                          _hover={{
                            color: 'gray.400',
                            backgroundColor: 'gray.800',
                          }}
                        >
                          <ChevronRightIcon
                            boxSize={6}
                            color="gray.400"
                            transition="transform 0.2s"
                            transform={row.getIsExpanded() ? 'rotate(90deg)' : 'rotate(0deg)'}
                          />
                        </Box>
                      )}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Flex>
                  )}
                  {index !== 0 && flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
            {row.getIsExpanded() && customExpandedRow && (
              <Tr key={`${row.id}-expanded-row`}>
                <Td colSpan={table.getVisibleLeafColumns().length} textAlign="center" p={0}>
                  {customExpandedRow(row.original)}
                </Td>
              </Tr>
            )}
          </React.Fragment>
        ))}
      </Tbody>
    </ChakraTable>
  </TableContainer>
);
