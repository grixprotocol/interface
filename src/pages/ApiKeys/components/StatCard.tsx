import { Box, Card, CardBody, Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { THEME_COLORS } from '../theme';

type StatCardProps = {
  label: string;
  value: number;
  icon: ReactElement;
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <Card
    bg="rgba(17, 25, 40, 0.8)"
    borderRadius="2xl"
    border="1px solid rgba(255, 255, 255, 0.1)"
    _hover={{
      transform: 'translateY(-2px)',
      shadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    }}
    transition="all 0.2s"
    position="relative"
    overflow="hidden"
  >
    <Box position="absolute" top={0} left={0} right={0} h="3px" bgGradient={THEME_COLORS.primary.gradient} />
    <CardBody>
      <Flex align="center" gap={4}>
        <Box color={THEME_COLORS.primary.light} p={3} borderRadius="xl" bg="whiteAlpha.100">
          {icon}
        </Box>
        <Stat>
          <StatLabel color="gray.400" fontSize="sm" mb={1}>
            {label}
          </StatLabel>
          <StatNumber color="white" fontSize="2xl" fontWeight="bold">
            {value.toLocaleString()}
          </StatNumber>
        </Stat>
      </Flex>
    </CardBody>
  </Card>
);
