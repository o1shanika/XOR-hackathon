import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from './en.json';
import sinhala from './si.json';
import tamil from './ta.json';

i18n.use(initReactI18next).init({
  initImmediate: false,
  resources: {
    en: {
      translation: english,
    },
    si: {
      translation: sinhala
    },
    ta: {
      translation: tamil
    }
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback if selected language not available
  interpolation: {
    escapeValue: false
  }
});


export default i18n;
