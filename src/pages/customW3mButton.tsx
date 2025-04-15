import { Badge, Button, ButtonProps, HStack, Image, Text } from '@chakra-ui/react';
import { useAppKit, useWalletInfo } from '@reown/appkit/react';
import { CSSProperties } from 'react';
import { FaWallet } from 'react-icons/fa';
import { formatUnits } from 'viem';
import { useBalance } from 'wagmi';

import { config } from '@/config';
import { useAnalytics } from '@/services/analytics';
import { addressShortcut, useUserAccount, useUserNetwork } from '@/utils/web3Util';

type ConnectButtonProps = ButtonProps & {
  label: string;
};

export const ConnectButton = ({ label, ...rest }: ConnectButtonProps) => {
  const { track } = useAnalytics();
  const { open } = useAppKit();
  const { address } = useUserAccount();
  const { chainId } = useUserNetwork();
  const { walletInfo } = useWalletInfo();
  const { data: balanceData } = useBalance({
    address: address as `0x${string}`,
    chainId: chainId as number,
    token: config.networks.Arbitrum.WETH,
    query: {
      refetchInterval: 30000,
    },
  });

  const balance = balanceData ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(3) : undefined;

  const iconStyles: CSSProperties = {
    marginRight: '8px',
    width: '16.67px',
    height: '16.67px',
    top: '1.67px',
    right: '1.67px',
    border: 'none',
    verticalAlign: 'middle',
    transition: 'transform 0.3s ease',
  };

  const onClick = () => {
    track('connect_wallet_button_click');
    void open();
  };

  if (!address) {
    return (
      <Button
        variant="primaryGradient"
        w="full"
        onClick={onClick}
        position="relative"
        transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        _hover={{
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          '& svg': {
            transform: 'rotate(15deg)',
          },
        }}
        _active={{
          transform: 'translateY(2px) scale(0.98)',
          boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
        }}
        {...rest}
      >
        <FaWallet size={24} color="white" style={iconStyles} />
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      w="full"
      onClick={onClick}
      position="relative"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _before={{
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        transform: 'scale(0)',
        transition: 'transform 0.6s ease-out',
      }}
      _hover={{
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        '&::before': {
          transform: 'scale(1)',
        },
      }}
      _active={{
        transform: 'scale(0.98)',
        boxShadow: 'none',
      }}
      {...rest}
    >
      <HStack
        spacing={2}
        sx={{
          '& img': {
            transition: 'transform 0.3s ease',
            _hover: {
              transform: 'scale(1.2) rotate(10deg)',
            },
          },
        }}
      >
        <Image src={walletInfo?.icon} fallback={<></>} alt={walletInfo?.name} w="24px" h="24px" />
        {balanceData && (
          <Text
            color="white.500"
            transition="all 0.3s ease"
            _hover={{
              transform: 'scale(1.1)',
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          >
            {`${balance} WETH`}
          </Text>
        )}
        <Badge
          bgColor="gray.800"
          color="gray.500"
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.1)',
            color: 'white',
            bgColor: 'gray.700',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          }}
        >
          {addressShortcut(address)}
        </Badge>
      </HStack>
    </Button>
  );
};
