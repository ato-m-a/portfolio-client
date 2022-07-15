import { FC, ComponentType, useState, useEffect } from 'react';
import useTheme from '../../hooks/theme/useTheme';

const WithTheme = <P extends any>(Component: ComponentType<P & any>): FC<P & any> => {
  const WrappedComponent = (props?: any) => {
    useTheme();

    return (
      <Component {...props} />
    )
  };

  return WrappedComponent;
}

export default WithTheme;