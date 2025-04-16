import { Box, Button, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaChartLine, FaExchangeAlt, FaPlug, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useGrixMetrics } from '@/api/grixMetrics/useGrixMetrics';
import { layoutConstants } from '@/configDesign';
import { useIsBigScreen } from '@/hooks/useIsBigScreen';

import { colors } from '../../ds/theme/colors.theme';
import { renderAnimatedStat, renderEnhancedTransactionBreakdown } from './statsComponents';
import { GrixMetricsData } from './types';

export const StatsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useGrixMetrics();
  const isBigScreen = useIsBigScreen();

  const grixMetricsData = data as GrixMetricsData;

  const stats = grixMetricsData
    ? {
        totalUniqueWeb3Accounts: grixMetricsData.graphStatistics.uniqueUserCount,
        numberOfIntegratedProtocols: grixMetricsData.integratedProtocolsList.length,
        numberOfAvailableMarkets: grixMetricsData.availableMarket.length,
        totalOpenInterest: grixMetricsData.totalOpenInterest,
        btcusd: grixMetricsData.graphTokens[0]?.totalPurchases ?? 0,
        ethusd: grixMetricsData.graphTokens[1]?.totalPurchases ?? 0,
        totalFeePaidByWbtc: grixMetricsData.graphTokens[0]?.totalFeePaidByToken ?? 0,
        totalFeePaidByWeth: grixMetricsData.graphTokens[1]?.totalFeePaidByToken ?? 0,
        totalFeePaidByEth: grixMetricsData.graphStatistics.totalEthFees ?? 0,
        notionalValue: Number(grixMetricsData.graphStatistics.totalNotionalValue),
        uniqueUserCount: grixMetricsData.graphStatistics.uniqueUserCount,
        transactionBreakdown: {
          totalTransactions: grixMetricsData.graphStatistics.totalTransactions,
          refunds: grixMetricsData.graphStatistics.numberOfRefundFromProtocolTransactions,
          limitOrders: grixMetricsData.graphStatistics.numberOfOrderLimitTransactions,
          exercises: grixMetricsData.graphStatistics.numberOfExerciseTransactions,
          buyOptions: grixMetricsData.graphStatistics.numberOfBuyOptionTransactions,
        },
        agentsMetrics: grixMetricsData.agentsMetrics,
      }
    : null;

  if (!isBigScreen) {
    return (
      <VStack
        backgroundColor={colors.base.black}
        minHeight={layoutConstants.mainContentHeight}
        maxHeight={layoutConstants.mainContentHeight}
        pt={4}
        align="flex-start"
        w="full"
        spacing={4}
        overflow="auto"
      >
        <Heading color={colors.base.white} fontSize="2xl" mb={4}>
          Grix protocol stats
        </Heading>
        <SimpleGrid columns={1} spacing={4} w="full">
          {renderAnimatedStat(
            'Notional Volume',
            `$${stats?.notionalValue.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            })}`,
            !data,
            FaChartLine,
            'linear(to-r, #7928CA, #FF0080)'
          )}
          {renderAnimatedStat('Unique users', stats?.uniqueUserCount ?? 'Loading...', !data, FaUsers, 'linear(to-r, #FF4D4D, #F9CB28)')}
          {renderEnhancedTransactionBreakdown(stats?.transactionBreakdown, !data)}
        </SimpleGrid>
        <Box display="flex" justifyContent="center" alignItems="center" w="full">
          <Button variant="primaryGradient" colorScheme="primary" w="50%" onClick={() => navigate('/trade')}>
            Trade
          </Button>
        </Box>
        <Box height="8vh" />
        <Heading color={colors.base.white} fontSize="2xl" mb={4}>
          Data Integrations
        </Heading>
        <SimpleGrid columns={1} spacing={4} w="full">
          {renderAnimatedStat(
            'Options protocols integrated',
            stats?.numberOfIntegratedProtocols ?? 'Loading...',
            !data,
            FaPlug,
            'linear(to-r, #00EC97, #00B8D9)'
          )}
          {renderAnimatedStat(
            'Options markets integrated',
            stats?.numberOfAvailableMarkets ?? 'Loading...',
            !data,
            FaExchangeAlt,
            'linear(to-r, #36B37E, #00875A)'
          )}
        </SimpleGrid>
        <Box display="flex" justifyContent="center" alignItems="center" w="full">
          <Button variant="primaryGradient" colorScheme="primary" w="50%" onClick={() => navigate('/integrations')}>
            View All Integrations
          </Button>
        </Box>
      </VStack>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <VStack
        backgroundColor={colors.base.black}
        minHeight={layoutConstants.mainContentHeight}
        maxHeight={layoutConstants.mainContentHeight}
        pt={6}
        spacing={8}
        align="center"
        w="full"
        overflow="auto"
      >
        <Heading color={colors.base.white} fontSize="4xl" bgGradient="linear(to-r, #FF0080, #7928CA)" bgClip="text">
          Grix Protocol Dashboard
        </Heading>

        {/* Main Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="90%">
          {renderAnimatedStat(
            'Notional Volume',
            `$${stats?.notionalValue.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            })}`,
            !data,
            FaChartLine,
            'linear(to-r, #7928CA, #FF0080)'
          )}
          {renderAnimatedStat('Active Traders', stats?.uniqueUserCount ?? 'Loading...', !data, FaUsers, 'linear(to-r, #FF4D4D, #F9CB28)')}
          {renderAnimatedStat(
            'Protocols',
            stats?.numberOfIntegratedProtocols ?? 'Loading...',
            !data,
            FaPlug,
            'linear(to-r, #00EC97, #00B8D9)'
          )}
          {renderAnimatedStat(
            'Markets',
            stats?.numberOfAvailableMarkets ?? 'Loading...',
            !data,
            FaExchangeAlt,
            'linear(to-r, #36B37E, #00875A)'
          )}
        </SimpleGrid>

        {/* Transaction Activity Card */}
        <Box w="90%" bg="rgba(255,255,255,0.05)" borderRadius="xl" p={6} backdropFilter="blur(10px)">
          <Text fontSize="2xl" fontWeight="bold" color={colors.base.white} mb={4}>
            Transaction Activity
          </Text>
          {renderEnhancedTransactionBreakdown(stats?.transactionBreakdown, !data)}
        </Box>

        {/* Agents Status Card */}
        <Box w="90%" bg="rgba(255,255,255,0.05)" borderRadius="xl" p={6} backdropFilter="blur(10px)">
          <Text fontSize="2xl" fontWeight="bold" color={colors.base.white} mb={4}>
            Active Agents
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {renderAnimatedStat(
              'Active Trade Agents',
              stats?.agentsMetrics.activeTradeAgents ?? 'Loading...',
              !data,
              FaUsers,
              'linear(to-r, #00EC97, #00B8D9)'
            )}
            {renderAnimatedStat(
              'Active Social Agent',
              stats?.agentsMetrics.socialAgentTasksCount ?? 'Loading...',
              !data,
              FaUsers,
              'linear(to-r, #7928CA, #FF0080)'
            )}
            {renderAnimatedStat(
              'Completed Trade Signals',
              stats?.agentsMetrics.numberOfCompletedTradeAgentSignals ?? 'Loading...',
              !data,
              FaChartLine,
              'linear(to-r, #36B37E, #00875A)'
            )}
            {renderAnimatedStat(
              'Completed Social Tasks',
              stats?.agentsMetrics.numberOfCompletedSocialAgentTaskActions ?? 'Loading...',
              !data,
              FaUsers,
              'linear(to-r, #FF4D4D, #F9CB28)'
            )}
          </SimpleGrid>
        </Box>
      </VStack>
    </motion.div>
  );
};
