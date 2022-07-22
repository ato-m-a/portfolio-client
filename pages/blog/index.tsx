import { Page } from '../../types/page';
import { Fragment } from 'react';
import Head from 'next/head';

/* layout */
import GeneralLayout from '../../layouts/blog';

/* styles */
import styles from '../../styles/blog.module.scss';

/* components */
import Intro from '../../components/layouts/general/blog/main/intro';

const Blog: Page = () => {
  return (
    <Fragment>
      <Head>
        <title>Blog - 홍준혁</title>
      </Head>
      <main className={styles.blog}>
        <Intro />
      </main>
    </Fragment>
  )
};

Blog.layout = GeneralLayout;

export default Blog;