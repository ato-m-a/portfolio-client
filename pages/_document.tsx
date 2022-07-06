import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="홍준혁 포트폴리오" />
        <meta name="keywords" content="포트폴리오, nextjs, nestjs, pwa" />
        <meta name="theme-color" content="#fff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/images/background.jpeg" as="image" />
        <link rel="preload" href="/images/terminal.png" as="image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
};

export default Document;