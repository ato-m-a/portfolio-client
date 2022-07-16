import type { AppContext, AppProps, AppInitialProps } from 'next/app';
import { NextComponentType } from 'next';
import { Fragment, useEffect, useState } from 'react';
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

  const [theme, setTheme] = useState<string>(pageProps.theme);
  const [themeColor, setThemeColor] = useState<string>('#252525');
  useEffect(() => {
    if (theme === 'default') {
      const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setThemeColor(osTheme === 'dark' ? '#252525' : '#fff');
    }
    else {
      setThemeColor(theme === 'dark' ? '#252525' : '#fff');
    }
  }, [theme]);

  useEffect(() => {
    if (pageProps.theme === 'default' && typeof document !== 'undefined') {
      document.cookie ? setTheme(cookie.parse(document.cookie).theme) : setTheme('default');
    }
  }, [pageProps]);
  
  return (
    <Provider store={store}>
      <Head>
        <meta name="theme-color" content={themeColor} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div id="theme_provider" data-theme={theme}>
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