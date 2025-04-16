import { Badge, Box, Card, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { THEME_COLORS } from '../theme';

export const CreditPackageCard: React.FC<{
  credits: number;
  pricePerCredit: number;
  isSelected: boolean;
  onClick: () => void;
}> = ({ credits, pricePerCredit, onClick, isSelected }) => (
  <Card
    bg={isSelected ? THEME_COLORS.primary.bg : 'rgba(17, 25, 40, 0.8)'}
    _hover={{
      bg: isSelected ? THEME_COLORS.primary.bg : 'rgba(17, 25, 40, 0.9)',
      transform: 'translateY(-2px)',
      shadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    }}
    cursor="pointer"
    onClick={onClick}
    p={6}
    borderRadius="2xl"
    border="1px solid"
    borderColor={isSelected ? THEME_COLORS.primary.base : 'rgba(255, 255, 255, 0.1)'}
    transition="all 0.2s"
    position="relative"
    overflow="hidden"
  >
    {isSelected && (
      <Box position="absolute" top={0} left={0} right={0} h="3px" bgGradient={THEME_COLORS.primary.gradient} />
    )}
    <VStack spacing={4} align="stretch">
      <Text color={THEME_COLORS.primary.light} fontSize="3xl" fontWeight="bold" lineHeight="1">
        {credits.toLocaleString()}
      </Text>
      <Text color="gray.400" fontSize="sm">
        credits
      </Text>
      <Badge
        bg={THEME_COLORS.primary.bg}
        color={THEME_COLORS.primary.light}
        px={3}
        py={2}
        borderRadius="full"
        textAlign="center"
        fontSize="sm"
        fontWeight="medium"
      >
        ${pricePerCredit.toFixed(2)}/credit
      </Badge>
    </VStack>
  </Card>
);
