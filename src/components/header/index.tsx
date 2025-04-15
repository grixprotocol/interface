// Header.tsx
import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSwitchChain } from 'wagmi';

import { config } from '@/config';
import { useIsBigScreen } from '@/hooks/useIsBigScreen';
import { useUserAccount, useUserNetwork } from '@/utils/web3Util';

import { componentStyleVariants } from '../../configDesign';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

export const Header: React.FC = () => {
  const { address } = useUserAccount();
  const { chainId } = useUserNetwork();
  const { switchChain } = useSwitchChain();
  const isBigScreen = useIsBigScreen();

  useEffect(() => {
    if (switchChain && address && chainId !== config.networks.Arbitrum.chainId) {
      switchChain({ chainId: config.networks.Arbitrum.chainId });
    }
  }, [address, chainId, switchChain]);

  return (
    <Flex {...componentStyleVariants.header.headerFlexStyle} data-testid="root-header">
      {isBigScreen ? <DesktopNavbar /> : <MobileNavbar />}
    </Flex>
  );
};
