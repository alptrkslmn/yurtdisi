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

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className={`hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ${isSidebarOpen ? 'md:w-64' : 'md:w-16'}`}>
      <div className="flex h-screen flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-6">
              <img
                className="h-8 w-auto"
                src={hudayiLogo}
                alt="Hudayi Logo"
              />
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="ml-auto rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-6">
              {menuItems.map((item, index) => {
                if (!hasPermission(item.permission)) return null;

                const ItemIcon = item.icon;
                const isItemActive = isActive(item.path);
                const isExpanded = expandedItems.includes(index);

                return (
                  <div key={item.path}>
                    {item.subItems ? (
                      <button
                        onClick={() => toggleExpand(index)}
                        className={`
                          group flex items-center px-2 py-2 text-sm font-medium rounded-md truncate
                          ${isItemActive
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <ItemIcon
                          className={`
                            mr-3 flex-shrink-0 h-6 w-6
                            ${isItemActive
                              ? 'text-gray-500 dark:text-gray-300'
                              : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                            }
                          `}
                        />
                        <span className="flex-1 truncate">{item.name}</span>
                        {isExpanded ? (
                          <ChevronDownIcon className="h-5 w-5 flex-shrink-0" />
                        ) : (
                          <ChevronRightIcon className="h-5 w-5 flex-shrink-0" />
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`
                          w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md truncate
                          ${isItemActive
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <ItemIcon
                          className={`
                            mr-3 flex-shrink-0 h-6 w-6
                            ${isItemActive
                              ? 'text-gray-500 dark:text-gray-300'
                              : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                            }
                          `}
                        />
                        <span className="flex-1 truncate">{item.name}</span>
                      </Link>
                    )}
                    {item.subItems && isExpanded && (
                      <div className="mt-1 pl-4 space-y-1">
                        {item.subItems.map((subItem) => {
                          if (!hasPermission(subItem.permission)) return null;
                          
                          const SubItemIcon = subItem.icon;
                          const isSubItemActive = isActive(subItem.path);

                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`
                                group flex items-center px-2 py-1.5 text-xs font-medium rounded-md truncate ml-2
                                ${isSubItemActive
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                                }
                              `}
                            >
                              <SubItemIcon
                                className={`
                                  mr-3 flex-shrink-0 h-5 w-5
                                  ${isSubItemActive
                                    ? 'text-gray-500 dark:text-gray-300'
                                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                  }
                                `}
                              />
                              <span className="truncate">{subItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
