import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  SunIcon, 
  MoonIcon,
  UserIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const languageMenuRef = useRef(null);
  const userMenuRef = useRef(null);

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageMenu(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16 items-center space-x-4">
          {/* Gece Modu Butonu */}
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 
              hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
            aria-label="Gece/Gündüz Modu"
          >
            {isDarkMode ? (
              <>
                <SunIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">{t('common.lightMode')}</span>
              </>
            ) : (
              <>
                <MoonIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">{t('common.darkMode')}</span>
              </>
            )}
          </button>

          {/* Dil Seçici */}
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => {
                setShowLanguageMenu(!showLanguageMenu);
                setShowUserMenu(false);
              }}
              className="inline-flex items-center px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Dil Seçimi"
            >
              <LanguageIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">
                {i18n.language === 'tr' ? 'Türkçe' : 'English'}
              </span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5 z-50 transform opacity-100 scale-100 transition-all duration-200">
                <button
                  onClick={() => changeLanguage('tr')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Türkçe
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  English
                </button>
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
              className="inline-flex items-center px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 
                hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Kullanıcı Menüsü"
            >
              <UserIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{t('common.profile')}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white dark:bg-gray-700 
                ring-1 ring-black ring-opacity-5 z-50 transform opacity-100 scale-100 transition-all duration-200">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {t('common.settings')}
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
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
