import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, Heading, HStack, Icon, Link, Stack, Text, VStack } from '@chakra-ui/react';
import { FaGift, FaGithub, FaLightbulb } from 'react-icons/fa';

export const FeatureRequestsSection = () => {
  const featureRequestFormUrl = `https://docs.google.com/forms/d/16ZGZhylfYETJAZMSFBIBxOaz-iD7rkwnngtW5bhXKW0/edit`;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="lg" color="white" mb={2}>
          Help Shape Grix&apos;s Future
        </Heading>
        <Text color="gray.400">
          Your ideas drive our innovation. Share your suggestions and help us build the trading platform you want to use.
        </Text>
      </Box>

      <Card bg="whiteAlpha.50" borderWidth={1} borderColor="whiteAlpha.200">
        <CardBody>
          <Stack spacing={6}>
            {/* Rewards Section */}
            <HStack bg="blue.900" p={4} borderRadius="lg" borderWidth={1} borderColor="blue.500" spacing={4}>
              <Icon as={FaGift} boxSize={6} color="blue.400" />
              <Box>
                <Text color="white" fontWeight="bold" mb={1}>
                  Get Rewarded for Great Ideas
                </Text>
                <Text color="gray.300">
                  Each week, we select the top 3 most impactful feature suggestions to receive $GRIX token rewards.
                </Text>
              </Box>
            </HStack>

            {/* How it Works */}
            <Box>
              <Heading size="md" color="white" mb={4}>
                Simple Two-Step Process
              </Heading>
              <Stack spacing={4}>
                <HStack align="start" spacing={4}>
                  <Icon as={FaLightbulb} color="yellow.400" mt={1} />
                  <Box>
                    <Text color="white" fontWeight="bold">
                      1. Share Your Vision
                    </Text>
                    <Text color="gray.400">Tell us what you&apos;d like to see in Calypso. Big or small, every idea counts.</Text>
                  </Box>
                </HStack>
                <HStack align="start" spacing={4}>
                  <Icon as={FaGithub} color="purple.400" mt={1} />
                  <Box>
                    <Text color="white" fontWeight="bold">
                      2. Join the Discussion
                    </Text>
                    <Text color="gray.400">Connect with our community and team to refine your ideas and see them come to life.</Text>
                  </Box>
                </HStack>
              </Stack>
            </Box>

            {/* CTA Button */}
            <Box>
              <Link href={featureRequestFormUrl} isExternal>
                <Button size="lg" colorScheme="blue" rightIcon={<ExternalLinkIcon />} width={{ base: 'full', md: 'auto' }}>
                  Submit Your Idea
                </Button>
              </Link>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </VStack>
  );
};
