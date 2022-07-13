import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

const GeneralHeader = (): ReactElement => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link href={{ pathname: '/' }}>
          <div className={styles.header__left_home}>
            <Image src="/images/memoticon.png" alt="bear_logo" width={60} height={60} />
            <div className={styles.header__left_text}>
              ato-m-a
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
};

export default GeneralHeader;