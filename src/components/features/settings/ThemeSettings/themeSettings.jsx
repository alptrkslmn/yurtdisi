import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';
import { useTheme } from '../../../../contexts/themeContext';

const ThemeSettings = () => {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [compactMode, setCompactMode] = useState(() => localStorage.getItem('compactMode') === 'true');
  const [animations, setAnimations] = useState(() => localStorage.getItem('animations') !== 'false');

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
    document.documentElement.classList.toggle('disable-animations', !animations);
    localStorage.setItem('animations', animations);
  }, [animations]);

  return (
    <div className="space-y-8">
      {/* Karanlık Mod */}
      <div>
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="text-base font-medium text-gray-900 dark:text-white">
              {t('common.theme.settings.theme.dark.label')}
            </Switch.Label>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              className={`${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('common.theme.settings.theme.dark.description')}
          </p>
        </Switch.Group>
      </div>

      {/* Kompakt Mod */}
      <div>
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="text-base font-medium text-gray-900 dark:text-white">
              {t('common.theme.settings.theme.compact.label')}
            </Switch.Label>
            <Switch
              checked={compactMode}
              onChange={setCompactMode}
              className={`${
                compactMode ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  compactMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('common.theme.settings.theme.compact.description')}
          </p>
        </Switch.Group>
      </div>

      {/* Animasyonlar */}
      <div>
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="text-base font-medium text-gray-900 dark:text-white">
              {t('common.theme.settings.theme.animations.label')}
            </Switch.Label>
            <Switch
              checked={animations}
              onChange={setAnimations}
              className={`${
                animations ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  animations ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('common.theme.settings.theme.animations.description')}
          </p>
        </Switch.Group>
      </div>
    </div>
  );
};

export default ThemeSettings;
