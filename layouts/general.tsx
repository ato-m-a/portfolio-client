import { ReactNode, ReactElement, Fragment } from 'react';
import Head from 'next/head';

type AppProps = {
  children: ReactNode;
};

/* components */
import GeneralHeader from '../components/layouts/header';
import Docker from '../components/layouts/docker';

/* styles */
import styles from '../styles/home.module.scss';

const GeneralLayout = ({ children }: AppProps): ReactElement => {
  return (
    <Fragment>
      <Head>
        <title>홍준혁</title>
      </Head>
      <GeneralHeader />
      <main className={styles.home}>
        {children}
      </main>
      <Docker />
    </Fragment>
  )
};

export default GeneralLayout;
