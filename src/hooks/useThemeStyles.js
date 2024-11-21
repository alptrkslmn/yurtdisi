import { useTheme } from '../context/ThemeContext';

export const useThemeStyles = () => {
  const { currentTheme, themes } = useTheme();

  const getThemeClass = (property) => {
    if (!themes || !currentTheme || !themes[currentTheme]) return '';
    return themes[currentTheme][property] || '';
  };

  return {
    // Temel renkler
    primary: getThemeClass('primary'),
    secondary: getThemeClass('secondary'),
    accent: getThemeClass('accent'),
    ring: getThemeClass('ring'),

    // Hazır stil sınıfları
    button: `bg-gradient-to-r ${getThemeClass('primary')} text-white 
      focus:outline-none focus:ring-2 focus:ring-offset-2 ${getThemeClass('ring')}
      transform transition-all duration-200 hover:scale-105`,
    
    link: `${getThemeClass('secondary')} hover:underline`,
    
    card: `bg-white dark:bg-gray-800 shadow-sm hover:shadow-md 
      transition-all duration-200 border-l-4 ${getThemeClass('accent')}`,
    
    input: `border-gray-300 dark:border-gray-700 focus:ring-2 
      focus:ring-offset-2 ${getThemeClass('ring')} rounded-md`,
    
    badge: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      bg-gradient-to-r ${getThemeClass('primary')} text-white`,
    
    icon: `${getThemeClass('secondary')} hover:text-gray-700 dark:hover:text-gray-300`,
    
    // Gradient arka planlar
    gradientBg: `bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-800 ${getThemeClass('accent')}`,
  };
};
