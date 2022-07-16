import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { enableDark, enableLight } from '../../store/reducers/theme';
import * as cookie from 'cookie';

const useThemeEffect = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storageTheme = localStorage.getItem('theme');
    const cookieTheme = document.cookie ? cookie.parse(document.cookie).theme : 'default';
    const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // if first visit
    if (!storageTheme) {
      localStorage.setItem('theme', osTheme);
      if (osTheme === 'dark') dispatch(enableDark());
      else dispatch(enableLight());
    } else {
      // store theme exists but cookie theme not exists(browser session expired)
      if (cookieTheme === 'default') {
        const themeColor = storageTheme === 'dark' ? '#252525' : '#fff';

        document.querySelector('meta[name=theme-color]').setAttribute('content', themeColor);
        document.getElementById('theme_provider').setAttribute('data-theme', storageTheme);
        document.cookie = `theme=${themeColor}; path=/`;
        localStorage.setItem('theme', themeColor);
      }
    }
  }, [dispatch]);
};

export default useThemeEffect;