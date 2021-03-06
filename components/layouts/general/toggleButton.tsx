import { ReactElement } from 'react';
import { animated, useTransition } from 'react-spring';

/* styles */
import styles from '../../../styles/header.module.scss';

/* icons */
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

/* custom hook */
import { useTheme } from '../../../hooks/theme/useTheme';

const ToggleButton = (): ReactElement => {
  const [theme, toggleTheme] = useTheme();

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
              <animated.div style={style} className={`${styles.svg_wrapper} ${styles.svg_wrapper_sun}`}>
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