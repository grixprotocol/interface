import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, HStack, Icon, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import the Fa icon

export type OptionsContainerProps = {
  title: string;
  description?: { title: string; value: string; dataTestId?: string };
  onHeaderClick: VoidFunction;
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean; // Add isError prop
};

export const OptionsContainer = ({
  title,
  description,
  isLoading,
  children,
  onHeaderClick,
  isError, // Add isError prop
  ...rest
}: OptionsContainerProps) => (
  <Flex flexDir="column" width="100%" {...rest}>
    <Button variant="unstyled" w="full" onClick={onHeaderClick}>
      <VStack spacing={0.5} alignItems="flex-start" justifyContent="space-between" mb="3">
        <Box color="base.white" fontSize="sm" fontWeight="bold">
          {title}
        </Box>
        <HStack spacing={1}>
          <Box color="gray.500" fontSize="xs" fontWeight="500" visibility={description ? 'visible' : 'hidden'}>
            {description?.title ?? 'PLACEHOLDER'}
          </Box>
          <Box
            color="gray.25"
            fontSize="xs"
            visibility={description ? 'visible' : 'hidden'}
            data-testid={description?.dataTestId}
          >
            {description?.value ?? 'PLACEHOLDER'}
          </Box>
        </HStack>
      </VStack>
      <Icon as={ChevronDownIcon} color="gray.400" boxSize={6} pos="absolute" top={2} right={0} />
    </Button>
    <Divider borderColor="gray.500" />
    {isLoading ? (
      <Flex p={5} pb={2} justify="center" align="center" h="full">
        <Spinner size="lg" color="primary.200" style={{ marginLeft: 4 }} />
      </Flex>
    ) : isError ? ( // Check for isError prop
      <Flex p={5} pb={2} justify="center" align="center" h="full" color="red.400">
        <Icon as={FaExclamationTriangle} boxSize={6} mr={2} />
        <Box>Error</Box>
      </Flex>
    ) : (
      children
    )}
  </Flex>
);
