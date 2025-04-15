import { Box, Flex, HStack, Spinner } from '@chakra-ui/react';
import React from 'react';

export type InputContainerProps = {
  label: string;
  rightLabel?: { title: string; value: string };
  children: React.ReactNode;
  isLoading?: boolean;
};

export const InputContainer = ({ label, rightLabel, isLoading, children, ...rest }: InputContainerProps) => (
  <Flex flexDir="column" width="100%" {...rest}>
    <HStack spacing="1" justifyContent="space-between" mb="3">
      <Box color="base.white" fontSize="sm" fontWeight="bold">
        {label}
      </Box>
      {rightLabel ? (
        <HStack spacing="1">
          <Box color="gray.500" fontSize="xs" fontWeight="500">
            {rightLabel.title}
          </Box>
          <Box color="gray.25" fontSize="xs">
            {rightLabel.value}
          </Box>
        </HStack>
      ) : null}
    </HStack>
    {isLoading ? <Spinner size="lg" color="primary.200" style={{ marginLeft: 4 }} /> : children}
  </Flex>
);
