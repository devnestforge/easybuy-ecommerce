import es from './es';
import en from './en';

const translations = {
  en,
  es,
};

const detectBrowserLanguage = () => {
  //const browserLang = navigator.language || navigator.userLanguage;
  //const shortLang = browserLang.split('-')[0];
  return 'es' //translations[shortLang] ? shortLang : 'es';
};

const currentLanguage = detectBrowserLanguage();

const t = (key) => translations[currentLanguage][key] || key;

// Hacer `t` globalmente disponible
window.t = t;

export default t;
