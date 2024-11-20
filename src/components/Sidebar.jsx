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
    { id: 'tr', name: t('countries.tr') },
    { id: 'de', name: t('countries.de') },
    { id: 'nl', name: t('countries.nl') },
  ];

  const menuItems = [
    {
      name: t('navigation.dashboard'),
      path: '/',
      icon: HomeIcon,
      permission: PERMISSIONS.DASHBOARD.VIEW
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
      permission: PERMISSIONS.FINANCIAL.VIEW
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
      permission: PERMISSIONS.DASHBOARD.VIEW,
      subItems: [
        {
          name: t('settings.language.title'),
          path: '/settings/language',
          icon: LanguageIcon,
          permission: PERMISSIONS.DASHBOARD.VIEW
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

    const isExpanded = expandedItems.includes(item.name);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const Icon = item.icon;
    const isItemActive = isActive(item.path);

    return (
      <div key={item.path} className="mb-1">
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? () => toggleExpand(item.name) : undefined}
          className={`
            flex items-center px-4 py-2 text-sm font-medium rounded-md
            ${isItemActive ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 
              'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
            ${depth > 0 ? 'ml-6' : ''}
          `}
        >
          {Icon && <Icon className="mr-3 h-5 w-5" />}
          <span className="flex-1">{item.name}</span>
          {hasSubItems && (
            isExpanded ? (
              <ChevronDownIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )
          )}
        </Link>
        {hasSubItems && isExpanded && (
          <div className="mt-1">
            {item.subItems.map(subItem => renderMenuItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Hudayi Logo"
            />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
              Hudayi Yurtdışı
            </span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
