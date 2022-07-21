import { forwardRef, useEffect, useState, Fragment, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type OnScrollEventProps = {
  prev: number;
  curr: number;
}

/* styles */
import styles from '../../../styles/header.module.scss';

/* icons */
import { BsSearch } from 'react-icons/bs';

/* component */
import ToggleButton from './toggleButton';
import ContactMe from './contact';

const FoldableHeader = forwardRef((props, ref) => {
  const [marginTop, setMarginTop] = useState<number>(-60);
  useImperativeHandle(ref, () => ({
    onScrollEvent: ({ prev, curr }: OnScrollEventProps): void => {
      // down
      if (curr < prev && curr > 60) {
        setMarginTop(marginTop + 6 <= 0 ? marginTop + 6 : 0);
      }
      // up 
      else {
        if (curr <= 60) {
          setMarginTop(-60);
        } else {
          setMarginTop(marginTop - 6 >= -60 ? marginTop - 6 : -60);
        }
      }
    }
  }));

  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);

  // for contact modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalClose = () => {
    setModalOpen(false);
  }

  return (
    <Fragment>
      <header className={`${styles.header} ${styles.header__foldable}`} style={{ marginTop }}>
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
            <button type="button" className={styles.button_wide} onClick={() => setModalOpen(true)}>
              CONTACT
            </button>
          </div>
        </div>
      </header>
      <ContactMe open={modalOpen} close={modalClose} />
    </Fragment>
  )
});

FoldableHeader.displayName = 'FoldableHeader';

export default FoldableHeader;