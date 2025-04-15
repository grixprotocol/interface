import { useBreakpointValue } from '@chakra-ui/react';

export const useIsBigScreen = (): boolean =>
  useBreakpointValue({ lg: true, xl: true, '2xl': true }, { ssr: false }) ?? false;
