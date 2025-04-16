import { Box, Button, ButtonGroup, Center, HStack, Spinner, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { UserOrderType, UserRequest, useUserOrders } from '@/api';
import { BaseCard } from '@/components/BaseCard';
import GrixLogoSpinner from '@/components/commons/My_Movie_1.mp4';
import { Pagination } from '@/ds';
import { useUserAccount } from '@/utils/web3Util';

import { OrdersTable } from './OrdersTable';
import { useColumns } from './OrdersTable/columns';
import { useSplitPositionsData } from './OrdersTable/helpers';
import { NoResults } from './OrdersTable/noResults';
import { useTableTab } from './OrdersTable/useTableTab';

export const ORDERS_TABLE_PAGE_LIMIT = 10;
export const POSITIONS_TABLE_PAGE_LIMIT = 10;
export const REFETCH_INTERVAL = 30 * 1000;

// Reusable container component for portfolio sections
type PortfolioSectionProps<T extends string> = {
  title: string;
  tabs: Array<{ tab: T; name: string }>;
  currentTab: T;
  onTabChange: (tab: T) => void;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
  isLoading?: boolean;
  children: ReactNode;
};

const PortfolioSection = <T extends string>({
  title,
  tabs,
  currentTab,
  onTabChange,
  page,
  onPageChange,
  pageSize,
  totalCount,
  isLoading = false,
  children,
}: PortfolioSectionProps<T>) => (
  <BaseCard w="full" borderColor="gray.700" bg="whiteAlpha.50" p={0} overflow="hidden" minH="30vh">
    <HStack justify="space-between" px={6} py={3} borderBottom="1px solid">
      <HStack spacing={4}>
        <HStack>
          <Text fontSize="xl" color="base.white">
            {title}
          </Text>
        </HStack>
        <ButtonGroup size="sm" isAttached>
          {tabs.map((tab) => (
            <Button
              key={tab.tab}
              onClick={() => onTabChange(tab.tab)}
              variant="ghost"
              color={currentTab === tab.tab ? 'blue.400' : 'gray.400'}
              borderWidth="1px"
              borderColor={currentTab === tab.tab ? 'blue.400' : 'gray.600'}
              _hover={{
                bg: 'whiteAlpha.50',
                borderColor: currentTab === tab.tab ? 'blue.400' : 'gray.400',
              }}
            >
              {tab.name}
            </Button>
          ))}
        </ButtonGroup>
        {isLoading && <Spinner size="sm" color="blue.400" ml={2} />}
      </HStack>
      <Pagination onPageChange={onPageChange} page={page} pageSize={pageSize} totalCount={totalCount} />
    </HStack>

    <Box>{children}</Box>
  </BaseCard>
);

export const PortfolioPage = () => {
  const location = useLocation();
  const fetchAll = new URLSearchParams(location.search).has('allorders');
  const { address: userAddress } = useUserAccount();

  const {
    ordersTableTabs,
    ordersTableCurrentTab,
    ordersTableOnTabChanged,
    positionsPage,
    setPositionsPage,
    ordersPage,
    setOrdersPage,
    positionsTableTabs,
    positionsTableCurrentTab,
    positionsTableOnTabChanged,
  } = useTableTab();

  const positionsTableColumns = useColumns({
    currentTab: UserOrderType.Positions,
  });
  const ordersTableColumns = useColumns({ currentTab: ordersTableCurrentTab });

  const {
    data: ordersData,
    isLoading: isOrdersFirstFetchLoading,
    isFetching: isOrdersFetching,
  } = useUserOrders(
    {
      type: ordersTableCurrentTab,
      userAddress,
      limit: ORDERS_TABLE_PAGE_LIMIT,
      offset: ordersPage * ORDERS_TABLE_PAGE_LIMIT,
      fetchAll,
    },
    { refetchInterval: REFETCH_INTERVAL }
  );

  const {
    data: positionsData,
    isLoading: isPositionsFirstFetchLoading,
    isFetching: isPositionsFetching,
  } = useUserOrders(
    {
      type: UserOrderType.Positions,
      userAddress,
      limit: POSITIONS_TABLE_PAGE_LIMIT,
      offset: positionsPage * POSITIONS_TABLE_PAGE_LIMIT,
      fetchAll,
    },
    { refetchInterval: REFETCH_INTERVAL }
  );

  const { data } = useSplitPositionsData(userAddress as `0x${string}`, positionsData?.data);

  const { positionsData: processedPositionsData, historyData: processedHistoryData } = data ?? {
    historyData: [],
    positionsData: [],
  };

  const isInitialLoading = isOrdersFirstFetchLoading || isPositionsFirstFetchLoading;

  if (isInitialLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
        <Box width="40vh" height="40vh">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              backgroundColor: 'transparent',
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            }}
            onLoadedMetadata={(e) => {
              (e.target as HTMLVideoElement).playbackRate = 1.5;
            }}
          >
            <source src={GrixLogoSpinner} type="video/mp4" />
          </video>
        </Box>
      </Box>
    );
  }

  if (!userAddress) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
        <BaseCard maxW="460px" w="full" p={6} hover={false} borderColor="gray.700" bg="whiteAlpha.50">
          <Text fontSize="xl" color="gray.300" textAlign="center">
            Please connect your wallet to view your portfolio
          </Text>
        </BaseCard>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={6}>
      {/* Positions Section */}
      <PortfolioSection
        title="Positions"
        tabs={positionsTableTabs}
        currentTab={positionsTableCurrentTab}
        onTabChange={positionsTableOnTabChanged}
        page={positionsPage}
        onPageChange={setPositionsPage}
        pageSize={POSITIONS_TABLE_PAGE_LIMIT}
        totalCount={positionsData?.totalCount ?? 1}
        isLoading={isPositionsFetching}
      >
        <OrdersTable
          columns={positionsTableColumns as ColumnDef<UserRequest>[]}
          data={positionsTableCurrentTab === 'open' ? processedPositionsData : processedHistoryData}
        />
        {isPositionsFirstFetchLoading && <CenteredSpinner />}
        <NoResults
          tab={UserOrderType.Positions}
          arrayLength={positionsTableCurrentTab === 'open' ? processedPositionsData?.length ?? 0 : processedHistoryData?.length ?? 0}
          isOpenPositions={positionsTableCurrentTab === 'open'}
        />
      </PortfolioSection>

      {/* Orders Section */}
      <PortfolioSection
        title="Orders"
        tabs={ordersTableTabs}
        currentTab={ordersTableCurrentTab}
        onTabChange={ordersTableOnTabChanged}
        page={ordersPage}
        onPageChange={setOrdersPage}
        pageSize={ORDERS_TABLE_PAGE_LIMIT}
        totalCount={ordersData?.totalCount ?? 1}
        isLoading={isOrdersFetching}
      >
        <OrdersTable
          columns={ordersTableColumns as ColumnDef<UserRequest>[]}
          data={ordersData?.data ?? []}
          defaultExpanded={ordersTableCurrentTab === UserOrderType.LiveOrders}
        />
        {isOrdersFirstFetchLoading && <CenteredSpinner />}
        <NoResults tab={ordersTableCurrentTab} arrayLength={ordersData?.data?.length ?? 0} />
      </PortfolioSection>
    </Box>
  );
};

const CenteredSpinner = () => (
  <Center top="50%" left="50%" pos="absolute">
    <Spinner color="white" size="lg" />
  </Center>
);
