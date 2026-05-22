import en from './en.json';
import zh from './zh.json';

const translations = {
  en,
  zh,
};

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof en;

export function getTranslations(lang: Locale) {
  const t = translations[lang] || translations.en;
  
  return (key: TranslationKey) => {
    return t[key] || key;
  };
}
