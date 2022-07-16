import { useState, useEffect, useCallback } from 'react';
import * as cookie from 'cookie';

/* redux */
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTheme, enableLight, enableDark } from '../../store/reducers/theme';

const useTheme = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState<boolean>(false);

  // cookie
  const cookieTheme = typeof document !== 'undefined' && document.cookie ?
    cookie.parse(document.cookie).theme : 'default';
    
  // redux local storage
  const localTheme = useAppSelector(selectTheme);
  const [theme, setTheme] = useState<'dark' | 'light' | 'default'>(localTheme.theme);

  // toggle method
  const toggleTheme = useCallback((value: 'dark' | 'light') => {
    // light => dark
    if (value === 'dark') {
      dispatch(enableDark());
    }
    // dark => light
    else {
      dispatch(enableLight());
    }

    const themeColor = value === 'dark' ? '#252525' : '#fff';

    document.querySelector('meta[name=theme-color]').setAttribute('content', themeColor);
    document.getElementById('theme_provider').setAttribute('data-theme', value);
    document.cookie = `theme=${value}; path=/`;
    setTheme(value);
  }, [dispatch]);

  // at first visit
  useEffect(() => {
    if (theme === 'default' || cookieTheme === 'default') {
      const localTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
      toggleTheme(localTheme);
      setTheme(localTheme);
    }
    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return [theme, toggleTheme, isReady] as const;
};

export default useTheme;