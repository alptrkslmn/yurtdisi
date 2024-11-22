import React, { useState, useCallback, memo } from 'react';
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
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentTextIcon,
  UserIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { PERMISSIONS } from '../constants/permissions';
import hudayiLogo from '../assets/hudayi-logo.png';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  const countries = [
    { id: 'TR', name: t('countries.TR') },
    { id: 'DE', name: t('countries.DE') },
    { id: 'FR', name: t('countries.FR') },
    { id: 'NL', name: t('countries.NL') },
    { id: 'BE', name: t('countries.BE') }
  ];

  const menuItems = [
    {
      title: 'navigation.menu',
      items: [
        {
          name: 'navigation.dashboard',
          path: '/',
          icon: HomeIcon,
          permission: PERMISSIONS.DASHBOARD.VIEW
        },
        {
          name: 'navigation.countries',
          path: '/countries',
          icon: GlobeAltIcon,
          permission: PERMISSIONS.COUNTRY.VIEW,
          items: hasPermission(PERMISSIONS.COUNTRY.VIEW) ? countries.map(country => ({
            name: `countries.${country.id}`,
            path: `/countries/${country.id}`,
            icon: BuildingOfficeIcon,
            permission: PERMISSIONS.COUNTRY.VIEW
          })) : []
        },
        {
          name: 'navigation.preAccounting',
          path: '/pre-accounting',
          icon: DocumentTextIcon,
          permission: PERMISSIONS.FINANCIAL.VIEW
        },
        {
          name: 'navigation.reports',
          path: '/reports',
          icon: ChartBarIcon,
          permission: PERMISSIONS.REPORT.VIEW
        },
        {
          name: 'navigation.settings',
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
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? (e) => {
            e.preventDefault();
            !isCollapsed && toggleExpand(item.path);
          } : undefined}
          className={`sidebar-item group ${isItemActive ? 'sidebar-item-active' : 'sidebar-item-inactive'} ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? t(item.name) : undefined}
        >
          {Icon && (
            <Icon className={`h-5 w-5 ${!isCollapsed && 'mr-3'} flex-shrink-0 transition-colors duration-200 
              ${isItemActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'}`}
            />
          )}
          {!isCollapsed && (
            <>
              <span className="flex-1 transition-colors duration-200">{t(item.name)}</span>
              {hasSubItems && (
                <div className="transition-transform duration-200">
                  {isExpanded ? (
                    <ChevronDownIcon className="h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5" />
                  )}
                </div>
              )}
            </>
          )}
        </Link>
        
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.items.map((subItem) => renderMenuItem({ item: subItem, level: level + 1 }))}
          </div>
        )}
      </div>
    );
  }, [expandedItems, isActiveItem, t, toggleExpand, isCollapsed]);

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out 
        ${isCollapsed ? 'w-16' : 'w-64'}
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-[8px]
        border-r border-gray-200/80 dark:border-gray-700/80
        shadow-lg`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <img src={hudayiLogo} alt="Hüdayi Vakfı" className={`h-8 w-auto transition-all duration-300 ${isCollapsed ? 'mr-0' : 'mr-2'}`} />
          {!isCollapsed && (
            <span className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
              Hüdayi
            </span>
          )}
        </div>
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
      <nav className={`flex-1 space-y-1 px-3 py-4 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {menuItems.map((group) => (
          <div key={group.title} className="sidebar-group">
            {!isCollapsed && (
              <h3 className="sidebar-group-title text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {t(group.title)}
              </h3>
            )}
            {group.items.map((item) => renderMenuItem({ item }))}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default memo(Sidebar);
