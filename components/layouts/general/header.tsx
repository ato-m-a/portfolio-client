import { ReactElement, useEffect, useState } from 'react';
import store from '../../../store';
import Link from 'next/link';
import Image from 'next/image';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

/* icons */
import { BsSearch, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

/* redux */
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectTheme, enableLight, enableDark } from '../../../store/reducers/theme';

const GeneralHeader = (): ReactElement => {
  const dispatch = useAppDispatch();
  const storeTheme = useAppSelector(selectTheme);
  const [theme, setTheme] = useState<'dark' | 'light' | 'default'>(null);

  useEffect(() => {
    setTheme(storeTheme.theme);
  }, [storeTheme]);

  const toggleTheme = (value: 'dark' | 'light') => {
    // light => dark
    if (value === 'dark') {
      dispatch(enableDark());
    }
    // dark => light
    else {
      dispatch(enableLight());
    }
    document.getElementById('theme_provider').setAttribute('data-theme', value);
    document.cookie = `theme=${value};`;
    setTheme(value);
  }

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
        {
          // theme toggle button
          theme ?
          theme === 'dark'
          ?
          <button type="button" className={styles.button_small} onClick={() => toggleTheme('light')}>
            <BsFillMoonFill />
          </button>
          : 
          <button type="button" className={styles.button_small} onClick={() => toggleTheme('dark')}>
            <BsFillSunFill />
          </button>
          :<></>
        }
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