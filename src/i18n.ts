// import i18next from 'i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
//
// import advanceBlock_ru from './translations/ru/advanceBlock.json'
// import authPage_ru from './translations/ru/authPage.json'
// import common_ru from './translations/ru/common.json'
// import country_ru from './translations/ru/country.json'
// import form_ru from './translations/ru/form.json'
// import helpPage_ru from './translations/ru/helpPage.json'
// import homeContent_ru from './translations/ru/homeContent.json'
// import layout_ru from './translations/ru/layout.json'
// import months_ru from './translations/ru/months.json'
// import notification_ru from './translations/ru/notification.json'
// import panel_ru from './translations/ru/panel.json'
// import personalNavigation_ru from './translations/ru/personalNavigation.json'
// import simpleCard_ru from './translations/ru/simpleCard.json'
//
// i18next.use(LanguageDetector).init({
//   resources: {
//     ru: {
//       advanceBlock: advanceBlock_ru,
//       authPage: authPage_ru,
//       common: common_ru,
//       country: country_ru,
//       form: form_ru,
//       helpPage: helpPage_ru,
//       homeContent: homeContent_ru,
//       layout: layout_ru,
//       months: months_ru,
//       notification: notification_ru,
//       panel: panel_ru,
//       personalNavigation: personalNavigation_ru,
//       simpleCard: simpleCard_ru,
//     },
//     en: {
//       advanceBlock: advanceBlock_ru,
//       authPage: authPage_ru,
//       common: common_ru,
//       country: country_ru,
//       form: form_ru,
//       helpPage: helpPage_ru,
//       homeContent: homeContent_ru,
//       layout: layout_ru,
//       months: months_ru,
//       notification: notification_ru,
//       panel: panel_ru,
//       personalNavigation: personalNavigation_ru,
//       simpleCard: simpleCard_ru,
//     },
//     de: {
//       advanceBlock: advanceBlock_ru,
//       authPage: authPage_ru,
//       common: common_ru,
//       country: country_ru,
//       form: form_ru,
//       helpPage: helpPage_ru,
//       homeContent: homeContent_ru,
//       layout: layout_ru,
//       months: months_ru,
//       notification: notification_ru,
//       panel: panel_ru,
//       personalNavigation: personalNavigation_ru,
//       simpleCard: simpleCard_ru,
//     },
//   },
//   lng: 'ru',
//   interpolation: {
//     escapeValue: false,
//   },
// })
//
// export default i18next
//
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: false,
    supportedLngs: ['ru', 'en', 'de'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
    },
  })

export default i18n
