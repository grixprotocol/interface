import { Box, Icon, SimpleGrid, Spinner, Stat, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

import { colors } from '../../ds/theme/colors.theme';
import { TransactionBreakdown } from './types';

export const renderAnimatedStat = (
  label: string,
  value: string | number,
  isLoading: boolean,
  IconComponent: IconType,
  gradient: string
) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
    <Box bg="rgba(255,255,255,0.05)" borderRadius="xl" p={6} backdropFilter="blur(10px)" position="relative" overflow="hidden">
      {isLoading ? (
        <Spinner color={colors.primary[500]} size="xl" />
      ) : (
        <VStack spacing={3}>
          <Icon as={IconComponent} color={colors.primary[500]} boxSize={8} />
          <Stat>
            <StatNumber bgGradient={gradient} bgClip="text" fontSize="3xl" fontWeight="bold">
              {value}
            </StatNumber>
            <StatLabel color={colors.gray[400]} fontSize="md">
              {label}
            </StatLabel>
          </Stat>
        </VStack>
      )}
    </Box>
  </motion.div>
);

export const renderEnhancedTransactionBreakdown = (stats: TransactionBreakdown, isLoading: boolean) => {
  if (!stats) return null;

  if (isLoading) {
    return <Spinner color={colors.primary[500]} size="xl" />;
  }

  return (
    <VStack spacing={6} w="full">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
        {[
          { label: 'Buy Options', value: stats.buyOptions },
          { label: 'Exercises', value: stats.exercises },
          { label: 'Limit Orders', value: stats.limitOrders },
          { label: 'Refunds', value: stats.refunds },
        ].map((item, index) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Box bg="rgba(255,255,255,0.03)" p={4} borderRadius="lg" textAlign="center">
              <Text color={colors.primary[500]} fontSize="2xl" fontWeight="bold">
                {item.value}
              </Text>
              <Text color={colors.gray[400]} fontSize="sm">
                {item.label}
              </Text>
            </Box>
          </motion.div>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
