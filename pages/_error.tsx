import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  message: string;
  statusCode: number;
}

/* styles */
import styles from '../styles/error.module.scss';

/* icons */
import { GoMarkGithub } from 'react-icons/go';

/* components */
import GeneralHeader from '../components/layouts/general/header';

const ErrorPage: NextPage<Props> = ({ message, statusCode }) => {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>홍준혁</title>
        <link rel="preload" href="/fonts/FiraCode/FiraCode-Regular.woff" type="font/woff" as="font" crossOrigin="anonymous" />
      </Head>
      <GeneralHeader />
      <main className={styles.error}>
        {/* statusCode */}
        <section className={styles.error__statusCode}>
          <h1>
            {statusCode}
          </h1>
        </section>
        {/* message */}
        <section className={styles.error__body}>
          <article className={styles.error__message}>
            {
              statusCode === 404
              ? // if statusCode === 404
              <Fragment>
                <p className={styles.error__message_code}>
                  Error: 404 (Not Found)
                </p>
                <p>
                  여기엔 아무것도 없네요 🤨
                </p>
                <div className={styles.error__btnzone}>
                  <Link href={{ pathname: '/' }} replace>
                    <button type="button">홈으로</button>
                  </Link>
                  <button type="button" onClick={() => router.back()}>뒤로가기</button>
                </div>
              </Fragment>
              : // else
              <Fragment>
                <p className={styles.error__message_code}>
                  이런! 예기치 못한 문제가 발생했어요 😢
                </p>
                <p>
                  잠시 후에 다시 시도해주시거나
                </p>
                <p>
                  제 깃허브에 놀러 와 주실래요? ☕️
                </p>
                <div className={styles.error__btnzone}>
                  <a href="https://github.com/ato-m-a" rel="noreferrer">
                    <button type="button">
                      <GoMarkGithub /> 깃허브
                    </button>
                  </a>
                </div>
              </Fragment>
            }
          </article>
        </section>
      </main>
    </Fragment>
  )
};

ErrorPage.getInitialProps = ({ req, res, err }): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err.message;

  return { statusCode, message };
};

export default ErrorPage;