import React, { useState, useCallback, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Contexts
import { useAuth } from '../../../contexts/authContext';
import { useTheme } from '../../../contexts/themeContext';

// Constants & Assets
import { PERMISSIONS } from '../../../constants/permissions';
import hudayiLogo from '../../../assets/hudayi-logo.png';

import {
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  UserIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  const countries = [
    { id: 'TR', name: 'Türkiye' },
    { id: 'DE', name: 'Almanya' },
    { id: 'FR', name: 'Fransa' },
    { id: 'NL', name: 'Hollanda' },
    { id: 'BE', name: 'Belçika' }
  ];

  const menuItems = [
    {
      title: 'Menü',
      items: [
        {
          name: 'Gösterge Paneli',
          path: '/',
          icon: HomeIcon,
          permission: PERMISSIONS.DASHBOARD.VIEW
        },
        {
          name: 'Ülkeler',
          path: '/countries',
          icon: GlobeAltIcon,
          permission: PERMISSIONS.COUNTRY.VIEW,
          items: hasPermission(PERMISSIONS.COUNTRY.VIEW) ? countries.map(country => ({
            name: country.name,
            path: `/countries/${country.id}`,
            icon: BuildingOfficeIcon,
            permission: PERMISSIONS.COUNTRY.VIEW
          })) : []
        },
        {
          name: 'Ön Muhasebe',
          path: '/pre-accounting',
          icon: DocumentTextIcon,
          permission: PERMISSIONS.FINANCIAL.VIEW
        },
        {
          name: 'Raporlar',
          path: '/reports',
          icon: ChartBarIcon,
          permission: PERMISSIONS.REPORT.VIEW
        },
        {
          name: 'Ayarlar',
          path: '/settings',
          icon: Cog6ToothIcon,
          permission: PERMISSIONS.USER.VIEW
        }
      ]
    }
  ];

  const toggleExpand = useCallback((path) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  }, []);

  const isActiveItem = useCallback((path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const renderMenuItem = useCallback(({ item, level = 0 }) => {
    const Icon = item.icon;
    const hasSubItems = item.items && item.items.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const isItemActive = isActiveItem(item.path);
    
    return (
      <div key={item.path} className={`transition-all duration-200 ease-in-out ${level > 0 ? 'ml-4' : ''}`}>
        <NavLink
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? (e) => {
            e.preventDefault();
            !isCollapsed && toggleExpand(item.path);
          } : undefined}
          className={`flex items-center px-2 py-2 text-sm font-medium rounded-md
            ${isItemActive 
              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-100' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50'}
            ${isCollapsed ? 'justify-center' : 'justify-between'}
            group transition-all duration-200`}
          title={isCollapsed ? item.name : undefined}
        >
          <div className="flex items-center min-w-0">
            {Icon && (
              <Icon className={`h-5 w-5 ${!isCollapsed && 'mr-3'} flex-shrink-0
                ${isItemActive 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'}`}
              />
            )}
            {!isCollapsed && <span className="truncate">{item.name}</span>}
          </div>
          {hasSubItems && !isCollapsed && (
            <div className="ml-auto pl-3 flex-shrink-0">
              {isExpanded ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          )}
        </NavLink>
        
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.items.map((subItem) => renderMenuItem({ item: subItem, level: level + 1 }))}
          </div>
        )}
      </div>
    );
  }, [expandedItems, isActiveItem, toggleExpand, isCollapsed]);

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out 
        ${isCollapsed ? 'w-16' : 'w-64'}
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-[8px]
        border-r border-gray-200/80 dark:border-gray-700/80
        shadow-lg
        flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
        <img 
          src={hudayiLogo} 
          alt="Hüdayi Vakfı" 
          className="h-8 w-auto transition-all duration-300" 
        />
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={toggleCollapse}
        className={`absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          rounded-full shadow-md 
          flex items-center justify-center
          text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300
          transition-all duration-200 
          hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500
          group z-50`}
      >
        <ChevronLeftIcon 
          className={`h-5 w-5 transition-transform duration-200 
            ${isCollapsed ? 'rotate-180' : ''} 
            group-hover:scale-110`} 
        />
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="px-3 py-4 space-y-1">
          {menuItems.map((group) => (
            <div key={group.title} className="space-y-1">
              {!isCollapsed && (
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
              )}
              {group.items.map((item) => renderMenuItem({ item }))}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default memo(Sidebar);
