import React from 'react';
import { useTranslation } from 'react-i18next';

const Accounting = () => {
  const { t } = useTranslation();

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('accounting.title')}
        </h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* Content will be added here */}
        </div>
      </div>
    </div>
  );
};

export default Accounting;
