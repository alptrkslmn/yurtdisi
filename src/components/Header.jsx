import React, { useState, useEffect, useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { 
  SunIcon, 
  MoonIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import ThemeCustomizer from './Header/ThemeCustomizer';

const Header = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed w-full md:pl-64 top-0 z-20">
      <div className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        {/* Sol taraf - Başlık */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            {t('navigation.dashboard')}
          </h1>
        </div>

        {/* Sağ taraf - Tema ve Kullanıcı */}
        <div className="flex items-center space-x-4">
          {/* Tema Rengi */}
          <ThemeCustomizer />

          {/* Tema Değiştirme */}
          <button
            onClick={toggleDarkMode}
            className="header-button group transition-all duration-200 ease-in-out"
            aria-label={isDarkMode ? t('common.theme.light') : t('common.theme.dark')}
          >
            <div className="relative w-6 h-6">
              <div className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${
                isDarkMode ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
              }`}>
                <MoonIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300" />
              </div>
              <div className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${
                isDarkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
              }`}>
                <SunIcon className="h-6 w-6 text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300" />
              </div>
            </div>
          </button>

          {/* Kullanıcı Menüsü */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="header-button group"
              id="user-menu"
              aria-haspopup="true"
              aria-expanded={showUserMenu}
            >
              <span className="sr-only">{t('header.openUserMenu')}</span>
              <div className="user-avatar transition-all duration-200 ease-in-out group-hover:ring-2 group-hover:ring-primary-500">
                <span className="text-sm font-medium">AÖ</span>
              </div>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div
                className="dropdown-menu transform opacity-100 scale-100 transition-all duration-200 ease-in-out"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <a
                  href="#profile"
                  className="dropdown-item group transition-colors duration-200"
                  role="menuitem"
                >
                  {t('header.profile')}
                </a>
                <a
                  href="#settings"
                  className="dropdown-item group transition-colors duration-200"
                  role="menuitem"
                >
                  {t('header.settings')}
                </a>
                <a
                  href="#signout"
                  className="dropdown-item group transition-colors duration-200"
                  role="menuitem"
                >
                  {t('header.logout')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);