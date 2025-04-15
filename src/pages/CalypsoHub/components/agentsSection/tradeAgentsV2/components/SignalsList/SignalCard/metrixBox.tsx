import { Box, Text } from '@chakra-ui/react';

// Helper component for metrics
export const MetricBox = ({ label, value, valueColor }: { label: string; value: string; valueColor: string }) => (
  <Box>
    <Text fontSize="xs" color="whiteAlpha.600">
      {label}
    </Text>
    <Text fontSize="sm" color={valueColor} fontWeight="semibold">
      {value}
    </Text>
  </Box>
);
