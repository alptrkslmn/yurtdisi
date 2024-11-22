import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwatchIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { Popover } from '@headlessui/react';

const ThemeCustomizer = () => {
  const { t } = useTranslation();
  const { currentTheme, updateTheme, themes } = useTheme();

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
        <div className="relative">
          <SwatchIcon className="h-5 w-5" />
          <div className={`absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${themes[currentTheme].primary}`} />
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
        <div className="px-2 py-2">
          <div className="grid grid-cols-4 gap-1">
            {Object.entries(themes).map(([name, theme]) => (
              <button
                key={name}
                onClick={() => updateTheme(name)}
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.primary} transition-transform hover:scale-110 ${
                  currentTheme === name ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-blue-500 scale-110' : ''
                }`}
                title={t(`common.theme.colors.${name}`)}
              />
            ))}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default ThemeCustomizer;
