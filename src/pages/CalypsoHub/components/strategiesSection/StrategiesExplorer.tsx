import { Box, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { renderDefaultView } from './defaultView';
import { StrategyGuidance } from './selectedStrategyCard';
import { StrategiesSidebarList } from './strategiesSidebarList';

export const StrategiesExplorer = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  return (
    <Box>
      <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={6}>
        {/* Strategies List Column with Fixed Height */}
        <Box h="calc(100vh - 200px)" display="flex" flexDirection="column">
          {/* Fixed Header */}
          <Text fontSize="xl" fontWeight="bold" color="white" p={4} bg="whiteAlpha.50" borderRadius="xl" mb={4}>
            Strategies List
          </Text>

          {/* Scrollable List */}
          <StrategiesSidebarList selectedStrategy={selectedStrategy} setSelectedStrategy={setSelectedStrategy} />
        </Box>

        {/* Strategy guidance/Default View Column */}
        <Box>
          {selectedStrategy ? (
            <StrategyGuidance selectedStrategy={selectedStrategy} setSelectedStrategy={setSelectedStrategy} />
          ) : (
            renderDefaultView()
          )}
        </Box>
      </Grid>
    </Box>
  );
};
