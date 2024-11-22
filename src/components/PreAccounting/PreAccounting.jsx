import React, { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const PreAccounting = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    month: '',
    country: '',
    institution: ''
  });

  const years = [2022, 2023, 2024];
  const months = Array.from({length: 12}, (_, i) => i);
  const countries = ['Almanya', 'Türkiye', 'Fransa', 'İngiltere'];
  const institutions = ['Dernek 1', 'Dernek 2', 'Dernek 3'];

  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      type: 'expense',
      category: 'Personel',
      description: 'Ocak 2024 Personel Maaşları',
      amount: 250000.00,
      status: 'pending'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'expense',
      category: 'Operasyonel',
      description: 'Berlin Şubesi Kira Ödemesi',
      amount: 45000.00,
      status: 'pending'
    }
  ]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleApprove = (id) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === id ? { ...entry, status: 'approved' } : entry
      )
    );
  };

  const handleReject = (id) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === id ? { ...entry, status: 'rejected' } : entry
      )
    );
  };

  return (
    <div className="p-6 pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('preAccounting.title')}
        </h1>
      </div>

      {/* Filtre Bölümü */}
      <div className="mb-6 flex items-center space-x-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('preAccounting.filters.year')}
          </label>
          <select
            id="year"
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('preAccounting.filters.allYears')}</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('preAccounting.filters.month')}
          </label>
          <select
            id="month"
            value={filters.month}
            onChange={(e) => handleFilterChange('month', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('preAccounting.filters.allMonths')}</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {new Date(2024, index).toLocaleString('tr-TR', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('preAccounting.filters.country')}
          </label>
          <select
            id="country"
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('preAccounting.filters.allCountries')}</option>
            {countries.map(country => (
              <option key={country} value={country}>{t(`countries.data.${country}`)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('preAccounting.filters.institution')}
          </label>
          <select
            id="institution"
            value={filters.institution}
            onChange={(e) => handleFilterChange('institution', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('preAccounting.filters.allInstitutions')}</option>
            {institutions.map(institution => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.id')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.date')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.type')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.category')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.description')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.amount')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.table.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.type === 'expense' ? t('common.type.expense') : t('common.type.income')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(entry.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {entry.status === 'pending' && <span className="text-yellow-600">{t('preAccounting.status.pending')}</span>}
                  {entry.status === 'approved' && <span className="text-green-600">{t('preAccounting.status.approved')}</span>}
                  {entry.status === 'rejected' && <span className="text-red-600">{t('preAccounting.status.rejected')}</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleApprove(entry.id)}
                      disabled={entry.status !== 'pending'}
                      className={`text-green-600 hover:text-green-900 ${entry.status !== 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span className="sr-only">{t('preAccounting.actions.approve')}</span>
                    </button>
                    <button 
                      onClick={() => handleReject(entry.id)}
                      disabled={entry.status !== 'pending'}
                      className={`text-red-600 hover:text-red-900 ${entry.status !== 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <XMarkIcon className="h-5 w-5" />
                      <span className="sr-only">{t('preAccounting.actions.reject')}</span>
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                      <span className="sr-only">{t('preAccounting.actions.details')}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreAccounting;
