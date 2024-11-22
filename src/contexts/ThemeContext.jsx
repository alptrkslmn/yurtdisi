import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentColor, setCurrentColor] = useState('#3B82F6'); // Default blue color

  useEffect(() => {
    // Check local storage for saved theme preferences
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedColor = localStorage.getItem('themeColor') || '#3B82F6';
    
    setIsDarkMode(savedDarkMode);
    setCurrentColor(savedColor);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', newValue);
      
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newValue;
    });
  };

  const changeColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('themeColor', color);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--color-primary-50', `${color}10`);
    document.documentElement.style.setProperty('--color-primary-100', `${color}20`);
    document.documentElement.style.setProperty('--color-primary-200', `${color}30`);
    document.documentElement.style.setProperty('--color-primary-300', `${color}40`);
    document.documentElement.style.setProperty('--color-primary-400', `${color}50`);
    document.documentElement.style.setProperty('--color-primary-500', color);
    document.documentElement.style.setProperty('--color-primary-600', `${color}D0`);
    document.documentElement.style.setProperty('--color-primary-700', `${color}B0`);
    document.documentElement.style.setProperty('--color-primary-800', `${color}90`);
    document.documentElement.style.setProperty('--color-primary-900', `${color}70`);
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      currentColor,
      changeColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
