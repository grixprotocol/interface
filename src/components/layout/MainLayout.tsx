import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import backgroundImage from '@/pages/PointsPage/Images/sphere_bg.svg';

import { Footer } from '../footer';
import { Header } from '../header';
import { LAYOUT } from './constants';

type MainLayoutProps = {
  children: ReactNode;
  background?: string;
  mainContentProps?: Partial<BoxProps>;
};

export const MainLayout = ({ children, background = 'base.black', mainContentProps = {} }: MainLayoutProps) => {
  // Ensure header and footer heights are consistent
  const headerHeight = LAYOUT.HEADER_HEIGHT;

  return (
    <Flex as="div" id="app-root" direction="column" minHeight="100vh" height="100vh" bg="base.black" overflow="hidden">
      {/* Fixed Header */}
      <Box as="header" id="app-header" position="fixed" top={0} left={0} right={0} height={headerHeight} zIndex={100}>
        <Header />
      </Box>

      {/* Main Content with Footer appended at the end */}
      <Box
        as="main"
        id="main-content"
        marginTop={headerHeight}
        marginBottom={0}
        paddingBottom={0}
        height={`calc(100vh - ${headerHeight})`}
        overflow="auto"
        display="flex"
        flexDirection="column"
        bg={background}
        bgImage={backgroundImage}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        width="100%"
        {...mainContentProps}
      >
        {/* Content Container */}
        <Box
          id="content-container"
          maxW={LAYOUT.CONTAINER_MAX_WIDTH}
          width="100%"
          marginX="auto"
          display="flex"
          flexDirection="column"
          flex="1"
          justifyContent="flex-start"
          alignItems="center"
          px={LAYOUT.SPACING.PAGE}
          py={LAYOUT.SPACING.PAGE}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </Flex>
  );
};
