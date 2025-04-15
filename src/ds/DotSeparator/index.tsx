import { Box, BoxProps } from '@chakra-ui/react';

export const DotSeparator = (props: BoxProps) => (
  <Box w="4px" h="4px" bgColor="gray.800" borderRadius="50%" display="inline-block" {...props}></Box>
);
