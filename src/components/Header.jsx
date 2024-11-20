import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  SunIcon, 
  MoonIcon,
  UserIcon,
  GlobeAltIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const languageMenuRef = useRef(null);
  const userMenuRef = useRef(null);

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
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-end items-center space-x-4">
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
              }}
              className="inline-flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={t('common.menu.language')}
            >
              <GlobeAltIcon className="h-5 w-5" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5 z-50">
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
              }}
              className="inline-flex items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={t('common.menu.user')}
            >
              <UserIcon className="h-5 w-5" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5 z-50">
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
