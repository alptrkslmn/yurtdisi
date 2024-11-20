import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GeneralSettings = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    organizationName: 'Hüdayi Vakfı',
    email: 'info@hudayi.org',
    phone: '+90 216 428 39 60',
    address: 'Aziz Mahmut Hüdayi Mah. Türbe Kapısı Sok. No:13 Üsküdar İstanbul',
    currency: 'TRY',
    timeZone: 'Europe/Istanbul'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setSettings(editedSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('settings.general.title', 'Genel Ayarlar')}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('settings.general.description', 'Temel sistem ayarlarını buradan yönetebilirsiniz')}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('common.edit', 'Düzenle')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.organizationName', 'Kurum Adı')}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="organizationName"
                  value={editedSettings.organizationName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.organizationName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.email', 'E-posta')}
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedSettings.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.phone', 'Telefon')}
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedSettings.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.currency', 'Para Birimi')}
              </label>
              {isEditing ? (
                <select
                  name="currency"
                  value={editedSettings.currency}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="TRY">TRY - Türk Lirası</option>
                  <option value="USD">USD - Amerikan Doları</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.currency}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.address', 'Adres')}
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  rows="3"
                  value={editedSettings.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.address}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6 space-x-3 rounded-b-lg">
            <button
              onClick={handleCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500"
            >
              {t('common.cancel', 'İptal')}
            </button>
            <button
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('common.save', 'Kaydet')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
