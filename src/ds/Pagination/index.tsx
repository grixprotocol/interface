import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ totalCount, pageSize, page, onPageChange }: PaginationProps) => (
  <HStack>
    <Text color="base.white">
      {page * pageSize + 1}-{Math.min((page + 1) * pageSize, totalCount)} of {totalCount}
    </Text>
    <IconButton
      size="sm"
      borderRightRadius={0}
      variant="secondary"
      aria-label="Previous page"
      icon={<ChevronLeftIcon />}
      onClick={() => onPageChange(page - 1)}
      isDisabled={page === 0}
    />
    <IconButton
      size="sm"
      borderLeftRadius={0}
      variant="secondary"
      aria-label="Next page"
      icon={<ChevronRightIcon />}
      onClick={() => onPageChange(page + 1)}
      isDisabled={(page + 1) * pageSize >= totalCount}
    />
  </HStack>
);
