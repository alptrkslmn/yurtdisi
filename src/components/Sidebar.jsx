import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TagIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Özet', path: '/', icon: HomeIcon },
    { name: 'Kurumlar', path: '/organizations', icon: BuildingOfficeIcon },
    { name: 'Ülkeler', path: '/countries', icon: GlobeAltIcon },
    { name: 'Kategoriler', path: '/categories', icon: TagIcon },
    { name: 'Raporlar', path: '/reports', icon: ChartBarIcon },
    { name: 'Ayarlar', path: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Hudayi Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/32x32";
              }}
            />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              Hudayi
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      isActive
                        ? 'text-gray-500 dark:text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
