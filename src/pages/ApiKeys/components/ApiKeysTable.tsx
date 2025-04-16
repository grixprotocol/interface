import { CheckIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { ApiKey, PaymentStatus } from '@/api/apiKeys/useApiKeys';

const TABLE_COLORS = {
  primary: {
    light: '#63B3ED',
    bg: 'rgba(49, 130, 206, 0.15)',
    base: '#3182CE',
  },
  success: {
    bg: 'rgba(56, 178, 172, 0.15)',
    light: '#4FD1C5',
  },
  error: {
    bg: 'rgba(245, 101, 101, 0.15)',
    light: '#FC8181',
  },
  hover: {
    bg: 'rgba(45, 55, 72, 0.5)',
  },
};

type ApiKeysTableProps = {
  apiKeys: ApiKey[] | undefined;
  isLoading: boolean;
  selectedKeyId: string | null;
  onRecharge: (keyId: string) => void;
  isRecharging: boolean;
};

const CopyableApiKey = ({ value }: { value: string }) => {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Flex align="center" bg="whiteAlpha.100" p={2} borderRadius="lg" maxW="fit-content" border="1px solid" borderColor="whiteAlpha.200">
      <Text fontFamily="mono" fontSize="sm" fontWeight="medium" letterSpacing="wide" color="base.white">
        {value}
      </Text>
      <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'} placement="top" hasArrow>
        <IconButton
          aria-label="Copy API key"
          icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          size="sm"
          ml={2}
          onClick={onCopy}
          variant="ghost"
          color={hasCopied ? 'green.400' : 'gray.400'}
          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
        />
      </Tooltip>
    </Flex>
  );
};

export const ApiKeysTable: React.FC<ApiKeysTableProps> = ({ apiKeys, isLoading, selectedKeyId, onRecharge, isRecharging }) => (
  <Table variant="simple" size="sm">
    <Thead bg="rgba(17, 25, 40, 0.9)">
      <Tr>
        <Th color={TABLE_COLORS.primary.light} borderColor="rgba(255, 255, 255, 0.1)" fontSize="xs" textTransform="uppercase" py={4}>
          Key ID
        </Th>
        <Th color={TABLE_COLORS.primary.light} borderColor="rgba(255, 255, 255, 0.1)" fontSize="xs" textTransform="uppercase" py={4}>
          Credits
        </Th>
        <Th color={TABLE_COLORS.primary.light} borderColor="rgba(255, 255, 255, 0.1)" fontSize="xs" textTransform="uppercase" py={4}>
          Status
        </Th>
        <Th color={TABLE_COLORS.primary.light} borderColor="rgba(255, 255, 255, 0.1)" fontSize="xs" textTransform="uppercase" py={4}>
          API Key
        </Th>
        <Th color={TABLE_COLORS.primary.light} borderColor="rgba(255, 255, 255, 0.1)" fontSize="xs" textTransform="uppercase" py={4}>
          Created At
        </Th>
        <Th color={TABLE_COLORS.primary.light} borderColor="rgba(255, 255, 255, 0.1)" fontSize="xs" textTransform="uppercase" py={4}>
          Actions
        </Th>
      </Tr>
    </Thead>
    <Tbody>
      {isLoading ? (
        <Tr>
          <Td colSpan={6} textAlign="center" py={12}>
            <VStack spacing={4}>
              <Spinner color="cyan.400" size="lg" />
              <Text color="gray.300">Loading API keys...</Text>
            </VStack>
          </Td>
        </Tr>
      ) : apiKeys?.length === 0 ? (
        <Tr>
          <Td colSpan={6} textAlign="center" py={12}>
            <VStack spacing={4}>
              <Text color="gray.300" fontSize="lg">
                No API keys found
              </Text>
              <Text color="gray.400">Purchase credits to get started</Text>
            </VStack>
          </Td>
        </Tr>
      ) : (
        apiKeys?.map((key) => (
          <Tr
            key={key.keyId}
            _hover={{ bg: TABLE_COLORS.hover.bg }}
            bg={selectedKeyId === key.keyId ? 'rgba(49, 130, 206, 0.2)' : undefined}
            transition="all 0.2s"
          >
            <Td color={TABLE_COLORS.primary.light} fontFamily="mono" fontSize="sm">
              {key.keyId}
            </Td>
            <Td>
              {key.status === PaymentStatus.PENDING ? (
                <Flex align="center" gap={2}>
                  <Spinner size="sm" color="cyan.400" />
                  <Text color="gray.300">Processing</Text>
                </Flex>
              ) : key.status === PaymentStatus.FAILED ? (
                <Text color="red.400">Failed</Text>
              ) : (
                <Text color="gray.300">{key.credits.toLocaleString()}</Text>
              )}
            </Td>
            <Td>
              <Badge
                bg={key.isActive ? TABLE_COLORS.success.bg : TABLE_COLORS.error.bg}
                color={key.isActive ? TABLE_COLORS.success.light : TABLE_COLORS.error.light}
                px={3}
                py={1}
                borderRadius="full"
              >
                {key.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Td>
            <Td>
              <CopyableApiKey value={key.keyValue} />
            </Td>
            <Td color={TABLE_COLORS.primary.light} fontSize="sm">
              {new Date(key.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Td>
            <Td>
              <Flex gap={2}>
                <Button
                  as="a"
                  href={`https://arbiscan.io/tx/${key.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="ghost"
                  color="cyan.400"
                  bg="rgba(49, 130, 206, 0.15)"
                  _hover={{ bg: 'rgba(49, 130, 206, 0.25)' }}
                  leftIcon={<ExternalLinkIcon />}
                >
                  View Transaction
                </Button>
                <Button
                  size="sm"
                  bg={selectedKeyId === key.keyId ? 'rgba(49, 130, 206, 0.2)' : 'transparent'}
                  color="cyan.400"
                  borderColor="cyan.400"
                  _hover={{ bg: 'rgba(49, 130, 206, 0.25)' }}
                  onClick={() => onRecharge(key.keyId)}
                  isDisabled={!key.isActive}
                  isLoading={isRecharging && selectedKeyId === key.keyId}
                >
                  {selectedKeyId === key.keyId ? (isRecharging ? 'Recharging...' : 'Selected') : 'Recharge'}
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))
      )}
    </Tbody>
  </Table>
);
