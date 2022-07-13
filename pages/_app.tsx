import type { AppContext, AppProps, AppInitialProps } from 'next/app';
import { NextComponentType } from 'next';
import { Fragment } from 'react';
import { Page } from '../types/page';
import { Provider } from 'react-redux';
import Head from 'next/head';
import store from '../store/index';
import axios from 'axios';

/* global style */
import '../styles/global.scss';

type Props = AppProps & {
  Component: Page;
}

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://xn--s55bw1vqg.com' : 'http://localhost:8000';
axios.defaults.withCredentials = true;

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? (page => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <Provider store={store}>
      <Head>
        <title>WEB FE 홍준혁 포트폴리오</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* preload */}
        <link rel="preload" href="/images/icon_system.svg" type="image/svg+xml" as="image" crossOrigin="anonymous" />
        <link rel="preload" href="/images/icon_terminal_cute.svg" type="image/svg+xml" as="image" crossOrigin="anonymous" />
        <link rel="preload" href="/images/background.jpeg" type="image/jpeg" as="image" crossOrigin="anonymous"/>
        <link rel="preload" href="/images/background-light.jpeg" type="image/jpeg" as="image" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SDGothicNEO/AppleSDGothicNeoB.ttf" type="font/ttf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SDGothicNEO/AppleSDGothicNeoL.ttf" type="font/ttf" as="font" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SDGothicNEO/AppleSDGothicNeoR.ttf" type="font/ttf" as="font" crossOrigin="anonymous" />
      </Head>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </Provider>
  )
}

export default MyApp;