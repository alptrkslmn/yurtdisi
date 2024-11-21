import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';

const NotificationSettings = () => {
  const { t } = useTranslation();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {t('settings.notifications.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('settings.notifications.description')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('settings.notifications.email')}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.notifications.emailDescription')}
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onChange={setEmailNotifications}
            className={`${
              emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{t('settings.notifications.email')}</span>
            <span
              className={`${
                emailNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('settings.notifications.push')}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.notifications.pushDescription')}
            </p>
          </div>
          <Switch
            checked={pushNotifications}
            onChange={setPushNotifications}
            className={`${
              pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{t('settings.notifications.push')}</span>
            <span
              className={`${
                pushNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {t('settings.notifications.reports')}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.notifications.reportsDescription')}
            </p>
          </div>
          <Switch
            checked={reportNotifications}
            onChange={setReportNotifications}
            className={`${
              reportNotifications ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{t('settings.notifications.reports')}</span>
            <span
              className={`${
                reportNotifications ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
