import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { 
  SunIcon, 
  MoonIcon,
  UserIcon,
  GlobeAltIcon,
  CheckIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const { t, i18n } = useTranslation();
  const { currentTheme, updateTheme, themes } = useTheme();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const languageMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const themeSelectorRef = useRef(null);

  // Desteklenen diller
  const languages = [
    { 
      code: 'tr', 
      nativeName: 'Türkçe', 
      flag: '🇹🇷', 
      active: true,
      default: true,
      direction: 'ltr'
    },
    { 
      code: 'en', 
      nativeName: 'English', 
      flag: '🇬🇧', 
      active: true,
      default: false,
      direction: 'ltr'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target)) {
        setShowThemeSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
      document.documentElement.dir = languages.find(l => l.code === lng)?.direction || 'ltr';
      setShowLanguageMenu(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm fixed w-full top-0 right-0 h-16 z-40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-end items-center space-x-4">
          {/* Tema Seçici */}
          <div className="relative" ref={themeSelectorRef}>
            <button
              onClick={() => {
                setShowThemeSelector(!showThemeSelector);
                setShowLanguageMenu(false);
                setShowUserMenu(false);
              }}
              className="inline-flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={t('common.theme.select')}
            >
              <SwatchIcon className="h-5 w-5" />
            </button>

            {showThemeSelector && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('common.theme.select')}
                  </h3>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(themes || {}).map(([name, theme]) => (
                      <button
                        key={name}
                        onClick={() => {
                          updateTheme(name);
                          setShowThemeSelector(false);
                        }}
                        className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary}
                          ring-2 ring-offset-2 ${name === currentTheme ? 'ring-gray-400 scale-110' : 'ring-transparent'}
                          transform transition-all duration-200 hover:scale-110 hover:ring-gray-300`}
                      >
                        <span className="absolute -top-1 -right-1 text-xs">{theme.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gece Modu Butonu */}
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 
              hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
            aria-label={isDarkMode ? t('common.theme.light') : t('common.theme.dark')}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* Dil Seçici */}
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => {
                setShowLanguageMenu(!showLanguageMenu);
                setShowUserMenu(false);
                setShowThemeSelector(false);
              }}
              className="inline-flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={t('common.menu.language')}
            >
              <GlobeAltIcon className="h-5 w-5" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Dil Seçimi
                  </h3>
                </div>
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      disabled={!lang.active}
                      className={`w-full text-left px-4 py-2 text-sm
                        ${!lang.active && 'opacity-50 cursor-not-allowed'}
                        ${i18n.language === lang.code 
                          ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }
                        flex items-center justify-between
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {lang.default && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Varsayılan
                          </span>
                        )}
                        {i18n.language === lang.code && (
                          <CheckIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kullanıcı Menüsü */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowLanguageMenu(false);
                setShowThemeSelector(false);
              }}
              className="inline-flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={t('common.menu.user')}
            >
              <UserIcon className="h-5 w-5" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {t('common.settings')}
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {t('common.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;