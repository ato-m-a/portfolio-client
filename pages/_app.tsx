import type { AppContext, AppProps, AppInitialProps } from 'next/app';
import { NextComponentType } from 'next';
import { Fragment} from 'react';
import { Page } from '../types/page';
import { Provider } from 'react-redux';
import store from '../store/index';
import axios from 'axios';

/* global style */
import '../styles/global.scss';

type Props = AppProps & {
  Component: Page;
}

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://xn--sr3b80m9nbq6ao9b.com' : 'http://localhost:8000';
axios.defaults.withCredentials = true;

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? (page => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <Provider store={store}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Provider>
  )
}

export default MyApp;