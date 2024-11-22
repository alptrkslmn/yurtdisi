import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useThemeStyles } from '../../hooks/useThemeStyles';

const CountryManager = () => {
  const { t } = useTranslation();
  const styles = useThemeStyles();
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState({ name: '', code: '', currency: '' });
  const [editingCountry, setEditingCountry] = useState(null);

  // Ülkeleri yükle
  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const store = window.electron.store;
      const savedCountries = await store.get('countries') || [];
      setCountries(savedCountries);
    } catch (error) {
      console.error('Ülkeler yüklenirken hata:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const store = window.electron.store;
      let updatedCountries;

      if (editingCountry) {
        // Mevcut ülkeyi güncelle
        updatedCountries = countries.map(country => 
          country.id === editingCountry.id ? { ...newCountry, id: country.id } : country
        );
      } else {
        // Yeni ülke ekle
        const newId = Date.now().toString();
        updatedCountries = [...countries, { ...newCountry, id: newId }];
      }

      await store.set('countries', updatedCountries);
      setCountries(updatedCountries);
      setNewCountry({ name: '', code: '', currency: '' });
      setEditingCountry(null);
    } catch (error) {
      console.error('Ülke kaydedilirken hata:', error);
    }
  };

  const handleEdit = (country) => {
    setEditingCountry(country);
    setNewCountry(country);
  };

  const handleDelete = async (countryId) => {
    if (window.confirm(t('settings.countries.deleteConfirm'))) {
      try {
        const store = window.electron.store;
        const updatedCountries = countries.filter(country => country.id !== countryId);
        await store.set('countries', updatedCountries);
        setCountries(updatedCountries);
      } catch (error) {
        console.error('Ülke silinirken hata:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('settings.countries.title')}
        </h3>

        {/* Ülke Ekleme/Düzenleme Formu */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.countries.name')}
              </label>
              <input
                type="text"
                value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                className={`mt-1 block w-full rounded-md ${styles.input}`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.countries.code')}
              </label>
              <input
                type="text"
                value={newCountry.code}
                onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value.toUpperCase() })}
                className={`mt-1 block w-full rounded-md ${styles.input}`}
                required
                maxLength="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.countries.currency')}
              </label>
              <input
                type="text"
                value={newCountry.currency}
                onChange={(e) => setNewCountry({ ...newCountry, currency: e.target.value.toUpperCase() })}
                className={`mt-1 block w-full rounded-md ${styles.input}`}
                required
                maxLength="3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${styles.button}`}
            >
              <PlusIcon className="h-5 w-5 mr-2 inline-block" />
              {editingCountry ? t('common.update') : t('common.add')}
            </button>
          </div>
        </form>

        {/* Ülke Listesi */}
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('settings.countries.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('settings.countries.code')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('settings.countries.currency')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {countries.map((country) => (
                  <tr key={country.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {country.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {country.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {country.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(country)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(country.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryManager;
