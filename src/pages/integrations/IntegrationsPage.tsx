import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { layoutConstants } from '@/configDesign';
import { Table } from '@/ds';

import { useIntegrations } from './useIntegrations';
import { useIntegrationsTable } from './useIntegrationsTable';

export const IntegrationsPage = () => {
  const { data } = useIntegrations();
  const table = useIntegrationsTable({ data });

  return (
    <VStack
      backgroundColor="base.black"
      minHeight={layoutConstants.mainContentHeight}
      data-testid="integrations-page"
      align="center"
      w="full"
      spacing={4}
      p={6}
    >
      <Flex w="full" justify="flex-start">
        <Text as="h1" color="base.white" fontSize="x-large">
          Grix Integrations
        </Text>
      </Flex>
      <Box w="100vw" borderWidth={1} borderColor="gray.900">
        <Table table={table} tableProps={{ size: 'md' }} />
      </Box>
    </VStack>
  );
};
