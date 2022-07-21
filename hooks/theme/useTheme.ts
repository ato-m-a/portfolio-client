import { useState, useEffect, useCallback } from 'react';

/* redux */
import { useAppDispatch } from '../../store/hooks';
import { updateTheme } from '../../store/reducers/theme';
import store from '../../store';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const os = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const local = localStorage.getItem('theme');

  const [theme, setTheme] = useState<string>(local ? local : os);
  useEffect(() => {
    const subscription = store.subscribe(() => {
      const theme = store.getState().theme;
      if (theme.theme !== 'default') setTheme(theme.theme);
    });
    return () => subscription();
  }, []);

  const setThemeAttributes = useCallback((value: 'dark' | 'light') => {
    const themeColor = value === 'dark' ? '#252525' : '#fff';
    const themeColorMetaTags = document.querySelectorAll('meta[name="theme-color"]');
    themeColorMetaTags.forEach(metaTag => {
      metaTag.setAttribute('content', themeColor);
    });

    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    setTheme(value);
    dispatch(updateTheme(value));
  }, [dispatch]);

  const toggleTheme = useCallback(() => {
    // dark => light
    if (theme === 'dark') {
      setThemeAttributes('light');
    // light => dark
    } else {
      setThemeAttributes('dark');
    }
  }, [theme, setThemeAttributes]);

  return [theme, toggleTheme] as const;
};