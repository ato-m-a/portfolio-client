import type { AppContext, AppProps, AppInitialProps } from 'next/app';
import { NextComponentType } from 'next';
import { Fragment, useEffect } from 'react';
import { Page } from '../types/page';
import { Provider } from 'react-redux';
import Head from 'next/head';
import store from '../store/index';
import axios from 'axios';
import * as cookie from 'cookie';

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

  let theme: string = pageProps.theme;
  // Link 통하여 route 이동 시
  if (theme === 'default' && typeof document !== 'undefined') {
    theme = cookie.parse(document.cookie).theme;
  }

  const themeColor: '#fff' | '#252525' | null =
    theme === 'default' ? null : 
    theme === 'light' ? '#fff' :
    '#252525';
  
  return (
    <Provider store={store}>
      <Head>
        {
          themeColor ? <meta name="theme-color" content={themeColor} />
          : 
          <Fragment>
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#252525" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          </Fragment>
        }
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div id="theme_provider" data-theme={theme ? theme : 'default'}>
        <Layout>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </div>
    </Provider>
  )
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  };

  const Cookie = ctx.req?.headers.cookie;
  const theme = Cookie ? cookie.parse(Cookie).theme : 'default';

  return { pageProps: { ...pageProps, theme } }
}

export default MyApp;