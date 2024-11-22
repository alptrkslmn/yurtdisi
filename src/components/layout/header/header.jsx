import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/themeContext';
import { useAuth } from '../../../contexts/authContext';
import { useSidebar } from '../../../contexts/sidebarContext'; 
import { 
  SunIcon, 
  MoonIcon,
  BellIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode, setThemeColor } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const themeMenuRef = useRef(null);

  const themeColors = [
    { name: 'Mavi', value: 'blue', class: 'bg-blue-500' },
    { name: 'Yeşil', value: 'green', class: 'bg-green-500' },
    { name: 'Kırmızı', value: 'red', class: 'bg-red-500' },
    { name: 'Mor', value: 'purple', class: 'bg-purple-500' },
    { name: 'Turuncu', value: 'orange', class: 'bg-orange-500' },
    { name: 'Indigo', value: 'indigo', class: 'bg-indigo-500' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Header background and border */}
      <div 
        className="fixed top-0 right-0 h-16 z-40"
        style={{ 
          left: '256px',
          marginLeft: isCollapsed ? '-192px' : '0'
        }}
      >
        <div className="w-full h-full bg-white dark:bg-gray-800" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700" />
      </div>
      
      {/* Header content */}
      <header 
        className="fixed top-0 right-0 z-50" 
        style={{ 
          left: '256px',
          marginLeft: isCollapsed ? '-192px' : '0'
        }}
      >
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side - Title */}
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Alp Özel
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="header-button inline-flex items-center justify-center rounded-lg w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isDarkMode ? t('common.theme.light') : t('common.theme.dark')}
            >
              <div className="relative w-5 h-5">
                <div className={`absolute inset-0 transform transition-transform duration-500 ${isDarkMode ? 'rotate-0' : '-rotate-90 opacity-0'}`}>
                  <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className={`absolute inset-0 transform transition-transform duration-500 ${isDarkMode ? 'rotate-90 opacity-0' : 'rotate-0'}`}>
                  <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
            </button>

            {/* Theme Colors */}
            <div className="relative" ref={themeMenuRef}>
              <button 
                className="header-button inline-flex items-center justify-center rounded-lg w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700" 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                aria-label="Tema Rengi Seç"
              >
                <SwatchIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                      Tema Rengi
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {themeColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            setThemeColor(color.value);
                            setShowThemeMenu(false);
                          }}
                          className={`w-8 h-8 rounded-lg ${color.class} hover:ring-2 hover:ring-offset-2 hover:ring-${color.value}-500 transition-all duration-200`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="header-button inline-flex items-center justify-center rounded-lg w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                      Bildirimler
                    </div>
                    <div className="mt-2">
                      <a href="#" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-200">Yeni bir mesajınız var</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 dakika önce</p>
                      </a>
                      <a href="#" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-200">Başvurunuz onaylandı</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 saat önce</p>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                className="header-button inline-flex items-center justify-center rounded-lg w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700" 
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="h-8 w-8 rounded-lg overflow-hidden ring-2 ring-white dark:ring-gray-700">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profil" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="p-2">
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                      Alp Özel
                    </div>
                    <div className="mt-2">
                      <a href="/profile" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                        Profil
                      </a>
                      <a href="/settings" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                        Ayarlar
                      </a>
                      <button 
                        onClick={() => {/* Çıkış işlemi */}} 
                        className="w-full text-left block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;