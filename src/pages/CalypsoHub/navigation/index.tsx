import { Box, HStack, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { getVisibleNavigationConfig } from './config';

export const Navigation = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.300"
      mb={4}
      width="100%"
      overflowX="auto"
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
      }}
    >
      <Tabs variant="unstyled">
        <TabList display="flex" minWidth="min-content" px={{ base: 2, md: 0 }}>
          <HStack spacing={{ base: 2, md: 4 }} justify={{ base: 'flex-start', md: 'center' }} width="100%">
            {getVisibleNavigationConfig().map((item) => (
              <Tab
                key={item.id}
                _selected={{ color: 'primary.500' }}
                color="gray.300"
                _hover={{
                  color: 'primary.900',
                  borderBottom: '2px solid',
                  borderColor: 'primary.900',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  if (!item.comingSoon) {
                    startTransition(() => {
                      navigate(item.path, { replace: true });
                    });
                  }
                }}
                opacity={item.comingSoon || isPending ? 0.5 : 1}
                cursor={item.comingSoon ? 'not-allowed' : 'pointer'}
                whiteSpace="nowrap"
                fontSize={{ base: 'sm', md: 'md' }}
                px={{ base: 2, md: 3 }}
                py={{ base: 2, md: 3 }}
              >
                <Text>{item.label}</Text>
              </Tab>
            ))}
          </HStack>
        </TabList>
      </Tabs>
    </Box>
  );
};
