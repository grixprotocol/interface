import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaEquals, FaPlus } from 'react-icons/fa';

import { GrixLogo } from '@/components/commons/Logo';
import { AssetPriceResponse } from '@/types/api';

type VestingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  esGrixBalance: string;
  grixBalance: string;
  isLoading: boolean;
  onVest: (amount: string) => Promise<void>;
  claimableRewards: string;
};

export const VestingModal = ({
  isOpen,
  onClose,
  esGrixBalance,
  grixBalance,
  isLoading,
  onVest,
  claimableRewards,
}: VestingModalProps): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [grixPrice, setGrixPrice] = useState<number | null>(null);
  const toast = useToast();

  // Fetch GRIX price from CoinGecko
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://z61hgkwkn8.execute-api.us-east-1.amazonaws.com/dev/assetprice?asset=GRIX', {
          headers: {
            'x-api-key': import.meta.env.VITE_GRIX_API_KEY,
            origin: 'https://app.grix.finance',
          },
        });
        const json = (await res.json()) as AssetPriceResponse;
        const price = json.assetPrice;
        setGrixPrice(price);
      } catch {
        setGrixPrice(null);
      }
    };
    void fetchPrice();
  }, []);

  const formatUsdValue = (tokenAmount: string | number) => {
    if (!grixPrice) return '';
    const amount = Number(tokenAmount);
    return `($${(amount * grixPrice).toFixed(2)})`;
  };

  const handleVest = async () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to vest',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (Number(amount) > Number(esGrixBalance)) {
      toast({
        title: 'Insufficient balance',
        description: 'You do not have enough esGRIX to vest this amount',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await onVest(amount);
      setAmount('');
      onClose();
      toast({
        title: 'Success',
        description: 'Successfully vested esGRIX',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to vest esGRIX. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSetMaxAmount = () => {
    setAmount(esGrixBalance);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />
      <ModalContent bg="#111" maxW="360px">
        <ModalHeader p={4} display="flex" alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="md">
            Vesting
          </Text>
          <ModalCloseButton position="static" color="gray.400" _hover={{ color: 'white' }} />
        </ModalHeader>

        <Box px={4} pb={4}>
          <VStack spacing={3} align="stretch">
            <HStack spacing={2} bg="#1A1A1A" p={3} borderRadius="md" justify="space-between" align="center">
              <HStack spacing={1}>
                <GrixLogo boxSize="16px" />
                <Text color="gray.400">esGRIX</Text>
              </HStack>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                variant="unstyled"
                color="white"
                fontSize="md"
                width="auto"
                textAlign="right"
                sx={{
                  '::placeholder': {
                    color: 'gray.400',
                    opacity: 1,
                  },
                }}
              />
            </HStack>

            <HStack justify="space-between">
              <Text color="gray.500" fontSize="sm">
                Vestable Balance
              </Text>
              <Text
                color="gray.400"
                fontSize="sm"
                cursor="pointer"
                onClick={handleSetMaxAmount}
                _hover={{ color: 'white' }}
                transition="color 0.2s"
              >
                {Number(esGrixBalance).toFixed(4)} esGRIX
              </Text>
            </HStack>

            {/* Available to Reserve Section */}
            <Box>
              <Text color="gray.500" fontSize="sm" mb={2}>
                Available to Reserve for Vesting
              </Text>
              <VStack spacing={2} align="stretch">
                <Flex justify="space-between" align="center">
                  <Text color="gray.500" fontSize="sm">
                    GRIX tokens
                  </Text>
                  <HStack spacing={2} align="center">
                    <Text color="gray.400" fontSize="sm">
                      {Number(grixBalance).toFixed(4)} GRIX {formatUsdValue(grixBalance)}
                    </Text>
                    <Icon as={FaPlus} color="gray.600" boxSize={2} />
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="gray.500" fontSize="sm">
                    esGRIX tokens
                  </Text>
                  <HStack spacing={2} align="center">
                    <Text color="gray.400" fontSize="sm">
                      {Number(claimableRewards).toFixed(4)} esGRIX {formatUsdValue(claimableRewards)}
                    </Text>
                    <Icon as={FaPlus} color="gray.600" boxSize={2} />
                  </HStack>
                </Flex>
                <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={2}>
                  <Flex justify="space-between" align="center">
                    <Text color="gray.500" fontSize="sm">
                      Total
                    </Text>
                    <HStack spacing={2} align="center">
                      <Text color="gray.400" fontSize="sm">
                        {(Number(grixBalance) + Number(claimableRewards)).toFixed(4)} Tokens{' '}
                        {formatUsdValue(Number(grixBalance) + Number(claimableRewards))}
                      </Text>
                      <Icon as={FaEquals} color="gray.600" boxSize={2} />
                    </HStack>
                  </Flex>
                </Box>
                <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={2}>
                  <Flex justify="space-between" align="center">
                    <Text color="gray.500" fontSize="sm">
                      Reserving
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      {amount ? `${Number(amount).toFixed(2)} Token ${formatUsdValue(amount)}` : '-'}
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </Box>

            {/* Vest Button */}
            <Button
              onClick={() => void handleVest()}
              isLoading={isLoading}
              loadingText="Vesting"
              bg="teal.400"
              color="white"
              size="lg"
              width="full"
              height="40px"
              fontSize="sm"
              isDisabled={!amount || Number(amount) <= 0 || Number(amount) > Number(esGrixBalance)}
              _hover={{ bg: 'teal.500' }}
              _active={{ bg: 'teal.600' }}
            >
              Vest
            </Button>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};
