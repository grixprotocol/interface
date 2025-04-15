import { Button, StackProps, Text, TextProps, VStack } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

const borderStyle: CSSProperties = {
  borderTop: 'double 2px transparent',
  borderLeft: 'double 2px transparent',
  borderRight: 'double 2px transparent',
  borderRadius: '10px',
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), radial-gradient(ellipse at top, #98A2B3, transparent), radial-gradient(ellipse at bottom, #98A2B3, transparent)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
};

export const PointsContainer = ({ children, ...rest }: StackProps) => (
  <VStack pos="relative" padding="20px" w="full" style={borderStyle} color="white" {...rest}>
    {children}
  </VStack>
);

PointsContainer.Title = ({ children, ...rest }: TextProps) => (
  <Text fontSize={20} fontWeight="600" {...rest}>
    {children}
  </Text>
);

export const TradeButton = ({ isCompleted }: { isCompleted?: boolean }) => {
  const navigate = useNavigate();

  return (
    <Button
      size="sm"
      as="a"
      href="/trade"
      variant={isCompleted ? 'acheived' : 'primaryGradient'} // Conditional variant
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCompleted) return;
        navigate('/trade');
      }}
      borderRadius="800px"
    >
      {isCompleted ? 'Achieved' : 'Trade'}
    </Button>
  );
};

export const separatorStyle: CSSProperties = {
  borderBottom: 'double 1px transparent',
};
