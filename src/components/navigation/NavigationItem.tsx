import { Box, Link as ChakraLink, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { SubNavigation } from './SubNavigation';
import { NavigationItem as NavigationItemType } from './types';

type NavigationItemProps = {
  item: NavigationItemType;
};

export const NavigationItem = ({ item }: NavigationItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const navItemRef = useRef<HTMLDivElement>(null);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Handle mouse interactions
  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hasSubItems) {
      setIsOpen(true);
    }
  }, [hasSubItems]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, []);

  // Handle click for touch devices and accessibility
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (hasSubItems) {
        e.preventDefault();

        // If there are subitems, navigate to the first one
        if (item.subItems && item.subItems.length > 0 && !item.subItems[0].isExternal) {
          navigate(item.subItems[0].path);
        } else {
          // Toggle submenu if no valid first item to navigate to
          setIsOpen(!isOpen);
        }
      }
    },
    [hasSubItems, isOpen, item.subItems, navigate]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (hasSubItems) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();

          // If there are subitems, navigate to the first one on Enter/Space
          if (item.subItems && item.subItems.length > 0 && !item.subItems[0].isExternal) {
            navigate(item.subItems[0].path);
          } else {
            // Toggle submenu if no valid first item to navigate to
            setIsOpen(!isOpen);
          }
        } else if (e.key === 'Escape' && isOpen) {
          e.preventDefault();
          setIsOpen(false);
          navItemRef.current?.focus();
        } else if (e.key === 'ArrowDown' && isOpen) {
          e.preventDefault();
          // Focus the first item in the submenu
          const submenu = navItemRef.current?.querySelector('a, button') as HTMLElement;
          submenu?.focus();
        }
      }
    },
    [hasSubItems, isOpen, item.subItems, navigate]
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navItemRef.current && !navItemRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const isActive = location.pathname.startsWith(item.path);

  // Determine the path to use for the main item
  const mainItemPath =
    hasSubItems && item.subItems && item.subItems.length > 0 ? (item.subItems[0].isExternal ? '#' : item.subItems[0].path) : item.path;

  const linkStyle = {
    position: 'relative' as const,
    color: isActive ? 'blue.400' : 'gray.300',
    fontWeight: '700',
    fontSize: '14px',
    transition: 'all 0.2s',
    _hover: {
      color: isActive ? 'blue.400' : 'white',
    },
  };

  return (
    <Box
      ref={navItemRef}
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={hasSubItems ? 'menuitem' : undefined}
      aria-haspopup={hasSubItems ? 'true' : undefined}
      aria-expanded={hasSubItems ? isOpen : undefined}
      px={2}
      py={1}
      mx={-2}
      my={-1}
      _focus={{ boxShadow: 'none', outline: 'none' }}
    >
      {item.isExternal ? (
        <ChakraLink
          href={item.path}
          isExternal
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
          onClick={hasSubItems ? handleClick : undefined}
          onKeyDown={hasSubItems ? handleKeyDown : undefined}
          tabIndex={0}
          _focus={{ boxShadow: 'none', outline: 'none' }}
        >
          <Text {...linkStyle}>
            {item.label}
            {hasSubItems && ' ▾'}
          </Text>
        </ChakraLink>
      ) : (
        <RouterLink
          to={mainItemPath}
          style={{ textDecoration: 'none' }}
          onClick={hasSubItems ? handleClick : undefined}
          onKeyDown={hasSubItems ? handleKeyDown : undefined}
          tabIndex={0}
        >
          <Text {...linkStyle}>
            {item.label}
            {hasSubItems && ' ▾'}
          </Text>
        </RouterLink>
      )}

      {/* Sub navigation - only render when needed */}
      {hasSubItems && item.subItems && (
        <Box position="absolute" top="100%" left="50%" transform="translateX(-50%)" pt={2} zIndex={2} display={isOpen ? 'block' : 'none'}>
          <SubNavigation items={item.subItems} isOpen={isOpen} parentRef={navItemRef} onClose={() => setIsOpen(false)} />
        </Box>
      )}
    </Box>
  );
};
