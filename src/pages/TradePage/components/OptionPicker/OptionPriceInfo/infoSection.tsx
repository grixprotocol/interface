import { Badge, BadgeProps, HStack, Text, VStack } from '@chakra-ui/react';

type InfoSectionProps = {
  title: string;
  value?: string;
  badgeValue?: string;
  badgeColorScheme?: BadgeProps['colorScheme'];
  flex?: number;
};

export const InfoSection = ({ title, value, badgeValue, badgeColorScheme = 'primary', flex = 1 }: InfoSectionProps) => (
  <VStack gap={0.5} align="center" flex={flex}>
    <Text color="gray.400" fontSize="sm" textAlign="center">
      {title}
    </Text>
    <HStack spacing={1} align="center" justify="center" wrap="nowrap">
      <Text color="base.white" fontSize="sm" textAlign="center" isTruncated>
        {value}
      </Text>
      {badgeValue && (
        <Badge variant="solid" colorScheme={badgeColorScheme} fontSize="sm" size="sm" paddingX={2} paddingY={0}>
          {badgeValue}
        </Badge>
      )}
    </HStack>
  </VStack>
);
