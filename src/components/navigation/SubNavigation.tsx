import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAnalytics } from '@/services/analytics';

import { SubNavigationItem } from './types';

const MotionBox = motion(Box);

type SubNavigationProps = {
  items: SubNavigationItem[];
  isOpen: boolean;
  parentRef?: RefObject<HTMLDivElement>;
  onClose?: () => void;
};

export const SubNavigation = ({ items, isOpen, parentRef, onClose }: SubNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { track } = useAnalytics();
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // Focus the first item when menu opens
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      // Small delay to ensure the animation has started
      setTimeout(() => {
        firstItemRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleClick = (item: SubNavigationItem) => {
    track(`${item.label.toLowerCase()}_click`);
    if (!item.isExternal) {
      navigate(item.path);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, item: SubNavigationItem) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        // Focus next item or loop to first
        const nextItem = document.querySelector(`[data-index="${index + 1}"]`) as HTMLElement;
        if (nextItem) {
          nextItem.focus();
        } else {
          const firstItem = document.querySelector('[data-index="0"]') as HTMLElement;
          if (firstItem) firstItem.focus();
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        // Focus previous item or loop to last
        const prevItem = document.querySelector(`[data-index="${index - 1}"]`) as HTMLElement;
        if (prevItem) {
          prevItem.focus();
        } else {
          const lastIndex = items.length - 1;
          const lastItem = document.querySelector(`[data-index="${lastIndex}"]`) as HTMLElement;
          if (lastItem) lastItem.focus();
        }
        break;
      }
      case 'Escape':
        e.preventDefault();
        if (onClose) {
          onClose();
          // Return focus to parent menu item
          if (parentRef?.current) {
            parentRef.current.focus();
          }
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick(item);
        break;
      case 'Tab':
        // Allow normal tab navigation, but close menu if tabbing out
        if (index === items.length - 1 && !e.shiftKey) {
          if (onClose) onClose();
        } else if (index === 0 && e.shiftKey) {
          if (onClose) onClose();
        }
        break;
      default:
        break;
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -10,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      transition={{ duration: 0.2 }}
      minW="200px"
      bg="base.black"
      borderRadius="md"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.700"
      py={2}
      role="menu"
      aria-orientation="vertical"
    >
      {items.map((item, index) => {
        const isActive = !item.isExternal && location.pathname.startsWith(item.path);

        return (
          <Link
            key={item.path}
            ref={index === 0 ? firstItemRef : undefined}
            data-index={index}
            onClick={() => handleClick(item)}
            onKeyDown={(e) => handleKeyDown(e, index, item)}
            href={item.isExternal ? item.path : undefined}
            isExternal={item.isExternal}
            _hover={{ textDecoration: 'none' }}
            display="block"
            role="menuitem"
            tabIndex={0}
            px={4}
            py={2}
            outline="none"
            _focus={{ boxShadow: 'none', outline: 'none' }}
          >
            <Flex align="center" transition="all 0.2s" _hover={{ bg: 'whiteAlpha.100' }} borderRadius="md" p={2} position="relative">
              {item.icon && !item.isExternal && (
                <Icon
                  as={item.icon}
                  boxSize={4}
                  color={isActive ? 'blue.400' : 'gray.400'}
                  mr={3}
                  _groupHover={{ color: isActive ? 'blue.400' : 'white' }}
                />
              )}
              {item.isExternal && <FaExternalLinkAlt style={{ marginRight: '18px' }} />}
              <Text
                color={isActive ? 'blue.400' : 'gray.400'}
                fontSize="sm"
                fontWeight="medium"
                _groupHover={{ color: isActive ? 'blue.400' : 'white' }}
              >
                {item.label}
              </Text>
              {item.badge && (
                <Box ml={2} px={2} py={0.5} borderRadius="full" bg="blue.500" color="white" fontSize="xs" fontWeight="bold">
                  {item.badge}
                </Box>
              )}
            </Flex>
          </Link>
        );
      })}
    </MotionBox>
  );
};
