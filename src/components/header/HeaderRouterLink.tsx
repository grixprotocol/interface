import { Flex, Heading, Link as ChakraLink } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useIsBigScreen } from '@/hooks/useIsBigScreen';

import { configDesign } from '../../configDesign';

type HeaderRouterLinkProps = {
  to: string;
  shortLabel: string;
  longLabel: string;
  isExternal: boolean;
  fontSize?: string;
};

export const HeaderRouterLink: React.FC<HeaderRouterLinkProps> = ({ to, shortLabel, longLabel, isExternal }) => {
  const isBigScreen = useIsBigScreen();
  const location = useLocation();

  const [hoveredLink, setHoveredLink] = useState('');

  const handleMouseEnter = (path: string) => {
    setHoveredLink(path);
  };
  const handleMouseLeave = () => {
    setHoveredLink('');
  };

  // Adjust active style condition to check for multiple paths
  const isActive = location.pathname === to || (to === '/' && location.pathname === '/zero-day');

  const linkStyle = isActive
    ? {
        ...configDesign['activeStyle'],
        color: '#FFFFFF',
      }
    : hoveredLink === to
    ? { ...configDesign['hoverStyle'] }
    : {
        ...configDesign['textStyle'],
        fontWeight: '700',
        fontSize: '14px',
      };

  return (
    <Flex justifyContent="flex-start" alignItems="center">
      {isExternal ? (
        <ChakraLink
          href={to}
          isExternal
          onMouseEnter={() => handleMouseEnter(to)}
          onMouseLeave={handleMouseLeave}
          style={linkStyle}
        >
          <Heading as="h2" fontSize={{ base: '15px', md: '15px' }} aria-label={`${shortLabel} Link`} mr="10px">
            {isBigScreen ? longLabel : shortLabel}
          </Heading>
        </ChakraLink>
      ) : (
        <RouterLink to={to} onMouseEnter={() => handleMouseEnter(to)} onMouseLeave={handleMouseLeave} style={linkStyle}>
          <Heading as="h2" fontSize={{ base: '15px', md: '15px' }} aria-label={`${shortLabel} Link`} mr="10px">
            {isBigScreen ? longLabel : shortLabel}
          </Heading>
        </RouterLink>
      )}
    </Flex>
  );
};
