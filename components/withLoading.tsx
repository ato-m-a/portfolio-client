import { FC, ComponentType, Fragment, useState } from 'react';
import { Page } from '../types/page';

type ComponentProps = {
  setLoading?: () => void;
}

/* loading component */
import Loading from './layouts/general/loading';

const WithLoading = <P extends object>(Component: Page<P & ComponentProps>): FC<P> => {
  const WrappedComponent = (props?: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (isLoading) {
      return (
        <Fragment>
          <Loading />
          <Component {...props} setLoading={() => setIsLoading(true)} />
        </Fragment>
      )
    } else {
      return <Component {...props} setLoading={() => setIsLoading(true)} />
    }
  };

  return WrappedComponent;
};

export default WithLoading;