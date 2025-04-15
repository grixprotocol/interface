import { useState } from 'react';

import { UserOrderType } from '@/api';
import { useQueryParameter, useSetDefaultQueryParams } from '@/hooks/queryParams';

const ordersTableTabs = [
  {
    name: 'Pending',
    tab: UserOrderType.LiveOrders,
  },
  {
    name: 'History',
    tab: UserOrderType.OrdersHistory,
  },
];

const positionsTableTabs = [
  {
    name: 'Active',
    tab: 'open' as const,
  },
  {
    name: 'History',
    tab: 'history' as const,
  },
];

const ordersTableTypes = ordersTableTabs.map((tt) => tt.tab);

export const useTableTab = () => {
  const [positionsPage, setPositionsPage] = useState(0);
  const [ordersPage, setOrdersPage] = useState(0);
  const [positionsTableCurrentTab, setPositionsTableCurrentTab] = useState<'open' | 'history'>('open');

  useSetDefaultQueryParams('ordersTableType', ordersTableTypes);
  const [ordersTableCurrentTab, setOrdersTableCurrentTab] = useQueryParameter<UserOrderType>('ordersTableType');

  const ordersTableOnTabChanged = (tab: UserOrderType) => {
    setOrdersPage(0);
    setOrdersTableCurrentTab(tab);
  };

  const positionsTableOnTabChanged = (tab: 'open' | 'history') => {
    setPositionsPage(0);
    setPositionsTableCurrentTab(tab);
  };

  return {
    ordersTableTabs,
    positionsTableTabs,
    ordersTableCurrentTab,
    positionsTableCurrentTab,
    ordersTableOnTabChanged,
    positionsTableOnTabChanged,
    positionsPage,
    setPositionsPage,
    ordersPage,
    setOrdersPage,
  };
};
