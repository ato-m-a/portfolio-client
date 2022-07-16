import { useState, useCallback, useLayoutEffect } from 'react';

/* redux */
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTheme, enableLight, enableDark } from '../../store/reducers/theme';

const useTheme = () => {
  const dispatch = useAppDispatch();
    
  // redux local storage
  const localTheme = useAppSelector(selectTheme);
  const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useState<'dark' | 'light' | 'default'>(
    localTheme.theme !== 'default' ? localTheme.theme : osTheme
  );

  // toggle method
  const toggleTheme = useCallback(() => {
    // light => dark
    if (theme === 'light') {
      dispatch(enableDark());
    }
    // dark => light
    else {
      dispatch(enableLight());
    }

    const contrastTheme = theme === 'dark' ? 'light' : 'dark';
    const themeColor = theme === 'dark' ? '#fff' : '#252525';

    document.querySelector('meta[name=theme-color]').setAttribute('content', themeColor);
    document.getElementById('theme_provider').setAttribute('data-theme', contrastTheme);
    document.cookie = `theme=${contrastTheme}; path=/`;
    setTheme(contrastTheme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return [theme, toggleTheme] as const;
};

export default useTheme;