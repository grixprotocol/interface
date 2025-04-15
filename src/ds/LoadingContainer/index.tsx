import { Box, Spinner } from '@chakra-ui/react';

export const LoadingContainer = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
    <Spinner size="xl" />
  </Box>
);
