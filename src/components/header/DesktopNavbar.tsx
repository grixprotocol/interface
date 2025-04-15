import { Divider, HStack, Link } from '@chakra-ui/react';

import { ConnectButton } from '@/pages/customW3mButton';
import { addressShortcut, useUserAccount } from '@/utils/web3Util';

import { GrixAlphaLogo } from '../commons/Logo';
import { MainNavigation } from '../navigation/MainNavigation';
export const DesktopNavbar = () => {
  const { address } = useUserAccount();

  return (
    <HStack spacing={6} align="center" px={4} width="100%" justify="space-between">
      <HStack spacing={6} align="center">
        <Link
          href="/"
          display="flex"
          alignItems="center"
          transition="transform 0.2s"
          _hover={{
            transform: 'scale(1.05)',
          }}
        >
          <GrixAlphaLogo width="160px" />
        </Link>
        <Divider orientation="vertical" height={7} />
        <MainNavigation />
      </HStack>
      <ConnectButton label={address ? addressShortcut(address) : 'Connect'} fontSize="14px" size="md" w="auto" />
    </HStack>
  );
};
