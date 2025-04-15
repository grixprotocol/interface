import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type BaseCardProps = {
  children: ReactNode;
  hover?: boolean;
} & BoxProps;

export const BaseCard = ({ children, hover = true, ...props }: BaseCardProps) => (
  <Box
    as="article"
    id="base-card"
    w="full"
    p={4}
    bg="rgba(255, 255, 255, 0.02)"
    borderRadius="xl"
    borderWidth={1}
    borderColor="whiteAlpha.200"
    boxShadow="lg"
    transition="all 0.2s"
    {...(hover && { _hover: { borderColor: 'whiteAlpha.300' } })}
    {...props}
  >
    {children}
  </Box>
);
