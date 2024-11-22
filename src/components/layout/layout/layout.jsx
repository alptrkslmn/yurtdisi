import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import { useTheme } from '../../../contexts/themeContext';
import { useSidebar } from '../../../contexts/sidebarContext';

const Layout = () => {
  const { isDarkMode } = useTheme();
  const { sidebarWidth } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <Sidebar />
      <Header />
      
      <main 
        className="transition-all duration-300 ease-in-out pt-16 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-4">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
