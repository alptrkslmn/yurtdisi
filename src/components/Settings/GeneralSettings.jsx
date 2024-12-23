import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GeneralSettings = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    organizationName: 'Hüdayi Vakfı',
    email: 'info@hudayi.org',
    phone: '+90 216 428 39 60',
    address: 'Aziz Mahmut Hüdayi Mah. Türbe Kapısı Sok. No:13 Üsküdar İstanbul',
    theme: 'system',
    emailNotifications: true,
    pushNotifications: false,
    timezone: 'UTC+3',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(settings);

  const timezones = [
    { id: 'UTC-12', name: 'Baker Island', offset: '-12:00' },
    { id: 'UTC-11', name: 'Pago Pago', offset: '-11:00' },
    { id: 'UTC-10', name: 'Honolulu', offset: '-10:00' },
    { id: 'UTC-9', name: 'Anchorage', offset: '-09:00' },
    { id: 'UTC-8', name: 'Los Angeles', offset: '-08:00' },
    { id: 'UTC-7', name: 'Phoenix', offset: '-07:00' },
    { id: 'UTC-6', name: 'Chicago', offset: '-06:00' },
    { id: 'UTC-5', name: 'New York', offset: '-05:00' },
    { id: 'UTC-4', name: 'Santiago', offset: '-04:00' },
    { id: 'UTC-3', name: 'São Paulo', offset: '-03:00' },
    { id: 'UTC-2', name: 'Fernando de Noronha', offset: '-02:00' },
    { id: 'UTC-1', name: 'Ponta Delgada', offset: '-01:00' },
    { id: 'UTC+0', name: 'London', offset: '+00:00' },
    { id: 'UTC+1', name: 'Paris', offset: '+01:00' },
    { id: 'UTC+2', name: 'Cairo', offset: '+02:00' },
    { id: 'UTC+3', name: 'Istanbul', offset: '+03:00' },
    { id: 'UTC+4', name: 'Dubai', offset: '+04:00' },
    { id: 'UTC+5', name: 'Karachi', offset: '+05:00' },
    { id: 'UTC+5:30', name: 'Mumbai', offset: '+05:30' },
    { id: 'UTC+6', name: 'Dhaka', offset: '+06:00' },
    { id: 'UTC+7', name: 'Bangkok', offset: '+07:00' },
    { id: 'UTC+8', name: 'Singapore', offset: '+08:00' },
    { id: 'UTC+9', name: 'Tokyo', offset: '+09:00' },
    { id: 'UTC+9:30', name: 'Adelaide', offset: '+09:30' },
    { id: 'UTC+10', name: 'Sydney', offset: '+10:00' },
    { id: 'UTC+11', name: 'Noumea', offset: '+11:00' },
    { id: 'UTC+12', name: 'Auckland', offset: '+12:00' },
    { id: 'UTC+13', name: 'Apia', offset: '+13:00' },
    { id: 'UTC+14', name: 'Kiritimati', offset: '+14:00' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
            {t('settings.general.title')}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('settings.general.description')}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('common.edit')}
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.organizationName')}
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
                {t('settings.general.email')}
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
                {t('settings.general.phone')}
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

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.address')}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.theme')}
              </label>
              {isEditing ? (
                <select
                  name="theme"
                  value={editedSettings.theme}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="light">{t('settings.general.lightTheme')}</option>
                  <option value="dark">{t('settings.general.darkTheme')}</option>
                  <option value="system">{t('settings.general.systemTheme')}</option>
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.theme}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {t('settings.general.notifications')}
              </h4>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={editedSettings.emailNotifications}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('settings.general.emailNotifications')}
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('settings.general.emailNotificationsDescription')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="pushNotifications"
                      name="pushNotifications"
                      type="checkbox"
                      checked={editedSettings.pushNotifications}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('settings.general.pushNotifications')}
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('settings.general.pushNotificationsDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.general.timezone')}
              </label>
              {isEditing ? (
                <select
                  name="timezone"
                  value={editedSettings.timezone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {timezones.map((tz) => (
                    <option key={tz.id} value={tz.id}>
                      {tz.id} ({tz.offset}) - {tz.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-300">{settings.timezone}</p>
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
              {t('common.cancel')}
            </button>
            <button
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('common.save')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
