import React from 'react';
import { useTranslation } from 'react-i18next';

const Reports = () => {
  const { t } = useTranslation();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('pages.reports.title')}
          </h1>
        </div>

        <div className="grid gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300">
                {t('pages.reports.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
