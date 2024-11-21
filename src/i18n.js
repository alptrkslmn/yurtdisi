import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/tr/translation.json',
    },
    lng: 'tr',
    fallbackLng: false,
    supportedLngs: ['tr'],
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: {
      escapeValue: false
    },
    load: 'languageOnly',
    detection: {
      order: [],
      caches: []
    }
  });

export default i18n;
