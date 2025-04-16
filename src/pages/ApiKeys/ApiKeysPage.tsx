import { Box, Container, Flex, Heading, Icon, Link, SimpleGrid, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { FiBook, FiCreditCard, FiDatabase, FiKey } from 'react-icons/fi';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

import { PaymentStatus, useApiKeys, useCreateApiKey, useGetCreditPrices, useRechargeApiKey } from '@/api/apiKeys/useApiKeys';
import { useGrixToast } from '@/components/useToast/useToast';
import { layoutConstants } from '@/configDesign';

import { ApiKeysTable } from './components/ApiKeysTable';
import { CreditsSelection } from './components/CreditsSelection';
import { StatCard } from './components/StatCard';

export const ApiKeysPage: React.FC = () => {
  const grixToast = useGrixToast();
  const { mutate: createKey, isPending: isCreating } = useCreateApiKey();
  const { mutate: rechargeKey, isPending: isRecharging } = useRechargeApiKey();
  const { data: apiKeys, isLoading, refetch } = useApiKeys();
  const { data: creditPrices = [] } = useGetCreditPrices();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const [selectedCredits, setSelectedCredits] = useState<number>(0);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [isRechargingMode, setIsRechargingMode] = useState(false);

  const totalCredits = apiKeys?.reduce((sum, key) => (key.status === PaymentStatus.COMPLETED ? sum + key.credits : sum), 0) || 0;

  const activeKeys = apiKeys?.filter((key) => key.isActive && key.status === PaymentStatus.COMPLETED).length || 0;

  const handleCreateKey = useCallback(() => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }

    createKey(
      { creditAmount: selectedCredits },
      {
        onSuccess: (txHash) => {
          void refetch();
          grixToast({
            title: 'Payment Successful',
            description: `Transaction completed: ${txHash}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        onError: (error) => {
          grixToast({
            title: 'Error',
            description: error instanceof Error ? error.message : 'Failed to process payment',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  }, [connect, createKey, isConnected, selectedCredits, refetch, grixToast]);

  const handleCreateOrRecharge = useCallback(() => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }

    if (isRechargingMode && selectedKeyId) {
      rechargeKey(
        { creditAmount: selectedCredits, keyId: selectedKeyId },
        {
          onSuccess: (txHash) => {
            void refetch();
            setSelectedKeyId(null);
            setIsRechargingMode(false);
            grixToast({
              title: 'Recharge Successful',
              description: `Transaction completed: ${txHash}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          },
          onError: (error) => {
            grixToast({
              title: 'Error',
              description: error instanceof Error ? error.message : 'Failed to process recharge',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    } else {
      handleCreateKey();
    }
  }, [connect, grixToast, handleCreateKey, isConnected, isRechargingMode, rechargeKey, refetch, selectedCredits, selectedKeyId]);

  const getButtonText = () => {
    if (!isConnected) return 'Connect Wallet';
    if (selectedCredits === 0) return 'Select credits package';
    const price = creditPrices.find((p) => p.credits === selectedCredits)?.priceInUsd;
    return `${isRechargingMode ? 'Recharge' : 'Buy'} ${selectedCredits.toLocaleString()} credits • $${price}`;
  };

  const handleRecharge = useCallback((keyId: string) => {
    setSelectedKeyId(keyId);
    setIsRechargingMode(true);
    setSelectedCredits(0); // Reset selected credits
    // Scroll to credits selection
    document.querySelector('.credits-selection')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const containerPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const cardSpacing = useBreakpointValue({ base: 6, md: 8, lg: 10 });

  return (
    <Box backgroundColor="black" minHeight={layoutConstants.mainContentHeight} p={containerPadding}>
      <Container maxW="container.xl">
        <VStack spacing={cardSpacing} align="stretch">
          <VStack align="start" spacing={6}>
            <Flex direction="column" gap={2}>
              <Heading
                as="h1"
                color="white"
                size="lg"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                bgClip="text"
                fontWeight="bold"
                letterSpacing="tight"
              >
                API Keys Management
              </Heading>
              <Flex align="center" gap={2}>
                <Text color="gray.400" fontSize="md">
                  Manage your API keys and monitor your credit usage
                </Text>
                <Link
                  href="https://grix.apidocumentation.com"
                  isExternal
                  color="cyan.400"
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  _hover={{ color: 'cyan.300', textDecoration: 'none' }}
                >
                  <Icon as={FiBook} boxSize={4} />
                  Documentation
                </Link>
              </Flex>
            </Flex>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} w="full" px={{ base: 0, md: 2 }}>
              <StatCard label="Total Credits" value={totalCredits} icon={<Icon as={FiCreditCard} boxSize={5} color="cyan.400" />} />
              <StatCard label="Active Keys" value={activeKeys} icon={<Icon as={FiKey} boxSize={5} color="blue.400" />} />
              <StatCard
                label="Total Keys"
                value={apiKeys?.filter((key) => key.status === PaymentStatus.COMPLETED).length || 0}
                icon={<Icon as={FiDatabase} boxSize={5} color="teal.400" />}
              />
            </SimpleGrid>
          </VStack>

          <CreditsSelection
            isRechargingMode={isRechargingMode}
            selectedKeyId={selectedKeyId}
            selectedCredits={selectedCredits}
            creditPrices={creditPrices}
            isCreating={isCreating}
            isRecharging={isRecharging}
            isConnected={isConnected}
            onSelectCredits={setSelectedCredits}
            onCancelRecharge={() => {
              setIsRechargingMode(false);
              setSelectedKeyId(null);
            }}
            onButtonClick={handleCreateOrRecharge}
            getButtonText={getButtonText}
          />

          <Box mt={4}>
            <ApiKeysTable
              apiKeys={apiKeys || []}
              isLoading={isLoading}
              selectedKeyId={selectedKeyId}
              onRecharge={handleRecharge}
              isRecharging={isRecharging}
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
