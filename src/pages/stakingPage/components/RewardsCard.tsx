import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { GrixLogo } from '@/components/commons/Logo';
import { EthLogo } from '@/components/commons/Logo/EthLogo';
import { AssetPriceResponse } from '@/types/api';
import { claim, compound } from '@/web3Config/staking/hooks';

import { useVesting } from '../hooks/useVesting';

type RewardsCardProps = {
  data: {
    claimable: string;
    stakedAmount: string;
    cumulativeRewards: string;
    averageStaked: string;
  } | null;
  refetchData: () => Promise<void>;
};

export const RewardsCard = ({ data, refetchData }: RewardsCardProps): JSX.Element => {
  const { address } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);
  const [isCompounding, setIsCompounding] = useState(false);
  const [grixPrice, setGrixPrice] = useState<number | null>(null);
  const { totalStaked } = useVesting();
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

  const handleClaim = useCallback(async () => {
    if (!address) return;

    try {
      setIsClaiming(true);
      await claim(true, true, false);
      await refetchData();
      toast({
        title: 'Claim Successful',
        description: 'Your rewards have been claimed',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Claim Failed',
        description: 'There was an error claiming your rewards',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsClaiming(false);
    }
  }, [address, refetchData, toast]);

  const handleCompound = useCallback(async () => {
    if (!address) return;

    try {
      setIsCompounding(true);
      await compound(address);
      await refetchData();
      toast({
        title: 'Compound Successful',
        description: 'Your rewards have been compounded',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Compound Failed',
        description: 'There was an error compounding your rewards',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsCompounding(false);
    }
  }, [address, refetchData, toast]);

  return (
    <Box
      bg="gray.950"
      borderRadius="md"
      p={4}
      minW="360px"
      height="fit-content"
      border="1px solid"
      borderColor="gray.900"
      _hover={{ borderColor: 'gray.800' }}
    >
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <HStack spacing={2}>
            <EthLogo boxSize="14px" />
            <Text color="white" fontWeight="600" fontSize="sm" letterSpacing="-0.01em">
              WETH
            </Text>
          </HStack>
          <Text color="gray.400" fontSize="sm" fontWeight="500" flexShrink={0}>
            ≤{(0.0001).toFixed(4)} WETH (≤${(0.01).toFixed(2)})
          </Text>
        </HStack>

        <HStack justify="space-between">
          <HStack spacing={2}>
            <GrixLogo boxSize="14px" />
            <Text color="white" fontWeight="600" fontSize="sm" letterSpacing="-0.01em">
              Claimable Rewards
            </Text>
          </HStack>
          <Text color="gray.400" fontSize="sm" fontWeight="500" flexShrink={0} textAlign="right">
            {data?.claimable ? Number(data.claimable).toFixed(4) : '0.0000'} esGRIX
            {grixPrice && data?.claimable && (
              <Text as="span" color="green.300" fontWeight="600" fontSize="sm" letterSpacing="-0.01em">
                &nbsp;($
                {(Number(data.claimable) * grixPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                )
              </Text>
            )}
          </Text>
        </HStack>

        <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="gray.800">
          <HStack spacing={2}>
            <GrixLogo boxSize="14px" />
            <Text color="white" fontWeight="600" fontSize="sm" letterSpacing="-0.01em">
              Total Staked
            </Text>
          </HStack>
          <Text color="gray.400" fontSize="sm" fontWeight="500" flexShrink={0} textAlign="right">
            {Number(totalStaked).toLocaleString(undefined, {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{' '}
            GRIX
            {grixPrice && Number(totalStaked) > 0 && (
              <Text as="span" color="green.300" fontWeight="600" fontSize="sm" letterSpacing="-0.01em">
                &nbsp;($
                {(Number(totalStaked) * grixPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                )
              </Text>
            )}
          </Text>
        </HStack>
        <Button
          onClick={() => void handleClaim()}
          isLoading={isClaiming}
          loadingText="Claiming"
          bg="teal.400"
          color="white"
          size="md"
          width="full"
          height="40px"
          fontSize="sm"
          isDisabled={!data?.claimable || Number(data?.claimable) <= 0}
          _hover={{ bg: 'teal.500' }}
          _active={{ bg: 'teal.600' }}
        >
          Claim esGRIX
        </Button>

        <Button
          onClick={() => void handleCompound()}
          isLoading={isCompounding}
          loadingText="Compounding"
          bg="teal.400"
          color="white"
          size="md"
          width="full"
          height="40px"
          fontSize="sm"
          _hover={{ bg: 'teal.500' }}
          _active={{ bg: 'teal.600' }}
        >
          Compound
        </Button>
      </VStack>
    </Box>
  );
};
