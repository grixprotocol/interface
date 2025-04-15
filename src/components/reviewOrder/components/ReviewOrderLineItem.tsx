import { Flex, HStack, Text } from '@chakra-ui/react';

export const ReviewOrderLineItem = ({
  label,
  column,
  rightColumn,
}: {
  label: React.ReactNode;
  column: React.ReactNode;
  rightColumn?: React.ReactNode;
}) => (
  <HStack w="full">
    <Flex flex={1} justify="left">
      <Text fontWeight="600">{label}</Text>
    </Flex>
    <Flex flex={1} justify="center">
      {column}
    </Flex>
    <Flex flex={1} justify="center">
      {rightColumn}
    </Flex>
  </HStack>
);
