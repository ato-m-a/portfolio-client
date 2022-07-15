import { FC, ComponentType } from 'react';

import useThemeEffect from '../../hooks/theme/useThemeEffect';

const WithTheme = <P extends any>(Component: ComponentType<P & any>): FC<P & any> => {
  const WrappedComponent = (props?: any) => {
    useThemeEffect();

    return (
      <Component {...props} />
    )
  };

  return WrappedComponent;
}

export default WithTheme;