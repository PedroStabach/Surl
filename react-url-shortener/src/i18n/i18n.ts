import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our site!"
        }
      },
      pt: {
        translation: {
          welcome: "Bem-vindo ao nosso site!"
        }
      }
    },
    fallbackLng: "pt",
    interpolation: { escapeValue: false }
  });

export default i18n;
