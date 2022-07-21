import { ReactNode, ReactElement, Fragment, useState, useRef, useEffect } from 'react';
import Head from 'next/head';

type AppProps = {
  children: ReactNode;
};

/* components */
import GeneralHeader from '../components/layouts/general/header';
import FoldableHeader from '../components/layouts/general/headerFoldable';
import ContactMe from '../components/layouts/general/contact';

/* styles */
import styles from '../styles/blog.module.scss';

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

  // for contact modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      <Head>
        <title>Blog - 홍준혁</title>
      </Head>
      <ContactMe open={modalOpen} close={modalClose} />
      <main className={styles.blog}>
        <FoldableHeader openModal={() => setModalOpen(true)} ref={headerRef} />
        <GeneralHeader openModal={() => setModalOpen(true)} />
        {children}
      </main>
    </Fragment>
  )
};

export default GeneralLayout;