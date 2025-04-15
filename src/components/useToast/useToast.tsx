/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react';

import { getEnv } from '../../config';

export const useGrixToast = () => {
  const toast = useChakraToast();

  // Directly return the custom toast function for simplicity
  const customToast = (options: UseToastOptions) => {
    const env = getEnv();
    const { status } = options;
    const isDevOrDebug = env === 'dev' || env === 'debug';

    // For error messages outside dev/debug, log and return early
    if (status === 'error' && !isDevOrDebug) {
      console.error(`Error: ${options.title} - ${options.description}`);
      return;
    }

    // For all other cases, display the toast
    toast(options);
  };

  return customToast;
};
