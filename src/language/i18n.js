import i18n from "i18next";
// import Backend from "i18next-xhr-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en/index.json";
import fr from "./fr/index.json";
import nl from "./nl/index.json";

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translations: en
    },
    fr: {
      translations: fr
    },
    nl: {
      translations: nl
    }
  },
  lng: "en",
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
