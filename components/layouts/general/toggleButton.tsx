import { ReactElement } from 'react';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

/* icons */
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

/* theme hook */
import useTheme from '../../../hooks/theme/useTheme';

const ToggleButton = (): ReactElement => {
  const [theme, toggleTheme] = useTheme();
  console.log(theme);

  return (
    <button type="button" className={styles.button_small} onClick={
      () => theme === 'dark' ? toggleTheme('light') : toggleTheme('dark')
    }>
      {theme === 'dark' && <BsFillMoonFill />}
      {theme === 'light' && <BsFillSunFill />}
    </button>
  )
};

export default ToggleButton;