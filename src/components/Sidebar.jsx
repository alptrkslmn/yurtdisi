import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const countries = [
    { id: 'tr', name: 'Türkiye' },
    { id: 'de', name: 'Almanya' },
    { id: 'nl', name: 'Hollanda' },
  ];

  const menuItems = [
    { name: 'Özet', path: '/', icon: HomeIcon },
    { 
      name: 'Ülkeler',
      icon: GlobeAltIcon,
      submenu: countries.map(country => ({
        name: country.name,
        icon: GlobeAltIcon,
        countryId: country.id,
        submenu: [
          {
            name: 'Kurumlar',
            path: `/organizations/${country.id}`,
            icon: BuildingOfficeIcon
          }
        ]
      }))
    },
    { name: 'Kategoriler', path: '/categories', icon: TagIcon },
    { name: 'Gelir/Gider Kalemleri', path: '/items', icon: ListBulletIcon },
    { name: 'Raporlar', path: '/reports', icon: ChartBarIcon },
    { name: 'Ayarlar', path: '/settings', icon: Cog6ToothIcon }
  ];

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => {
      if (prev.includes(itemName)) {
        return prev.filter(item => item !== itemName);
      }
      return [...prev, itemName];
    });
  };

  const isExpanded = (itemName) => expandedItems.includes(itemName);

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item, depth = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const active = isActive(item.path) || 
      (hasSubmenu && item.submenu.some(subitem => 
        isActive(subitem.path) || 
        subitem.submenu?.some(subsubitem => isActive(subsubitem.path))
      ));

    const paddingLeft = depth === 0 ? 'px-6' : 
                       depth === 1 ? 'px-8' : 
                       'px-10';

    if (hasSubmenu) {
      return (
        <div key={item.name} className="py-1">
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`w-full flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${paddingLeft} ${
              active
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="flex-1 text-left">{item.name}</span>
            {isExpanded(item.name) ? (
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            )}
          </button>

          {isExpanded(item.name) && (
            <div className="mt-1 space-y-1">
              {item.submenu.map(subitem => renderMenuItem(subitem, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    if (!item.path) {
      return (
        <div
          key={item.name}
          className={`flex items-center py-2.5 text-sm font-medium ${paddingLeft} text-gray-600 dark:text-gray-400`}
        >
          <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
          {item.name}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${paddingLeft} ${
          active
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-6">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Hudayi Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/32x32";
              }}
            />
            <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              Hudayi
            </span>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
