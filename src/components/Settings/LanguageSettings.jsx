import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {t('settings.language.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('settings.language.description')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('settings.language.headerInfo')}
        </p>
      </div>
    </div>
  );
};

export default LanguageSettings;