/* eslint-disable no-console */
import React, { Component, ErrorInfo } from 'react';

import { ErrorModal } from './ErrorModal';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
  showModal: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, showModal: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message, showModal: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    // You can also send this error to your error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>{this.state.message}</h1>
          <ErrorModal
            isOpen={this.state.showModal}
            message={this.state.message || 'An error occurred'}
            onClose={() => this.setState({ showModal: false })}
            origin=""
          />
        </>
      );
    }

    return <>{this.props.children}</>;
  }
}
