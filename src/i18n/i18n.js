import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import trTranslations from './locales/tr.json';
import enTranslations from './locales/en.json';
import deTranslations from './locales/de.json';
import nlTranslations from './locales/nl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: trTranslations
      },
      en: {
        translation: enTranslations
      },
      de: {
        translation: deTranslations
      },
      nl: {
        translation: nlTranslations
      }
    },
    fallbackLng: 'tr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
