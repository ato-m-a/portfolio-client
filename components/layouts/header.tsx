import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { AppData } from '../../modules/appdata';
import Link from 'next/link';

/* components */
import StatusBar from './statusbar';

/* styles */
import styles from '../../styles/layout.module.scss';

/* icons */
import { AiFillHome } from 'react-icons/ai';

const GeneralHeader = (): ReactElement => {
  const router = useRouter();

  const pathname = router.pathname !== '/' ? AppData().filter(app => {
    return app.path === router.pathname;
  })[0].name : '홈페이지';

  return (
    <header className={styles.header}>
      <div className={styles.header__router}>
        <Link href={{ pathname: '/' }}>
          <div className={`${styles.header__home} ${styles.header__btn}`}>
            <AiFillHome />
          </div>
        </Link>
        <div className={`${styles.header__title} ${styles.header__btn}`} style={{ position: 'relative', right: '8px' }}>
          {pathname}
        </div>
      </div>
      <StatusBar />
    </header>
  )
};

export default GeneralHeader;