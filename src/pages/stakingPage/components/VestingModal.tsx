import {
  Box,
  Button,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  VStack,
  useToast,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronDown, FaPlus, FaEquals } from 'react-icons/fa';
import { getVestingDuration } from '@/web3Config/staking/hooks';

type VestingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  esGrixBalance: string;
  grixBalance: string;
  vestingAllowance: string;
  isLoading: boolean;
  onVest: (amount: string) => Promise<void>;
  claimableRewards: string;
};

type VestingProjection = {
  days: number;
  amount: string;
};

type DexScreenerResponse = {
  grix: {
    usd: number;
  };
};

export const VestingModal = ({
  isOpen,
  onClose,
  esGrixBalance,
  grixBalance,
  vestingAllowance,
  isLoading,
  onVest,
  claimableRewards,
}: VestingModalProps): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [vestingDuration, setVestingDuration] = useState<bigint | null>(null);
  const [grixPrice, setGrixPrice] = useState<number | null>(null);
  const toast = useToast();

  // Fetch vesting duration when modal opens
  useEffect(() => {
    const fetchVestingDuration = async () => {
      const duration = await getVestingDuration();
      setVestingDuration(duration);
    };
    if (isOpen) {
      void fetchVestingDuration();
    }
  }, [isOpen]);

  // Fetch GRIX price from CoinGecko
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=grix&vs_currencies=usd');
        const json = (await res.json()) as DexScreenerResponse;
        const price = json.grix.usd;
        setGrixPrice(price);
      } catch {
        setGrixPrice(null);
      }
    };
    void fetchPrice();
  }, []);

  // Calculate expected GRIX at different time periods
  const calculateVestingProjections = useCallback((inputAmount: string): VestingProjection[] => {
    if (!inputAmount || Number(inputAmount) <= 0) return [];

    const amount = Number(inputAmount);
    const oneDay = 24 * 60 * 60; // seconds in a day
    const totalDays = 30; // Default to 30 days if vestingDuration not available

    return [
      {
        days: 1,
        amount: ((amount * oneDay) / (totalDays * oneDay)).toFixed(3),
      },
      {
        days: 15,
        amount: ((amount * 15) / totalDays).toFixed(3),
      },
      {
        days: totalDays,
        amount: amount.toFixed(3),
      },
    ];
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

  const vestingProjections = calculateVestingProjections(amount);

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
            {/* Token Selection */}
            <HStack spacing={2} mb={2} bg="#1A1A1A" p={3} borderRadius="md">
              <HStack spacing={1}>
                <Icon as={FaChevronDown} color="gray.400" boxSize={3} mr={1} />
                <Text color="gray.400">esGRIX</Text>
              </HStack>
              <Text color="gray.500" ml="auto">
                Enter Amount
              </Text>
            </HStack>

            {/* Input Field */}
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              variant="unstyled"
              textAlign="left"
              color="white"
              fontSize="lg"
              p={3}
              bg="#1A1A1A"
              borderRadius="md"
              _placeholder={{ color: 'gray.500' }}
            />

            {/* Vestable Balance */}
            <HStack justify="space-between" mb={2}>
              <Text color="gray.500" fontSize="sm">
                Vestable Balance
              </Text>
              <Text color="gray.400" fontSize="sm" cursor="pointer" onClick={handleSetMaxAmount}>
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
                      {amount ? `${Number(amount).toFixed(4)} Token ${formatUsdValue(amount)}` : '-'}
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
              bg="blue.500"
              color="white"
              size="lg"
              width="full"
              height="40px"
              fontSize="sm"
              isDisabled={!amount || Number(amount) <= 0 || Number(amount) > Number(esGrixBalance)}
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.700' }}
            >
              Vest
            </Button>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};
