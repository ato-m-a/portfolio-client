import { useState, useEffect, useMemo } from 'react';
import * as cookie from 'cookie';
import useTheme from './useTheme';

const useThemeEffect = () => {
  const [windowReady, setWindowReady] = useState<boolean>(false);
  useEffect(() => {
    setWindowReady(true);
  }, [])

  const [theme, toggleTheme] = useTheme();

  const cookieTheme = useMemo(() => {
    if (windowReady) {
      return typeof document !== 'undefined' && document.cookie ?
      cookie.parse(document.cookie).theme : 'default';
    } else {
      return false;
    }
  }, [windowReady]);
  const osTheme = useMemo(() => {
    if (windowReady) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      return 'light';
    }
  }, [windowReady]);

  // after theme setted
  useEffect(() => {
    if (cookieTheme) {
      // if it's first visit
      if (theme === 'default') {
        toggleTheme(osTheme);
      } else {
        // or if session out
        if (cookieTheme === 'default') {
          toggleTheme(theme);
        }
      }
    }
    
  }, [theme, cookieTheme, osTheme, toggleTheme]);
}

export default useThemeEffect;