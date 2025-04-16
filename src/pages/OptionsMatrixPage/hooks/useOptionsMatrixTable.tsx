import { Box, Skeleton, Text, useBreakpointValue } from '@chakra-ui/react';
import { CellContext, createColumnHelper, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { PriceType, TradeOptionType } from '@/api';
import { formatCurrency } from '@/utils/number';

import { StrikeOptionTableCell } from '../components/StrikeOptionTableCell';
import { StrikeTableCell } from '../components/StrikeTableCell';
import { OptionMatrixAccessor, OptionMatrixItem } from '../types';

const columnHelper = createColumnHelper<OptionMatrixItem>();

const DEFAULT_DATA: OptionMatrixItem[] = [];
export const useOptionsMatrixTable = ({
  data = DEFAULT_DATA,
  optionType,
  onItemSelection,
  assetPriceUSD,
}: {
  data?: OptionMatrixItem[];
  optionType: TradeOptionType;
  onItemSelection: (selection: { item: OptionMatrixItem; accessor: OptionMatrixAccessor }) => void;
  assetPriceUSD?: number;
}) => {
  const isSmallScreen = useBreakpointValue({
    base: false,
    sm: true,
    md: false,
  });
  const shouldFilterCalls = isSmallScreen && optionType !== 'call';

  const nearestStrikeItem = useMemo(() => {
    if (!data?.length || !assetPriceUSD) return;

    return data.reduce((curr, item) => {
      if (parseFloat(item.strikePrice) > parseFloat(curr.strikePrice) && parseFloat(item.strikePrice) < assetPriceUSD) {
        return item;
      }
      return curr;
    }, data[0]);
  }, [data, assetPriceUSD]);

  const getIsRowExpanded = useCallback(
    (row: Row<OptionMatrixItem>) => {
      if (!nearestStrikeItem) return false;

      return row.original.strikePrice === nearestStrikeItem.strikePrice;
    },
    [nearestStrikeItem]
  );

  const renderCell = useCallback(
    (accessor: OptionMatrixAccessor, type: PriceType) => (info: CellContext<OptionMatrixItem, unknown>) => {
      const [firstProtocol] = info.cell.row.original[accessor];
      if (!firstProtocol)
        return (
          <Box
            _hover={{
              bg: 'whiteAlpha.100',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Text
              color="gray.700"
              cursor="pointer"
              textAlign="center"
              p={4}
              h="60px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              No option
            </Text>
          </Box>
        );

      return (
        <Box
          _hover={{
            bg: 'whiteAlpha.100',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          <StrikeOptionTableCell
            boardItem={firstProtocol}
            matrixItem={info.cell.row.original}
            type={type}
            accessor={accessor}
            onItemClick={(item) => onItemSelection({ item, accessor })}
          />
        </Box>
      );
    },
    [onItemSelection]
  );

  const columns = useMemo(() => {
    const bidCall = columnHelper.accessor('bidCalls.optionId', {
      header: () => <StrikeTableCell text="Bid" />,
      cell: renderCell('bidCalls', 'bid'),
    });
    const askCall = columnHelper.accessor('askCalls.optionId', {
      header: () => <StrikeTableCell text="Ask" />,
      cell: renderCell('askCalls', 'ask'),
    });
    const bidPut = columnHelper.accessor('bidPuts.optionId', {
      header: () => <StrikeTableCell text="Bid" />,
      cell: renderCell('bidPuts', 'bid'),
    });
    const putAsk = columnHelper.accessor('askPuts.contractPrice', {
      header: () => <StrikeTableCell text="Ask" />,
      cell: renderCell('askPuts', 'ask'),
    });

    const strikePrice = columnHelper.accessor('strikePrice', {
      // header: () => <StrikeTableCell withBackground text="Strike"  />,
      header: () => (
        <Text color="gray.400" fontSize="lg">
          Strike
        </Text>
      ),
      cell: (info) => <StrikeTableCell withBackground text={formatCurrency(info.cell.row.original.strikePrice)} />,
    });

    if (isSmallScreen) {
      return shouldFilterCalls ? [bidPut, strikePrice, putAsk] : [bidCall, strikePrice, askCall];
    }

    return [bidCall, askCall, strikePrice, bidPut, putAsk];
  }, [isSmallScreen, shouldFilterCalls, renderCell]);

  const loadingData = useMemo(() => {
    if (data.length !== 0) {
      return {};
    }

    return {
      data: Array(10).fill({}),
      columns: columns.map((column) => ({
        ...column,
        cell: () => <Skeleton height={6} w="full" my={2} />,
      })),
    };
  }, [data, columns]);

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getIsRowExpanded,
    defaultColumn: {
      size: NaN,
    },
    ...loadingData,
  });
};
