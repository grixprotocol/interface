import { HStack } from '@chakra-ui/react';

import { useNavigationConfig } from './config';
import { NavigationItem } from './NavigationItem';

export const MainNavigation = () => {
  const { mainNav } = useNavigationConfig();

  return (
    <HStack spacing={10} align="center">
      {mainNav.map((item, index) => (
        <HStack key={index} spacing={6} align="center">
          <NavigationItem item={item} />
        </HStack>
      ))}
    </HStack>
  );
};
