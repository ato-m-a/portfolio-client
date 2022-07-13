import { ReactNode, ReactElement, Fragment } from 'react';
import Head from 'next/head';

type AppProps = {
  children: ReactNode;
};

/* components */
import GeneralHeader from '../components/layouts/general/header';

const GeneralLayout = ({ children }: AppProps): ReactElement => {
  return (
    <Fragment>
      <Head>
        <title>Blog - 홍준혁</title>
      </Head>
      <GeneralHeader />
      {children}
    </Fragment>
  )
};

export default GeneralLayout;