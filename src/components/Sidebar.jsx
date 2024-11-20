import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UserIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
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
      icon: HomeIcon
    },
    {
      name: t('navigation.organizations'),
      path: '/organizations',
      icon: BuildingOfficeIcon,
      subItems: countries.map(country => ({
        name: country.name,
        path: `/organizations/${country.id}`,
        icon: GlobeAltIcon
      }))
    },
    { 
      name: t('navigation.preAccounting'),
      path: '/pre-accounting',
      icon: DocumentTextIcon
    },
    {
      name: t('navigation.reports'),
      path: '/reports',
      icon: ChartBarIcon
    },
    {
      name: t('navigation.settings'),
      path: '/settings',
      icon: Cog6ToothIcon,
      subItems: [
        {
          name: t('settings.language.title'),
          path: '/settings/language',
          icon: LanguageIcon
        },
        {
          name: t('settings.items.title'),
          path: '/settings/items',
          icon: ListBulletIcon
        },
        {
          name: t('settings.users.title'),
          path: '/settings/users',
          icon: UserIcon
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
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const active = isActive(item.path);
    const Icon = item.icon;

    const paddingLeft = depth === 0 ? 'px-4' : 'px-8';

    return (
      <div key={item.path}>
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? () => toggleExpand(item.name) : undefined}
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
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('common.appName')}
          </span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5">
          <nav className="flex-1 space-y-1">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
