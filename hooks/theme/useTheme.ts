import { useState, useCallback } from 'react';

/* redux */
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTheme, enableLight, enableDark } from '../../store/reducers/theme';

const useTheme = () => {
  const dispatch = useAppDispatch();
    
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
    localStorage.setItem('theme', value);
    setTheme(value);
  }, [dispatch]);

  return [theme, toggleTheme] as const;
};

export default useTheme;