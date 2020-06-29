import i18next from 'i18next';
import dictionaries from '../localization/dict';

const setLocale = (language) => {
  i18next.init({
    lng: language,
    resources: {
      [language]: {
        translation: dictionaries[language],
      },
    },
  });
};

const t = (key) => {
  return i18next.t(key);
};

export {setLocale, t};
