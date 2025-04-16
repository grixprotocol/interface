/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, Icon, IconButton, Link, Text, Tooltip } from '@chakra-ui/react';
import { FaDiscord, FaGithub, FaMedium, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLinktree } from 'react-icons/si';
import { useBlockNumber } from 'wagmi';

import { DotSeparator } from '@/ds';

// Consistent typography and spacing constants
const TYPOGRAPHY = {
  primary: {
    fontSize: { base: '12px', md: '14px' },
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  copyright: {
    fontSize: { base: '11px', md: '13px' },
    fontWeight: '500',
    fontFamily: 'Inter',
  },
};

const SPACING = {
  iconSize: { base: 5, md: 6 },
  buttonSize: { base: 'sm', md: 'md' },
  gap: { base: 2, md: 4 },
};

const SocialLink = ({ href, isExternal, children }: any) => (
  <Link
    display={{ base: 'none', md: 'flex' }}
    href={href}
    isExternal={isExternal}
    alignItems="center"
    justifyContent="center"
    px={3}
    py={2}
    borderRadius="8px"
    {...TYPOGRAPHY.primary}
    color="gray.400"
    transition="transform 0.2s ease"
    _hover={{
      textDecoration: 'none',
      transform: 'translateY(-2px)',
    }}
  >
    {children}
  </Link>
);

export const Footer = () => {
  const { data } = useBlockNumber({ chainId: 42161, watch: true });

  const socialLinks = [
    {
      icon: FaXTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/GrixFinance',
    },
    {
      icon: FaGithub,
      label: 'Github',
      href: 'https://github.com/grixprotocol/defi-options-hub',
    },
    { icon: FaDiscord, label: 'Discord', href: 'https://t.co/YPGAhKlcUV' },
    {
      icon: FaMedium,
      label: 'Medium',
      href: 'https://medium.com/@grixfinance',
    },
    {
      icon: SiLinktree,
      label: 'Linktree',
      href: 'https://linktr.ee/grixfinance',
    },
    { icon: FaTelegram, label: 'Telegram', href: 'https://t.me/grixfinance' },
  ];

  return (
    <Box
      as="footer"
      role="contentinfo"
      aria-label="Site footer"
      width="100%"
      height="64px"
      minHeight="64px"
      maxHeight="64px"
      display="flex"
      bg="rgba(0, 0, 0, 0.8)"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      gap={SPACING.gap}
      px={{ base: 3, md: 5 }}
      zIndex={1}
      justifyContent="space-between"
    >
      <HStack spacing={{ base: 2, md: 4 }}>
        <Text
          {...TYPOGRAPHY.copyright}
          color="gray.400"
          transition="transform 0.2s ease"
          _hover={{ transform: 'translateY(-1px)' }}
        >
          © Grix® 2024
        </Text>
        <HStack spacing={{ base: 1, md: 2 }}>
          {socialLinks.map(({ icon, label, href }) => (
            <Tooltip
              key={label}
              label={label}
              hasArrow
              placement="top"
              openDelay={200}
              bg="gray.700"
              color="white"
              fontSize="xs"
              borderRadius="md"
            >
              <IconButton
                size={SPACING.buttonSize}
                variant="ghost"
                color="gray.400"
                bg="whiteAlpha.50"
                as="a"
                target="_blank"
                icon={<Icon as={icon} boxSize={SPACING.iconSize} />}
                aria-label={label}
                href={href}
                transition="all 0.2s ease"
                _hover={{
                  transform: 'translateY(-2px)',
                  bg: 'whiteAlpha.100',
                }}
                _active={{
                  transform: 'translateY(1px)',
                }}
              />
            </Tooltip>
          ))}
        </HStack>
      </HStack>

      <HStack spacing={{ base: 3, md: 5 }}>
        <SocialLink href="/stats">Interactions Stats</SocialLink>
        <SocialLink href="/status">Connected Protocols Status</SocialLink>
        <HStack spacing={2} w="100px">
          <DotSeparator bgColor="#079455" />
          <Text {...TYPOGRAPHY.primary} color="gray.400">
            {data ? data.toString() : '-------------'}
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};
