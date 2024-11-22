import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_COLOR_KEY = 'theme-color';
const THEME_MODE_KEY = 'theme-mode';
const DEFAULT_THEME = 'blue';

export const AVAILABLE_THEMES = [
  { name: 'blue', icon: '🌊' },
  { name: 'indigo', icon: '💫' },
  { name: 'emerald', icon: '💚' },
  { name: 'teal', icon: '🌿' },
  { name: 'purple', icon: '💜' },
  { name: 'fuchsia', icon: '🌸' },
  { name: 'rose', icon: '🌹' },
  { name: 'amber', icon: '🌟' }
];

export function ThemeProvider({ children }) {
  // Tema rengi
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem(THEME_COLOR_KEY) || DEFAULT_THEME;
  });

  // Karanlık/Aydınlık mod
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem(THEME_MODE_KEY);
    return savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Sistem teması değişikliğini takip et
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem(THEME_MODE_KEY)) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Dark mode değişikliklerini uygula
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_MODE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_MODE_KEY, 'light');
    }
  }, [isDarkMode]);

  // Tema rengi değişikliklerini uygula
  useEffect(() => {
    // Önceki tema sınıflarını kaldır
    AVAILABLE_THEMES.forEach(theme => {
      document.documentElement.classList.remove(`theme-${theme.name}`);
    });
    // Yeni tema sınıfını ekle
    document.documentElement.classList.add(`theme-${currentTheme}`);
    localStorage.setItem(THEME_COLOR_KEY, currentTheme);
  }, [currentTheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setThemeColor = (color) => {
    setCurrentTheme(color);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, isDarkMode, toggleDarkMode, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
