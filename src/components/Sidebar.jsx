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
import { useThemeStyles } from '../hooks/useThemeStyles';

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const styles = useThemeStyles();

  const countries = [
    { id: 'TR', name: t('countries.TR') },
    { id: 'DE', name: t('countries.DE') },
    { id: 'NL', name: t('countries.NL') },
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
        name: t(`countries.${country.id}`),
        path: `/countries/${country.id}`,
        icon: BuildingOfficeIcon,
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
      permission: PERMISSIONS.DASHBOARD.VIEW
    }
  ];

  const toggleExpand = (index) => {
    setExpandedItems(prev => {
      const isExpanded = prev.includes(index);
      return isExpanded
        ? prev.filter(i => i !== index)
        : [...prev, index];
    });
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 z-50 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:w-64' : 'md:w-16'}`}>
      <div className="flex h-screen flex-col">
        <div className={`flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-700 ${styles.gradientBg}`}>
          {/* Logo alanı */}
          <div className="flex h-16 flex-shrink-0 items-center justify-center px-4 bg-white dark:bg-gray-800">
            <img
              className={`h-8 w-auto transition-all duration-300 ease-in-out ${!isSidebarOpen ? 'scale-90' : ''}`}
              src={hudayiLogo}
              alt="Hudayi Logo"
            />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems.map((item, index) => 
                hasPermission(item.permission) && (
                  <div key={item.path}>
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(index)}
                          className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            isActive(item.path)
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        >
                          <item.icon className="mr-3 h-5 w-5" />
                          {isSidebarOpen && (
                            <>
                              <span className="flex-1 text-left">{item.name}</span>
                              {expandedItems.includes(index) ? (
                                <ChevronDownIcon className="h-5 w-5" />
                              ) : (
                                <ChevronRightIcon className="h-5 w-5" />
                              )}
                            </>
                          )}
                        </button>
                        {isSidebarOpen && expandedItems.includes(index) && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                  isActive(subItem.path)
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                              >
                                <subItem.icon className="mr-3 h-5 w-5" />
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive(item.path)
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {isSidebarOpen && <span>{item.name}</span>}
                      </Link>
                    )}
                  </div>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute right-0 top-20 transform translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-1.5 border border-gray-200 dark:border-gray-700"
        title={t('navigation.toggleSidebar')}
      >
        {isSidebarOpen ? (
          <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
