import { ReactNode, ReactElement, Fragment, useRef, useEffect } from 'react';

type AppProps = {
  children: ReactNode;
};

/* components */
import GeneralHeader from '../components/layouts/general/header';
import FoldableHeader from '../components/layouts/general/headerFoldable';

const GeneralLayout = ({ children }: AppProps): ReactElement => {
  const headerRef = useRef(null);

  useEffect(() => {
    const scrollEvent = () => {
      const refCurrent = headerRef.current;
      const current_scrollTop: number = window.scrollY;
      refCurrent.onScrollEvent(current_scrollTop);
    };

    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    }
  }, []);

  return (
    <Fragment>
      <FoldableHeader ref={headerRef} />
      <GeneralHeader />
      {children}
    </Fragment>
  )
};

export default GeneralLayout;