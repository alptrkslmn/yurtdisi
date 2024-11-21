import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';

const ThemeSettings = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {t('settings.theme.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('settings.theme.description')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('settings.theme.darkMode')}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.theme.darkModeDescription')}
            </p>
          </div>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{t('settings.theme.darkMode')}</span>
            <span
              className={`${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('settings.theme.compactMode')}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.theme.compactModeDescription')}
            </p>
          </div>
          <Switch
            checked={compactMode}
            onChange={setCompactMode}
            className={`${
              compactMode ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{t('settings.theme.compactMode')}</span>
            <span
              className={`${
                compactMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('settings.theme.animations')}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.theme.animationsDescription')}
            </p>
          </div>
          <Switch
            checked={animations}
            onChange={setAnimations}
            className={`${
              animations ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{t('settings.theme.animations')}</span>
            <span
              className={`${
                animations ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
