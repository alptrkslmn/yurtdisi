import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';

const InstitutionForm = ({ countryCode, onSubmit, onClose, initialData = null }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    name: initialData?.name || '',
    status: initialData?.status || 'active',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    translations: initialData?.translations || {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, countryCode });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTranslationChange = (lang, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {initialData ? t('institutions.management.edit') : t('institutions.management.add')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('institutions.form.code')}
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
                pattern="[A-Z0-9_]+"
                title={t('institutions.form.codeHelp')}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t('institutions.form.codeHelp')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('institutions.form.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('institutions.form.status')}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="active">{t('common.status.active')}</option>
                <option value="inactive">{t('common.status.inactive')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('institutions.form.address')}
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('institutions.form.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('institutions.form.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Çeviriler */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('institutions.form.translations')}
              </label>
              <div className="space-y-2">
                {['en', 'de', 'fr', 'nl'].map(lang => (
                  <div key={lang}>
                    <label className="block text-xs text-gray-500 dark:text-gray-400">
                      {t(`languages.${lang}`)}
                    </label>
                    <input
                      type="text"
                      value={formData.translations[lang] || ''}
                      onChange={(e) => handleTranslationChange(lang, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder={t('institutions.form.translationPlaceholder', { lang: t(`languages.${lang}`) })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstitutionForm;