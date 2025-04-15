import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';

import { Section } from '../types/sections';
import { NavigationLink } from './config';
type NavigationItemProps = {
  item: NavigationLink;
  isExpanded: boolean;
  activeSection: Section | undefined;
  onClick: () => void;
  isMobile?: boolean;
};

export const NavigationItem = ({ item, isExpanded, activeSection, onClick, isMobile = false }: NavigationItemProps) => {
  const isActive = activeSection === item.id;

  if (isMobile) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        opacity={item.comingSoon ? 0.6 : 1}
        cursor={item.comingSoon ? 'not-allowed' : 'pointer'}
        onClick={onClick}
        minW={{ base: '64px', sm: '80px' }}
        h="full"
        color={isActive ? 'white' : 'whiteAlpha.600'}
      >
        <Box as={item.icon} fontSize={{ base: '18px', sm: '20px' }} mb={1} />
        <Text
          fontSize={{ base: '11px', sm: '12px' }}
          fontWeight={isActive ? 'medium' : 'normal'}
          textAlign="center"
          px={1}
          whiteSpace="nowrap"
        >
          {item.label}
        </Text>
        {isActive && <Box position="absolute" top={0} left={0} right={0} h="2px" bg="blue.400" />}
      </Flex>
    );
  }

  return (
    <Tooltip
      label="Coming Soon"
      isDisabled={!item.comingSoon}
      placement="bottom"
      hasArrow
      bg="whiteAlpha.200"
      color="gray.300"
    >
      <Box
        position="relative"
        opacity={item.comingSoon ? 0.6 : 1}
        cursor={item.comingSoon ? 'not-allowed' : 'pointer'}
        onClick={onClick}
        minW="100px"
        maxW="140px"
        h="28px"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          textAlign="center"
          color={isActive ? 'white' : 'whiteAlpha.800'}
          fontSize="xs"
          fontWeight="medium"
          opacity={isExpanded ? 1 : 0}
          transition="opacity 0.2s"
          mb={1}
          noOfLines={1}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          px={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1.5}
        >
          <Box as={item.icon} fontSize="11px" flexShrink={0} />
          {item.label}
        </Box>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="2px"
          bg={isActive ? 'blue.400' : 'whiteAlpha.400'}
          transition="all 0.2s"
          _hover={{
            bg: !isMobile && !item.comingSoon ? 'blue.200' : undefined,
          }}
        />
      </Box>
    </Tooltip>
  );
};
