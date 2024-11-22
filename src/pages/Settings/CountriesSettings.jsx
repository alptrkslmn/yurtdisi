import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const CountriesSettings = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: 'Türkiye',
      code: 'TR',
      institutionCount: 5,
      active: true
    },
    {
      id: 2,
      name: 'Almanya',
      code: 'DE',
      institutionCount: 3,
      active: true
    },
    {
      id: 3,
      name: 'Fransa',
      code: 'FR',
      institutionCount: 2,
      active: false
    }
  ]);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleAddCountry = () => {
    // Modal veya form açma işlemi
  };

  const handleEditCountry = (country) => {
    setSelectedCountry(country);
    // Düzenleme modalını aç
  };

  const handleDeleteCountry = (countryId) => {
    setCountries(countries.filter(c => c.id !== countryId));
  };

  const toggleCountryStatus = (countryId) => {
    setCountries(countries.map(c =>
      c.id === countryId ? { ...c, active: !c.active } : c
    ));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sidebar.menu.countries')}
        </h1>
        <button
          onClick={handleAddCountry}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {t('common.add')}
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-600 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">{t('common.name')}</th>
              <th scope="col" className="px-6 py-3">{t('common.code')}</th>
              <th scope="col" className="px-6 py-3">{t('common.institutions')}</th>
              <th scope="col" className="px-6 py-3">{t('common.status')}</th>
              <th scope="col" className="px-6 py-3">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr
                key={country.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{country.name}</td>
                <td className="px-6 py-4">{country.code}</td>
                <td className="px-6 py-4">{country.institutionCount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      country.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {country.active ? t('common.active') : t('common.inactive')}
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEditCountry(country)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCountry(country.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => toggleCountryStatus(country.id)}
                    className={`px-2 py-1 rounded-md text-xs ${
                      country.active
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {country.active ? t('common.deactivate') : t('common.activate')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountriesSettings;