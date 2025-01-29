import { Component, ErrorInfo } from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  errorMessage: '';
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(errorInfo);
    this.logErrorToServices(error.toString(), errorInfo.componentStack);
  }

  logErrorToServices = console.log;

  render() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>;
    }

    return this.props.children;
  }
}
