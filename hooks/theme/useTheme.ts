import { useState, useCallback, useLayoutEffect } from 'react';
import * as cookie from 'cookie';

/* redux */
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTheme, enableLight, enableDark } from '../../store/reducers/theme';

const useTheme = () => {
  // const dispatch = useAppDispatch();
    
  // redux local storage
  // const localTheme = useAppSelector(selectTheme);
  const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  // const [theme, setTheme] = useState<'light' | 'dark' | 'default'>(
  //   localTheme.theme !== 'default' ? localTheme.theme : osTheme
  // );
  const [theme, setTheme] = useState<string>(
    document.cookie 
      ? cookie.parse(document.cookie).theme && cookie.parse(document.cookie).theme
      : osTheme
  );

  // toggle method
  const toggleTheme = useCallback(() => {
    // light => dark
    // if (theme === 'light') {
    //   dispatch(enableDark());
    // }
    // // dark => light
    // else {
    //   dispatch(enableLight());
    // }

    const contrastTheme = theme === 'dark' ? 'light' : 'dark';
    const themeColor = theme === 'dark' ? '#fff' : '#252525';

    document.querySelector('meta[name=theme-color]').setAttribute('content', themeColor);
    document.getElementById('theme_provider').setAttribute('data-theme', contrastTheme);
    document.cookie = `theme=${contrastTheme}; path=/;`;
    localStorage.setItem('theme', contrastTheme);
    setTheme(contrastTheme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, /*dispatch*/]);

  return [theme, toggleTheme] as const;
};

export default useTheme;