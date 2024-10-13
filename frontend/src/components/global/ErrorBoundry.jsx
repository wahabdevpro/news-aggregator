import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI on error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error (you can send this to a logging service)
    console.error('Error caught by ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error is caught
      return <h1 style={{textAlign: "center"}}>Something went wrong.</h1>;
    }

    // Render children if no error occurred
    return this.props.children; 
  }
}

export default ErrorBoundary;
