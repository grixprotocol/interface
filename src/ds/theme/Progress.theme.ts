import { defineStyleConfig } from '@chakra-ui/react';

import { colors } from './colors.theme';

export const progressTheme = defineStyleConfig({
  baseStyle: {
    track: {
      bg: 'black',
    },
    filledTrack: {
      bg: colors.blue[500],
    },
  },
});
