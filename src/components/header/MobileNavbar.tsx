import { ChevronDownIcon, ChevronUpIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, CloseButton, Flex, IconButton, Link, Slide, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { ConnectButton } from '@/pages/customW3mButton';
import { addressShortcut, useUserAccount } from '@/utils/web3Util';

import { GrixAlphaLogo } from '../commons/Logo';
import { useNavigationConfig } from '../navigation/config';

export const MobileNavbar: React.FC = () => {
  const { mainNav } = useNavigationConfig();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<number | null>(null);
  const { address } = useUserAccount();

  const toggleDropdown = (index: number) => {
    setIsDropdownOpen((prev) => (prev === index ? null : index));
  };

  return (
    <Flex width="100%" px={{ base: 2, sm: 4 }} alignItems="center" justifyContent="space-between">
      <Link href="/">
        <GrixAlphaLogo width="160px" height="50px" />
      </Link>

      <Flex alignItems="center" gap={1} ml={2}>
        <ConnectButton label={address ? addressShortcut(address) : 'Connect'} fontSize="14px" size="sm" />
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="white"
          onClick={() => setIsMenuOpen(true)}
          size="sm"
          width="40px"
        />
      </Flex>

      <Slide direction="right" in={isMenuOpen} style={{ zIndex: 10 }}>
        <Box bg="base.black" position="fixed" top={0} left={0} width="100vw" height="100vh" p={4}>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <CloseButton color="white" onClick={() => setIsMenuOpen(false)} />
          </Box>
          <VStack spacing={4} align="stretch">
            {mainNav.map((item, index) => (
              <React.Fragment key={item.path}>
                <Button
                  variant="ghost"
                  color="gray.300"
                  w="full"
                  justifyContent="space-between"
                  fontSize="sm"
                  onClick={() => toggleDropdown(index)}
                  rightIcon={
                    item.subItems ? isDropdownOpen === index ? <ChevronUpIcon /> : <ChevronDownIcon /> : undefined
                  }
                  _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                >
                  {item.label}
                  {item.isExternal && <FaExternalLinkAlt style={{ marginLeft: '8px' }} />}
                </Button>
                {isDropdownOpen === index && item.subItems && (
                  <VStack spacing={2} align="stretch" pl={4}>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        {...(subItem.isExternal ? { isExternal: true } : {})}
                      >
                        <Button
                          variant="ghost"
                          color="gray.300"
                          w="full"
                          justifyContent="flex-start"
                          fontSize="sm"
                          _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                        >
                          {subItem.label}
                          {subItem.isExternal && <FaExternalLinkAlt color="white" />}
                        </Button>
                      </Link>
                    ))}
                  </VStack>
                )}
              </React.Fragment>
            ))}
          </VStack>
        </Box>
      </Slide>
    </Flex>
  );
};
