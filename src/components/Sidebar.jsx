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
  ChevronLeftIcon,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const toggleExpand = (path) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const isActiveItem = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img src={hudayiLogo} alt="Hüdayi Vakfı" className="h-8 w-auto" />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Hüdayi</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((group) => (
            <div key={group.title} className="sidebar-group">
              <h3 className="sidebar-group-title">{t(group.title)}</h3>
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasSubItems = item.items && item.items.length > 0;
                const isExpanded = expandedItems.includes(item.path);
                const isItemActive = isActiveItem(item.path);
                
                return (
                  <div key={item.path}>
                    <Link
                      to={hasSubItems ? '#' : item.path}
                      onClick={hasSubItems ? (e) => {
                        e.preventDefault();
                        toggleExpand(item.path);
                      } : undefined}
                      className={`sidebar-item ${isItemActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
                    >
                      {Icon && <Icon className="h-5 w-5 mr-3 flex-shrink-0" />}
                      <span className="flex-1">{t(item.name)}</span>
                      {hasSubItems && (
                        isExpanded ? (
                          <ChevronDownIcon className="h-5 w-5" />
                        ) : (
                          <ChevronRightIcon className="h-5 w-5" />
                        )
                      )}
                    </Link>
                    
                    {/* Alt menü öğeleri */}
                    {hasSubItems && isExpanded && (
                      <div className="mt-1 space-y-1 pl-11">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`sidebar-item ${
                              isActiveItem(subItem.path) ? 'sidebar-item-active' : 'sidebar-item-inactive'
                            }`}
                          >
                            <span>{t(subItem.name)}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobil görünüm için overlay */}
      {!isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
