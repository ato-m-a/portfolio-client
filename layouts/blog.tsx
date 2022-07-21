import { ReactNode, ReactElement, Fragment, useState, UIEvent, useRef, useEffect } from 'react';
import Head from 'next/head';

type AppProps = {
  children: ReactNode;
};

/* components */
import GeneralHeader from '../components/layouts/general/header';
import FoldableHeader from '../components/layouts/general/headerFoldable';

/* styles */
import styles from '../styles/blog.module.scss';

const GeneralLayout = ({ children }: AppProps): ReactElement => {
  const [prevScrollTop, setPrevScrollTop] = useState<number>(0);
  const headerRef = useRef(null);

  const scrollEvent = (e: UIEvent) => {
    const current_scrollTop: number = e.currentTarget.scrollTop;
    headerRef.current.onScrollEvent({ prev: prevScrollTop, curr: current_scrollTop });

    setPrevScrollTop(current_scrollTop);
  };

  return (
    <Fragment>
      <Head>
        <title>Blog - 홍준혁</title>
      </Head>
      <main className={styles.blog} onScroll={scrollEvent}>
        <FoldableHeader ref={headerRef} />
        <GeneralHeader />
        {children}
      </main>
    </Fragment>
  )
};

export default GeneralLayout;