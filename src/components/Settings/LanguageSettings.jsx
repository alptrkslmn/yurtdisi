import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSettings = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [editedTranslations, setEditedTranslations] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Desteklenen diller
  const languages = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'nl', name: 'Nederlands' }
  ];

  // Çeviri kategorileri
  const categories = [
    { key: 'common', label: t('common.title') },
    { key: 'navigation', label: t('navigation.title') },
    { key: 'settings', label: t('settings.title') },
    { key: 'organizations', label: t('organizations.title') },
    { key: 'preAccounting', label: t('preAccounting.title') }
  ];

  useEffect(() => {
    loadTranslations();
  }, [selectedLanguage]);

  const loadTranslations = () => {
    const allTranslations = {};
    const trBundle = i18n.getResourceBundle('tr', 'translation');
    const targetBundle = i18n.getResourceBundle(selectedLanguage, 'translation');

    const flattenObject = (obj, prefix = '') => {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
          Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
          acc[pre + k] = obj[k];
        }
        return acc;
      }, {});
    };

    const flatTrBundle = flattenObject(trBundle);
    const flatTargetBundle = flattenObject(targetBundle || {});

    Object.entries(flatTrBundle).forEach(([key, trValue]) => {
      allTranslations[key] = {
        tr: trValue,
        target: flatTargetBundle[key] || ''
      };
    });

    setTranslations(allTranslations);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setEditingKey('');
    setEditedTranslations({});
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setEditedTranslations({
      target: translations[key].target
    });
  };

  const handleSave = (key) => {
    setTranslations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        target: editedTranslations.target
      }
    }));
    setEditingKey('');
    setEditedTranslations({});
  };

  const handleCancel = () => {
    setEditingKey('');
    setEditedTranslations({});
  };

  const filteredTranslations = Object.entries(translations).filter(([key, value]) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      key.toLowerCase().includes(searchLower) ||
      value.tr.toLowerCase().includes(searchLower) ||
      value.target.toLowerCase().includes(searchLower)
    );
  });

  const getCategoryTranslations = (categoryKey) => {
    return filteredTranslations.filter(([key]) => key.startsWith(`${categoryKey}.`));
  };

  return (
    <div className="space-y-6 p-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('settings.language.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {t('settings.language.description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {languages.filter(lang => lang.code !== 'tr').map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('common.search')}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="mt-6">
        {categories.map(category => {
          const categoryTranslations = getCategoryTranslations(category.key);
          if (categoryTranslations.length === 0) return null;

          return (
            <div key={category.key} className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {category.label}
              </h3>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-gray-700 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                        {t('common.turkish')}
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        {languages.find(lang => lang.code === selectedLanguage)?.name}
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">{t('common.actions')}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                    {categoryTranslations.map(([key, value]) => (
                      <tr key={key}>
                        <td className="whitespace-normal py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-white sm:pl-6">
                          {value.tr}
                        </td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {editingKey === key ? (
                            <textarea
                              rows="2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={editedTranslations.target || ''}
                              onChange={(e) => setEditedTranslations({ target: e.target.value })}
                            />
                          ) : (
                            value.target || '-'
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {editingKey === key ? (
                            <div className="flex space-x-3 justify-end">
                              <button
                                onClick={() => handleSave(key)}
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              >
                                {t('common.save')}
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                {t('common.cancel')}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(key)}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              {t('common.edit')}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSettings;
