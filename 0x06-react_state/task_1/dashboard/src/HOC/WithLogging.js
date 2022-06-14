import React from 'react';

const withLogging = (WrappedComponent) => {
  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'; 
  class WithLogging extends React.Component {
    isMounted() {
      console.log(`Component ${name} is mounted`);
    }

    isUnmouted() {
      console.log(`Component ${name} is going to unmount`);
    }

    componentDidMount() {
      this.isMounted;
    }

    componentWillUnmount() {
      this.isUnmouted;
    }
    render() {
      return <WrappedComponent />;
    }
  }
  return WithLogging;
};

WithLogging.displayName = `WithLogging(${WrappedComponent})`;

export default withLogging;
