import { Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const floatUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  15% {
    opacity: 1;
    transform: translateY(-10px);
  }
  85% {
    opacity: 1;
    transform: translateY(-40px);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

type PointsAnimationProps = {
  points: string;
};

export const PointsAnimation = ({ points }: PointsAnimationProps) => (
  <Text
    fontSize="3xl"
    fontWeight="bold"
    color="#ffab19"
    textShadow="0 0 10px #ffab19"
    animation={`${floatUp} 2.5s ease-out forwards`}
    display="flex"
    alignItems="center"
    gap={1}
    pointerEvents="none"
  >
    +{points}
  </Text>
);
