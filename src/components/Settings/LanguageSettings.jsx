import React from 'react';
import { useTranslation } from 'react-i18next';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

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
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <InformationCircleIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Sadece Türkçe Dil Desteği
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Bu uygulama sadece Türkçe dil desteği sunmaktadır. Dil seçenekleri şu an için devre dışıdır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;