import { Box, Button, HStack, Icon, Img, Tooltip } from '@chakra-ui/react';
import { FaCheckCircle, FaFilter, FaPlus, FaTimes } from 'react-icons/fa';

import { ProtocolObject, protocolsArrayData } from '@/config';

export const ProtocolFilters = ({
  filters,
  onFilterChanged,
}: {
  filters: string[];
  onFilterChanged: React.Dispatch<React.SetStateAction<string[]>>;
}) => (
  <HStack w="full" p={4} borderRadius="md" borderWidth={1} borderColor="gray.600" justify="space-between">
    <HStack spacing={4}>
      <Icon as={FaFilter} boxSize={5} color="teal.300" />
      <HStack spacing={3}>
        {protocolsArrayData.map((protocol) => (
          <ProtocolFilterItem
            key={protocol.protocolName}
            protocol={protocol}
            onClick={() =>
              onFilterChanged((filters) =>
                filters.includes(protocol.protocolName)
                  ? filters.filter((p) => p !== protocol.protocolName)
                  : [...filters, protocol.protocolName]
              )
            }
            isSelected={filters.includes(protocol.protocolName)}
          />
        ))}
      </HStack>
    </HStack>
    <Tooltip label={filters.length === 0 ? 'Select all' : 'Clear filters'}>
      <Button
        variant="ghost"
        size="sm"
        color="teal.300"
        onClick={() => onFilterChanged(filters.length === 0 ? protocolsArrayData.map((p) => p.protocolName) : [])}
        _hover={{ color: 'teal.400', bg: 'whiteAlpha.50' }}
        borderRadius="md"
        w="36px"
        h="36px"
        p={0}
      >
        <Icon as={filters.length === 0 ? FaPlus : FaTimes} boxSize={4} />
      </Button>
    </Tooltip>
  </HStack>
);

const ProtocolFilterItem = ({
  protocol,
  isSelected,
  onClick,
}: {
  protocol: ProtocolObject;
  isSelected: boolean;
  onClick: VoidFunction;
}) => (
  <Tooltip label={protocol.label} placement="top">
    <Box
      onClick={onClick}
      pos="relative"
      w="40px"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.1)', boxShadow: 'lg' }}
    >
      <Img
        src={protocol.icon}
        alt={protocol?.label}
        boxSize={10}
        borderRadius="full"
        border="2px solid"
        borderColor={isSelected ? 'teal.600' : 'gray.300'}
        p={1}
        transition="border-color 0.2s"
      />
      {isSelected ? (
        <Icon
          pos="absolute"
          bottom={0}
          right={-1}
          as={FaCheckCircle}
          color="teal.400"
          boxSize={4}
          transition="transform 0.2s"
          transform={isSelected ? 'scale(1.2)' : 'scale(1)'}
        />
      ) : null}
    </Box>
  </Tooltip>
);
