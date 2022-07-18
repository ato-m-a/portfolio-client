import { ReactElement, useState, useEffect } from 'react';
import { animated, useTransition } from 'react-spring';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

/* icons */
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ToggleButton = (): ReactElement => {
  const [theme, setTheme] = useState<string>(null);
  useEffect(() => {
    const localtheme = localStorage.getItem('theme');
    if (localtheme) {
      setTheme(localtheme);
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  const setThemeAttributes = (value: 'dark' | 'light') => {
    const themeColor = value === 'dark' ? '#252525' : '#fff';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    setTheme(value);
  }

  const toggleTheme = () => {
    // dark => light
    if (theme === 'dark') {
      setThemeAttributes('light');
    // light => dark
    } else {
      setThemeAttributes('dark');
    }
  }

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