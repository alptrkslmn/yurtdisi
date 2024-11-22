import React, { createContext, useState, useContext, useEffect } from 'react';

// Tema renkleri
export const themes = {
  blue: {
    primary: 'from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    secondary: 'text-blue-600 dark:text-blue-400',
    accent: 'bg-blue-100 dark:bg-blue-900/20',
    ring: 'focus:ring-blue-500',
    icon: '🌊'
  },
  indigo: {
    primary: 'from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700',
    secondary: 'text-indigo-600 dark:text-indigo-400',
    accent: 'bg-indigo-100 dark:bg-indigo-900/20',
    ring: 'focus:ring-indigo-500',
    icon: '💫'
  },
  emerald: {
    primary: 'from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700',
    secondary: 'text-emerald-600 dark:text-emerald-400',
    accent: 'bg-emerald-100 dark:bg-emerald-900/20',
    ring: 'focus:ring-emerald-500',
    icon: '💚'
  },
  teal: {
    primary: 'from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700',
    secondary: 'text-teal-600 dark:text-teal-400',
    accent: 'bg-teal-100 dark:bg-teal-900/20',
    ring: 'focus:ring-teal-500',
    icon: '🌿'
  },
  purple: {
    primary: 'from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700',
    secondary: 'text-purple-600 dark:text-purple-400',
    accent: 'bg-purple-100 dark:bg-purple-900/20',
    ring: 'focus:ring-purple-500',
    icon: '💜'
  },
  fuchsia: {
    primary: 'from-fuchsia-400 to-pink-600 hover:from-fuchsia-500 hover:to-pink-700',
    secondary: 'text-fuchsia-600 dark:text-fuchsia-400',
    accent: 'bg-fuchsia-100 dark:bg-fuchsia-900/20',
    ring: 'focus:ring-fuchsia-500',
    icon: '🌸'
  },
  rose: {
    primary: 'from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700',
    secondary: 'text-rose-600 dark:text-rose-400',
    accent: 'bg-rose-100 dark:bg-rose-900/20',
    ring: 'focus:ring-rose-500',
    icon: '🌹'
  },
  amber: {
    primary: 'from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600',
    secondary: 'text-amber-600 dark:text-amber-400',
    accent: 'bg-amber-100 dark:bg-amber-900/20',
    ring: 'focus:ring-amber-500',
    icon: '🌟'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Tema rengi
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme-color');
    return savedTheme || 'blue';
  });

  // Karanlık/Aydınlık mod
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Yazı boyutları
  const [fontSizes, setFontSizes] = useState(() => {
    const savedFontSizes = localStorage.getItem('font-sizes');
    return savedFontSizes ? JSON.parse(savedFontSizes) : {
      h1: 24,
      h2: 20,
      h3: 18,
      body: 16,
      small: 14,
      table: 14
    };
  });

  // Sistem teması değişikliğini takip et
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme-mode')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Dark mode değişikliklerini uygula
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [darkMode]);

  // Tema rengi değişikliklerini uygula
  useEffect(() => {
    localStorage.setItem('theme-color', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // CSS değişkenlerini güncelle
    const root = document.documentElement;
    root.style.setProperty('--primary-color', `var(--${currentTheme}-500)`);
    root.style.setProperty('--primary-color-light', `var(--${currentTheme}-400)`);
    root.style.setProperty('--primary-color-dark', `var(--${currentTheme}-600)`);
  }, [currentTheme]);

  // Yazı boyutları değişikliklerini kaydet
  useEffect(() => {
    localStorage.setItem('font-sizes', JSON.stringify(fontSizes));
  }, [fontSizes]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  const updateTheme = (newTheme) => setCurrentTheme(newTheme);
  
  const updateFontSizes = (newSizes) => setFontSizes(prev => ({ ...prev, ...newSizes }));

  const value = {
    currentTheme,
    updateTheme,
    themes,
    darkMode,
    toggleDarkMode,
    fontSizes,
    updateFontSizes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
