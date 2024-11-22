import React from 'react';
import { useTranslation } from 'react-i18next';

const PreAccounting = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t('pages.preAccounting.title')}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        {t('pages.preAccounting.description')}
      </p>
    </div>
  );
};

export default PreAccounting;
