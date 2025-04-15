import { Spinner, VStack } from '@chakra-ui/react';
import { Graph } from '@visx/network';
import { useEffect, useRef, useState } from 'react';

import { layoutConstants } from '@/configDesign';

import { LinkComponent } from './components/LinkComponent';
import { NodeComponent } from './components/NodeComponent';
import { generateGraphComponents } from './helpers/generateGraphComponents';
import { processData } from './helpers/processData';
import { Protocol } from './helpers/types';
import { useAngleOffset } from './hooks/useAngleOffset';
import { useMarketsStatus } from './hooks/useMarketsStatus';
import { logos } from './logos';

export const StatusPage = () => {
  const [boxWidth, setBoxWidth] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const [protocolsWithStatus, setProtocolsWithStatus] = useState<Protocol[]>([]);
  const { data, isLoading } = useMarketsStatus();
  const { Derive } = logos;

  useEffect(() => {
    const updateBoxWidth = () => {
      if (boxRef.current) {
        setBoxWidth(0.9 * boxRef.current.offsetWidth);
      }
    };

    updateBoxWidth();
    window.addEventListener('resize', updateBoxWidth);
    return () => window.removeEventListener('resize', updateBoxWidth);
  }, []);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const res = processData(data);
      setProtocolsWithStatus(res);
    }
  }, [data, Derive]);

  const angleOffset = useAngleOffset();
  if (isLoading)
    return (
      <VStack
        ref={boxRef}
        backgroundColor="base.black"
        minHeight={layoutConstants.mainContentHeight}
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <Spinner color="white" />
      </VStack>
    );
  return (
    <VStack
      ref={boxRef}
      backgroundColor="base.black"
      minHeight={layoutConstants.mainContentHeight}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="full"
    >
      <svg width={boxWidth} height={800}>
        <Graph
          graph={generateGraphComponents(boxWidth, 800, angleOffset, protocolsWithStatus)}
          top={0}
          left={0}
          nodeComponent={NodeComponent}
          linkComponent={LinkComponent}
        />
      </svg>
    </VStack>
  );
};
