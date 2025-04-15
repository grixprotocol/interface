import { Flex, FlexProps } from '@chakra-ui/react';

export const Card = (props: FlexProps) => (
  <Flex flexDir="column" border="1px" borderRadius="6px" width="100%" p="4" gap="4" {...props} borderColor="gray.700" />
);
