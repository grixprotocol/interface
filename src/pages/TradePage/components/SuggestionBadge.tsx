import { Box, Text, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useState } from 'react';
import { TbCrystalBall } from 'react-icons/tb';

import { useAssetPricePrediction } from '@/api/assetPricePrediction';
import { SupportedAsset } from '@/api/types';
import { colors } from '@/ds/theme';

import { useTradeForm } from './TradeFormProvider';

export const SuggestionBadge = () => {
  const { asset, expirationDate, strikePrice, optionType } = useTradeForm();
  const { mutateAsync: getPrediction, isPending: isGettingPrediction } = useAssetPricePrediction();
  const [prediction, setPrediction] = useState<number | null>(null);

  if (!asset || !expirationDate || !strikePrice) return null;

  const operator = optionType === 'call' ? 'above' : 'below';
  const operatorColor = optionType === 'call' ? colors.primary[500] : colors.error[500];
  const formatWithCommasStrike = (number: number) => Math.floor(number).toLocaleString('en-US'); // Adds commas for thousands, no decimals
  const formattedStrikePrice = formatWithCommasStrike(Number(strikePrice));

  const handlePredictionClick = async (): Promise<void> => {
    const predictionResponse = await getPrediction({ asset, timeframe: '8h' });
    const numberOfDecimals = asset === SupportedAsset.BTC ? 8 : 18;
    setPrediction(Number(predictionResponse.prediction.prediction) / 10 ** numberOfDecimals);
  };

  return (
    <Box w="full" data-testid="suggestion-badge">
      <Box
        borderRadius="6px"
        p="1px"
        display="flex"
        flexDirection="row"
        bgGradient="linear(to-r, blue.500, primary.500)"
      >
        <Box borderRadius="6px" w="full" bgColor="base.black">
          <Box bgGradient="linear(to-r, #2E90FA20, #15B79E20)" borderRadius={3} color="white" p={1} textAlign="center">
            I believe {asset} will be{' '}
            <Text as="span" color={operatorColor} fontWeight="bold">
              {operator}
            </Text>{' '}
            ${formattedStrikePrice} by <strong>{format(Number(expirationDate) * 1000, 'MMM dd')}.</strong>
          </Box>
        </Box>

        <Tooltip
          label={
            <>
              Get Prediction for {asset} price in 8 hours (powered by <strong>Allora network</strong>)
            </>
          }
          placement="top-start"
          bg="black"
          color="white"
          borderRadius="8px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
          padding="8px"
          border="1px solid #0A4F47"
        >
          <Box display="flex" alignItems="center" justifyContent="center" position="relative" w="10%" cursor="pointer">
            <Box display="flex" alignItems="center" justifyContent="center" w="100%">
              <TbCrystalBall
                size={25}
                onClick={() => {
                  void handlePredictionClick();
                }}
                style={{
                  color: '#0A4F47',
                  filter: 'drop-shadow(0 0 12px rgba(21, 183, 158, 0.8))',
                  animation: 'pulse 2s infinite',
                }}
              />
            </Box>
          </Box>
        </Tooltip>
      </Box>
      {isGettingPrediction && (
        <Box display="flex" alignItems="center" justifyContent="center" w="100%" mt={3}>
          <TbCrystalBall
            color="white"
            size={25}
            style={{
              animation: 'rotate 1s linear infinite',
            }}
          />
        </Box>
      )}
      {prediction && !isGettingPrediction && (
        <Box mt={2}>
          <Text fontSize="12px" fontWeight="500" color="gray.400">
            Prediction By <strong style={{ fontWeight: 'bold' }}>Allora network</strong>:{' '}
            <span style={{ color: 'white' }}>
              {Number(prediction).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </Text>
        </Box>
      )}
    </Box>
  );
};

const pulseKeyframes = `
  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1);
            color: rgb(231, 242, 233); // Initial color

    }
    50% {
      opacity: 0.8;
      transform: scale(1.13);
            color:rgb(178, 234, 190); // Color when pulsing

    }
    100% {
      opacity: 1;
      transform: scale(1);
      color: rgb(231, 242, 233);// Initial color
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = pulseKeyframes;
  document.head.appendChild(style);
}
