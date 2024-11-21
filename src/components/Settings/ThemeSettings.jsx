import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';

const ThemeSettings = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [compactMode, setCompactMode] = useState(() => localStorage.getItem('compactMode') === 'true');
  const [animations, setAnimations] = useState(() => localStorage.getItem('animations') !== 'false');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (compactMode) {
      root.classList.add('compact');
      document.querySelectorAll('.px-6').forEach(el => {
        el.classList.remove('px-6');
        el.classList.add('px-4');
      });
      document.querySelectorAll('.py-4').forEach(el => {
        el.classList.remove('py-4');
        el.classList.add('py-2');
      });
      document.querySelectorAll('.py-3').forEach(el => {
        el.classList.remove('py-3');
        el.classList.add('py-2');
      });
      document.querySelectorAll('.space-y-6').forEach(el => {
        el.classList.remove('space-y-6');
        el.classList.add('space-y-4');
      });
    } else {
      root.classList.remove('compact');
      document.querySelectorAll('.px-4').forEach(el => {
        el.classList.remove('px-4');
        el.classList.add('px-6');
      });
      document.querySelectorAll('.py-2').forEach(el => {
        el.classList.remove('py-2');
        el.classList.add('py-4');
      });
      document.querySelectorAll('.space-y-4').forEach(el => {
        el.classList.remove('space-y-4');
        el.classList.add('space-y-6');
      });
    }
    localStorage.setItem('compactMode', compactMode);
  }, [compactMode]);

  useEffect(() => {
    if (animations) {
      document.documentElement.classList.remove('no-animations');
    } else {
      document.documentElement.classList.add('no-animations');
    }
    localStorage.setItem('animations', animations);
  }, [animations]);

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
            className={`${darkMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
          >
            <span className="sr-only">{t('settings.theme.darkMode')}</span>
            <span
              className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
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
            className={`${compactMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
          >
            <span className="sr-only">{t('settings.theme.compactMode')}</span>
            <span
              className={`${compactMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
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
            className={`${animations ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
          >
            <span className="sr-only">{t('settings.theme.animations')}</span>
            <span
              className={`${animations ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
