import { useState, useCallback } from 'react';

export const useTheme = () => {
  const os = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const local = localStorage.getItem('theme');

  const [theme, setTheme] = useState<string>(local ? local : os);

  const setThemeAttributes = useCallback((value: 'dark' | 'light') => {
    const themeColor = value === 'dark' ? '#252525' : '#fff';
    const themeColorMetaTags = document.querySelectorAll('meta[name="theme-color"]');
    themeColorMetaTags.forEach(metaTag => {
      metaTag.setAttribute('content', themeColor);
    });

    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    setTheme(value);
  }, []);

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