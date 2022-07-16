import { ReactElement, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import * as cookie from 'cookie';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

/* icons */
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ToggleButton = (): ReactElement => {
  const [theme, setTheme] = useState<string>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    const os = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(document.cookie ? cookie.parse(document.cookie).theme && cookie.parse(document.cookie).theme : os)
    setMounted(true);
  }, []);
  
  const toggleTheme = () => {
    const contrastTheme = theme === 'dark' ? 'light' : 'dark';
    const themeColor = theme === 'dark' ? '#fff' : '#252525';

    document.querySelector('meta[name=theme-color]').setAttribute('content', themeColor);
    document.getElementById('theme_provider').setAttribute('data-theme', contrastTheme);
    document.cookie = `theme=${contrastTheme}; path=/`;
    localStorage.setItem('theme', contrastTheme);
    setTheme(contrastTheme);
  };

  const isDark = theme === 'dark';
  const transitions = useTransition(isDark, {
    initial: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    from: {
      transform: 'scale(0) rotate(-180deg)',
      opacity: 0,
    },
    enter: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0) rotate(180deg)',
      opacity: 0,
    },
    reverse: true,
  });

  if (!mounted) return null;

  return (
    <button type="button" className={styles.button_small} onClick={toggleTheme}>
      {
        transitions((style, item) => 
          item ? (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
              <animated.div style={style} className={styles.svg_wrapper}>
                <BsFillMoonFill />
              </animated.div>
            </div>
          ) : (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
              <animated.div style={style} className={styles.svg_wrapper}>
                <BsFillSunFill />
              </animated.div>
            </div>
          )
        )
      }
    </button>
  )
};

export default ToggleButton;