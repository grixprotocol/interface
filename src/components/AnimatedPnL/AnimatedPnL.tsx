import { Box, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Keyframe for wave animation
const waveEffect = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Props type
type AnimatedPnLProps = {
  value: string;
};

export const AnimatedPnL = ({ value }: AnimatedPnLProps) => {
  const color = Number(value.replace(/[^-0-9.]/g, '')) >= 0 ? 'green.500' : 'red.500';

  return (
    <VStack spacing={0} align="center" position="relative" overflow="hidden">
      <Box position="relative" zIndex={2}>
        <Text color={color} fontWeight="semibold">
          {value}
        </Text>
      </Box>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
        sx={{
          animation: `${waveEffect} 1.2s linear infinite`,
          animationFillMode: 'forwards',
        }}
        zIndex={1}
      />
    </VStack>
  );
};
