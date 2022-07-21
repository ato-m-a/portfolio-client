import { ReactElement, useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  openModal: () => void;
}

/* styles */
import styles from '../../../styles/header.module.scss';

/* icons */
import { BsSearch } from 'react-icons/bs';

/* component */
import ToggleButton from './toggleButton';
import ContactMe from './contact';

const GeneralHeader = ({ openModal }: Props): ReactElement => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <header className={`${styles.header} ${styles.header__unfoldable}`}>
      <div className={styles.header__wrapper}>
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
          {ready && <ToggleButton />}
          <button type="button" className={styles.button_small}>
            <BsSearch />
          </button>
          <button type="button" className={styles.button_wide} onClick={openModal}>
            CONTACT
          </button>
        </div>
      </div>
    </header>
  )
};

export default GeneralHeader;