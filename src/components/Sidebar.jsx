import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UserIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { PERMISSIONS } from '../constants/permissions';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState([]);

  const countries = [
    { id: 'tr', name: t('countries.turkey') },
    { id: 'de', name: t('countries.germany') },
    { id: 'nl', name: t('countries.netherlands') },
  ];

  const menuItems = [
    {
      name: t('navigation.dashboard'),
      path: '/',
      icon: HomeIcon,
      permission: null // Herkes görebilir
    },
    {
      name: t('navigation.countries'),
      path: '/countries',
      icon: GlobeAltIcon,
      permission: PERMISSIONS.COUNTRY.VIEW,
      subItems: hasPermission(PERMISSIONS.COUNTRY.VIEW) ? countries.map(country => ({
        name: country.name,
        path: `/countries/${country.id}`,
        icon: GlobeAltIcon,
        permission: PERMISSIONS.COUNTRY.VIEW
      })) : []
    },
    { 
      name: t('navigation.preAccounting'),
      path: '/pre-accounting',
      icon: DocumentTextIcon,
      permission: PERMISSIONS.ACCOUNTING.VIEW
    },
    {
      name: t('navigation.reports'),
      path: '/reports',
      icon: ChartBarIcon,
      permission: PERMISSIONS.REPORT.VIEW
    },
    {
      name: t('navigation.settings'),
      path: '/settings',
      icon: Cog6ToothIcon,
      permission: PERMISSIONS.SETTINGS.VIEW,
      subItems: [
        {
          name: t('settings.language.title'),
          path: '/settings/language',
          icon: LanguageIcon,
          permission: PERMISSIONS.SETTINGS.VIEW
        },
        {
          name: t('settings.users.title'),
          path: '/settings/users',
          icon: UserIcon,
          permission: PERMISSIONS.USER.VIEW
        }
      ]
    }
  ];

  const toggleExpand = (itemName) => {
    setExpandedItems(prev => {
      if (prev.includes(itemName)) {
        return prev.filter(item => item !== itemName);
      }
      return [...prev, itemName];
    });
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item, depth = 0) => {
    // Eğer item için yetki gerekiyorsa ve kullanıcının yetkisi yoksa, gösterme
    if (item.permission && !hasPermission(item.permission)) {
      return null;
    }

    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const active = isActive(item.path);
    const Icon = item.icon;

    const paddingLeft = depth === 0 ? 'px-4' : 'px-8';

    return (
      <div key={item.path}>
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? (e) => {
            e.preventDefault();
            toggleExpand(item.name);
          } : undefined}
          className={`flex items-center space-x-2 py-2 rounded-lg transition-colors duration-200 ${paddingLeft} ${
            active
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span className="flex-1">{item.name}</span>
          {hasSubItems && (
            isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )
          )}
        </Link>
        {hasSubItems && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.subItems.map(subItem => renderMenuItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('common.appName')}
          </span>
        </Link>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
