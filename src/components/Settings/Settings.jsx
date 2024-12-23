import React from 'react';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  UserIcon, 
  ListBulletIcon,
  LanguageIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Items from './items';
import LanguageSettings from './languageSettings';
import GeneralSettings from './generalSettings';
import Users from './users';
import NotificationSettings from './notificationSettings';
import CurrencySettings from './currencySettings';
import ThemeSettings from '../features/settings/ThemeSettings/themeSettings';

const Settings = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const currentPath = location.pathname.split('/').pop();

  const tabs = [
    { 
      name: t('settings.tabs.general'), 
      path: 'general',
      icon: Cog6ToothIcon,
      component: GeneralSettings 
    },
    { 
      name: t('settings.tabs.language'), 
      path: 'language',
      icon: LanguageIcon,
      component: LanguageSettings 
    },
    { 
      name: t('settings.tabs.theme'), 
      path: 'theme',
      icon: ListBulletIcon,
      component: ThemeSettings 
    },
    { 
      name: t('settings.tabs.notifications'), 
      path: 'notifications',
      icon: UserIcon,
      component: NotificationSettings 
    },
    { 
      name: t('settings.currency'), 
      path: 'currency',
      icon: CurrencyDollarIcon,
      component: CurrencySettings 
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('settings.description')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentPath === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`
                    flex items-center py-4 px-1 border-b-2 text-sm font-medium
                    ${isActive
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <Routes>
            <Route index element={<Navigate to="general" replace />} />
            {tabs.map((tab) => (
              <Route
                key={tab.path}
                path={tab.path}
                element={<tab.component />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Settings;
