import { Button, Wrap, WrapItem } from '@chakra-ui/react';
import { LineStyle } from 'lightweight-charts';
import { FaCircle, FaLocationCrosshairs, FaLocationDot, FaRegCircle } from 'react-icons/fa6';

import { SeriesConfig } from './types';

type SeriesToggleProps = {
  seriesConfigs: SeriesConfig[];
  onToggle: (index: number) => void;
};

export const SeriesToggle: React.FC<SeriesToggleProps> = ({ seriesConfigs, onToggle }) => (
  <Wrap spacing={2} mb={3}>
    {seriesConfigs.map((config, index) => (
      <WrapItem key={config.name}>
        <Button
          size="sm"
          variant={config.visible ? 'solid' : 'outline'}
          colorScheme={
            config.isEntryPoint ? 'yellow' : config.icon ? 'orange' : config.name.includes('Ask') ? 'red' : 'green'
          }
          onClick={() => onToggle(index)}
          leftIcon={
            config.isEntryPoint ? (
              config.visible ? (
                <FaLocationCrosshairs />
              ) : (
                <FaLocationDot />
              )
            ) : config.icon ? (
              config.icon
            ) : config.visible ? (
              <FaCircle />
            ) : (
              <FaRegCircle />
            )
          }
          borderStyle={config.lineStyle === LineStyle.Dashed ? 'dashed' : 'solid'}
          sx={{
            ...(config.visible && {
              bg: config.color,
              _hover: {
                bg: config.color,
                opacity: 0.8,
              },
            }),
            ...(config.lineStyle === LineStyle.Dashed &&
              config.visible && {
                background: `repeating-linear-gradient(
                  45deg,
                  ${config.color},
                  ${config.color} 10px,
                  ${config.color}dd 10px,
                  ${config.color}dd 20px
                )`,
              }),
          }}
        >
          {config.name}
        </Button>
      </WrapItem>
    ))}
  </Wrap>
);
