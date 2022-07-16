import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

/* icons */
import { BsSearch, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

/* component */
import ToggleButton from './toggleButton';

const GeneralHeader = (): ReactElement => {
  return (
    <header className={styles.header}>
      {/* 왼쪽 메인 버튼 */}
      <div className={styles.header__left}>
        <Link href={{ pathname: '/blog' }}>
          <div className={styles.header__left_home}>
            <Image src="/images/memoticon.svg" alt="bear_logo" width={60} height={60} />
            <div className={styles.header__left_text}>
              ato-m-a
            </div>
          </div>
        </Link>
      </div>
      {/* 오른쪽 홈 버튼 */}
      <div className={styles.header__right}>
        <ToggleButton />
        <button type="button" className={styles.button_small}>
          <BsSearch />
        </button>
        <button type="button" className={styles.button_wide}>
          CONTACT
        </button>
      </div>
    </header>
  )
};

export default GeneralHeader;