import { Container, Flex } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { layoutConstants } from '@/configDesign';
import background from '@/pages/PointsPage/Images/sphere_bg.svg';

import { navigationConfig } from './navigation/config';
import { Navigation } from './navigation/index';

export const CalypsoHub = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/calypso';

  return (
    <Flex
      height={layoutConstants.mainContentHeight}
      backgroundColor="base.black"
      backgroundImage={`url(${background})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      position="relative"
      overflow="auto"
    >
      <Container maxW="container.xl" pt={4}>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {navigationConfig.map((item) => (
              <Route
                key={item.id}
                path={item.path.replace('/calypso/', '')}
                element={!item.comingSoon ? <item.component /> : null}
              />
            ))}
            <Route
              path="/"
              element={
                isRootPath ? (
                  <Navigate to="/lobby" replace />
                ) : (
                  <Navigate to={location.pathname.replace('/calypso', '')} replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </Container>
    </Flex>
  );
};
