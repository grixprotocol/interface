/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { ErrorModal } from './ErrorModal';

type ErrorDetail = {
  message: string;
  origin: string; // Where the error originated from, e.g., "LoginComponent"
  additionalInfo?: any; // Any other information about the error
};

type GlobalErrorContextType = {
  error: ErrorDetail | null;
  triggerError: (errorDetail: ErrorDetail) => void;
};

const GlobalErrorContext = createContext<GlobalErrorContextType | undefined>(undefined);

type GlobalErrorProviderProps = {
  children: ReactNode;
};

export const GlobalErrorProvider: React.FC<GlobalErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<ErrorDetail | null>(null);

  if (error) {
    console.error(`Error from ${error.origin}: ${error.message}`);
    if (error.additionalInfo) {
      console.error('Additional Information:', error.additionalInfo);
    }
  }

  const triggerError = (errorDetail: ErrorDetail) => {
    setError(errorDetail);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <GlobalErrorContext.Provider value={{ error, triggerError }}>
      {children}
      <ErrorModal
        isOpen={!!error}
        message={error?.message || ''}
        additionalInfo={error?.additionalInfo || {}}
        origin={error ? (error.origin ? error.origin : '') : ''}
        onClose={handleErrorClose}
      />
    </GlobalErrorContext.Provider>
  );
};

export const useGlobalError = () => {
  const context = useContext(GlobalErrorContext);
  if (!context) {
    throw new Error('useGlobalError must be used within a GlobalErrorProvider');
  }
  return context;
};
