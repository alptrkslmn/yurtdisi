import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, ChartBarIcon, GlobeAltIcon, BuildingOfficeIcon,
  CurrencyDollarIcon, Cog6ToothIcon, UserGroupIcon
} from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Genel Tablo', path: '/', icon: HomeIcon },
    { name: 'İstatistikler', path: '/statistics', icon: ChartBarIcon },
    { name: 'Ülkeler', path: '/countries', icon: GlobeAltIcon },
    { name: 'Kurumlar', path: '/institutions', icon: BuildingOfficeIcon },
    { name: 'İşlemler', path: '/transactions', icon: CurrencyDollarIcon },
    { name: 'Kullanıcılar', path: '/users', icon: UserGroupIcon },
    { name: 'Ayarlar', path: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-dark-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 transition-transform duration-300 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        bg-white dark:bg-dark-800 border-r border-dark-200 dark:border-dark-700`}>
        
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-200 dark:border-dark-700">
          <div className="text-xl font-bold text-primary-600">HUDAYI</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-5 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                    : 'text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700'
                  }`}
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-dark-800 border-b border-dark-200 dark:border-dark-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* User Menu */}
          <div className="flex items-center">
            <button className="p-2 rounded-md text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="ml-2 p-2 rounded-md text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="ml-2 relative">
              <button className="flex items-center space-x-4">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-dark-50 dark:bg-dark-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
