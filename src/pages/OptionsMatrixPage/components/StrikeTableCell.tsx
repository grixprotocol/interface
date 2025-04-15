import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type StrikeTableCellProps = {
  icon?: IconType;
  text: string;
  withBackground?: boolean;
};

export const StrikeTableCell = ({ icon, text, withBackground }: StrikeTableCellProps) => (
  <HStack
    gap={2}
    px={4}
    py={withBackground ? 1 : 2}
    bgColor={withBackground ? '#1a1a1a' : undefined}
    borderRadius={4}
    justify={withBackground ? 'center' : undefined}
  >
    {icon && (
      <Box bgColor="base.white" borderRadius="50%">
        <Icon as={icon} boxSize={6} color="blue.700" />
      </Box>
    )}
    <Text fontSize={16} color="base.white" fontWeight="bold">
      {text}
    </Text>
  </HStack>
);
