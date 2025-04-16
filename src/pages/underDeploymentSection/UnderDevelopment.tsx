import { Box, Container, Heading, HStack, Icon, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaCog, FaExternalLinkAlt, FaTools } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

import { useAnalytics } from '@/services/analytics';

import { underDevelopmentConfigs } from './underDevelopmentConfig';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`;

export const UnderDevelopment = () => {
  const { track } = useAnalytics();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('page') || 'default';
  const config = underDevelopmentConfigs[pageId] || underDevelopmentConfigs.default;

  if (pageId !== 'default') {
    track('under_development_page_view', {
      page: pageId,
    });
  }

  const bgGradient = useColorModeValue('linear(to-r, blue.500, primary.500)', 'linear(to-r, blue.600, primary.600)');

  return (
    <Container maxW="container.xl" py={20}>
      <Box borderRadius="xl" p="1px" bgGradient={bgGradient} position="relative" overflow="hidden">
        <Box borderRadius="xl" bg="base.black" p={8} position="relative" zIndex={1}>
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bgGradient="linear(to-r, #2E90FA20, #15B79E20)" zIndex={-1} />

          <Box textAlign="center" mb={8}>
            <Box display="inline-block" position="relative">
              <Icon
                as={FaTools}
                boxSize={12}
                color="primary.500"
                css={{
                  animation: `${rotateAnimation} 4s linear infinite`,
                }}
              />
              <Icon
                as={FaCog}
                boxSize={6}
                color="blue.500"
                position="absolute"
                top="-10px"
                right="-10px"
                css={{
                  animation: `${rotateAnimation} 2s linear infinite reverse`,
                }}
              />
            </Box>

            <Heading as="h1" size="2xl" mb={4} bgGradient="linear(to-r, blue.400, primary.400)" bgClip="text">
              {config.title}
            </Heading>

            <Text
              fontSize="xl"
              color="gray.400"
              maxW="2xl"
              mx="auto"
              css={{
                animation: `${pulseAnimation} 3s ease-in-out infinite`,
              }}
            >
              {config.description}
            </Text>
          </Box>

          {config.features.length > 0 && (
            <Box maxW="2xl" mx="auto" mt={12} p={6} borderRadius="lg" border="1px solid" borderColor="whiteAlpha.200" bg="blackAlpha.300">
              <Text fontSize="lg" fontWeight="bold" mb={4} color="primary.400">
                Upcoming Features:
              </Text>
              <Box as="ul" display="grid" gap={4} gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
                {config.features.map((feature, index) => (
                  <Box as="li" key={index} display="flex" alignItems="center" gap={2} color="gray.300">
                    <Box as="span" w="2px" h="2px" borderRadius="full" bg="primary.500" mr={2} />
                    {feature}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {config.currentlyAvailable && config.currentlyAvailable.length > 0 && (
            <Box w="100%" display="flex" justifyContent="center" alignItems="center">
              <Stack
                mt={4}
                direction="column"
                justifyContent="center"
                alignItems="center"
                border="1px solid"
                borderRadius="lg"
                p={4}
                w="75%"
              >
                <Text fontSize="lg" fontWeight="bold" bgGradient="linear(to-r, blue.400, primary.400)" bgClip="text">
                  Currently Available Via:
                </Text>
                {config.currentlyAvailable.map((tool) => (
                  <HStack
                    key={tool.tool}
                    as={Link}
                    href={tool.url}
                    isExternal
                    p={4}
                    borderRadius="md"
                    bg="whiteAlpha.100"
                    transition="all 0.2s"
                    _hover={{
                      bg: 'whiteAlpha.200',
                      transform: 'translateY(-2px)',
                      textDecoration: 'none',
                    }}
                    spacing={4}
                    justify="space-between"
                    width="100%"
                    cursor="pointer"
                    borderColor="primary.400"
                    border="1px solid"
                    gap={4}
                    m={4}
                  >
                    <Text color="gray.100" fontWeight="semibold">
                      {tool.tool}
                    </Text>
                    <Icon as={FaExternalLinkAlt} color="primary.400" boxSize={4} />
                  </HStack>
                ))}
              </Stack>
            </Box>
          )}
          <Text
            mt={8}
            textAlign="center"
            fontSize="lg"
            fontWeight="bold"
            color="blue.400"
            css={{
              animation: `${pulseAnimation} 2s ease-in-out infinite`,
            }}
          >
            {config.estimatedCompletion}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};
