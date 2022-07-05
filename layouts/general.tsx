import { ReactElement, ReactNode, Fragment } from 'react';
import Head from 'next/head';

type PageProps = {
  children: ReactNode;
};

/* styles */
import styles from '../styles/home.module.scss';

/* components */
import GeneralHeader from '../components/layouts/header';
import Docker from '../components/layouts/docker';

const GeneralLayout = ({ children }: PageProps): ReactElement => {
  return (
    <Fragment>
      <Head>
        <title>홍준혁 포트폴리오</title>
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