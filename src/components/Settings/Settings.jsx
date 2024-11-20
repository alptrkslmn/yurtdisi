import React, { useState } from 'react';
import { 
  UserIcon, BuildingOfficeIcon, GlobeAltIcon,
  CurrencyDollarIcon, UserGroupIcon, Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('users');

  // Demo verisi
  const users = [
    { id: 1, name: 'Ahmet Yılmaz', role: 'Ülke Koordinatörü', country: 'Türkiye', permissions: ['Tüm Kurumlar'] },
    { id: 2, name: 'Mehmet Demir', role: 'Kurum Sorumlusu', country: 'Almanya', permissions: ['Berlin Şubesi'] },
    { id: 3, name: 'Ayşe Kaya', role: 'Mali İşler Sorumlusu', country: 'Fransa', permissions: ['Paris Şubesi', 'Lyon Şubesi'] },
  ];

  const countries = [
    { id: 1, name: 'Türkiye', code: 'TR', institutions: 5 },
    { id: 2, name: 'Almanya', code: 'DE', institutions: 3 },
    { id: 3, name: 'Fransa', code: 'FR', institutions: 2 },
  ];

  const institutions = [
    { id: 1, name: 'Berlin Şubesi', country: 'Almanya', type: 'Şube' },
    { id: 2, name: 'Paris Şubesi', country: 'Fransa', type: 'Şube' },
    { id: 3, name: 'İstanbul Merkez', country: 'Türkiye', type: 'Merkez' },
  ];

  const currencies = [
    { id: 1, code: 'TRY', name: 'Türk Lirası', symbol: '₺' },
    { id: 2, code: 'EUR', name: 'Euro', symbol: '€' },
    { id: 3, code: 'USD', name: 'Amerikan Doları', symbol: '$' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Kullanıcı Yönetimi</h2>
              <button className="btn btn-primary">Yeni Kullanıcı</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Kullanıcı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ülke
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Yetkiler
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.permissions.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                          Düzenle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'countries':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Ülke Yönetimi</h2>
              <button className="btn btn-primary">Yeni Ülke</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country) => (
                <div key={country.id} className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GlobeAltIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{country.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{country.institutions} Kurum</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                      Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'institutions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Kurum Yönetimi</h2>
              <button className="btn btn-primary">Yeni Kurum</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution) => (
                <div key={institution.id} className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BuildingOfficeIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{institution.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{institution.country} - {institution.type}</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                      Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'currencies':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Para Birimi Yönetimi</h2>
              <button className="btn btn-primary">Yeni Para Birimi</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currencies.map((currency) => (
                <div key={currency.id} className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CurrencyDollarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{currency.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{currency.code} - {currency.symbol}</p>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                      Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Ayarlar</h1>
      </div>

      {/* Sekmeler */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            } flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <UserGroupIcon className="h-5 w-5" />
            <span>Kullanıcılar</span>
          </button>

          <button
            onClick={() => setActiveTab('countries')}
            className={`${
              activeTab === 'countries'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            } flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <GlobeAltIcon className="h-5 w-5" />
            <span>Ülkeler</span>
          </button>

          <button
            onClick={() => setActiveTab('institutions')}
            className={`${
              activeTab === 'institutions'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            } flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <BuildingOfficeIcon className="h-5 w-5" />
            <span>Kurumlar</span>
          </button>

          <button
            onClick={() => setActiveTab('currencies')}
            className={`${
              activeTab === 'currencies'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            } flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Para Birimleri</span>
          </button>
        </nav>
      </div>

      {/* Sekme İçeriği */}
      {renderTabContent()}
    </div>
  );
};

export default Settings;
