import React, { useState, useEffect } from 'react';
import { 
  SunIcon, 
  MoonIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  UserIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Header = ({ darkMode, setDarkMode }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Yeni rapor oluşturuldu', time: '5 dakika önce' },
    { id: 2, message: 'Sistem güncellendi', time: '1 saat önce' },
  ]);

  useEffect(() => {
    console.log('Dark mode state:', darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    console.log('Toggling dark mode from:', darkMode, 'to:', !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Hudayi Logo"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Karanlık Mod Toggle */}
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                dark:hover:bg-gray-600 transition-all duration-200 ease-in-out"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 text-amber-400 hover:text-amber-500 
                  transition-colors duration-200" />
              ) : (
                <MoonIcon className="h-5 w-5 text-cyan-500 hover:text-cyan-600 
                  transition-colors duration-200" />
              )}
            </button>

            {/* Bildirimler */}
            <div className="relative">
              <button
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 
                  transition-colors duration-200 relative"
              >
                <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs font-medium 
                    bg-red-500 text-white rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Profil Menüsü */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                  transition-colors duration-200"
              >
                <img
                  className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  alt="Profil"
                />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Alp Tarık Budak
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Yönetici
                  </div>
                </div>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                  ring-1 ring-black ring-opacity-5 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Alp Tarık Budak
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      alptarik@example.com
                    </div>
                  </div>
                  
                  <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-700">
                    <UserIcon className="h-4 w-4 mr-3" />
                    Profil
                  </a>
                  
                  <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Cog6ToothIcon className="h-4 w-4 mr-3" />
                    Ayarlar
                  </a>
                  
                  <a href="#password" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-700">
                    <KeyIcon className="h-4 w-4 mr-3" />
                    Şifre Değiştir
                  </a>
                  
                  <div className="border-t border-gray-100 dark:border-gray-700">
                    <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 
                      hover:bg-gray-100 dark:hover:bg-gray-700">
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                      Çıkış Yap
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
