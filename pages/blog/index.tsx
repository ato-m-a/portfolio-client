import { Page } from '../../types/page';
import { Fragment } from 'react';

/* layout */
import GeneralLayout from '../../layouts/blog';

/* styles */
import styles from '../../styles/blog.index.module.scss';

/* components */
import Intro from '../../components/layouts/general/blog/main/intro';

const Blog: Page = () => {
  return (
    <Fragment>
      <Intro />
    </Fragment>
  )
};

Blog.layout = GeneralLayout;

export default Blog;