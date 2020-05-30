import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'de',
    debug: false,
    nsSeparator: ':',
    detection: {
      order: ['navigator'],
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
