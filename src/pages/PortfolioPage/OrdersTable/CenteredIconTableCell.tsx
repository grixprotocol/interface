import { Box, HStack, Text, TextProps, VStack } from '@chakra-ui/react';
import React from 'react';

type CenteredIconTableCellProps = {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  titleProps?: TextProps;
  rightIcon?: React.ReactNode;
};

export const CenteredIconTableCell = ({ icon, title, titleProps, rightIcon }: CenteredIconTableCellProps) => (
  <HStack gap={4}>
    {icon && (
      <Box borderRadius="50%" bgColor="gray.800" p="10px" border="1px solid" borderColor="gray.700">
        {icon}
      </Box>
    )}
    <VStack gap={0}>
      {typeof title === 'string' ? (
        <Text w="full" color="gray.300" {...titleProps}>
          {title}
        </Text>
      ) : (
        title
      )}
    </VStack>
    {rightIcon}
  </HStack>
);
