import { useState, useEffect } from 'react';

/* redux */
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTheme, enableLight, enableDark } from '../../store/reducers/theme';

const useTheme = () => {
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState<'dark' | 'light' | 'default'>(null);
  const localTheme = useAppSelector(selectTheme);

  useEffect(() => {
    setTheme(localTheme.theme);
  }, [localTheme]);

  const toggleTheme = (value: 'dark' | 'light') => {
    // light => dark
    if (value === 'dark') {
      dispatch(enableDark());
    }
    // dark => light
    else {
      dispatch(enableLight());
    }
    document.getElementById('theme_provider').setAttribute('data-theme', value);
    document.cookie = `theme=${value};`;
    setTheme(value);
  }

  useEffect(() => {
    if (theme === 'default') {
      const localTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
      toggleTheme(localTheme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return [theme, toggleTheme] as const;
};

export default useTheme;