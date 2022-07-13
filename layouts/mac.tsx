import { ReactNode, ReactElement, Fragment } from 'react';
import Head from 'next/head';

type AppProps = {
  children: ReactNode;
};

/* components */
import MacHeader from '../components/layouts/mac/mac-header';
import MacDocker from '../components/layouts/mac/mac-docker';

/* styles */
import styles from '../styles/home.module.scss';

const MacLayout = ({ children }: AppProps): ReactElement => {
  return (
    <Fragment>
      <Head>
        <link rel="preload" href="/images/icon_system.svg" type="image/svg+xml" as="image" />
        <link rel="preload" href="/images/icon_terminal_cute.svg" type="image/svg+xml" as="image" />
        <link rel="preload" href="/images/background.jpeg" type="image/jpeg" as="image" />
        <link rel="preload" href="/images/background-light.jpeg" type="image/jpeg" as="image" />
      </Head>
      <MacHeader />
      <main className={styles.home}>
        {children}
      </main>
      <MacDocker />
    </Fragment>
  )
};

export default MacLayout;
