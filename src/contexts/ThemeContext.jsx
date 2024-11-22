import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_COLORS = ['blue', 'green', 'red', 'purple', 'orange', 'indigo'];

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentColor, setCurrentColor] = useState('blue'); // Default theme color

  useEffect(() => {
    // Check local storage for saved theme preferences
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedColor = localStorage.getItem('themeColor') || 'blue';
    
    setIsDarkMode(savedDarkMode);
    setCurrentColor(savedColor);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    // Apply saved theme color
    if (savedColor && THEME_COLORS.includes(savedColor)) {
      document.documentElement.classList.add(`theme-${savedColor}`);
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

  const setThemeColor = (color) => {
    if (!THEME_COLORS.includes(color)) return;
    
    setCurrentColor(color);
    localStorage.setItem('themeColor', color);
    
    // Remove all existing theme color classes
    const root = document.documentElement;
    THEME_COLORS.forEach(c => {
      root.classList.remove(`theme-${c}`);
    });
    
    // Add new theme color class
    root.classList.add(`theme-${color}`);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleDarkMode,
        currentColor,
        setThemeColor
      }}
    >
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

export default ThemeContext;
