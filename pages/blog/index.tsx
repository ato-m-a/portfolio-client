import { Page } from '../../types/page';

/* layout */
import GeneralLayout from '../../layouts/blog';

/* styles */
import styles from '../../styles/blog.index.module.scss';

const Blog: Page = () => {
  return (
    <main className={styles.blog}>

    </main>
  )
};

Blog.layout = GeneralLayout;

export default Blog;